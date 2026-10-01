// v2/process.ts
import { spawn } from "node:child_process";
import { createHash, randomUUID } from "node:crypto";
import { closeSync, openSync } from "node:fs";
import { mkdir as mkdir2 } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join as join2, resolve } from "node:path";
function stateDir(dataDirectory) {
  return process.env.MANUS_WORKFLOW_STATE_DIR || dataDirectory || process.env.MANUS_ADDON_DATA_DIRECTORY || join2(tmpdir(), "manus-workflow");
}
function recordPath(jobId, dataDirectory) {
  return join2(
    stateDir(dataDirectory),
    `${createHash("sha256").update(jobId).digest("hex")}.worker.json`
  );
}
var workerSubcommand = () => process.env.MANUS_WORKFLOW_WORKER_SUBCOMMAND || "worker";
function openWorkerLog(path) {
  try {
    return openSync(path, "wx", 384);
  } catch {
    return "ignore";
  }
}
var starting = /* @__PURE__ */ new Map();
function spawnWorker(params) {
  const key = recordPath(params.jobId, params.dataDirectory);
  const previous = starting.get(key) ?? Promise.resolve("already-running");
  const next = previous.catch(() => {
  }).then(() => spawnOnce(params));
  starting.set(key, next);
  void next.finally(() => {
    if (starting.get(key) === next) starting.delete(key);
  }).catch(() => {
  });
  return next;
}
async function spawnOnce(params) {
  if (!params.jobId) throw new Error("job_id is required");
  const path = recordPath(params.jobId, params.dataDirectory), record = await readRecord(path);
  if (record && record.attempt >= params.attempt) return "already-running";
  const directory = stateDir(params.dataDirectory);
  await mkdir2(directory, { recursive: true, mode: 448 });
  await cleanupState(directory).catch(() => {
  });
  const instanceId = randomUUID(), log = openWorkerLog(`${path}.${instanceId}.log`);
  const args = [
    params.entrypoint ?? resolve(process.argv[1]),
    workerSubcommand(),
    "--job-id",
    params.jobId,
    "--attempt",
    String(params.attempt),
    "--instance-id",
    instanceId,
    ...params.recovering ? ["--recovering"] : []
  ];
  let child;
  try {
    child = spawn(process.execPath, args, {
      detached: true,
      windowsHide: true,
      stdio: ["ignore", log, log, "ipc"],
      env: {
        ...process.env,
        MANUS_WORKFLOW_ATTEMPT_TOKEN: params.attemptToken,
        MANUS_ADDON_DATA_DIRECTORY: directory
      }
    });
  } finally {
    if (typeof log === "number") closeSync(log);
  }
  try {
    await new Promise((resolveReady, reject) => {
      const timer = setTimeout(
        () => done(new Error("workflow worker startup timeout")),
        15e3
      );
      const done = (error) => {
        clearTimeout(timer);
        child.removeListener("error", onError);
        child.removeListener("exit", onExit);
        child.removeListener("message", onMessage);
        error ? reject(error) : resolveReady();
      };
      const onError = (error) => done(error), onExit = (code) => done(new Error(`workflow worker exited before ready (${code})`));
      const onMessage = (value) => {
        if (value?.ready === instanceId) done();
      };
      child.once("error", onError);
      child.once("exit", onExit);
      child.on("message", onMessage);
    });
    if (child.connected) child.disconnect();
    child.unref();
    return "started";
  } catch (error) {
    child.kill();
    await clearOwnRecord(path, instanceId);
    throw error;
  }
}
async function cancelWorker(params) {
  const path = recordPath(params.jobId, params.dataDirectory);
  await starting.get(path)?.catch(() => {
  });
  const records = (await readRecords(path)).filter(
    (record) => record.jobId === params.jobId && (params.attempt === 0 || record.attempt <= params.attempt)
  );
  if (!records.length) return false;
  const stopped = await Promise.all(
    records.map(async (record) => {
      const result = await commandResult(record, "cancel");
      if (result === "gone") await clearOwnRecord(path, record.instanceId);
      return result;
    })
  );
  const failed = stopped.filter((result) => result === "unconfirmed").length;
  if (failed)
    throw new Error(
      `workflow cancellation was not acknowledged by ${failed} of ${records.length} worker instance(s)`
    );
  return stopped.includes("acknowledged");
}

