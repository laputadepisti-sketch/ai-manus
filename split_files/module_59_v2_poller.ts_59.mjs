// v2/poller.ts
var isTerminal = (status) => ["completed", "failed", "killed"].includes(status);
var AgentTaskPoller = class {
  constructor(list, options = {
    interval: 2500,
    idleInterval: 3e4,
    maxInterval: 2e4,
    failureBudget: 3e5
  }) {
    this.list = list;
    this.options = options;
  }
  list;
  options;
  waiters = /* @__PURE__ */ new Map();
  wake;
  pendingWake = false;
  wait(callKey, signal) {
    signal.throwIfAborted();
    return new Promise((resolve2, reject) => {
      const waiter = {
        resolve: resolve2,
        reject,
        misses: 0,
        cleanup: () => signal.removeEventListener("abort", abort)
      };
      const group = this.waiters.get(callKey) ?? /* @__PURE__ */ new Set();
      group.add(waiter);
      this.waiters.set(callKey, group);
      const abort = () => {
        group.delete(waiter);
        if (!group.size) this.waiters.delete(callKey);
        waiter.cleanup();
        reject(signal.reason);
      };
      signal.addEventListener("abort", abort, { once: true });
      this.pendingWake = true;
      this.wake?.();
    });
  }
  dispatch(facts) {
    if (!facts.length && this.waiters.size)
      return { delivered: 0, emptyAnomaly: true };
    const byKey = new Map(facts.map((f) => [f.callKey, f]));
    let delivered = 0;
    for (const [key, group] of this.waiters)
      for (const waiter of group) {
        const fact = byKey.get(key);
        if (fact) waiter.misses = 0;
        else waiter.misses++;
        if (fact && isTerminal(fact.status)) {
          waiter.resolve(fact);
        } else if (waiter.misses >= 3) {
          waiter.reject(
            new HostCallError(
              codes.notFound,
              `agent task ${key} is no longer listed for this job (superseded or removed)`
            )
          );
        } else continue;
        waiter.cleanup();
        group.delete(waiter);
        delivered++;
        if (!group.size) this.waiters.delete(key);
      }
    return { delivered, emptyAnomaly: false };
  }
  delay(ms, signal) {
    if (this.pendingWake) {
      this.pendingWake = false;
      return Promise.resolve(true);
    }
    return new Promise((resolve2) => {
      const done = (woken) => {
        clearTimeout(timer);
        signal.removeEventListener("abort", abort);
        this.wake = void 0;
        this.pendingWake = false;
        resolve2(woken);
      };
      const abort = () => done(false), timer = setTimeout(() => done(false), ms);
      this.wake = () => done(true);
      signal.addEventListener("abort", abort, { once: true });
      if (signal.aborted) abort();
    });
  }
  async run(signal) {
    let failingSince, interval = this.options.interval;
    try {
      while (!signal.aborted) {
        const idle = !this.waiters.size;
        if (idle) {
          await this.delay(this.options.idleInterval, signal);
          if (signal.aborted) return;
          interval = this.options.interval;
        }
        try {
          const { delivered, emptyAnomaly } = this.dispatch(
            await this.list(signal)
          );
          if (emptyAnomaly) {
            failingSince ??= Date.now();
            if (Date.now() - failingSince >= this.options.failureBudget)
              throw new Error(
                "agent task list kept returning an empty set while waiters were registered"
              );
          } else failingSince = void 0;
          interval = delivered || idle ? this.options.interval : Math.min(interval * 2, this.options.maxInterval);
        } catch (error) {
          if (signal.aborted) return;
          if (error instanceof HostCallError && error.fatal) throw error;
          failingSince ??= Date.now();
          if (Date.now() - failingSince >= this.options.failureBudget)
            throw error;
        }
        if (this.waiters.size && await this.delay(interval, signal))
          interval = this.options.interval;
      }
    } finally {
      for (const group of this.waiters.values())
        for (const waiter of group) {
          waiter.cleanup();
          waiter.reject(signal.reason ?? new Error("poller stopped"));
        }
      this.waiters.clear();
    }
  }
};

