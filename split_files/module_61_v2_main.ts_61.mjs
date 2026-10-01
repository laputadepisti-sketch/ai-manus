// v2/main.ts
async function main() {
  const [command2, ...args] = process.argv.slice(2);
  if (command2 === "mcp") {
    createWorkflowMcpServer(
      false ? "dev" : "0.0.21"
    ).start();
    return;
  }
  if (command2 !== "worker" && command2 !== workerSubcommand())
    throw new Error("usage: workflow <mcp|worker> [flags]");
  const { values } = parseArgs({
    args,
    options: {
      "job-id": { type: "string" },
      attempt: { type: "string", default: "0" },
      recovering: { type: "boolean" },
      "instance-id": { type: "string" }
    }
  });
  const jobId = values["job-id"], attempt = Number(values.attempt), attemptToken = process.env.MANUS_WORKFLOW_ATTEMPT_TOKEN;
  if (!jobId) throw new Error("--job-id is required");
  if (!attemptToken) throw new Error("MANUS_WORKFLOW_ATTEMPT_TOKEN is required");
  if (!Number.isInteger(attempt) || attempt < 0 || attempt > 4294967295)
    throw new Error("invalid attempt");
  const controller = new AbortController(), abort = () => controller.abort();
  process.on("SIGTERM", abort);
  process.on("SIGINT", abort);
  const instanceId = values["instance-id"] ?? randomUUID2();
  const control = await startControl(
    recordPath(jobId),
    { jobId, attempt, instanceId },
    abort
  );
  process.send?.({ ready: instanceId });
  try {
    await runWorker(
      { jobId, attempt, attemptToken, recovering: values.recovering },
      controller.signal
    );
  } finally {
    await control.close();
    process.removeListener("SIGTERM", abort);
    process.removeListener("SIGINT", abort);
  }
}
main().catch((error) => {
  console.error(message(error));
  process.exitCode = 1;
});
