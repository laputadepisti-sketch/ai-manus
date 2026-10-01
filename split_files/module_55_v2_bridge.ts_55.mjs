// v2/bridge.ts
var fatalReasons = /* @__PURE__ */ new Set([
  "stale_attempt",
  "job_killed",
  "job_paused",
  "unauthorized",
  "execution_target_changed"
]);
var HostCallError = class extends Error {
  constructor(code, text, reason = "") {
    super(text);
    this.code = code;
    this.reason = reason;
  }
  code;
  reason;
  get fatal() {
    return fatalReasons.has(this.reason);
  }
  get retryable() {
    return !this.fatal && ["ERROR_CODE_HOST_UNAVAILABLE", "ERROR_CODE_TIMEOUT"].includes(this.code);
  }
};
var BridgeClient = class {
  constructor(options, submissions = new SubmissionLimiter()) {
    this.options = options;
    this.submissions = submissions;
    this.retryLimit = options.retryLimit ?? 3e5;
  }
  options;
  submissions;
  retryLimit;
  async call(call, signal) {
    const url = this.options.url || process.env.MANUS_RUNTIME_HOST_CALL_URL || "http://127.0.0.1:9330/addon/host-call";
    const payload = JSON.stringify(
      normalize(HostCallRequestedSchema, {
        ...call,
        jobId: this.options.jobId,
        attempt: this.options.attempt,
        attemptToken: this.options.attemptToken
      })
    );
    let deadline;
    let delay = this.options.initialDelay ?? 1e3;
    for (; ; ) {
      signal.throwIfAborted();
      let error, retryable = false;
      const send = async () => {
        deadline ??= Date.now() + this.retryLimit;
        const auth = this.options.auth ?? process.env.MANUS_RUNTIME_HOST_CALL_AUTH;
        const response = await fetch(url, {
          method: "POST",
          body: payload,
          headers: {
            "Content-Type": "application/json",
            ...auth ? { "X-Manus-Host-Call-Auth": auth } : {}
          },
          signal: AbortSignal.any([
            signal,
            AbortSignal.timeout(this.options.requestTimeout ?? 12e4)
          ]),
          redirect: "error"
        });
        let resolved;
        try {
          const chunks = [];
          let size = 0;
          const reader = response.body?.getReader();
          if (!reader) throw new Error("empty response");
          try {
            for (; ; ) {
              const { done, value } = await reader.read();
              if (done) break;
              size += value.length;
              if (size > 32 << 20) throw new Error("response exceeds limit");
              chunks.push(value);
            }
          } finally {
            await reader.cancel();
          }
          resolved = normalize(
            HostCallResolvedSchema,
            JSON.parse(Buffer.concat(chunks).toString())
          );
        } catch {
          retryable = response.status >= 500;
          throw new Error(
            `decode host call response: undecodable response with status ${response.status}`
          );
        }
        if (!resolved.error) return resolved;
        throw new HostCallError(
          resolved.error.code ?? "",
          resolved.error.message ?? "",
          resolved.error.details?.reason ?? ""
        );
      };
      try {
        return await (call.ensureAgentTask ? this.submissions.run(send, signal) : send());
      } catch (err) {
        signal.throwIfAborted();
        error = err;
        if (err instanceof HostCallError) retryable = err.retryable;
        else if (err instanceof TypeError || err instanceof Error && err.name === "TimeoutError")
          retryable = true;
      }
      if (!retryable || Date.now() + delay > (deadline ?? 0)) throw error;
      await sleep2(delay, void 0, { signal });
      delay = Math.min(delay * 2, 3e4);
    }
  }
  async jobGet(signal) {
    const result = await this.call({ jobGet: {} }, signal);
    if (!result.job) throw new Error("host call job.get returned no job info");
    return result.job;
  }
  async listAgentTasks(scope, completedOnly, signal) {
    const result = await this.call(
      { listAgentTasks: { scope, completedOnly } },
      signal
    );
    if (!result.agentTasks)
      throw new Error("host call list_agent_tasks returned no fact list");
    return result.agentTasks.tasks ?? [];
  }
  async ensureAgentTask(callKey, requestHash, request, signal) {
    const result = await this.call(
      { callKey, requestHash, ensureAgentTask: request },
      signal
    );
    if (!result.agentTask)
      throw new Error("host call ensure_agent_task returned no fact");
    return result.agentTask;
  }
};

