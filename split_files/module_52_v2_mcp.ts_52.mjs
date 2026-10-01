// v2/mcp.ts
var addonId = "manus-workflow";
function listTools() {
  return workflowTools;
}
function runResult(params) {
  const requested = params.max_agent_calls;
  const effective = Math.min(
    2e3,
    requested + Math.max(2, Math.floor(requested * 0.1))
  );
  const summary = `Workflow queued: ${params.brief}. Agent-call budget: requested ${requested}, effective limit ${effective} (one-time allowance).`;
  const result = {
    schema: "manus.addon.result/v1",
    addonId,
    summary,
    effects: [
      {
        type: "job_start",
        brief: params.brief,
        input: {
          script: params.script,
          failure_policy: params.failure_policy,
          default_sandbox: params.sandbox,
          default_effort_level: params.effort_level
        },
        proposal: {
          estimated_agent_calls: params.estimated_agent_calls,
          max_agent_calls: effective
        },
        resume_tool: "_start",
        cancel_tool: "_cancel"
      }
    ]
  };
  return {
    content: [{ type: "text", text: summary }],
    structuredContent: { addon_result: result },
    _meta: { "manus.addon.result/v1": result }
  };
}
async function callTool(params) {
  const args = params.arguments ?? {}, dataDirectory = params._meta?.["ai.manus/invocationContext"]?.dataDirectory;
  if (params.name === "run") return runResult(await normalizeRunParams(args));
  if (!["run", "_start", "_cancel"].includes(params.name))
    throw new Error(`unknown tool: ${params.name}`);
  if (typeof args.job_id !== "string" || !args.job_id)
    throw new Error("job_id is required");
  const attempt = args.attempt ?? 0;
  if (!Number.isInteger(attempt) || attempt < 0 || attempt > 4294967295)
    throw new Error("attempt must be an unsigned 32-bit integer");
  let text;
  if (params.name === "_start") {
    if (typeof args.attempt_token !== "string" || !args.attempt_token)
      throw new Error("job_id and attempt_token are required");
    const outcome = await spawnWorker({
      jobId: args.job_id,
      attempt,
      attemptToken: args.attempt_token,
      recovering: args.recovering === true,
      dataDirectory
    });
    text = `worker ${outcome === "started" ? "started" : "already running"} for job ${args.job_id} attempt ${attempt}`;
  } else {
    const stopped = await cancelWorker({
      jobId: args.job_id,
      attempt,
      dataDirectory
    });
    text = stopped ? `worker for job ${args.job_id} signalled to stop` : `no running worker found for job ${args.job_id}`;
  }
  return { content: [{ type: "text", text }] };
}
function createWorkflowMcpServer(version) {
  return createMcpServer({
    serverInfo: { name: "workflow", version },
    listTools,
    async callTool(id, params, io) {
      try {
        io.respond(id, await callTool(params));
      } catch (error) {
        io.respond(id, {
          isError: true,
          content: [{ type: "text", text: message(error) }]
        });
      }
    }
  });
}

