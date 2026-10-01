// v2/worker.ts
var currentScope = "CURRENT_JOB";
var donorScope = "RECENT_FAILED_SIBLINGS";
var profileAgentCreationEnabled = false;
async function runWorker(params, signal) {
  return runWorkerWithBridge(
    new BridgeClient(params),
    signal,
    params.recovering
  );
}
async function runWorkerWithBridge(bridge, parent, recovering = false) {
  const local = new AbortController(), signal = AbortSignal.any([parent, local.signal]), submissions = new AbortController(), submissionSignal = AbortSignal.any([signal, submissions.signal]);
  let pausing = false;
  let evaluator, pollerRun, timer, wallTimedOut = false;
  const diagnostic = (event, details = {}) => {
    console.error(
      JSON.stringify({
        event,
        jobId: bridge.options.jobId,
        attempt: bridge.options.attempt,
        ...details
      })
    );
  };
  const inflight = /* @__PURE__ */ new Set();
  try {
    const info = await bridge.jobGet(signal);
    if (info.status !== "running") {
      diagnostic("workflow_not_running", {
        status: String(info.status).slice(0, 64)
      });
      return;
    }
    let input;
    try {
      input = JSON.parse(Buffer.from(info.input ?? "", "base64").toString());
      if (!input.script) throw new Error("missing script");
    } catch {
      await bridge.call(
        {
          jobFail: {
            error: {
              code: codes.invalid,
              message: "workflow job input is not a valid workflow payload"
            }
          }
        },
        signal
      );
      return;
    }
    const current = await bridge.listAgentTasks(currentScope, false, signal);
    let donors = [];
    try {
      donors = await bridge.listAgentTasks(donorScope, true, signal);
    } catch (error) {
      if (error instanceof HostCallError && error.fatal) throw error;
      diagnostic("workflow_donor_list_failed", {
        code: error instanceof HostCallError ? error.code.slice(0, 64) : "unknown"
      });
    }
    const journal = buildJournal(current, donors);
    if (recovering && journal.length)
      await bridge.call(
        {
          jobProgress: {
            message: `resuming with ${journal.length} journaled agent result(s)`
          }
        },
        signal
      ).catch(() => {
      });
    const wallTimeout = Number(info.limits?.wallTimeoutMs) || 3 * 60 * 60 * 1e3;
    timer = setTimeout(() => {
      wallTimedOut = true;
      local.abort(new DOMException("workflow wall timeout", "TimeoutError"));
    }, wallTimeout);
    const poller = new AgentTaskPoller(
      (s) => bridge.listAgentTasks(currentScope, false, s)
    );
    pollerRun = poller.run(signal).catch((error) => local.abort(error));
    const start = {
      script: input.script,
      failurePolicy: input.failure_policy === "fail_fast" ? failFastPolicy : collectPolicy,
      defaultSandbox: sandboxMode(input.default_sandbox),
      defaultEffortLevel: effortLevel(input.default_effort_level),
      limits: {
        synchronousTimeoutMs: "10000",
        wallTimeoutMs: String(wallTimeout),
        memoryBytes: String(256 << 20),
        maxAgentEffects: Math.max(info.limits?.maxAgentCalls ?? 0, 1),
        maxOutputBytes: String(4 << 20)
      },
      initialState: { revision: String(journal.length), journal }
    };
    let resolveTerminal, rejectTerminal;
    const terminal = new Promise((resolve2, reject) => {
      resolveTerminal = resolve2;
      rejectTerminal = reject;
    });
    const abort = () => rejectTerminal(signal.reason);
    signal.addEventListener("abort", abort, { once: true });
    const track = (promise) => {
      inflight.add(promise);
      void promise.catch((error) => {
        if (!pausing) local.abort(error);
      }).finally(() => inflight.delete(promise));
    };
    try {
      evaluator = startEvaluator(
        start,
        (frame) => {
          if (frame.kind === "effect")
            track(
              (async () => {
                const effect = frame.payload, request = effect.agentCall, key = `a${effect.index ?? 0}`;
                let outcome;
                try {
                  const previous = current.find(
                    (f) => f.callKey === key && inputHashes(request).includes(f.requestHash)
                  ), hasCurrentTask = current.some((f) => f.callKey === key);
                  if (request.profile && !profileAgentCreationEnabled && !hasCurrentTask) {
                    outcome = {
                      error: {
                        code: codes.unsupported,
                        message: "Profile-backed workflow agent creation is temporarily unavailable."
                      }
                    };
                  } else {
                    let fact = await bridge.ensureAgentTask(
                      key,
                      previous?.requestHash ?? effect.inputHash,
                      {
                        prompt: request.prompt,
                        resultSchema: request.schema ?? "",
                        sandbox: request.sandbox,
                        effortLevel: request.effortLevel,
                        inputFiles: request.inputFiles ?? [],
                        brief: request.brief,
                        groupKey: request.groupKey ?? "",
                        groupBrief: request.groupBrief ?? "",
                        profile: request.profile ?? ""
                      },
                      submissionSignal
                    );
                    if (!isTerminal(fact.status))
                      fact = await poller.wait(key, signal);
                    outcome = factTerminal(fact);
                  }
                } catch (error) {
                  if (signal.aborted || !(error instanceof HostCallError) || error.fatal)
                    throw error;
                  outcome = {
                    error: { code: error.code, message: error.message }
                  };
                }
                signal.throwIfAborted();
                evaluator.send({
                  kind: "resolved",
                  payload: {
                    index: effect.index ?? 0,
                    effectId: effect.effectId,
                    inputHash: effect.inputHash,
                    ...outcome
                  }
                });
              })()
            );
          else if (frame.kind === "progress" && frame.payload.message)
            track(
              bridge.call(
                { jobProgress: { message: frame.payload.message } },
                signal
              ).then(
                () => {
                },
                () => {
                }
              )
            );
          else if (frame.kind === "paused") {
            pausing = true;
            submissions.abort(
              new DOMException("workflow admission paused", "AbortError")
            );
            resolveTerminal(frame);
          } else if (frame.kind === "completed" || frame.kind === "failed")
            resolveTerminal(frame);
        },
        rejectTerminal,
        signal
      );
      const result = await terminal;
      if (result.kind === "paused") {
        try {
          const acknowledged = await bridge.call(
            { jobPause: result.payload },
            signal
          );
          if (!acknowledged.ack)
            throw new Error("host did not acknowledge workflow pause");
        } catch (error) {
          if (!(error instanceof HostCallError) || error.fatal || !(error.code === codes.unsupported || error.code === codes.invalid && !error.reason))
            throw error;
          await bridge.call(
            {
              jobFail: {
                error: {
                  code: codes.unsupported,
                  message: `${result.payload.message} This Host does not support resumable addon pause.`
                }
              }
            },
            signal
          );
        }
      } else if (result.kind === "completed")
        await bridge.call(
          {
            jobComplete: {
              output: Buffer.from(
                result.payload.content?.[0]?.text ?? ""
              ).toString("base64"),
              artifacts: result.payload.files ?? []
            }
          },
          signal
        );
      else await bridge.call({ jobFail: { error: result.payload } }, signal);
    } finally {
      signal.removeEventListener("abort", abort);
    }
  } catch (error) {
    if (error instanceof HostCallError && error.fatal) {
      diagnostic("workflow_host_rejected", { reason: error.reason });
      return;
    }
    if (parent.aborted || error instanceof DOMException && (error.name === "AbortError" || error.name === "TimeoutError")) {
      diagnostic("workflow_aborted", {
        reason: wallTimedOut ? "wall_timeout" : !parent.aborted && error instanceof DOMException && error.name === "TimeoutError" ? "bridge_timeout" : "cancelled"
      });
      return;
    }
    throw error;
  } finally {
    clearTimeout(timer);
    local.abort();
    await evaluator?.close();
    await pollerRun;
    await Promise.allSettled(inflight);
  }
}

