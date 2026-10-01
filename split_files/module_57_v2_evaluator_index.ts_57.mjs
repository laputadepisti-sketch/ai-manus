// v2/evaluator/index.ts
import { Worker } from "node:worker_threads";
function startEvaluator(start, emit, fail, signal) {
  signal.throwIfAborted();
  const cancellation = new SharedArrayBuffer(4);
  const compiled = new URL("./evaluator/thread.mjs", import.meta.url);
  const worker = new Worker(
    import.meta.url.endsWith(".ts") ? new URL("../../lib/evaluator/thread.mjs", import.meta.url) : compiled,
    {
      workerData: { start, cancellation },
      resourceLimits: { maxOldGenerationSizeMb: 384, stackSizeMb: 4 }
    }
  );
  let terminal = false;
  const abort = () => {
    Atomics.store(new Int32Array(cancellation), 0, 1);
    void worker.terminate();
  };
  signal.addEventListener("abort", abort, { once: true });
  worker.on("message", (frame) => {
    try {
      checkFrame(frame);
      if (frame.kind === "completed" || frame.kind === "failed" || frame.kind === "paused")
        terminal = true;
      emit(frame);
    } catch (error) {
      fail(error instanceof Error ? error : new Error(String(error)));
      abort();
    }
  });
  worker.on("error", fail);
  worker.on("exit", (code) => {
    signal.removeEventListener("abort", abort);
    if (!terminal && !signal.aborted)
      fail(
        new Error(`evaluator exited without a terminal frame (code ${code})`)
      );
  });
  return {
    send(frame) {
      worker.postMessage(checkFrame(frame));
    },
    async close() {
      signal.removeEventListener("abort", abort);
      terminal = true;
      Atomics.store(new Int32Array(cancellation), 0, 1);
      await worker.terminate();
    }
  };
}

