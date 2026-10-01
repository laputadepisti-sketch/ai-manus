// v2/submissionLimiter.ts
import { setTimeout as sleep } from "node:timers/promises";
var SubmissionLimiter = class {
  constructor(intervalMs = 200, maxInFlight = 8, now = () => performance.now(), wait = (ms, signal) => sleep(ms, void 0, { signal })) {
    this.intervalMs = intervalMs;
    this.maxInFlight = maxInFlight;
    this.now = now;
    this.wait = wait;
    if (!Number.isFinite(intervalMs) || intervalMs <= 0)
      throw new Error("submission interval must be positive");
    if (!Number.isInteger(maxInFlight) || maxInFlight < 1)
      throw new Error("submission request limit must be a positive integer");
  }
  intervalMs;
  maxInFlight;
  now;
  wait;
  tail = Promise.resolve();
  active = /* @__PURE__ */ new Set();
  nextStart = 0;
  async run(send, signal) {
    let result;
    const dispatched = this.tail.then(async () => {
      signal.throwIfAborted();
      if (this.active.size >= this.maxInFlight) {
        let abort;
        try {
          await Promise.race([
            ...this.active,
            new Promise((_, reject) => {
              abort = () => reject(signal.reason);
              signal.addEventListener("abort", abort, { once: true });
            })
          ]);
        } finally {
          signal.removeEventListener("abort", abort);
        }
      }
      signal.throwIfAborted();
      while (this.nextStart > this.now())
        await this.wait(Math.ceil(this.nextStart - this.now()), signal);
      signal.throwIfAborted();
      this.nextStart = this.now() + this.intervalMs;
      let done;
      const slot = new Promise((resolve2) => {
        done = resolve2;
      });
      this.active.add(slot);
      const release = () => {
        this.active.delete(slot);
        done();
      };
      try {
        result = send();
      } catch (error) {
        release();
        throw error;
      }
      void result.then(release, release);
    });
    this.tail = dispatched.then(
      () => {
      },
      () => {
      }
    );
    await dispatched;
    return result;
  }
};

