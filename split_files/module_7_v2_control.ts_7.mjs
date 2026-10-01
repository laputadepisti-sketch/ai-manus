// v2/control.ts
import { randomBytes, timingSafeEqual } from "node:crypto";
import {
  lstat,
  mkdir,
  readdir,
  readFile,
  stat,
  unlink,
  writeFile
} from "node:fs/promises";
import { createServer } from "node:http";
import { basename, dirname, join } from "node:path";
async function readInstance(path) {
  try {
    const value = JSON.parse(await readFile(path, "utf8"));
    if (value.version !== 2 || !Number.isInteger(value.pid) || value.pid <= 0 || !Number.isInteger(value.attempt) || typeof value.jobId !== "string" || typeof value.instanceId !== "string" || !/^[a-zA-Z0-9-]+$/.test(value.instanceId) || !path.endsWith(`.${value.instanceId}`) || typeof value.controlToken !== "string" || !/^http:\/\/127\.0\.0\.1:\d+\/$/.test(value.endpoint))
      return;
    return value;
  } catch {
    return;
  }
}
function processMayExist(pid) {
  try {
    process.kill(pid, 0);
    return true;
  } catch (error) {
    return error.code !== "ESRCH";
  }
}
async function readRecords(path) {
  const prefix = `${basename(path)}.`;
  const names = await readdir(dirname(path)).catch(() => []);
  const candidates = [];
  for (const name of names) {
    if (!name.startsWith(prefix) || name === `${prefix}log` || !/^[a-zA-Z0-9-]+$/.test(name.slice(prefix.length)))
      continue;
    const file = join(dirname(path), name);
    const record = await readInstance(file);
    if (!record) continue;
    const info = await stat(file).catch(() => void 0);
    if (info) candidates.push({ record, mtime: info.mtimeMs });
  }
  candidates.sort(
    (a, b) => b.record.attempt - a.record.attempt || b.mtime - a.mtime
  );
  return candidates.map(({ record }) => record).filter((record) => processMayExist(record.pid));
}
async function readRecord(path) {
  const records = await readRecords(path);
  const alive = await Promise.all(
    records.map((record) => command(record, "ping"))
  );
  return records.find((_, index) => alive[index]);
}
var stateRetentionMs = 7 * 24 * 60 * 60 * 1e3;
async function cleanupState(directory, now = Date.now()) {
  const names = await readdir(directory).catch(() => []);
  const activeInstances = /* @__PURE__ */ new Set(), activeJobs = /* @__PURE__ */ new Set();
  for (const name of names) {
    const match = /^([a-f0-9]{64}\.worker\.json)\.([a-zA-Z0-9-]+)$/.exec(name);
    if (!match || match[2] === "log") continue;
    const record = await readInstance(join(directory, name));
    if (record && processMayExist(record.pid)) {
      activeInstances.add(name);
      activeJobs.add(match[1]);
    }
  }
  for (const name of names) {
    const match = /^([a-f0-9]{64}\.worker\.json)(?:\.([a-zA-Z0-9-]+))?(\.log|\.tmp)?$/.exec(
      name
    );
    if (!match) continue;
    const file = join(directory, name);
    const info = await lstat(file).catch(() => void 0);
    if (!info?.isFile() || now - info.mtimeMs < stateRetentionMs) continue;
    const suffix = match[2];
    if (!suffix || suffix === "log") {
      if (activeJobs.has(match[1])) continue;
    } else {
      if (activeInstances.has(`${match[1]}.${suffix}`)) continue;
    }
    await unlink(file).catch(() => {
    });
  }
}
async function commandResult(record, op, timeout = 1500) {
  try {
    const response = await fetch(record.endpoint, {
      method: "POST",
      redirect: "error",
      signal: AbortSignal.timeout(timeout),
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        op,
        jobId: record.jobId,
        attempt: record.attempt,
        instanceId: record.instanceId,
        token: record.controlToken
      })
    });
    if (!response.ok) return "unconfirmed";
    const value = await response.json();
    return value.instanceId === record.instanceId ? "acknowledged" : "unconfirmed";
  } catch (error) {
    return error instanceof Error && error.cause?.code === "ECONNREFUSED" ? "gone" : "unconfirmed";
  }
}
async function command(record, op, timeout = 1500) {
  return await commandResult(record, op, timeout) === "acknowledged";
}
async function clearOwnRecord(path, instanceId) {
  if (!/^[a-zA-Z0-9-]+$/.test(instanceId)) return;
  await unlink(`${path}.${instanceId}`).catch(() => {
  });
}
async function startControl(path, identity, abort) {
  if (!/^[a-zA-Z0-9-]+$/.test(identity.instanceId))
    throw new Error("invalid worker instance id");
  const token = randomBytes(32).toString("hex");
  const server = createServer(async (req, res) => {
    try {
      if (req.method !== "POST" || req.url !== "/") {
        res.writeHead(404).end();
        return;
      }
      const chunks = [];
      let size = 0;
      for await (const raw of req) {
        const chunk = Buffer.from(raw);
        size += chunk.length;
        if (size > 4096) {
          res.writeHead(413).end();
          return;
        }
        chunks.push(chunk);
      }
      const value = JSON.parse(Buffer.concat(chunks).toString());
      const candidate = typeof value.token === "string" ? Buffer.from(value.token) : Buffer.alloc(0);
      if (candidate.length !== token.length || !timingSafeEqual(candidate, Buffer.from(token)) || value.jobId !== identity.jobId || value.attempt !== identity.attempt || value.instanceId !== identity.instanceId || !["ping", "cancel"].includes(value.op)) {
        res.writeHead(403).end();
        return;
      }
      if (value.op === "cancel") res.once("finish", abort);
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ instanceId: identity.instanceId }));
    } catch {
      res.writeHead(400).end();
    }
  });
  server.requestTimeout = 2e3;
  server.headersTimeout = 2e3;
  server.timeout = 2e3;
  await new Promise((resolve2, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => {
      server.removeListener("error", reject);
      resolve2();
    });
  });
  const address = server.address();
  if (!address || typeof address === "string")
    throw new Error("worker control address unavailable");
  const record = {
    version: 2,
    pid: process.pid,
    ...identity,
    endpoint: `http://127.0.0.1:${address.port}/`,
    controlToken: token
  };
  try {
    await mkdir(dirname(path), { recursive: true, mode: 448 });
    await writeFile(`${path}.${identity.instanceId}`, JSON.stringify(record), {
      mode: 384,
      flag: "wx"
    });
  } catch (error) {
    await clearOwnRecord(path, identity.instanceId);
    server.close();
    throw error;
  }
  return {
    record,
    async close() {
      await clearOwnRecord(path, identity.instanceId);
      await new Promise((resolve2) => {
        server.close(() => resolve2());
        server.closeAllConnections();
      });
    }
  };
}

