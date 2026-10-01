import { createRequire as __createRequire } from 'node:module'; const require = __createRequire(import.meta.url);
var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res, err) => function __init() {
  if (err) throw err[0];
  try {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  } catch (e) {
    throw err = [e], e;
  }
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// node_modules/.pnpm/@jitl+quickjs-ffi-types@0.32.0/node_modules/@jitl/quickjs-ffi-types/dist/index.mjs
var EvalFlags, IntrinsicsFlags, JSPromiseStateEnum, GetOwnPropertyNamesFlags, IsEqualOp;
var init_dist = __esm({
  "node_modules/.pnpm/@jitl+quickjs-ffi-types@0.32.0/node_modules/@jitl/quickjs-ffi-types/dist/index.mjs"() {
    EvalFlags = { JS_EVAL_TYPE_GLOBAL: 0, JS_EVAL_TYPE_MODULE: 1, JS_EVAL_TYPE_DIRECT: 2, JS_EVAL_TYPE_INDIRECT: 3, JS_EVAL_TYPE_MASK: 3, JS_EVAL_FLAG_STRICT: 8, JS_EVAL_FLAG_STRIP: 16, JS_EVAL_FLAG_COMPILE_ONLY: 32, JS_EVAL_FLAG_BACKTRACE_BARRIER: 64 };
    IntrinsicsFlags = { BaseObjects: 1, Date: 2, Eval: 4, StringNormalize: 8, RegExp: 16, RegExpCompiler: 32, JSON: 64, Proxy: 128, MapSet: 256, TypedArrays: 512, Promise: 1024, BigInt: 2048, BigFloat: 4096, BigDecimal: 8192, OperatorOverloading: 16384, BignumExt: 32768 };
    JSPromiseStateEnum = { Pending: 0, Fulfilled: 1, Rejected: 2 };
    GetOwnPropertyNamesFlags = { JS_GPN_STRING_MASK: 1, JS_GPN_SYMBOL_MASK: 2, JS_GPN_PRIVATE_MASK: 4, JS_GPN_ENUM_ONLY: 16, JS_GPN_SET_ENUM: 32, QTS_GPN_NUMBER_MASK: 64, QTS_STANDARD_COMPLIANT_NUMBER: 128 };
    IsEqualOp = { IsStrictlyEqual: 0, IsSameValue: 1, IsSameValueZero: 2 };
  }
});

// node_modules/.pnpm/quickjs-emscripten-core@0.32.0/node_modules/quickjs-emscripten-core/dist/chunk-V2S4ZYJR.mjs
function debugLog(...args) {
  QTS_DEBUG && console.log("quickjs-emscripten:", ...args);
}
function* awaitYield(value) {
  return yield value;
}
function awaitYieldOf(generator) {
  return awaitYield(awaitEachYieldedPromise(generator));
}
function maybeAsyncFn(that, fn) {
  return (...args) => {
    let generator = fn.call(that, AwaitYield, ...args);
    return awaitEachYieldedPromise(generator);
  };
}
function maybeAsync(that, startGenerator) {
  let generator = startGenerator.call(that, AwaitYield);
  return awaitEachYieldedPromise(generator);
}
function awaitEachYieldedPromise(gen) {
  function handleNextStep(step) {
    return step.done ? step.value : step.value instanceof Promise ? step.value.then((value) => handleNextStep(gen.next(value)), (error) => handleNextStep(gen.throw(error))) : handleNextStep(gen.next(step.value));
  }
  return handleNextStep(gen.next());
}
function scopeFinally(scope, blockError) {
  let disposeError;
  try {
    scope.dispose();
  } catch (error) {
    disposeError = error;
  }
  if (blockError && disposeError) throw Object.assign(blockError, { message: `${blockError.message}
 Then, failed to dispose scope: ${disposeError.message}`, disposeError }), blockError;
  if (blockError || disposeError) throw blockError || disposeError;
}
function createDisposableArray(items) {
  let array = items ? Array.from(items) : [];
  function disposeAlive() {
    return array.forEach((disposable) => disposable.alive ? disposable.dispose() : void 0);
  }
  function someIsAlive() {
    return array.some((disposable) => disposable.alive);
  }
  return Object.defineProperty(array, SymbolDispose, { configurable: true, enumerable: false, value: disposeAlive }), Object.defineProperty(array, "dispose", { configurable: true, enumerable: false, value: disposeAlive }), Object.defineProperty(array, "alive", { configurable: true, enumerable: false, get: someIsAlive }), array;
}
function isDisposable(value) {
  return !!(value && (typeof value == "object" || typeof value == "function") && "alive" in value && typeof value.alive == "boolean" && "dispose" in value && typeof value.dispose == "function");
}
function intrinsicsToFlags(intrinsics) {
  if (!intrinsics) return 0;
  let result = 0;
  for (let [maybeIntrinsicName, enabled] of Object.entries(intrinsics)) {
    if (!(maybeIntrinsicName in IntrinsicsFlags)) throw new QuickJSUnknownIntrinsic(maybeIntrinsicName);
    enabled && (result |= IntrinsicsFlags[maybeIntrinsicName]);
  }
  return result;
}
function evalOptionsToFlags(evalOptions) {
  if (typeof evalOptions == "number") return evalOptions;
  if (evalOptions === void 0) return 0;
  let { type, strict, strip, compileOnly, backtraceBarrier } = evalOptions, flags = 0;
  return type === "global" && (flags |= EvalFlags.JS_EVAL_TYPE_GLOBAL), type === "module" && (flags |= EvalFlags.JS_EVAL_TYPE_MODULE), strict && (flags |= EvalFlags.JS_EVAL_FLAG_STRICT), strip && (flags |= EvalFlags.JS_EVAL_FLAG_STRIP), compileOnly && (flags |= EvalFlags.JS_EVAL_FLAG_COMPILE_ONLY), backtraceBarrier && (flags |= EvalFlags.JS_EVAL_FLAG_BACKTRACE_BARRIER), flags;
}
function getOwnPropertyNamesOptionsToFlags(options) {
  if (typeof options == "number") return options;
  if (options === void 0) return 0;
  let { strings: includeStrings, symbols: includeSymbols, quickjsPrivate: includePrivate, onlyEnumerable, numbers: includeNumbers, numbersAsStrings } = options, flags = 0;
  return includeStrings && (flags |= GetOwnPropertyNamesFlags.JS_GPN_STRING_MASK), includeSymbols && (flags |= GetOwnPropertyNamesFlags.JS_GPN_SYMBOL_MASK), includePrivate && (flags |= GetOwnPropertyNamesFlags.JS_GPN_PRIVATE_MASK), onlyEnumerable && (flags |= GetOwnPropertyNamesFlags.JS_GPN_ENUM_ONLY), includeNumbers && (flags |= GetOwnPropertyNamesFlags.QTS_GPN_NUMBER_MASK), numbersAsStrings && (flags |= GetOwnPropertyNamesFlags.QTS_STANDARD_COMPLIANT_NUMBER), flags;
}
function concat(...values) {
  let result = [];
  for (let value of values) value !== void 0 && (result = result.concat(value));
  return result;
}
function getGroupId(id) {
  return id >> 8;
}
function applyBaseRuntimeOptions(runtime2, options) {
  options.interruptHandler && runtime2.setInterruptHandler(options.interruptHandler), options.maxStackSizeBytes !== void 0 && runtime2.setMaxStackSize(options.maxStackSizeBytes), options.memoryLimitBytes !== void 0 && runtime2.setMemoryLimit(options.memoryLimitBytes);
}
function applyModuleEvalRuntimeOptions(runtime2, options) {
  options.moduleLoader && runtime2.setModuleLoader(options.moduleLoader), options.shouldInterrupt && runtime2.setInterruptHandler(options.shouldInterrupt), options.memoryLimitBytes !== void 0 && runtime2.setMemoryLimit(options.memoryLimitBytes), options.maxStackSizeBytes !== void 0 && runtime2.setMaxStackSize(options.maxStackSizeBytes);
}
var __defProp2, __export2, QTS_DEBUG, errors_exports, QuickJSUnwrapError, QuickJSWrongOwner, QuickJSUseAfterFree, QuickJSNotImplemented, QuickJSAsyncifyError, QuickJSAsyncifySuspended, QuickJSMemoryLeakDetected, QuickJSEmscriptenModuleError, QuickJSUnknownIntrinsic, QuickJSPromisePending, QuickJSEmptyGetOwnPropertyNames, QuickJSHostRefRangeExceeded, QuickJSHostRefInvalid, AwaitYield, UsingDisposable, SymbolDispose, prototypeAsAny, Lifetime, StaticLifetime, WeakLifetime, Scope, AbstractDisposableResult, DisposableSuccess, DisposableFail, DisposableResult, QuickJSDeferredPromise, ModuleMemory, DefaultIntrinsics, QuickJSIterator, INT32_MIN2, INT32_MAX2, INVALID_HOST_REF_ID, HostRefMap, HostRef, ContextMemory, QuickJSContext, QuickJSRuntime, QuickJSEmscriptenModuleCallbacks, QuickJSModuleCallbacks, QuickJSWASMModule;
var init_chunk_V2S4ZYJR = __esm({
  "node_modules/.pnpm/quickjs-emscripten-core@0.32.0/node_modules/quickjs-emscripten-core/dist/chunk-V2S4ZYJR.mjs"() {
    init_dist();
    init_dist();
    __defProp2 = Object.defineProperty;
    __export2 = (target, all) => {
      for (var name in all) __defProp2(target, name, { get: all[name], enumerable: true });
    };
    QTS_DEBUG = false;
    errors_exports = {};
    __export2(errors_exports, { QuickJSAsyncifyError: () => QuickJSAsyncifyError, QuickJSAsyncifySuspended: () => QuickJSAsyncifySuspended, QuickJSEmptyGetOwnPropertyNames: () => QuickJSEmptyGetOwnPropertyNames, QuickJSEmscriptenModuleError: () => QuickJSEmscriptenModuleError, QuickJSHostRefInvalid: () => QuickJSHostRefInvalid, QuickJSHostRefRangeExceeded: () => QuickJSHostRefRangeExceeded, QuickJSMemoryLeakDetected: () => QuickJSMemoryLeakDetected, QuickJSNotImplemented: () => QuickJSNotImplemented, QuickJSPromisePending: () => QuickJSPromisePending, QuickJSUnknownIntrinsic: () => QuickJSUnknownIntrinsic, QuickJSUnwrapError: () => QuickJSUnwrapError, QuickJSUseAfterFree: () => QuickJSUseAfterFree, QuickJSWrongOwner: () => QuickJSWrongOwner });
    QuickJSUnwrapError = class extends Error {
      constructor(cause, context) {
        let message2 = typeof cause == "object" && cause && "message" in cause ? String(cause.message) : String(cause);
        super(message2);
        this.cause = cause;
        this.context = context;
        this.name = "QuickJSUnwrapError";
      }
    };
    QuickJSWrongOwner = class extends Error {
      constructor() {
        super(...arguments);
        this.name = "QuickJSWrongOwner";
      }
    };
    QuickJSUseAfterFree = class extends Error {
      constructor() {
        super(...arguments);
        this.name = "QuickJSUseAfterFree";
      }
    };
    QuickJSNotImplemented = class extends Error {
      constructor() {
        super(...arguments);
        this.name = "QuickJSNotImplemented";
      }
    };
    QuickJSAsyncifyError = class extends Error {
      constructor() {
        super(...arguments);
        this.name = "QuickJSAsyncifyError";
      }
    };
    QuickJSAsyncifySuspended = class extends Error {
      constructor() {
        super(...arguments);
        this.name = "QuickJSAsyncifySuspended";
      }
    };
    QuickJSMemoryLeakDetected = class extends Error {
      constructor() {
        super(...arguments);
        this.name = "QuickJSMemoryLeakDetected";
      }
    };
    QuickJSEmscriptenModuleError = class extends Error {
      constructor() {
        super(...arguments);
        this.name = "QuickJSEmscriptenModuleError";
      }
    };
    QuickJSUnknownIntrinsic = class extends TypeError {
      constructor() {
        super(...arguments);
        this.name = "QuickJSUnknownIntrinsic";
      }
    };
    QuickJSPromisePending = class extends Error {
      constructor() {
        super(...arguments);
        this.name = "QuickJSPromisePending";
      }
    };
    QuickJSEmptyGetOwnPropertyNames = class extends Error {
      constructor() {
        super(...arguments);
        this.name = "QuickJSEmptyGetOwnPropertyNames";
      }
    };
    QuickJSHostRefRangeExceeded = class extends Error {
      constructor() {
        super(...arguments);
        this.name = "QuickJSHostRefRangeExceeded";
      }
    };
    QuickJSHostRefInvalid = class extends Error {
      constructor() {
        super(...arguments);
        this.name = "QuickJSHostRefInvalid";
      }
    };
    AwaitYield = awaitYield;
    AwaitYield.of = awaitYieldOf;
    UsingDisposable = class {
      [Symbol.dispose]() {
        return this.dispose();
      }
    };
    SymbolDispose = Symbol.dispose ?? /* @__PURE__ */ Symbol.for("Symbol.dispose");
    prototypeAsAny = UsingDisposable.prototype;
    prototypeAsAny[SymbolDispose] || (prototypeAsAny[SymbolDispose] = function() {
      return this.dispose();
    });
    Lifetime = class _Lifetime extends UsingDisposable {
      constructor(_value, copier, disposer, _owner) {
        super();
        this._value = _value;
        this.copier = copier;
        this.disposer = disposer;
        this._owner = _owner;
        this._alive = true;
        this._constructorStack = QTS_DEBUG ? new Error("Lifetime constructed").stack : void 0;
      }
      get alive() {
        return this._alive;
      }
      get value() {
        return this.assertAlive(), this._value;
      }
      get owner() {
        return this._owner;
      }
      get dupable() {
        return !!this.copier;
      }
      dup() {
        if (this.assertAlive(), !this.copier) throw new Error("Non-dupable lifetime");
        return new _Lifetime(this.copier(this._value), this.copier, this.disposer, this._owner);
      }
      consume(map) {
        this.assertAlive();
        let result = map(this);
        return this.dispose(), result;
      }
      map(map) {
        return this.assertAlive(), map(this);
      }
      tap(fn) {
        return fn(this), this;
      }
      dispose() {
        this.assertAlive(), this.disposer && this.disposer(this._value), this._alive = false;
      }
      assertAlive() {
        if (!this.alive) throw this._constructorStack ? new QuickJSUseAfterFree(`Lifetime not alive
${this._constructorStack}
Lifetime used`) : new QuickJSUseAfterFree("Lifetime not alive");
      }
    };
    StaticLifetime = class extends Lifetime {
      constructor(value, owner) {
        super(value, void 0, void 0, owner);
      }
      get dupable() {
        return true;
      }
      dup() {
        return this;
      }
      dispose() {
      }
    };
    WeakLifetime = class extends Lifetime {
      constructor(value, copier, disposer, owner) {
        super(value, copier, disposer, owner);
      }
      dispose() {
        this._alive = false;
      }
    };
    Scope = class _Scope extends UsingDisposable {
      constructor() {
        super(...arguments);
        this._disposables = new Lifetime(/* @__PURE__ */ new Set());
        this.manage = (lifetime) => (this._disposables.value.add(lifetime), lifetime);
      }
      static withScope(block) {
        let scope = new _Scope(), blockError;
        try {
          return block(scope);
        } catch (error) {
          throw blockError = error, error;
        } finally {
          scopeFinally(scope, blockError);
        }
      }
      static withScopeMaybeAsync(_this, block) {
        return maybeAsync(void 0, function* (awaited) {
          let scope = new _Scope(), blockError;
          try {
            return yield* awaited.of(block.call(_this, awaited, scope));
          } catch (error) {
            throw blockError = error, error;
          } finally {
            scopeFinally(scope, blockError);
          }
        });
      }
      static async withScopeAsync(block) {
        let scope = new _Scope(), blockError;
        try {
          return await block(scope);
        } catch (error) {
          throw blockError = error, error;
        } finally {
          scopeFinally(scope, blockError);
        }
      }
      get alive() {
        return this._disposables.alive;
      }
      dispose() {
        let lifetimes = Array.from(this._disposables.value.values()).reverse();
        for (let lifetime of lifetimes) lifetime.alive && lifetime.dispose();
        this._disposables.dispose();
      }
    };
    AbstractDisposableResult = class _AbstractDisposableResult extends UsingDisposable {
      static success(value) {
        return new DisposableSuccess(value);
      }
      static fail(error, onUnwrap) {
        return new DisposableFail(error, onUnwrap);
      }
      static is(result) {
        return result instanceof _AbstractDisposableResult;
      }
    };
    DisposableSuccess = class extends AbstractDisposableResult {
      constructor(value) {
        super();
        this.value = value;
      }
      get alive() {
        return isDisposable(this.value) ? this.value.alive : true;
      }
      dispose() {
        isDisposable(this.value) && this.value.dispose();
      }
      unwrap() {
        return this.value;
      }
      unwrapOr(_fallback) {
        return this.value;
      }
    };
    DisposableFail = class extends AbstractDisposableResult {
      constructor(error, onUnwrap) {
        super();
        this.error = error;
        this.onUnwrap = onUnwrap;
      }
      get alive() {
        return isDisposable(this.error) ? this.error.alive : true;
      }
      dispose() {
        isDisposable(this.error) && this.error.dispose();
      }
      unwrap() {
        throw this.onUnwrap(this), this.error;
      }
      unwrapOr(fallback) {
        return fallback;
      }
    };
    DisposableResult = AbstractDisposableResult;
    QuickJSDeferredPromise = class extends UsingDisposable {
      constructor(args) {
        super();
        this.resolve = (value) => {
          this.resolveHandle.alive && (this.context.unwrapResult(this.context.callFunction(this.resolveHandle, this.context.undefined, value || this.context.undefined)).dispose(), this.disposeResolvers(), this.onSettled());
        };
        this.reject = (value) => {
          this.rejectHandle.alive && (this.context.unwrapResult(this.context.callFunction(this.rejectHandle, this.context.undefined, value || this.context.undefined)).dispose(), this.disposeResolvers(), this.onSettled());
        };
        this.dispose = () => {
          this.handle.alive && this.handle.dispose(), this.disposeResolvers();
        };
        this.context = args.context, this.owner = args.context.runtime, this.handle = args.promiseHandle, this.settled = new Promise((resolve2) => {
          this.onSettled = resolve2;
        }), this.resolveHandle = args.resolveHandle, this.rejectHandle = args.rejectHandle;
      }
      get alive() {
        return this.handle.alive || this.resolveHandle.alive || this.rejectHandle.alive;
      }
      disposeResolvers() {
        this.resolveHandle.alive && this.resolveHandle.dispose(), this.rejectHandle.alive && this.rejectHandle.dispose();
      }
    };
    ModuleMemory = class {
      constructor(module) {
        this.module = module;
      }
      toPointerArray(handleArray) {
        let typedArray = new Int32Array(handleArray.map((handle) => handle.value)), numBytes = typedArray.length * typedArray.BYTES_PER_ELEMENT, ptr = this.module._malloc(numBytes);
        return new Uint8Array(this.module.HEAPU8.buffer, ptr, numBytes).set(new Uint8Array(typedArray.buffer)), new Lifetime(ptr, void 0, (ptr2) => this.module._free(ptr2));
      }
      newTypedArray(kind, length) {
        let zeros = new kind(new Array(length).fill(0)), numBytes = zeros.length * zeros.BYTES_PER_ELEMENT, ptr = this.module._malloc(numBytes), typedArray = new kind(this.module.HEAPU8.buffer, ptr, length);
        return typedArray.set(zeros), new Lifetime({ typedArray, ptr }, void 0, (value) => this.module._free(value.ptr));
      }
      newMutablePointerArray(length) {
        return this.newTypedArray(Int32Array, length);
      }
      newHeapCharPointer(string) {
        let strlen = this.module.lengthBytesUTF8(string), dataBytes = strlen + 1, ptr = this.module._malloc(dataBytes);
        return this.module.stringToUTF8(string, ptr, dataBytes), new Lifetime({ ptr, strlen }, void 0, (value) => this.module._free(value.ptr));
      }
      newHeapBufferPointer(buffer) {
        let numBytes = buffer.byteLength, ptr = this.module._malloc(numBytes);
        return this.module.HEAPU8.set(buffer, ptr), new Lifetime({ pointer: ptr, numBytes }, void 0, (value) => this.module._free(value.pointer));
      }
      consumeHeapCharPointer(ptr) {
        let str = this.module.UTF8ToString(ptr);
        return this.module._free(ptr), str;
      }
    };
    DefaultIntrinsics = Object.freeze({ BaseObjects: true, Date: true, Eval: true, StringNormalize: true, RegExp: true, JSON: true, Proxy: true, MapSet: true, TypedArrays: true, Promise: true });
    QuickJSIterator = class extends UsingDisposable {
      constructor(handle, context) {
        super();
        this.handle = handle;
        this.context = context;
        this._isDone = false;
        this.owner = context.runtime;
      }
      [Symbol.iterator]() {
        return this;
      }
      next(value) {
        if (!this.alive || this._isDone) return { done: true, value: void 0 };
        let nextMethod = this._next ?? (this._next = this.context.getProp(this.handle, "next"));
        return this.callIteratorMethod(nextMethod, value);
      }
      return(value) {
        if (!this.alive) return { done: true, value: void 0 };
        let returnMethod = this.context.getProp(this.handle, "return");
        if (returnMethod === this.context.undefined && value === void 0) return this.dispose(), { done: true, value: void 0 };
        let result = this.callIteratorMethod(returnMethod, value);
        return returnMethod.dispose(), this.dispose(), result;
      }
      throw(e) {
        if (!this.alive) return { done: true, value: void 0 };
        let errorHandle = e instanceof Lifetime ? e : this.context.newError(e), throwMethod = this.context.getProp(this.handle, "throw"), result = this.callIteratorMethod(throwMethod, e);
        return errorHandle.alive && errorHandle.dispose(), throwMethod.dispose(), this.dispose(), result;
      }
      get alive() {
        return this.handle.alive;
      }
      dispose() {
        this._isDone = true, this.handle.dispose(), this._next?.dispose();
      }
      callIteratorMethod(method, input) {
        let callResult = input ? this.context.callFunction(method, this.handle, input) : this.context.callFunction(method, this.handle);
        if (callResult.error) return this.dispose(), { value: callResult };
        let done = this.context.getProp(callResult.value, "done").consume((v) => this.context.dump(v)), value = this.context.getProp(callResult.value, "value");
        return callResult.value.dispose(), done && this.dispose(), { value: DisposableResult.success(value), done };
      }
    };
    INT32_MIN2 = -2147483648;
    INT32_MAX2 = 2147483647;
    INVALID_HOST_REF_ID = 0;
    HostRefMap = class {
      constructor() {
        this.nextId = INT32_MIN2;
        this.freelist = [];
        this.groups = /* @__PURE__ */ new Map();
      }
      put(value) {
        let id = this.allocateId(), groupId = getGroupId(id), group = this.groups.get(groupId);
        return group || (group = /* @__PURE__ */ new Map(), this.groups.set(groupId, group)), group.set(id, value), id;
      }
      get(id) {
        if (id === INVALID_HOST_REF_ID) throw new QuickJSHostRefInvalid("no host reference id defined");
        let groupId = getGroupId(id), group = this.groups.get(groupId);
        if (!group) throw new QuickJSHostRefInvalid(`host reference id ${id} is not defined`);
        let value = group.get(id);
        if (!value) throw new QuickJSHostRefInvalid(`host reference id ${id} is not defined`);
        return value;
      }
      delete(id) {
        if (id === INVALID_HOST_REF_ID) throw new QuickJSHostRefInvalid("no host reference id defined");
        let groupId = getGroupId(id), group = this.groups.get(groupId);
        if (!group) throw new QuickJSHostRefInvalid(`host reference id ${id} is not defined`);
        group.delete(id), group.size === 0 && this.groups.delete(groupId), this.freelist.push(id);
      }
      allocateId() {
        if (this.freelist.length > 0) return this.freelist.shift();
        if (this.nextId === INVALID_HOST_REF_ID && this.nextId++, this.nextId > INT32_MAX2) throw new QuickJSHostRefRangeExceeded(`HostRefMap: too many host refs created without disposing. Max simultaneous host refs: ${INT32_MAX2 - INT32_MIN2}`);
        return this.nextId++;
      }
    };
    HostRef = class extends UsingDisposable {
      constructor(runtime2, handle, id) {
        if (id === INVALID_HOST_REF_ID) throw new QuickJSHostRefInvalid("cannot create HostRef with undefined id");
        super();
        this.runtime = runtime2;
        this.handle = handle;
        this.id = id;
      }
      get alive() {
        return this.handle.alive;
      }
      dispose() {
        this.handle.dispose();
      }
      get value() {
        return this.runtime.hostRefs.get(this.id);
      }
    };
    ContextMemory = class extends ModuleMemory {
      constructor(args) {
        super(args.module);
        this.scope = new Scope();
        this.copyJSValue = (ptr) => this.ffi.QTS_DupValuePointer(this.ctx.value, ptr);
        this.freeJSValue = (ptr) => {
          this.ffi.QTS_FreeValuePointer(this.ctx.value, ptr);
        };
        args.ownedLifetimes?.forEach((lifetime) => this.scope.manage(lifetime)), this.owner = args.owner, this.module = args.module, this.ffi = args.ffi, this.rt = args.rt, this.ctx = this.scope.manage(args.ctx);
      }
      get alive() {
        return this.scope.alive;
      }
      dispose() {
        return this.scope.dispose();
      }
      [Symbol.dispose]() {
        return this.dispose();
      }
      manage(lifetime) {
        return this.scope.manage(lifetime);
      }
      consumeJSCharPointer(ptr) {
        let str = this.module.UTF8ToString(ptr);
        return this.ffi.QTS_FreeCString(this.ctx.value, ptr), str;
      }
      heapValueHandle(ptr, extraDispose) {
        let dispose = extraDispose ? (val) => {
          extraDispose(), this.freeJSValue(val);
        } : this.freeJSValue;
        return new Lifetime(ptr, this.copyJSValue, dispose, this.owner);
      }
      staticHeapValueHandle(ptr) {
        return this.manage(this.heapValueHandle(ptr)), new StaticLifetime(ptr, this.owner);
      }
    };
    QuickJSContext = class extends UsingDisposable {
      constructor(args) {
        super();
        this._undefined = void 0;
        this._null = void 0;
        this._false = void 0;
        this._true = void 0;
        this._global = void 0;
        this._BigInt = void 0;
        this._Symbol = void 0;
        this._SymbolIterator = void 0;
        this._SymbolAsyncIterator = void 0;
        this.cToHostCallbacks = { callFunction: (ctx, this_ptr, argc, argv, fn_id) => {
          if (ctx !== this.ctx.value) throw new Error("QuickJSContext instance received C -> JS call with mismatched ctx");
          let fn = this.getFunction(fn_id);
          return Scope.withScopeMaybeAsync(this, function* (awaited, scope) {
            let thisHandle = scope.manage(new WeakLifetime(this_ptr, this.memory.copyJSValue, this.memory.freeJSValue, this.runtime)), argHandles = new Array(argc);
            for (let i = 0; i < argc; i++) {
              let ptr = this.ffi.QTS_ArgvGetJSValueConstPointer(argv, i);
              argHandles[i] = scope.manage(new WeakLifetime(ptr, this.memory.copyJSValue, this.memory.freeJSValue, this.runtime));
            }
            try {
              let result = yield* awaited(fn.apply(thisHandle, argHandles));
              if (result) {
                if ("error" in result && result.error) throw this.runtime.debugLog("throw error", result.error), result.error;
                let handle = scope.manage(result instanceof Lifetime ? result : result.value);
                return this.ffi.QTS_DupValuePointer(this.ctx.value, handle.value);
              }
              return 0;
            } catch (error) {
              return this.errorToHandle(error).consume((errorHandle) => this.ffi.QTS_Throw(this.ctx.value, errorHandle.value));
            }
          });
        } };
        this.runtime = args.runtime, this.module = args.module, this.ffi = args.ffi, this.rt = args.rt, this.ctx = args.ctx, this.memory = new ContextMemory({ ...args, owner: this.runtime }), args.callbacks.setContextCallbacks(this.ctx.value, this.cToHostCallbacks), this.dump = this.dump.bind(this), this.getString = this.getString.bind(this), this.getNumber = this.getNumber.bind(this), this.resolvePromise = this.resolvePromise.bind(this), this.uint32Out = this.memory.manage(this.memory.newTypedArray(Uint32Array, 1));
      }
      get alive() {
        return this.memory.alive;
      }
      dispose() {
        this.memory.dispose();
      }
      get undefined() {
        if (this._undefined) return this._undefined;
        let ptr = this.ffi.QTS_GetUndefined();
        return this._undefined = new StaticLifetime(ptr);
      }
      get null() {
        if (this._null) return this._null;
        let ptr = this.ffi.QTS_GetNull();
        return this._null = new StaticLifetime(ptr);
      }
      get true() {
        if (this._true) return this._true;
        let ptr = this.ffi.QTS_GetTrue();
        return this._true = new StaticLifetime(ptr);
      }
      get false() {
        if (this._false) return this._false;
        let ptr = this.ffi.QTS_GetFalse();
        return this._false = new StaticLifetime(ptr);
      }
      get global() {
        if (this._global) return this._global;
        let ptr = this.ffi.QTS_GetGlobalObject(this.ctx.value);
        return this._global = this.memory.staticHeapValueHandle(ptr), this._global;
      }
      newNumber(num) {
        return this.memory.heapValueHandle(this.ffi.QTS_NewFloat64(this.ctx.value, num));
      }
      newString(str) {
        let ptr = this.memory.newHeapCharPointer(str).consume((charHandle) => this.ffi.QTS_NewString(this.ctx.value, charHandle.value.ptr));
        return this.memory.heapValueHandle(ptr);
      }
      newUniqueSymbol(description) {
        let key = (typeof description == "symbol" ? description.description : description) ?? "", ptr = this.memory.newHeapCharPointer(key).consume((charHandle) => this.ffi.QTS_NewSymbol(this.ctx.value, charHandle.value.ptr, 0));
        return this.memory.heapValueHandle(ptr);
      }
      newSymbolFor(key) {
        let description = (typeof key == "symbol" ? key.description : key) ?? "", ptr = this.memory.newHeapCharPointer(description).consume((charHandle) => this.ffi.QTS_NewSymbol(this.ctx.value, charHandle.value.ptr, 1));
        return this.memory.heapValueHandle(ptr);
      }
      getWellKnownSymbol(name) {
        return this._Symbol ?? (this._Symbol = this.memory.manage(this.getProp(this.global, "Symbol"))), this.getProp(this._Symbol, name);
      }
      newBigInt(num) {
        if (!this._BigInt) {
          let bigIntHandle2 = this.getProp(this.global, "BigInt");
          this.memory.manage(bigIntHandle2), this._BigInt = new StaticLifetime(bigIntHandle2.value, this.runtime);
        }
        let bigIntHandle = this._BigInt, asString = String(num);
        return this.newString(asString).consume((handle) => this.unwrapResult(this.callFunction(bigIntHandle, this.undefined, handle)));
      }
      newObject(prototype) {
        prototype && this.runtime.assertOwned(prototype);
        let ptr = prototype ? this.ffi.QTS_NewObjectProto(this.ctx.value, prototype.value) : this.ffi.QTS_NewObject(this.ctx.value);
        return this.memory.heapValueHandle(ptr);
      }
      newArray() {
        let ptr = this.ffi.QTS_NewArray(this.ctx.value);
        return this.memory.heapValueHandle(ptr);
      }
      newArrayBuffer(buffer) {
        let array = new Uint8Array(buffer), handle = this.memory.newHeapBufferPointer(array), ptr = this.ffi.QTS_NewArrayBuffer(this.ctx.value, handle.value.pointer, array.length);
        return this.memory.heapValueHandle(ptr);
      }
      newPromise(value) {
        let deferredPromise = Scope.withScope((scope) => {
          let mutablePointerArray = scope.manage(this.memory.newMutablePointerArray(2)), promisePtr = this.ffi.QTS_NewPromiseCapability(this.ctx.value, mutablePointerArray.value.ptr), promiseHandle = this.memory.heapValueHandle(promisePtr), [resolveHandle, rejectHandle] = Array.from(mutablePointerArray.value.typedArray).map((jsvaluePtr) => this.memory.heapValueHandle(jsvaluePtr));
          return new QuickJSDeferredPromise({ context: this, promiseHandle, resolveHandle, rejectHandle });
        });
        return value && typeof value == "function" && (value = new Promise(value)), value && Promise.resolve(value).then(deferredPromise.resolve, (error) => error instanceof Lifetime ? deferredPromise.reject(error) : this.newError(error).consume(deferredPromise.reject)), deferredPromise;
      }
      newFunction(nameOrFn, maybeFn) {
        let fn = typeof nameOrFn == "function" ? nameOrFn : maybeFn;
        if (!fn) throw new TypeError("Expected a function");
        return this.newFunctionWithOptions({ name: typeof nameOrFn == "string" ? nameOrFn : void 0, length: fn.length, isConstructor: false, fn });
      }
      newConstructorFunction(nameOrFn, maybeFn) {
        let fn = typeof nameOrFn == "function" ? nameOrFn : maybeFn;
        if (!fn) throw new TypeError("Expected a function");
        return this.newFunctionWithOptions({ name: typeof nameOrFn == "string" ? nameOrFn : void 0, length: fn.length, isConstructor: true, fn });
      }
      newFunctionWithOptions(args) {
        let { name, length, isConstructor, fn } = args, refId = this.runtime.hostRefs.put(fn);
        try {
          return this.memory.heapValueHandle(this.ffi.QTS_NewFunction(this.ctx.value, name ?? "", length, isConstructor, refId));
        } catch (error) {
          throw this.runtime.hostRefs.delete(refId), error;
        }
      }
      newError(error) {
        let errorHandle = this.memory.heapValueHandle(this.ffi.QTS_NewError(this.ctx.value));
        return error && typeof error == "object" ? (error.name !== void 0 && this.newString(error.name).consume((handle) => this.setProp(errorHandle, "name", handle)), error.message !== void 0 && this.newString(error.message).consume((handle) => this.setProp(errorHandle, "message", handle))) : typeof error == "string" ? this.newString(error).consume((handle) => this.setProp(errorHandle, "message", handle)) : error !== void 0 && this.newString(String(error)).consume((handle) => this.setProp(errorHandle, "message", handle)), errorHandle;
      }
      newHostRef(value) {
        let id = this.runtime.hostRefs.put(value);
        try {
          let handle = this.memory.heapValueHandle(this.ffi.QTS_NewHostRef(this.ctx.value, id));
          return new HostRef(this.runtime, handle, id);
        } catch (error) {
          throw this.runtime.hostRefs.delete(id), error;
        }
      }
      toHostRef(handle) {
        let id = this.ffi.QTS_GetHostRefId(handle.value);
        if (id !== 0) return this.runtime.hostRefs.get(id), new HostRef(this.runtime, handle.dup(), id);
      }
      unwrapHostRef(handle) {
        let id = this.ffi.QTS_GetHostRefId(handle.value);
        if (id === 0) throw new QuickJSHostRefInvalid("handle is not a HostRef");
        return this.runtime.hostRefs.get(id);
      }
      typeof(handle) {
        return this.runtime.assertOwned(handle), this.memory.consumeHeapCharPointer(this.ffi.QTS_Typeof(this.ctx.value, handle.value));
      }
      getNumber(handle) {
        return this.runtime.assertOwned(handle), this.ffi.QTS_GetFloat64(this.ctx.value, handle.value);
      }
      getString(handle) {
        return this.runtime.assertOwned(handle), this.memory.consumeJSCharPointer(this.ffi.QTS_GetString(this.ctx.value, handle.value));
      }
      getSymbol(handle) {
        this.runtime.assertOwned(handle);
        let key = this.memory.consumeJSCharPointer(this.ffi.QTS_GetSymbolDescriptionOrKey(this.ctx.value, handle.value));
        return this.ffi.QTS_IsGlobalSymbol(this.ctx.value, handle.value) ? Symbol.for(key) : Symbol(key);
      }
      getBigInt(handle) {
        this.runtime.assertOwned(handle);
        let asString = this.getString(handle);
        return BigInt(asString);
      }
      getArrayBuffer(handle) {
        this.runtime.assertOwned(handle);
        let len = this.ffi.QTS_GetArrayBufferLength(this.ctx.value, handle.value), ptr = this.ffi.QTS_GetArrayBuffer(this.ctx.value, handle.value);
        if (!ptr) throw new Error("Couldn't allocate memory to get ArrayBuffer");
        return new Lifetime(this.module.HEAPU8.subarray(ptr, ptr + len), void 0, () => this.module._free(ptr));
      }
      getPromiseState(handle) {
        this.runtime.assertOwned(handle);
        let state = this.ffi.QTS_PromiseState(this.ctx.value, handle.value);
        if (state < 0) return { type: "fulfilled", value: handle, notAPromise: true };
        if (state === JSPromiseStateEnum.Pending) return { type: "pending", get error() {
          return new QuickJSPromisePending("Cannot unwrap a pending promise");
        } };
        let ptr = this.ffi.QTS_PromiseResult(this.ctx.value, handle.value), result = this.memory.heapValueHandle(ptr);
        if (state === JSPromiseStateEnum.Fulfilled) return { type: "fulfilled", value: result };
        if (state === JSPromiseStateEnum.Rejected) return { type: "rejected", error: result };
        throw result.dispose(), new Error(`Unknown JSPromiseStateEnum: ${state}`);
      }
      resolvePromise(promiseLikeHandle) {
        this.runtime.assertOwned(promiseLikeHandle);
        let vmResolveResult = Scope.withScope((scope) => {
          let vmPromise = scope.manage(this.getProp(this.global, "Promise")), vmPromiseResolve = scope.manage(this.getProp(vmPromise, "resolve"));
          return this.callFunction(vmPromiseResolve, vmPromise, promiseLikeHandle);
        });
        return vmResolveResult.error ? Promise.resolve(vmResolveResult) : new Promise((resolve2) => {
          Scope.withScope((scope) => {
            let resolveHandle = scope.manage(this.newFunction("resolve", (value) => {
              resolve2(this.success(value && value.dup()));
            })), rejectHandle = scope.manage(this.newFunction("reject", (error) => {
              resolve2(this.fail(error && error.dup()));
            })), promiseHandle = scope.manage(vmResolveResult.value), promiseThenHandle = scope.manage(this.getProp(promiseHandle, "then"));
            this.callFunction(promiseThenHandle, promiseHandle, resolveHandle, rejectHandle).unwrap().dispose();
          });
        });
      }
      isEqual(a, b, equalityType = IsEqualOp.IsStrictlyEqual) {
        if (a === b) return true;
        this.runtime.assertOwned(a), this.runtime.assertOwned(b);
        let result = this.ffi.QTS_IsEqual(this.ctx.value, a.value, b.value, equalityType);
        if (result === -1) throw new QuickJSNotImplemented("WASM variant does not expose equality");
        return !!result;
      }
      eq(handle, other) {
        return this.isEqual(handle, other, IsEqualOp.IsStrictlyEqual);
      }
      sameValue(handle, other) {
        return this.isEqual(handle, other, IsEqualOp.IsSameValue);
      }
      sameValueZero(handle, other) {
        return this.isEqual(handle, other, IsEqualOp.IsSameValueZero);
      }
      getProp(handle, key) {
        this.runtime.assertOwned(handle);
        let ptr;
        return typeof key == "number" && key >= 0 ? ptr = this.ffi.QTS_GetPropNumber(this.ctx.value, handle.value, key) : ptr = this.borrowPropertyKey(key).consume((quickJSKey) => this.ffi.QTS_GetProp(this.ctx.value, handle.value, quickJSKey.value)), this.memory.heapValueHandle(ptr);
      }
      getLength(handle) {
        if (this.runtime.assertOwned(handle), !(this.ffi.QTS_GetLength(this.ctx.value, this.uint32Out.value.ptr, handle.value) < 0)) return this.uint32Out.value.typedArray[0];
      }
      getOwnPropertyNames(handle, options = { strings: true, numbersAsStrings: true }) {
        this.runtime.assertOwned(handle), handle.value;
        let flags = getOwnPropertyNamesOptionsToFlags(options);
        if (flags === 0) throw new QuickJSEmptyGetOwnPropertyNames("No options set, will return an empty array");
        return Scope.withScope((scope) => {
          let outPtr = scope.manage(this.memory.newMutablePointerArray(1)), errorPtr = this.ffi.QTS_GetOwnPropertyNames(this.ctx.value, outPtr.value.ptr, this.uint32Out.value.ptr, handle.value, flags);
          if (errorPtr) return this.fail(this.memory.heapValueHandle(errorPtr));
          let len = this.uint32Out.value.typedArray[0], ptr = outPtr.value.typedArray[0], pointerArray = new Uint32Array(this.module.HEAP8.buffer, ptr, len), handles = Array.from(pointerArray).map((ptr2) => this.memory.heapValueHandle(ptr2));
          return this.ffi.QTS_FreeVoidPointer(this.ctx.value, ptr), this.success(createDisposableArray(handles));
        });
      }
      getIterator(iterableHandle) {
        let SymbolIterator = this._SymbolIterator ?? (this._SymbolIterator = this.memory.manage(this.getWellKnownSymbol("iterator")));
        return Scope.withScope((scope) => {
          let methodHandle = scope.manage(this.getProp(iterableHandle, SymbolIterator)), iteratorCallResult = this.callFunction(methodHandle, iterableHandle);
          return iteratorCallResult.error ? iteratorCallResult : this.success(new QuickJSIterator(iteratorCallResult.value, this));
        });
      }
      setProp(handle, key, value) {
        this.runtime.assertOwned(handle), this.borrowPropertyKey(key).consume((quickJSKey) => this.ffi.QTS_SetProp(this.ctx.value, handle.value, quickJSKey.value, value.value));
      }
      defineProp(handle, key, descriptor) {
        this.runtime.assertOwned(handle), Scope.withScope((scope) => {
          let quickJSKey = scope.manage(this.borrowPropertyKey(key)), value = descriptor.value || this.undefined, configurable = !!descriptor.configurable, enumerable = !!descriptor.enumerable, hasValue = !!descriptor.value, get = descriptor.get ? scope.manage(this.newFunction(descriptor.get.name, descriptor.get)) : this.undefined, set = descriptor.set ? scope.manage(this.newFunction(descriptor.set.name, descriptor.set)) : this.undefined;
          this.ffi.QTS_DefineProp(this.ctx.value, handle.value, quickJSKey.value, value.value, get.value, set.value, configurable, enumerable, hasValue);
        });
      }
      callFunction(func, thisVal, ...restArgs) {
        this.runtime.assertOwned(func);
        let args, firstArg = restArgs[0];
        firstArg === void 0 || Array.isArray(firstArg) ? args = firstArg ?? [] : args = restArgs;
        let resultPtr = this.memory.toPointerArray(args).consume((argsArrayPtr) => this.ffi.QTS_Call(this.ctx.value, func.value, thisVal.value, args.length, argsArrayPtr.value)), errorPtr = this.ffi.QTS_ResolveException(this.ctx.value, resultPtr);
        return errorPtr ? (this.ffi.QTS_FreeValuePointer(this.ctx.value, resultPtr), this.fail(this.memory.heapValueHandle(errorPtr))) : this.success(this.memory.heapValueHandle(resultPtr));
      }
      callMethod(thisHandle, key, args = []) {
        return this.getProp(thisHandle, key).consume((func) => this.callFunction(func, thisHandle, args));
      }
      evalCode(code, filename = "eval.js", options) {
        let detectModule = options === void 0 ? 1 : 0, flags = evalOptionsToFlags(options), resultPtr = this.memory.newHeapCharPointer(code).consume((charHandle) => this.ffi.QTS_Eval(this.ctx.value, charHandle.value.ptr, charHandle.value.strlen, filename, detectModule, flags)), errorPtr = this.ffi.QTS_ResolveException(this.ctx.value, resultPtr);
        return errorPtr ? (this.ffi.QTS_FreeValuePointer(this.ctx.value, resultPtr), this.fail(this.memory.heapValueHandle(errorPtr))) : this.success(this.memory.heapValueHandle(resultPtr));
      }
      throw(error) {
        return this.errorToHandle(error).consume((handle) => this.ffi.QTS_Throw(this.ctx.value, handle.value));
      }
      borrowPropertyKey(key) {
        return typeof key == "number" ? this.newNumber(key) : typeof key == "string" ? this.newString(key) : new StaticLifetime(key.value, this.runtime);
      }
      getMemory(rt) {
        if (rt === this.rt.value) return this.memory;
        throw new Error("Private API. Cannot get memory from a different runtime");
      }
      dump(handle) {
        this.runtime.assertOwned(handle);
        let type = this.typeof(handle);
        if (type === "string") return this.getString(handle);
        if (type === "number") return this.getNumber(handle);
        if (type === "bigint") return this.getBigInt(handle);
        if (type === "undefined") return;
        if (type === "symbol") return this.getSymbol(handle);
        let asPromiseState = this.getPromiseState(handle);
        if (asPromiseState.type === "fulfilled" && !asPromiseState.notAPromise) return handle.dispose(), { type: asPromiseState.type, value: asPromiseState.value.consume(this.dump) };
        if (asPromiseState.type === "pending") return handle.dispose(), { type: asPromiseState.type };
        if (asPromiseState.type === "rejected") return handle.dispose(), { type: asPromiseState.type, error: asPromiseState.error.consume(this.dump) };
        let str = this.memory.consumeJSCharPointer(this.ffi.QTS_Dump(this.ctx.value, handle.value));
        try {
          return JSON.parse(str);
        } catch {
          return str;
        }
      }
      unwrapResult(result) {
        if (result.error) {
          let context = "context" in result.error ? result.error.context : this, cause = result.error.consume((error) => this.dump(error));
          if (cause && typeof cause == "object" && typeof cause.message == "string") {
            let { message: message2, name, stack, ...rest } = cause, exception = new QuickJSUnwrapError(cause, context);
            typeof name == "string" && (exception.name = cause.name), exception.message = message2;
            let hostStack = exception.stack;
            throw typeof stack == "string" && (exception.stack = `${name}: ${message2}
${cause.stack}Host: ${hostStack}`), Object.assign(exception, rest), exception;
          }
          throw new QuickJSUnwrapError(cause);
        }
        return result.value;
      }
      [/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")]() {
        return this.alive ? `${this.constructor.name} { ctx: ${this.ctx.value} rt: ${this.rt.value} }` : `${this.constructor.name} { disposed }`;
      }
      getFunction(fn_id) {
        let fn = this.runtime.hostRefs.get(fn_id);
        if (typeof fn != "function") throw new Error(`Host reference ${fn_id} is not a function`);
        return fn;
      }
      errorToHandle(error) {
        return error instanceof Lifetime ? error : this.newError(error);
      }
      encodeBinaryJSON(handle) {
        let ptr = this.ffi.QTS_bjson_encode(this.ctx.value, handle.value);
        return this.memory.heapValueHandle(ptr);
      }
      decodeBinaryJSON(handle) {
        let ptr = this.ffi.QTS_bjson_decode(this.ctx.value, handle.value);
        return this.memory.heapValueHandle(ptr);
      }
      success(value) {
        return DisposableResult.success(value);
      }
      fail(error) {
        return DisposableResult.fail(error, (error2) => this.unwrapResult(error2));
      }
    };
    QuickJSRuntime = class extends UsingDisposable {
      constructor(args) {
        super();
        this.scope = new Scope();
        this.contextMap = /* @__PURE__ */ new Map();
        this.hostRefs = new HostRefMap();
        this._debugMode = false;
        this.cToHostCallbacks = { freeHostRef: (rt, host_ref_id) => {
          if (rt !== this.rt.value) throw new Error("Runtime pointer mismatch");
          this.hostRefs.delete(host_ref_id);
        }, shouldInterrupt: (rt) => {
          if (rt !== this.rt.value) throw new Error("QuickJSContext instance received C -> JS interrupt with mismatched rt");
          let fn = this.interruptHandler;
          if (!fn) throw new Error("QuickJSContext had no interrupt handler");
          return fn(this) ? 1 : 0;
        }, loadModuleSource: maybeAsyncFn(this, function* (awaited, rt, ctx, moduleName) {
          let moduleLoader = this.moduleLoader;
          if (!moduleLoader) throw new Error("Runtime has no module loader");
          if (rt !== this.rt.value) throw new Error("Runtime pointer mismatch");
          let context = this.contextMap.get(ctx) ?? this.newContext({ contextPointer: ctx });
          try {
            let result = yield* awaited(moduleLoader(moduleName, context));
            if (typeof result == "object" && "error" in result && result.error) throw this.debugLog("cToHostLoadModule: loader returned error", result.error), result.error;
            let moduleSource = typeof result == "string" ? result : "value" in result ? result.value : result;
            return this.memory.newHeapCharPointer(moduleSource).value.ptr;
          } catch (error) {
            return this.debugLog("cToHostLoadModule: caught error", error), context.throw(error), 0;
          }
        }), normalizeModule: maybeAsyncFn(this, function* (awaited, rt, ctx, baseModuleName, moduleNameRequest) {
          let moduleNormalizer = this.moduleNormalizer;
          if (!moduleNormalizer) throw new Error("Runtime has no module normalizer");
          if (rt !== this.rt.value) throw new Error("Runtime pointer mismatch");
          let context = this.contextMap.get(ctx) ?? this.newContext({ contextPointer: ctx });
          try {
            let result = yield* awaited(moduleNormalizer(baseModuleName, moduleNameRequest, context));
            if (typeof result == "object" && "error" in result && result.error) throw this.debugLog("cToHostNormalizeModule: normalizer returned error", result.error), result.error;
            let name = typeof result == "string" ? result : result.value;
            return context.getMemory(this.rt.value).newHeapCharPointer(name).value.ptr;
          } catch (error) {
            return this.debugLog("normalizeModule: caught error", error), context.throw(error), 0;
          }
        }) };
        args.ownedLifetimes?.forEach((lifetime) => this.scope.manage(lifetime)), this.module = args.module, this.memory = new ModuleMemory(this.module), this.ffi = args.ffi, this.rt = args.rt, this.callbacks = args.callbacks, this.scope.manage(this.rt), this.callbacks.setRuntimeCallbacks(this.rt.value, this.cToHostCallbacks), this.executePendingJobs = this.executePendingJobs.bind(this), QTS_DEBUG && this.setDebugMode(true);
      }
      get alive() {
        return this.scope.alive;
      }
      dispose() {
        return this.scope.dispose();
      }
      newContext(options = {}) {
        let intrinsics = intrinsicsToFlags(options.intrinsics), ctx = new Lifetime(options.contextPointer || this.ffi.QTS_NewContext(this.rt.value, intrinsics), void 0, (ctx_ptr) => {
          this.contextMap.delete(ctx_ptr), this.callbacks.deleteContext(ctx_ptr), this.ffi.QTS_FreeContext(ctx_ptr);
        }), context = new QuickJSContext({ module: this.module, ctx, ffi: this.ffi, rt: this.rt, ownedLifetimes: options.ownedLifetimes, runtime: this, callbacks: this.callbacks });
        return this.contextMap.set(ctx.value, context), context;
      }
      setModuleLoader(moduleLoader, moduleNormalizer) {
        this.moduleLoader = moduleLoader, this.moduleNormalizer = moduleNormalizer, this.ffi.QTS_RuntimeEnableModuleLoader(this.rt.value, this.moduleNormalizer ? 1 : 0);
      }
      removeModuleLoader() {
        this.moduleLoader = void 0, this.ffi.QTS_RuntimeDisableModuleLoader(this.rt.value);
      }
      hasPendingJob() {
        return !!this.ffi.QTS_IsJobPending(this.rt.value);
      }
      setInterruptHandler(cb) {
        let prevInterruptHandler = this.interruptHandler;
        this.interruptHandler = cb, prevInterruptHandler || this.ffi.QTS_RuntimeEnableInterruptHandler(this.rt.value);
      }
      removeInterruptHandler() {
        this.interruptHandler && (this.ffi.QTS_RuntimeDisableInterruptHandler(this.rt.value), this.interruptHandler = void 0);
      }
      executePendingJobs(maxJobsToExecute = -1) {
        let ctxPtrOut = this.memory.newMutablePointerArray(1), valuePtr = this.ffi.QTS_ExecutePendingJob(this.rt.value, maxJobsToExecute ?? -1, ctxPtrOut.value.ptr), ctxPtr = ctxPtrOut.value.typedArray[0];
        if (ctxPtrOut.dispose(), ctxPtr === 0) return this.ffi.QTS_FreeValuePointerRuntime(this.rt.value, valuePtr), DisposableResult.success(0);
        let context = this.contextMap.get(ctxPtr) ?? this.newContext({ contextPointer: ctxPtr }), resultValue = context.getMemory(this.rt.value).heapValueHandle(valuePtr);
        if (context.typeof(resultValue) === "number") {
          let executedJobs = context.getNumber(resultValue);
          return resultValue.dispose(), DisposableResult.success(executedJobs);
        } else {
          let error = Object.assign(resultValue, { context });
          return DisposableResult.fail(error, (error2) => context.unwrapResult(error2));
        }
      }
      setMemoryLimit(limitBytes) {
        if (limitBytes < 0 && limitBytes !== -1) throw new Error("Cannot set memory limit to negative number. To unset, pass -1");
        this.ffi.QTS_RuntimeSetMemoryLimit(this.rt.value, limitBytes);
      }
      computeMemoryUsage() {
        let serviceContextMemory = this.getSystemContext().getMemory(this.rt.value);
        return serviceContextMemory.heapValueHandle(this.ffi.QTS_RuntimeComputeMemoryUsage(this.rt.value, serviceContextMemory.ctx.value));
      }
      dumpMemoryUsage() {
        return this.memory.consumeHeapCharPointer(this.ffi.QTS_RuntimeDumpMemoryUsage(this.rt.value));
      }
      setMaxStackSize(stackSize) {
        if (stackSize < 0) throw new Error("Cannot set memory limit to negative number. To unset, pass 0.");
        this.ffi.QTS_RuntimeSetMaxStackSize(this.rt.value, stackSize);
      }
      assertOwned(handle) {
        if (handle.owner && handle.owner.rt !== this.rt) throw new QuickJSWrongOwner(`Handle is not owned by this runtime: ${handle.owner.rt.value} != ${this.rt.value}`);
      }
      setDebugMode(enabled) {
        this._debugMode = enabled, this.ffi.DEBUG && this.rt.alive && this.ffi.QTS_SetDebugLogEnabled(this.rt.value, enabled ? 1 : 0);
      }
      isDebugMode() {
        return this._debugMode;
      }
      debugLog(...msg) {
        this._debugMode && console.log("quickjs-emscripten:", ...msg);
      }
      [/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")]() {
        return this.alive ? `${this.constructor.name} { rt: ${this.rt.value} }` : `${this.constructor.name} { disposed }`;
      }
      getSystemContext() {
        return this.context || (this.context = this.scope.manage(this.newContext())), this.context;
      }
    };
    QuickJSEmscriptenModuleCallbacks = class {
      constructor(args) {
        this.freeHostRef = args.freeHostRef, this.callFunction = args.callFunction, this.shouldInterrupt = args.shouldInterrupt, this.loadModuleSource = args.loadModuleSource, this.normalizeModule = args.normalizeModule;
      }
    };
    QuickJSModuleCallbacks = class {
      constructor(module) {
        this.contextCallbacks = /* @__PURE__ */ new Map();
        this.runtimeCallbacks = /* @__PURE__ */ new Map();
        this.suspendedCount = 0;
        this.cToHostCallbacks = new QuickJSEmscriptenModuleCallbacks({ freeHostRef: (_asyncify, rt, host_ref_id) => {
          let runtimeCallbacks = this.runtimeCallbacks.get(rt);
          if (!runtimeCallbacks) throw new Error(`QuickJSRuntime(rt = ${rt}) not found when trying to free HostRef(id = ${host_ref_id})`);
          runtimeCallbacks.freeHostRef(rt, host_ref_id);
        }, callFunction: (asyncify, ctx, this_ptr, argc, argv, fn_id) => this.handleAsyncify(asyncify, () => {
          try {
            let vm = this.contextCallbacks.get(ctx);
            if (!vm) throw new Error(`QuickJSContext(ctx = ${ctx}) not found for C function call "${fn_id}"`);
            return vm.callFunction(ctx, this_ptr, argc, argv, fn_id);
          } catch (error) {
            return console.error("[C to host error: returning null]", error), 0;
          }
        }), shouldInterrupt: (asyncify, rt) => this.handleAsyncify(asyncify, () => {
          try {
            let vm = this.runtimeCallbacks.get(rt);
            if (!vm) throw new Error(`QuickJSRuntime(rt = ${rt}) not found for C interrupt`);
            return vm.shouldInterrupt(rt);
          } catch (error) {
            return console.error("[C to host interrupt: returning error]", error), 1;
          }
        }), loadModuleSource: (asyncify, rt, ctx, moduleName) => this.handleAsyncify(asyncify, () => {
          try {
            let runtimeCallbacks = this.runtimeCallbacks.get(rt);
            if (!runtimeCallbacks) throw new Error(`QuickJSRuntime(rt = ${rt}) not found for C module loader`);
            let loadModule = runtimeCallbacks.loadModuleSource;
            if (!loadModule) throw new Error(`QuickJSRuntime(rt = ${rt}) does not support module loading`);
            return loadModule(rt, ctx, moduleName);
          } catch (error) {
            return console.error("[C to host module loader error: returning null]", error), 0;
          }
        }), normalizeModule: (asyncify, rt, ctx, moduleBaseName, moduleName) => this.handleAsyncify(asyncify, () => {
          try {
            let runtimeCallbacks = this.runtimeCallbacks.get(rt);
            if (!runtimeCallbacks) throw new Error(`QuickJSRuntime(rt = ${rt}) not found for C module loader`);
            let normalizeModule = runtimeCallbacks.normalizeModule;
            if (!normalizeModule) throw new Error(`QuickJSRuntime(rt = ${rt}) does not support module loading`);
            return normalizeModule(rt, ctx, moduleBaseName, moduleName);
          } catch (error) {
            return console.error("[C to host module loader error: returning null]", error), 0;
          }
        }) });
        this.module = module, this.module.callbacks = this.cToHostCallbacks;
      }
      setRuntimeCallbacks(rt, callbacks) {
        this.runtimeCallbacks.set(rt, callbacks);
      }
      deleteRuntime(rt) {
        this.runtimeCallbacks.delete(rt);
      }
      setContextCallbacks(ctx, callbacks) {
        this.contextCallbacks.set(ctx, callbacks);
      }
      deleteContext(ctx) {
        this.contextCallbacks.delete(ctx);
      }
      handleAsyncify(asyncify, fn) {
        if (asyncify) return asyncify.handleSleep((done) => {
          try {
            let result = fn();
            if (!(result instanceof Promise)) {
              debugLog("asyncify.handleSleep: not suspending:", result), done(result);
              return;
            }
            if (this.suspended) throw new QuickJSAsyncifyError(`Already suspended at: ${this.suspended.stack}
Attempted to suspend at:`);
            this.suspended = new QuickJSAsyncifySuspended(`(${this.suspendedCount++})`), debugLog("asyncify.handleSleep: suspending:", this.suspended), result.then((resolvedResult) => {
              this.suspended = void 0, debugLog("asyncify.handleSleep: resolved:", resolvedResult), done(resolvedResult);
            }, (error) => {
              debugLog("asyncify.handleSleep: rejected:", error), console.error("QuickJS: cannot handle error in suspended function", error), this.suspended = void 0;
            });
          } catch (error) {
            throw debugLog("asyncify.handleSleep: error:", error), this.suspended = void 0, error;
          }
        });
        let value = fn();
        if (value instanceof Promise) throw new Error("Promise return value not supported in non-asyncify context.");
        return value;
      }
    };
    QuickJSWASMModule = class {
      constructor(module, ffi) {
        this.module = module, this.ffi = ffi, this.callbacks = new QuickJSModuleCallbacks(module);
      }
      newRuntime(options = {}) {
        let rt = new Lifetime(this.ffi.QTS_NewRuntime(), void 0, (rt_ptr) => {
          this.ffi.QTS_FreeRuntime(rt_ptr), this.callbacks.deleteRuntime(rt_ptr);
        }), runtime2 = new QuickJSRuntime({ module: this.module, callbacks: this.callbacks, ffi: this.ffi, rt });
        return applyBaseRuntimeOptions(runtime2, options), options.moduleLoader && runtime2.setModuleLoader(options.moduleLoader), runtime2;
      }
      newContext(options = {}) {
        let runtime2 = this.newRuntime(), context = runtime2.newContext({ ...options, ownedLifetimes: concat(runtime2, options.ownedLifetimes) });
        return runtime2.context = context, context;
      }
      evalCode(code, options = {}) {
        return Scope.withScope((scope) => {
          let vm = scope.manage(this.newContext());
          applyModuleEvalRuntimeOptions(vm.runtime, options);
          let result = vm.evalCode(code, "eval.js");
          if (options.memoryLimitBytes !== void 0 && vm.runtime.setMemoryLimit(-1), result.error) throw vm.dump(scope.manage(result.error));
          return vm.dump(scope.manage(result.value));
        });
      }
      getWasmMemory() {
        let memory = this.module.quickjsEmscriptenInit?.(() => {
        })?.getWasmMemory?.();
        if (!memory) throw new Error("Variant does not support getting WebAssembly.Memory");
        return memory;
      }
      getFFI() {
        return this.ffi;
      }
    };
  }
});

// node_modules/.pnpm/quickjs-emscripten-core@0.32.0/node_modules/quickjs-emscripten-core/dist/module-ES6BEMUI.mjs
var module_ES6BEMUI_exports = {};
__export(module_ES6BEMUI_exports, {
  QuickJSModuleCallbacks: () => QuickJSModuleCallbacks,
  QuickJSWASMModule: () => QuickJSWASMModule,
  applyBaseRuntimeOptions: () => applyBaseRuntimeOptions,
  applyModuleEvalRuntimeOptions: () => applyModuleEvalRuntimeOptions
});
var init_module_ES6BEMUI = __esm({
  "node_modules/.pnpm/quickjs-emscripten-core@0.32.0/node_modules/quickjs-emscripten-core/dist/module-ES6BEMUI.mjs"() {
    init_chunk_V2S4ZYJR();
  }
});

// node_modules/.pnpm/@jitl+quickjs-wasmfile-release-sync@0.32.0/node_modules/@jitl/quickjs-wasmfile-release-sync/dist/ffi.mjs
var ffi_exports = {};
__export(ffi_exports, {
  QuickJSFFI: () => QuickJSFFI
});
var QuickJSFFI;
var init_ffi = __esm({
  "node_modules/.pnpm/@jitl+quickjs-wasmfile-release-sync@0.32.0/node_modules/@jitl/quickjs-wasmfile-release-sync/dist/ffi.mjs"() {
    QuickJSFFI = class {
      constructor(module) {
        this.module = module;
        this.DEBUG = false;
        this.QTS_Throw = this.module.cwrap("QTS_Throw", "number", ["number", "number"]);
        this.QTS_NewError = this.module.cwrap("QTS_NewError", "number", ["number"]);
        this.QTS_RuntimeSetMemoryLimit = this.module.cwrap("QTS_RuntimeSetMemoryLimit", null, ["number", "number"]);
        this.QTS_RuntimeComputeMemoryUsage = this.module.cwrap("QTS_RuntimeComputeMemoryUsage", "number", ["number", "number"]);
        this.QTS_RuntimeDumpMemoryUsage = this.module.cwrap("QTS_RuntimeDumpMemoryUsage", "number", ["number"]);
        this.QTS_RecoverableLeakCheck = this.module.cwrap("QTS_RecoverableLeakCheck", "number", []);
        this.QTS_BuildIsSanitizeLeak = this.module.cwrap("QTS_BuildIsSanitizeLeak", "number", []);
        this.QTS_RuntimeSetMaxStackSize = this.module.cwrap("QTS_RuntimeSetMaxStackSize", null, ["number", "number"]);
        this.QTS_GetUndefined = this.module.cwrap("QTS_GetUndefined", "number", []);
        this.QTS_GetNull = this.module.cwrap("QTS_GetNull", "number", []);
        this.QTS_GetFalse = this.module.cwrap("QTS_GetFalse", "number", []);
        this.QTS_GetTrue = this.module.cwrap("QTS_GetTrue", "number", []);
        this.QTS_NewHostRef = this.module.cwrap("QTS_NewHostRef", "number", ["number", "number"]);
        this.QTS_GetHostRefId = this.module.cwrap("QTS_GetHostRefId", "number", ["number"]);
        this.QTS_NewRuntime = this.module.cwrap("QTS_NewRuntime", "number", []);
        this.QTS_FreeRuntime = this.module.cwrap("QTS_FreeRuntime", null, ["number"]);
        this.QTS_NewContext = this.module.cwrap("QTS_NewContext", "number", ["number", "number"]);
        this.QTS_FreeContext = this.module.cwrap("QTS_FreeContext", null, ["number"]);
        this.QTS_FreeValuePointer = this.module.cwrap("QTS_FreeValuePointer", null, ["number", "number"]);
        this.QTS_FreeValuePointerRuntime = this.module.cwrap("QTS_FreeValuePointerRuntime", null, ["number", "number"]);
        this.QTS_FreeVoidPointer = this.module.cwrap("QTS_FreeVoidPointer", null, ["number", "number"]);
        this.QTS_FreeCString = this.module.cwrap("QTS_FreeCString", null, ["number", "number"]);
        this.QTS_DupValuePointer = this.module.cwrap("QTS_DupValuePointer", "number", ["number", "number"]);
        this.QTS_NewObject = this.module.cwrap("QTS_NewObject", "number", ["number"]);
        this.QTS_NewObjectProto = this.module.cwrap("QTS_NewObjectProto", "number", ["number", "number"]);
        this.QTS_NewArray = this.module.cwrap("QTS_NewArray", "number", ["number"]);
        this.QTS_NewArrayBuffer = this.module.cwrap("QTS_NewArrayBuffer", "number", ["number", "number", "number"]);
        this.QTS_NewFloat64 = this.module.cwrap("QTS_NewFloat64", "number", ["number", "number"]);
        this.QTS_GetFloat64 = this.module.cwrap("QTS_GetFloat64", "number", ["number", "number"]);
        this.QTS_NewString = this.module.cwrap("QTS_NewString", "number", ["number", "number"]);
        this.QTS_GetString = this.module.cwrap("QTS_GetString", "number", ["number", "number"]);
        this.QTS_GetArrayBuffer = this.module.cwrap("QTS_GetArrayBuffer", "number", ["number", "number"]);
        this.QTS_GetArrayBufferLength = this.module.cwrap("QTS_GetArrayBufferLength", "number", ["number", "number"]);
        this.QTS_NewSymbol = this.module.cwrap("QTS_NewSymbol", "number", ["number", "number", "number"]);
        this.QTS_GetSymbolDescriptionOrKey = this.module.cwrap("QTS_GetSymbolDescriptionOrKey", "number", ["number", "number"]);
        this.QTS_IsGlobalSymbol = this.module.cwrap("QTS_IsGlobalSymbol", "number", ["number", "number"]);
        this.QTS_IsJobPending = this.module.cwrap("QTS_IsJobPending", "number", ["number"]);
        this.QTS_ExecutePendingJob = this.module.cwrap("QTS_ExecutePendingJob", "number", ["number", "number", "number"]);
        this.QTS_GetProp = this.module.cwrap("QTS_GetProp", "number", ["number", "number", "number"]);
        this.QTS_GetPropNumber = this.module.cwrap("QTS_GetPropNumber", "number", ["number", "number", "number"]);
        this.QTS_SetProp = this.module.cwrap("QTS_SetProp", null, ["number", "number", "number", "number"]);
        this.QTS_DefineProp = this.module.cwrap("QTS_DefineProp", null, ["number", "number", "number", "number", "number", "number", "boolean", "boolean", "boolean"]);
        this.QTS_GetOwnPropertyNames = this.module.cwrap("QTS_GetOwnPropertyNames", "number", ["number", "number", "number", "number", "number"]);
        this.QTS_Call = this.module.cwrap("QTS_Call", "number", ["number", "number", "number", "number", "number"]);
        this.QTS_ResolveException = this.module.cwrap("QTS_ResolveException", "number", ["number", "number"]);
        this.QTS_Dump = this.module.cwrap("QTS_Dump", "number", ["number", "number"]);
        this.QTS_Eval = this.module.cwrap("QTS_Eval", "number", ["number", "number", "number", "string", "number", "number"]);
        this.QTS_GetModuleNamespace = this.module.cwrap("QTS_GetModuleNamespace", "number", ["number", "number"]);
        this.QTS_Typeof = this.module.cwrap("QTS_Typeof", "number", ["number", "number"]);
        this.QTS_GetLength = this.module.cwrap("QTS_GetLength", "number", ["number", "number", "number"]);
        this.QTS_IsEqual = this.module.cwrap("QTS_IsEqual", "number", ["number", "number", "number", "number"]);
        this.QTS_GetGlobalObject = this.module.cwrap("QTS_GetGlobalObject", "number", ["number"]);
        this.QTS_NewPromiseCapability = this.module.cwrap("QTS_NewPromiseCapability", "number", ["number", "number"]);
        this.QTS_PromiseState = this.module.cwrap("QTS_PromiseState", "number", ["number", "number"]);
        this.QTS_PromiseResult = this.module.cwrap("QTS_PromiseResult", "number", ["number", "number"]);
        this.QTS_TestStringArg = this.module.cwrap("QTS_TestStringArg", null, ["string"]);
        this.QTS_GetDebugLogEnabled = this.module.cwrap("QTS_GetDebugLogEnabled", "number", ["number"]);
        this.QTS_SetDebugLogEnabled = this.module.cwrap("QTS_SetDebugLogEnabled", null, ["number", "number"]);
        this.QTS_BuildIsDebug = this.module.cwrap("QTS_BuildIsDebug", "number", []);
        this.QTS_BuildIsAsyncify = this.module.cwrap("QTS_BuildIsAsyncify", "number", []);
        this.QTS_NewFunction = this.module.cwrap("QTS_NewFunction", "number", ["number", "string", "number", "boolean", "number"]);
        this.QTS_ArgvGetJSValueConstPointer = this.module.cwrap("QTS_ArgvGetJSValueConstPointer", "number", ["number", "number"]);
        this.QTS_RuntimeEnableInterruptHandler = this.module.cwrap("QTS_RuntimeEnableInterruptHandler", null, ["number"]);
        this.QTS_RuntimeDisableInterruptHandler = this.module.cwrap("QTS_RuntimeDisableInterruptHandler", null, ["number"]);
        this.QTS_RuntimeEnableModuleLoader = this.module.cwrap("QTS_RuntimeEnableModuleLoader", null, ["number", "number"]);
        this.QTS_RuntimeDisableModuleLoader = this.module.cwrap("QTS_RuntimeDisableModuleLoader", null, ["number"]);
        this.QTS_bjson_encode = this.module.cwrap("QTS_bjson_encode", "number", ["number", "number"]);
        this.QTS_bjson_decode = this.module.cwrap("QTS_bjson_decode", "number", ["number", "number"]);
      }
    };
  }
});

// node_modules/.pnpm/@jitl+quickjs-wasmfile-release-sync@0.32.0/node_modules/@jitl/quickjs-wasmfile-release-sync/dist/emscripten-module.mjs
var emscripten_module_exports = {};
__export(emscripten_module_exports, {
  default: () => emscripten_module_default
});
async function QuickJSRaw(moduleArg = {}) {
  var moduleRtn;
  var d = moduleArg, aa = !!globalThis.window, n = !!globalThis.WorkerGlobalScope, q = globalThis.process?.versions?.node && "renderer" != globalThis.process?.type;
  if (q) {
    const { createRequire: a } = await import("node:module");
    var require2 = a(import.meta.url);
  }
  function r(a) {
    a = { log: a || function() {
    } };
    for (const c of r.Pa) c(a);
    return d.quickJSEmscriptenExtensions = a;
  }
  r.Pa = [];
  d.quickjsEmscriptenInit = r;
  r.Pa.push((a) => {
    a.getWasmMemory = function() {
      return t;
    };
  });
  var u = "./this.program", v = (a, c) => {
    throw c;
  }, w = import.meta.url, y = "", z, A;
  if (q) {
    var fs = require2("node:fs");
    w.startsWith("file:") && (y = require2("node:path").dirname(require2("node:url").fileURLToPath(w)) + "/");
    A = (a) => {
      a = B(a) ? new URL(a) : a;
      return fs.readFileSync(a);
    };
    z = async (a) => {
      a = B(a) ? new URL(a) : a;
      return fs.readFileSync(a, void 0);
    };
    1 < process.argv.length && (u = process.argv[1].replace(/\\/g, "/"));
    process.argv.slice(2);
    v = (a, c) => {
      process.exitCode = a;
      throw c;
    };
  } else if (aa || n) {
    try {
      y = new URL(".", w).href;
    } catch {
    }
    n && (A = (a) => {
      var c = new XMLHttpRequest();
      c.open("GET", a, false);
      c.responseType = "arraybuffer";
      c.send(null);
      return new Uint8Array(c.response);
    });
    z = async (a) => {
      if (B(a)) return new Promise((b, e) => {
        var f = new XMLHttpRequest();
        f.open("GET", a, true);
        f.responseType = "arraybuffer";
        f.onload = () => {
          200 == f.status || 0 == f.status && f.response ? b(f.response) : e(f.status);
        };
        f.onerror = e;
        f.send(null);
      });
      var c = await fetch(a, { credentials: "same-origin" });
      if (c.ok) return c.arrayBuffer();
      throw Error(c.status + " : " + c.url);
    };
  }
  var C = console.log.bind(console), D = console.error.bind(console), E, F = false, G, B = (a) => a.startsWith("file://"), H, I, J, K, L, M, ba = false;
  function ca() {
    var a = t.buffer;
    d.HEAP8 = J = new Int8Array(a);
    new Int16Array(a);
    d.HEAPU8 = K = new Uint8Array(a);
    new Uint16Array(a);
    L = new Int32Array(a);
    M = new Uint32Array(a);
    new Float32Array(a);
    new Float64Array(a);
    new BigInt64Array(a);
    new BigUint64Array(a);
  }
  function N(a) {
    d.onAbort?.(a);
    a = "Aborted(" + a + ")";
    D(a);
    F = true;
    a = new WebAssembly.RuntimeError(a + ". Build with -sASSERTIONS for more info.");
    I?.(a);
    throw a;
  }
  var O;
  async function da(a) {
    if (!E) try {
      var c = await z(a);
      return new Uint8Array(c);
    } catch {
    }
    if (a == O && E) a = new Uint8Array(E);
    else if (A) a = A(a);
    else throw "both async and sync fetching of the wasm failed";
    return a;
  }
  async function ea(a, c) {
    try {
      var b = await da(a);
      return await WebAssembly.instantiate(b, c);
    } catch (e) {
      D(`failed to asynchronously prepare wasm: ${e}`), N(e);
    }
  }
  async function fa(a) {
    var c = O;
    if (!E && !B(c) && !q) try {
      var b = fetch(c, { credentials: "same-origin" });
      return await WebAssembly.instantiateStreaming(b, a);
    } catch (e) {
      D(`wasm streaming compile failed: ${e}`), D("falling back to ArrayBuffer instantiation");
    }
    return ea(c, a);
  }
  class P {
    name = "ExitStatus";
    constructor(a) {
      this.message = `Program terminated with exit(${a})`;
      this.status = a;
    }
  }
  var ha = (a) => {
    for (; 0 < a.length; ) a.shift()(d);
  }, ia = [], ja = [], ka = () => {
    var a = d.preRun.shift();
    ja.push(a);
  }, Q = true, t, la = new TextDecoder(), ma = (a, c, b, e) => {
    b = c + b;
    if (e) return b;
    for (; a[c] && !(c >= b); ) ++c;
    return c;
  }, R = (a, c, b) => a ? la.decode(K.subarray(a, ma(K, a, c, b))) : "", S = 0, na = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335], oa = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334], T = {}, pa = (a) => {
    G = a;
    Q || 0 < S || (d.onExit?.(a), F = true);
    v(a, new P(a));
  }, qa = (a) => {
    if (!F) try {
      a();
    } catch (c) {
      c instanceof P || "unwind" == c || v(1, c);
    } finally {
      if (!(Q || 0 < S)) try {
        G = a = G, pa(a);
      } catch (c) {
        c instanceof P || "unwind" == c || v(1, c);
      }
    }
  }, U = (a, c, b) => {
    var e = K;
    if (!(0 < b)) return 0;
    var f = c;
    b = c + b - 1;
    for (var g = 0; g < a.length; ++g) {
      var h = a.codePointAt(g);
      if (127 >= h) {
        if (c >= b) break;
        e[c++] = h;
      } else if (2047 >= h) {
        if (c + 1 >= b) break;
        e[c++] = 192 | h >> 6;
        e[c++] = 128 | h & 63;
      } else if (65535 >= h) {
        if (c + 2 >= b) break;
        e[c++] = 224 | h >> 12;
        e[c++] = 128 | h >> 6 & 63;
        e[c++] = 128 | h & 63;
      } else {
        if (c + 3 >= b) break;
        e[c++] = 240 | h >> 18;
        e[c++] = 128 | h >> 12 & 63;
        e[c++] = 128 | h >> 6 & 63;
        e[c++] = 128 | h & 63;
        g++;
      }
    }
    e[c] = 0;
    return c - f;
  }, V = {}, ra = () => {
    if (!W) {
      var a = {
        USER: "web_user",
        LOGNAME: "web_user",
        PATH: "/",
        PWD: "/",
        HOME: "/home/web_user",
        LANG: (globalThis.navigator?.language ?? "C").replace("-", "_") + ".UTF-8",
        _: u || "./this.program"
      }, c;
      for (c in V) void 0 === V[c] ? delete a[c] : a[c] = V[c];
      var b = [];
      for (c in a) b.push(`${c}=${a[c]}`);
      W = b;
    }
    return W;
  }, W, X = (a) => {
    for (var c = 0, b = 0; b < a.length; ++b) {
      var e = a.charCodeAt(b);
      127 >= e ? c++ : 2047 >= e ? c += 2 : 55296 <= e && 57343 >= e ? (c += 4, ++b) : c += 3;
    }
    return c;
  }, sa = [null, [], []], va = (a, c, b, e) => {
    var f = { string: (k) => {
      var l = 0;
      if (null !== k && void 0 !== k && 0 !== k) {
        l = X(k) + 1;
        var p = Y(l);
        U(
          k,
          p,
          l
        );
        l = p;
      }
      return l;
    }, array: (k) => {
      var l = Y(k.length);
      J.set(k, l);
      return l;
    } };
    a = d["_" + a];
    var g = [], h = 0;
    if (e) for (var m = 0; m < e.length; m++) {
      var x = f[b[m]];
      x ? (0 === h && (h = ta()), g[m] = x(e[m])) : g[m] = e[m];
    }
    b = a(...g);
    return b = (function(k) {
      0 !== h && ua(h);
      return "string" === c ? R(k) : "boolean" === c ? !!k : k;
    })(b);
  };
  d.wasmMemory ? t = d.wasmMemory : t = new WebAssembly.Memory({ initial: (d.INITIAL_MEMORY || 16777216) / 65536, maximum: 32768 });
  ca();
  d.noExitRuntime && (Q = d.noExitRuntime);
  d.print && (C = d.print);
  d.printErr && (D = d.printErr);
  d.wasmBinary && (E = d.wasmBinary);
  d.thisProgram && (u = d.thisProgram);
  if (d.preInit) for ("function" == typeof d.preInit && (d.preInit = [d.preInit]); 0 < d.preInit.length; ) d.preInit.shift()();
  d.cwrap = (a, c, b, e) => {
    var f = !b || b.every((g) => "number" === g || "boolean" === g);
    return "string" !== c && f && !e ? d["_" + a] : (...g) => va(a, c, b, g);
  };
  d.UTF8ToString = R;
  d.stringToUTF8 = (a, c, b) => U(a, c, b);
  d.lengthBytesUTF8 = X;
  var wa, ua, Y, ta, xa = { b: (a, c, b, e) => N(`Assertion failed: ${R(a)}, at: ` + [c ? R(c) : "unknown filename", b, e ? R(e) : "unknown function"]), q: () => N(""), l: () => {
    Q = false;
    S = 0;
  }, m: function(a, c) {
    a = -9007199254740992 > a || 9007199254740992 < a ? NaN : Number(a);
    a = new Date(1e3 * a);
    L[c >> 2] = a.getSeconds();
    L[c + 4 >> 2] = a.getMinutes();
    L[c + 8 >> 2] = a.getHours();
    L[c + 12 >> 2] = a.getDate();
    L[c + 16 >> 2] = a.getMonth();
    L[c + 20 >> 2] = a.getFullYear() - 1900;
    L[c + 24 >> 2] = a.getDay();
    var b = a.getFullYear();
    L[c + 28 >> 2] = (0 !== b % 4 || 0 === b % 100 && 0 !== b % 400 ? oa : na)[a.getMonth()] + a.getDate() - 1 | 0;
    L[c + 36 >> 2] = -(60 * a.getTimezoneOffset());
    b = new Date(a.getFullYear(), 6, 1).getTimezoneOffset();
    var e = new Date(a.getFullYear(), 0, 1).getTimezoneOffset();
    L[c + 32 >> 2] = (b != e && a.getTimezoneOffset() == Math.min(e, b)) | 0;
  }, j: (a, c) => {
    T[a] && (clearTimeout(T[a].id), delete T[a]);
    if (!c) return 0;
    var b = setTimeout(() => {
      delete T[a];
      qa(() => wa(a, performance.now()));
    }, c);
    T[a] = { id: b, Qa: c };
    return 0;
  }, n: (a, c, b, e) => {
    var f = (/* @__PURE__ */ new Date()).getFullYear(), g = new Date(f, 0, 1).getTimezoneOffset();
    f = new Date(f, 6, 1).getTimezoneOffset();
    M[a >> 2] = 60 * Math.max(g, f);
    L[c >> 2] = Number(g != f);
    c = (h) => {
      var m = Math.abs(h);
      return `UTC${0 <= h ? "-" : "+"}${String(Math.floor(m / 60)).padStart(2, "0")}${String(m % 60).padStart(2, "0")}`;
    };
    a = c(g);
    c = c(f);
    f < g ? (U(a, b, 17), U(c, e, 17)) : (U(a, e, 17), U(c, b, 17));
  }, p: () => Date.now(), k: (a) => {
    var c = K.length;
    a >>>= 0;
    if (2147483648 < a) return false;
    for (var b = 1; 4 >= b; b *= 2) {
      var e = c * (1 + 0.2 / b);
      e = Math.min(e, a + 100663296);
      a: {
        e = (Math.min(2147483648, 65536 * Math.ceil(Math.max(a, e) / 65536)) - t.buffer.byteLength + 65535) / 65536 | 0;
        try {
          t.grow(e);
          ca();
          var f = 1;
          break a;
        } catch (g) {
        }
        f = void 0;
      }
      if (f) return true;
    }
    return false;
  }, e: (a, c) => {
    var b = 0, e = 0, f;
    for (f of ra()) {
      var g = c + b;
      M[a + e >> 2] = g;
      b += U(f, g, Infinity) + 1;
      e += 4;
    }
    return 0;
  }, f: (a, c) => {
    var b = ra();
    M[a >> 2] = b.length;
    a = 0;
    for (var e of b) a += X(e) + 1;
    M[c >> 2] = a;
    return 0;
  }, d: () => 52, o: function() {
    return 70;
  }, c: (a, c, b, e) => {
    for (var f = 0, g = 0; g < b; g++) {
      var h = M[c >> 2], m = M[c + 4 >> 2];
      c += 8;
      for (var x = 0; x < m; x++) {
        var k = a, l = K[h + x], p = sa[k];
        0 === l || 10 === l ? (k = 1 === k ? C : D, l = ma(p, 0), l = la.decode(p.buffer ? p.subarray(0, l) : new Uint8Array(p.slice(0, l))), k(l), p.length = 0) : p.push(l);
      }
      f += m;
    }
    M[e >> 2] = f;
    return 0;
  }, a: t, r: pa, s: function(a, c, b, e, f) {
    return d.callbacks.callFunction(void 0, a, c, b, e, f);
  }, i: function(a) {
    return d.callbacks.shouldInterrupt(void 0, a);
  }, h: function(a, c, b) {
    b = R(b);
    return d.callbacks.loadModuleSource(void 0, a, c, b);
  }, g: function(a, c, b, e) {
    b = R(b);
    e = R(e);
    return d.callbacks.normalizeModule(void 0, a, c, b, e);
  }, t: function(a, c) {
    d.callbacks.freeHostRef(void 0, a, c);
  } }, Z;
  Z = await (async function() {
    function a(b) {
      b = Z = b.exports;
      d._malloc = b.v;
      d._QTS_Throw = b.w;
      d._QTS_NewError = b.x;
      d._QTS_RuntimeSetMemoryLimit = b.y;
      d._QTS_RuntimeComputeMemoryUsage = b.z;
      d._QTS_RuntimeDumpMemoryUsage = b.A;
      d._QTS_RecoverableLeakCheck = b.B;
      d._QTS_BuildIsSanitizeLeak = b.C;
      d._QTS_RuntimeSetMaxStackSize = b.D;
      d._QTS_GetUndefined = b.E;
      d._QTS_GetNull = b.F;
      d._QTS_GetFalse = b.G;
      d._QTS_GetTrue = b.H;
      d._QTS_NewHostRef = b.I;
      d._QTS_GetHostRefId = b.J;
      d._QTS_NewRuntime = b.K;
      d._QTS_FreeRuntime = b.L;
      d._free = b.M;
      d._QTS_NewContext = b.N;
      d._QTS_FreeContext = b.O;
      d._QTS_FreeValuePointer = b.P;
      d._QTS_FreeValuePointerRuntime = b.Q;
      d._QTS_FreeVoidPointer = b.R;
      d._QTS_FreeCString = b.S;
      d._QTS_DupValuePointer = b.T;
      d._QTS_NewObject = b.U;
      d._QTS_NewObjectProto = b.V;
      d._QTS_NewArray = b.W;
      d._QTS_NewArrayBuffer = b.X;
      d._QTS_NewFloat64 = b.Y;
      d._QTS_GetFloat64 = b.Z;
      d._QTS_NewString = b._;
      d._QTS_GetString = b.$;
      d._QTS_GetArrayBuffer = b.aa;
      d._QTS_GetArrayBufferLength = b.ba;
      d._QTS_NewSymbol = b.ca;
      d._QTS_GetSymbolDescriptionOrKey = b.da;
      d._QTS_IsGlobalSymbol = b.ea;
      d._QTS_IsJobPending = b.fa;
      d._QTS_ExecutePendingJob = b.ga;
      d._QTS_GetProp = b.ha;
      d._QTS_GetPropNumber = b.ia;
      d._QTS_SetProp = b.ja;
      d._QTS_DefineProp = b.ka;
      d._QTS_GetOwnPropertyNames = b.la;
      d._QTS_Call = b.ma;
      d._QTS_ResolveException = b.na;
      d._QTS_Dump = b.oa;
      d._QTS_Eval = b.pa;
      d._QTS_GetModuleNamespace = b.qa;
      d._QTS_Typeof = b.ra;
      d._QTS_GetLength = b.sa;
      d._QTS_IsEqual = b.ta;
      d._QTS_GetGlobalObject = b.ua;
      d._QTS_NewPromiseCapability = b.va;
      d._QTS_PromiseState = b.wa;
      d._QTS_PromiseResult = b.xa;
      d._QTS_TestStringArg = b.ya;
      d._QTS_GetDebugLogEnabled = b.za;
      d._QTS_SetDebugLogEnabled = b.Aa;
      d._QTS_BuildIsDebug = b.Ba;
      d._QTS_BuildIsAsyncify = b.Ca;
      d._QTS_NewFunction = b.Da;
      d._QTS_ArgvGetJSValueConstPointer = b.Ea;
      d._QTS_RuntimeEnableInterruptHandler = b.Fa;
      d._QTS_RuntimeDisableInterruptHandler = b.Ga;
      d._QTS_RuntimeEnableModuleLoader = b.Ha;
      d._QTS_RuntimeDisableModuleLoader = b.Ia;
      d._QTS_bjson_encode = b.Ja;
      d._QTS_bjson_decode = b.Ka;
      wa = b.La;
      ua = b.Ma;
      Y = b.Na;
      ta = b.Oa;
      return Z;
    }
    var c = { a: xa };
    if (d.instantiateWasm) return new Promise((b) => {
      d.instantiateWasm(c, (e, f) => {
        b(a(e, f));
      });
    });
    O ??= d.locateFile ? d.locateFile ? d.locateFile("emscripten-module.wasm", y) : y + "emscripten-module.wasm" : new URL("emscripten-module.wasm", import.meta.url).href;
    return a((await fa(c)).instance);
  })();
  (function() {
    function a() {
      d.calledRun = true;
      if (!F) {
        ba = true;
        Z.u();
        H?.(d);
        d.onRuntimeInitialized?.();
        if (d.postRun) for ("function" == typeof d.postRun && (d.postRun = [d.postRun]); d.postRun.length; ) {
          var c = d.postRun.shift();
          ia.push(c);
        }
        ha(ia);
      }
    }
    if (d.preRun) for ("function" == typeof d.preRun && (d.preRun = [d.preRun]); d.preRun.length; ) ka();
    ha(ja);
    d.setStatus ? (d.setStatus("Running..."), setTimeout(() => {
      setTimeout(() => d.setStatus(""), 1);
      a();
    }, 1)) : a();
  })();
  ba ? moduleRtn = d : moduleRtn = new Promise((a, c) => {
    H = a;
    I = c;
  });
  ;
  return moduleRtn;
}
var emscripten_module_default;
var init_emscripten_module = __esm({
  "node_modules/.pnpm/@jitl+quickjs-wasmfile-release-sync@0.32.0/node_modules/@jitl/quickjs-wasmfile-release-sync/dist/emscripten-module.mjs"() {
    emscripten_module_default = QuickJSRaw;
  }
});

// v2/main.ts
import { randomUUID as randomUUID2 } from "node:crypto";
import { parseArgs } from "node:util";

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

// node_modules/.pnpm/@manus+addon-kit@git+https+++git@github.com+manus-ai+manus-addon.git+4fd026b7010d92146d8e21d6aaf984e43bd9829a/node_modules/@manus/addon-kit/packages/addon-tools/src/mcpServer.ts
import readline from "node:readline";
function createMcpServer(options) {
  const protocolVersion = options.protocolVersion ?? "2024-11-05";
  const capabilities = options.capabilities ?? { tools: {} };
  function respond(id, result) {
    process.stdout.write(`${JSON.stringify({ jsonrpc: "2.0", id, result })}
`);
  }
  function fail(id, code, message2) {
    process.stdout.write(`${JSON.stringify({ jsonrpc: "2.0", id, error: { code, message: message2 } })}
`);
  }
  const io = { respond, fail };
  async function handleMessage(message2) {
    const { id, method, params } = message2;
    if (method === "initialize") {
      respond(id, {
        protocolVersion,
        serverInfo: options.serverInfo,
        capabilities
      });
      return;
    }
    if (method === "tools/list") {
      respond(id, { tools: options.listTools() });
      return;
    }
    if (method === "tools/call") {
      await options.callTool(id, params, io);
      return;
    }
    if (method === "ping") {
      respond(id, {});
      return;
    }
    if (method === "notifications/initialized") {
      return;
    }
    fail(id, -32601, `unknown method: ${method}`);
  }
  function start() {
    const input = readline.createInterface({ input: process.stdin, terminal: false });
    input.on("line", (line) => {
      if (!line.trim()) return;
      try {
        void handleMessage(JSON.parse(line));
      } catch (error) {
        fail(null, -32700, String(error instanceof Error ? error.message : error));
      }
    });
    let shuttingDown = false;
    function shutdown() {
      if (shuttingDown) return;
      shuttingDown = true;
      void (async () => {
        await options.onShutdown?.();
      })().finally(() => process.exit(0));
    }
    input.on("close", shutdown);
    process.on("SIGTERM", shutdown);
    process.on("SIGINT", shutdown);
  }
  return { start, respond, fail };
}

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

// node_modules/.pnpm/@bufbuild+protobuf@2.2.3/node_modules/@bufbuild/protobuf/dist/esm/is-message.js
function isMessage(arg, schema) {
  const isMessage2 = arg !== null && typeof arg == "object" && "$typeName" in arg && typeof arg.$typeName == "string";
  if (!isMessage2) {
    return false;
  }
  if (schema === void 0) {
    return true;
  }
  return schema.typeName === arg.$typeName;
}

// node_modules/.pnpm/@bufbuild+protobuf@2.2.3/node_modules/@bufbuild/protobuf/dist/esm/descriptors.js
var ScalarType;
(function(ScalarType2) {
  ScalarType2[ScalarType2["DOUBLE"] = 1] = "DOUBLE";
  ScalarType2[ScalarType2["FLOAT"] = 2] = "FLOAT";
  ScalarType2[ScalarType2["INT64"] = 3] = "INT64";
  ScalarType2[ScalarType2["UINT64"] = 4] = "UINT64";
  ScalarType2[ScalarType2["INT32"] = 5] = "INT32";
  ScalarType2[ScalarType2["FIXED64"] = 6] = "FIXED64";
  ScalarType2[ScalarType2["FIXED32"] = 7] = "FIXED32";
  ScalarType2[ScalarType2["BOOL"] = 8] = "BOOL";
  ScalarType2[ScalarType2["STRING"] = 9] = "STRING";
  ScalarType2[ScalarType2["BYTES"] = 12] = "BYTES";
  ScalarType2[ScalarType2["UINT32"] = 13] = "UINT32";
  ScalarType2[ScalarType2["SFIXED32"] = 15] = "SFIXED32";
  ScalarType2[ScalarType2["SFIXED64"] = 16] = "SFIXED64";
  ScalarType2[ScalarType2["SINT32"] = 17] = "SINT32";
  ScalarType2[ScalarType2["SINT64"] = 18] = "SINT64";
})(ScalarType || (ScalarType = {}));

// node_modules/.pnpm/@bufbuild+protobuf@2.2.3/node_modules/@bufbuild/protobuf/dist/esm/wire/varint.js
function varint64read() {
  let lowBits = 0;
  let highBits = 0;
  for (let shift = 0; shift < 28; shift += 7) {
    let b = this.buf[this.pos++];
    lowBits |= (b & 127) << shift;
    if ((b & 128) == 0) {
      this.assertBounds();
      return [lowBits, highBits];
    }
  }
  let middleByte = this.buf[this.pos++];
  lowBits |= (middleByte & 15) << 28;
  highBits = (middleByte & 112) >> 4;
  if ((middleByte & 128) == 0) {
    this.assertBounds();
    return [lowBits, highBits];
  }
  for (let shift = 3; shift <= 31; shift += 7) {
    let b = this.buf[this.pos++];
    highBits |= (b & 127) << shift;
    if ((b & 128) == 0) {
      this.assertBounds();
      return [lowBits, highBits];
    }
  }
  throw new Error("invalid varint");
}
function varint64write(lo, hi, bytes) {
  for (let i = 0; i < 28; i = i + 7) {
    const shift = lo >>> i;
    const hasNext = !(shift >>> 7 == 0 && hi == 0);
    const byte = (hasNext ? shift | 128 : shift) & 255;
    bytes.push(byte);
    if (!hasNext) {
      return;
    }
  }
  const splitBits = lo >>> 28 & 15 | (hi & 7) << 4;
  const hasMoreBits = !(hi >> 3 == 0);
  bytes.push((hasMoreBits ? splitBits | 128 : splitBits) & 255);
  if (!hasMoreBits) {
    return;
  }
  for (let i = 3; i < 31; i = i + 7) {
    const shift = hi >>> i;
    const hasNext = !(shift >>> 7 == 0);
    const byte = (hasNext ? shift | 128 : shift) & 255;
    bytes.push(byte);
    if (!hasNext) {
      return;
    }
  }
  bytes.push(hi >>> 31 & 1);
}
var TWO_PWR_32_DBL = 4294967296;
function int64FromString(dec) {
  const minus = dec[0] === "-";
  if (minus) {
    dec = dec.slice(1);
  }
  const base = 1e6;
  let lowBits = 0;
  let highBits = 0;
  function add1e6digit(begin, end) {
    const digit1e6 = Number(dec.slice(begin, end));
    highBits *= base;
    lowBits = lowBits * base + digit1e6;
    if (lowBits >= TWO_PWR_32_DBL) {
      highBits = highBits + (lowBits / TWO_PWR_32_DBL | 0);
      lowBits = lowBits % TWO_PWR_32_DBL;
    }
  }
  add1e6digit(-24, -18);
  add1e6digit(-18, -12);
  add1e6digit(-12, -6);
  add1e6digit(-6);
  return minus ? negate(lowBits, highBits) : newBits(lowBits, highBits);
}
function int64ToString(lo, hi) {
  let bits = newBits(lo, hi);
  const negative = bits.hi & 2147483648;
  if (negative) {
    bits = negate(bits.lo, bits.hi);
  }
  const result = uInt64ToString(bits.lo, bits.hi);
  return negative ? "-" + result : result;
}
function uInt64ToString(lo, hi) {
  ({ lo, hi } = toUnsigned(lo, hi));
  if (hi <= 2097151) {
    return String(TWO_PWR_32_DBL * hi + lo);
  }
  const low = lo & 16777215;
  const mid = (lo >>> 24 | hi << 8) & 16777215;
  const high = hi >> 16 & 65535;
  let digitA = low + mid * 6777216 + high * 6710656;
  let digitB = mid + high * 8147497;
  let digitC = high * 2;
  const base = 1e7;
  if (digitA >= base) {
    digitB += Math.floor(digitA / base);
    digitA %= base;
  }
  if (digitB >= base) {
    digitC += Math.floor(digitB / base);
    digitB %= base;
  }
  return digitC.toString() + decimalFrom1e7WithLeadingZeros(digitB) + decimalFrom1e7WithLeadingZeros(digitA);
}
function toUnsigned(lo, hi) {
  return { lo: lo >>> 0, hi: hi >>> 0 };
}
function newBits(lo, hi) {
  return { lo: lo | 0, hi: hi | 0 };
}
function negate(lowBits, highBits) {
  highBits = ~highBits;
  if (lowBits) {
    lowBits = ~lowBits + 1;
  } else {
    highBits += 1;
  }
  return newBits(lowBits, highBits);
}
var decimalFrom1e7WithLeadingZeros = (digit1e7) => {
  const partial = String(digit1e7);
  return "0000000".slice(partial.length) + partial;
};
function varint32write(value, bytes) {
  if (value >= 0) {
    while (value > 127) {
      bytes.push(value & 127 | 128);
      value = value >>> 7;
    }
    bytes.push(value);
  } else {
    for (let i = 0; i < 9; i++) {
      bytes.push(value & 127 | 128);
      value = value >> 7;
    }
    bytes.push(1);
  }
}
function varint32read() {
  let b = this.buf[this.pos++];
  let result = b & 127;
  if ((b & 128) == 0) {
    this.assertBounds();
    return result;
  }
  b = this.buf[this.pos++];
  result |= (b & 127) << 7;
  if ((b & 128) == 0) {
    this.assertBounds();
    return result;
  }
  b = this.buf[this.pos++];
  result |= (b & 127) << 14;
  if ((b & 128) == 0) {
    this.assertBounds();
    return result;
  }
  b = this.buf[this.pos++];
  result |= (b & 127) << 21;
  if ((b & 128) == 0) {
    this.assertBounds();
    return result;
  }
  b = this.buf[this.pos++];
  result |= (b & 15) << 28;
  for (let readBytes = 5; (b & 128) !== 0 && readBytes < 10; readBytes++)
    b = this.buf[this.pos++];
  if ((b & 128) != 0)
    throw new Error("invalid varint");
  this.assertBounds();
  return result >>> 0;
}

// node_modules/.pnpm/@bufbuild+protobuf@2.2.3/node_modules/@bufbuild/protobuf/dist/esm/proto-int64.js
var protoInt64 = /* @__PURE__ */ makeInt64Support();
function makeInt64Support() {
  const dv = new DataView(new ArrayBuffer(8));
  const ok = typeof BigInt === "function" && typeof dv.getBigInt64 === "function" && typeof dv.getBigUint64 === "function" && typeof dv.setBigInt64 === "function" && typeof dv.setBigUint64 === "function" && (typeof process != "object" || typeof process.env != "object" || process.env.BUF_BIGINT_DISABLE !== "1");
  if (ok) {
    const MIN = BigInt("-9223372036854775808"), MAX = BigInt("9223372036854775807"), UMIN = BigInt("0"), UMAX = BigInt("18446744073709551615");
    return {
      zero: BigInt(0),
      supported: true,
      parse(value) {
        const bi = typeof value == "bigint" ? value : BigInt(value);
        if (bi > MAX || bi < MIN) {
          throw new Error(`invalid int64: ${value}`);
        }
        return bi;
      },
      uParse(value) {
        const bi = typeof value == "bigint" ? value : BigInt(value);
        if (bi > UMAX || bi < UMIN) {
          throw new Error(`invalid uint64: ${value}`);
        }
        return bi;
      },
      enc(value) {
        dv.setBigInt64(0, this.parse(value), true);
        return {
          lo: dv.getInt32(0, true),
          hi: dv.getInt32(4, true)
        };
      },
      uEnc(value) {
        dv.setBigInt64(0, this.uParse(value), true);
        return {
          lo: dv.getInt32(0, true),
          hi: dv.getInt32(4, true)
        };
      },
      dec(lo, hi) {
        dv.setInt32(0, lo, true);
        dv.setInt32(4, hi, true);
        return dv.getBigInt64(0, true);
      },
      uDec(lo, hi) {
        dv.setInt32(0, lo, true);
        dv.setInt32(4, hi, true);
        return dv.getBigUint64(0, true);
      }
    };
  }
  return {
    zero: "0",
    supported: false,
    parse(value) {
      if (typeof value != "string") {
        value = value.toString();
      }
      assertInt64String(value);
      return value;
    },
    uParse(value) {
      if (typeof value != "string") {
        value = value.toString();
      }
      assertUInt64String(value);
      return value;
    },
    enc(value) {
      if (typeof value != "string") {
        value = value.toString();
      }
      assertInt64String(value);
      return int64FromString(value);
    },
    uEnc(value) {
      if (typeof value != "string") {
        value = value.toString();
      }
      assertUInt64String(value);
      return int64FromString(value);
    },
    dec(lo, hi) {
      return int64ToString(lo, hi);
    },
    uDec(lo, hi) {
      return uInt64ToString(lo, hi);
    }
  };
}
function assertInt64String(value) {
  if (!/^-?[0-9]+$/.test(value)) {
    throw new Error("invalid int64: " + value);
  }
}
function assertUInt64String(value) {
  if (!/^[0-9]+$/.test(value)) {
    throw new Error("invalid uint64: " + value);
  }
}

// node_modules/.pnpm/@bufbuild+protobuf@2.2.3/node_modules/@bufbuild/protobuf/dist/esm/reflect/scalar.js
function scalarZeroValue(type, longAsString) {
  switch (type) {
    case ScalarType.STRING:
      return "";
    case ScalarType.BOOL:
      return false;
    default:
      return 0;
    case ScalarType.DOUBLE:
    case ScalarType.FLOAT:
      return 0;
    case ScalarType.INT64:
    case ScalarType.UINT64:
    case ScalarType.SFIXED64:
    case ScalarType.FIXED64:
    case ScalarType.SINT64:
      return longAsString ? "0" : protoInt64.zero;
    case ScalarType.BYTES:
      return new Uint8Array(0);
  }
}
function isScalarZeroValue(type, value) {
  switch (type) {
    case ScalarType.BOOL:
      return value === false;
    case ScalarType.STRING:
      return value === "";
    case ScalarType.BYTES:
      return value instanceof Uint8Array && !value.byteLength;
    default:
      return value == 0;
  }
}

// node_modules/.pnpm/@bufbuild+protobuf@2.2.3/node_modules/@bufbuild/protobuf/dist/esm/reflect/error.js
var errorNames = [
  "FieldValueInvalidError",
  "FieldListRangeError",
  "ForeignFieldError"
];
var FieldError = class extends Error {
  constructor(fieldOrOneof, message2, name = "FieldValueInvalidError") {
    super(message2);
    this.name = name;
    this.field = () => fieldOrOneof;
  }
};
function isFieldError(arg) {
  return arg instanceof Error && errorNames.includes(arg.name) && "field" in arg && typeof arg.field == "function";
}

// node_modules/.pnpm/@bufbuild+protobuf@2.2.3/node_modules/@bufbuild/protobuf/dist/esm/reflect/unsafe.js
var IMPLICIT = 2;
var unsafeLocal = /* @__PURE__ */ Symbol.for("reflect unsafe local");
function unsafeOneofCase(target, oneof) {
  const c = target[oneof.localName].case;
  if (c === void 0) {
    return c;
  }
  return oneof.fields.find((f) => f.localName === c);
}
function unsafeIsSet(target, field) {
  const name = field.localName;
  if (field.oneof) {
    return target[field.oneof.localName].case === name;
  }
  if (field.presence != IMPLICIT) {
    return target[name] !== void 0 && Object.prototype.hasOwnProperty.call(target, name);
  }
  switch (field.fieldKind) {
    case "list":
      return target[name].length > 0;
    case "map":
      return Object.keys(target[name]).length > 0;
    // eslint-disable-line @typescript-eslint/no-unsafe-argument
    case "scalar":
      return !isScalarZeroValue(field.scalar, target[name]);
    case "enum":
      return target[name] !== field.enum.values[0].number;
  }
  throw new Error("message field with implicit presence");
}
function unsafeIsSetExplicit(target, localName) {
  return Object.prototype.hasOwnProperty.call(target, localName) && target[localName] !== void 0;
}
function unsafeGet(target, field) {
  if (field.oneof) {
    const oneof = target[field.oneof.localName];
    if (oneof.case === field.localName) {
      return oneof.value;
    }
    return void 0;
  }
  return target[field.localName];
}
function unsafeSet(target, field, value) {
  if (field.oneof) {
    target[field.oneof.localName] = {
      case: field.localName,
      value
    };
  } else {
    target[field.localName] = value;
  }
}
function unsafeClear(target, field) {
  const name = field.localName;
  if (field.oneof) {
    const oneofLocalName = field.oneof.localName;
    if (target[oneofLocalName].case === name) {
      target[oneofLocalName] = { case: void 0 };
    }
  } else if (field.presence != IMPLICIT) {
    delete target[name];
  } else {
    switch (field.fieldKind) {
      case "map":
        target[name] = {};
        break;
      case "list":
        target[name] = [];
        break;
      case "enum":
        target[name] = field.enum.values[0].number;
        break;
      case "scalar":
        target[name] = scalarZeroValue(field.scalar, field.longAsString);
        break;
    }
  }
}

// node_modules/.pnpm/@bufbuild+protobuf@2.2.3/node_modules/@bufbuild/protobuf/dist/esm/reflect/guard.js
function isObject(arg) {
  return arg !== null && typeof arg == "object" && !Array.isArray(arg);
}
function isReflectList(arg, field) {
  var _a, _b, _c, _d;
  if (isObject(arg) && unsafeLocal in arg && "add" in arg && "field" in arg && typeof arg.field == "function") {
    if (field !== void 0) {
      const a = field, b = arg.field();
      return a.listKind == b.listKind && a.scalar === b.scalar && ((_a = a.message) === null || _a === void 0 ? void 0 : _a.typeName) === ((_b = b.message) === null || _b === void 0 ? void 0 : _b.typeName) && ((_c = a.enum) === null || _c === void 0 ? void 0 : _c.typeName) === ((_d = b.enum) === null || _d === void 0 ? void 0 : _d.typeName);
    }
    return true;
  }
  return false;
}
function isReflectMap(arg, field) {
  var _a, _b, _c, _d;
  if (isObject(arg) && unsafeLocal in arg && "has" in arg && "field" in arg && typeof arg.field == "function") {
    if (field !== void 0) {
      const a = field, b = arg.field();
      return a.mapKey === b.mapKey && a.mapKind == b.mapKind && a.scalar === b.scalar && ((_a = a.message) === null || _a === void 0 ? void 0 : _a.typeName) === ((_b = b.message) === null || _b === void 0 ? void 0 : _b.typeName) && ((_c = a.enum) === null || _c === void 0 ? void 0 : _c.typeName) === ((_d = b.enum) === null || _d === void 0 ? void 0 : _d.typeName);
    }
    return true;
  }
  return false;
}
function isReflectMessage(arg, messageDesc2) {
  return isObject(arg) && unsafeLocal in arg && "desc" in arg && isObject(arg.desc) && arg.desc.kind === "message" && (messageDesc2 === void 0 || arg.desc.typeName == messageDesc2.typeName);
}

// node_modules/.pnpm/@bufbuild+protobuf@2.2.3/node_modules/@bufbuild/protobuf/dist/esm/wkt/wrappers.js
function isWrapper(arg) {
  return isWrapperTypeName(arg.$typeName);
}
function isWrapperDesc(messageDesc2) {
  const f = messageDesc2.fields[0];
  return isWrapperTypeName(messageDesc2.typeName) && f !== void 0 && f.fieldKind == "scalar" && f.name == "value" && f.number == 1;
}
function isWrapperTypeName(name) {
  return name.startsWith("google.protobuf.") && [
    "DoubleValue",
    "FloatValue",
    "Int64Value",
    "UInt64Value",
    "Int32Value",
    "UInt32Value",
    "BoolValue",
    "StringValue",
    "BytesValue"
  ].includes(name.substring(16));
}

// node_modules/.pnpm/@bufbuild+protobuf@2.2.3/node_modules/@bufbuild/protobuf/dist/esm/create.js
var EDITION_PROTO3 = 999;
var EDITION_PROTO2 = 998;
var IMPLICIT2 = 2;
function create(schema, init) {
  if (isMessage(init, schema)) {
    return init;
  }
  const message2 = createZeroMessage(schema);
  if (init !== void 0) {
    initMessage(schema, message2, init);
  }
  return message2;
}
function initMessage(messageDesc2, message2, init) {
  for (const member of messageDesc2.members) {
    let value = init[member.localName];
    if (value == null) {
      continue;
    }
    let field;
    if (member.kind == "oneof") {
      const oneofField = unsafeOneofCase(init, member);
      if (!oneofField) {
        continue;
      }
      field = oneofField;
      value = unsafeGet(init, oneofField);
    } else {
      field = member;
    }
    switch (field.fieldKind) {
      case "message":
        value = toMessage(field, value);
        break;
      case "scalar":
        value = initScalar(field, value);
        break;
      case "list":
        value = initList(field, value);
        break;
      case "map":
        value = initMap(field, value);
        break;
    }
    unsafeSet(message2, field, value);
  }
  return message2;
}
function initScalar(field, value) {
  if (field.scalar == ScalarType.BYTES) {
    return toU8Arr(value);
  }
  return value;
}
function initMap(field, value) {
  if (isObject(value)) {
    if (field.scalar == ScalarType.BYTES) {
      return convertObjectValues(value, toU8Arr);
    }
    if (field.mapKind == "message") {
      return convertObjectValues(value, (val) => toMessage(field, val));
    }
  }
  return value;
}
function initList(field, value) {
  if (Array.isArray(value)) {
    if (field.scalar == ScalarType.BYTES) {
      return value.map(toU8Arr);
    }
    if (field.listKind == "message") {
      return value.map((item) => toMessage(field, item));
    }
  }
  return value;
}
function toMessage(field, value) {
  if (field.fieldKind == "message" && !field.oneof && isWrapperDesc(field.message)) {
    return initScalar(field.message.fields[0], value);
  }
  if (isObject(value)) {
    if (field.message.typeName == "google.protobuf.Struct" && field.parent.typeName !== "google.protobuf.Value") {
      return value;
    }
    if (!isMessage(value, field.message)) {
      return create(field.message, value);
    }
  }
  return value;
}
function toU8Arr(value) {
  return Array.isArray(value) ? new Uint8Array(value) : value;
}
function convertObjectValues(obj, fn) {
  const ret = {};
  for (const entry of Object.entries(obj)) {
    ret[entry[0]] = fn(entry[1]);
  }
  return ret;
}
var tokenZeroMessageField = /* @__PURE__ */ Symbol();
var messagePrototypes = /* @__PURE__ */ new WeakMap();
function createZeroMessage(desc) {
  let msg;
  if (!needsPrototypeChain(desc)) {
    msg = {
      $typeName: desc.typeName
    };
    for (const member of desc.members) {
      if (member.kind == "oneof" || member.presence == IMPLICIT2) {
        msg[member.localName] = createZeroField(member);
      }
    }
  } else {
    const cached = messagePrototypes.get(desc);
    let prototype;
    let members;
    if (cached) {
      ({ prototype, members } = cached);
    } else {
      prototype = {};
      members = /* @__PURE__ */ new Set();
      for (const member of desc.members) {
        if (member.kind == "oneof") {
          continue;
        }
        if (member.fieldKind != "scalar" && member.fieldKind != "enum") {
          continue;
        }
        if (member.presence == IMPLICIT2) {
          continue;
        }
        members.add(member);
        prototype[member.localName] = createZeroField(member);
      }
      messagePrototypes.set(desc, { prototype, members });
    }
    msg = Object.create(prototype);
    msg.$typeName = desc.typeName;
    for (const member of desc.members) {
      if (members.has(member)) {
        continue;
      }
      if (member.kind == "field") {
        if (member.fieldKind == "message") {
          continue;
        }
        if (member.fieldKind == "scalar" || member.fieldKind == "enum") {
          if (member.presence != IMPLICIT2) {
            continue;
          }
        }
      }
      msg[member.localName] = createZeroField(member);
    }
  }
  return msg;
}
function needsPrototypeChain(desc) {
  switch (desc.file.edition) {
    case EDITION_PROTO3:
      return false;
    case EDITION_PROTO2:
      return true;
    default:
      return desc.fields.some((f) => f.presence != IMPLICIT2 && f.fieldKind != "message" && !f.oneof);
  }
}
function createZeroField(field) {
  if (field.kind == "oneof") {
    return { case: void 0 };
  }
  if (field.fieldKind == "list") {
    return [];
  }
  if (field.fieldKind == "map") {
    return {};
  }
  if (field.fieldKind == "message") {
    return tokenZeroMessageField;
  }
  const defaultValue = field.getDefaultValue();
  if (defaultValue !== void 0) {
    return field.fieldKind == "scalar" && field.longAsString ? defaultValue.toString() : defaultValue;
  }
  return field.fieldKind == "scalar" ? scalarZeroValue(field.scalar, field.longAsString) : field.enum.values[0].number;
}

// node_modules/.pnpm/@bufbuild+protobuf@2.2.3/node_modules/@bufbuild/protobuf/dist/esm/wire/text-encoding.js
var symbol = /* @__PURE__ */ Symbol.for("@bufbuild/protobuf/text-encoding");
function getTextEncoding() {
  if (globalThis[symbol] == void 0) {
    const te = new globalThis.TextEncoder();
    const td = new globalThis.TextDecoder();
    globalThis[symbol] = {
      encodeUtf8(text) {
        return te.encode(text);
      },
      decodeUtf8(bytes) {
        return td.decode(bytes);
      },
      checkUtf8(text) {
        try {
          encodeURIComponent(text);
          return true;
        } catch (e) {
          return false;
        }
      }
    };
  }
  return globalThis[symbol];
}

// node_modules/.pnpm/@bufbuild+protobuf@2.2.3/node_modules/@bufbuild/protobuf/dist/esm/wire/binary-encoding.js
var WireType;
(function(WireType2) {
  WireType2[WireType2["Varint"] = 0] = "Varint";
  WireType2[WireType2["Bit64"] = 1] = "Bit64";
  WireType2[WireType2["LengthDelimited"] = 2] = "LengthDelimited";
  WireType2[WireType2["StartGroup"] = 3] = "StartGroup";
  WireType2[WireType2["EndGroup"] = 4] = "EndGroup";
  WireType2[WireType2["Bit32"] = 5] = "Bit32";
})(WireType || (WireType = {}));
var FLOAT32_MAX = 34028234663852886e22;
var FLOAT32_MIN = -34028234663852886e22;
var UINT32_MAX = 4294967295;
var INT32_MAX = 2147483647;
var INT32_MIN = -2147483648;
var BinaryWriter = class {
  constructor(encodeUtf8 = getTextEncoding().encodeUtf8) {
    this.encodeUtf8 = encodeUtf8;
    this.stack = [];
    this.chunks = [];
    this.buf = [];
  }
  /**
   * Return all bytes written and reset this writer.
   */
  finish() {
    if (this.buf.length) {
      this.chunks.push(new Uint8Array(this.buf));
      this.buf = [];
    }
    let len = 0;
    for (let i = 0; i < this.chunks.length; i++)
      len += this.chunks[i].length;
    let bytes = new Uint8Array(len);
    let offset = 0;
    for (let i = 0; i < this.chunks.length; i++) {
      bytes.set(this.chunks[i], offset);
      offset += this.chunks[i].length;
    }
    this.chunks = [];
    return bytes;
  }
  /**
   * Start a new fork for length-delimited data like a message
   * or a packed repeated field.
   *
   * Must be joined later with `join()`.
   */
  fork() {
    this.stack.push({ chunks: this.chunks, buf: this.buf });
    this.chunks = [];
    this.buf = [];
    return this;
  }
  /**
   * Join the last fork. Write its length and bytes, then
   * return to the previous state.
   */
  join() {
    let chunk = this.finish();
    let prev = this.stack.pop();
    if (!prev)
      throw new Error("invalid state, fork stack empty");
    this.chunks = prev.chunks;
    this.buf = prev.buf;
    this.uint32(chunk.byteLength);
    return this.raw(chunk);
  }
  /**
   * Writes a tag (field number and wire type).
   *
   * Equivalent to `uint32( (fieldNo << 3 | type) >>> 0 )`.
   *
   * Generated code should compute the tag ahead of time and call `uint32()`.
   */
  tag(fieldNo, type) {
    return this.uint32((fieldNo << 3 | type) >>> 0);
  }
  /**
   * Write a chunk of raw bytes.
   */
  raw(chunk) {
    if (this.buf.length) {
      this.chunks.push(new Uint8Array(this.buf));
      this.buf = [];
    }
    this.chunks.push(chunk);
    return this;
  }
  /**
   * Write a `uint32` value, an unsigned 32 bit varint.
   */
  uint32(value) {
    assertUInt32(value);
    while (value > 127) {
      this.buf.push(value & 127 | 128);
      value = value >>> 7;
    }
    this.buf.push(value);
    return this;
  }
  /**
   * Write a `int32` value, a signed 32 bit varint.
   */
  int32(value) {
    assertInt32(value);
    varint32write(value, this.buf);
    return this;
  }
  /**
   * Write a `bool` value, a variant.
   */
  bool(value) {
    this.buf.push(value ? 1 : 0);
    return this;
  }
  /**
   * Write a `bytes` value, length-delimited arbitrary data.
   */
  bytes(value) {
    this.uint32(value.byteLength);
    return this.raw(value);
  }
  /**
   * Write a `string` value, length-delimited data converted to UTF-8 text.
   */
  string(value) {
    let chunk = this.encodeUtf8(value);
    this.uint32(chunk.byteLength);
    return this.raw(chunk);
  }
  /**
   * Write a `float` value, 32-bit floating point number.
   */
  float(value) {
    assertFloat32(value);
    let chunk = new Uint8Array(4);
    new DataView(chunk.buffer).setFloat32(0, value, true);
    return this.raw(chunk);
  }
  /**
   * Write a `double` value, a 64-bit floating point number.
   */
  double(value) {
    let chunk = new Uint8Array(8);
    new DataView(chunk.buffer).setFloat64(0, value, true);
    return this.raw(chunk);
  }
  /**
   * Write a `fixed32` value, an unsigned, fixed-length 32-bit integer.
   */
  fixed32(value) {
    assertUInt32(value);
    let chunk = new Uint8Array(4);
    new DataView(chunk.buffer).setUint32(0, value, true);
    return this.raw(chunk);
  }
  /**
   * Write a `sfixed32` value, a signed, fixed-length 32-bit integer.
   */
  sfixed32(value) {
    assertInt32(value);
    let chunk = new Uint8Array(4);
    new DataView(chunk.buffer).setInt32(0, value, true);
    return this.raw(chunk);
  }
  /**
   * Write a `sint32` value, a signed, zigzag-encoded 32-bit varint.
   */
  sint32(value) {
    assertInt32(value);
    value = (value << 1 ^ value >> 31) >>> 0;
    varint32write(value, this.buf);
    return this;
  }
  /**
   * Write a `fixed64` value, a signed, fixed-length 64-bit integer.
   */
  sfixed64(value) {
    let chunk = new Uint8Array(8), view = new DataView(chunk.buffer), tc = protoInt64.enc(value);
    view.setInt32(0, tc.lo, true);
    view.setInt32(4, tc.hi, true);
    return this.raw(chunk);
  }
  /**
   * Write a `fixed64` value, an unsigned, fixed-length 64 bit integer.
   */
  fixed64(value) {
    let chunk = new Uint8Array(8), view = new DataView(chunk.buffer), tc = protoInt64.uEnc(value);
    view.setInt32(0, tc.lo, true);
    view.setInt32(4, tc.hi, true);
    return this.raw(chunk);
  }
  /**
   * Write a `int64` value, a signed 64-bit varint.
   */
  int64(value) {
    let tc = protoInt64.enc(value);
    varint64write(tc.lo, tc.hi, this.buf);
    return this;
  }
  /**
   * Write a `sint64` value, a signed, zig-zag-encoded 64-bit varint.
   */
  sint64(value) {
    let tc = protoInt64.enc(value), sign = tc.hi >> 31, lo = tc.lo << 1 ^ sign, hi = (tc.hi << 1 | tc.lo >>> 31) ^ sign;
    varint64write(lo, hi, this.buf);
    return this;
  }
  /**
   * Write a `uint64` value, an unsigned 64-bit varint.
   */
  uint64(value) {
    let tc = protoInt64.uEnc(value);
    varint64write(tc.lo, tc.hi, this.buf);
    return this;
  }
};
var BinaryReader = class {
  constructor(buf, decodeUtf8 = getTextEncoding().decodeUtf8) {
    this.decodeUtf8 = decodeUtf8;
    this.varint64 = varint64read;
    this.uint32 = varint32read;
    this.buf = buf;
    this.len = buf.length;
    this.pos = 0;
    this.view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
  }
  /**
   * Reads a tag - field number and wire type.
   */
  tag() {
    let tag = this.uint32(), fieldNo = tag >>> 3, wireType = tag & 7;
    if (fieldNo <= 0 || wireType < 0 || wireType > 5)
      throw new Error("illegal tag: field no " + fieldNo + " wire type " + wireType);
    return [fieldNo, wireType];
  }
  /**
   * Skip one element and return the skipped data.
   *
   * When skipping StartGroup, provide the tags field number to check for
   * matching field number in the EndGroup tag.
   */
  skip(wireType, fieldNo) {
    let start = this.pos;
    switch (wireType) {
      case WireType.Varint:
        while (this.buf[this.pos++] & 128) {
        }
        break;
      // eslint-disable-next-line
      // @ts-expect-error TS7029: Fallthrough case in switch
      case WireType.Bit64:
        this.pos += 4;
      // eslint-disable-next-line no-fallthrough
      case WireType.Bit32:
        this.pos += 4;
        break;
      case WireType.LengthDelimited:
        let len = this.uint32();
        this.pos += len;
        break;
      case WireType.StartGroup:
        for (; ; ) {
          const [fn, wt] = this.tag();
          if (wt === WireType.EndGroup) {
            if (fieldNo !== void 0 && fn !== fieldNo) {
              throw new Error("invalid end group tag");
            }
            break;
          }
          this.skip(wt, fn);
        }
        break;
      default:
        throw new Error("cant skip wire type " + wireType);
    }
    this.assertBounds();
    return this.buf.subarray(start, this.pos);
  }
  /**
   * Throws error if position in byte array is out of range.
   */
  assertBounds() {
    if (this.pos > this.len)
      throw new RangeError("premature EOF");
  }
  /**
   * Read a `int32` field, a signed 32 bit varint.
   */
  int32() {
    return this.uint32() | 0;
  }
  /**
   * Read a `sint32` field, a signed, zigzag-encoded 32-bit varint.
   */
  sint32() {
    let zze = this.uint32();
    return zze >>> 1 ^ -(zze & 1);
  }
  /**
   * Read a `int64` field, a signed 64-bit varint.
   */
  int64() {
    return protoInt64.dec(...this.varint64());
  }
  /**
   * Read a `uint64` field, an unsigned 64-bit varint.
   */
  uint64() {
    return protoInt64.uDec(...this.varint64());
  }
  /**
   * Read a `sint64` field, a signed, zig-zag-encoded 64-bit varint.
   */
  sint64() {
    let [lo, hi] = this.varint64();
    let s = -(lo & 1);
    lo = (lo >>> 1 | (hi & 1) << 31) ^ s;
    hi = hi >>> 1 ^ s;
    return protoInt64.dec(lo, hi);
  }
  /**
   * Read a `bool` field, a variant.
   */
  bool() {
    let [lo, hi] = this.varint64();
    return lo !== 0 || hi !== 0;
  }
  /**
   * Read a `fixed32` field, an unsigned, fixed-length 32-bit integer.
   */
  fixed32() {
    return this.view.getUint32((this.pos += 4) - 4, true);
  }
  /**
   * Read a `sfixed32` field, a signed, fixed-length 32-bit integer.
   */
  sfixed32() {
    return this.view.getInt32((this.pos += 4) - 4, true);
  }
  /**
   * Read a `fixed64` field, an unsigned, fixed-length 64 bit integer.
   */
  fixed64() {
    return protoInt64.uDec(this.sfixed32(), this.sfixed32());
  }
  /**
   * Read a `fixed64` field, a signed, fixed-length 64-bit integer.
   */
  sfixed64() {
    return protoInt64.dec(this.sfixed32(), this.sfixed32());
  }
  /**
   * Read a `float` field, 32-bit floating point number.
   */
  float() {
    return this.view.getFloat32((this.pos += 4) - 4, true);
  }
  /**
   * Read a `double` field, a 64-bit floating point number.
   */
  double() {
    return this.view.getFloat64((this.pos += 8) - 8, true);
  }
  /**
   * Read a `bytes` field, length-delimited arbitrary data.
   */
  bytes() {
    let len = this.uint32(), start = this.pos;
    this.pos += len;
    this.assertBounds();
    return this.buf.subarray(start, start + len);
  }
  /**
   * Read a `string` field, length-delimited data converted to UTF-8 text.
   */
  string() {
    return this.decodeUtf8(this.bytes());
  }
};
function assertInt32(arg) {
  if (typeof arg == "string") {
    arg = Number(arg);
  } else if (typeof arg != "number") {
    throw new Error("invalid int32: " + typeof arg);
  }
  if (!Number.isInteger(arg) || arg > INT32_MAX || arg < INT32_MIN)
    throw new Error("invalid int32: " + arg);
}
function assertUInt32(arg) {
  if (typeof arg == "string") {
    arg = Number(arg);
  } else if (typeof arg != "number") {
    throw new Error("invalid uint32: " + typeof arg);
  }
  if (!Number.isInteger(arg) || arg > UINT32_MAX || arg < 0)
    throw new Error("invalid uint32: " + arg);
}
function assertFloat32(arg) {
  if (typeof arg == "string") {
    const o = arg;
    arg = Number(arg);
    if (isNaN(arg) && o !== "NaN") {
      throw new Error("invalid float32: " + o);
    }
  } else if (typeof arg != "number") {
    throw new Error("invalid float32: " + typeof arg);
  }
  if (Number.isFinite(arg) && (arg > FLOAT32_MAX || arg < FLOAT32_MIN))
    throw new Error("invalid float32: " + arg);
}

// node_modules/.pnpm/@bufbuild+protobuf@2.2.3/node_modules/@bufbuild/protobuf/dist/esm/reflect/reflect-check.js
function checkField(field, value) {
  const check = field.fieldKind == "list" ? isReflectList(value, field) : field.fieldKind == "map" ? isReflectMap(value, field) : checkSingular(field, value);
  if (check === true) {
    return void 0;
  }
  let reason;
  switch (field.fieldKind) {
    case "list":
      reason = `expected ${formatReflectList(field)}, got ${formatVal(value)}`;
      break;
    case "map":
      reason = `expected ${formatReflectMap(field)}, got ${formatVal(value)}`;
      break;
    default: {
      reason = reasonSingular(field, value, check);
    }
  }
  return new FieldError(field, reason);
}
function checkListItem(field, index, value) {
  const check = checkSingular(field, value);
  if (check !== true) {
    return new FieldError(field, `list item #${index + 1}: ${reasonSingular(field, value, check)}`);
  }
  return void 0;
}
function checkMapEntry(field, key, value) {
  const checkKey = checkScalarValue(key, field.mapKey);
  if (checkKey !== true) {
    return new FieldError(field, `invalid map key: ${reasonSingular({ scalar: field.mapKey }, key, checkKey)}`);
  }
  const checkVal = checkSingular(field, value);
  if (checkVal !== true) {
    return new FieldError(field, `map entry ${formatVal(key)}: ${reasonSingular(field, value, checkVal)}`);
  }
  return void 0;
}
function checkSingular(field, value) {
  if (field.scalar !== void 0) {
    return checkScalarValue(value, field.scalar);
  }
  if (field.enum !== void 0) {
    if (field.enum.open) {
      return Number.isInteger(value);
    }
    return field.enum.values.some((v) => v.number === value);
  }
  return isReflectMessage(value, field.message);
}
function checkScalarValue(value, scalar) {
  switch (scalar) {
    case ScalarType.DOUBLE:
      return typeof value == "number";
    case ScalarType.FLOAT:
      if (typeof value != "number") {
        return false;
      }
      if (Number.isNaN(value) || !Number.isFinite(value)) {
        return true;
      }
      if (value > FLOAT32_MAX || value < FLOAT32_MIN) {
        return `${value.toFixed()} out of range`;
      }
      return true;
    case ScalarType.INT32:
    case ScalarType.SFIXED32:
    case ScalarType.SINT32:
      if (typeof value !== "number" || !Number.isInteger(value)) {
        return false;
      }
      if (value > INT32_MAX || value < INT32_MIN) {
        return `${value.toFixed()} out of range`;
      }
      return true;
    case ScalarType.FIXED32:
    case ScalarType.UINT32:
      if (typeof value !== "number" || !Number.isInteger(value)) {
        return false;
      }
      if (value > UINT32_MAX || value < 0) {
        return `${value.toFixed()} out of range`;
      }
      return true;
    case ScalarType.BOOL:
      return typeof value == "boolean";
    case ScalarType.STRING:
      if (typeof value != "string") {
        return false;
      }
      return getTextEncoding().checkUtf8(value) || "invalid UTF8";
    case ScalarType.BYTES:
      return value instanceof Uint8Array;
    case ScalarType.INT64:
    case ScalarType.SFIXED64:
    case ScalarType.SINT64:
      if (typeof value != "string" && typeof value !== "bigint" && typeof value !== "number") {
        return false;
      }
      try {
        protoInt64.parse(value);
      } catch (e) {
        return `${value} out of range`;
      }
      return true;
    case ScalarType.FIXED64:
    case ScalarType.UINT64:
      if (typeof value != "string" && typeof value !== "bigint" && typeof value !== "number") {
        return false;
      }
      try {
        protoInt64.uParse(value);
      } catch (e) {
        return `${value} out of range`;
      }
      return true;
  }
}
function reasonSingular(field, val, details) {
  details = typeof details == "string" ? `: ${details}` : `, got ${formatVal(val)}`;
  if (field.scalar !== void 0) {
    return `expected ${scalarTypeDescription(field.scalar)}` + details;
  } else if (field.enum !== void 0) {
    return `expected ${field.enum.toString()}` + details;
  }
  return `expected ${formatReflectMessage(field.message)}` + details;
}
function formatVal(val) {
  switch (typeof val) {
    case "object":
      if (val === null) {
        return "null";
      }
      if (val instanceof Uint8Array) {
        return `Uint8Array(${val.length})`;
      }
      if (Array.isArray(val)) {
        return `Array(${val.length})`;
      }
      if (isReflectList(val)) {
        return formatReflectList(val.field());
      }
      if (isReflectMap(val)) {
        return formatReflectMap(val.field());
      }
      if (isReflectMessage(val)) {
        return formatReflectMessage(val.desc);
      }
      if (isMessage(val)) {
        return `message ${val.$typeName}`;
      }
      return "object";
    case "string":
      return val.length > 30 ? "string" : `"${val.split('"').join('\\"')}"`;
    case "boolean":
      return String(val);
    case "number":
      return String(val);
    case "bigint":
      return String(val) + "n";
    default:
      return typeof val;
  }
}
function formatReflectMessage(desc) {
  return `ReflectMessage (${desc.typeName})`;
}
function formatReflectList(field) {
  switch (field.listKind) {
    case "message":
      return `ReflectList (${field.message.toString()})`;
    case "enum":
      return `ReflectList (${field.enum.toString()})`;
    case "scalar":
      return `ReflectList (${ScalarType[field.scalar]})`;
  }
}
function formatReflectMap(field) {
  switch (field.mapKind) {
    case "message":
      return `ReflectMap (${ScalarType[field.mapKey]}, ${field.message.toString()})`;
    case "enum":
      return `ReflectMap (${ScalarType[field.mapKey]}, ${field.enum.toString()})`;
    case "scalar":
      return `ReflectMap (${ScalarType[field.mapKey]}, ${ScalarType[field.scalar]})`;
  }
}
function scalarTypeDescription(scalar) {
  switch (scalar) {
    case ScalarType.STRING:
      return "string";
    case ScalarType.BOOL:
      return "boolean";
    case ScalarType.INT64:
    case ScalarType.SINT64:
    case ScalarType.SFIXED64:
      return "bigint (int64)";
    case ScalarType.UINT64:
    case ScalarType.FIXED64:
      return "bigint (uint64)";
    case ScalarType.BYTES:
      return "Uint8Array";
    case ScalarType.DOUBLE:
      return "number (float64)";
    case ScalarType.FLOAT:
      return "number (float32)";
    case ScalarType.FIXED32:
    case ScalarType.UINT32:
      return "number (uint32)";
    case ScalarType.INT32:
    case ScalarType.SFIXED32:
    case ScalarType.SINT32:
      return "number (int32)";
  }
}

// node_modules/.pnpm/@bufbuild+protobuf@2.2.3/node_modules/@bufbuild/protobuf/dist/esm/reflect/reflect.js
function reflect(messageDesc2, message2, check = true) {
  return new ReflectMessageImpl(messageDesc2, message2, check);
}
var ReflectMessageImpl = class {
  get sortedFields() {
    var _a;
    return (_a = this._sortedFields) !== null && _a !== void 0 ? _a : this._sortedFields = this.desc.fields.concat().sort((a, b) => a.number - b.number);
  }
  constructor(messageDesc2, message2, check = true) {
    this.lists = /* @__PURE__ */ new Map();
    this.maps = /* @__PURE__ */ new Map();
    this.check = check;
    this.desc = messageDesc2;
    this.message = this[unsafeLocal] = message2 !== null && message2 !== void 0 ? message2 : create(messageDesc2);
    this.fields = messageDesc2.fields;
    this.oneofs = messageDesc2.oneofs;
    this.members = messageDesc2.members;
  }
  findNumber(number) {
    if (!this._fieldsByNumber) {
      this._fieldsByNumber = new Map(this.desc.fields.map((f) => [f.number, f]));
    }
    return this._fieldsByNumber.get(number);
  }
  oneofCase(oneof) {
    assertOwn(this.message, oneof);
    return unsafeOneofCase(this.message, oneof);
  }
  isSet(field) {
    assertOwn(this.message, field);
    return unsafeIsSet(this.message, field);
  }
  clear(field) {
    assertOwn(this.message, field);
    unsafeClear(this.message, field);
  }
  get(field) {
    assertOwn(this.message, field);
    const value = unsafeGet(this.message, field);
    switch (field.fieldKind) {
      case "list":
        let list = this.lists.get(field);
        if (!list || list[unsafeLocal] !== value) {
          this.lists.set(field, list = new ReflectListImpl(field, value, this.check));
        }
        return list;
      case "map":
        let map = this.maps.get(field);
        if (!map || map[unsafeLocal] !== value) {
          this.maps.set(field, map = new ReflectMapImpl(field, value, this.check));
        }
        return map;
      case "message":
        return messageToReflect(field, value, this.check);
      case "scalar":
        return value === void 0 ? scalarZeroValue(field.scalar, false) : longToReflect(field, value);
      case "enum":
        return value !== null && value !== void 0 ? value : field.enum.values[0].number;
    }
  }
  set(field, value) {
    assertOwn(this.message, field);
    if (this.check) {
      const err = checkField(field, value);
      if (err) {
        throw err;
      }
    }
    let local;
    if (field.fieldKind == "message") {
      local = messageToLocal(field, value);
    } else if (isReflectMap(value) || isReflectList(value)) {
      local = value[unsafeLocal];
    } else {
      local = longToLocal(field, value);
    }
    unsafeSet(this.message, field, local);
  }
  getUnknown() {
    return this.message.$unknown;
  }
  setUnknown(value) {
    this.message.$unknown = value;
  }
};
function assertOwn(owner, member) {
  if (member.parent.typeName !== owner.$typeName) {
    throw new FieldError(member, `cannot use ${member.toString()} with message ${owner.$typeName}`, "ForeignFieldError");
  }
}
var ReflectListImpl = class {
  field() {
    return this._field;
  }
  get size() {
    return this._arr.length;
  }
  constructor(field, unsafeInput, check) {
    this._field = field;
    this._arr = this[unsafeLocal] = unsafeInput;
    this.check = check;
  }
  get(index) {
    const item = this._arr[index];
    return item === void 0 ? void 0 : listItemToReflect(this._field, item, this.check);
  }
  set(index, item) {
    if (index < 0 || index >= this._arr.length) {
      throw new FieldError(this._field, `list item #${index + 1}: out of range`);
    }
    if (this.check) {
      const err = checkListItem(this._field, index, item);
      if (err) {
        throw err;
      }
    }
    this._arr[index] = listItemToLocal(this._field, item);
  }
  add(item) {
    if (this.check) {
      const err = checkListItem(this._field, this._arr.length, item);
      if (err) {
        throw err;
      }
    }
    this._arr.push(listItemToLocal(this._field, item));
    return void 0;
  }
  clear() {
    this._arr.splice(0, this._arr.length);
  }
  [Symbol.iterator]() {
    return this.values();
  }
  keys() {
    return this._arr.keys();
  }
  *values() {
    for (const item of this._arr) {
      yield listItemToReflect(this._field, item, this.check);
    }
  }
  *entries() {
    for (let i = 0; i < this._arr.length; i++) {
      yield [i, listItemToReflect(this._field, this._arr[i], this.check)];
    }
  }
};
var ReflectMapImpl = class {
  constructor(field, unsafeInput, check = true) {
    this.obj = this[unsafeLocal] = unsafeInput !== null && unsafeInput !== void 0 ? unsafeInput : {};
    this.check = check;
    this._field = field;
  }
  field() {
    return this._field;
  }
  set(key, value) {
    if (this.check) {
      const err = checkMapEntry(this._field, key, value);
      if (err) {
        throw err;
      }
    }
    this.obj[mapKeyToLocal(key)] = mapValueToLocal(this._field, value);
    return this;
  }
  delete(key) {
    const k = mapKeyToLocal(key);
    const has = Object.prototype.hasOwnProperty.call(this.obj, k);
    if (has) {
      delete this.obj[k];
    }
    return has;
  }
  clear() {
    for (const key of Object.keys(this.obj)) {
      delete this.obj[key];
    }
  }
  get(key) {
    let val = this.obj[mapKeyToLocal(key)];
    if (val !== void 0) {
      val = mapValueToReflect(this._field, val, this.check);
    }
    return val;
  }
  has(key) {
    return Object.prototype.hasOwnProperty.call(this.obj, mapKeyToLocal(key));
  }
  *keys() {
    for (const objKey of Object.keys(this.obj)) {
      yield mapKeyToReflect(objKey, this._field.mapKey);
    }
  }
  *entries() {
    for (const objEntry of Object.entries(this.obj)) {
      yield [
        mapKeyToReflect(objEntry[0], this._field.mapKey),
        mapValueToReflect(this._field, objEntry[1], this.check)
      ];
    }
  }
  [Symbol.iterator]() {
    return this.entries();
  }
  get size() {
    return Object.keys(this.obj).length;
  }
  *values() {
    for (const val of Object.values(this.obj)) {
      yield mapValueToReflect(this._field, val, this.check);
    }
  }
  forEach(callbackfn, thisArg) {
    for (const mapEntry of this.entries()) {
      callbackfn.call(thisArg, mapEntry[1], mapEntry[0], this);
    }
  }
};
function messageToLocal(field, value) {
  if (!isReflectMessage(value)) {
    return value;
  }
  if (isWrapper(value.message) && !field.oneof && field.fieldKind == "message") {
    return value.message.value;
  }
  if (value.desc.typeName == "google.protobuf.Struct" && field.parent.typeName != "google.protobuf.Value") {
    return wktStructToLocal(value.message);
  }
  return value.message;
}
function messageToReflect(field, value, check) {
  if (value !== void 0) {
    if (isWrapperDesc(field.message) && !field.oneof && field.fieldKind == "message") {
      value = {
        $typeName: field.message.typeName,
        value: longToReflect(field.message.fields[0], value)
      };
    } else if (field.message.typeName == "google.protobuf.Struct" && field.parent.typeName != "google.protobuf.Value" && isObject(value)) {
      value = wktStructToReflect(value);
    }
  }
  return new ReflectMessageImpl(field.message, value, check);
}
function listItemToLocal(field, value) {
  if (field.listKind == "message") {
    return messageToLocal(field, value);
  }
  return longToLocal(field, value);
}
function listItemToReflect(field, value, check) {
  if (field.listKind == "message") {
    return messageToReflect(field, value, check);
  }
  return longToReflect(field, value);
}
function mapValueToLocal(field, value) {
  if (field.mapKind == "message") {
    return messageToLocal(field, value);
  }
  return longToLocal(field, value);
}
function mapValueToReflect(field, value, check) {
  if (field.mapKind == "message") {
    return messageToReflect(field, value, check);
  }
  return value;
}
function mapKeyToLocal(key) {
  return typeof key == "string" || typeof key == "number" ? key : String(key);
}
function mapKeyToReflect(key, type) {
  switch (type) {
    case ScalarType.STRING:
      return key;
    case ScalarType.INT32:
    case ScalarType.FIXED32:
    case ScalarType.UINT32:
    case ScalarType.SFIXED32:
    case ScalarType.SINT32: {
      const n = Number.parseInt(key);
      if (Number.isFinite(n)) {
        return n;
      }
      break;
    }
    case ScalarType.BOOL:
      switch (key) {
        case "true":
          return true;
        case "false":
          return false;
      }
      break;
    case ScalarType.UINT64:
    case ScalarType.FIXED64:
      try {
        return protoInt64.uParse(key);
      } catch (_a) {
      }
      break;
    default:
      try {
        return protoInt64.parse(key);
      } catch (_b) {
      }
      break;
  }
  return key;
}
function longToReflect(field, value) {
  switch (field.scalar) {
    case ScalarType.INT64:
    case ScalarType.SFIXED64:
    case ScalarType.SINT64:
      if ("longAsString" in field && field.longAsString && typeof value == "string") {
        value = protoInt64.parse(value);
      }
      break;
    case ScalarType.FIXED64:
    case ScalarType.UINT64:
      if ("longAsString" in field && field.longAsString && typeof value == "string") {
        value = protoInt64.uParse(value);
      }
      break;
  }
  return value;
}
function longToLocal(field, value) {
  switch (field.scalar) {
    case ScalarType.INT64:
    case ScalarType.SFIXED64:
    case ScalarType.SINT64:
      if ("longAsString" in field && field.longAsString) {
        value = String(value);
      } else if (typeof value == "string" || typeof value == "number") {
        value = protoInt64.parse(value);
      }
      break;
    case ScalarType.FIXED64:
    case ScalarType.UINT64:
      if ("longAsString" in field && field.longAsString) {
        value = String(value);
      } else if (typeof value == "string" || typeof value == "number") {
        value = protoInt64.uParse(value);
      }
      break;
  }
  return value;
}
function wktStructToReflect(json) {
  const struct = {
    $typeName: "google.protobuf.Struct",
    fields: {}
  };
  if (isObject(json)) {
    for (const [k, v] of Object.entries(json)) {
      struct.fields[k] = wktValueToReflect(v);
    }
  }
  return struct;
}
function wktStructToLocal(val) {
  const json = {};
  for (const [k, v] of Object.entries(val.fields)) {
    json[k] = wktValueToLocal(v);
  }
  return json;
}
function wktValueToLocal(val) {
  switch (val.kind.case) {
    case "structValue":
      return wktStructToLocal(val.kind.value);
    case "listValue":
      return val.kind.value.values.map(wktValueToLocal);
    case "nullValue":
    case void 0:
      return null;
    default:
      return val.kind.value;
  }
}
function wktValueToReflect(json) {
  const value = {
    $typeName: "google.protobuf.Value",
    kind: { case: void 0 }
  };
  switch (typeof json) {
    case "number":
      value.kind = { case: "numberValue", value: json };
      break;
    case "string":
      value.kind = { case: "stringValue", value: json };
      break;
    case "boolean":
      value.kind = { case: "boolValue", value: json };
      break;
    case "object":
      if (json === null) {
        const nullValue = 0;
        value.kind = { case: "nullValue", value: nullValue };
      } else if (Array.isArray(json)) {
        const listValue = {
          $typeName: "google.protobuf.ListValue",
          values: []
        };
        if (Array.isArray(json)) {
          for (const e of json) {
            listValue.values.push(wktValueToReflect(e));
          }
        }
        value.kind = {
          case: "listValue",
          value: listValue
        };
      } else {
        value.kind = {
          case: "structValue",
          value: wktStructToReflect(json)
        };
      }
      break;
  }
  return value;
}

// node_modules/.pnpm/@bufbuild+protobuf@2.2.3/node_modules/@bufbuild/protobuf/dist/esm/wire/base64-encoding.js
function base64Decode(base64Str) {
  const table = getDecodeTable();
  let es = base64Str.length * 3 / 4;
  if (base64Str[base64Str.length - 2] == "=")
    es -= 2;
  else if (base64Str[base64Str.length - 1] == "=")
    es -= 1;
  let bytes = new Uint8Array(es), bytePos = 0, groupPos = 0, b, p = 0;
  for (let i = 0; i < base64Str.length; i++) {
    b = table[base64Str.charCodeAt(i)];
    if (b === void 0) {
      switch (base64Str[i]) {
        // @ts-expect-error TS7029: Fallthrough case in switch
        case "=":
          groupPos = 0;
        // reset state when padding found
        // eslint-disable-next-line no-fallthrough
        case "\n":
        case "\r":
        case "	":
        case " ":
          continue;
        // skip white-space, and padding
        default:
          throw Error("invalid base64 string");
      }
    }
    switch (groupPos) {
      case 0:
        p = b;
        groupPos = 1;
        break;
      case 1:
        bytes[bytePos++] = p << 2 | (b & 48) >> 4;
        p = b;
        groupPos = 2;
        break;
      case 2:
        bytes[bytePos++] = (p & 15) << 4 | (b & 60) >> 2;
        p = b;
        groupPos = 3;
        break;
      case 3:
        bytes[bytePos++] = (p & 3) << 6 | b;
        groupPos = 0;
        break;
    }
  }
  if (groupPos == 1)
    throw Error("invalid base64 string");
  return bytes.subarray(0, bytePos);
}
function base64Encode(bytes, encoding = "std") {
  const table = getEncodeTable(encoding);
  const pad = encoding == "std";
  let base64 = "", groupPos = 0, b, p = 0;
  for (let i = 0; i < bytes.length; i++) {
    b = bytes[i];
    switch (groupPos) {
      case 0:
        base64 += table[b >> 2];
        p = (b & 3) << 4;
        groupPos = 1;
        break;
      case 1:
        base64 += table[p | b >> 4];
        p = (b & 15) << 2;
        groupPos = 2;
        break;
      case 2:
        base64 += table[p | b >> 6];
        base64 += table[b & 63];
        groupPos = 0;
        break;
    }
  }
  if (groupPos) {
    base64 += table[p];
    if (pad) {
      base64 += "=";
      if (groupPos == 1)
        base64 += "=";
    }
  }
  return base64;
}
var encodeTableStd;
var encodeTableUrl;
var decodeTable;
function getEncodeTable(encoding) {
  if (!encodeTableStd) {
    encodeTableStd = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
    encodeTableUrl = encodeTableStd.slice(0, -2).concat("-", "_");
  }
  return encoding == "url" ? encodeTableUrl : encodeTableStd;
}
function getDecodeTable() {
  if (!decodeTable) {
    decodeTable = [];
    const encodeTable = getEncodeTable("std");
    for (let i = 0; i < encodeTable.length; i++)
      decodeTable[encodeTable[i].charCodeAt(0)] = i;
    decodeTable["-".charCodeAt(0)] = encodeTable.indexOf("+");
    decodeTable["_".charCodeAt(0)] = encodeTable.indexOf("/");
  }
  return decodeTable;
}

// node_modules/.pnpm/@bufbuild+protobuf@2.2.3/node_modules/@bufbuild/protobuf/dist/esm/reflect/names.js
function protoCamelCase(snakeCase) {
  let capNext = false;
  const b = [];
  for (let i = 0; i < snakeCase.length; i++) {
    let c = snakeCase.charAt(i);
    switch (c) {
      case "_":
        capNext = true;
        break;
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        b.push(c);
        capNext = false;
        break;
      default:
        if (capNext) {
          capNext = false;
          c = c.toUpperCase();
        }
        b.push(c);
        break;
    }
  }
  return b.join("");
}
var reservedObjectProperties = /* @__PURE__ */ new Set([
  // names reserved by JavaScript
  "constructor",
  "toString",
  "toJSON",
  "valueOf"
]);
function safeObjectProperty(name) {
  return reservedObjectProperties.has(name) ? name + "$" : name;
}

// node_modules/.pnpm/@bufbuild+protobuf@2.2.3/node_modules/@bufbuild/protobuf/dist/esm/codegenv1/restore-json-names.js
function restoreJsonNames(message2) {
  for (const f of message2.field) {
    if (!unsafeIsSetExplicit(f, "jsonName")) {
      f.jsonName = protoCamelCase(f.name);
    }
  }
  message2.nestedType.forEach(restoreJsonNames);
}

// node_modules/.pnpm/@bufbuild+protobuf@2.2.3/node_modules/@bufbuild/protobuf/dist/esm/wire/text-format.js
function parseTextFormatEnumValue(descEnum, value) {
  const enumValue = descEnum.values.find((v) => v.name === value);
  if (!enumValue) {
    throw new Error(`cannot parse ${descEnum} default value: ${value}`);
  }
  return enumValue.number;
}
function parseTextFormatScalarValue(type, value) {
  switch (type) {
    case ScalarType.STRING:
      return value;
    case ScalarType.BYTES: {
      const u = unescapeBytesDefaultValue(value);
      if (u === false) {
        throw new Error(`cannot parse ${ScalarType[type]} default value: ${value}`);
      }
      return u;
    }
    case ScalarType.INT64:
    case ScalarType.SFIXED64:
    case ScalarType.SINT64:
      return protoInt64.parse(value);
    case ScalarType.UINT64:
    case ScalarType.FIXED64:
      return protoInt64.uParse(value);
    case ScalarType.DOUBLE:
    case ScalarType.FLOAT:
      switch (value) {
        case "inf":
          return Number.POSITIVE_INFINITY;
        case "-inf":
          return Number.NEGATIVE_INFINITY;
        case "nan":
          return Number.NaN;
        default:
          return parseFloat(value);
      }
    case ScalarType.BOOL:
      return value === "true";
    case ScalarType.INT32:
    case ScalarType.UINT32:
    case ScalarType.SINT32:
    case ScalarType.FIXED32:
    case ScalarType.SFIXED32:
      return parseInt(value, 10);
  }
}
function unescapeBytesDefaultValue(str) {
  const b = [];
  const input = {
    tail: str,
    c: "",
    next() {
      if (this.tail.length == 0) {
        return false;
      }
      this.c = this.tail[0];
      this.tail = this.tail.substring(1);
      return true;
    },
    take(n) {
      if (this.tail.length >= n) {
        const r = this.tail.substring(0, n);
        this.tail = this.tail.substring(n);
        return r;
      }
      return false;
    }
  };
  while (input.next()) {
    switch (input.c) {
      case "\\":
        if (input.next()) {
          switch (input.c) {
            case "\\":
              b.push(input.c.charCodeAt(0));
              break;
            case "b":
              b.push(8);
              break;
            case "f":
              b.push(12);
              break;
            case "n":
              b.push(10);
              break;
            case "r":
              b.push(13);
              break;
            case "t":
              b.push(9);
              break;
            case "v":
              b.push(11);
              break;
            case "0":
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7": {
              const s = input.c;
              const t = input.take(2);
              if (t === false) {
                return false;
              }
              const n = parseInt(s + t, 8);
              if (isNaN(n)) {
                return false;
              }
              b.push(n);
              break;
            }
            case "x": {
              const s = input.c;
              const t = input.take(2);
              if (t === false) {
                return false;
              }
              const n = parseInt(s + t, 16);
              if (isNaN(n)) {
                return false;
              }
              b.push(n);
              break;
            }
            case "u": {
              const s = input.c;
              const t = input.take(4);
              if (t === false) {
                return false;
              }
              const n = parseInt(s + t, 16);
              if (isNaN(n)) {
                return false;
              }
              const chunk = new Uint8Array(4);
              const view = new DataView(chunk.buffer);
              view.setInt32(0, n, true);
              b.push(chunk[0], chunk[1], chunk[2], chunk[3]);
              break;
            }
            case "U": {
              const s = input.c;
              const t = input.take(8);
              if (t === false) {
                return false;
              }
              const tc = protoInt64.uEnc(s + t);
              const chunk = new Uint8Array(8);
              const view = new DataView(chunk.buffer);
              view.setInt32(0, tc.lo, true);
              view.setInt32(4, tc.hi, true);
              b.push(chunk[0], chunk[1], chunk[2], chunk[3], chunk[4], chunk[5], chunk[6], chunk[7]);
              break;
            }
          }
        }
        break;
      default:
        b.push(input.c.charCodeAt(0));
    }
  }
  return new Uint8Array(b);
}

// node_modules/.pnpm/@bufbuild+protobuf@2.2.3/node_modules/@bufbuild/protobuf/dist/esm/reflect/nested-types.js
function* nestedTypes(desc) {
  switch (desc.kind) {
    case "file":
      for (const message2 of desc.messages) {
        yield message2;
        yield* nestedTypes(message2);
      }
      yield* desc.enums;
      yield* desc.services;
      yield* desc.extensions;
      break;
    case "message":
      for (const message2 of desc.nestedMessages) {
        yield message2;
        yield* nestedTypes(message2);
      }
      yield* desc.nestedEnums;
      yield* desc.nestedExtensions;
      break;
  }
}

// node_modules/.pnpm/@bufbuild+protobuf@2.2.3/node_modules/@bufbuild/protobuf/dist/esm/registry.js
function createFileRegistry(...args) {
  const registry = createBaseRegistry();
  if (!args.length) {
    return registry;
  }
  if ("$typeName" in args[0] && args[0].$typeName == "google.protobuf.FileDescriptorSet") {
    for (const file of args[0].file) {
      addFile(file, registry);
    }
    return registry;
  }
  if ("$typeName" in args[0]) {
    let recurseDeps = function(file) {
      const deps = [];
      for (const protoFileName of file.dependency) {
        if (registry.getFile(protoFileName) != void 0) {
          continue;
        }
        if (seen.has(protoFileName)) {
          continue;
        }
        const dep = resolve2(protoFileName);
        if (!dep) {
          throw new Error(`Unable to resolve ${protoFileName}, imported by ${file.name}`);
        }
        if ("kind" in dep) {
          registry.addFile(dep, false, true);
        } else {
          seen.add(dep.name);
          deps.push(dep);
        }
      }
      return deps.concat(...deps.map(recurseDeps));
    };
    const input = args[0];
    const resolve2 = args[1];
    const seen = /* @__PURE__ */ new Set();
    for (const file of [input, ...recurseDeps(input)].reverse()) {
      addFile(file, registry);
    }
  } else {
    for (const fileReg of args) {
      for (const file of fileReg.files) {
        registry.addFile(file);
      }
    }
  }
  return registry;
}
function createBaseRegistry() {
  const types = /* @__PURE__ */ new Map();
  const extendees = /* @__PURE__ */ new Map();
  const files = /* @__PURE__ */ new Map();
  return {
    kind: "registry",
    types,
    extendees,
    [Symbol.iterator]() {
      return types.values();
    },
    get files() {
      return files.values();
    },
    addFile(file, skipTypes, withDeps) {
      files.set(file.proto.name, file);
      if (!skipTypes) {
        for (const type of nestedTypes(file)) {
          this.add(type);
        }
      }
      if (withDeps) {
        for (const f of file.dependencies) {
          this.addFile(f, skipTypes, withDeps);
        }
      }
    },
    add(desc) {
      if (desc.kind == "extension") {
        let numberToExt = extendees.get(desc.extendee.typeName);
        if (!numberToExt) {
          extendees.set(desc.extendee.typeName, numberToExt = /* @__PURE__ */ new Map());
        }
        numberToExt.set(desc.number, desc);
      }
      types.set(desc.typeName, desc);
    },
    get(typeName) {
      return types.get(typeName);
    },
    getFile(fileName) {
      return files.get(fileName);
    },
    getMessage(typeName) {
      const t = types.get(typeName);
      return (t === null || t === void 0 ? void 0 : t.kind) == "message" ? t : void 0;
    },
    getEnum(typeName) {
      const t = types.get(typeName);
      return (t === null || t === void 0 ? void 0 : t.kind) == "enum" ? t : void 0;
    },
    getExtension(typeName) {
      const t = types.get(typeName);
      return (t === null || t === void 0 ? void 0 : t.kind) == "extension" ? t : void 0;
    },
    getExtensionFor(extendee, no) {
      var _a;
      return (_a = extendees.get(extendee.typeName)) === null || _a === void 0 ? void 0 : _a.get(no);
    },
    getService(typeName) {
      const t = types.get(typeName);
      return (t === null || t === void 0 ? void 0 : t.kind) == "service" ? t : void 0;
    }
  };
}
var EDITION_PROTO22 = 998;
var EDITION_PROTO32 = 999;
var TYPE_STRING = 9;
var TYPE_GROUP = 10;
var TYPE_MESSAGE = 11;
var TYPE_BYTES = 12;
var TYPE_ENUM = 14;
var LABEL_REPEATED = 3;
var LABEL_REQUIRED = 2;
var JS_STRING = 1;
var IDEMPOTENCY_UNKNOWN = 0;
var EXPLICIT = 1;
var IMPLICIT3 = 2;
var LEGACY_REQUIRED = 3;
var PACKED = 1;
var DELIMITED = 2;
var OPEN = 1;
var featureDefaults = {
  // EDITION_PROTO2
  998: {
    fieldPresence: 1,
    // EXPLICIT,
    enumType: 2,
    // CLOSED,
    repeatedFieldEncoding: 2,
    // EXPANDED,
    utf8Validation: 3,
    // NONE,
    messageEncoding: 1,
    // LENGTH_PREFIXED,
    jsonFormat: 2
    // LEGACY_BEST_EFFORT,
  },
  // EDITION_PROTO3
  999: {
    fieldPresence: 2,
    // IMPLICIT,
    enumType: 1,
    // OPEN,
    repeatedFieldEncoding: 1,
    // PACKED,
    utf8Validation: 2,
    // VERIFY,
    messageEncoding: 1,
    // LENGTH_PREFIXED,
    jsonFormat: 1
    // ALLOW,
  },
  // EDITION_2023
  1e3: {
    fieldPresence: 1,
    // EXPLICIT,
    enumType: 1,
    // OPEN,
    repeatedFieldEncoding: 1,
    // PACKED,
    utf8Validation: 2,
    // VERIFY,
    messageEncoding: 1,
    // LENGTH_PREFIXED,
    jsonFormat: 1
    // ALLOW,
  }
};
function addFile(proto, reg) {
  var _a, _b;
  const file = {
    kind: "file",
    proto,
    deprecated: (_b = (_a = proto.options) === null || _a === void 0 ? void 0 : _a.deprecated) !== null && _b !== void 0 ? _b : false,
    edition: getFileEdition(proto),
    name: proto.name.replace(/\.proto$/, ""),
    dependencies: findFileDependencies(proto, reg),
    enums: [],
    messages: [],
    extensions: [],
    services: [],
    toString() {
      return `file ${proto.name}`;
    }
  };
  const mapEntriesStore = /* @__PURE__ */ new Map();
  const mapEntries = {
    get(typeName) {
      return mapEntriesStore.get(typeName);
    },
    add(desc) {
      var _a2;
      assert(((_a2 = desc.proto.options) === null || _a2 === void 0 ? void 0 : _a2.mapEntry) === true);
      mapEntriesStore.set(desc.typeName, desc);
    }
  };
  for (const enumProto of proto.enumType) {
    addEnum(enumProto, file, void 0, reg);
  }
  for (const messageProto of proto.messageType) {
    addMessage(messageProto, file, void 0, reg, mapEntries);
  }
  for (const serviceProto of proto.service) {
    addService(serviceProto, file, reg);
  }
  addExtensions(file, reg);
  for (const mapEntry of mapEntriesStore.values()) {
    addFields(mapEntry, reg, mapEntries);
  }
  for (const message2 of file.messages) {
    addFields(message2, reg, mapEntries);
    addExtensions(message2, reg);
  }
  reg.addFile(file, true);
}
function addExtensions(desc, reg) {
  switch (desc.kind) {
    case "file":
      for (const proto of desc.proto.extension) {
        const ext = newField(proto, desc, reg);
        desc.extensions.push(ext);
        reg.add(ext);
      }
      break;
    case "message":
      for (const proto of desc.proto.extension) {
        const ext = newField(proto, desc, reg);
        desc.nestedExtensions.push(ext);
        reg.add(ext);
      }
      for (const message2 of desc.nestedMessages) {
        addExtensions(message2, reg);
      }
      break;
  }
}
function addFields(message2, reg, mapEntries) {
  const allOneofs = message2.proto.oneofDecl.map((proto) => newOneof(proto, message2));
  const oneofsSeen = /* @__PURE__ */ new Set();
  for (const proto of message2.proto.field) {
    const oneof = findOneof(proto, allOneofs);
    const field = newField(proto, message2, reg, oneof, mapEntries);
    message2.fields.push(field);
    message2.field[field.localName] = field;
    if (oneof === void 0) {
      message2.members.push(field);
    } else {
      oneof.fields.push(field);
      if (!oneofsSeen.has(oneof)) {
        oneofsSeen.add(oneof);
        message2.members.push(oneof);
      }
    }
  }
  for (const oneof of allOneofs.filter((o) => oneofsSeen.has(o))) {
    message2.oneofs.push(oneof);
  }
  for (const child of message2.nestedMessages) {
    addFields(child, reg, mapEntries);
  }
}
function addEnum(proto, file, parent, reg) {
  var _a, _b, _c;
  const sharedPrefix = findEnumSharedPrefix(proto.name, proto.value);
  const desc = {
    kind: "enum",
    proto,
    deprecated: (_b = (_a = proto.options) === null || _a === void 0 ? void 0 : _a.deprecated) !== null && _b !== void 0 ? _b : false,
    file,
    parent,
    open: true,
    name: proto.name,
    typeName: makeTypeName(proto, parent, file),
    value: {},
    values: [],
    sharedPrefix,
    toString() {
      return `enum ${this.typeName}`;
    }
  };
  desc.open = isEnumOpen(desc);
  reg.add(desc);
  proto.value.forEach((proto2) => {
    var _a2, _b2;
    const name = proto2.name;
    desc.values.push(desc.value[proto2.number] = {
      kind: "enum_value",
      proto: proto2,
      deprecated: (_b2 = (_a2 = proto2.options) === null || _a2 === void 0 ? void 0 : _a2.deprecated) !== null && _b2 !== void 0 ? _b2 : false,
      parent: desc,
      name,
      localName: safeObjectProperty(sharedPrefix == void 0 ? name : name.substring(sharedPrefix.length)),
      number: proto2.number,
      toString() {
        return `enum value ${desc.typeName}.${name}`;
      }
    });
  });
  ((_c = parent === null || parent === void 0 ? void 0 : parent.nestedEnums) !== null && _c !== void 0 ? _c : file.enums).push(desc);
}
function addMessage(proto, file, parent, reg, mapEntries) {
  var _a, _b, _c, _d;
  const desc = {
    kind: "message",
    proto,
    deprecated: (_b = (_a = proto.options) === null || _a === void 0 ? void 0 : _a.deprecated) !== null && _b !== void 0 ? _b : false,
    file,
    parent,
    name: proto.name,
    typeName: makeTypeName(proto, parent, file),
    fields: [],
    field: {},
    oneofs: [],
    members: [],
    nestedEnums: [],
    nestedMessages: [],
    nestedExtensions: [],
    toString() {
      return `message ${this.typeName}`;
    }
  };
  if (((_c = proto.options) === null || _c === void 0 ? void 0 : _c.mapEntry) === true) {
    mapEntries.add(desc);
  } else {
    ((_d = parent === null || parent === void 0 ? void 0 : parent.nestedMessages) !== null && _d !== void 0 ? _d : file.messages).push(desc);
    reg.add(desc);
  }
  for (const enumProto of proto.enumType) {
    addEnum(enumProto, file, desc, reg);
  }
  for (const messageProto of proto.nestedType) {
    addMessage(messageProto, file, desc, reg, mapEntries);
  }
}
function addService(proto, file, reg) {
  var _a, _b;
  const desc = {
    kind: "service",
    proto,
    deprecated: (_b = (_a = proto.options) === null || _a === void 0 ? void 0 : _a.deprecated) !== null && _b !== void 0 ? _b : false,
    file,
    name: proto.name,
    typeName: makeTypeName(proto, void 0, file),
    methods: [],
    method: {},
    toString() {
      return `service ${this.typeName}`;
    }
  };
  file.services.push(desc);
  reg.add(desc);
  for (const methodProto of proto.method) {
    const method = newMethod(methodProto, desc, reg);
    desc.methods.push(method);
    desc.method[method.localName] = method;
  }
}
function newMethod(proto, parent, reg) {
  var _a, _b, _c, _d;
  let methodKind;
  if (proto.clientStreaming && proto.serverStreaming) {
    methodKind = "bidi_streaming";
  } else if (proto.clientStreaming) {
    methodKind = "client_streaming";
  } else if (proto.serverStreaming) {
    methodKind = "server_streaming";
  } else {
    methodKind = "unary";
  }
  const input = reg.getMessage(trimLeadingDot(proto.inputType));
  const output = reg.getMessage(trimLeadingDot(proto.outputType));
  assert(input, `invalid MethodDescriptorProto: input_type ${proto.inputType} not found`);
  assert(output, `invalid MethodDescriptorProto: output_type ${proto.inputType} not found`);
  const name = proto.name;
  return {
    kind: "rpc",
    proto,
    deprecated: (_b = (_a = proto.options) === null || _a === void 0 ? void 0 : _a.deprecated) !== null && _b !== void 0 ? _b : false,
    parent,
    name,
    localName: safeObjectProperty(name.length ? safeObjectProperty(name[0].toLowerCase() + name.substring(1)) : name),
    methodKind,
    input,
    output,
    idempotency: (_d = (_c = proto.options) === null || _c === void 0 ? void 0 : _c.idempotencyLevel) !== null && _d !== void 0 ? _d : IDEMPOTENCY_UNKNOWN,
    toString() {
      return `rpc ${parent.typeName}.${name}`;
    }
  };
}
function newOneof(proto, parent) {
  return {
    kind: "oneof",
    proto,
    deprecated: false,
    parent,
    fields: [],
    name: proto.name,
    localName: safeObjectProperty(protoCamelCase(proto.name)),
    toString() {
      return `oneof ${parent.typeName}.${this.name}`;
    }
  };
}
function newField(proto, parentOrFile, reg, oneof, mapEntries) {
  var _a, _b, _c;
  const isExtension = mapEntries === void 0;
  const field = {
    kind: "field",
    proto,
    deprecated: (_b = (_a = proto.options) === null || _a === void 0 ? void 0 : _a.deprecated) !== null && _b !== void 0 ? _b : false,
    name: proto.name,
    number: proto.number,
    scalar: void 0,
    message: void 0,
    enum: void 0,
    presence: getFieldPresence(proto, oneof, isExtension, parentOrFile),
    listKind: void 0,
    mapKind: void 0,
    mapKey: void 0,
    delimitedEncoding: void 0,
    packed: void 0,
    longAsString: false,
    getDefaultValue: void 0
  };
  if (isExtension) {
    const file = parentOrFile.kind == "file" ? parentOrFile : parentOrFile.file;
    const parent = parentOrFile.kind == "file" ? void 0 : parentOrFile;
    const typeName = makeTypeName(proto, parent, file);
    field.kind = "extension";
    field.file = file;
    field.parent = parent;
    field.oneof = void 0;
    field.typeName = typeName;
    field.jsonName = `[${typeName}]`;
    field.toString = () => `extension ${typeName}`;
    const extendee = reg.getMessage(trimLeadingDot(proto.extendee));
    assert(extendee, `invalid FieldDescriptorProto: extendee ${proto.extendee} not found`);
    field.extendee = extendee;
  } else {
    const parent = parentOrFile;
    assert(parent.kind == "message");
    field.parent = parent;
    field.oneof = oneof;
    field.localName = oneof ? protoCamelCase(proto.name) : safeObjectProperty(protoCamelCase(proto.name));
    field.jsonName = proto.jsonName;
    field.toString = () => `field ${parent.typeName}.${proto.name}`;
  }
  const label = proto.label;
  const type = proto.type;
  const jstype = (_c = proto.options) === null || _c === void 0 ? void 0 : _c.jstype;
  if (label === LABEL_REPEATED) {
    const mapEntry = type == TYPE_MESSAGE ? mapEntries === null || mapEntries === void 0 ? void 0 : mapEntries.get(trimLeadingDot(proto.typeName)) : void 0;
    if (mapEntry) {
      field.fieldKind = "map";
      const { key, value } = findMapEntryFields(mapEntry);
      field.mapKey = key.scalar;
      field.mapKind = value.fieldKind;
      field.message = value.message;
      field.delimitedEncoding = false;
      field.enum = value.enum;
      field.scalar = value.scalar;
      return field;
    }
    field.fieldKind = "list";
    switch (type) {
      case TYPE_MESSAGE:
      case TYPE_GROUP:
        field.listKind = "message";
        field.message = reg.getMessage(trimLeadingDot(proto.typeName));
        assert(field.message);
        field.delimitedEncoding = isDelimitedEncoding(proto, parentOrFile);
        break;
      case TYPE_ENUM:
        field.listKind = "enum";
        field.enum = reg.getEnum(trimLeadingDot(proto.typeName));
        assert(field.enum);
        break;
      default:
        field.listKind = "scalar";
        field.scalar = type;
        field.longAsString = jstype == JS_STRING;
        break;
    }
    field.packed = isPackedField(proto, parentOrFile);
    return field;
  }
  switch (type) {
    case TYPE_MESSAGE:
    case TYPE_GROUP:
      field.fieldKind = "message";
      field.message = reg.getMessage(trimLeadingDot(proto.typeName));
      assert(
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        field.message,
        `invalid FieldDescriptorProto: type_name ${proto.typeName} not found`
      );
      field.delimitedEncoding = isDelimitedEncoding(proto, parentOrFile);
      field.getDefaultValue = () => void 0;
      break;
    case TYPE_ENUM: {
      const enumeration = reg.getEnum(trimLeadingDot(proto.typeName));
      assert(enumeration !== void 0, `invalid FieldDescriptorProto: type_name ${proto.typeName} not found`);
      field.fieldKind = "enum";
      field.enum = reg.getEnum(trimLeadingDot(proto.typeName));
      field.getDefaultValue = () => {
        return unsafeIsSetExplicit(proto, "defaultValue") ? parseTextFormatEnumValue(enumeration, proto.defaultValue) : void 0;
      };
      break;
    }
    default: {
      field.fieldKind = "scalar";
      field.scalar = type;
      field.longAsString = jstype == JS_STRING;
      field.getDefaultValue = () => {
        return unsafeIsSetExplicit(proto, "defaultValue") ? parseTextFormatScalarValue(type, proto.defaultValue) : void 0;
      };
      break;
    }
  }
  return field;
}
function getFileEdition(proto) {
  switch (proto.syntax) {
    case "":
    case "proto2":
      return EDITION_PROTO22;
    case "proto3":
      return EDITION_PROTO32;
    case "editions":
      if (proto.edition in featureDefaults) {
        return proto.edition;
      }
      throw new Error(`${proto.name}: unsupported edition`);
    default:
      throw new Error(`${proto.name}: unsupported syntax "${proto.syntax}"`);
  }
}
function findFileDependencies(proto, reg) {
  return proto.dependency.map((wantName) => {
    const dep = reg.getFile(wantName);
    if (!dep) {
      throw new Error(`Cannot find ${wantName}, imported by ${proto.name}`);
    }
    return dep;
  });
}
function findEnumSharedPrefix(enumName, values) {
  const prefix = camelToSnakeCase(enumName) + "_";
  for (const value of values) {
    if (!value.name.toLowerCase().startsWith(prefix)) {
      return void 0;
    }
    const shortName = value.name.substring(prefix.length);
    if (shortName.length == 0) {
      return void 0;
    }
    if (/^\d/.test(shortName)) {
      return void 0;
    }
  }
  return prefix;
}
function camelToSnakeCase(camel) {
  return (camel.substring(0, 1) + camel.substring(1).replace(/[A-Z]/g, (c) => "_" + c)).toLowerCase();
}
function makeTypeName(proto, parent, file) {
  let typeName;
  if (parent) {
    typeName = `${parent.typeName}.${proto.name}`;
  } else if (file.proto.package.length > 0) {
    typeName = `${file.proto.package}.${proto.name}`;
  } else {
    typeName = `${proto.name}`;
  }
  return typeName;
}
function trimLeadingDot(typeName) {
  return typeName.startsWith(".") ? typeName.substring(1) : typeName;
}
function findOneof(proto, allOneofs) {
  if (!unsafeIsSetExplicit(proto, "oneofIndex")) {
    return void 0;
  }
  if (proto.proto3Optional) {
    return void 0;
  }
  const oneof = allOneofs[proto.oneofIndex];
  assert(
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    oneof,
    `invalid FieldDescriptorProto: oneof #${proto.oneofIndex} for field #${proto.number} not found`
  );
  return oneof;
}
function getFieldPresence(proto, oneof, isExtension, parent) {
  if (proto.label == LABEL_REQUIRED) {
    return LEGACY_REQUIRED;
  }
  if (proto.label == LABEL_REPEATED) {
    return IMPLICIT3;
  }
  if (!!oneof || proto.proto3Optional) {
    return EXPLICIT;
  }
  if (proto.type == TYPE_MESSAGE) {
    return EXPLICIT;
  }
  if (isExtension) {
    return EXPLICIT;
  }
  return resolveFeature("fieldPresence", { proto, parent });
}
function isPackedField(proto, parent) {
  if (proto.label != LABEL_REPEATED) {
    return false;
  }
  switch (proto.type) {
    case TYPE_STRING:
    case TYPE_BYTES:
    case TYPE_GROUP:
    case TYPE_MESSAGE:
      return false;
  }
  const o = proto.options;
  if (o && unsafeIsSetExplicit(o, "packed")) {
    return o.packed;
  }
  return PACKED == resolveFeature("repeatedFieldEncoding", {
    proto,
    parent
  });
}
function findMapEntryFields(mapEntry) {
  const key = mapEntry.fields.find((f) => f.number === 1);
  const value = mapEntry.fields.find((f) => f.number === 2);
  assert(key && key.fieldKind == "scalar" && key.scalar != ScalarType.BYTES && key.scalar != ScalarType.FLOAT && key.scalar != ScalarType.DOUBLE && value && value.fieldKind != "list" && value.fieldKind != "map");
  return { key, value };
}
function isEnumOpen(desc) {
  var _a;
  return OPEN == resolveFeature("enumType", {
    proto: desc.proto,
    parent: (_a = desc.parent) !== null && _a !== void 0 ? _a : desc.file
  });
}
function isDelimitedEncoding(proto, parent) {
  if (proto.type == TYPE_GROUP) {
    return true;
  }
  return DELIMITED == resolveFeature("messageEncoding", {
    proto,
    parent
  });
}
function resolveFeature(name, ref) {
  var _a, _b;
  const featureSet = (_a = ref.proto.options) === null || _a === void 0 ? void 0 : _a.features;
  if (featureSet) {
    const val = featureSet[name];
    if (val != 0) {
      return val;
    }
  }
  if ("kind" in ref) {
    if (ref.kind == "message") {
      return resolveFeature(name, (_b = ref.parent) !== null && _b !== void 0 ? _b : ref.file);
    }
    const editionDefaults = featureDefaults[ref.edition];
    if (!editionDefaults) {
      throw new Error(`feature default for edition ${ref.edition} not found`);
    }
    return editionDefaults[name];
  }
  return resolveFeature(name, ref.parent);
}
function assert(condition, msg) {
  if (!condition) {
    throw new Error(msg);
  }
}

// node_modules/.pnpm/@bufbuild+protobuf@2.2.3/node_modules/@bufbuild/protobuf/dist/esm/codegenv1/boot.js
function boot(boot2) {
  const root = bootFileDescriptorProto(boot2);
  root.messageType.forEach(restoreJsonNames);
  const reg = createFileRegistry(root, () => void 0);
  return reg.getFile(root.name);
}
function bootFileDescriptorProto(init) {
  const proto = /* @__PURE__ */ Object.create({
    syntax: "",
    edition: 0
  });
  return Object.assign(proto, Object.assign(Object.assign({ $typeName: "google.protobuf.FileDescriptorProto", dependency: [], publicDependency: [], weakDependency: [], service: [], extension: [] }, init), { messageType: init.messageType.map(bootDescriptorProto), enumType: init.enumType.map(bootEnumDescriptorProto) }));
}
function bootDescriptorProto(init) {
  var _a, _b, _c, _d, _e, _f, _g, _h;
  return {
    $typeName: "google.protobuf.DescriptorProto",
    name: init.name,
    field: (_b = (_a = init.field) === null || _a === void 0 ? void 0 : _a.map(bootFieldDescriptorProto)) !== null && _b !== void 0 ? _b : [],
    extension: [],
    nestedType: (_d = (_c = init.nestedType) === null || _c === void 0 ? void 0 : _c.map(bootDescriptorProto)) !== null && _d !== void 0 ? _d : [],
    enumType: (_f = (_e = init.enumType) === null || _e === void 0 ? void 0 : _e.map(bootEnumDescriptorProto)) !== null && _f !== void 0 ? _f : [],
    extensionRange: (_h = (_g = init.extensionRange) === null || _g === void 0 ? void 0 : _g.map((e) => Object.assign({ $typeName: "google.protobuf.DescriptorProto.ExtensionRange" }, e))) !== null && _h !== void 0 ? _h : [],
    oneofDecl: [],
    reservedRange: [],
    reservedName: []
  };
}
function bootFieldDescriptorProto(init) {
  const proto = /* @__PURE__ */ Object.create({
    label: 1,
    typeName: "",
    extendee: "",
    defaultValue: "",
    oneofIndex: 0,
    jsonName: "",
    proto3Optional: false
  });
  return Object.assign(proto, Object.assign(Object.assign({ $typeName: "google.protobuf.FieldDescriptorProto" }, init), { options: init.options ? bootFieldOptions(init.options) : void 0 }));
}
function bootFieldOptions(init) {
  var _a, _b, _c;
  const proto = /* @__PURE__ */ Object.create({
    ctype: 0,
    packed: false,
    jstype: 0,
    lazy: false,
    unverifiedLazy: false,
    deprecated: false,
    weak: false,
    debugRedact: false,
    retention: 0
  });
  return Object.assign(proto, Object.assign(Object.assign({ $typeName: "google.protobuf.FieldOptions" }, init), { targets: (_a = init.targets) !== null && _a !== void 0 ? _a : [], editionDefaults: (_c = (_b = init.editionDefaults) === null || _b === void 0 ? void 0 : _b.map((e) => Object.assign({ $typeName: "google.protobuf.FieldOptions.EditionDefault" }, e))) !== null && _c !== void 0 ? _c : [], uninterpretedOption: [] }));
}
function bootEnumDescriptorProto(init) {
  return {
    $typeName: "google.protobuf.EnumDescriptorProto",
    name: init.name,
    reservedName: [],
    reservedRange: [],
    value: init.value.map((e) => Object.assign({ $typeName: "google.protobuf.EnumValueDescriptorProto" }, e))
  };
}

// node_modules/.pnpm/@bufbuild+protobuf@2.2.3/node_modules/@bufbuild/protobuf/dist/esm/codegenv1/message.js
function messageDesc(file, path, ...paths) {
  return paths.reduce((acc, cur) => acc.nestedMessages[cur], file.messages[path]);
}

// node_modules/.pnpm/@bufbuild+protobuf@2.2.3/node_modules/@bufbuild/protobuf/dist/esm/wkt/gen/google/protobuf/descriptor_pb.js
var file_google_protobuf_descriptor = /* @__PURE__ */ boot({ "name": "google/protobuf/descriptor.proto", "package": "google.protobuf", "messageType": [{ "name": "FileDescriptorSet", "field": [{ "name": "file", "number": 1, "type": 11, "label": 3, "typeName": ".google.protobuf.FileDescriptorProto" }] }, { "name": "FileDescriptorProto", "field": [{ "name": "name", "number": 1, "type": 9, "label": 1 }, { "name": "package", "number": 2, "type": 9, "label": 1 }, { "name": "dependency", "number": 3, "type": 9, "label": 3 }, { "name": "public_dependency", "number": 10, "type": 5, "label": 3 }, { "name": "weak_dependency", "number": 11, "type": 5, "label": 3 }, { "name": "message_type", "number": 4, "type": 11, "label": 3, "typeName": ".google.protobuf.DescriptorProto" }, { "name": "enum_type", "number": 5, "type": 11, "label": 3, "typeName": ".google.protobuf.EnumDescriptorProto" }, { "name": "service", "number": 6, "type": 11, "label": 3, "typeName": ".google.protobuf.ServiceDescriptorProto" }, { "name": "extension", "number": 7, "type": 11, "label": 3, "typeName": ".google.protobuf.FieldDescriptorProto" }, { "name": "options", "number": 8, "type": 11, "label": 1, "typeName": ".google.protobuf.FileOptions" }, { "name": "source_code_info", "number": 9, "type": 11, "label": 1, "typeName": ".google.protobuf.SourceCodeInfo" }, { "name": "syntax", "number": 12, "type": 9, "label": 1 }, { "name": "edition", "number": 14, "type": 14, "label": 1, "typeName": ".google.protobuf.Edition" }] }, { "name": "DescriptorProto", "field": [{ "name": "name", "number": 1, "type": 9, "label": 1 }, { "name": "field", "number": 2, "type": 11, "label": 3, "typeName": ".google.protobuf.FieldDescriptorProto" }, { "name": "extension", "number": 6, "type": 11, "label": 3, "typeName": ".google.protobuf.FieldDescriptorProto" }, { "name": "nested_type", "number": 3, "type": 11, "label": 3, "typeName": ".google.protobuf.DescriptorProto" }, { "name": "enum_type", "number": 4, "type": 11, "label": 3, "typeName": ".google.protobuf.EnumDescriptorProto" }, { "name": "extension_range", "number": 5, "type": 11, "label": 3, "typeName": ".google.protobuf.DescriptorProto.ExtensionRange" }, { "name": "oneof_decl", "number": 8, "type": 11, "label": 3, "typeName": ".google.protobuf.OneofDescriptorProto" }, { "name": "options", "number": 7, "type": 11, "label": 1, "typeName": ".google.protobuf.MessageOptions" }, { "name": "reserved_range", "number": 9, "type": 11, "label": 3, "typeName": ".google.protobuf.DescriptorProto.ReservedRange" }, { "name": "reserved_name", "number": 10, "type": 9, "label": 3 }], "nestedType": [{ "name": "ExtensionRange", "field": [{ "name": "start", "number": 1, "type": 5, "label": 1 }, { "name": "end", "number": 2, "type": 5, "label": 1 }, { "name": "options", "number": 3, "type": 11, "label": 1, "typeName": ".google.protobuf.ExtensionRangeOptions" }] }, { "name": "ReservedRange", "field": [{ "name": "start", "number": 1, "type": 5, "label": 1 }, { "name": "end", "number": 2, "type": 5, "label": 1 }] }] }, { "name": "ExtensionRangeOptions", "field": [{ "name": "uninterpreted_option", "number": 999, "type": 11, "label": 3, "typeName": ".google.protobuf.UninterpretedOption" }, { "name": "declaration", "number": 2, "type": 11, "label": 3, "typeName": ".google.protobuf.ExtensionRangeOptions.Declaration", "options": { "retention": 2 } }, { "name": "features", "number": 50, "type": 11, "label": 1, "typeName": ".google.protobuf.FeatureSet" }, { "name": "verification", "number": 3, "type": 14, "label": 1, "typeName": ".google.protobuf.ExtensionRangeOptions.VerificationState", "defaultValue": "UNVERIFIED", "options": { "retention": 2 } }], "nestedType": [{ "name": "Declaration", "field": [{ "name": "number", "number": 1, "type": 5, "label": 1 }, { "name": "full_name", "number": 2, "type": 9, "label": 1 }, { "name": "type", "number": 3, "type": 9, "label": 1 }, { "name": "reserved", "number": 5, "type": 8, "label": 1 }, { "name": "repeated", "number": 6, "type": 8, "label": 1 }] }], "enumType": [{ "name": "VerificationState", "value": [{ "name": "DECLARATION", "number": 0 }, { "name": "UNVERIFIED", "number": 1 }] }], "extensionRange": [{ "start": 1e3, "end": 536870912 }] }, { "name": "FieldDescriptorProto", "field": [{ "name": "name", "number": 1, "type": 9, "label": 1 }, { "name": "number", "number": 3, "type": 5, "label": 1 }, { "name": "label", "number": 4, "type": 14, "label": 1, "typeName": ".google.protobuf.FieldDescriptorProto.Label" }, { "name": "type", "number": 5, "type": 14, "label": 1, "typeName": ".google.protobuf.FieldDescriptorProto.Type" }, { "name": "type_name", "number": 6, "type": 9, "label": 1 }, { "name": "extendee", "number": 2, "type": 9, "label": 1 }, { "name": "default_value", "number": 7, "type": 9, "label": 1 }, { "name": "oneof_index", "number": 9, "type": 5, "label": 1 }, { "name": "json_name", "number": 10, "type": 9, "label": 1 }, { "name": "options", "number": 8, "type": 11, "label": 1, "typeName": ".google.protobuf.FieldOptions" }, { "name": "proto3_optional", "number": 17, "type": 8, "label": 1 }], "enumType": [{ "name": "Type", "value": [{ "name": "TYPE_DOUBLE", "number": 1 }, { "name": "TYPE_FLOAT", "number": 2 }, { "name": "TYPE_INT64", "number": 3 }, { "name": "TYPE_UINT64", "number": 4 }, { "name": "TYPE_INT32", "number": 5 }, { "name": "TYPE_FIXED64", "number": 6 }, { "name": "TYPE_FIXED32", "number": 7 }, { "name": "TYPE_BOOL", "number": 8 }, { "name": "TYPE_STRING", "number": 9 }, { "name": "TYPE_GROUP", "number": 10 }, { "name": "TYPE_MESSAGE", "number": 11 }, { "name": "TYPE_BYTES", "number": 12 }, { "name": "TYPE_UINT32", "number": 13 }, { "name": "TYPE_ENUM", "number": 14 }, { "name": "TYPE_SFIXED32", "number": 15 }, { "name": "TYPE_SFIXED64", "number": 16 }, { "name": "TYPE_SINT32", "number": 17 }, { "name": "TYPE_SINT64", "number": 18 }] }, { "name": "Label", "value": [{ "name": "LABEL_OPTIONAL", "number": 1 }, { "name": "LABEL_REPEATED", "number": 3 }, { "name": "LABEL_REQUIRED", "number": 2 }] }] }, { "name": "OneofDescriptorProto", "field": [{ "name": "name", "number": 1, "type": 9, "label": 1 }, { "name": "options", "number": 2, "type": 11, "label": 1, "typeName": ".google.protobuf.OneofOptions" }] }, { "name": "EnumDescriptorProto", "field": [{ "name": "name", "number": 1, "type": 9, "label": 1 }, { "name": "value", "number": 2, "type": 11, "label": 3, "typeName": ".google.protobuf.EnumValueDescriptorProto" }, { "name": "options", "number": 3, "type": 11, "label": 1, "typeName": ".google.protobuf.EnumOptions" }, { "name": "reserved_range", "number": 4, "type": 11, "label": 3, "typeName": ".google.protobuf.EnumDescriptorProto.EnumReservedRange" }, { "name": "reserved_name", "number": 5, "type": 9, "label": 3 }], "nestedType": [{ "name": "EnumReservedRange", "field": [{ "name": "start", "number": 1, "type": 5, "label": 1 }, { "name": "end", "number": 2, "type": 5, "label": 1 }] }] }, { "name": "EnumValueDescriptorProto", "field": [{ "name": "name", "number": 1, "type": 9, "label": 1 }, { "name": "number", "number": 2, "type": 5, "label": 1 }, { "name": "options", "number": 3, "type": 11, "label": 1, "typeName": ".google.protobuf.EnumValueOptions" }] }, { "name": "ServiceDescriptorProto", "field": [{ "name": "name", "number": 1, "type": 9, "label": 1 }, { "name": "method", "number": 2, "type": 11, "label": 3, "typeName": ".google.protobuf.MethodDescriptorProto" }, { "name": "options", "number": 3, "type": 11, "label": 1, "typeName": ".google.protobuf.ServiceOptions" }] }, { "name": "MethodDescriptorProto", "field": [{ "name": "name", "number": 1, "type": 9, "label": 1 }, { "name": "input_type", "number": 2, "type": 9, "label": 1 }, { "name": "output_type", "number": 3, "type": 9, "label": 1 }, { "name": "options", "number": 4, "type": 11, "label": 1, "typeName": ".google.protobuf.MethodOptions" }, { "name": "client_streaming", "number": 5, "type": 8, "label": 1, "defaultValue": "false" }, { "name": "server_streaming", "number": 6, "type": 8, "label": 1, "defaultValue": "false" }] }, { "name": "FileOptions", "field": [{ "name": "java_package", "number": 1, "type": 9, "label": 1 }, { "name": "java_outer_classname", "number": 8, "type": 9, "label": 1 }, { "name": "java_multiple_files", "number": 10, "type": 8, "label": 1, "defaultValue": "false" }, { "name": "java_generate_equals_and_hash", "number": 20, "type": 8, "label": 1, "options": { "deprecated": true } }, { "name": "java_string_check_utf8", "number": 27, "type": 8, "label": 1, "defaultValue": "false" }, { "name": "optimize_for", "number": 9, "type": 14, "label": 1, "typeName": ".google.protobuf.FileOptions.OptimizeMode", "defaultValue": "SPEED" }, { "name": "go_package", "number": 11, "type": 9, "label": 1 }, { "name": "cc_generic_services", "number": 16, "type": 8, "label": 1, "defaultValue": "false" }, { "name": "java_generic_services", "number": 17, "type": 8, "label": 1, "defaultValue": "false" }, { "name": "py_generic_services", "number": 18, "type": 8, "label": 1, "defaultValue": "false" }, { "name": "deprecated", "number": 23, "type": 8, "label": 1, "defaultValue": "false" }, { "name": "cc_enable_arenas", "number": 31, "type": 8, "label": 1, "defaultValue": "true" }, { "name": "objc_class_prefix", "number": 36, "type": 9, "label": 1 }, { "name": "csharp_namespace", "number": 37, "type": 9, "label": 1 }, { "name": "swift_prefix", "number": 39, "type": 9, "label": 1 }, { "name": "php_class_prefix", "number": 40, "type": 9, "label": 1 }, { "name": "php_namespace", "number": 41, "type": 9, "label": 1 }, { "name": "php_metadata_namespace", "number": 44, "type": 9, "label": 1 }, { "name": "ruby_package", "number": 45, "type": 9, "label": 1 }, { "name": "features", "number": 50, "type": 11, "label": 1, "typeName": ".google.protobuf.FeatureSet" }, { "name": "uninterpreted_option", "number": 999, "type": 11, "label": 3, "typeName": ".google.protobuf.UninterpretedOption" }], "enumType": [{ "name": "OptimizeMode", "value": [{ "name": "SPEED", "number": 1 }, { "name": "CODE_SIZE", "number": 2 }, { "name": "LITE_RUNTIME", "number": 3 }] }], "extensionRange": [{ "start": 1e3, "end": 536870912 }] }, { "name": "MessageOptions", "field": [{ "name": "message_set_wire_format", "number": 1, "type": 8, "label": 1, "defaultValue": "false" }, { "name": "no_standard_descriptor_accessor", "number": 2, "type": 8, "label": 1, "defaultValue": "false" }, { "name": "deprecated", "number": 3, "type": 8, "label": 1, "defaultValue": "false" }, { "name": "map_entry", "number": 7, "type": 8, "label": 1 }, { "name": "deprecated_legacy_json_field_conflicts", "number": 11, "type": 8, "label": 1, "options": { "deprecated": true } }, { "name": "features", "number": 12, "type": 11, "label": 1, "typeName": ".google.protobuf.FeatureSet" }, { "name": "uninterpreted_option", "number": 999, "type": 11, "label": 3, "typeName": ".google.protobuf.UninterpretedOption" }], "extensionRange": [{ "start": 1e3, "end": 536870912 }] }, { "name": "FieldOptions", "field": [{ "name": "ctype", "number": 1, "type": 14, "label": 1, "typeName": ".google.protobuf.FieldOptions.CType", "defaultValue": "STRING" }, { "name": "packed", "number": 2, "type": 8, "label": 1 }, { "name": "jstype", "number": 6, "type": 14, "label": 1, "typeName": ".google.protobuf.FieldOptions.JSType", "defaultValue": "JS_NORMAL" }, { "name": "lazy", "number": 5, "type": 8, "label": 1, "defaultValue": "false" }, { "name": "unverified_lazy", "number": 15, "type": 8, "label": 1, "defaultValue": "false" }, { "name": "deprecated", "number": 3, "type": 8, "label": 1, "defaultValue": "false" }, { "name": "weak", "number": 10, "type": 8, "label": 1, "defaultValue": "false" }, { "name": "debug_redact", "number": 16, "type": 8, "label": 1, "defaultValue": "false" }, { "name": "retention", "number": 17, "type": 14, "label": 1, "typeName": ".google.protobuf.FieldOptions.OptionRetention" }, { "name": "targets", "number": 19, "type": 14, "label": 3, "typeName": ".google.protobuf.FieldOptions.OptionTargetType" }, { "name": "edition_defaults", "number": 20, "type": 11, "label": 3, "typeName": ".google.protobuf.FieldOptions.EditionDefault" }, { "name": "features", "number": 21, "type": 11, "label": 1, "typeName": ".google.protobuf.FeatureSet" }, { "name": "feature_support", "number": 22, "type": 11, "label": 1, "typeName": ".google.protobuf.FieldOptions.FeatureSupport" }, { "name": "uninterpreted_option", "number": 999, "type": 11, "label": 3, "typeName": ".google.protobuf.UninterpretedOption" }], "nestedType": [{ "name": "EditionDefault", "field": [{ "name": "edition", "number": 3, "type": 14, "label": 1, "typeName": ".google.protobuf.Edition" }, { "name": "value", "number": 2, "type": 9, "label": 1 }] }, { "name": "FeatureSupport", "field": [{ "name": "edition_introduced", "number": 1, "type": 14, "label": 1, "typeName": ".google.protobuf.Edition" }, { "name": "edition_deprecated", "number": 2, "type": 14, "label": 1, "typeName": ".google.protobuf.Edition" }, { "name": "deprecation_warning", "number": 3, "type": 9, "label": 1 }, { "name": "edition_removed", "number": 4, "type": 14, "label": 1, "typeName": ".google.protobuf.Edition" }] }], "enumType": [{ "name": "CType", "value": [{ "name": "STRING", "number": 0 }, { "name": "CORD", "number": 1 }, { "name": "STRING_PIECE", "number": 2 }] }, { "name": "JSType", "value": [{ "name": "JS_NORMAL", "number": 0 }, { "name": "JS_STRING", "number": 1 }, { "name": "JS_NUMBER", "number": 2 }] }, { "name": "OptionRetention", "value": [{ "name": "RETENTION_UNKNOWN", "number": 0 }, { "name": "RETENTION_RUNTIME", "number": 1 }, { "name": "RETENTION_SOURCE", "number": 2 }] }, { "name": "OptionTargetType", "value": [{ "name": "TARGET_TYPE_UNKNOWN", "number": 0 }, { "name": "TARGET_TYPE_FILE", "number": 1 }, { "name": "TARGET_TYPE_EXTENSION_RANGE", "number": 2 }, { "name": "TARGET_TYPE_MESSAGE", "number": 3 }, { "name": "TARGET_TYPE_FIELD", "number": 4 }, { "name": "TARGET_TYPE_ONEOF", "number": 5 }, { "name": "TARGET_TYPE_ENUM", "number": 6 }, { "name": "TARGET_TYPE_ENUM_ENTRY", "number": 7 }, { "name": "TARGET_TYPE_SERVICE", "number": 8 }, { "name": "TARGET_TYPE_METHOD", "number": 9 }] }], "extensionRange": [{ "start": 1e3, "end": 536870912 }] }, { "name": "OneofOptions", "field": [{ "name": "features", "number": 1, "type": 11, "label": 1, "typeName": ".google.protobuf.FeatureSet" }, { "name": "uninterpreted_option", "number": 999, "type": 11, "label": 3, "typeName": ".google.protobuf.UninterpretedOption" }], "extensionRange": [{ "start": 1e3, "end": 536870912 }] }, { "name": "EnumOptions", "field": [{ "name": "allow_alias", "number": 2, "type": 8, "label": 1 }, { "name": "deprecated", "number": 3, "type": 8, "label": 1, "defaultValue": "false" }, { "name": "deprecated_legacy_json_field_conflicts", "number": 6, "type": 8, "label": 1, "options": { "deprecated": true } }, { "name": "features", "number": 7, "type": 11, "label": 1, "typeName": ".google.protobuf.FeatureSet" }, { "name": "uninterpreted_option", "number": 999, "type": 11, "label": 3, "typeName": ".google.protobuf.UninterpretedOption" }], "extensionRange": [{ "start": 1e3, "end": 536870912 }] }, { "name": "EnumValueOptions", "field": [{ "name": "deprecated", "number": 1, "type": 8, "label": 1, "defaultValue": "false" }, { "name": "features", "number": 2, "type": 11, "label": 1, "typeName": ".google.protobuf.FeatureSet" }, { "name": "debug_redact", "number": 3, "type": 8, "label": 1, "defaultValue": "false" }, { "name": "feature_support", "number": 4, "type": 11, "label": 1, "typeName": ".google.protobuf.FieldOptions.FeatureSupport" }, { "name": "uninterpreted_option", "number": 999, "type": 11, "label": 3, "typeName": ".google.protobuf.UninterpretedOption" }], "extensionRange": [{ "start": 1e3, "end": 536870912 }] }, { "name": "ServiceOptions", "field": [{ "name": "features", "number": 34, "type": 11, "label": 1, "typeName": ".google.protobuf.FeatureSet" }, { "name": "deprecated", "number": 33, "type": 8, "label": 1, "defaultValue": "false" }, { "name": "uninterpreted_option", "number": 999, "type": 11, "label": 3, "typeName": ".google.protobuf.UninterpretedOption" }], "extensionRange": [{ "start": 1e3, "end": 536870912 }] }, { "name": "MethodOptions", "field": [{ "name": "deprecated", "number": 33, "type": 8, "label": 1, "defaultValue": "false" }, { "name": "idempotency_level", "number": 34, "type": 14, "label": 1, "typeName": ".google.protobuf.MethodOptions.IdempotencyLevel", "defaultValue": "IDEMPOTENCY_UNKNOWN" }, { "name": "features", "number": 35, "type": 11, "label": 1, "typeName": ".google.protobuf.FeatureSet" }, { "name": "uninterpreted_option", "number": 999, "type": 11, "label": 3, "typeName": ".google.protobuf.UninterpretedOption" }], "enumType": [{ "name": "IdempotencyLevel", "value": [{ "name": "IDEMPOTENCY_UNKNOWN", "number": 0 }, { "name": "NO_SIDE_EFFECTS", "number": 1 }, { "name": "IDEMPOTENT", "number": 2 }] }], "extensionRange": [{ "start": 1e3, "end": 536870912 }] }, { "name": "UninterpretedOption", "field": [{ "name": "name", "number": 2, "type": 11, "label": 3, "typeName": ".google.protobuf.UninterpretedOption.NamePart" }, { "name": "identifier_value", "number": 3, "type": 9, "label": 1 }, { "name": "positive_int_value", "number": 4, "type": 4, "label": 1 }, { "name": "negative_int_value", "number": 5, "type": 3, "label": 1 }, { "name": "double_value", "number": 6, "type": 1, "label": 1 }, { "name": "string_value", "number": 7, "type": 12, "label": 1 }, { "name": "aggregate_value", "number": 8, "type": 9, "label": 1 }], "nestedType": [{ "name": "NamePart", "field": [{ "name": "name_part", "number": 1, "type": 9, "label": 2 }, { "name": "is_extension", "number": 2, "type": 8, "label": 2 }] }] }, { "name": "FeatureSet", "field": [{ "name": "field_presence", "number": 1, "type": 14, "label": 1, "typeName": ".google.protobuf.FeatureSet.FieldPresence", "options": { "retention": 1, "targets": [4, 1], "editionDefaults": [{ "value": "EXPLICIT", "edition": 900 }, { "value": "IMPLICIT", "edition": 999 }, { "value": "EXPLICIT", "edition": 1e3 }] } }, { "name": "enum_type", "number": 2, "type": 14, "label": 1, "typeName": ".google.protobuf.FeatureSet.EnumType", "options": { "retention": 1, "targets": [6, 1], "editionDefaults": [{ "value": "CLOSED", "edition": 900 }, { "value": "OPEN", "edition": 999 }] } }, { "name": "repeated_field_encoding", "number": 3, "type": 14, "label": 1, "typeName": ".google.protobuf.FeatureSet.RepeatedFieldEncoding", "options": { "retention": 1, "targets": [4, 1], "editionDefaults": [{ "value": "EXPANDED", "edition": 900 }, { "value": "PACKED", "edition": 999 }] } }, { "name": "utf8_validation", "number": 4, "type": 14, "label": 1, "typeName": ".google.protobuf.FeatureSet.Utf8Validation", "options": { "retention": 1, "targets": [4, 1], "editionDefaults": [{ "value": "NONE", "edition": 900 }, { "value": "VERIFY", "edition": 999 }] } }, { "name": "message_encoding", "number": 5, "type": 14, "label": 1, "typeName": ".google.protobuf.FeatureSet.MessageEncoding", "options": { "retention": 1, "targets": [4, 1], "editionDefaults": [{ "value": "LENGTH_PREFIXED", "edition": 900 }] } }, { "name": "json_format", "number": 6, "type": 14, "label": 1, "typeName": ".google.protobuf.FeatureSet.JsonFormat", "options": { "retention": 1, "targets": [3, 6, 1], "editionDefaults": [{ "value": "LEGACY_BEST_EFFORT", "edition": 900 }, { "value": "ALLOW", "edition": 999 }] } }], "enumType": [{ "name": "FieldPresence", "value": [{ "name": "FIELD_PRESENCE_UNKNOWN", "number": 0 }, { "name": "EXPLICIT", "number": 1 }, { "name": "IMPLICIT", "number": 2 }, { "name": "LEGACY_REQUIRED", "number": 3 }] }, { "name": "EnumType", "value": [{ "name": "ENUM_TYPE_UNKNOWN", "number": 0 }, { "name": "OPEN", "number": 1 }, { "name": "CLOSED", "number": 2 }] }, { "name": "RepeatedFieldEncoding", "value": [{ "name": "REPEATED_FIELD_ENCODING_UNKNOWN", "number": 0 }, { "name": "PACKED", "number": 1 }, { "name": "EXPANDED", "number": 2 }] }, { "name": "Utf8Validation", "value": [{ "name": "UTF8_VALIDATION_UNKNOWN", "number": 0 }, { "name": "VERIFY", "number": 2 }, { "name": "NONE", "number": 3 }] }, { "name": "MessageEncoding", "value": [{ "name": "MESSAGE_ENCODING_UNKNOWN", "number": 0 }, { "name": "LENGTH_PREFIXED", "number": 1 }, { "name": "DELIMITED", "number": 2 }] }, { "name": "JsonFormat", "value": [{ "name": "JSON_FORMAT_UNKNOWN", "number": 0 }, { "name": "ALLOW", "number": 1 }, { "name": "LEGACY_BEST_EFFORT", "number": 2 }] }], "extensionRange": [{ "start": 1e3, "end": 9995 }, { "start": 9995, "end": 1e4 }, { "start": 1e4, "end": 10001 }] }, { "name": "FeatureSetDefaults", "field": [{ "name": "defaults", "number": 1, "type": 11, "label": 3, "typeName": ".google.protobuf.FeatureSetDefaults.FeatureSetEditionDefault" }, { "name": "minimum_edition", "number": 4, "type": 14, "label": 1, "typeName": ".google.protobuf.Edition" }, { "name": "maximum_edition", "number": 5, "type": 14, "label": 1, "typeName": ".google.protobuf.Edition" }], "nestedType": [{ "name": "FeatureSetEditionDefault", "field": [{ "name": "edition", "number": 3, "type": 14, "label": 1, "typeName": ".google.protobuf.Edition" }, { "name": "overridable_features", "number": 4, "type": 11, "label": 1, "typeName": ".google.protobuf.FeatureSet" }, { "name": "fixed_features", "number": 5, "type": 11, "label": 1, "typeName": ".google.protobuf.FeatureSet" }] }] }, { "name": "SourceCodeInfo", "field": [{ "name": "location", "number": 1, "type": 11, "label": 3, "typeName": ".google.protobuf.SourceCodeInfo.Location" }], "nestedType": [{ "name": "Location", "field": [{ "name": "path", "number": 1, "type": 5, "label": 3, "options": { "packed": true } }, { "name": "span", "number": 2, "type": 5, "label": 3, "options": { "packed": true } }, { "name": "leading_comments", "number": 3, "type": 9, "label": 1 }, { "name": "trailing_comments", "number": 4, "type": 9, "label": 1 }, { "name": "leading_detached_comments", "number": 6, "type": 9, "label": 3 }] }] }, { "name": "GeneratedCodeInfo", "field": [{ "name": "annotation", "number": 1, "type": 11, "label": 3, "typeName": ".google.protobuf.GeneratedCodeInfo.Annotation" }], "nestedType": [{ "name": "Annotation", "field": [{ "name": "path", "number": 1, "type": 5, "label": 3, "options": { "packed": true } }, { "name": "source_file", "number": 2, "type": 9, "label": 1 }, { "name": "begin", "number": 3, "type": 5, "label": 1 }, { "name": "end", "number": 4, "type": 5, "label": 1 }, { "name": "semantic", "number": 5, "type": 14, "label": 1, "typeName": ".google.protobuf.GeneratedCodeInfo.Annotation.Semantic" }], "enumType": [{ "name": "Semantic", "value": [{ "name": "NONE", "number": 0 }, { "name": "SET", "number": 1 }, { "name": "ALIAS", "number": 2 }] }] }] }], "enumType": [{ "name": "Edition", "value": [{ "name": "EDITION_UNKNOWN", "number": 0 }, { "name": "EDITION_LEGACY", "number": 900 }, { "name": "EDITION_PROTO2", "number": 998 }, { "name": "EDITION_PROTO3", "number": 999 }, { "name": "EDITION_2023", "number": 1e3 }, { "name": "EDITION_2024", "number": 1001 }, { "name": "EDITION_1_TEST_ONLY", "number": 1 }, { "name": "EDITION_2_TEST_ONLY", "number": 2 }, { "name": "EDITION_99997_TEST_ONLY", "number": 99997 }, { "name": "EDITION_99998_TEST_ONLY", "number": 99998 }, { "name": "EDITION_99999_TEST_ONLY", "number": 99999 }, { "name": "EDITION_MAX", "number": 2147483647 }] }] });
var FileDescriptorProtoSchema = /* @__PURE__ */ messageDesc(file_google_protobuf_descriptor, 1);
var ExtensionRangeOptions_VerificationState;
(function(ExtensionRangeOptions_VerificationState2) {
  ExtensionRangeOptions_VerificationState2[ExtensionRangeOptions_VerificationState2["DECLARATION"] = 0] = "DECLARATION";
  ExtensionRangeOptions_VerificationState2[ExtensionRangeOptions_VerificationState2["UNVERIFIED"] = 1] = "UNVERIFIED";
})(ExtensionRangeOptions_VerificationState || (ExtensionRangeOptions_VerificationState = {}));
var FieldDescriptorProto_Type;
(function(FieldDescriptorProto_Type2) {
  FieldDescriptorProto_Type2[FieldDescriptorProto_Type2["DOUBLE"] = 1] = "DOUBLE";
  FieldDescriptorProto_Type2[FieldDescriptorProto_Type2["FLOAT"] = 2] = "FLOAT";
  FieldDescriptorProto_Type2[FieldDescriptorProto_Type2["INT64"] = 3] = "INT64";
  FieldDescriptorProto_Type2[FieldDescriptorProto_Type2["UINT64"] = 4] = "UINT64";
  FieldDescriptorProto_Type2[FieldDescriptorProto_Type2["INT32"] = 5] = "INT32";
  FieldDescriptorProto_Type2[FieldDescriptorProto_Type2["FIXED64"] = 6] = "FIXED64";
  FieldDescriptorProto_Type2[FieldDescriptorProto_Type2["FIXED32"] = 7] = "FIXED32";
  FieldDescriptorProto_Type2[FieldDescriptorProto_Type2["BOOL"] = 8] = "BOOL";
  FieldDescriptorProto_Type2[FieldDescriptorProto_Type2["STRING"] = 9] = "STRING";
  FieldDescriptorProto_Type2[FieldDescriptorProto_Type2["GROUP"] = 10] = "GROUP";
  FieldDescriptorProto_Type2[FieldDescriptorProto_Type2["MESSAGE"] = 11] = "MESSAGE";
  FieldDescriptorProto_Type2[FieldDescriptorProto_Type2["BYTES"] = 12] = "BYTES";
  FieldDescriptorProto_Type2[FieldDescriptorProto_Type2["UINT32"] = 13] = "UINT32";
  FieldDescriptorProto_Type2[FieldDescriptorProto_Type2["ENUM"] = 14] = "ENUM";
  FieldDescriptorProto_Type2[FieldDescriptorProto_Type2["SFIXED32"] = 15] = "SFIXED32";
  FieldDescriptorProto_Type2[FieldDescriptorProto_Type2["SFIXED64"] = 16] = "SFIXED64";
  FieldDescriptorProto_Type2[FieldDescriptorProto_Type2["SINT32"] = 17] = "SINT32";
  FieldDescriptorProto_Type2[FieldDescriptorProto_Type2["SINT64"] = 18] = "SINT64";
})(FieldDescriptorProto_Type || (FieldDescriptorProto_Type = {}));
var FieldDescriptorProto_Label;
(function(FieldDescriptorProto_Label2) {
  FieldDescriptorProto_Label2[FieldDescriptorProto_Label2["OPTIONAL"] = 1] = "OPTIONAL";
  FieldDescriptorProto_Label2[FieldDescriptorProto_Label2["REPEATED"] = 3] = "REPEATED";
  FieldDescriptorProto_Label2[FieldDescriptorProto_Label2["REQUIRED"] = 2] = "REQUIRED";
})(FieldDescriptorProto_Label || (FieldDescriptorProto_Label = {}));
var FileOptions_OptimizeMode;
(function(FileOptions_OptimizeMode2) {
  FileOptions_OptimizeMode2[FileOptions_OptimizeMode2["SPEED"] = 1] = "SPEED";
  FileOptions_OptimizeMode2[FileOptions_OptimizeMode2["CODE_SIZE"] = 2] = "CODE_SIZE";
  FileOptions_OptimizeMode2[FileOptions_OptimizeMode2["LITE_RUNTIME"] = 3] = "LITE_RUNTIME";
})(FileOptions_OptimizeMode || (FileOptions_OptimizeMode = {}));
var FieldOptions_CType;
(function(FieldOptions_CType2) {
  FieldOptions_CType2[FieldOptions_CType2["STRING"] = 0] = "STRING";
  FieldOptions_CType2[FieldOptions_CType2["CORD"] = 1] = "CORD";
  FieldOptions_CType2[FieldOptions_CType2["STRING_PIECE"] = 2] = "STRING_PIECE";
})(FieldOptions_CType || (FieldOptions_CType = {}));
var FieldOptions_JSType;
(function(FieldOptions_JSType2) {
  FieldOptions_JSType2[FieldOptions_JSType2["JS_NORMAL"] = 0] = "JS_NORMAL";
  FieldOptions_JSType2[FieldOptions_JSType2["JS_STRING"] = 1] = "JS_STRING";
  FieldOptions_JSType2[FieldOptions_JSType2["JS_NUMBER"] = 2] = "JS_NUMBER";
})(FieldOptions_JSType || (FieldOptions_JSType = {}));
var FieldOptions_OptionRetention;
(function(FieldOptions_OptionRetention2) {
  FieldOptions_OptionRetention2[FieldOptions_OptionRetention2["RETENTION_UNKNOWN"] = 0] = "RETENTION_UNKNOWN";
  FieldOptions_OptionRetention2[FieldOptions_OptionRetention2["RETENTION_RUNTIME"] = 1] = "RETENTION_RUNTIME";
  FieldOptions_OptionRetention2[FieldOptions_OptionRetention2["RETENTION_SOURCE"] = 2] = "RETENTION_SOURCE";
})(FieldOptions_OptionRetention || (FieldOptions_OptionRetention = {}));
var FieldOptions_OptionTargetType;
(function(FieldOptions_OptionTargetType2) {
  FieldOptions_OptionTargetType2[FieldOptions_OptionTargetType2["TARGET_TYPE_UNKNOWN"] = 0] = "TARGET_TYPE_UNKNOWN";
  FieldOptions_OptionTargetType2[FieldOptions_OptionTargetType2["TARGET_TYPE_FILE"] = 1] = "TARGET_TYPE_FILE";
  FieldOptions_OptionTargetType2[FieldOptions_OptionTargetType2["TARGET_TYPE_EXTENSION_RANGE"] = 2] = "TARGET_TYPE_EXTENSION_RANGE";
  FieldOptions_OptionTargetType2[FieldOptions_OptionTargetType2["TARGET_TYPE_MESSAGE"] = 3] = "TARGET_TYPE_MESSAGE";
  FieldOptions_OptionTargetType2[FieldOptions_OptionTargetType2["TARGET_TYPE_FIELD"] = 4] = "TARGET_TYPE_FIELD";
  FieldOptions_OptionTargetType2[FieldOptions_OptionTargetType2["TARGET_TYPE_ONEOF"] = 5] = "TARGET_TYPE_ONEOF";
  FieldOptions_OptionTargetType2[FieldOptions_OptionTargetType2["TARGET_TYPE_ENUM"] = 6] = "TARGET_TYPE_ENUM";
  FieldOptions_OptionTargetType2[FieldOptions_OptionTargetType2["TARGET_TYPE_ENUM_ENTRY"] = 7] = "TARGET_TYPE_ENUM_ENTRY";
  FieldOptions_OptionTargetType2[FieldOptions_OptionTargetType2["TARGET_TYPE_SERVICE"] = 8] = "TARGET_TYPE_SERVICE";
  FieldOptions_OptionTargetType2[FieldOptions_OptionTargetType2["TARGET_TYPE_METHOD"] = 9] = "TARGET_TYPE_METHOD";
})(FieldOptions_OptionTargetType || (FieldOptions_OptionTargetType = {}));
var MethodOptions_IdempotencyLevel;
(function(MethodOptions_IdempotencyLevel2) {
  MethodOptions_IdempotencyLevel2[MethodOptions_IdempotencyLevel2["IDEMPOTENCY_UNKNOWN"] = 0] = "IDEMPOTENCY_UNKNOWN";
  MethodOptions_IdempotencyLevel2[MethodOptions_IdempotencyLevel2["NO_SIDE_EFFECTS"] = 1] = "NO_SIDE_EFFECTS";
  MethodOptions_IdempotencyLevel2[MethodOptions_IdempotencyLevel2["IDEMPOTENT"] = 2] = "IDEMPOTENT";
})(MethodOptions_IdempotencyLevel || (MethodOptions_IdempotencyLevel = {}));
var FeatureSet_FieldPresence;
(function(FeatureSet_FieldPresence2) {
  FeatureSet_FieldPresence2[FeatureSet_FieldPresence2["FIELD_PRESENCE_UNKNOWN"] = 0] = "FIELD_PRESENCE_UNKNOWN";
  FeatureSet_FieldPresence2[FeatureSet_FieldPresence2["EXPLICIT"] = 1] = "EXPLICIT";
  FeatureSet_FieldPresence2[FeatureSet_FieldPresence2["IMPLICIT"] = 2] = "IMPLICIT";
  FeatureSet_FieldPresence2[FeatureSet_FieldPresence2["LEGACY_REQUIRED"] = 3] = "LEGACY_REQUIRED";
})(FeatureSet_FieldPresence || (FeatureSet_FieldPresence = {}));
var FeatureSet_EnumType;
(function(FeatureSet_EnumType2) {
  FeatureSet_EnumType2[FeatureSet_EnumType2["ENUM_TYPE_UNKNOWN"] = 0] = "ENUM_TYPE_UNKNOWN";
  FeatureSet_EnumType2[FeatureSet_EnumType2["OPEN"] = 1] = "OPEN";
  FeatureSet_EnumType2[FeatureSet_EnumType2["CLOSED"] = 2] = "CLOSED";
})(FeatureSet_EnumType || (FeatureSet_EnumType = {}));
var FeatureSet_RepeatedFieldEncoding;
(function(FeatureSet_RepeatedFieldEncoding2) {
  FeatureSet_RepeatedFieldEncoding2[FeatureSet_RepeatedFieldEncoding2["REPEATED_FIELD_ENCODING_UNKNOWN"] = 0] = "REPEATED_FIELD_ENCODING_UNKNOWN";
  FeatureSet_RepeatedFieldEncoding2[FeatureSet_RepeatedFieldEncoding2["PACKED"] = 1] = "PACKED";
  FeatureSet_RepeatedFieldEncoding2[FeatureSet_RepeatedFieldEncoding2["EXPANDED"] = 2] = "EXPANDED";
})(FeatureSet_RepeatedFieldEncoding || (FeatureSet_RepeatedFieldEncoding = {}));
var FeatureSet_Utf8Validation;
(function(FeatureSet_Utf8Validation2) {
  FeatureSet_Utf8Validation2[FeatureSet_Utf8Validation2["UTF8_VALIDATION_UNKNOWN"] = 0] = "UTF8_VALIDATION_UNKNOWN";
  FeatureSet_Utf8Validation2[FeatureSet_Utf8Validation2["VERIFY"] = 2] = "VERIFY";
  FeatureSet_Utf8Validation2[FeatureSet_Utf8Validation2["NONE"] = 3] = "NONE";
})(FeatureSet_Utf8Validation || (FeatureSet_Utf8Validation = {}));
var FeatureSet_MessageEncoding;
(function(FeatureSet_MessageEncoding2) {
  FeatureSet_MessageEncoding2[FeatureSet_MessageEncoding2["MESSAGE_ENCODING_UNKNOWN"] = 0] = "MESSAGE_ENCODING_UNKNOWN";
  FeatureSet_MessageEncoding2[FeatureSet_MessageEncoding2["LENGTH_PREFIXED"] = 1] = "LENGTH_PREFIXED";
  FeatureSet_MessageEncoding2[FeatureSet_MessageEncoding2["DELIMITED"] = 2] = "DELIMITED";
})(FeatureSet_MessageEncoding || (FeatureSet_MessageEncoding = {}));
var FeatureSet_JsonFormat;
(function(FeatureSet_JsonFormat2) {
  FeatureSet_JsonFormat2[FeatureSet_JsonFormat2["JSON_FORMAT_UNKNOWN"] = 0] = "JSON_FORMAT_UNKNOWN";
  FeatureSet_JsonFormat2[FeatureSet_JsonFormat2["ALLOW"] = 1] = "ALLOW";
  FeatureSet_JsonFormat2[FeatureSet_JsonFormat2["LEGACY_BEST_EFFORT"] = 2] = "LEGACY_BEST_EFFORT";
})(FeatureSet_JsonFormat || (FeatureSet_JsonFormat = {}));
var GeneratedCodeInfo_Annotation_Semantic;
(function(GeneratedCodeInfo_Annotation_Semantic2) {
  GeneratedCodeInfo_Annotation_Semantic2[GeneratedCodeInfo_Annotation_Semantic2["NONE"] = 0] = "NONE";
  GeneratedCodeInfo_Annotation_Semantic2[GeneratedCodeInfo_Annotation_Semantic2["SET"] = 1] = "SET";
  GeneratedCodeInfo_Annotation_Semantic2[GeneratedCodeInfo_Annotation_Semantic2["ALIAS"] = 2] = "ALIAS";
})(GeneratedCodeInfo_Annotation_Semantic || (GeneratedCodeInfo_Annotation_Semantic = {}));
var Edition;
(function(Edition2) {
  Edition2[Edition2["EDITION_UNKNOWN"] = 0] = "EDITION_UNKNOWN";
  Edition2[Edition2["EDITION_LEGACY"] = 900] = "EDITION_LEGACY";
  Edition2[Edition2["EDITION_PROTO2"] = 998] = "EDITION_PROTO2";
  Edition2[Edition2["EDITION_PROTO3"] = 999] = "EDITION_PROTO3";
  Edition2[Edition2["EDITION_2023"] = 1e3] = "EDITION_2023";
  Edition2[Edition2["EDITION_2024"] = 1001] = "EDITION_2024";
  Edition2[Edition2["EDITION_1_TEST_ONLY"] = 1] = "EDITION_1_TEST_ONLY";
  Edition2[Edition2["EDITION_2_TEST_ONLY"] = 2] = "EDITION_2_TEST_ONLY";
  Edition2[Edition2["EDITION_99997_TEST_ONLY"] = 99997] = "EDITION_99997_TEST_ONLY";
  Edition2[Edition2["EDITION_99998_TEST_ONLY"] = 99998] = "EDITION_99998_TEST_ONLY";
  Edition2[Edition2["EDITION_99999_TEST_ONLY"] = 99999] = "EDITION_99999_TEST_ONLY";
  Edition2[Edition2["EDITION_MAX"] = 2147483647] = "EDITION_MAX";
})(Edition || (Edition = {}));

// node_modules/.pnpm/@bufbuild+protobuf@2.2.3/node_modules/@bufbuild/protobuf/dist/esm/from-binary.js
var readDefaults = {
  readUnknownFields: true
};
function makeReadOptions(options) {
  return options ? Object.assign(Object.assign({}, readDefaults), options) : readDefaults;
}
function fromBinary(schema, bytes, options) {
  const msg = reflect(schema, void 0, false);
  readMessage(msg, new BinaryReader(bytes), makeReadOptions(options), false, bytes.byteLength);
  return msg.message;
}
function readMessage(message2, reader, options, delimited, lengthOrDelimitedFieldNo) {
  var _a;
  const end = delimited ? reader.len : reader.pos + lengthOrDelimitedFieldNo;
  let fieldNo, wireType;
  const unknownFields = (_a = message2.getUnknown()) !== null && _a !== void 0 ? _a : [];
  while (reader.pos < end) {
    [fieldNo, wireType] = reader.tag();
    if (delimited && wireType == WireType.EndGroup) {
      break;
    }
    const field = message2.findNumber(fieldNo);
    if (!field) {
      const data = reader.skip(wireType, fieldNo);
      if (options.readUnknownFields) {
        unknownFields.push({ no: fieldNo, wireType, data });
      }
      continue;
    }
    readField(message2, reader, field, wireType, options);
  }
  if (delimited) {
    if (wireType != WireType.EndGroup || fieldNo !== lengthOrDelimitedFieldNo) {
      throw new Error(`invalid end group tag`);
    }
  }
  if (unknownFields.length > 0) {
    message2.setUnknown(unknownFields);
  }
}
function readField(message2, reader, field, wireType, options) {
  switch (field.fieldKind) {
    case "scalar":
      message2.set(field, readScalar(reader, field.scalar));
      break;
    case "enum":
      message2.set(field, readScalar(reader, ScalarType.INT32));
      break;
    case "message":
      message2.set(field, readMessageField(reader, options, field, message2.get(field)));
      break;
    case "list":
      readListField(reader, wireType, message2.get(field), options);
      break;
    case "map":
      readMapEntry(reader, message2.get(field), options);
      break;
  }
}
function readMapEntry(reader, map, options) {
  const field = map.field();
  let key, val;
  const end = reader.pos + reader.uint32();
  while (reader.pos < end) {
    const [fieldNo] = reader.tag();
    switch (fieldNo) {
      case 1:
        key = readScalar(reader, field.mapKey);
        break;
      case 2:
        switch (field.mapKind) {
          case "scalar":
            val = readScalar(reader, field.scalar);
            break;
          case "enum":
            val = reader.int32();
            break;
          case "message":
            val = readMessageField(reader, options, field);
            break;
        }
        break;
    }
  }
  if (key === void 0) {
    key = scalarZeroValue(field.mapKey, false);
  }
  if (val === void 0) {
    switch (field.mapKind) {
      case "scalar":
        val = scalarZeroValue(field.scalar, false);
        break;
      case "enum":
        val = field.enum.values[0].number;
        break;
      case "message":
        val = reflect(field.message, void 0, false);
        break;
    }
  }
  map.set(key, val);
}
function readListField(reader, wireType, list, options) {
  var _a;
  const field = list.field();
  if (field.listKind === "message") {
    list.add(readMessageField(reader, options, field));
    return;
  }
  const scalarType = (_a = field.scalar) !== null && _a !== void 0 ? _a : ScalarType.INT32;
  const packed = wireType == WireType.LengthDelimited && scalarType != ScalarType.STRING && scalarType != ScalarType.BYTES;
  if (!packed) {
    list.add(readScalar(reader, scalarType));
    return;
  }
  const e = reader.uint32() + reader.pos;
  while (reader.pos < e) {
    list.add(readScalar(reader, scalarType));
  }
}
function readMessageField(reader, options, field, mergeMessage) {
  const delimited = field.delimitedEncoding;
  const message2 = mergeMessage !== null && mergeMessage !== void 0 ? mergeMessage : reflect(field.message, void 0, false);
  readMessage(message2, reader, options, delimited, delimited ? field.number : reader.uint32());
  return message2;
}
function readScalar(reader, type) {
  switch (type) {
    case ScalarType.STRING:
      return reader.string();
    case ScalarType.BOOL:
      return reader.bool();
    case ScalarType.DOUBLE:
      return reader.double();
    case ScalarType.FLOAT:
      return reader.float();
    case ScalarType.INT32:
      return reader.int32();
    case ScalarType.INT64:
      return reader.int64();
    case ScalarType.UINT64:
      return reader.uint64();
    case ScalarType.FIXED64:
      return reader.fixed64();
    case ScalarType.BYTES:
      return reader.bytes();
    case ScalarType.FIXED32:
      return reader.fixed32();
    case ScalarType.SFIXED32:
      return reader.sfixed32();
    case ScalarType.SFIXED64:
      return reader.sfixed64();
    case ScalarType.SINT64:
      return reader.sint64();
    case ScalarType.UINT32:
      return reader.uint32();
    case ScalarType.SINT32:
      return reader.sint32();
  }
}

// node_modules/.pnpm/@bufbuild+protobuf@2.2.3/node_modules/@bufbuild/protobuf/dist/esm/codegenv1/file.js
function fileDesc(b64, imports) {
  var _a;
  const root = fromBinary(FileDescriptorProtoSchema, base64Decode(b64));
  root.messageType.forEach(restoreJsonNames);
  root.dependency = (_a = imports === null || imports === void 0 ? void 0 : imports.map((f) => f.proto.name)) !== null && _a !== void 0 ? _a : [];
  const reg = createFileRegistry(root, (protoFileName) => imports === null || imports === void 0 ? void 0 : imports.find((f) => f.proto.name === protoFileName));
  return reg.getFile(root.name);
}

// node_modules/.pnpm/@bufbuild+protobuf@2.2.3/node_modules/@bufbuild/protobuf/dist/esm/wkt/gen/google/protobuf/any_pb.js
var file_google_protobuf_any = /* @__PURE__ */ fileDesc("Chlnb29nbGUvcHJvdG9idWYvYW55LnByb3RvEg9nb29nbGUucHJvdG9idWYiJgoDQW55EhAKCHR5cGVfdXJsGAEgASgJEg0KBXZhbHVlGAIgASgMQnYKE2NvbS5nb29nbGUucHJvdG9idWZCCEFueVByb3RvUAFaLGdvb2dsZS5nb2xhbmcub3JnL3Byb3RvYnVmL3R5cGVzL2tub3duL2FueXBiogIDR1BCqgIeR29vZ2xlLlByb3RvYnVmLldlbGxLbm93blR5cGVzYgZwcm90bzM");
var AnySchema = /* @__PURE__ */ messageDesc(file_google_protobuf_any, 0);

// node_modules/.pnpm/@bufbuild+protobuf@2.2.3/node_modules/@bufbuild/protobuf/dist/esm/to-binary.js
var LEGACY_REQUIRED2 = 3;
var writeDefaults = {
  writeUnknownFields: true
};
function makeWriteOptions(options) {
  return options ? Object.assign(Object.assign({}, writeDefaults), options) : writeDefaults;
}
function toBinary(schema, message2, options) {
  return writeFields(new BinaryWriter(), makeWriteOptions(options), reflect(schema, message2)).finish();
}
function writeFields(writer, opts, msg) {
  var _a;
  for (const f of msg.sortedFields) {
    if (!msg.isSet(f)) {
      if (f.presence == LEGACY_REQUIRED2) {
        throw new Error(`cannot encode field ${msg.desc.typeName}.${f.name} to binary: required field not set`);
      }
      continue;
    }
    writeField(writer, opts, msg, f);
  }
  if (opts.writeUnknownFields) {
    for (const { no, wireType, data } of (_a = msg.getUnknown()) !== null && _a !== void 0 ? _a : []) {
      writer.tag(no, wireType).raw(data);
    }
  }
  return writer;
}
function writeField(writer, opts, msg, field) {
  var _a;
  switch (field.fieldKind) {
    case "scalar":
    case "enum":
      writeScalar(writer, (_a = field.scalar) !== null && _a !== void 0 ? _a : ScalarType.INT32, field.number, msg.get(field));
      break;
    case "list":
      writeListField(writer, opts, field, msg.get(field));
      break;
    case "message":
      writeMessageField(writer, opts, field, msg.get(field));
      break;
    case "map":
      for (const [key, val] of msg.get(field)) {
        writeMapEntry(writer, opts, field, key, val);
      }
      break;
  }
}
function writeScalar(writer, scalarType, fieldNo, value) {
  writeScalarValue(writer.tag(fieldNo, writeTypeOfScalar(scalarType)), scalarType, value);
}
function writeMessageField(writer, opts, field, message2) {
  if (field.delimitedEncoding) {
    writeFields(writer.tag(field.number, WireType.StartGroup), opts, message2).tag(field.number, WireType.EndGroup);
  } else {
    writeFields(writer.tag(field.number, WireType.LengthDelimited).fork(), opts, message2).join();
  }
}
function writeListField(writer, opts, field, list) {
  var _a;
  if (field.listKind == "message") {
    for (const item of list) {
      writeMessageField(writer, opts, field, item);
    }
    return;
  }
  const scalarType = (_a = field.scalar) !== null && _a !== void 0 ? _a : ScalarType.INT32;
  if (field.packed) {
    if (!list.size) {
      return;
    }
    writer.tag(field.number, WireType.LengthDelimited).fork();
    for (const item of list) {
      writeScalarValue(writer, scalarType, item);
    }
    writer.join();
    return;
  }
  for (const item of list) {
    writeScalar(writer, scalarType, field.number, item);
  }
}
function writeMapEntry(writer, opts, field, key, value) {
  var _a;
  writer.tag(field.number, WireType.LengthDelimited).fork();
  writeScalar(writer, field.mapKey, 1, key);
  switch (field.mapKind) {
    case "scalar":
    case "enum":
      writeScalar(writer, (_a = field.scalar) !== null && _a !== void 0 ? _a : ScalarType.INT32, 2, value);
      break;
    case "message":
      writeFields(writer.tag(2, WireType.LengthDelimited).fork(), opts, value).join();
      break;
  }
  writer.join();
}
function writeScalarValue(writer, type, value) {
  switch (type) {
    case ScalarType.STRING:
      writer.string(value);
      break;
    case ScalarType.BOOL:
      writer.bool(value);
      break;
    case ScalarType.DOUBLE:
      writer.double(value);
      break;
    case ScalarType.FLOAT:
      writer.float(value);
      break;
    case ScalarType.INT32:
      writer.int32(value);
      break;
    case ScalarType.INT64:
      writer.int64(value);
      break;
    case ScalarType.UINT64:
      writer.uint64(value);
      break;
    case ScalarType.FIXED64:
      writer.fixed64(value);
      break;
    case ScalarType.BYTES:
      writer.bytes(value);
      break;
    case ScalarType.FIXED32:
      writer.fixed32(value);
      break;
    case ScalarType.SFIXED32:
      writer.sfixed32(value);
      break;
    case ScalarType.SFIXED64:
      writer.sfixed64(value);
      break;
    case ScalarType.SINT64:
      writer.sint64(value);
      break;
    case ScalarType.UINT32:
      writer.uint32(value);
      break;
    case ScalarType.SINT32:
      writer.sint32(value);
      break;
  }
}
function writeTypeOfScalar(type) {
  switch (type) {
    case ScalarType.BYTES:
    case ScalarType.STRING:
      return WireType.LengthDelimited;
    case ScalarType.DOUBLE:
    case ScalarType.FIXED64:
    case ScalarType.SFIXED64:
      return WireType.Bit64;
    case ScalarType.FIXED32:
    case ScalarType.SFIXED32:
    case ScalarType.FLOAT:
      return WireType.Bit32;
    default:
      return WireType.Varint;
  }
}

// node_modules/.pnpm/@bufbuild+protobuf@2.2.3/node_modules/@bufbuild/protobuf/dist/esm/wkt/any.js
function anyPack(schema, message2, into) {
  let ret = false;
  if (!into) {
    into = create(AnySchema);
    ret = true;
  }
  into.value = toBinary(schema, message2);
  into.typeUrl = typeNameToUrl(message2.$typeName);
  return ret ? into : void 0;
}
function anyIs(any, descOrTypeName) {
  if (any.typeUrl === "") {
    return false;
  }
  const want = typeof descOrTypeName == "string" ? descOrTypeName : descOrTypeName.typeName;
  const got = typeUrlToName(any.typeUrl);
  return want === got;
}
function anyUnpack(any, registryOrMessageDesc) {
  if (any.typeUrl === "") {
    return void 0;
  }
  const desc = registryOrMessageDesc.kind == "message" ? registryOrMessageDesc : registryOrMessageDesc.getMessage(typeUrlToName(any.typeUrl));
  if (!desc || !anyIs(any, desc)) {
    return void 0;
  }
  return fromBinary(desc, any.value);
}
function typeNameToUrl(name) {
  return `type.googleapis.com/${name}`;
}
function typeUrlToName(url) {
  const slash = url.lastIndexOf("/");
  const name = slash >= 0 ? url.substring(slash + 1) : url;
  if (!name.length) {
    throw new Error(`invalid type url: ${url}`);
  }
  return name;
}

// node_modules/.pnpm/@bufbuild+protobuf@2.2.3/node_modules/@bufbuild/protobuf/dist/esm/wkt/gen/google/protobuf/struct_pb.js
var file_google_protobuf_struct = /* @__PURE__ */ fileDesc("Chxnb29nbGUvcHJvdG9idWYvc3RydWN0LnByb3RvEg9nb29nbGUucHJvdG9idWYihAEKBlN0cnVjdBIzCgZmaWVsZHMYASADKAsyIy5nb29nbGUucHJvdG9idWYuU3RydWN0LkZpZWxkc0VudHJ5GkUKC0ZpZWxkc0VudHJ5EgsKA2tleRgBIAEoCRIlCgV2YWx1ZRgCIAEoCzIWLmdvb2dsZS5wcm90b2J1Zi5WYWx1ZToCOAEi6gEKBVZhbHVlEjAKCm51bGxfdmFsdWUYASABKA4yGi5nb29nbGUucHJvdG9idWYuTnVsbFZhbHVlSAASFgoMbnVtYmVyX3ZhbHVlGAIgASgBSAASFgoMc3RyaW5nX3ZhbHVlGAMgASgJSAASFAoKYm9vbF92YWx1ZRgEIAEoCEgAEi8KDHN0cnVjdF92YWx1ZRgFIAEoCzIXLmdvb2dsZS5wcm90b2J1Zi5TdHJ1Y3RIABIwCgpsaXN0X3ZhbHVlGAYgASgLMhouZ29vZ2xlLnByb3RvYnVmLkxpc3RWYWx1ZUgAQgYKBGtpbmQiMwoJTGlzdFZhbHVlEiYKBnZhbHVlcxgBIAMoCzIWLmdvb2dsZS5wcm90b2J1Zi5WYWx1ZSobCglOdWxsVmFsdWUSDgoKTlVMTF9WQUxVRRAAQn8KE2NvbS5nb29nbGUucHJvdG9idWZCC1N0cnVjdFByb3RvUAFaL2dvb2dsZS5nb2xhbmcub3JnL3Byb3RvYnVmL3R5cGVzL2tub3duL3N0cnVjdHBi+AEBogIDR1BCqgIeR29vZ2xlLlByb3RvYnVmLldlbGxLbm93blR5cGVzYgZwcm90bzM");
var StructSchema = /* @__PURE__ */ messageDesc(file_google_protobuf_struct, 0);
var ValueSchema = /* @__PURE__ */ messageDesc(file_google_protobuf_struct, 1);
var ListValueSchema = /* @__PURE__ */ messageDesc(file_google_protobuf_struct, 2);
var NullValue;
(function(NullValue2) {
  NullValue2[NullValue2["NULL_VALUE"] = 0] = "NULL_VALUE";
})(NullValue || (NullValue = {}));

// node_modules/.pnpm/@bufbuild+protobuf@2.2.3/node_modules/@bufbuild/protobuf/dist/esm/extensions.js
function getExtension(message2, extension) {
  assertExtendee(extension, message2);
  const ufs = filterUnknownFields(message2.$unknown, extension);
  const [container, field, get] = createExtensionContainer(extension);
  for (const uf of ufs) {
    readField(container, new BinaryReader(uf.data), field, uf.wireType, {
      readUnknownFields: false
    });
  }
  return get();
}
function setExtension(message2, extension, value) {
  var _a;
  assertExtendee(extension, message2);
  const ufs = ((_a = message2.$unknown) !== null && _a !== void 0 ? _a : []).filter((uf) => uf.no !== extension.number);
  const [container, field] = createExtensionContainer(extension, value);
  const writer = new BinaryWriter();
  writeField(writer, { writeUnknownFields: false }, container, field);
  const reader = new BinaryReader(writer.finish());
  while (reader.pos < reader.len) {
    const [no, wireType] = reader.tag();
    const data = reader.skip(wireType, no);
    ufs.push({ no, wireType, data });
  }
  message2.$unknown = ufs;
}
function filterUnknownFields(unknownFields, extension) {
  if (unknownFields === void 0)
    return [];
  if (extension.fieldKind === "enum" || extension.fieldKind === "scalar") {
    for (let i = unknownFields.length - 1; i >= 0; --i) {
      if (unknownFields[i].no == extension.number) {
        return [unknownFields[i]];
      }
    }
    return [];
  }
  return unknownFields.filter((uf) => uf.no === extension.number);
}
function createExtensionContainer(extension, value) {
  const localName = extension.typeName;
  const field = Object.assign(Object.assign({}, extension), { kind: "field", parent: extension.extendee, localName });
  const desc = Object.assign(Object.assign({}, extension.extendee), { fields: [field], members: [field], oneofs: [] });
  const container = create(desc, value !== void 0 ? { [localName]: value } : void 0);
  return [
    reflect(desc, container),
    field,
    () => {
      const value2 = container[localName];
      if (value2 === void 0) {
        const desc2 = extension.message;
        if (isWrapperDesc(desc2)) {
          return scalarZeroValue(desc2.fields[0].scalar, desc2.fields[0].longAsString);
        }
        return create(desc2);
      }
      return value2;
    }
  ];
}
function assertExtendee(extension, message2) {
  if (extension.extendee.typeName != message2.$typeName) {
    throw new Error(`extension ${extension.typeName} can only be applied to message ${extension.extendee.typeName}`);
  }
}

// node_modules/.pnpm/@bufbuild+protobuf@2.2.3/node_modules/@bufbuild/protobuf/dist/esm/to-json.js
var LEGACY_REQUIRED3 = 3;
var IMPLICIT4 = 2;
var jsonWriteDefaults = {
  alwaysEmitImplicit: false,
  enumAsInteger: false,
  useProtoFieldName: false
};
function makeWriteOptions2(options) {
  return options ? Object.assign(Object.assign({}, jsonWriteDefaults), options) : jsonWriteDefaults;
}
function toJson(schema, message2, options) {
  return reflectToJson(reflect(schema, message2), makeWriteOptions2(options));
}
function reflectToJson(msg, opts) {
  var _a;
  const wktJson = tryWktToJson(msg, opts);
  if (wktJson !== void 0)
    return wktJson;
  const json = {};
  for (const f of msg.sortedFields) {
    if (!msg.isSet(f)) {
      if (f.presence == LEGACY_REQUIRED3) {
        throw new Error(`cannot encode field ${msg.desc.typeName}.${f.name} to JSON: required field not set`);
      }
      if (!opts.alwaysEmitImplicit || f.presence !== IMPLICIT4) {
        continue;
      }
    }
    const jsonValue = fieldToJson(f, msg.get(f), opts);
    if (jsonValue !== void 0) {
      json[jsonName(f, opts)] = jsonValue;
    }
  }
  if (opts.registry) {
    const tagSeen = /* @__PURE__ */ new Set();
    for (const uf of (_a = msg.getUnknown()) !== null && _a !== void 0 ? _a : []) {
      if (tagSeen.has(uf.no)) {
        continue;
      }
      const extension = opts.registry.getExtensionFor(msg.desc, uf.no);
      if (!extension) {
        continue;
      }
      const value = getExtension(msg.message, extension);
      const [container, field] = createExtensionContainer(extension, value);
      const jsonValue = fieldToJson(field, container.get(field), opts);
      if (jsonValue !== void 0) {
        json[extension.jsonName] = jsonValue;
      }
    }
  }
  return json;
}
function fieldToJson(f, val, opts) {
  switch (f.fieldKind) {
    case "scalar":
      return scalarToJson(f, val);
    case "message":
      return reflectToJson(val, opts);
    case "enum":
      return enumToJsonInternal(f.enum, val, opts.enumAsInteger);
    case "list":
      return listToJson(val, opts);
    case "map":
      return mapToJson(val, opts);
  }
}
function mapToJson(map, opts) {
  const f = map.field();
  const jsonObj = {};
  switch (f.mapKind) {
    case "scalar":
      for (const [entryKey, entryValue] of map) {
        jsonObj[entryKey] = scalarToJson(f, entryValue);
      }
      break;
    case "message":
      for (const [entryKey, entryValue] of map) {
        jsonObj[entryKey] = reflectToJson(entryValue, opts);
      }
      break;
    case "enum":
      for (const [entryKey, entryValue] of map) {
        jsonObj[entryKey] = enumToJsonInternal(f.enum, entryValue, opts.enumAsInteger);
      }
      break;
  }
  return opts.alwaysEmitImplicit || map.size > 0 ? jsonObj : void 0;
}
function listToJson(list, opts) {
  const f = list.field();
  const jsonArr = [];
  switch (f.listKind) {
    case "scalar":
      for (const item of list) {
        jsonArr.push(scalarToJson(f, item));
      }
      break;
    case "enum":
      for (const item of list) {
        jsonArr.push(enumToJsonInternal(f.enum, item, opts.enumAsInteger));
      }
      break;
    case "message":
      for (const item of list) {
        jsonArr.push(reflectToJson(item, opts));
      }
      break;
  }
  return opts.alwaysEmitImplicit || jsonArr.length > 0 ? jsonArr : void 0;
}
function enumToJsonInternal(desc, value, enumAsInteger) {
  var _a;
  if (typeof value != "number") {
    throw new Error(`cannot encode ${desc} to JSON: expected number, got ${formatVal(value)}`);
  }
  if (desc.typeName == "google.protobuf.NullValue") {
    return null;
  }
  if (enumAsInteger) {
    return value;
  }
  const val = desc.value[value];
  return (_a = val === null || val === void 0 ? void 0 : val.name) !== null && _a !== void 0 ? _a : value;
}
function scalarToJson(field, value) {
  var _a, _b, _c, _d, _e, _f;
  switch (field.scalar) {
    // int32, fixed32, uint32: JSON value will be a decimal number. Either numbers or strings are accepted.
    case ScalarType.INT32:
    case ScalarType.SFIXED32:
    case ScalarType.SINT32:
    case ScalarType.FIXED32:
    case ScalarType.UINT32:
      if (typeof value != "number") {
        throw new Error(`cannot encode ${field} to JSON: ${(_a = checkField(field, value)) === null || _a === void 0 ? void 0 : _a.message}`);
      }
      return value;
    // float, double: JSON value will be a number or one of the special string values "NaN", "Infinity", and "-Infinity".
    // Either numbers or strings are accepted. Exponent notation is also accepted.
    case ScalarType.FLOAT:
    case ScalarType.DOUBLE:
      if (typeof value != "number") {
        throw new Error(`cannot encode ${field} to JSON: ${(_b = checkField(field, value)) === null || _b === void 0 ? void 0 : _b.message}`);
      }
      if (isNaN(value))
        return "NaN";
      if (value === Number.POSITIVE_INFINITY)
        return "Infinity";
      if (value === Number.NEGATIVE_INFINITY)
        return "-Infinity";
      return value;
    // string:
    case ScalarType.STRING:
      if (typeof value != "string") {
        throw new Error(`cannot encode ${field} to JSON: ${(_c = checkField(field, value)) === null || _c === void 0 ? void 0 : _c.message}`);
      }
      return value;
    // bool:
    case ScalarType.BOOL:
      if (typeof value != "boolean") {
        throw new Error(`cannot encode ${field} to JSON: ${(_d = checkField(field, value)) === null || _d === void 0 ? void 0 : _d.message}`);
      }
      return value;
    // JSON value will be a decimal string. Either numbers or strings are accepted.
    case ScalarType.UINT64:
    case ScalarType.FIXED64:
    case ScalarType.INT64:
    case ScalarType.SFIXED64:
    case ScalarType.SINT64:
      if (typeof value != "bigint" && typeof value != "string") {
        throw new Error(`cannot encode ${field} to JSON: ${(_e = checkField(field, value)) === null || _e === void 0 ? void 0 : _e.message}`);
      }
      return value.toString();
    // bytes: JSON value will be the data encoded as a string using standard base64 encoding with paddings.
    // Either standard or URL-safe base64 encoding with/without paddings are accepted.
    case ScalarType.BYTES:
      if (value instanceof Uint8Array) {
        return base64Encode(value);
      }
      throw new Error(`cannot encode ${field} to JSON: ${(_f = checkField(field, value)) === null || _f === void 0 ? void 0 : _f.message}`);
  }
}
function jsonName(f, opts) {
  return opts.useProtoFieldName ? f.name : f.jsonName;
}
function tryWktToJson(msg, opts) {
  if (!msg.desc.typeName.startsWith("google.protobuf.")) {
    return void 0;
  }
  switch (msg.desc.typeName) {
    case "google.protobuf.Any":
      return anyToJson(msg.message, opts);
    case "google.protobuf.Timestamp":
      return timestampToJson(msg.message);
    case "google.protobuf.Duration":
      return durationToJson(msg.message);
    case "google.protobuf.FieldMask":
      return fieldMaskToJson(msg.message);
    case "google.protobuf.Struct":
      return structToJson(msg.message);
    case "google.protobuf.Value":
      return valueToJson(msg.message);
    case "google.protobuf.ListValue":
      return listValueToJson(msg.message);
    default:
      if (isWrapperDesc(msg.desc)) {
        const valueField = msg.desc.fields[0];
        return scalarToJson(valueField, msg.get(valueField));
      }
      return void 0;
  }
}
function anyToJson(val, opts) {
  if (val.typeUrl === "") {
    return {};
  }
  const { registry } = opts;
  let message2;
  let desc;
  if (registry) {
    message2 = anyUnpack(val, registry);
    if (message2) {
      desc = registry.getMessage(message2.$typeName);
    }
  }
  if (!desc || !message2) {
    throw new Error(`cannot encode message ${val.$typeName} to JSON: "${val.typeUrl}" is not in the type registry`);
  }
  let json = reflectToJson(reflect(desc, message2), opts);
  if (desc.typeName.startsWith("google.protobuf.") || json === null || Array.isArray(json) || typeof json !== "object") {
    json = { value: json };
  }
  json["@type"] = val.typeUrl;
  return json;
}
function durationToJson(val) {
  if (Number(val.seconds) > 315576e6 || Number(val.seconds) < -315576e6) {
    throw new Error(`cannot encode message ${val.$typeName} to JSON: value out of range`);
  }
  let text = val.seconds.toString();
  if (val.nanos !== 0) {
    let nanosStr = Math.abs(val.nanos).toString();
    nanosStr = "0".repeat(9 - nanosStr.length) + nanosStr;
    if (nanosStr.substring(3) === "000000") {
      nanosStr = nanosStr.substring(0, 3);
    } else if (nanosStr.substring(6) === "000") {
      nanosStr = nanosStr.substring(0, 6);
    }
    text += "." + nanosStr;
    if (val.nanos < 0 && Number(val.seconds) == 0) {
      text = "-" + text;
    }
  }
  return text + "s";
}
function fieldMaskToJson(val) {
  return val.paths.map((p) => {
    if (p.match(/_[0-9]?_/g) || p.match(/[A-Z]/g)) {
      throw new Error(`cannot encode message ${val.$typeName} to JSON: lowerCamelCase of path name "` + p + '" is irreversible');
    }
    return protoCamelCase(p);
  }).join(",");
}
function structToJson(val) {
  const json = {};
  for (const [k, v] of Object.entries(val.fields)) {
    json[k] = valueToJson(v);
  }
  return json;
}
function valueToJson(val) {
  switch (val.kind.case) {
    case "nullValue":
      return null;
    case "numberValue":
      if (!Number.isFinite(val.kind.value)) {
        throw new Error(`${val.$typeName} cannot be NaN or Infinity`);
      }
      return val.kind.value;
    case "boolValue":
      return val.kind.value;
    case "stringValue":
      return val.kind.value;
    case "structValue":
      return structToJson(val.kind.value);
    case "listValue":
      return listValueToJson(val.kind.value);
    default:
      throw new Error(`${val.$typeName} must have a value`);
  }
}
function listValueToJson(val) {
  return val.values.map(valueToJson);
}
function timestampToJson(val) {
  const ms = Number(val.seconds) * 1e3;
  if (ms < Date.parse("0001-01-01T00:00:00Z") || ms > Date.parse("9999-12-31T23:59:59Z")) {
    throw new Error(`cannot encode message ${val.$typeName} to JSON: must be from 0001-01-01T00:00:00Z to 9999-12-31T23:59:59Z inclusive`);
  }
  if (val.nanos < 0) {
    throw new Error(`cannot encode message ${val.$typeName} to JSON: nanos must not be negative`);
  }
  let z = "Z";
  if (val.nanos > 0) {
    const nanosStr = (val.nanos + 1e9).toString().substring(1);
    if (nanosStr.substring(3) === "000000") {
      z = "." + nanosStr.substring(0, 3) + "Z";
    } else if (nanosStr.substring(6) === "000") {
      z = "." + nanosStr.substring(0, 6) + "Z";
    } else {
      z = "." + nanosStr + "Z";
    }
  }
  return new Date(ms).toISOString().replace(".000Z", z);
}

// node_modules/.pnpm/@bufbuild+protobuf@2.2.3/node_modules/@bufbuild/protobuf/dist/esm/from-json.js
var jsonReadDefaults = {
  ignoreUnknownFields: false
};
function makeReadOptions2(options) {
  return options ? Object.assign(Object.assign({}, jsonReadDefaults), options) : jsonReadDefaults;
}
function fromJson(schema, json, options) {
  const msg = reflect(schema);
  try {
    readMessage2(msg, json, makeReadOptions2(options));
  } catch (e) {
    if (isFieldError(e)) {
      throw new Error(`cannot decode ${e.field()} from JSON: ${e.message}`, {
        cause: e
      });
    }
    throw e;
  }
  return msg.message;
}
function readMessage2(msg, json, opts) {
  var _a;
  if (tryWktFromJson(msg, json, opts)) {
    return;
  }
  if (json == null || Array.isArray(json) || typeof json != "object") {
    throw new Error(`cannot decode ${msg.desc} from JSON: ${formatVal(json)}`);
  }
  const oneofSeen = /* @__PURE__ */ new Map();
  const jsonNames = /* @__PURE__ */ new Map();
  for (const field of msg.desc.fields) {
    jsonNames.set(field.name, field).set(field.jsonName, field);
  }
  for (const [jsonKey, jsonValue] of Object.entries(json)) {
    const field = jsonNames.get(jsonKey);
    if (field) {
      if (field.oneof) {
        if (jsonValue === null && field.fieldKind == "scalar") {
          continue;
        }
        const seen = oneofSeen.get(field.oneof);
        if (seen !== void 0) {
          throw new FieldError(field.oneof, `oneof set multiple times by ${seen.name} and ${field.name}`);
        }
        oneofSeen.set(field.oneof, field);
      }
      readField2(msg, field, jsonValue, opts);
    } else {
      let extension = void 0;
      if (jsonKey.startsWith("[") && jsonKey.endsWith("]") && (extension = (_a = opts.registry) === null || _a === void 0 ? void 0 : _a.getExtension(jsonKey.substring(1, jsonKey.length - 1))) && extension.extendee.typeName === msg.desc.typeName) {
        const [container, field2, get] = createExtensionContainer(extension);
        readField2(container, field2, jsonValue, opts);
        setExtension(msg.message, extension, get());
      }
      if (!extension && !opts.ignoreUnknownFields) {
        throw new Error(`cannot decode ${msg.desc} from JSON: key "${jsonKey}" is unknown`);
      }
    }
  }
}
function readField2(msg, field, json, opts) {
  switch (field.fieldKind) {
    case "scalar":
      readScalarField(msg, field, json);
      break;
    case "enum":
      readEnumField(msg, field, json, opts);
      break;
    case "message":
      readMessageField2(msg, field, json, opts);
      break;
    case "list":
      readListField2(msg.get(field), json, opts);
      break;
    case "map":
      readMapField(msg.get(field), json, opts);
      break;
  }
}
function readMapField(map, json, opts) {
  if (json === null) {
    return;
  }
  const field = map.field();
  if (typeof json != "object" || Array.isArray(json)) {
    throw new FieldError(field, "expected object, got " + formatVal(json));
  }
  for (const [jsonMapKey, jsonMapValue] of Object.entries(json)) {
    if (jsonMapValue === null) {
      throw new FieldError(field, "map value must not be null");
    }
    let value;
    switch (field.mapKind) {
      case "message":
        const msgValue = reflect(field.message);
        readMessage2(msgValue, jsonMapValue, opts);
        value = msgValue;
        break;
      case "enum":
        value = readEnum(field.enum, jsonMapValue, opts.ignoreUnknownFields, true);
        if (value === tokenIgnoredUnknownEnum) {
          return;
        }
        break;
      case "scalar":
        value = scalarFromJson(field, jsonMapValue, true);
        break;
    }
    const key = mapKeyFromJson(field.mapKey, jsonMapKey);
    map.set(key, value);
  }
}
function readListField2(list, json, opts) {
  if (json === null) {
    return;
  }
  const field = list.field();
  if (!Array.isArray(json)) {
    throw new FieldError(field, "expected Array, got " + formatVal(json));
  }
  for (const jsonItem of json) {
    if (jsonItem === null) {
      throw new FieldError(field, "list item must not be null");
    }
    switch (field.listKind) {
      case "message":
        const msgValue = reflect(field.message);
        readMessage2(msgValue, jsonItem, opts);
        list.add(msgValue);
        break;
      case "enum":
        const enumValue = readEnum(field.enum, jsonItem, opts.ignoreUnknownFields, true);
        if (enumValue !== tokenIgnoredUnknownEnum) {
          list.add(enumValue);
        }
        break;
      case "scalar":
        list.add(scalarFromJson(field, jsonItem, true));
        break;
    }
  }
}
function readMessageField2(msg, field, json, opts) {
  if (json === null && field.message.typeName != "google.protobuf.Value") {
    msg.clear(field);
    return;
  }
  const msgValue = msg.isSet(field) ? msg.get(field) : reflect(field.message);
  readMessage2(msgValue, json, opts);
  msg.set(field, msgValue);
}
function readEnumField(msg, field, json, opts) {
  const enumValue = readEnum(field.enum, json, opts.ignoreUnknownFields, false);
  if (enumValue === tokenNull) {
    msg.clear(field);
  } else if (enumValue !== tokenIgnoredUnknownEnum) {
    msg.set(field, enumValue);
  }
}
function readScalarField(msg, field, json) {
  const scalarValue = scalarFromJson(field, json, false);
  if (scalarValue === tokenNull) {
    msg.clear(field);
  } else {
    msg.set(field, scalarValue);
  }
}
var tokenIgnoredUnknownEnum = /* @__PURE__ */ Symbol();
function readEnum(desc, json, ignoreUnknownFields, nullAsZeroValue) {
  if (json === null) {
    if (desc.typeName == "google.protobuf.NullValue") {
      return 0;
    }
    return nullAsZeroValue ? desc.values[0].number : tokenNull;
  }
  switch (typeof json) {
    case "number":
      if (Number.isInteger(json)) {
        return json;
      }
      break;
    case "string":
      const value = desc.values.find((ev) => ev.name === json);
      if (value !== void 0) {
        return value.number;
      }
      if (ignoreUnknownFields) {
        return tokenIgnoredUnknownEnum;
      }
      break;
  }
  throw new Error(`cannot decode ${desc} from JSON: ${formatVal(json)}`);
}
var tokenNull = /* @__PURE__ */ Symbol();
function scalarFromJson(field, json, nullAsZeroValue) {
  if (json === null) {
    if (nullAsZeroValue) {
      return scalarZeroValue(field.scalar, false);
    }
    return tokenNull;
  }
  switch (field.scalar) {
    // float, double: JSON value will be a number or one of the special string values "NaN", "Infinity", and "-Infinity".
    // Either numbers or strings are accepted. Exponent notation is also accepted.
    case ScalarType.DOUBLE:
    case ScalarType.FLOAT:
      if (json === "NaN")
        return NaN;
      if (json === "Infinity")
        return Number.POSITIVE_INFINITY;
      if (json === "-Infinity")
        return Number.NEGATIVE_INFINITY;
      if (typeof json == "number") {
        if (isNaN(json)) {
          throw new FieldError(field, "unexpected NaN number");
        }
        if (!isFinite(json)) {
          throw new FieldError(field, "unexpected infinite number");
        }
        break;
      }
      if (typeof json == "string") {
        if (json === "") {
          break;
        }
        if (json.trim().length !== json.length) {
          break;
        }
        const float = Number(json);
        if (!isFinite(float)) {
          break;
        }
        return float;
      }
      break;
    // int32, fixed32, uint32: JSON value will be a decimal number. Either numbers or strings are accepted.
    case ScalarType.INT32:
    case ScalarType.FIXED32:
    case ScalarType.SFIXED32:
    case ScalarType.SINT32:
    case ScalarType.UINT32:
      return int32FromJson(json);
    // bytes: JSON value will be the data encoded as a string using standard base64 encoding with paddings.
    // Either standard or URL-safe base64 encoding with/without paddings are accepted.
    case ScalarType.BYTES:
      if (typeof json == "string") {
        if (json === "") {
          return new Uint8Array(0);
        }
        try {
          return base64Decode(json);
        } catch (e) {
          const message2 = e instanceof Error ? e.message : String(e);
          throw new FieldError(field, message2);
        }
      }
      break;
  }
  return json;
}
function mapKeyFromJson(type, json) {
  switch (type) {
    case ScalarType.BOOL:
      switch (json) {
        case "true":
          return true;
        case "false":
          return false;
      }
      return json;
    case ScalarType.INT32:
    case ScalarType.FIXED32:
    case ScalarType.UINT32:
    case ScalarType.SFIXED32:
    case ScalarType.SINT32:
      return int32FromJson(json);
    default:
      return json;
  }
}
function int32FromJson(json) {
  if (typeof json == "string") {
    if (json === "") {
      return json;
    }
    if (json.trim().length !== json.length) {
      return json;
    }
    const num = Number(json);
    if (Number.isNaN(num)) {
      return json;
    }
    return num;
  }
  return json;
}
function tryWktFromJson(msg, jsonValue, opts) {
  if (!msg.desc.typeName.startsWith("google.protobuf.")) {
    return false;
  }
  switch (msg.desc.typeName) {
    case "google.protobuf.Any":
      anyFromJson(msg.message, jsonValue, opts);
      return true;
    case "google.protobuf.Timestamp":
      timestampFromJson(msg.message, jsonValue);
      return true;
    case "google.protobuf.Duration":
      durationFromJson(msg.message, jsonValue);
      return true;
    case "google.protobuf.FieldMask":
      fieldMaskFromJson(msg.message, jsonValue);
      return true;
    case "google.protobuf.Struct":
      structFromJson(msg.message, jsonValue);
      return true;
    case "google.protobuf.Value":
      valueFromJson(msg.message, jsonValue);
      return true;
    case "google.protobuf.ListValue":
      listValueFromJson(msg.message, jsonValue);
      return true;
    default:
      if (isWrapperDesc(msg.desc)) {
        const valueField = msg.desc.fields[0];
        if (jsonValue === null) {
          msg.clear(valueField);
        } else {
          msg.set(valueField, scalarFromJson(valueField, jsonValue, true));
        }
        return true;
      }
      return false;
  }
}
function anyFromJson(any, json, opts) {
  var _a;
  if (json === null || Array.isArray(json) || typeof json != "object") {
    throw new Error(`cannot decode message ${any.$typeName} from JSON: expected object but got ${formatVal(json)}`);
  }
  if (Object.keys(json).length == 0) {
    return;
  }
  const typeUrl = json["@type"];
  if (typeof typeUrl != "string" || typeUrl == "") {
    throw new Error(`cannot decode message ${any.$typeName} from JSON: "@type" is empty`);
  }
  const typeName = typeUrl.includes("/") ? typeUrl.substring(typeUrl.lastIndexOf("/") + 1) : typeUrl;
  if (!typeName.length) {
    throw new Error(`cannot decode message ${any.$typeName} from JSON: "@type" is invalid`);
  }
  const desc = (_a = opts.registry) === null || _a === void 0 ? void 0 : _a.getMessage(typeName);
  if (!desc) {
    throw new Error(`cannot decode message ${any.$typeName} from JSON: ${typeUrl} is not in the type registry`);
  }
  const msg = reflect(desc);
  if (typeName.startsWith("google.protobuf.") && Object.prototype.hasOwnProperty.call(json, "value")) {
    const value = json["value"];
    readMessage2(msg, value, opts);
  } else {
    const copy = Object.assign({}, json);
    delete copy["@type"];
    readMessage2(msg, copy, opts);
  }
  anyPack(msg.desc, msg.message, any);
}
function timestampFromJson(timestamp, json) {
  if (typeof json !== "string") {
    throw new Error(`cannot decode message ${timestamp.$typeName} from JSON: ${formatVal(json)}`);
  }
  const matches = json.match(/^([0-9]{4})-([0-9]{2})-([0-9]{2})T([0-9]{2}):([0-9]{2}):([0-9]{2})(?:Z|\.([0-9]{3,9})Z|([+-][0-9][0-9]:[0-9][0-9]))$/);
  if (!matches) {
    throw new Error(`cannot decode message ${timestamp.$typeName} from JSON: invalid RFC 3339 string`);
  }
  const ms = Date.parse(
    //prettier-ignore
    matches[1] + "-" + matches[2] + "-" + matches[3] + "T" + matches[4] + ":" + matches[5] + ":" + matches[6] + (matches[8] ? matches[8] : "Z")
  );
  if (Number.isNaN(ms)) {
    throw new Error(`cannot decode message ${timestamp.$typeName} from JSON: invalid RFC 3339 string`);
  }
  if (ms < Date.parse("0001-01-01T00:00:00Z") || ms > Date.parse("9999-12-31T23:59:59Z")) {
    throw new Error(`cannot decode message ${timestamp.$typeName} from JSON: must be from 0001-01-01T00:00:00Z to 9999-12-31T23:59:59Z inclusive`);
  }
  timestamp.seconds = protoInt64.parse(ms / 1e3);
  timestamp.nanos = 0;
  if (matches[7]) {
    timestamp.nanos = parseInt("1" + matches[7] + "0".repeat(9 - matches[7].length)) - 1e9;
  }
}
function durationFromJson(duration, json) {
  if (typeof json !== "string") {
    throw new Error(`cannot decode message ${duration.$typeName} from JSON: ${formatVal(json)}`);
  }
  const match = json.match(/^(-?[0-9]+)(?:\.([0-9]+))?s/);
  if (match === null) {
    throw new Error(`cannot decode message ${duration.$typeName} from JSON: ${formatVal(json)}`);
  }
  const longSeconds = Number(match[1]);
  if (longSeconds > 315576e6 || longSeconds < -315576e6) {
    throw new Error(`cannot decode message ${duration.$typeName} from JSON: ${formatVal(json)}`);
  }
  duration.seconds = protoInt64.parse(longSeconds);
  if (typeof match[2] !== "string") {
    return;
  }
  const nanosStr = match[2] + "0".repeat(9 - match[2].length);
  duration.nanos = parseInt(nanosStr);
  if (longSeconds < 0 || Object.is(longSeconds, -0)) {
    duration.nanos = -duration.nanos;
  }
}
function fieldMaskFromJson(fieldMask, json) {
  if (typeof json !== "string") {
    throw new Error(`cannot decode message ${fieldMask.$typeName} from JSON: ${formatVal(json)}`);
  }
  if (json === "") {
    return;
  }
  function camelToSnake(str) {
    if (str.includes("_")) {
      throw new Error(`cannot decode message ${fieldMask.$typeName} from JSON: path names must be lowerCamelCase`);
    }
    const sc = str.replace(/[A-Z]/g, (letter) => "_" + letter.toLowerCase());
    return sc[0] === "_" ? sc.substring(1) : sc;
  }
  fieldMask.paths = json.split(",").map(camelToSnake);
}
function structFromJson(struct, json) {
  if (typeof json != "object" || json == null || Array.isArray(json)) {
    throw new Error(`cannot decode message ${struct.$typeName} from JSON ${formatVal(json)}`);
  }
  for (const [k, v] of Object.entries(json)) {
    const parsedV = create(ValueSchema);
    valueFromJson(parsedV, v);
    struct.fields[k] = parsedV;
  }
}
function valueFromJson(value, json) {
  switch (typeof json) {
    case "number":
      value.kind = { case: "numberValue", value: json };
      break;
    case "string":
      value.kind = { case: "stringValue", value: json };
      break;
    case "boolean":
      value.kind = { case: "boolValue", value: json };
      break;
    case "object":
      if (json === null) {
        value.kind = { case: "nullValue", value: NullValue.NULL_VALUE };
      } else if (Array.isArray(json)) {
        const listValue = create(ListValueSchema);
        listValueFromJson(listValue, json);
        value.kind = { case: "listValue", value: listValue };
      } else {
        const struct = create(StructSchema);
        structFromJson(struct, json);
        value.kind = { case: "structValue", value: struct };
      }
      break;
    default:
      throw new Error(`cannot decode message ${value.$typeName} from JSON ${formatVal(json)}`);
  }
  return value;
}
function listValueFromJson(listValue, json) {
  if (!Array.isArray(json)) {
    throw new Error(`cannot decode message ${listValue.$typeName} from JSON ${formatVal(json)}`);
  }
  for (const e of json) {
    const value = create(ValueSchema);
    valueFromJson(value, e);
    listValue.values.push(value);
  }
}

// v2/generated/executor/v1/common_pb.ts
var file_executor_v1_common = /* @__PURE__ */ fileDesc("ChhleGVjdXRvci92MS9jb21tb24ucHJvdG8SC2V4ZWN1dG9yLnYxIrABCg1FeGVjdXRvckVycm9yEiQKBGNvZGUYASABKA4yFi5leGVjdXRvci52MS5FcnJvckNvZGUSDwoHbWVzc2FnZRgCIAEoCRI4CgdkZXRhaWxzGAMgAygLMicuZXhlY3V0b3IudjEuRXhlY3V0b3JFcnJvci5EZXRhaWxzRW50cnkaLgoMRGV0YWlsc0VudHJ5EgsKA2tleRgBIAEoCRINCgV2YWx1ZRgCIAEoCToCOAEiUgoJQWN0aW9uUmVmEhEKCWFjdGlvbl9pZBgBIAEoCRISCgpzZXNzaW9uX2lkGAIgASgJEg8KB2hvc3RfaWQYAyABKAkSDQoFZXBvY2gYBCABKAMiGgoKQ2FwYWJpbGl0eRIMCgRuYW1lGAEgASgJInUKDkV4ZWN1dGlvbkdyYW50EhUKDWFsbG93X25ldHdvcmsYASABKAgSEwoLYWxsb3dfcGF0aHMYAiADKAkSEwoLZnVsbF9hY2Nlc3MYAyABKAgSCwoDY3dkGAQgASgJEhUKDWVudl9hbGxvd2xpc3QYBSADKAkiNAoIUGxhdGZvcm0SCgoCb3MYASABKAkSDAoEYXJjaBgCIAEoCRIOCgZzaGVsbHMYAyADKAkiXQoKSG9zdExpbWl0cxIYChBtYXhfaW5saW5lX2J5dGVzGAEgASgDEhcKD21heF9mcmFtZV9ieXRlcxgCIAEoAxIcChRtYXhfaW5mbGlnaHRfYWN0aW9ucxgDIAEoBSJVCghGaWxlUm9vdBIPCgdyb290X2lkGAEgASgJEgwKBG5hbWUYAiABKAkSEAoId3JpdGFibGUYAyABKAgSGAoQdGVybWluYWxfYWxsb3dlZBgEIAEoCCJhCgtBcnRpZmFjdFJlZhITCgthcnRpZmFjdF9pZBgBIAEoCRIMCgRuYW1lGAIgASgJEhEKCW1pbWVfdHlwZRgDIAEoCRIMCgRzaXplGAQgASgDEg4KBnNoYTI1NhgFIAEoCSJeCgxMb2NhbEZpbGVSZWYSDwoHaG9zdF9pZBgBIAEoCRIPCgdyb290X2lkGAIgASgJEhUKDXJlbGF0aXZlX3BhdGgYAyABKAkSFQoNYWJzb2x1dGVfcGF0aBgEIAEoCSJxCglGaWxlVmFsdWUSLAoIYXJ0aWZhY3QYASABKAsyGC5leGVjdXRvci52MS5BcnRpZmFjdFJlZkgAEioKBWxvY2FsGAIgASgLMhkuZXhlY3V0b3IudjEuTG9jYWxGaWxlUmVmSABCCgoIbG9jYXRpb24iWwoLVXBsb2FkR3JhbnQSDAoEc2xvdBgBIAEoCRIPCgdwdXRfdXJsGAIgASgJEhoKEmV4cGlyZXNfYXRfdW5peF9tcxgDIAEoAxIRCgltYXhfYnl0ZXMYBCABKAMiZAoNRG93bmxvYWRHcmFudBIqCghhcnRpZmFjdBgBIAEoCzIYLmV4ZWN1dG9yLnYxLkFydGlmYWN0UmVmEgsKA3VybBgCIAEoCRIaChJleHBpcmVzX2F0X3VuaXhfbXMYAyABKAMiiQEKB0NvbnRlbnQSEQoJbWltZV90eXBlGAEgASgJEgwKBG5hbWUYAiABKAkSDgoEdGV4dBgKIAEoCUgAEiwKCGFydGlmYWN0GAsgASgLMhguZXhlY3V0b3IudjEuQXJ0aWZhY3RSZWZIABIWCgxyZXNvdXJjZV91cmkYDCABKAlIAEIHCgV2YWx1ZSpcCghIb3N0S2luZBIZChVIT1NUX0tJTkRfVU5TUEVDSUZJRUQQABIdChlIT1NUX0tJTkRfU0FOREJPWF9SVU5USU1FEAESFgoSSE9TVF9LSU5EX09QRVJBVE9SEAIq5QIKCUVycm9yQ29kZRIaChZFUlJPUl9DT0RFX1VOU1BFQ0lGSUVEEAASHwobRVJST1JfQ09ERV9JTlZBTElEX0FSR1VNRU5UEAESGAoURVJST1JfQ09ERV9OT1RfRk9VTkQQAhIgChxFUlJPUl9DT0RFX1BFUk1JU1NJT05fREVOSUVEEAMSGgoWRVJST1JfQ09ERV9VTlNVUFBPUlRFRBAEEhcKE0VSUk9SX0NPREVfQ09ORkxJQ1QQBRIWChJFUlJPUl9DT0RFX1RJTUVPVVQQBhIYChRFUlJPUl9DT0RFX0NBTkNFTExFRBAHEh8KG0VSUk9SX0NPREVfSE9TVF9VTkFWQUlMQUJMRRAIEiEKHUVSUk9SX0NPREVfUkVTT1VSQ0VfRVhIQVVTVEVEEAkSGwoXRVJST1JfQ09ERV9DT01NQU5EX0xPU1QQChIXChNFUlJPUl9DT0RFX0lOVEVSTkFMEAsqcgoLU2FuZGJveE1vZGUSHAoYU0FOREJPWF9NT0RFX1VOU1BFQ0lGSUVEEAASIAocU0FOREJPWF9NT0RFX1dPUktTUEFDRV9XUklURRABEiMKH1NBTkRCT1hfTU9ERV9EQU5HRVJfRlVMTF9BQ0NFU1MQAkLJAQoPY29tLmV4ZWN1dG9yLnYxQgtDb21tb25Qcm90b1ABWlxnaXRodWIuY29tL21hbnVzLWFpL21hbnVzLXNhbmRib3gvc2J4LWdvLXN2Yy9leGVjdXRvci1wcm90b2NvbC9zZGsvZ28vZXhlY3V0b3IvdjE7ZXhlY3V0b3J2MaICA0VYWKoCC0V4ZWN1dG9yLlYxygILRXhlY3V0b3JcVjHiAhdFeGVjdXRvclxWMVxHUEJNZXRhZGF0YeoCDEV4ZWN1dG9yOjpWMWIGcHJvdG8z");

// v2/generated/executor/v1/workflow_pb.ts
var file_executor_v1_workflow = /* @__PURE__ */ fileDesc("ChpleGVjdXRvci92MS93b3JrZmxvdy5wcm90bxILZXhlY3V0b3IudjEicAoRV29ya2Zsb3dGaWxlSW5wdXQSDAoEbmFtZRgBIAEoCRIVCgtwYXJlbnRfcGF0aBgKIAEoCUgAEiwKCGFydGlmYWN0GAsgASgLMhguZXhlY3V0b3IudjEuQXJ0aWZhY3RSZWZIAEIICgZzb3VyY2UiswEKDldvcmtmbG93TGltaXRzEh4KFnN5bmNocm9ub3VzX3RpbWVvdXRfbXMYASABKAMSFwoPd2FsbF90aW1lb3V0X21zGAIgASgDEhQKDG1lbW9yeV9ieXRlcxgDIAEoAxIZChFtYXhfYWdlbnRfZWZmZWN0cxgEIAEoDRIdChVtYXhfYWdlbnRfY29uY3VycmVuY3kYBSABKA0SGAoQbWF4X291dHB1dF9ieXRlcxgGIAEoAyLhAgoNV29ya2Zsb3dTdGFydBIOCgZzY3JpcHQYASABKAkSKwoGbGltaXRzGAIgASgLMhsuZXhlY3V0b3IudjEuV29ya2Zsb3dMaW1pdHMSOgoOZmFpbHVyZV9wb2xpY3kYAyABKA4yIi5leGVjdXRvci52MS5Xb3JrZmxvd0ZhaWx1cmVQb2xpY3kSOQoNaW5pdGlhbF9zdGF0ZRgEIAEoCzIiLmV4ZWN1dG9yLnYxLldvcmtmbG93U3RhdGVTbmFwc2hvdBIcChRkZWZhdWx0X2FnZW50X3NjaGVtYRgFIAEoCRI5Cg9kZWZhdWx0X3NhbmRib3gYBiABKA4yIC5leGVjdXRvci52MS5Xb3JrZmxvd1NhbmRib3hNb2RlEkMKFGRlZmF1bHRfZWZmb3J0X2xldmVsGAcgASgOMiUuZXhlY3V0b3IudjEuV29ya2Zsb3dBZ2VudEVmZm9ydExldmVsIssCChFXb3JrZmxvd0FnZW50Q2FsbBIOCgZwcm9tcHQYASABKAkSDgoGc2NoZW1hGAIgASgJEikKBWZpbGVzGAMgAygLMhYuZXhlY3V0b3IudjEuRmlsZVZhbHVlQgIYARIxCgdzYW5kYm94GAQgASgOMiAuZXhlY3V0b3IudjEuV29ya2Zsb3dTYW5kYm94TW9kZRIzCgtpbnB1dF9maWxlcxgFIAMoCzIeLmV4ZWN1dG9yLnYxLldvcmtmbG93RmlsZUlucHV0Eg0KBWJyaWVmGAYgASgJEhEKCWdyb3VwX2tleRgHIAEoCRITCgtncm91cF9icmllZhgIIAEoCRI7CgxlZmZvcnRfbGV2ZWwYCSABKA4yJS5leGVjdXRvci52MS5Xb3JrZmxvd0FnZW50RWZmb3J0TGV2ZWwSDwoHcHJvZmlsZRgKIAEoCSIeCgtXb3JrZmxvd0xvZxIPCgdtZXNzYWdlGAEgASgJIt4BChdXb3JrZmxvd0VmZmVjdFJlcXVlc3RlZBIjCgNyZWYYASABKAsyFi5leGVjdXRvci52MS5BY3Rpb25SZWYSDQoFaW5kZXgYAiABKA0SEQoJZWZmZWN0X2lkGAMgASgJEhIKCmlucHV0X2hhc2gYBCABKAkSNAoKYWdlbnRfY2FsbBgKIAEoCzIeLmV4ZWN1dG9yLnYxLldvcmtmbG93QWdlbnRDYWxsSAASJwoDbG9nGAsgASgLMhguZXhlY3V0b3IudjEuV29ya2Zsb3dMb2dIAEIJCgdyZXF1ZXN0ImQKFFdvcmtmbG93RWZmZWN0UmVzdWx0EiUKB2NvbnRlbnQYASADKAsyFC5leGVjdXRvci52MS5Db250ZW50EiUKBWZpbGVzGAIgAygLMhYuZXhlY3V0b3IudjEuRmlsZVZhbHVlIuEBChZXb3JrZmxvd0VmZmVjdFJlc29sdmVkEiMKA3JlZhgBIAEoCzIWLmV4ZWN1dG9yLnYxLkFjdGlvblJlZhINCgVpbmRleBgCIAEoDRIRCgllZmZlY3RfaWQYAyABKAkSEgoKaW5wdXRfaGFzaBgEIAEoCRIzCgZyZXN1bHQYCiABKAsyIS5leGVjdXRvci52MS5Xb3JrZmxvd0VmZmVjdFJlc3VsdEgAEisKBWVycm9yGAsgASgLMhouZXhlY3V0b3IudjEuRXhlY3V0b3JFcnJvckgAQgoKCHRlcm1pbmFsIroBChRXb3JrZmxvd0pvdXJuYWxFbnRyeRINCgVpbmRleBgBIAEoDRIRCgllZmZlY3RfaWQYAiABKAkSEgoKaW5wdXRfaGFzaBgDIAEoCRIzCgZyZXN1bHQYCiABKAsyIS5leGVjdXRvci52MS5Xb3JrZmxvd0VmZmVjdFJlc3VsdEgAEisKBWVycm9yGAsgASgLMhouZXhlY3V0b3IudjEuRXhlY3V0b3JFcnJvckgAQgoKCHRlcm1pbmFsIoIBChVXb3JrZmxvd1N0YXRlU25hcHNob3QSIwoDcmVmGAEgASgLMhYuZXhlY3V0b3IudjEuQWN0aW9uUmVmEhAKCHJldmlzaW9uGAIgASgEEjIKB2pvdXJuYWwYAyADKAsyIS5leGVjdXRvci52MS5Xb3JrZmxvd0pvdXJuYWxFbnRyeSKXAQoSV29ya2Zsb3dTdGF0ZURlbHRhEiMKA3JlZhgBIAEoCzIWLmV4ZWN1dG9yLnYxLkFjdGlvblJlZhIVCg1iYXNlX3JldmlzaW9uGAIgASgEEhAKCHJldmlzaW9uGAMgASgEEjMKCGFwcGVuZGVkGAQgAygLMiEuZXhlY3V0b3IudjEuV29ya2Zsb3dKb3VybmFsRW50cnkiZgoSV29ya2Zsb3dDaGVja3BvaW50EiMKA3JlZhgBIAEoCzIWLmV4ZWN1dG9yLnYxLkFjdGlvblJlZhIQCghyZXZpc2lvbhgCIAEoBBIZChFuZXh0X2VmZmVjdF9pbmRleBgDIAEoDSJYChBXb3JrZmxvd1Byb2dyZXNzEhkKEWNvbXBsZXRlZF9lZmZlY3RzGAEgASgNEhgKEGluZmxpZ2h0X2VmZmVjdHMYAiABKA0SDwoHbWVzc2FnZRgDIAEoCSJeCg5Xb3JrZmxvd1Jlc3VsdBIlCgdjb250ZW50GAEgAygLMhQuZXhlY3V0b3IudjEuQ29udGVudBIlCgVmaWxlcxgCIAMoCzIWLmV4ZWN1dG9yLnYxLkZpbGVWYWx1ZSqMAQoVV29ya2Zsb3dGYWlsdXJlUG9saWN5EicKI1dPUktGTE9XX0ZBSUxVUkVfUE9MSUNZX1VOU1BFQ0lGSUVEEAASIwofV09SS0ZMT1dfRkFJTFVSRV9QT0xJQ1lfQ09MTEVDVBABEiUKIVdPUktGTE9XX0ZBSUxVUkVfUE9MSUNZX0ZBSUxfRkFTVBACKoIBChNXb3JrZmxvd1NhbmRib3hNb2RlEiUKIVdPUktGTE9XX1NBTkRCT1hfTU9ERV9VTlNQRUNJRklFRBAAEiAKHFdPUktGTE9XX1NBTkRCT1hfTU9ERV9TSEFSRUQQARIiCh5XT1JLRkxPV19TQU5EQk9YX01PREVfSVNPTEFURUQQAiq8AQoYV29ya2Zsb3dBZ2VudEVmZm9ydExldmVsEisKJ1dPUktGTE9XX0FHRU5UX0VGRk9SVF9MRVZFTF9VTlNQRUNJRklFRBAAEiQKIFdPUktGTE9XX0FHRU5UX0VGRk9SVF9MRVZFTF9MSVRFEAESKAokV09SS0ZMT1dfQUdFTlRfRUZGT1JUX0xFVkVMX1NUQU5EQVJEEAISIwofV09SS0ZMT1dfQUdFTlRfRUZGT1JUX0xFVkVMX01BWBADQssBCg9jb20uZXhlY3V0b3IudjFCDVdvcmtmbG93UHJvdG9QAVpcZ2l0aHViLmNvbS9tYW51cy1haS9tYW51cy1zYW5kYm94L3NieC1nby1zdmMvZXhlY3V0b3ItcHJvdG9jb2wvc2RrL2dvL2V4ZWN1dG9yL3YxO2V4ZWN1dG9ydjGiAgNFWFiqAgtFeGVjdXRvci5WMcoCC0V4ZWN1dG9yXFYx4gIXRXhlY3V0b3JcVjFcR1BCTWV0YWRhdGHqAgxFeGVjdXRvcjo6VjFiBnByb3RvMw", [file_executor_v1_common]);
var WorkflowAgentCallSchema = /* @__PURE__ */ messageDesc(file_executor_v1_workflow, 3);

// v2/generated/executor/v1/addon_job_pb.ts
var file_executor_v1_addon_job = /* @__PURE__ */ fileDesc("ChtleGVjdXRvci92MS9hZGRvbl9qb2IucHJvdG8SC2V4ZWN1dG9yLnYxIqkEChFIb3N0Q2FsbFJlcXVlc3RlZBIPCgdjYWxsX2lkGAEgASgJEg4KBmpvYl9pZBgCIAEoCRIPCgdhdHRlbXB0GAMgASgNEhUKDWF0dGVtcHRfdG9rZW4YBCABKAkSEAoIY2FsbF9rZXkYBSABKAkSFAoMcmVxdWVzdF9oYXNoGAYgASgJEiYKB2pvYl9nZXQYCiABKAsyEy5leGVjdXRvci52MS5Kb2JHZXRIABIwCgxqb2JfcHJvZ3Jlc3MYCyABKAsyGC5leGVjdXRvci52MS5Kb2JQcm9ncmVzc0gAEjAKDGpvYl9jb21wbGV0ZRgMIAEoCzIYLmV4ZWN1dG9yLnYxLkpvYkNvbXBsZXRlSAASKAoIam9iX2ZhaWwYDSABKAsyFC5leGVjdXRvci52MS5Kb2JGYWlsSAASOQoRZW5zdXJlX2FnZW50X3Rhc2sYDiABKAsyHC5leGVjdXRvci52MS5FbnN1cmVBZ2VudFRhc2tIABIzCg5nZXRfYWdlbnRfdGFzaxgPIAEoCzIZLmV4ZWN1dG9yLnYxLkdldEFnZW50VGFza0gAEjcKEGxpc3RfYWdlbnRfdGFza3MYECABKAsyGy5leGVjdXRvci52MS5MaXN0QWdlbnRUYXNrc0gAEioKCWpvYl9wYXVzZRgRIAEoCzIVLmV4ZWN1dG9yLnYxLkpvYlBhdXNlSABCBgoEY2FsbEoECAcQCFIKYmluZGluZ19pZCKdAgoQSG9zdENhbGxSZXNvbHZlZBIPCgdjYWxsX2lkGAEgASgJEiMKA2pvYhgKIAEoCzIULmV4ZWN1dG9yLnYxLkpvYkluZm9IABIwCgphZ2VudF90YXNrGAsgASgLMhouZXhlY3V0b3IudjEuQWdlbnRUYXNrRmFjdEgAEjUKC2FnZW50X3Rhc2tzGAwgASgLMh4uZXhlY3V0b3IudjEuQWdlbnRUYXNrRmFjdExpc3RIABIfCgNhY2sYDSABKAsyEC5leGVjdXRvci52MS5BY2tIABIrCgVlcnJvchgOIAEoCzIaLmV4ZWN1dG9yLnYxLkV4ZWN1dG9yRXJyb3JIAEIKCgh0ZXJtaW5hbEoECAIQA1IKYmluZGluZ19pZCIICgZKb2JHZXQiHgoLSm9iUHJvZ3Jlc3MSDwoHbWVzc2FnZRgBIAEoCSJICgtKb2JDb21wbGV0ZRIOCgZvdXRwdXQYASABKAwSKQoJYXJ0aWZhY3RzGAIgAygLMhYuZXhlY3V0b3IudjEuRmlsZVZhbHVlIl8KB0pvYkZhaWwSKQoFZXJyb3IYASABKAsyGi5leGVjdXRvci52MS5FeGVjdXRvckVycm9yEikKCWFydGlmYWN0cxgCIAMoCzIWLmV4ZWN1dG9yLnYxLkZpbGVWYWx1ZSIrCghKb2JQYXVzZRIOCgZyZWFzb24YASABKAkSDwoHbWVzc2FnZRgCIAEoCSI9CglKb2JMaW1pdHMSFwoPbWF4X2FnZW50X2NhbGxzGAEgASgNEhcKD3dhbGxfdGltZW91dF9tcxgCIAEoAyJxCgdKb2JJbmZvEg4KBmpvYl9pZBgBIAEoCRIOCgZzdGF0dXMYAiABKAkSDQoFaW5wdXQYAyABKAwSJgoGbGltaXRzGAQgASgLMhYuZXhlY3V0b3IudjEuSm9iTGltaXRzEg8KB2F0dGVtcHQYBSABKA0ipQIKD0Vuc3VyZUFnZW50VGFzaxIOCgZwcm9tcHQYASABKAkSFQoNcmVzdWx0X3NjaGVtYRgCIAEoCRIxCgdzYW5kYm94GAMgASgOMiAuZXhlY3V0b3IudjEuV29ya2Zsb3dTYW5kYm94TW9kZRIzCgtpbnB1dF9maWxlcxgEIAMoCzIeLmV4ZWN1dG9yLnYxLldvcmtmbG93RmlsZUlucHV0Eg0KBWJyaWVmGAUgASgJEhEKCWdyb3VwX2tleRgGIAEoCRITCgtncm91cF9icmllZhgHIAEoCRI7CgxlZmZvcnRfbGV2ZWwYCCABKA4yJS5leGVjdXRvci52MS5Xb3JrZmxvd0FnZW50RWZmb3J0TGV2ZWwSDwoHcHJvZmlsZRgJIAEoCSIkCgxHZXRBZ2VudFRhc2sSFAoMd2FpdF9zZWNvbmRzGAEgASgDIpABCg5MaXN0QWdlbnRUYXNrcxIwCgVzY29wZRgBIAEoDjIhLmV4ZWN1dG9yLnYxLkxpc3RBZ2VudFRhc2tzLlNjb3BlEhYKDmNvbXBsZXRlZF9vbmx5GAIgASgIIjQKBVNjb3BlEg8KC0NVUlJFTlRfSk9CEAASGgoWUkVDRU5UX0ZBSUxFRF9TSUJMSU5HUxABIqoBCg1BZ2VudFRhc2tGYWN0Eg8KB3Rhc2tfaWQYASABKAkSEAoIY2FsbF9rZXkYAiABKAkSFAoMcmVxdWVzdF9oYXNoGAMgASgJEg4KBnN0YXR1cxgEIAEoCRIOCgZyZXN1bHQYBSABKAkSKQoJYXJ0aWZhY3RzGAYgAygLMhYuZXhlY3V0b3IudjEuRmlsZVZhbHVlEhUKDXNvdXJjZV9qb2JfaWQYByABKAkiPgoRQWdlbnRUYXNrRmFjdExpc3QSKQoFdGFza3MYASADKAsyGi5leGVjdXRvci52MS5BZ2VudFRhc2tGYWN0IgUKA0Fja0LLAQoPY29tLmV4ZWN1dG9yLnYxQg1BZGRvbkpvYlByb3RvUAFaXGdpdGh1Yi5jb20vbWFudXMtYWkvbWFudXMtc2FuZGJveC9zYngtZ28tc3ZjL2V4ZWN1dG9yLXByb3RvY29sL3Nkay9nby9leGVjdXRvci92MTtleGVjdXRvcnYxogIDRVhYqgILRXhlY3V0b3IuVjHKAgtFeGVjdXRvclxWMeICF0V4ZWN1dG9yXFYxXEdQQk1ldGFkYXRh6gIMRXhlY3V0b3I6OlYxYgZwcm90bzM", [file_executor_v1_common, file_executor_v1_workflow]);
var HostCallRequestedSchema = /* @__PURE__ */ messageDesc(file_executor_v1_addon_job, 0);
var HostCallResolvedSchema = /* @__PURE__ */ messageDesc(file_executor_v1_addon_job, 1);

// v2/protocol.ts
function normalize(schema, value) {
  return toJson(schema, fromJson(schema, value));
}
function message(error) {
  return error instanceof Error ? error.message : String(error);
}
var codes = {
  invalid: "ERROR_CODE_INVALID_ARGUMENT",
  unsupported: "ERROR_CODE_UNSUPPORTED",
  timeout: "ERROR_CODE_TIMEOUT",
  internal: "ERROR_CODE_INTERNAL",
  cancelled: "ERROR_CODE_CANCELLED",
  notFound: "ERROR_CODE_NOT_FOUND",
  unavailable: "ERROR_CODE_HOST_UNAVAILABLE"
};
var sandboxMode = (mode = "shared") => `WORKFLOW_SANDBOX_MODE_${mode.toUpperCase()}`;
var effortLevel = (effort = "lite") => `WORKFLOW_AGENT_EFFORT_LEVEL_${effort.toUpperCase()}`;
var collectPolicy = "WORKFLOW_FAILURE_POLICY_COLLECT";
var failFastPolicy = "WORKFLOW_FAILURE_POLICY_FAIL_FAST";
var FRAME_LIMIT = 8 << 20;
function checkFrame(frame) {
  if (Buffer.byteLength(JSON.stringify(frame)) > FRAME_LIMIT)
    throw new Error("workflow evaluator frame exceeds limit");
  return frame;
}

// v2/tools.ts
var workflowTools = [
  {
    annotations: {
      readOnlyHint: false,
      destructiveHint: true,
      idempotentHint: false,
      openWorldHint: true
    },
    description: "Host-only: best-effort stop of the workflow worker for a job.",
    inputSchema: {
      properties: {
        attempt: {
          description: "Attempt generation to cancel (0 = any)",
          type: "number"
        },
        job_id: {
          description: "Job id from the host ledger",
          type: "string"
        }
      },
      required: ["job_id"],
      type: "object"
    },
    name: "_cancel"
  },
  {
    annotations: {
      readOnlyHint: false,
      destructiveHint: true,
      idempotentHint: false,
      openWorldHint: true
    },
    description: "Host-only: spawn (or re-spawn on recovery) the detached workflow worker for a job attempt.",
    inputSchema: {
      properties: {
        attempt: {
          description: "Attempt generation (fencing)",
          type: "number"
        },
        attempt_token: {
          description: "Capability token for this attempt",
          type: "string"
        },
        job_id: {
          description: "Job id from the host ledger",
          type: "string"
        },
        recovering: {
          description: "True when re-spawned by the host lease supervisor",
          type: "boolean"
        }
      },
      required: ["job_id", "attempt_token"],
      type: "object"
    },
    name: "_start"
  },
  {
    annotations: {
      readOnlyHint: false,
      destructiveHint: true,
      idempotentHint: false,
      openWorldHint: true
    },
    description: `Run a JavaScript orchestration script that coordinates multiple subagents deterministically.
The whole workflow runs as one background job and its return value is injected into the conversation when it finishes.
Use it for work within the current task, with results returned to the parent conversation.

Use this when a task fans out over many items (5 or more) that EACH require independent research, browsing, or judgment, not for shortlists, one question with several facets, or work a handful of searches can finish:
when the user wants comprehensive coverage ("research as many X as possible", "list every industry/category/competitor",
surveying many sources/entities/pages), fan out one subagent per item in parallel instead of investigating each yourself
in the main loop. NOT for parameter-only batches: running the same deterministic command or script over many inputs
belongs in a single script with bounded concurrency executed directly, not in a workflow of subagents.
Also use it for any deterministic multi-subagent orchestration (loops, conditions, aggregation).

- The script runs in a sandboxed JavaScript environment with NO IO and MUST be deterministic (no Math.random / Date.now);
  workflows survive restarts by replaying the script against a journal of completed agent calls
- Primitives:
  agent(prompt, {brief, schema, input_files, sandbox, effort_level}) returns a Promise of the subagent result;
  brief is REQUIRED (at most 120 characters): a specific subtask title in the user's language
  (e.g. "Scrape ACME pricing page"), shown verbatim on the user-facing task board \u2014
  never a generic label like "agent 3" / "subtask" / "task N";
  parallel(brief, factory, {schema}) runs the agent promises returned by factory concurrently as a named group;
  brief is REQUIRED (at most 80 characters): a group name shown as the group header
  (e.g. "Survey event sources across 7 industries"); options.schema is the group default JSON Schema,
  per-agent schema overrides; schema is the only parallel group option, so set effort_level on each agent();
  log(message) records progress
- Files: declare existing parent-sandbox input files in input_files ({path: '/home/ubuntu/a.csv', name: 'data'}).
  The current Sandbox Host does not return durable artifact refs in child results or accept ArtifactRef inputs;
  do not use previous.files to transfer files. For output files, use shared mode with explicit unique paths and
  have the parent task verify and deliver them. A path merely mentioned in prompt text is never transferred
- estimated_agent_calls is a conservative high-side estimate and must not exceed requested max_agent_calls (1-2000); at creation the addon adds max(2, floor(requested * 10%)) once, capped at 2000. The returned effective limit is persisted and is not increased on restart
- Agent registrations are paced by the worker; parallel expresses independence, not an immediate burst
- effort_level defaults subagents to lite; each agent() may override it with lite, standard, or max
- With failure_policy=collect (default) every agent() resolves to {ok,value,files} or {ok:false,error};
  fail_fast rejects on first failure
- Larger workflows (estimated or effective budget > 20) return a pending job and require a user confirmation;
  never call this tool again for the same task after a pending result
- Before fan-out that depends on another MCP server, inspect that server with server.list and obey its Subagents and
  Concurrency contract. Use isolated sandboxes for independent stateful work and distinct output paths when parallel
  agents write files
- If a required subagent tool is unavailable or fails, collect and report the blocker. Never fabricate completion, reuse
  another task's artifact, or substitute a different artifact type unless the task explicitly allows that fallback
- The script's completion value (return) becomes the workflow result; subagent prompts must be fully self-contained
- Workflow completion waits for every agent() call to finish, even if its Promise was not explicitly awaited;
  use await/parallel when the result participates in the returned value
- Read the workflow-composer skill before composing a non-trivial script: full API semantics and examples live there`,
    inputSchema: {
      properties: {
        brief: {
          description: "A one-sentence preamble describing the purpose of this operation",
          type: "string"
        },
        effort_level: {
          description: "Default subagent effort level. Defaults to lite; each agent() may override it",
          enum: ["lite", "standard", "max"],
          type: "string"
        },
        estimated_agent_calls: {
          description: "Conservative high-side estimate of the number of agent() effects this script will actually execute; must not exceed max_agent_calls",
          maximum: 2e3,
          minimum: 1,
          type: "number"
        },
        failure_policy: {
          description: "Per-item failure behavior. Defaults to collect",
          enum: ["collect", "fail_fast"],
          type: "string"
        },
        max_agent_calls: {
          description: "Requested agent-call budget; at creation add max(2, floor(10%)) once, capped at 2000. The returned effective limit is the hard upper bound. Exhaustion pauses the existing job on a compatible Host; raise its total through job continue only after explicit user approval, unless it is already 2000 (no increase is possible; inspect retained results or stop the paused job)",
          maximum: 2e3,
          minimum: 1,
          type: "number"
        },
        sandbox: {
          description: "Default subagent sandbox placement. Defaults to shared; each agent() may override it",
          enum: ["shared", "isolated"],
          type: "string"
        },
        script: {
          description: "The JavaScript orchestration script to run (a syntactically valid function body)",
          type: "string"
        }
      },
      required: ["brief", "script", "estimated_agent_calls", "max_agent_calls"],
      type: "object"
    },
    name: "run"
  }
];

// node_modules/.pnpm/quickjs-emscripten-core@0.32.0/node_modules/quickjs-emscripten-core/dist/index.mjs
init_chunk_V2S4ZYJR();
init_dist();
async function newQuickJSWASMModuleFromVariant(variantOrPromise) {
  let variant2 = smartUnwrap(await variantOrPromise), [wasmModuleLoader, QuickJSFFI2, { QuickJSWASMModule: QuickJSWASMModule2 }] = await Promise.all([variant2.importModuleLoader().then(smartUnwrap), variant2.importFFI(), Promise.resolve().then(() => (init_module_ES6BEMUI(), module_ES6BEMUI_exports)).then(smartUnwrap)]), wasmModule = await wasmModuleLoader();
  wasmModule.type = "sync";
  let ffi = new QuickJSFFI2(wasmModule);
  return new QuickJSWASMModule2(wasmModule, ffi);
}
function smartUnwrap(val) {
  return val && "default" in val && val.default ? val.default && "default" in val.default && val.default.default ? val.default.default : val.default : val;
}
function newVariant(baseVariant, options) {
  return { ...baseVariant, async importModuleLoader() {
    let moduleLoader = smartUnwrap(await baseVariant.importModuleLoader());
    return async function() {
      let moduleLoaderArg = options.emscriptenModule ? { ...options.emscriptenModule } : {}, log = options.log ?? ((...args) => debugLog("newVariant moduleLoader:", ...args)), tapValue = (message2, val) => (log(...message2, val), val), force = (val) => typeof val == "function" ? val() : val;
      (options.wasmLocation || options.wasmSourceMapLocation || options.locateFile) && (moduleLoaderArg.locateFile = (fileName, relativeTo) => {
        let args = { fileName, relativeTo };
        if (fileName.endsWith(".wasm") && options.wasmLocation !== void 0) return tapValue(["locateFile .wasm: provide wasmLocation", args], options.wasmLocation);
        if (fileName.endsWith(".map")) {
          if (options.wasmSourceMapLocation !== void 0) return tapValue(["locateFile .map: provide wasmSourceMapLocation", args], options.wasmSourceMapLocation);
          if (options.wasmLocation && !options.locateFile) return tapValue(["locateFile .map: infer from wasmLocation", args], options.wasmLocation + ".map");
        }
        return options.locateFile ? tapValue(["locateFile: use provided fn", args], options.locateFile(fileName, relativeTo)) : tapValue(["locateFile: unhandled, passthrough", args], fileName);
      }), options.wasmBinary && (moduleLoaderArg.wasmBinary = await force(options.wasmBinary)), options.wasmMemory && (moduleLoaderArg.wasmMemory = await force(options.wasmMemory));
      let optionsWasmModule = options.wasmModule, modulePromise;
      optionsWasmModule && (moduleLoaderArg.instantiateWasm = async (imports, onSuccess) => {
        modulePromise ?? (modulePromise = Promise.resolve(force(optionsWasmModule)));
        let wasmModule = await modulePromise;
        if (!wasmModule) throw new QuickJSEmscriptenModuleError(`options.wasmModule returned ${String(wasmModule)}`);
        let instance = await WebAssembly.instantiate(wasmModule, imports);
        return onSuccess(instance), instance.exports;
      }), moduleLoaderArg.monitorRunDependencies = (left) => {
        log("monitorRunDependencies:", left);
      }, moduleLoaderArg.quickjsEmscriptenInit = () => newMockExtensions(log);
      let resultPromise = moduleLoader(moduleLoaderArg), extensions = moduleLoaderArg.quickjsEmscriptenInit?.(log);
      if (optionsWasmModule && extensions?.receiveWasmOffsetConverter && !extensions.existingWasmOffsetConverter) {
        let wasmBinary = await force(options.wasmBinary) ?? new ArrayBuffer(0);
        modulePromise ?? (modulePromise = Promise.resolve(force(optionsWasmModule)));
        let wasmModule = await modulePromise;
        if (!wasmModule) throw new QuickJSEmscriptenModuleError(`options.wasmModule returned ${String(wasmModule)}`);
        extensions.receiveWasmOffsetConverter(wasmBinary, wasmModule);
      }
      if (extensions?.receiveSourceMapJSON) {
        let loadedSourceMapData = await force(options.wasmSourceMapData);
        typeof loadedSourceMapData == "string" ? extensions.receiveSourceMapJSON(JSON.parse(loadedSourceMapData)) : loadedSourceMapData ? extensions.receiveSourceMapJSON(loadedSourceMapData) : extensions.receiveSourceMapJSON({ version: 3, names: [], sources: [], mappings: "" });
      }
      return resultPromise;
    };
  } };
}
function newMockExtensions(log) {
  let mockMessage = "mock called, emscripten module may not be initialized yet";
  return { mock: true, removeRunDependency(name) {
    log(`${mockMessage}: removeRunDependency called:`, name);
  }, receiveSourceMapJSON(data) {
    log(`${mockMessage}: receiveSourceMapJSON called:`, data);
  }, WasmOffsetConverter: void 0, receiveWasmOffsetConverter(bytes, mod) {
    log(`${mockMessage}: receiveWasmOffsetConverter called:`, bytes, mod);
  } };
}

// node_modules/.pnpm/@jitl+quickjs-wasmfile-release-sync@0.32.0/node_modules/@jitl/quickjs-wasmfile-release-sync/dist/index.mjs
var variant = { type: "sync", importFFI: () => Promise.resolve().then(() => (init_ffi(), ffi_exports)).then((mod) => mod.QuickJSFFI), importModuleLoader: () => Promise.resolve().then(() => (init_emscripten_module(), emscripten_module_exports)).then((mod) => mod.default) };
var src_default = variant;

// node_modules/.pnpm/quickjs-emscripten@0.32.0/node_modules/quickjs-emscripten/dist/chunk-OHAYRCBA.mjs
async function newQuickJSWASMModule(variantOrPromise = src_default) {
  return newQuickJSWASMModuleFromVariant(variantOrPromise);
}

// v2/evaluator/runtime.ts
var runtime = false ? getDefaultQuickJS() : newQuickJSWASMModule(
  newVariant(src_default, {
    wasmBinary: async () => Uint8Array.from(Buffer.from("AGFzbQEAAAABvgZpYAJ/fwBgA39/fwF/YAR/fn9/AX5gAn9/AX9gAX8Bf2AFf35/f38BfmADf39/AGACf34BfmAEf39/fwF/YAF/AGACf34AYAJ/fgF/YAF8AXxgAn9/AX5gA39/fgF/YAZ/fn9/f38BfmAFf39/f38Bf2ADf35/AX5gA39+fwBgBH9/f38AYAN/fn8Bf2ADf35+AX5gA39/fwF+YAZ/fn5/f38BfmAEf39+fwF/YAN/fn4Bf2AGf39/f39/AX9gBX9+fn9/AX5gBH9/f38BfmACfHwBfGAAAX9gBH9+f38Bf2ABfgF/YAAAYAF/AX5gB39+f35+fn8Bf2AFf35/fn8Bf2AEf35+fwF/YAV/f39/fwBgBH9/f34Bf2AFf35+fn8Bf2AHf39/f39/fwF/YAF+AX5gAn98AX9gBH9+f34BfmAGf35/fn5/AX9gAn5/AX9gBX9/f39/AX5gBH9+f38AYAJ/fwF8YAd/fn9/f39/AX5gAn5/AGADf39+AGAEf35+fwF+YAR/fn9+AX9gBH9+f34AYAR/fn5+AX9gCX9/f39/f39/fwF/YAZ/f39/f38BfmADfn9/AX9gCH9/f39/f39/AX9gB39/f39/f38AYAV/fn9/fwF/YAN/f34BfmABfAF/YAV/fn5/fwBgBH9+fn8AYAJ8fwF8YAN8fH8BfGAEf39+fwBgBn9+fn5+fwF/YAR/f35+AX9gBX9+fn9/AX9gBn98f39/fwF/YAABfGAFf35/fn8BfmANf39/f39/f35/f39/fwF+YAV/f35/fwF/YAZ/f35+fn4Bf2AEf39+fwF+YAd/fn5+f39/AX5gAX8BfGAFf3x/f38BfmAIf35+f39/f38BfmAGf35/f39/AGAIf39/f39/fn8BfmAGf35/f39/AX9gCn9/fn9/fn5+f38Bf2AFf39+fn4BfmACfHwBf2AFf39/f38BfGAFf39+fn8Bf2ADf35+AGAHf35/f39/fwBgBH9+fn4BfmACfH8Bf2AEf39+fgF+YAh/fn5+fn9+fgF+YAN+fn8Bf2AHf39/fn5+fwF/YAN/f3wAYAN/fnwBfmAAAX5gAn98AGAJf39/f39/f39/AAJ+FAFhAWIAEwFhAWMACAFhAWQABAFhAWUAAwFhAWYAAwFhAWcACAFhAWgAAQFhAWkABAFhAWoAKwFhAWsABAFhAWwAIQFhAW0AMwFhAW4AEwFhAW8AHwFhAXAASgFhAXEAIQFhAXIACQFhAXMAEAFhAXQAAAFhAWECAYACgIACA6sKqQoKAAAGBEsAAAYbACQAAzQKAQAJBwMHAQADFAshIAsLBg0GAwYGDjUENiIbAwMHBCIBFBlMNw4DCBQIAQALFQAEARAHEQ0GA00LJQQGBgEmAAM4TggiDhEBOQABBzoBBBUECRYLECMJEwADAQgEDgMYCQMBBwENEAoDCwAJEAccAgkGBgQzBA44CgsGDjsoLSURAwMEAQgABAMOCw4CBgEZAwERIgMAPAMaBAEDCQ4fDQgkEU8DDQkDAwEJCwk9KQgVAQsEAwEmHw4HUAADAQ4UCT0DCRADCQYEAz4BKA4FAhUVUT8BKBMQAwAGHAQNAxoEAwMEAwYJGiAAABkLCzYLFQQBChUlAVIIAAEEDQUuDAMBAQMRAA1TAQYEAwEDBBAEBBEDAgU/D0AFBQgVLg0JAB8BAS8BB0AYAwEHEwwGGxYADQhCBhEBAFQIQxNEHQwEAwgDCQcWDgMECAELCRAECDwBAwMEAQQLAQsORSoAKRsbC0YWBwIAERYBCwABHlU6ExAABhABCxAHAwgDFwEAVjABOwYbBQgDEA0JAwYAIAMEBAwIBAMBDAMGAwMBCAkBEAMaAAAICAQDEAgKGgMEGFcICwMiR1gVBw4FCQ5ZCw4LCxQ0ABNGBwIFCwUCDEgDEgAJBgZIDxcDAwMTCFoEGQMBCxUGBxQOGFsCAwYWCwcPXAkOFwUHAxpdFAMdHREBAAkDEyQZKiAvA14QXwwEAxAEEAYBAQgBCAQDMAYBAA4BABgBEAcBCDEgPgQBAwMEAwEBAAMBAwEDAAEDGjkDAQkQGhMJASkCBhMIDiwIAQEOBQQEAQQCAgQHBAQEBQQHRR8EAABCBAINBAQDCQMJAgVgDmECBQIHCAMSChISDS4OAQAAAQAQCAMADgIbAQQHAwgaAQMDCAsHBw4GEA0RKwEDAwgDR2ImAQgOAAsNHwggYxgPJzIDAAYZBgEBDgMoBQ0ZFAARAQcGAA0ZNwMEAQEULxEBFgAACQATAAELJgQAAAADAwcADxwwEgglA0MTBClEZAEMHQMJCAgBAwQDAQMTBgADBAEDAwYGAwgEFgEDAwEKGQ0UBAECAgcBBAQDAQELCQUkCwcGBioqBWUFMQJmBAoBAwADAAQDBAMAAAABAgICAgIAAgICAgIJAhEHBw8KAQECAhIKCwsZBy0sFCMUJxgPAgICAgICAgICBREFBQUFBQIFBwUFAhEREQICDQ0NDQ0NDQ0NDQ0BAQEBAQEBAQEBBQUCAQICAgUCAgcFAgcHAgIHBQUHBwcSChIKCgoSCgICAg8FDw8CMgICDw8FDwUWCgISCgICFxcXAgIDAgIXAgkCAgICAg8XAgUCAgICBwICFwIXBQICFwUCAQICAgUCAgUCBQUCAgIFAgEAChIKCh4KEgoSChIKEgQKCgoSChIKEgoSCgoSCgoSCiMjFBgUAAMAABYeAQ8eHgkWDx4BABwcHAQDAA8BBAMPFh4ECQwDBgEDCQAIAQkJAwMQDwADAwMECAEDAxoDAxBnAQBJEAwMDAwRDAwJCQERaAwMDBMMDAwdDAwMDAwMAREEBgYGAQYGBgYGBgYBAQEBBAMDAQICBQICAgUCAgICAgUFFQcCAgICAhEHAgICAgIDAhUHAgIFBQIPDw8CAgIFAwUCAgICAgICBQICAgICAgICBQUCBQUFAgICAgIFBQUCAgICAgUPAgICDAwCAgwdAwwFAgIFAgUCBQICBQICAgIHAjECDwUCAgIrAgICAgUCAgECBiEhBAUBcADXAwYJAX8BQeDAxQILB6EDSwF1ALsKAXYAlgEBdwDiCAF4AOEIAXkA3ggBegDdCAFBANwIAUIAkQMBQwCRAwFEANgIAUUA1ggBRgDSCAFHANEIAUgAzggBSQDKCAFKALIIAUsAqQgBTAD5BwFNAI4BAU4A9AcBTwDwBgFQAOoGAVEA4wYBUgDiBgFTAOEGAVQA4AYBVQDfBgFWAN4GAVcA3QYBWAC3CgFZAK8KAVoAqAoBXwCVCgEkAMMGAmFhAOUJAmJhANUJAmNhALgJAmRhALcJAmVhALYJAmZhALUJAmdhALMJAmhhALIJAmlhAKkJAmphAJgJAmthAJQJAmxhAIgJAm1hAIMJAm5hAIIJAm9hAIEJAnBhAIAJAnFhAP8IAnJhAP4IAnNhAP0IAnRhAPwIAnVhAPsIAnZhAPoIAndhAPkIAnhhAPgIAnlhANMIAnphALQDAkFhAPcIAkJhAJEDAkNhAJEDAkRhAPUIAkVhAPQIAkZhAPIIAkdhAPEIAkhhAO4IAklhAO0IAkphAOwIAkthAOkIAkxhAIQJAk1hAOcIAk5hAOYIAk9hAOUICAK6CgmzBwEAQQEL1gOTCZgGkgm0A5AIjAiKCIAI4AeeB5EH2wOiCKEIiQOECIMIggiBCP8H/gf9B5MF/Af7B/oH+Af3B4sFvAL2B/UH8wftA/IH8QfwB/sD7wevBfgG9wa5CuoI4AiLBtcI9gjzCPAI7wjrCIUJ5AjkBeMI3wjXBc0IzAjLCMkI1QjUCNAI+gPPCJMI5AboB+YH5AfjB94H3QeLBtsHvAeIB+sE9AbyBrQJsQn4BLAJrwmuCa0JrAmrCaoJqAmnCaYJhwmGCfYGwwjCCMEIoQXACL8IvgigBb0IvAi7CLoIuQi4CLcItgi1CLQIswixCLAIrwiuCK0IrAirCJ8FngWqCPQDqAj0A58FngWnCKYIpQihBcQIxwjGCMUIyAjzA6QIowi0A/wG+waHB4YHhQeEB4MHggeBB4AH/wb+Bv0G1wfWB9UH9APUB6AF0wfSB9EH0AfpB+wH6wfbCNoI2QjmBuUG5waHCPMG8QbvBu4G7QbsBusG6QboBvUG+gb5BokHmAfeA/UElQeXB5YHlAeTB5IHuAKQB48HjgeNB4wHiweKB7oC8QHcB9oH2QfYB44E4QffB+IH5QfnB7AK1AauCrgK0ga2CrUKtAqzCtAGsgqxCoUIhgiLCIkIiAigCJ8IngidCJwImwiaCJkImAjwA5cIlgiZBe8DlQiUCJgFkgiRCI8IjgiNCMQJngrDCaEKwgnBCcAJvwmcCpoKyAa+Cb0JvAmUBbsJugm5CZoFzQnMCcsJygnJCcgJxwnGCcUJ0wmpA9IJ0QnQCc8JzgnWCdQJ3AnbCdoJ2QnYCdcJ3gndCd8J4AnoCecJvga9BuYJ5AnjCeIJ4QnsCesJ6gnpCfEJ8AnvCe4J7QnzCfIJ9gn1CfQJigqJCogKhwqGCoUKhAqDCoIKgQqACv8J/gn9CfwJ+wn6CfkJ+An3CYsKlwqeCZYJmQmWCqEJogmfCbEEnAmXCfED0AKUCo8JjAmJCZMKlQmOCYoJoAmdCZsJogK2A+gIiwmaCZIKkQqQCo8KjgqNCowKowqiCqAKnwqdCpsKmQqYCqUKpAqpCqcKpgqqCqsKrQqsCpkHoQegB58HmwedB5wHmgejB6IHygfJB8gH/QTHB8YHxQfEB8MHwgfBB8AH+wS/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CQwCCyADwEEATg0BIAFBBiACQQxqEE0iA0F+cUGowABGDQggAigCDCEBIANBf0YNAQtBASEDDAELIAFBAWohAUEAIQMMAAsACyAEIAU2AgAgAiABQQFqNgIMDAELIAAgAkEMaiACQQhqIANBABDlBCIDRQ0BIAAgAzYCECACKAIIIQMgAEEANgIYIAAgAzYCFCAAQYN/NgIIIAAQ5AQLIAAgAigCDDYCLEEADAULIARBqH82AgAMAwsgAEEBNgIgCyACKAIMIQEMAAsAC0F/CyACQRBqJAALggkCBn8CfiMAQSBrIggkAAJAAkACQCABQiCIIgxC/////w9SBEBCgICAgOAAIQsCQAJAAkACQAJAAkAgDKciBkECaw4FAQIFBQkACyAGQQdqDgICAwQLIAAgAkHM3wAQlAEMBwsgACACQZyNARCUAQwGCyABpyEGIAACfwJAIAJBAEgEQCACQf////8HcSIFIAYoAgQiB0H/////B3FPDQQgBkEQaiECIAdBAE4NASACIAVBAXRqLwEADAILIAJBMkcNAyAGNQIEQv////8HgyELDAcLIAIgBWotAAALQf//A3EQ1QIhCwwFCyABpyEGIAACfwJAIAJBAEgEQCACQf////8HcSIFIAYoAgRPDQMDQCABpyECIAFCgICAgHCDQoCAgICQf1EEQCACQRBqIQQgAigCBEEATg0DIAQgBUEBdGovAQAMBAsgBSACKQMQIgGnKAIEIgRB/////wdxIAQgAUKAgICAcINCgICAgJB/URsiBEkNACAFIARrIQUgAikDGCEBDAALAAsgAkEyRw0CIAY1AgQhCwwGCyAEIAVqLQAAC0H//wNxENUCIQsMBAsgACABEJoEpyIGDQEMAgsgAachBgsgAkH/////B3EhCQJAA0AgBigCFCIFQTBqIQogBSAFKAIYIAJxQX9zQQJ0aigCACEFAkADQCAFRQ0BIAIgCiAFQQFrQQN0IgVqIgcoAgRHBEAgBygCAEH///8fcSEFDAELCyAGKAIYIAVqIQUCQAJAAkACQCAHKAIAQR52QQFrDgMAAQIDCyAFKAIAIgJFDQYgAiACKAIAQQFqNgIAIAAgAq1CgICAgHCEIANBAEEAED0hCwwHCyAFKAIAKAIQKQMAIgtCgICAgHCDQoCAgIDAAFEEQCAAIAIQ3gEMBQsgC0KAgICA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ELMBDwsgACgCECABpxCzAwsNACAAIAEgAkEBEN8CCwsAIAAgAUEBEPkFCywBAX8jAEEQayIDJAAgAyACNgIMIABB6ABqQYABIAEgAhDdAhogA0EQaiQAC2kBAn8CfyAAKAIIIgIgACgCDE4EQEF/IAAgAkEBaiABEMUCDQEaIAAoAgghAgsgACACQQFqNgIIIAAoAgRBEGohAwJAIAAoAhAEQCADIAJBAXRqIAE7AQAMAQsgAiADaiABOgAAC0EACwsNACAAIAEgAkEGEN8CC2oBAn8CQCAAKALYAiIDRQ0AIAAoAuACIgQgACgC3AJODQAgASAAKALoAkkNACACIAAoAuQCRg0AIAMgBEEDdGoiAyACNgIEIAMgATYCACAAIAE2AugCIAAgBEEBajYC4AIgACACNgLkAgsLNQAgACACQTIgAkEAEBgiAkKAgICAcINCgICAgOAAUQRAIAFCADcDAEF/DwsgACABIAIQrgEL4wECAX4BfyMAQRBrIgUkAEKAgICA4AAhBAJAAkAgACABIAJBAEEAIAVBDGoQoAMiAUKAgICAcINCgICAgOAAUQ0AAkACQAJAIAUoAgwOAwABAgELIANBADYCACABIQQMAwsgACABEBMgA0EBNgIAQoCAgIAwIQQMAgsgACABQe0AIAFBABAYIgJCgICAgHCDQoCAgIDgAFENACADIAAgAhAtIgM2AgBCgICAgDAhBCADRQRAIAAgAUHEACABQQAQGCEECyAAIAEQEwwBCyAAIAEQEyADQQA2AgALIAVBEGokACAECyEBAX8gACgCNBDLAyIBQQBIBEAgACgCNEEBNgKMAgsgAQsTACAAIAEgAiADIAFBgIABEKEBC/sBAgN/AX5CgICAgOAAIQQgACgCFAR+QoCAgIDgAAUgACgCBCEBIAAoAggiAkUEQCAAKAIAKAIQIgJBEGogASACKAIEEQAAIABBADYCBCAAKAIAQS8QMw8LIAAoAgwgAkoEQCAAKAIAKAIQIgNBEGogASACIAAoAhAiAXQgAWtBEWogAygCCBEBACIBRQRAIAAoAgQhAQsgACABNgIECyABIAAoAhAiAgR/IAIFIAEgACgCCGpBADoAECAAKAIQC0EfdCICIAEoAgRB/////wdxcjYCBCABIAAoAghB/////wdxIAJyNgIEIABBADYCBCABrUKAgICA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AkAgAaciBC8BBkECaw4fAA0NDQ0NAAENDQ0NDQ0NDQ0NDQMCAwQFBgcICQoLDA0LIAQoAiggA00NDCAEKAIkIANBA3RqKQMAIgFCgICAgPB+VA0NIAGnIgAgACgCAEEBajYCAAwNCyAEKAIoIANNDQsgBCgCJCADQQJ0aigCACgCECkDACIBQoCAgIDwflQNDCABpyIAIAAoAgBBAWo2AgAMDAsgBCgCKCADTQ0KIAQoAiQgA2owAABC/////w+DIQEMCwsgBCgCKCADTQ0JIAQoAiQgA2oxAAAhAQwKCyAEKAIoIANNDQggBCgCJCADQQF0ajIBAEL/////D4MhAQwJCyAEKAIoIANNDQcgBCgCJCADQQF0ajMBACEBDAgLIAQoAiggA00NBiAEKAIkIANBAnRqNQIAIQEMBwsgBCgCKCADTQ0FIAQoAiQgA0ECdGooAgAiAEEATgRAIACtIQEMBwtCgICAgOB+IAC4vSIBQoCAgICggYD8/wB9IAFCgICAgICAgPj/AFYbIQEMBgsgBCgCKCADTQ0EIAAgBCgCJCADQQN0aikDABCcAyEBDAULIAQoAiggA00NAyAAIAQoAiQgA0EDdGopAwAQiQQhAQwECyAEKAIoIANNDQJCgICAgOB+IAQoAiQgA0EBdGovAQAQ9QG9IgFCgICAgKCBgPz/AH0gAUL///////////8Ag0KAgICAgICA+P8AVhshAQwDCyAEKAIoIANNDQFCgICAgOB+IAQoAiQgA0ECdGoqAgC7vSIBQoCAgICggYD8/wB9IAFC////////////AINCgICAgICAgPj/AFYbIQEMAgsgBCgCKCADTQ0AQoCAgIDgfiAEKAIkIANBA3RqKQMAIgFCgICAgKCBgPz/AH0gAUL///////////8Ag0KAgICAgICA+P8AVhshAQwBCwJAAkACQCABQoCAgIBwgyIGQoCAgIAgUQR/QenfAAUgBkKAgICAMFINAUHRjQELIQMgACACEBMgBSADNgIAIABB4sIAIAUQFgwBCyAAIAIQMSEDIAAgAhATIAMNAQtCgICAgOAAIQEMAQsgACABIAMgAUEAEBghASAAIAMQGQsgBUEQaiQAIAELGQAgAQRAIAAgAUEQa61CgICAgJB/hBATCwsJACAAQQEQugELjQEBAn8gASgCeCIEQf7/A04EQCAA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SARAIAMgBUEBdGovAQAMAQsgAyAFai0AAAshACACIAFrQTlKDQECfyAAQf8ATQRAIAIgADoAACACQQFqDAELIAIgABCvAyACagshAiAFQQFqIQUgBCgCBCEADAALAAsgAkEAOgAACyABIQMLIAZBEGokACADDwtBpu0AQd+QAUGzGEGIlwEQAAALQcexAUHfkAFBvRhBiJcBEAAACwsAIAAgAUEAEMIFC10BAn8jAEEQayIDJAACQCABQYCAAXFFBEAgAUGAgAJxRQ0BIAAoAhAoApQBIgFFDQEgAS0AJEEBcUUNAQsgA0EANgIMIABBBCACQQAQpwRBfyEECyADQRBqJAAgBAsWACAAIAAoAjggAUEDdGopAwAgARBpC/8BAQR/IAAoAhAhBiABKAIAIgUtABAEfyAGIAUQpAQgBSgCFCADakGBgNzxeWwgBGpBgYDc8XlsBUEACyEHAn8gBSgCICIIIAUoAhxOBEAgACABIAIgCEEBahDHBQRAQX8gBS0AEEUNAhogBiAFEKIDQX8PCyABKAIAIQULIAUtABAEQCAFIAc2AhQgBiAFEKIDCyAFIAUoAiAiAUEBajYCICAFIAFBA3RqIgEgACADECAiADYCNCABIARBGnQiAiABKAIwQf///x9xcjYCMCABIAUgACAFKAIYcUF/c0ECdGoiACgCAEH///8fcSACcjYCMCAAIAUoAiA2AgBBAAsLKAAgACAAKAIQIgApA4gBEBMgACABNwOIASAAIAAtAJEBQQh0OwGQAQsNACAAIAEgARBBEJADC6UBAQJ/AkACQANAQX8hAiAAKAIUDQICQAJAIAFCIIinQQdqDgIDAAELIAAgAaciAykDEBCMAQ0DIAMpAxghAQwBCwsgACgCACABECgiAUKAgICAcINCgICAgOAAUQRAIAAQrgNBfw8LIAAgAaciAkEAIAIoAgRB/////wdxEEwgACgCACABEBMPCyAAIAGnIgBBACAAKAIEQf////8HcRBMIQILIAIL0AEBAn8CQAJAAkAgAUUNACABKAIAIgJBAEwNASABIAJBAWsiAjYCACACDQACQCABLQAFBEAgACABKQMYECIMAQsgASgCHCICKAIYIAEvARhBAnRqIgMoAgAgAUcNAyADQQA2AgAgAi0AJEEEcUUNACAAIAJBOGsQ/AELIAEoAggiAiABKAIM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QCAAKAIAIAEQE0F/DwsCQCABQoCAgIBwg0KAgICAkH9RDQAgACgCACABEEAiAUKAgICAcINCgICAgOAAUg0AIAAQrgNBfw8LIAAgAaciAkEAIAIoAgRB/////wdxEEwgACgCACABEBMLHQAgACABIAJCAEL/////////D0IAEGUgACACEBMLEQAgACABIAEgAiADQQIQmAQLKgEBfyMAQRBrIgMkACADIAI2AgwgACABIAJB4ABBABCvBBogA0EQaiQAC60BAQF/IwBBEGsiAyQAAkACQCACQQBIBEAgASACQf////8HcTYCAEEBIQIMAQsgAiAAKAIQIgAoAixPDQECfwJAIAAoAjggAkECdGooAgAiACgCCEGAgICAfHFBgICAgARHDQAgA0EMaiAAEMgFRQ0AQQEgAygCDCIAQX9HDQEaC0EAIQBBAAshAiABIAA2AgALIANBEGokACACDwtBpu0AQd+QAUGQGUGWIRAAAAtrAQJ/AkAgAUKAgICAcFQNACABpyIDLwEGQQRrIgRBHktBASAEdEHPgICABHFFcg0AIAAgAykDIBATIAMgAjcDIEEADwsgACACEBMgAUKAgICAcINCgICAgOAAUgRAIABBqfMAQQAQFgtBfwt2AQJ/AkAgASgCCCICQf////97SwRAIAEoAgwhAAwBCyAAKAI0IAIgACgCJEEBa3FBAnRqIQIgACgCOCEDA0AgAyACKAIAIgBBAnRqKAIAIgIgAUYNASACQQxqIQIgAA0AC0GDrwFB35ABQbUVQfAgEAAACyAACysBAX8gACgCECIDQRBqIAEgAiADKAIIEQEAIgEgAkVyRQRAIAAQyQELIAELiAMCAn4CfyMAQRBrIgYkAAJAIAFCgICAgHBUBEAgASEDDAELIAJBD3EhBQJAAkACQCACQQ9LDQAgACABQeEBIAFBABAYIgRCgICAgHCDIgNCgICAgCBRIANCgICAgDBRcg0AIANCgICAgOAAUQ0BIAYgAEHKAEEWIAVBAUYbQcwAIAUbEDM3AwggACAEIAFBASAGQQhqED0hAyAAIAYpAwgQEyADQoCAgIBwg0KAgICA4ABRDQEgACABEBMgA0KAgICAcFQNAyAAIAMQEyAAQdvuAEEAEBYMAgsgBUEARyEFQQAhAgNAIAJBAkcEQCAAIAFBO0E9IAIgBUYbIAFBABAYIgNCgICAgHCDQoCAgIDgAFENAgJAIAAgAxAwRQ0AIAAgAyABQQBBABA9IgNCgICAgHCDQoCAgIDgAFENAyADQv////9vVg0AIAAgARATDAULIAAgAxATIAJBAWohAgwBCwsgAEHb7gBBABAWCyAAIAEQEwtCgICAgOAAIQMLIAZBEGokACADC80gAgl/BH4jAEGQAWsiAyQAAkACQCAAKAIAIgEoAhAoAoABIANLBEAgARB0DAELQoCAgIDgACEKIAAgA0EeahDKAQ0BQoCAgIAgIQoCQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAIAMtAB4iAkEBaw4TGAABAQIDBAcIDggFBgkKCwwNDxALQoCAgIAwIQoMFwsgAkEDR61CgICAgBCEIQoMFgsgA0EgaiAAKAIIIAAoAgwQowQiAUEATgRAIAAgACgCCCABajYCCCADNQIgIQoMFgsgABDNAQwUCyAAIANBIGoQtQYNE0KAgICA4H4gAykDICIKQoCAgICggYD8/wB9IApC////////////AINCgICAgICAgPj/AFYbIQoMFAsgABCDBiIArUKAgICAkH+EQoCAgIDgACAAGyEKDBMLIAAtACFFDQogACgCACEFIANBJGpBAEHUAPwLACADQQE2AiBCgICAgDAhCiAAIANBiAFqELQGDRAgAyAAKAIgQQV2QYAQcSADLwGIASIBQf8PcSABQQF0QYAgcXJyOwAxIAAgA0EfahDKAQ0QIAMgAy0AHzoAMCAAIANBPGoQtwENECAAIANByABqEKYCDRAgACADQcoAahCmAg0QIAAgA0HMAGoQpgINECAAIANBzgBqEKYCDRAgACADQdAAahCmAg0QIAAgA0HgAGoQPg0QIAAgA0HcAGoQPg0QIAAgA0E4ahA+DRAgACADQYwBahA+DRAgBUHYAEHEACADLwAxIgFBgAhxGyIGIAMoAlxBA3RqIgQgAygCjAEiAkEMbGoiByADKAJgQQN0aiIIQQAgAygCOCABQYAQcRtqED8iAUUNESABIANBIGpBxAD8CgAAIAFBATYCACACBEAgASABIARqNgIgCyABKAJAIgQEQCABIAEgB2o2AiQLIAEoAjwEQCABIAEgBmo2AjgLIAUoAhAhBiABIAEtAARB4AFxQQFyOgAEIAYo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IBMgEhsiFUEAIBVBAEobIhJrIhVBACATIBVPGyEdA0ACQCASICNGBEADQCASIB1GDQIgIiASQQN0akKAgICAMDcDACASQQFqIRIMAAsACyAFICNBA3QiFWopAwAiB0KAgICA8H5aBEAgB6ciICAgKAIAQQFqNgIACyAVICJqIAc3AwAgHUEBaiEdICNBAWohIwwBCwsgGCATNgI4ICIhIAsgGCAgNgIoIBggIiAGQQN0aiIdNgIsQQAhEgNAIBIgFEcEQCAdIBJBA3RqQoCAgIAwNwMAIBJBAWohEgwBCwsgGCAdIBRBA3RqIhMgFkEDdGoiBjYCMEEAIRIDQCASIBdHBEAgBiASQQJ0akEANgIAIBJBAWohEgwBCwsgHCgCFCEVIBggISgClAE2AhggISAYQRhqIhk2ApQBIBwoAjQhEiATISMLQQAMAQtBAQshBgNAAkACQAJAAkACQAJAIAZFBEAgAkKAgICAYIMhECAEQQN0IS8gBEECdCEwIANCgICAgHCDIQ4gHUEIaiEmIB1BEGohJyAdQRhqISggIEEIaiEpICBBEGohKiAgQRhqISsgBK0hDyADpyEtIBhB4ABqITEgGEHYAGohLgNAIBMhESAVIgZBAWohFUIAIQdCgICAgDAhCAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAn4CQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkAC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AwAiCEKAgICA8H5aBEAgCKciFiAWKAIAQQFqNgIACyAGIAg3AxggFyAUQQJ0aiAGNgIAIBRBAWohFAwACwALIBkpAwgiB0KAgICA8H5aBEAgB6ciBiAGKAIAQQFqNgIACyARIAc3AwAgEUEIaiETDIACCyADQoCAgIDwfloEQCAtIC0oAgBBAWo2AgALIBEgAzcDACARQQhqIRMM/wELIBEgJSgCKCIGBH4gBiAGKAIAQQFqNgIAIAatQoCAgIBwhAVCgICAgDALNwMAIBFBCGohEwz+AQsgESASQoCAgIAgEJABIgc3AwAgEUEIaiETIAdCgICAgOAAUg39AQyCAgsCQCASEPIFIhQEQCASIBQQ8QUhBiASIBQQGSAGDQELIBJB8SVBABAWIBFCgICAgOAANwMAIBFBCGohEQyDAgsgBikDwAEiB0KAgICAcINCgICAgDBRBEAgEkKAgICAIBCQASIHQoCAgIDgAFEEQCARQoCAgIDgADcDACARQQhqIREMhAILIAYgBzcDwAELIAdCgICAgPB+WgRAIAenIgYgBigCAEEBajYCAAsgESAHNwMAIBFBCGohEyAHQoCAgIBwg0KAgICA4ABSDfwBDIECCxAuAAsgESASIAQgBi8AASITIAQgBCATShsiE2sgBSATQQN0ahDTAiIHNwMAIBFBCGohEyAGQQNqIRUgB0KAgICA4ABSDfoBDP8BCyASIBFBCGsiEykDABATDPkBCyASIBFBEGsiBikDABATIAYgEUEIayITKQMANwMADPgBCyASIBFBGGsiBikDABATIAYgEUEQayIGKQMANwMAIAYgEUEIayITKQMANwMADPcBCyARQQhrKQMAIgdCgICAgPB+WgRAIAenIgYgBigCAEEBajYCAAsgESAHNwMAIBFBCGohEwz2AQsgEUEQaykDACIHQoCAgIDwfloEQCAHpyIGIAYoAgBBAWo2AgALIBEgBzcDACARQQhrKQMAIgdCgICAgPB+WgRAIAenIgYgBigCAEEBajYCAAsgESAHNwMIIBFBEGohEwz1AQsgEUEYaykDACIHQoCAgIDwfloEQCAHpyIGIAYoAgBBAWo2AgALIBEgBzcDACARQRBrKQMAIgdCgICAgPB+WgRAIAenIgYgBigCAEEBajYCAAsgESAHNwMIIBFBCGspAwAiB0KAgICA8H5aBEAgB6ciBiAGKAIAQQFqNgIACyARIAc3AxAgEUEYaiETDPQBCyARIBFBCGsiBikDADcDACARQRBrKQMAIgdCgICAgPB+WgRAIAenIhMgEygCAEEBajYCAAsgBiAHNwMAIBFBCGohEwzzAQsgESARQQhrIgYpAwAiBzcDACAGIBFBEGsiBikDADcDACAHQoCAgIDwfloEQCAHpyITIBMoAgBBAWo2AgALIAYgBzcDACARQQhqIRMM8gELIBEgEUEIayIGKQMAIgc3AwAgEUEQayITKQMAIQggEyARQRhrIhMpAwA3AwAgBiAINwMAIAdCgICAgPB+WgRAIAenIgYgBigCAEEBajYCAAsgEyAHNwMAIBFBCGohEwzxAQsgESARQQhrIgYpAwAiBzcDACARQRBrIhMpAwAhCCATIBFBGGsiEykDADcDACAGIAg3AwAgEyARQSBrIgYpAwA3AwAgB0KAgICA8H5aBEAgB6ciEyATKAIAQQFqNgIACyAGIAc3AwAgEUEIaiETDPABCyARQRBrIgYpAwAhByAGIBFBGGsiBikDADcDACAGIAc3AwAM7wELIBFBGGsiBikDACEHIAYgEUEQayIGKQMANwMAIBFBCGsiEykDACEIIBMgBzcDACAGIAg3AwAgESETDO4BCyARQSBrIgYpAwAhByAGIBFBGGsiBikDADcDACARQRBrIhMpAwAhCCATIBFBCGsiEykDADcDACAGIAg3AwAgEyAHNwMAIBEhEwztAQsgEUEoayIGKQMAIQcgBiARQSBrIgYpAwA3AwAgEUEYayITKQMAIQggEyARQRBrIhMpAwA3AwAgBiAINwMAIBMgEUEIayIGKQMANwMAIAYgBzcDACARIRMM7AELIBFBCGsiBikDACEHIAYgEUEQayIGKQMANwMAIBFBGGsiEykDACEIIBMgBzcDACAGIAg3AwAgESETDOsBCyARQRBrIgYpAwAhByAGIBFBGGsiBikDADcDACARQSBrIhMpAwAhCCATIAc3AwAgBiAINwMAIBEhEwzqAQsgEUEQayIGKQMAIQcgBiARQRhrIgYpAwA3AwAgEUEgayITKQMAIQggEyARQShrIhMpAwA3AwAgBiAINwMAIBMgBzcDACARIRMM6QELIBFBCGsiBikDACEHIAYgEUEQayIGKQMANwMAIAYgBzcDAAzoAQsg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CyAgKQMAIgdCgICAgPB+WgRAIAenIgYgBigCAEEBajYCAAsgESAHNwMAIBFBCGohEwy7AQsgKSkDACIHQoCAgIDwfloEQCAHpyIGIAYoAgBBAWo2AgALIBEgBzcDACARQQhqIRMMugELICopAwAiB0KAgICA8H5aBEAgB6ciBiAGKAIAQQFqNgIACyARIAc3AwAgEUEIaiETDLkBCyArKQMAIgdCgICAgPB+WgRAIAenIgYgBigCAEEBajYCAAsgESAHNwMAIBFBCGohEwy4AQsgEiAgIBFBCGsiEykDABAhDLcBCyASICkgEUEIayITKQMAECEMtgELIBIgKiARQQhrIhMpAwAQIQy1AQsgEiArIBFBCGsiEykDABAhDLQBCyARQQhrKQMAIgdCgICAgPB+WgRAIAenIgYgBigCAEEBajYCAAsgEiAgIAcQIQyzAQsgEUEIaykDACIHQoCAgIDwfloEQCAHpyIGIAYoAgBBAWo2AgALIBIgKSAHECEMsgELIBFBCGspAwAiB0KAgICA8H5aBEAgB6ciBiAGKAIAQQFqNgIACyASICogBxAhDLEBCyARQQhrKQMAIgdCgICAgPB+WgRAIAenIgYgBigCAEEBajYCAAsgEiArIAcQIQywAQsgHigCACgCECkDACIHQoCAgIDwfloEQCAHpyIGIAYoAgBBAWo2AgALIBEgBzcDACARQQhqIRMMrwELIB4oAgQoAhApAwAiB0KAgICA8H5aBEAgB6ciBiAGKAIAQQFqNgIACyARIAc3AwAgEUEIaiETDK4BCyAeKAIIKAIQKQMAIgdCgICAgPB+WgRAIAenIgYgBigCAEEBajYCAAsgESAHNwMAIBFBCGohEwytAQsgHigCDCgCECkDACIHQoCAgIDwfloEQCAHpyIGIAYoAgBBAWo2AgALIBEgBzcDACARQQhqIRMMrAELIBIgHigCACgCECARQQhrIhMpAwAQIQyrAQsgEiAeKAIEKAIQIBFBCGsiEykDABAhDKoBCyASIB4oAggoAhAgEUEIayITKQMAECEMqQELIBIgHigCDCgCECARQQhrIhMpAwAQIQyoAQsgHigCACgCECEGIBFBCGspAwAiB0KAgICA8H5aBEAgB6ciEyATKAIAQQFqNgIACyASIAYgBxAhIBEhEwynAQsgHigCBCgCECEGIBFBCGspAwAiB0KAgICA8H5aBEAgB6ciEyATKAIAQQFqNgIACyASIAYgBxAhIBEhEwymAQsgHigCCCgCECEGIBFBCGspAwAiB0KAgICA8H5aBEAgB6ciEyATKAIAQQFqNgIACyASIAYgBxAhIBEhEwylAQsgHigCDCgCECEGIBFBCGspAwAiB0KAgICA8H5aBEAgB6ciEyATKAIAQQFqNgIACyASIAYgBxAhIBEhEwykAQsgHiAGLwABQQJ0aigCACgCECkDACIHQoCAgIDwfloEQCAHpyITIBMoAgBBAWo2AgALIAZBA2ohFSARIAc3AwAgEUEIaiETDKMBCyASIB4gBi8AAUECdGooAgAoAhAgEUEIayITKQMAECEgBkEDaiEVDKIBCyAeIAYvAAFBAnRqKAIAKAIQIRMgEUEIaykDACIHQoCAgIDwfloEQCAHpyIVIBUoAgBBAWo2AgALIAZBA2ohFSASIBMgBxAhIBEhEwyhAQsgBkEDaiEVIB4gBi8AASIGQQJ0aigCACgCECkDACIHQoCAgIBwg0KAgICAwABSBEAgB0KAgICA8H5aBEAgB6ciBiAGKAIAQQFqNgIACyARIAc3AwAgEUEIaiETDKEBCyASIBwgBkEBEPkBDKYBCyAGQQNqIRUgHiAGLwABIgZBAnRqKAIAKAIQIhQ1AgRCIIZCgICAgMAAUgRAIBIgFCARQQhrIhMpAwAQIQygAQsgEiAcIAZBARD5AQylAQsgBkEDaiEVIB4gBi8AASIGQQJ0aigCACgCECIUNQIEQiCGQoCAgIDAAFIEQCASIBwgBkEBEPkBDKUBCyASIBQgEUEIayITKQMAECEMngELIBIgHSAGLwABQQN0akKAgICAwAAQISAGQQNqIRUMnQELIAZBA2ohFSAdIAYvAAEiBkEDdGopAwAiB0KAgICAcINCgICAgMAAUgRAIAdCgICAgPB+WgRAIAenIgYgBigCAEEBajYCAAsgESAHNwMAIBFBCGohEwydAQsgEiAcIAZBABD5AQyiAQsgBkEDaiEVIB0gBi8AASIGQQN0aikDACIHQoCAgIBwg0KAgICAwABSBEAgB0KAgICA8H5aBEAgB6ciBiAGKAIAQQFqNgIACyARIAc3AwAgEUEIaiETDJwBCyAAIBwgBkEAEPkBDKEBCyAGQQNqIRUgHSAGLwABIgZBA3RqIhQ1AgRCIIZCgICAgMAAUgRAIBIgFCARQQhrIhMpAwAQIQybAQsgEiAcIAZBABD5AQygAQsgBkEDaiEVIB0gBi8AASIGQQN0aiIUNQIEQiCGQoCAgIDAAFIEQCARQQhrKQMAIgdCgICAgPB+WgRAIAenIgYgBigCAEEBajYCAAsgEiAUIAcQIQyaAQsgEiAcIAZBABD5AQyfAQsgBkEDaiEVIB0gBi8AAUEDdGoiBjUCBEIghkKAgICAwABSBEAgEkGegQFBABDRAgyfAQsgEiAGIBFBCGsiEykDABAhDJgBCyAGQQNqIRUgHCgCICAGLwABQQxsaiAcLwEoQQxsai8BCkECdCIGIBkoAhhqKAIAIhFFDZcBIBIoAhAgGSAREOwFIBkoAhggBmpBADYCAAyXAQsgBi8ABSEXIAYoAAEhGiARIBJCgICAgCAQkAEiBzcDACARQQhqIRQgBkEHaiEVIAdCgICAgOAAUQ2KASAWQfgARgRAIB4gF0ECdGooAgAiBiAGKAIAQQFqNgIADIoBCyASIBkgFyAWQfcARhCqAyIGDYkBIBQhEQycAQsgBigAASEUIBkgBkEFaiIVNgIcIBIpA9gBIgenIhcoAhQiBkEwaiEWIAYgFCAGKAIYcUF/c0ECdGooAgAhBgJAAkACQAJAA0AgBkUNASAUIBYgBkEBa0EDdCIaaiIGKAIERwRAIAYoAgBB////H3EhBgwBCwsgFygCGCAaaigCACgCEDUCBEIghkKAgICAwABRBEAgEiAUEN4BDKABCyAGLQADQQhxRQ0DIAdC/////+9+Vg0BDAILIBIgEikD0AEgFBBLIgZBAEgNngEgBkUEQEKAgICAMCEHDAILIBIpA9ABIgdCgICAgPB+VA0BIAenIRcLIBcgFygCAEEBajYCAAsgESAHNwMAIBEgEiAUEFc3AwggEUEQaiETDJYBCyASIBRBwR0QlAEMmwELIBUgFSgAAGohFSASEH9FDZQBDJoBCyAVIBUuAABqIRUgEhB/RQ2TAQyZAQsgFSAVLAAAaiEVIBIQf0UNkgEMmAELIAZBBWohBgJ/IBFBCGsiEykDACIHQv////8/WARAIAenDAELIBIgBxAtCwR/IAYgFSgAAGpBBGsFIAYLIRUgEhB/RQ2RAQxfCyAGQQVqIQYCfyARQQhrIhMpAwAiB0L/////P1gEQCAHpwwBCyASIAcQLQsEfyAGBSAGIBUoAABqQQRrCyEVIBIQf0UNkAEMXgsgBkECaiEGAn8gEUEIayITKQMAIgdC/////z9YBEAgB6cMAQsgEiAHEC0LBH8gBiAVLAAAakEBawUgBgshFSASEH9FDY8BDF0LIAZBAmohBgJ/IBFBCGsiEykDACIHQv////8/WARAIAenDAELIBIgBxAtCwR/IAYFIAYgFSwAAGpBAWsLIRUgEhB/RQ2OAQxcCyARIBUgBigAAWogHCgCFGutQoCAgIDQAIQ3AwAgBkEFaiEVIBFBCGohEwyNAQsgBigAASARIAYgHCgCFGtBBWqtNwMAIBFBCGohEyAVaiEVDIwBCwJAIBFBCGsiEykDACIHQv////8PVg0AIAenIgYgHCgCGE8NACAcKAIUIAZqIRUMjAELIBJBye8AQQAQNgyRAQsgGSAVNgIcAn4gEUEIayIaKQMAIglCIIinQQFqIgZBBE0EQCAJQQEgBnRBGXENARoLIBIgCRDrBQshCAJAAkAgEkEYECciFkUNACASQoCAgIAgQREQaSIHQoCAgIDgAFEEQCASKAIQIgZBEGogFiAGKAIEEQAADAELIBZBADYCFCAWIAg3AwAgFkEAOwEQIBZCADcDCCAHpyAWNgIgIAlCgICAgGCDQoCAgIAgUQ1+AkAgCKciFy0ABUEIcUUNAEEAIQYgFygCFCIUKAIgIhtBACAbQQBKGyEbIBRBMGohFANAIAYgG0YNAyAULQADQRBxDQEgFEEIaiEUIAZBAWohBgwACwALIBIgGEHQAGogGEGAAWogF0EhEHdFDUkgByEICyASIAgQEyAaQoCAgIDgADcDAAyRAQsgFkEBOgARIBdBKGohEwx7CyAZIBU2AhxCgYCAgBAhDAJAIBFBCGspAwAiCUKAgICAcFQNACAJpyIaLwEGQRFHDQAgGigCICEGAkADQCAGKAIIIhQgBigCDE8EQCAGKQMAIgdCgICAgBCEQoCAgIBwg0KAgICAMFENAyAGIBIgBi0AEAR+IAcFIBooAiAiFikDACIHQoCAgIDwfloEQCAHpyIUIBQoAgBBAWo2AgALAkADQCASIAcQzgIiB0KAgICAcIMiCkKAgICAIFENBSAKQoCAgIDgAFENlgEgEiAYQdAAaiIUIBhBgAFqIhcgB6dBERB3RQRAIBIgGCgCUCAYKAKAASIbEFggGwRAIBIgBxATIBYtABEEQCASIBQgFyAWKAIAQSEQdw2ZASAWQQA6ABEgFiAYKAJQNgIUIBYgGCgCgAE2AgwLQQAhFANAIBQgFigCDE8NBCAUQQN0IRcgFEEBaiEUIBIgCSAXIBYoAhRqKAIEQoCAgIAgQQQQHkEATg0ACwyYAQsgEhB/RQ0BCwsgEiAHEBMMlQELIAZBAToAECAGKQMACxDOAiIHNwMAIAdCgICAgHCDIgdCgICAgCBRDQMgB0KAgICA4ABRDZMBIBIQfw2TASASIBhB+ABqIBhBnAFqIAYoAgBBIRB3DZMBIBIgBigCFCAGKAIMEFggBiAYKAJ4NgIUIBgoApwBIRQgBkEANgIIIAYgFDYCDAwBCwJAIAYtABEEQCAGIBRBAWo2AgggFEGAgICAeHIhFwwBCyAGKAIUIBRBA3RqIhYoAgAgFigCBCEXIAYgFEEBajYCCCAGLQAQBEAgEkEAIBogFxBKIhRBAEgNlAEgFA0CIBIgCSAXQoCAgIAgQQQQHkEASA2UAQtFDQELIBJBACAGKAIAIBcQSiIUQQBIDZIBIBRFDQALQoCAgIAQIQwgEiAXEFchCAwBCyASIAcQEwsgESAMNwMIIBEgCDcDACARQRBqIRMMiQELIBkgFTYCHCASIBFBABDqBQ2OASARQoCAgIDQADcDCCARQRBqIRMMiAELIAYtAAEhFCAZIAZBAmoiFTYCHCAYQQE2AlBCgICAgDAhB0KBgICAECEIIBFBfSAUa0EDdGoiBikDACIJQoCAgIBwg0KAgICAMFENdyASIAkgBikDCCAYQdAAahA5IgdCgICAgHCDQoCAgIDgAFEEQEF/IRQgGEF/NgJQDHcLIBgoAlAiFA12QoCAgIAQIQgMdwsgGSAVNgIcIBFBCGtCgICAgDA3AwAgEiARQRBrKQMAIBFBGGspAwBBAEEAEBwiB0KAgICAcINCgICAgOAAUQ2MASARIAc3AwAgEUEIaiETDIYBCyAZIBU2AhwgEiARQQEQ6gUNiwEgEUKAgICA0AA3AwggEUEQaiETDIUBCyAZIBU2AhwgEUEIayIGKQMAIgdC/////29YBEAgEkGsNEEAEBYMiwELIBIgByAYQdAAahDpBSIIQoCAgIDgAFENigEgEiAHEBMgEUEQa0KAgICA0AA3AwAgBiAINwMAIBEgGCgCUEEAR61CgICAgBCENwMAIBFBCGohEwyEAQsgEUEIaykDAEL/////b1YNgwEgEkGsNEEAEBYMiQELIBIgEUEQayIGKQMAEBMgEUEYayITKQMAIgdCgICAgHCDQoCAgIAwUQ2CASAZIBU2AhwgEiAHQQAQRARAIAYhEQyJAQsgEiATKQMAEBMMggELIBFBCGsiEykDACEHA0ACQCATICNNDQAgE0EIayIGKQMAIghCgICAgHCDQoCAgIDQAFENACASIAgQEyAGIRMMAQsLIBMgI0YEQCASQeXmAEEAEDYgEiAHEBMMUAsgE0EIayAHNwMADIEBCyAZIBU2AhwgEiARQRhrKQMAIBFBIGspAwBBASARQQhrIgYQHCIHQoCAgIBwg0KAgICA4ABRDYYBIBIgBikDABATIAYgBzcDAAyAAQsgBi0AASEUIBkgBkECaiIVNgIcIBEgEiARQSBrIgYpAwAiB0EXQQYgFEEBcRsgB0EAEBgiB0KAgICAcIMiCEKAgICAIFEgCEKAgICAMFFyBH5CgYCAgBAFIAhCgICAgOAAUQ2GASAGKQMAIQgCfiAUQQJxBEAgEiAHIAhBAEEAED0MAQsgEiAHIAhBASARQQhrED0LIgdCgICAgHCDQoCAgIDgAFENhgEgEiARQQhrIgYpAwAQEyAGIAc3AwBCgICAgBALNwMAIBFBCGohEwx/CwJ/IBFBCGsiBikDACIHQv////8/WARAIAenRQwBCyASIAcQLUULIRMgBiATrUKAgICAEIQ3AwAgESETDH4LIAZBBWohFSAGKAABIQYgEUEIayIaKQMAIgchCCAHQoCAgIBwVA1qIAenIRQDQCAUKAIUIhZBMGohGyAWIBYoAhggBnFBf3NBAnRqKAIAIRcCQANAIBdFDQEgGyAXQQFrIh9BA3RqIiQoAgAhFyAGICQoAgRHBEAgF0H///8fcSEXDAELCyAXQf////8DSw1sIBQoAhggH0EDdGopAwAiCEKAgICA8H5UDW0gCKciBiAGKAIAQQFqNgIADG0LIBQtAAVBBHEEQCAUrUKAgICAcIQhCAxsCyAWKAIsIhQNAAtCgICAgDAhCAxrCyAGQQVqIRUgBigAASEGIBFBCGspAwAiByEIIAdCgICAgHBUDWcgB6chFANAIBQoAhQiFkEwaiEaIBYgFigCGCAGcUF/c0ECdGooAgAhFwJAA0AgF0UNASAaIBdBAWsiG0EDdGoiHygCACEXIAYgHygCBEcEQCAXQf///x9xIRcMAQsLIBdB/////wNLDWkgFCgCGCAbQQN0aikDACIHQoCAgIDwflQNaiAHpyIGIAYoAgBBAWo2AgAMagsgFC0ABUEEcQRAIBStQoCAgIBwhCEIDGkLIBYoAiwiFA0AC0KAgICAMCEHDGgLIBFBCGsiFikDACIHIQggB0KAgICAcFQNZCAHpyEUA0AgFCgCFCIGQTBqIRogBiAGKAIYQX9zQQJ0QbR+cmooAgAhFwJAA0AgF0UNASAaIBdBAWsiG0EDdGoiHygCACEXIB8oAgRBMkcEQCAXQf///x9xIRcMAQsLIBdB/////wNLDWYgFCgCGCAbQQN0aikDACIIQoCAgIDwflQNZyAIpyIGIAYoAgBBAWo2AgAMZwsgFC0ABUEEcQRAIBStQoCAgIBwhCEIDGYLIAYoAiwiFA0AC0KAgICAMCEIDGULIAZBBWohFSAGKAABIQYCQCARQRBrIhMpAwAiB0KAgICAcFQNACAHpyIWKAIUIhRBMGohFyAUIBQoAhggBnFBf3NBAnRqKAIAIRQDQCAURQ0BIBcgFEEBayIaQQN0aiIbKAIAIRQgBiAbKAIERwRAIBRB////H3EhFAwBCwsgFEGAgIDAfnFBgICAwABHDQAgEiAWKAIYIBpBA3RqIBFBCGspAwAQISASIAcQEwx7CyAZIBU2AhwgEiAHIAYgEUEIaykDACAHQYCAAhChASASIAcQE0EATg16DEgLIAZBBWohFSASIAYoAAEQ7gUiB0KAgICA4ABRDX8gESAHNwMAIBFBCGohEwx5CyARQQhrIRMCQCARQRBrIhEpAwAiB0L/////b1gEQCASECVCgICAgOAAIQcMAQsgEykDACIIQoCAgIBwg0KAgICAgH9SBEAgEhCWBEKAgICA4AAhBwwBCyASKAIQIAinELMBIQYgB6ciFigCFCIUQTBqIRcgFCAGIBQoAhhxQX9zQQJ0aigCACEUAkADQCAUBEAgFyAUQQFrQQN0IhRqIhooAgQgBkYNAiAaKAIAQf///x9xIRQMAQsLIBIgBhDoBUKAgICA4AAhBwwBCyAWKAIYIBRqKQMAIgdCgICAgPB+VA0AIAenIgYgBigCAEEBajYCAAsgEiATKQMAEBMgEiARKQMAEBMgESAHNwMAIAdCgICAgHCDQoCAgIDgAFINeAxGCyARQRBrKQMAIQcgEUEIayEGAkACQCARQRhrIhMpAwAiCEL/////b1gEQCASECUMAQsgBikDACIJQoCAgIBwg0KAgICAgH9SBEAgEhCWBAwBCyASKAIQIAmnELMBIREgCKciFigCFCIUQTBqIRcgFCARIBQoAhhxQX9zQQJ0aigCACEUA0AgFARAIBcgFEEBa0EDdCIUaiIaKAIEIBFGDQMgGigCAEH///8fcSEUDAELCyASIBEQ6AULIBIgBxATIBIgEykDABATIBIgBikDABATDEYLIBIgFigCGCAUaiAHECEgEiATKQMAEBMgEiAGKQMAEBMMdwsgEUEIaykDACEHIBFBEGshEwJAAkAgEUEYaykDACIIQv////9vWARAIBIQJQwBCyATKQMAIglCgICAgHCDQoCAgICAf1IEQCASEJYEDAELIBIoAhAgCacQswEhESAIpyIUKAIUIgZBKGohFiAGIBEgBigCGHFBf3NBAnRqKAIAIQYCQANAIAZFDQEgESAWIAZBA3RqIgYoAgRHBEAgBigCAEH///8fcSEGDAELCyASIBFBoDcQlAEMAQsgEiAUIBFBBxB+IgYNAQsgEiAHEBMgEiATKQMAEBMMRQsgBiAHNwMAIBIgEykDABATDHYLIAZBBWohFSASIBFBEGspAwAgBigAASARQQhrIhMpAwBBh4ABEB5BAE4NdQxDCyAGQQVqIRUgEiARQQhrKQMAIAYoAAEQ5wVBAE4NdAx6CyASIBFBCGspAwAgEUEQaykDABDmBUEATg1zDHkLIBkgFTYCHCARQQhrIhMpAwAiB0L/////b1ggB0KAgICAcINCgICAgCBScUUEQCASIBFBEGspAwAgB0EBEJgCQQBIDXkLIBIgBxATDHILIBIgEUEIaykDACARQRBrKQMAEJUEDHELIBECfyAWQdIARgRAQX0gEiARQRBrKQMAEDEiBg0BGgx4CyAGQQVqIRUgBigAASEGQX4LQQN0akGDzgEhEyARQQhrIhcpAwAiCSELQoCAgIAwIQwCQAJAAkAgFS0AACIaQQNxDgICAAELQoCAgIAwIQtBgZoBIRMgCSEMDAELQoCAgIAwIQtBgaoBIRMgCSEICykDACEKIBIgBhDlBSEH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QQBODQALDEULIBFBGGshFANAIBIgByAIIBhB+ABqEDkiCUKAgICAcINCgICAgOAAUQ1FIBgoAngNASASIBQpAwAgBiAJQQcQxAFBAEgNRSAGQQFqIQYMAAsACyAWIAatNwMAIBIgBxATIBIgCBATIBIgEykDABATDGULIAYtAAEhFCAZIAZBAmoiFTYCHCASIBEgFEF/cyIGQQN0QWByaikDACARIAZBAXRBQHJBeHFqKQMAIBEgFEEFdkF/c0EDdGopAwBBABDjBUUNZAxqCyARQQhrIhMpAwAiB0IgiCIJpyIUIBFBEGsiBikDACIIQiCIIgqnIhZyRQRAIAYCfiAHxCAIxHwiB0KAgICACHxCgICAgBBaBEBCgICAgOB+IAe5vSIHQoCAgICggYD8/wB9IAdC////////////AINCgICAgICAgPj/AFYbDAELIAdC/////w+DCzcDAAxkCyAWQQhrQW5LIBRBCGtBbktyRQRAIAZCgICAgOB+IAhCgICAgKCBgPz/AHy/IAdCgICAgKCBgPz/AHy/oL0iB0KAgICAoIGA/P8AfSAHQv///////////wCDQoCAgICAgID4/wBWGzcDAAxkCyAKQvv///8PfUJ+VCAJQvv///8PfUJ+VHJFBEAgBiASIAggBxCXAiIHNwMAIAdCgICAgHCDQoCAgIDgAFINZAwyCyAZIBU2AhwgEiAREOIFRQ1jDGkLIAZBAmohFSAdIAYtAAFBA3RqIgYpAwAiB0IgiKciFCARQQhrIhMpAwAiCEIgiCIJpyIRckUEQCAGAn4gB8QgCMR8IgdCgICAgAh8QoCAgIAQWgRAQoCAgIDgfiAHub0iB0KAgICAoIGA/P8AfSAHQv///////////wCDQoCAgICAgID4/wBWGwwBCyAHQv////8Pgws3AwAMYwsgEUEIa0FuSyAUQQhrQW5LckUEQCAGQoCAgIDgfiAIQoCAgICggYD8/wB8vyAHQoCAgICggYD8/wB8v6C9IgdCgICAgKCBgPz/AH0gB0L///////////8Ag0KAgICAgICA+P8AVhs3AwAMYwsgCUL5////D1IgB0KAgICAcINCgICAgJB/UnJFBEAgGSAVNgIcIBIgB6cgCBDhBQRAIBIgCBATDGQLIAYpAwAiB0KAgICA8H5aBEAgB6ciESARKAIAQQFqNgIA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fiAHQoCAgICggYD8/wB9IDO9Qv///////////wCDQoCAgICAgID4/wBWGwshByAaIAc3AwAMBAtCgICAgOB+IAdCgICAgKCBgPz/AH0gM71C////////////AINCgICAgICAgPj/AFYbCyEHIBogBzcDAAwCC0KAgICA4H4gB0KAgICAoIGA/P8AfSAzvUL///////////8Ag0KAgICAgICA+P8AVhsLIQcgGiAHNwMAC0EADAILIBIgCBATCyAaQoCAgIAwNwMAIDJCgICAgDA3AwBBfwsgFEEwaiQADWMgEUEIayETDF0LIBFBCGsiBikDACIHQiCIIginQQhrIRQgCFAgFEFvSXINXCAHQv////8vWARAIAYgB0L/////D4M3AwAMXQsgGSAVNgIcIBIgEUGLARD3AUUNXAxiCwJAAnwCQCARQQhrIgYpAwAiB0KAgICAIFoEQCAHQiCIIghCAlINAQtEAAAAAAAAAIAgB6ciE0UNARpEAAAAAAAA4EEgE0GAgICAeEYNARogBkIAIAd9Qv////8PgzcDACARIRMMXgsgCKdBCGtBbksNASAHQoCAgIDg/v8Dfb8LITMgBkKAgICA4H4gM70iB0KAgICAoIGA/P8AfSAHQv///////////wCDQoCAgICAgID4/wBWGzcDACARIRMMXAsgGSAVNgIcIBIgEUGKARD3AUUNWwxhCyARQQhrIgYpAwAiB0L/////D1YgB0L/////B1FyRQRAIAYgB0IBfEL/////D4M3AwAMWwsgGSAVNgIcIBIgEUGNARD3AUUNWgxgCyARQQhrIgYpAwAiB0L/////D1YgB0KAgICACFFyRQRAIAYgB0IBfUL/////D4M3AwAMWgsgGSAVNgIcIBIgEUGMARD3AUUNWQxfCwJAIBFBCGspAwAiB0L/////D1YgB0L/////B1FyRQRAIBEgB0IBfEL/////D4M3AwAMAQsgGSAVNgIcIBIgEUGPARDgBQ1fCyARQQhqIRMMWAsCQCARQQhrKQMAIgdC/////w9WIAdCgICAgAhRckUEQCARIAdCAX1C/////w+DNwMADAELIBkgFTYCHCASIBFBjgEQ4AUNXgsgEUEIaiETDFcLIAZBAmohFSAdIAYtAAFBA3RqIgYpAwAiB0L/////D1YgB0L/////B1FyRQRAIAYgB0IBfEL/////D4M3AwAMVwsgGSAVNgIcIAdCgICAgPB+WgRAIAenIhQgFCgCAEEBajYCAAsgGCAHNwNQIBIgLkGNARD3AQ1cIBIgBiAYKQNQECEMVgsgBkECaiEVIB0gBi0AAUEDdGoiBikDACIHQv////8PViAHQoCAgIAIUXJFBEAgBiAHQgF9Qv////8PgzcDAAxWCyAZIBU2AhwgB0KAgICA8H5aBEAgB6ciFCAUKAIAQQFqNgIACyAYIAc3A1AgEiAuQYwBEPcBDVsgEiAGIBgpA1AQIQxVCyARQQhrIgYpAwAiB0L/////D1gEQCAGIAdC/////w+FNwMADFULIBkgFTYCHCMAQRBrIhYkAAJ/AkAgEiARQQhrIgYpAwAQbiIHQoCAgIBwg0KAgICA4ABRDQACQAJAIAdCIIgiCEL3////D1IEQCAIp0EHRw0BIAYgB0L/////D4NC//////8AhTcDAEEADAQLIBIgB6ciFygCBBBZIhpFDQEgGkEIaiEbIBdBCGohH0EAIRQDQCAXKAIEIBRLBEAgGyAUQQJ0IiRqIB8gJGooAgBBf3M2AgAgFEEBaiEUDAELCyASIAcQEyAGIBIgGhDCATcDAEEADAMLIBIgFkEMaiAHEJ4BDQEgBiAWNQIMQv////8PhTcDAEEADAILIBIgBxATCyAGQoCAgIAwNwMAQX8LIBZBEGokAEUNVAxaCyARQQhrIhMpAwAiByARQRBrIgYpAwAiCIRC/////w9YBEAgBiAIpyAHp3StNwMADFQLIBkgFTYCHCASIBFBngEQzQJFDVMMWQsgEUEIayITKQMAIgcgEUEQayIGKQMAIgiEQv////8PWARAIAYCfiAIpyAHp3YiBkEATgRAIAatDAELQoCAgIDgfiAGuL0iB0KAgICAoIGA/P8AfSAHQoCAgICAgID4/wBWGws3AwAMUwsgGSAVNgIcIwBBEGsiBiQAIBFBCGsiFikDACEHAn8CQAJAIBIgEUEQayIUKQMAEG4iCEKAgICAcINCgICAgOAAUQ0AIBIgBxBuIgdCgICAgHCDQoCAgIDgAFEEQCAIIQcMAQsCQCAIQiCIIglC9////w9RIAmnQQdGcg0AIAdCIIgiCUIHUQ0AIAmnQXdHDQILIBJBg6cBQQAQFiASIAgQEwsgEiAHEBMgFEKAgICAMDcDACAWQoCAgIAwNwMAQX8MAQsgEiAGQQxqIAgQngEaIBIgBkEIaiAHEJ4BGiAUAn4gBigCDCAGKAIIdiIUQQBOBEAgFK0MAQtCgICAgOB+IBS4vSIHQoCAgICggYD8/wB9IAdCgICAgICAgPj/AFYbCzcDAEEACyAGQRBqJABFDVIMWAsgEUEIayITKQMAIgcgEUEQayIGKQMAIgiEQv////8PWARAIAYgCKcgB6d1rTcDAAxSCyAZIBU2AhwgEiARQZ8BEM0CRQ1RDFcLIBFBCGsiEykDACIHIBFBEGsiBikDACIIhEL/////D1gEQCAGIAcgCIM3AwAMUQsgGSAVNgIcIBIgEUGrARDNAkUNUAxWCyARQQhrIhMpAwAgEUEQayIGKQMAhCIHQv////8PWARAIAYgBzcDAAxQCyAZIBU2AhwgEiARQa0BEM0CRQ1PDFULIBFBCGsiEykDACIHIBFBEGsiBikDACIIhEL/////D1gEQCAGIAcgCIU3AwAMTwsgGSAVNgIcIBIgEUGsARDNAkUNTgxUCyARQQhrIhMpAwAiByARQRBrIgYpAwAiCIRC/////w9YBEAgBiAIpyAHp0itQoCAgIAQhDcDAAxOCyAZIBU2AhwgEiARQaEBEKUDRQ1NDFMLIBFBCGsiEykDACIHIBFBEGsiBikDACIIhEL/////D1gEQCAGIAinIAenTK1CgICAgBCENwMADE0LIBkgFTYCHCASIBFBogEQpQNFDUwMUgsgEUEIayITKQMAIgcgEUEQayIGKQMAIgiEQv////8PWARAIAYgCKcgB6dKrUKAgICAEIQ3AwAMTAsgGSAVNgIcIBIgEUGjARClA0UNSwxRCyARQQhrIhMpAwAiByARQRBrIgYpAwAiCIRC/////w9YBEAgBiAIpyAHp06tQoCAgIAQhDcDAAxLCyAZIBU2AhwgEiARQaQBEKUDRQ1KDFALIBFBCGsiEykDACIHIBFBEGsiBikDACIIhEL/////D1gEQCAGIAcgCFGtQoCAgIAQhDcDAAxKCyAZIBU2AhwgEiARQQAQ3wVFDUkMTwsgEUEIayITKQMAIgcgEUEQayIGKQMAIgiEQv////8PWARAIAYgByAIUq1CgICAgBCENwMADEkLIBkgFTYCHCASIBFBARDfBUUNSAxOCyARQQhrIhMpAwAiByARQRBrIgYpAwAiCIRC/////w9YBEAgBiAHIAhRrUKAgICAEIQ3AwAMSAsgGSAVNgIcIBIgEUEAEN4FDEcLIBFBCGsiEykDACIHIBFBEGsiBikDACIIhEL/////D1gEQCAGIAcgCFKtQoCAgIAQhDcDAAxHCyAZIBU2AhwgEiARQQEQ3gUMRgsgGSAVNgIcIBFBCGsiEykDACIHQv////9vWARAIBJBp4YBQQAQFgxMCyASIBFBEGsiFikDACIIEDEiBkUNSyASIAcgBhBLIRQgEiAGEBkgFEEASA1LIBIgCBATIBIgBxATIBYgFEEAR61CgICAgBCENwMADEULIBkgFTYCHCARQRBrIhYpAwAiB0L/////b1gEQCASQaeGAUEAEBYMSwsgEUEIayITKQMAIghCgICAgHBaBEAgEiAHIAgQ7wUiFEEATg0gDEsLIBIgCBAxIgZFDUogB6coAhQiEUEoaiEUIBEgESgCGCAGcUF/c0ECdGooAgAhEQNAAkAgEQR/IBQgEUEDdGoiESgCBCAGRw0BIBFBAEcFQQALIRQgEiAGEBkMIQsgESgCAEH///8fcSERDAALAAtBjJwBQd+QAUG4hQFB8DgQAAALIBYgGCgCUDYCFCAYQYABaiETDDMLIABBuYwBQQAQFgxHCyARQQhrIhEpAwAhCAxDC0IDIQcMQQtCgICAgDAhBwxAC0ICIQcMPwtCASEHDD4LIBwoAhQhBiAYIBY2AgQgGCAGQX9zIBVqNgIAIBJBhCIgGBA2DEELIBFBCGspAwAiB0KAgICAYINCgICAgCBRDQUMBgsgEiARQQhrKQMAIgcQkgRBG0cNBQwBCyASIBFBCGspAwAiBxCSBEHJAEcNBAsgEiAHEBMMAgsgEUEIaykDACIHQoCAgIBwg0KAgICAIFENAQwCCyARQQhrKQMAIgdCgICAgHCDQoCAgIAwUg0BCyARQQhrQoGAgIAQNwMAIBEhEww0CyASIAcQEyARQQhrQoCAgIAQNwMADDMLIAYtAAkgBigABSEaIAYoAAEhFCAZIAZBCmoiFTYCHCASIBFBCGsiBikDACIHIBQQSyIbQQBIDTggG0UNBQRAQQAhFyASIAdB7AEgB0EAEBgiCEKAgICAcINCgICAgOAAUQ05IAhCgICAgHBaBEAgEiASIAggFCAIQQAQGBAtIRcLIBIgCBATIBdBAEgNOSAXDQYLAkACQCAWQfIAaw4EAQMEBQALAkAgEiAHIBQQSyIWQQBMBEAgFkEASA07QoCAgIAwIQcgEigCECgClAEiFkUNASAWLQAkQQFxRQ0BDAkLIBIgByAUIAdBABAYIgdCgICAgHCDQoCAgIDgAFENOgsgEiAGIAcQISARIRMMBQsCQCASIAcgFBBLIhZBAEoNACAWQQBIDTkgEigCECgClAEiFkUNACAWLQAkQQFxDQcLIBIgByAUIBFBEGsiEykDACAHQYCAAhChASASIAYpAwAQE0EATg0ECyATIREMNwsgEiAHIBRBABDaASIUQQBIDTYgEiAGKQMAEBMgBiAUQQBHrUKAgICAEIQ3AwAgESETDAILIBEgEiAUEFc3AwAgEUEIaiETDAELIBIgByAUEEsiBkEASA00AkAgBkUEQEKAgICAMCEHDAELIBIgByAUIAdBABAYIgdCgICAgHCDQoCAgIDgAFENNQsgESAHNwMAIBFBCGohEwsgFSAaakEFayEVDC0LIBIgBikDABATIAYhEwwsCyASIBQQ1AIMMQsgEUEIayIGKQMAIgdCIIinQQhqIhRBCE1BAEEBIBR0QYMCcRsNKiAZIBU2AhwgEiAHEJMEIgdCgICAgHCDQoCAgIDgAFENMCASIAYpAwAQEyAGIAc3AwAMKgsgEUEIayIGKQMAIgdC/////29WDSkgGSAVNgIcIBIgBxAmIgdCgICAgHCDQoCAgIDgAFENLyASIAYpAwAQEyAGIAc3AwAMKQsgBigAASEUIBkgBkEFaiIVNgIcIBIoAtgBKAIUIgZBKGohFiAGIBQgBigCGHFBf3NBAnRqKAIAIQYCQANAIAYEQCAUIBYgBkEDdGoiBigCBEYEQEEAIQYMAwUgBigCAEH///8fcSEGDAILAAsLIBIgEikD0AEgFBBLIgZBAEgNLyAGRQRAQQEhBgwBCyASIBIpA9ABIBRBABDaASIGQQBIDS8LIBEgBkEAR61CgICAgBCENwMAIBFBCGohEwwoCyAZIBU2AhwgEUEQayIWKQMAIQcgEiARQQhrIhMpAwAiCBAxIgZFDS0gEiAHIAZBgIACENoBIRQgEiAGEBkgFEEASA0tIBIgBxATIBIgCBATIBYgFEEAR61CgICAgBCENwMADCcLIBIgEUEIayIGKQMAIgcQkgQhEyASIAcQEyAGIBIgExAzNwMAIBEhEwwmCyAZIBU2AhwgEiARQRBrIgYpAwAiByARQQhrIhMpAwAiCBDdBSIUQQBIDSsgEiAHEBMgEiAIEBMgBiAUQQBHrUKAgICAEIQ3AwAMJQsgEiAHEBMgEiAIEBMgFiAUQQBHrUKAgICAEIQ3AwAMJAtCgICAgOB+IAdCgICAgKCBgPz/AH0gM71C////////////AINCgICAgICAgPj/AFYbCyEHIAYgBzcDAAwiCyASIAdBARBEGiASIAcQEyASIAgQEwwnCyASIAYQ1AILIBIgBhAZDCULIBIgBhDUAgsgEiAGEBkMIwsgCkKAgICA8H5aBEAgCqciBiAGKAIAQQFqNgIACyASIAdBwAAgCkGDgAEQHkEASA0AIAdCgICAgPB+WgRAIAenIgYgBigCAEEBajYCAAsgEiAKQT8gB0GAgAEQHkEASA0AIBIgCxATIBIgCBATIBQgCjcDACAXIAc3AwAgESETDBwLIAchCSAKIQ0MAwtCgICAgDAhCwsgEiAGQQAQFgtCgICAgDAhDQsgEiAIEBMgEiALEBMgEiAMEBMgEiAJEBMgEiANEBMgFEKAgICAMDcDACAXQoCAgIAwNwMADB0LIBkgFTYCHCASIAhBMiAHQQAQGCIIQoCAgIBwg0KAgICA4ABRDRwgFikDACEHCyASIAcQEyAWIAg3AwAgESETDBULIBkgFTYCHCASIAggBiAHQQAQGCIHQoCAgIBwg0KAgICA4ABRDRoLIBEgBzcDACARQQhqIRMMEwsgGSAVNgIcIBIgCCAGIAdBABAYIghCgICAgHCDQoCAgIDgAFENGCAaKQMAIQcLIBIgBxATIBogCDcDACARIRMMEQsgEiAGKQMAEBMgBkKAgICAMDcDACAUQQBIDRYgEiAHEBNCgICAgDAhBwsgESAINwMIIBEgBzcDACARQRBqIRMMDwsgFiATKAIANgIMCyAaIAc3AwAgESETDA0LIBIgESgCACAaQSIQfiIWDQEgISAGEI0BCyAUIREMEQsgFiAGNgIAIBEgEiAaEFc3AwggEUEQaiETDAoLQoCAgIAwIQcLIBIgCxATIBIoAhAiESkDiAEhCSARQoCAgIDAADcDiAEgGCAJNwN4IBIgEiAYKQOIAUKAgICAMEEBIBhB+ABqEBwQEyASIBgpA3gQEwsgEiAIEBMgEiAYKQOAARATIBIgGCkDiAEQEyASIAoQEyASIAcQEyASIAYpAwAQEyASIBMpAwAQEyAGIAw3AwAMBwsgEhAlDAwLIBJBnbYBQQAQFgwLC0EAIRQDQCASKAIQIRYgBiAURwRAIBYgFyAUQQJ0aigCABCNASAUQQFqIRQMAQsLIBZBEGogFyAWKAIEEQAACyASIAcQEwsgEUKAgICA4AA3AwAgEUEIaiERDAgLIAenIgYgBDYCKCAGIBc2AiQgESAHNwMAIBFBCGohEwwBCyAHpyIGIAQ2AiggBiAUNgIkIBEgBzcDACARQQhqIRMMAAsACwJAICEpA4gBIgdCgICAgHBUDQAgB6ciBi8BBkEDRw0AIAYoAhQiBkEwaiEUIAYgBigCGEF/c0ECdEGYfnJqKAIAIRMCQANAIBNFDQEgFCATQQN0aiITQQhrIQYgE0EEaygCAEE5RwRAIAYoAgBB////H3EhEwwBCwsgBg0BCyAZIBU2AhwgEiAHQQBBAEEAQQAQ3AILAkAgIS0AkAENAANAICMgESITTw0BIBIgEUEIayIRKQMAIgcQEyAHQoCAgIBwg0KAgICA0ABSDQAgB6ciBg0HIBIgE0EQayIRKQMAEBMgEiATQRhrKQMAQQEQRBoMAAsAC0KAgICA4AAhB0KAgICA4AAhCCAcLQARQTBxRQ0BCyAZIBE2AiggGSAVNgIcDAELIBwvATAEQCAhIBwgGRDcBQsDfiARICJNBH4gCAUgEiAiKQMAEBMgIkEIaiEiDAELCyEHCyAhIBkoAgA2ApQBDAQLIBMhEQtBASEGDAELIBEgISkDiAE3AwAgIUKAgICAwAA3A4gBIBwoAhQgBmohFUEAIQYMAAsACyAYQaABaiQAIAcLPwEBfyMAQdAAayICJAAgAiABBH8gACgCECACQRBqIAEQhQEFQaH7AAs2AgAgAEH9hwEgAhDRAiACQdAAaiQAC0kBBH8jACIDIQIDQCACQQFrIgIgAUEKbiIEQfYBbCABakEwcjoAACABQQlLIAQhAQ0ACyADIAJrIgEEQCAAIAIgAfwKAAALIAELGwAgACgCECABIAIQ+AUiAUUEQCAAEMkBCyABCw0AIAAgASACQQAQxgQLnAEBAX8CQAJ/AkACQCACRSABQoCAgIBwg0KAgICAkH9SckUEQCABpyICIAIoAgBBAWo2AgAgACgCACgCECACELMDIgNBAEwNAUEEDAMLIAFCgICAgPB+VA0BIAGnIQILIAIgAigCAEEBajYCAAsgACABEO8CIgNBAEgNAUECCyECIAAoAjQgAhAUIAAoAjRBgAJqIAMQH0EADwtBfwuEAQEDfyAAQTRqKAIAIgEEQCABKAK8ASECIAFBswEQFCAAKAI0QYACaiACQf//A3EQGiABIAEoAswBIgMgAkEDdGooAgAiADYCvAEDQAJAIABBAEgEQEF/IQAMAQsgAyAAQQN0aiICKAIEIgBBAE4NACACKAIAIQAMAQsLIAEgADYCwAELC3UAIARB8QAgA0HFAGsgA0G1AUYbQf8BcRAVIAQgACACECAQHwJAIAUoAgAiA0EATg0AIAUgARDLAyIDNgIAIANBAE4NACAEQQE2AgwPCyAEIAMQHyAEIAYQFSABIAUoAgBBARBqGiABIAEoAtACQQFqNgLQAgvyLAERfyMAQZABayIDJAAgACgCACENAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQCAAKAIIIgJBg39HDQAgACgCGA0BIAAoAixBABBjQTpHBEAgACgCCCECDAELIA0gACgCEBAgIQkgACgCNEGwAmohBAJAA0AgBCgCACIERQ0BIAQoAgQgCUcNAAsgAEHM9gBBABAbDBoLIAAQFw0ZIABBOhArDRkgACgCCCICQccAakEDSQ0AIAAQOiEFIAMgACgCNCICKAKwAjYCUCACIANB0ABqNgKwAiADQX82AmQgA0L/////DzcCXCADIAU2AlggAyAJNgJUIAIoArwBIQQgA0ECOgBsIAMgBDYCaEEAIQQgACABQR50QR91QQBBAyACLQBqQQFxG3EQ5QENGSAAIAUQJCAAKAI0IgAgACgCsAIoAgA2ArACDBsLAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQCACQdIAag4kAxQBJRQUFBQUFBQFBAYHBwgUFAIJFBQMEgsRJBMTExQUFBQkAAsgAkGDf0YNDCACQTtGDQkgAkH7AEcNEyAAEOwCDSUMJgsgACgCNCIBKAIgBEAgAEHY1QBBABAbDCULIAEtAGlBCHRBgA5GBEAgAEH04gBBABAbDCULIAAoAgwhASAAEBcNJEEAIQQCf0EAIAAoAggiBUE7Rg0AGkEAIAVB/QBGDQAaQQAgACgCIA0AGiAAEKYBDSVBAQshAiAAIAEQYiAAIAIQjAIgABC8AQ0kDCYLIAAoAgwhASAAEBcNIyAAKAIgBEAgAEHFIkEAEBsMJAsgABCmAQ0jIAAgARBiIAAoAjRBMBAUIAAQvAFFDSQMIwsgABAXDSIgABBxGiAAEM8BIAAQhgINIiAAQegAQX8QIyEBIAAgACgCNC0AakF/c0EBcSIEEOUBDSICQCAAKAIIQa9/RwRAIAEhAgwBCyAAQeoAQX8QIyECIAAQFw0jIAAgARAkIAAgBBDlAQ0jCyAAIAIQJAwfCyAAEDohASAAEDohAiADIAAoAjQiBCgCsAI2AlAgBCADQdAAajYCsAIgA0KAgICAcDcCYCADIAE2AlwgAyACNgJYIAMgCTYCVCAEKAK8ASEEIANBADoAbCADIAQ2AmggABAXDSEgABDPASAAIAEQJCAAEIYCDSEgAEHoACACECMaIAAQrQINISAAQeoAIAEQIxogACACECQgACgCNCIAIAAoArACKAIANgKwAgwiCyAAEDohASAAEDohAiAAEDohBCADIAAoAjQiBSgCsAI2AlAgBSADQdAAajYCsAIgA0KAgICAcDcCYCADIAE2AlwgAyACNgJYIAMgCTYCVCAFKAK8ASEFIANBADoAbCADIAU2AmggABAXDSAgACAEECQgABDPASAAEK0CDSAgACABECQgAEG6fxArDSAgABCGAg0gIAAoAghBO0YEQCAAEBcNIQsgAEHpACAEECMaIAAgAhAkIAAoAjQiACAAKAKwAigCADYCsAIMIQsgABAXDR8gABDPASADQQA2AhgCQCAAKAIIIgJBWEcEQEEBIQEgAkEoRw0BIAAgA0EYakEAEKcBGgwBCyAAKAI0LQBoQQJxRQRAIABBzDtBABAbDCELIAAQFw0gIAAoAjRBATYCoANBACEBCyAAQSgQKw0fQQEhAiADLQAYQQFxRQRAIAAoAgAhCCAAKAI0IgsoArwBIQ4gABA6IQYgABA6IRAgABA6IREgABA6IRIgABBxGiADIAAoAjQiBCgCsAI2AlAgBCADQdAAajYCsAIgA0KBgICAcDcCYCADIAY2AlwgAyARNgJYIAMgCTYCVCADIA42AmggAyADLQBsQfwBcToAbCAAQeoAQX8QIyEPIAAoAjQoAoQCIQogACASECQgACgCCCEEQVEhBQJAAkACQAJAIABBBBC+Aw4CAAEkCyAEQUlGIQwgBEFRRiECIAIgBEGxf0ZyRSAEQUlHcQ0BIAQhBQsgABAXDSIgACgCCCIEQfsARiAEQdsARnINEgJAIARBg39GBEAgACgCGEUNAQsgAEH8igFBABAbDCMLIAggACgCEBAgIQcgABAXBEAgACgCACAHEBkMIwsgACAHIAUQrwIEQCAAKAIAIAcQGQwjCyAAKAI0QbsBQbsBQbcBIAIbIAwbEBQgACAHEB0gACgCNEGAAmogCy8BvAEQGgwBCwJAIAFFDQAgAEGJARBJRQ0AIAAoAixBABBjQVlHDQAgAEHsuQFBABAbDCILAkACQCAAKAIIQSByQfsARw0AIAAgA0FAa0EAEKcBIgJBWUcgAkG3f0dxDQAgAEEAQQBBASADKAJAQQJxQQFBABDRAUEATg0BDCMLIAAQsQINIiAAIANByABqIANBxABqIANBzABqIANBPGpBAEEAQbt/ELkBDSIgACADKAJIIAMoAkQgAygCTCADKAI8QQRBABDQAQsgBCEFC0EAIQQMHAsgACgCNCgCvAEhByAAEHEaIAAoAggiAUE7Rg0aQVEhAgJAIABBBBC+Aw4CABkgCyABQbF/RiABQVFGcg0XIAEiAkFJRg0YIABBABDUBA0fIAAoAjRBDhAUDBkLIAAQFw0eAkAgACgCIA0AIAAoAghBg39HDQAgACgCGA0AIAAoAhAhBQsgACgCNCIEQbACaiEBIAQoArwBIQYgAkG8f0YhBwJAA0AgASgCACIBBEAgACAGIAEoAhgQrAIgASgCGCEGAkAgB0UEQCABKAIMIgRBf0YNASAFRQ0EIAEoAgQgBUcNAQwZCyABKAIIIgRBf0YNACAFRQRAIAEtABxBAnFFDRkLIAEoAgQgBUYNGAtBACEEIAEtABxBAXEEQCAAKAI0QYIBEBRBAyEECwNAIAQgASgCEE5FBEAgACgCNEEOEBQgBEEBaiEEDAELCyABKAIUQX9GDQEgACgCNEEGEBQgAEHsACABKAIUECMaIAAoAjRBDhAUDAELCyAFRQRAIAJBvH9GDQ8gAEG20gBBABAbDCALIABBxoQBQQAQGwwfCyAAQeoAIAQQIxoMFQsgABAXDR0gABDPASAAEIYCDR0gABBxGiAAEDohBCADIAAoAjQiASgCsAI2AlAgASADQdAAajYCsAJBfyECIANBfzYCZCADQv////8fNwJcIAMgBDYCWCADIAk2AlQgASgCvAEhASADQQA6AGwgAyABNgJoIABB+wAQKw0dQX8hBQNAIAJBAEghAQNAAkACQAJAIAAoAggiBkHBAGoOAgABAgsgAQR/QX8FIABB6gBBfxAjCyEBIAAgAhAkA0AgABAXDSIgACgCNEEREBQgABCmAQ0iIABBOhArDSIgACgCNEGpARAUIAAoAghBv39GBEAgAEHpACABECMhAQwBCwsgAEHoAEF/ECMhAiAAIAEQJAwDCyAAEBcNICAAQToQKw0gIAVBAE4EQEH+LyEEDBYLIAJBAEgEQCAAQeoAQX8QIyECCyAAKAI0QbQBEBQgACgCNEGAAmpBABAfIAAoAjQoAoQCQQRrIQUMAgsgBkH9AEcEQCABBEBB5y4hBAwWCyAAQQcQ5QFFDQEMIAsLCyAAQf0AECsNHQJAIAVBAE4EQCAAKAI0IgEoAoACIAVqIAI2AAAgASgCpAIgAkEUbGogBUEEajYCBAwBCyAAIAIQJAsgACAEECQgACgCNEEOEBQgACgCNCIBIAEoArACKAIANgKwAgwaCyAAEM8BIAAQFw0cIAAQOiECIAAQOiEBIAAQOiEEIAAQOiEFIABB6wAgAhAjGiADIAAoAjQiBigCsAI2AlAgBiADQdAAajYCsAIgA0L/////HzcCXCADQoCAgIBwNwJUIAYoArwBIQYgA0EAOgBsIAMgBjYCaCADIAQ2AmQgABDsAg0cIAAoAjQiBiAGKAKwAigCADYCsAIgBhDyAgRAIAZBDhAUIAAoAjRBBhAUIABB7AAgBBAjGiAAKAI0QQ4QFCAAQeoAIAUQIxoLAkACQAJAIAAoAghBPWoOAgATAQsgABAXDR4gABBxGiAAIAIQJCAAKAIIQfsARgRAIAAoAjRBDhAUDBILIABBKBArDR4gACgCCCICQfsARiACQdsARnINAQJAIAJBg39GBEAgACgCGEUNAQsgAEGRigFBABAbDB8LIA0gACgCEBAgIQICQCAAEBdFBEAgACACQUMQrwJBAE4NAQsgDSACEBkMHwsgACgCNEG3ARAUIAAoAjRBgAJqIAIQHyAAKAI0IgJBgAJqIAIvAbwBEBoMEAsgAEHTHUEAEBsMHQsgAEFRQQBBAUF/QQFBABDRAUEATg0ODBwLIAAQF0UNHAwbCyAAKAI0LQBqQQFxBEAgAEHe4wBBABAbDBsLIAAQFw0aIAAQhgINGiAAEHEaIAAgACgCNEHYAEEAEKgBIgFBAEgNGiAAKAI0Qe8AEBQgACgCNEHWABAUIAAoAjRBgAJqIAFB//8DcRAaIAAQzwEgABCtAg0aDBcLIAFBAXFFDQMgAUEDSw0KIAAoAixBABBjQSpGDQMMCgsgACgCGEUNAQsgABDmAQwXC0FRIQICQCAAIAEQvgMOAgAVFwsgAEGJARBJRQ0EIAAoAixBARBjQUVHDQQgAUEDSw0HCyAAQYkkQQAQGwwVCyABQQNNBEAgAEHNI0EAEBsMFQtBfyEBQQAhBCAAQQBBABD5AkUNFgwXCyAAEBcNEyAAELwBRQ0UDBMLIAMgACgCACgCECADQdAAaiAAKAIQEIUBNgIQIABB/cIAIANBEGoQGwwSCyAAIAAoAgwQYiAAEKYBDRECQCAAKAI0IgEoAqQBQQBOBEAgAUHWABAUIAAoAjQiAUGAAmogAS8BpAEQGgwBCyABQQ4QFAsgABC8AUUNEgwRCyAAQbvmAEEAEBsMEAtBASEEIAAgBUEAQQFBf0EAQQAQ0QFBAE4NCwwPC0EAIQQgAEEBQQAgACgCDBDSAQ0ODBALIABBKRArDQ0LIABB6wAgARAjGiAAEHEaIAMgACgCNCICKAKwAjYCUCACIANB0ABqNgKwAiADQv////8fNwJcIANCgICAgHA3AlQgAyACKAK8ATYCaCADIAMtAGxB/AFxOgBsIAMgBDYCZCAAEOwCDQwgACgCNCICIAIoArACKAIANgKwAiAAEOMBIAAQ4wEgACgCNCICEPICBEAgAkEOEBQgACgCNEEGEBQgAEHsACAEECMaIAAoAjRBDhAUIABB6gAgBRAjGgsgASECCyAAIAIQJCAAQewAIAQQIxogACgCNEEwEBQgACAEECQCQCAAKAIIQURHBEAgACgCNCEEDAELIAAQFw0MIAMgACgCNCICKAKwAjYCUCACIANB0ABqNgKwAiADQX82AmQgA0L/////LzcCXCADQoCAgIBwNwJUIAMgAigCvAE2AmggAyADLQBsQfwBcToAbEEAIQEgAigCpAFBAE4EQCAAKAIAIAJB1QAQUyIBQQBIDQ0gACgCNEHVABAUIAAoAjQiAkGAAmogAi8BpAEQGiAAKAI0QdYAEBQgACgCNEGAAmogAUH//wNxEBogABDPAQsgABDsAg0MIAAoAjQiBCgCpAFBAE4EQCAEQdUAEBQgACgCNEGAAmogAUH//wNxEBogACgCNEHWABAUIAAoAjQiAUGAAmogAS8BpAEQGiAAKAI0IQQLIAQgBCgCsAIoAgA2ArACCyAEQe0AEBQgACAFECQMDAsgACAEQQAQGwwKCyAAQeoAIAQQIxogBUUNACAAEBcNCQsgABC8AUUNCQwICyABIQILIAAQFw0GIABBACACQQAQzgMNBgsgACAAKAI0KAK8ASAHEKwCCyAAQTsQKw0EIAAQOiEFIAAQOiEEIAAQOiEBIAAQOiEGIAMgACgCNCICKAKwAjYCHCACIANBHGo2ArACIANCgICAgHA3AiwgAyAENgIoIAMgBjYCJCADIAk2AiAgAigCvAEhAiADQQA6ADggAyACNgI0IAEhAiAAKAIIQTtHBEAgACAFECQgABCmAQ0FIABB6AAgBhAjGiAFIQILIABBOxArDQQCQCAAKAIIQSlGBEAgAyACNgIoQQAhBSACIQQMAQsgAEHqACABECMaIAAoAjQoAoQCIQUgACAEECQgABCmAQ0FIAAoAjRBDhAUIAEgAkYNACAAQeoAIAIQIxoLIABBKRArDQQgACgCNCgChAIhCiAAIAEQJCAAEK0CDQQgACAAKAI0KAK8ASAHEKwCAkAgASACRiACIARGckUEQCAAKAI0IgEoAoQCIAFBgAJqIgggCiAFayICEMsBGiAIIAEoAoACIAVqIAIQYBogAgRAIAEoAoACIAVqQbEBIAL8CwALIAAoAjQiAiABKAKEAkEFazYCmAIgBCACKAKsAiIBIAEgBEgbIQggBWshBwNAIAQgCEYNAiACKAKkAiAEQRRsaiILKAIEIgEgBUggASAKTnJFBEAgCyABIAdqNgIECyAEQQFqIQQMAAsACyAAQeoAIAQQIxoLIAAgBhAkIAAoAjQiASABKAKwAigCADYCsAIMAQsgAEHqACAQECMaIAAoAjQoAoQCIQwgACAPECQCQCAAKAIIIgJBPUcNAAJAIAAQF0UEQCAAQQAQugFFDQELIAggBxAZDAULIAdFDQAgACgCNEG3ARAUIAAgBxAdIAAoAjRBgAJqIAsvAbwBEBoLIAggBxAZAkACQAJAIABBxwAQSSIHBEAgAyADLQBsQQFyOgBsIAMgAygCYEECajYCYEG06gAhCCACQT1GDQEMAwsgACgCCEG3f0cNASABRQRAIABBwrkBQQAQGwwHCyACQT1HDQJB/9sAIQggBUGxf0cNACAEIAstAGpyQQFxRQ0CCyADIAg2AgAgAEHsxgAgAxAbDAULIABB2NkAQQAQGwwECyAAEBcNAwJAIAcEQCAAEFJFDQEMBQsgABCmAQ0ECyAAIAAoAjQoArwBIA4QrAIgACgCNEH7AEH8ACABG0H6ACAHGxAUIABB6gAgBhAjGiAAQSkQKw0DIAAoAjQiAigChAIgAkGAAmoiBSAMIAprIgQQywEaIAUgAigCgAIgCmogBBBgGiAEBEAgAigCgAIgCmpBsQEgBPwLAAsgACgCNCIFIAIoAoQCQQVrNgKYAiAGIAUoAqwCIgIgAiAGSBshCyAKayEIIAYhBANAIAQgC0cEQCAFKAKkAiAEQRRsaiIPKAIEIgIgCkggAiAMTnJFBEAgDyACIAhqNgIECyAEQQFqIQQMAQsLIAAgEBAkIAAQrQINAyAAIAAoAjQoArwBIA4QrAIgACAGECQgACgCNCECAn8gBwRAIAFFBEAgAkH/ABAUIAAoAjRBiQEQFCAAKAI0QYEBEBRBggEMAgsgAkH+ABAUIAAoAjRBgAJqQQAQFUGCAQwBCyACQf0AEBRBDgshASAAQegAIBIQIxogACgCNEEOEBQgACARECQgACgCNCABEBQgACgCNCIBIAEoArACKAIANgKwAgsgABDjAQwDCyABQQNLDQAgAEHIJEEAEBsMAQsgABAXDQBBACEEIABBASACQQAQzgMNACAAELwBRQ0CC0F/IQQMAQtBACEECyANIAkQGSAEIQELIANBkAFqJAAgAQs6AQF/IwBB0ABrIgEkACABIAAoAgAoAhAgAUEQaiAAKAIQEIUBNgIAIABBzMsAIAEQGyABQdAAaiQAC74BAQJ/IwBB0ABrIgUkACAAKAIAIQYCQCABIAMQtAUEQCAFIAYoAhAgBUEQaiADEIUBNgIAIABBsLcBIAUQG0EAIQAMAQtBACEAIAYgAUEoakEUIAFBMGogASgCLEEBahBUDQAgASABKAIsIgBBAWo2AiwgASgCKCAAQRRsaiIAQQA2AhAgAEIANwIIIABCADcCACAAIAYgAhAgNgIMIAYgAxAgIQEgACAENgIIIAAgATYCEAsgBUHQAGokACAAC4UFAQZ/IAAoAgAiBUEBaiECQQghAwJAAkACQCAFLQAAIgdBMGsiBkEITwRAQX4hBAJAAkACQAJAAkACQAJAIAdB7gBrDgsBCgoKAgoDBgQKBQALAkAgB0HiAGsOBQkKCgoACgtBDCEDDAgLQQohAwwHC0ENIQMMBgtBCSEDDAULQQshAwwEC0F/IQQgAi0AABDrASIBQQBIDQQgBS0AAhDrASIDQQBIDQQgBUEDaiECIAMgAUEEdHIhAwwDCwJAAkAgAQRAIAItAABB+wBGDQELIAVBBWohBkEAIQNBACEEDAELIAVBAmohAiAFLQACIQZBACEDA0AgAiEBQX8hBCAGEOsBIgJBAEgNBSACIANBBHRyIgNB///DAEsNBSABQQFqIgItAAAiBkH9AEcNAAsgAUECaiECDAMLAkADQCAEQQRGDQEgAi0AABDrASIHQQBOBEAgBEEBaiEEIAJBAWohAiAHIANBBHRyIQMMAQsLQX8PCyABQQJHIANBgHhxQYCwA0dyDQEgBi0AAEHcAEcNASAFLQAGQfUARw0BQQAhAkEAIQQDQCACQQRHBEAgAiAGai0AAhDrASIBQQBIDQMgAkEBaiECIAEgBEEEdHIhBAwBCwsgBEGAeHFBgLgDRw0BIAVBC2ohAiADQQp0IARqQYC4/xprIQMMAgsgAUECRgRAQX8hBCAGDQNBACEDIAItAABBOmtB/wFxQfYBSQ0CDAMLIAItAABBMGsiAUEHSwRAIAYhAwwCCyAFQQJqIQIgASAGQQN0ciIDQR9LDQEgBS0AAkEwayIBQQdLDQEgBUEDaiECIAEgA0EDdHIhAwwBCyAGIQILIAAgAjYCACADIQQLIAQLCwAgAEHxHEEAEDQLFgAgACABQf8BcRAVIAAgAkH/AXEQFQsNACAAQQZBf0EFEI8GC5IBAQR/IABBEGohAiABKAIAIgRBAWohAwJAIAAoAgQiBUEASARAIAIgBEEBdGovAQAiAEGA+ANxQYCwA0cgAyAFQf////8HcU5yDQEgAiADQQF0ai8BACICQYD4A3FBgLgDRw0BIARBAmohAyAAQQp0IAJqQYC4/xprIQAMAQsgAiAEai0AACEACyABIAM2AgAgAAvkAwMEfgJ/AXwjAEEQayIKJAACfwJAAkACQAJAIAFCgICAgHBUDQAgAaciCS8BBkEkRw0AIAkoAiAiCUUNACAJNQIMIQcMAQsCQCAAIAFBMSABQQAQGCIFQoCAgIBwg0KAgICA4ABRDQAgACAKQQhqIAUQaEEASA0AIAorAwgiC71C////////////AINCgYCAgICAgPj/AFoEQCAAQYrPAEEAEBYMAQsgC0QAAAAAAADgw2NFBEBC////////////ACEHIAtEAAAAAAAA4ENmDQIgC/wGIgdCAFkNAgsgAEHE7gBBABAyC0KAgICAMCEGDAELIAAgAUHnACABQQAQGCIGQoCAgIBwgyIIQoCAgIDgAFENAEKAgICAMCEFIAhCgICAgDBRBEAgAEGnjAFBABAWDAILIAAgBhAwRQRAIABBp9UAQQAQFgwBCyAAIAFBMCABQQAQGCIFQoCAgIBwgyIBQoCAgIDgAFENASABQoCAgIAwUQRAIABBlIwBQQAQFgwCC0EAIAAgBRAwDQIaIABBj9UAQQAQFgwBC0KAgICAMCEFCyAAIAYQEyAAIAUQE0KAgICAMCEGQgAhB0KAgICAMCEFQX8LIAIgBzcDACADIAY3AwAgBCAFNwMAIApBEGokAAviAQECfyACQQBHIQMCQAJAAkAgAEEDcUUgAkVyDQAgAUH/AXEhBANAIAAtAAAgBEYNAiACQQFrIgJBAEchAyAAQQFqIgBBA3FFDQEgAg0ACwsgA0UNASABQf8BcSIDIAAtAABGIAJBBElyRQRAIANBgYKECGwhAwNAQYCChAggACgCACADcyIEayAEckGAgYKEeHFBgIGChHhHDQIgAEEEaiEAIAJBBGsiAkEDSw0ACwsgAkUNAQsgAUH/AXEhAQNAIAEgAC0AAEYEQCAADwsgAEEBaiEAIAJBAWsiAg0ACwtBAAthACAAIAEgAkKAgICACHxC/////w9YBH4gAkL/////D4MFQoCAgIDgfiACub0iAkKAgICAoIGA/P8AfSACQv///////////wCDQoCAgICAgID4/wBWGwsgAyAEQQdyEKABCyoBAX8gAkKAgICA8H5aBEAgAqciAyADKAIAQQFqNgIACyAAIAEgAhCkBQumAgIBfgF/IwBBEGsiAiQAAkAgAUL/////b1gEQCAAECVCgICAgOAAIQUMAQsCQCAEDQAgAykDACIFQoCAgIBwVA0AIAWnIgYvAQZBM0cNACAGKAIgRQ0AIAAgBUHAACAFQQAQGCIFQoCAgIBwg0KAgICA4ABRDQEgACAFIAEQRSAAIAUQE0UNACADKQMAIgVCgICAgPB+VA0BIAWnIgAgACgCAEEBajYCAAwBCyAAIAIgARD2ASIBQoCAgIBwg0KAgICA4ABSBEAgACACIARBA3RqKQMAQoCAgIAwQQEgAxAcIQUgACACKQMAEBMgACACKQMIEBMgBUKAgICAcINCgICAgOAAUQRAIAAgARATDAILIAAgBRATCyABIQULIAJBEGokACAFC04BAX8gACABp0EAIAFC/////29WG0EEQQFBICADQQFrZ2t0IANBA0giBBtBAiADIAQbELoFIgNFBEBCgICAgOAADwsgACADIAJBABD+AQvDBAIHfwF+IwBB4AJrIgYkACABpyIEKAIEIQMCfyABQoCAgIBwg0KAgICAkH9RBEAgA0EfdiEIIANB/////wdxIQNBAAwBCyAELQAIIQggBC0ACQshBSACpyIHKAIEIQQCQCACQoCAgIBwg0KAgICAkH9RBEAgBEEfdiEHIARB/////wdxIQQMAQsgBSAHLQAJIgkgBSAJSxshBSAHLQAIIQcLAkACQAJAAkAgAyAEaiIEQYCAgIAETwRAIABBkecAQQAQNgwBCyAAQSAQJyIDRQ0AIAMgAjcDGCADIAE3AxAgAyAHIAhyOgAIIAMgBDYCBCADQQE2AgAgAyAFQQFqIgU6AAkgA61CgICAgKB/hCECIAVB/wFxQT1JBEAgAiEBDAQLQQAhAwNAIANBLEZFBEAgBiADQQN0akKAgICAIDcDACADQQFqIQMMAQsLAkAgACAGIAIQvgUNAEEAIQNCgICAgCAhAQNAIANBLEcEQAJAIAYgA0EDdGoiBSkDACIKQoCAgIBwg0KAgICAIFENACAFQoCAgIAgNwMAIAFCgICAgHCDQoCAgIAgUQRAIAohAQwBCyAAIAogARDzASIBQoCAgIBwg0KAgICA4ABRDQMLIANBAWohAwwBCwsgAUKAgICAcINCgICAgCBSDQMgAEEvEDMhAQwDC0EAIQMDQCADQSxGDQIgACAGIANBA3RqKQMAEBMgA0EBaiEDDAALAAsgACABEBMLQoCAgIDgACEBCyAAIAIQEwsgBkHgAmokACABC0EAIAAgAiABQQBBABAcIgFC/////29WIAFCgICAgHCDQoCAgIDgAFFyRQRAIAAgARATIAAQJUKAgICA4AAPCyABCzkBAX8gAEH//wFxIgFBgPgBTwR/IABBgID+AHIFIAELrUIqhiAAQQ92rUI/hoS/RAAAAAAAAPB+ogvuAgIEfwJ+IwBBIGsiAyQAIANCgICAgDA3AxggA0KAgICAMDcDECADIABBP0ECQQBBAiADQRBqEG8iBzcDCEKAgICA4AAhCCAHQoCAgIDgAFIEQAJAIAJCgICAgHCDQoCAgIAwUQRAIAAgAkEAIANBCGoQrwUhAgwBCyAAIAJBASADQQhqEK8BIQIgAykDCCEHCyAAAn4gACACQoCAgIBwg0KAgICA4ABSBH4Cf0EAIAdCgICAgHBUDQAaQQAgB6ciBS8BBkEPRw0AGiAFKAIgC0EIaiEGA0AgBEECRgRAQQAhBANAIARBAkcEQCAGIARBA3QiBWopAwAiB0KAgICA8H5aBEAgB6ciACAAKAIAQQFqNgIACyABIAVqIAc3AwAgBEEBaiEEDAELCyACIQggAykDCAwDCyAEQQN0IQUgBEEBaiEEIAAgBSAGaikDABBPRQ0ACyADKQMIBSAHCxATIAILEBMLIANBIGokACAIC9UFAwN+A38BfCMAQSBrIgYkAAJAAn4CQCABQQhrIggpAwAiBEIgiKdBCGtBb0kNAEF/IQFCgICAgDAhAyAAIAQQbiIEQoCAgIBwg0KAgICA4ABRDQICfyAEQiCIIgVC9////w9SBEAgBaciB0EHRwRAIAcNAyAExCEDAkACQAJAIAJBiwFrDgMCAAABCyADIAJBAXRBmQJrrHwhAwwBCyAEQiCGUARAQQAhAUKAgICA4P7/AyEDDAcLQgAgA30hAwsgA0L/////D4MgA0KAgICACHxC/////w9YDQQaQoCAgIDgfiADub0iA0KAgICAoIGA/P8AfSADQv///////////wCDQoCAgICAgID4/wBWGwwECyAEQiCGIQUCQAJAAkACQAJAAkAgAkGLAWsOAwUBAAILIAVCgICAgPD/////AFENAiAEQgF8Qv////8Pg0KAgICA8ACEDAgLIAVCgICAgICAgICAf1ENASAEQgF9Qv////8Pg0KAgICA8ACEDAcLIAVCgICAgICAgICAf1IN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DAELQS9BKUEoIAFBAXEbIAItAGgbCyEDIAIgAxAUC3kBAX8CQAJAAkACQAJAIAEoAgAiAkGAAWoOBQQEBAIAAQsgACgCACABKQMIEBMgACgCACABKQMQEBMPCyACQal/Rw0BCyAAKAIAIAEoAggQGQ8LIAJB1QBqQS1NBEAgACgCACABKAIIEBkLDwsgACgCACABKQMIEBMLSQECfyACQv////8HWARAIAAgASACp0GAgICAeHJBgIABENoBDwsgACACEIUDIgNFBEBBfw8LIAAgASADQYCAARDaASAAIAMQGQsZACAAIAEQEyABQoCAgIBwg0KAgICA4ABRCyoBAn9BfyEDIAAgARBbIgIEfyACEF0EQCAAEJMBQX8PCyACKAIoBUF/CwtDACAAIAEgAkEATgR+IAKtBUKAgICA4H4gAri9IgFCgICAgKCBgPz/AH0gAUKAgICAgICA+P8AVhsLIANBgIABEPgBCycBAX8gAUKAgICA8H5aBEAgAaciAiACKAIAQQFqNgIACyAAIAEQLQuPAgEBfgJAAkACQAJAIAFC/////29YDQAgACABQcAAIAFBABAYIgFCgICAgHCDIgNCgICAgOAAUQRAIAEPCyADQoCAgIAwUQRAIAJCgICAgPB+VA0DDAQLIAFC/////29YBEAgACABEBMMAQsgACABQesBIAFBABAYIQMgACABEBMCQAJAIANCgICAgHCDIgFCgICAgCBSBEAgAUKAgICA4ABRDQIgAUKAgICAMFINAQsgAkKAgICA8H5UDQQMBQsgA0KAgICAcFoEQCADpy0ABUEQcQ0BCyAAIAMQlgIgACADEBMMAgsgAw8LIAAQJQtCgICAgOAAIQILIAIPCyACpyIAIAAoAgBBAWo2AgAgAgtwAQN/IwBBEGsiAiQAIAAhAQNAAkAgASwAACIDQQBOBEAgA0H/AXFBCWsiA0EXS0EBIAN0QZ+AgARxRXINASABQQFqIQEMAgsgAUEGIAJBDGoQTRDWAUUNACACKAIMIQEMAQsLIAJBEGokACABIABrC5wBAQJ/An8gACgCCCACaiIEIAAoAgxKBEBBfyAAIARBABDFAg0BGgsCQCAAKAIQBEAgAkEAIAJBAEobIQQDQCADIARGDQIgACgCBCAAKAIIQQF0aiADQQF0aiABIANqLQAAOwEQIANBAWohAwwACwALIAJFDQAgACgCBCAAKAIIakEQaiABIAL8CgAACyAAIAAoAgggAmo2AghBAAsLUQECfyMAQRBrIgIkAAJAAkAgACABEDAEQCAAIAEQgQYiAw0BCyAAQaXEAEEAEBYMAQsgAiADNgIAIABBn8QAIAIQFiAAIAMQUQsgAkEQaiQAC8wEAgJ/An4CQCABQiCIQvv///8PfUJ9WARAQoCAgIDgACEGIAAgARBAIgFCgICAgHCDQoCAgIDgAFENAQsCQCACQiCIQvv///8PfUJ9WARAQoCAgIDgACEGIAAgAhBAIgJCgICAgHCDQoCAgIDgAFENAQsCQCACQoCAgIBwg0KAgICAkH9RBEAgAqcoAgRB/////wdxIgNFBEAgACACEBMgAQ8LIANBgARLDQEgAachAyABQoCAgIBwg0KAgICAkH9RBEAgAygCBEH/////B3FBgMAASw0CIAAgASACEIcEDwsgAykDGCIFQoCAgIBwg0KAgICAkH9SDQEgBaciBCgCBEH/////B3FBgARLDQEgBCAEKAIAQQFqNgIAQoCAgIDgACEGIAAgBSACEIcEIgVCgICAgHCDQoCAgIDgAFENAiADKQMQIgJCgICAgPB+WgRAIAKnIgMgAygCAEEBajYCAAsgACACIAUQ8wEhBgwCCyABQoCAgIBwg0KAgICAkH9SDQAgAacoAgRB/////wdxRQRAIAAgARATIAIPCyACpyIEKQMQIgVCgICAgHCDQoCAgICQf1INACAFpyIDKAIEQf////8HcUGABEsNACADIAMoAgBBAWo2AgBCgICAgOAAIQYgACABIAUQhwQiBUKAgICAcINCgICAgOAAUQ0CIAQpAxgiAUKAgICA8H5aBEAgAaciAyADKAIAQQFqNgIACyAAIAUgARDzASEGDAILIAAgASACEPMBDwsgACABEBMgBg8LIAAgAhATIAYLmQMBBX8CQAJAAkAgAwRAIAFCgICAgGCDQoCAgIAgUg0BDAILIAFCgICAgHBUDQELQQEhCAJAAkAgAkIgiKdBAWoOBAACAgECCyACpyEGCwJAAkAgAUL/////b1hBACADGw0AAkAgAaciBS8BBCIEQYAIcUUNACAAKAIQKAJEIAUvAQZBGGxqKAIUIgdFDQAgBygCICIHRQ0AIAAgASACIAcRGQAiCCADRXINASAAQYTzAEEA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ACgCBCICIAFIBEAgACgCDCAAKAIIIAEgAkEDbEECbSICIAEgAkobIgFBAnQgACgCEBEBACICRQRAQX8PCyAAIAE2AgQgACACNgIIC0EAC0gBAn8jAEEQayIDJAACfyABKAIAIgQtAAAgAkcEQCADIAI2AgAgAEGwugEgAxA0QX8MAQsgASAEQQFqNgIAQQALIANBEGokAAtGAQF/QX8hAyAAIAIQywEEf0F/BSAAKAIEIAFrIgMEQCAAKAIAIAFqIgEgAmogASAD/AoAAAsgACAAKAIEIAJqNgIEQQALCzUBAX8jAEEQayICJAAgACACQQxqED4hACABQQAgAi8BDCAAGzsBACACQRBqJABBf0EAIAAbCykAIAAgAhCLASICRQRAQoCAgIDgAA8LIAAgASACIAFBABAYIAAgAhAZC5IBAQN/IwBBEGsiAiQAIAJBJToACgJ/IAFBgAJIBEBBAyEDIAJBC2oMAQsgAkH1ADoACyACIAFBDHYtAJ2eAToADCACIAFBCHZBD3EtAJ2eAToADUEGIQMgAkEOagsiBCABQQ9xLQCdngE6AAEgBCABQQR2QQ9xLQCdngE6AAAgACACQQpqIAMQlQIaIAJBEGokAAsNACAAIAEgARBBEOkCC9sDAQV/IAAoAhAhCwJAIANFIAVFciAGQSxGIAdyckUEQCAAQfI6QQAQNgwBCwJAAkAgACABIAQQViIBQoCAgIBwg0KAgICA4ABRDQACQCACQv////8HVgR/QfTkAAUgA0UNASADKQMAQv////8HWA0BQdTkAAshAyAAIANBABAyDAILIABBIBAnIghFBEBBACEIDAILIAggAqciCTYCACAIIAMEfyADKAIABUF/CzYCBAJAIAcEQAJAIARBFEcNACALKALUASIMRQ0AIAkhCiADBEAgAygCACEKCyAIIAsoAuABQQEgCiAKQQFMGyAMEQMAIgM2AgwgA0UNBCAKRQ0CIANBACAK/AsADAILIAggAEEBIAkgCUEBTRsQPyIDNgIMIANFDQMMAQsCQCAEQRRHDQAgCygC3AEiAEUNACALKALgASAFIAARAAALIAggBTYCDAsgCCAGNgIcIAhBADYCGCAIQQA6AAggCCAIQRBqIgA2AhQgCCAANgIQIAggBEEURjoACSAJRSAFRSAHRXJyRQRAIAgoAgwgBSAJ/AoAAAsg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IANrQQVqNgABIABBDUEAEL0BIQIgACAALQA8QQFqOgA8IAAgARCsBg0BIAAoAgAgAmogACgCBCACa0EEazYAAAwACwALIAUkACAEC/4DAgh/A34jAEEwayIEJABCgICAgOAAIQwgACABECYiAUKAgICAcINCgICAgOAAUgRAAkACQCAAIARBLGogBEEoaiABpyIIIAJBD3EQdwRAQoCAgIAwIQwgBCgCKCEFIAQoAiwhBgwBCyAAEEIhDCAEKAIoIQUgBCgCLCEGIAxCgICAgOAAUQRAQoCAgIDgACEMDAELIAJBEEkhCSADQQFrIQpBACECA0AgAiAFRg0CIAYgAkEDdGooAgQhAwJAAkAgCUUEQCAAIARBCGogCCADEEoiC0EATARAIAtBAE4NAgwFCyAAIARBCGoQTiAEKAIIQQRxRQ0BCwJAAkACQAJAIAoOAgECAAsgACADEFciDUKAgICA4ABSDQIMBgsgACABIAMgAUEAEBgiDUKAgICAcINCgICAgOAAUg0BDAULIAAQQiINQoCAgIDgAFENBCAAIAMQVyIOQoCAgIDgAFENAiAAIA1CACAOQYeAARCgAUEASA0CIAAgASADIAFBABAYIg5CgICAgHCDQoCAgIDgAFENAiAAIA1CASAOQYeAARCgAUEASA0CCyAAIAwgB60gDUEAEO8BQQBIDQMgB0EBaiEHCyACQQFqIQIMAQsLIAAgDRATCyAAIAwQE0KAgICA4AAhDAsgACAGIAUQWCAAIAEQEwsgBEEwaiQAIAwLrQEBAn4gACABIARBA3EiAkEjahAsRQRAQoCAgIDgAA8LQoCAgIDgACEGIAAgAkErahCIASIFQoCAgIDgAFIEfiAAQRAQJyICRQRAIAAgBRATQoCAgIDgAA8LIAFCgICAgPB+WgRAIAGnIgAgACgCAEEBajYCAAsgAkEANgIMIAIgBEECdTYCCCACIAE3AwAgBUKAgICAcFoEQCAFpyACNgIgCyAFBUKAgICA4AALC8IBAgJ/AX4gASgCECACQgAgAkIgiKdBCGtBb08bIAIgAkL///////////8Ag0KAgICA4P7/A1EbIgUgASgCFBDAAkECdGohBANAIAQoAgAiA0UEQEKAgICAEA8LAkACQCADLQAEDQAgASgCAEUgAykDGCICQoCAgIBwg0KAgICAMFFyRQRAIAKn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CyADQRBqJAAgAQuLAwEEfyMAQRBrIgQkAAJAAn8CQAJAAnwCQAJAAkACQAJAAkBBCCAAQiCIpyIDIANBCGtBb0kbIgNBCWoOEggDAQIKCgoKAwQACgoKCgoHBQoLIACnQQFzQceMoo4GbEEgIAFrdiECDAkLIACnQQAQ/gNBeXNBx4yijgZsQSAgAWt2IQIMCAsgAEEAEKMFQXlzQceMoo4GbEEgIAFrdiECDAcLIAMgAKdzQceMoo4GbEEgIAFrdiECDAYLIACntwwBC0QAAAAAAAD4fyAAQoCAgICggYD8/wB8IgC/IABC////////////AINCgICAgICAgPj/AFYbC71CCIVC64fWhejIoeThAH5BwAAgAWutiKchAgwDCyAEIAA+AgggBEKAgICAEDcCACAEIQNBAQwBCyAApyIDKAIECyECIANBCGohBUEBIQMDQCACQQFrIgJBAEhFBEAgBSACQQJ0aigCACADQYcCbGohAwwBCwsgA0F3c0HHjKKOBmxBICABa3YhAgsgBEEQaiQAIAIL3QECAn4DfyABKAIgRQRAAkACQCMAIgYgACgCECIFKAKAAUkEQCAAEHQgASgCQCgCICEAQoCAgIDgACECDAELIAAgAa0gASkDEEKAgICAMCABKAIYIAEoAkhBBBDdASICQoCAgIBwgyIDQoCAgIDgAFIgA0KAgICAMFIiBHENASABKAJAKAIgIQAgBA0AIAEoAmBBCGsiBCkDACECIARCgICAgDA3AwALIAFBATYCICAFIAAgAUE4ahDcBSAFIAEQ/QULIAYkACACDwtB7YkBQd+QAUGRnwFBlPQAEAAACwsAIABBoRpBABAWCywAIAAgASkDCBAiIAAgASkDEBAiIAAgASkDGBAiIABBEGogASAAKAIEEQAAC98EAgh/AX4jAEEwayIFJAACf0EAIAFCgICAgHBUDQAaQQAgAaciBC8BBkEzRw0AGiAEKAIgCyEHIAVCADcCKAJAA0AgBkECRwRAAkAgAEEgED8iCARAIAhBCGohCUEAIQQDQCAEQQJGDQIgAyAEQQN0IgpqKQMAIgxCgICAgPB+WgRAIAynIgsgCygCAEEBajYCAAsgCSAKaiAMNwMAIARBAWohBAwACwALQX8hBCAGQQFHDQMgACgCECAFKAIoEMMCDAMLIAIgBkEDdGopAwAiDEKAgICAMCAAIAwQMBsiDEKAgICA8H5aBEAgDKciBCAEKAIAQQFqNgIACyAIIAw3AxggBUEoaiAGQQJ0aiAINgIAIAZBAWohBgwBCwsCQCAHKAIAIgRFBEAgB0EEaiEDQQAhBANAIARBAkYNAiADIARBA3RqIgIoAgAiBiAFQShqIARBAnRqKAIAIgA2AgQgACACNgIEIAAgBjYCACACIAA2AgAgBEEBaiEEDAALAAsCQCAEQQJHDQBBAiEEIAcoAhQNACAAKAIQIgIoAqABIgNFDQAgACABIAcpAxhBASACKAKkASADEUEAIAcoAgAhBAsgBSAFQShqIARBAWsiA0ECdGooAgAiAikDCDcDACAFIAIpAxA3AwggBSACKQMYNwMQQQAhBCAFIANBAEetQoCAgIAQhDcDGCAFIAcpAxg3AyAgAEHAAEEFIAUQzwIDQCAEQQJGDQEgACgCECAFQShqIARBAnRqKAIAEMMCIARBAWohBAwACwALIAdBATYCFEEAIQQLIAVBMGokACAEC9UBAQN/IwBBEGsiBSQAQX8hAwJAIAAoAhQNAAJAAkAgAUGAgICABE4EQCAAKAIAQZHnAEEAEDYMAQsgASAAKAIMQQNsQQJtIgQgASAEShshASAAKAIQIgQgAkGAAkhyRQRAIAAgARD9AyEDDAMLIAAoAgAgACgCBCABIAR0IARrQRFqIAVBDGoQwwEiAg0BCyAAEK4DDAELIAUoAgwhAyAAIAI2AgQgAEH/////AyADIAAoAhB2IAFqIgAgAEH/////A04bNgIMQQAhAwsgBUEQaiQAIAMLoAcBCH8CQAJAAn8gAkECTQRAIAIgASgCCEEedkYEQCAAIAEQswEiBEHtAUoNAyABIAEoAgBBAWs2AgAgBA8LIAAoAjQgACgCJEEBayABIAIQ/gNB/////wNxIghxIglBAnRqIQMgASgCBEH/////B3EhBQNAIAIgAygCACIERQ0CGgJAIAAoAjggBEECdGooAgAiAygCCCIGQf////8DcSAIRyAGQR52IAJHcg0AIAMoAgRB/////wdxIAVHDQAgA0EAIAFBACAFEJsDDQAgBEHuAUgNBSADIAMoAgBBAWo2AgAMBQsgA0EMaiEDDAALAAtB/////wNBACACQQNHGyEIQQMLIQUCQCAAKAI8DQACQAJAIABBEGoiCiAAKAI4QccFIAAoAixBA2xBAm0iAiACQccFTBsiBEECdCAAKAIIEQEAIgYEQCAAKAIsIgchAyAHDQIgCkEQIAAoAgARAwAiAg0BIAogBiAAKAIEEQAAC0EAIQQgAQ0EDAMLIAJCADcABCACQQA2AAxBASEDIAJBATYCACACQYCAgIB8NgIIIAYgAjYCACAAIAAoAihBAWo2AigLIAAgAzYCPCAAIAY2AjggACAENgIsIAcgBCAEIAdJGyEHIARBAWshBANAIAMgB0YNASAGIANBAnRqQQEgA0EBaiICQQF0QQFyIAMgBEYbNgIAIAIhAwwACwALAkAgAQRAIAEoAggiAkH/////A00EQCABIAIgBUEedHI2AgggASEDDAILIABBEGogASgCBCICQR91IAJB/////wdxIAJBH3Z0akERaiAAKAIAEQMAIgNFBEBBACEEDAQLIANBATYCACADIAEoAgRBgICAgHhxIgIgAygCBEH/////B3FyNgIEIAMgASgCBEH/////B3EgAnI2AgQgASgCBCICQf////8HcSACQR92dCACQX9zQR92aiICBEAgA0EQaiABQRBqIAL8CgAACyAAIAEQjwMMAQsgAEEQakEQIAAoAgARAwAiA0UEQEEADwsgA0KBgICAgICAgIB/NwIACyAAIAAoAjggACgCPCIEQQJ0aiIBKAIAQQF2NgI8IAEgAzYCACADIAVBHnQgCHI2AgggAyAENgIMIAAgACgCKEEBajYCKCAFQQNGDQAgAyAAKAI0IAlBAnRqIgEoAgA2AgwgASAENgIAIAAoAiggACgCMEgNACAAIAAoAiRBAXQQnQUaCyAEDwsgACABEI8DIAQLhxEDDH8BfgF8IwBBsAJrIgokACAKIAE2AqwCQd8AQYACIARBIHEbIQsCQAJAAkACQAJ/AkACQAJAAn8CQAJAAkACQAJAAkACQAJAAkAgAS0AACIGQStrDgMBAwADC0EBIQ4gCiABQQFqIgE2AqwCDAELIAogAUEBaiIBNgKsAgsgBEGACEkNASABLQAAIQYLIAZB/wFxQTBHDQACQAJAAkAgAS0AASIFQfgARwRAIAVB7wBGDQIgBUHYAEcNAQsgA0FvcUUEQCABQQJqIQZBEAwJCyAFQeIARiAFQe8ARnINDQwJCyADIAVBzwBHcg0BDAMLIANFDQIMBAsCQCAFQeIA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IQggBUEIaiEFDAELCyADIAQgBigCJGtHDQcgBkEANgIkIAYgCzYCHCAGIAo2AhggBiADNgIgIAEgBjYCFCAAKAIQIgJBEGogByAHKAIYQX9zQQJ0aiACKAIEEQAAQQEhBSAAIAEoAhggDRC0ASIARQ0JIAEgADYCGAwJBSAEKAIAQf///x9xIQUgBCEDDAILAAsLQQEhBSABLwEEIgNBgAhxRQ0GIANBgBBxRQ0BIAAgCUEIaiACELEBRQ0GIAkoAggiAyABKAIoIgZPDQZBACEFIAEvAQYiBEEJS0EBIAR0QYQGcUVyDQYgBkEBayADRgRAAkAgBEEJRgRAIAAoAhAgASgCJCADQQJ0aigCABCNAQwBCyAAIAEoAiQgA0EDdGopAwAQEwsgASADNgIoDAYLIAAgARCdA0UNAAtBfyEFDAULIAAoAhAoAkQgAS8BBkEYbGooAhQiA0UNBCADKAIIIgNFDQQgACABrUKAgICAcIQgAiADERQAIQUMBAtBmo8BQd+QAUGGJ0GzwAAQAAALQfbsAEHfkAFBiidBs8AAEAAAC0H7sAFB35ABQa8nQbPAABAAAAtBASEFCyAJQRBqJAAgBQu8AQEEfyMAQRBrIgIkACAAIAJBCGogARDhASEDIAAgARATAkAgA0UEQEKAgICA4AAhAQwBCyACIAMgAxCUAiIEaiIFNgIMQoCAgIDwACEBAkAgBCACKAIIRg0AIAAgBSACQQxqQQBBhQEQxwIhASACKAIMIgQQlAIhBSABQoCAgIBwg0KAgICA4ABRDQAgAigCCCAEIAVqIANrRg0AIAAgARATQoCAgIDgfiEBCyAAIAMQUQsgAkEQaiQAIAEL1AECA34BfwJ/QYH4ASAAvSICQv///////////wCDIgFCgICAgICAgPj/AFYNABogAUL/////////hz9YBEBBACABQoGAgICAgICwPlQNARogAkL/////////B4NCgICAgICAgAiEIgNCf0KaCCABQjSIIgF9hkJ/hXwgA0KbCCABfSIBiEIBg3wgAYinDAELIAJCKohCAYMgAXwiAUKBgICAgMCA+MAAVARAIAFC//////+/gIABfEIqiKcMAQtBgPgBCyACQjCIp0GAgAJxckH//wNxC7ECAgF/AXwjAEEQayIEJAACQAJAAkACQCACQv////8vWARAIAKnIgNBAE4NAwwBCyACQiCIp0EIa0FuTQRAIAJCgICAgKCBgPz/AHy/IgVEAAAAAAAAAABmRSAFRAAA4P///+9BZUVyIAUgBZ1icg0BIAX8AyEDDAMLIAMEQEF/IQMgACACEIYBIgJCgICAgHCDQoCAgIDgAFENBCAAIARBDGogAkEBEMsCDQQgBCgCDCEDDAMLIAAgBEEMaiACEIABBEAgACACEBMMAgtBfyEDIAAgAhCGASICQoCAgIBwg0KAgICA4ABRDQMgACAEQQhqIAJBABDLAg0DIAQoAggiAyAEKAIMRg0CCyAAQZ/kAEEAEDILQX8hAwwBCyABIAM2AgBBACEDCyAEQRBqJAAgAwtYAQF/AkAgAUEASA0AAkACQAJAIAAoAhAoAjggAUECdGooAgAoAggiAEEedkEBaw4DAwIAAQtBAkEBIABB/////wNxQf////8DRhsPCxAuAAtBASECCyACC5cMAgx/A34jAEEwayIFJAAgAUEIayIOKQMAIQ8CfwJAAkACQAJAAkACQAJ+AkACQAJAAkACQCABQRBrIgopAwAiEEKAgICAcINCgICAgPAAUg0AIA9CIIgiEadBCWpBEEsgEUIHUnINACAPpyEBIBCnIQMCQAJAAkACQAJAAkACQCACQasBaw4DBgIBAAsgAkGeAWsOAgMCDAsgASADciEBDA4LIAEgA3MhAQwNCyABQR9KDQQgAUEATg0BIAFBYUkNBEIAIA99IQ8MCwsgAUEfSg0DIAFBAE4NCiABQWFJDQNBACABayEBCyADIAF1IQEMCgsgASADcSEBDAkLIAAgEBBuIhBCgICAgHCDQoCAgIDgAFENBiAAIA8QbiIPQoCAgIBwg0KAgICA4ABRBEAgECEPDAcLIBBCIIgiEUIHUiARp0F3R3ENASAPQiCIIhFCB1ENACARp0F3Rw0BCyAQpyEEIBBCgICAgHCDQoCAgIDwAFEEQCAFIAQ2AiAgBUKAgICAEDcCGCAFQRhqIQQLIA+nIQMgD0KAgICAcINCgICAgPAAUQRAIAUgAzYCECAFQoCAgIAQNwIIIAVBCGohAwsCQAJAIAJBqwFrQQNPBEAgAkGeAWtBAkkNAQwHCyAEQQRqIANBBGogBCgCBCIGIAMoAgQiB0kiCBsgBiAHIAgbIgFBAnRqKAIAIAAgBiAHIAYgB0sbEFkiDUUNA0EfdSEJIARBCGoiBCADQQhqIgMgCBshCyADIAQgCBshBEEAIQMgAUEAIAFBAEobIQwgDUEIaiEIAkACQAJAIAJBrAFrDgICAAELA0AgAyAMRkUEQCAIIANBAnQiAmogAiALaigCACACIARqKAIAcjYCACADQQFqIQMMAQsLIAYgByAGIAdKGyECA0AgASACRg0EIAggAUECdCIDaiADIARqKAIAIAlyNgIAIAFBAWohAQwACwALA0AgAyAMRkUEQCAIIANBAnQiAmogAiALaigCACACIARqKAIAcTYCACADQQFqIQMMAQsLIAYgByAGIAdKGyECA0AgASACRg0DIAggAUECdCIDaiADIARqKAIAIAlxNgIAIAFBAWohAQwACwALA0AgAyAMRkUEQCAIIANBAnQiAmogAiALaigCACACIARqKAIAczYCACADQQFqIQMMAQsLIAYgByAGIAdKGyECA0AgASACRg0CIAggAUECdCIDaiADIARqKAIAIAlzNgIAIAFBAWohAQwACwALQQBBgYCAgHgCfyADKAIEIgFBAUYEQCADKAIIDAELIANBBGogAUECdGooAgBBH3VB/////wdzCyIBIAFBgYCAgHhMGyIBayABIAJBnwFGGyIBQQBOBEAgACAEIAEQzAUhAQwECyAEQQRqIAQoAgQiA0ECdGooAgBBH3UhB0EAIAFrIghBBXYiAiADTwRAIAAgBxDXASEBDAQLIAAgAyACayIGEFkiAUUNAiAIQR9xIgNFBEBBACEDIAZBACAGQQBKGyEGIAFBCGohByAEIAJBAnRqQQhqIQIDQCADIAZGDQUgByADQQJ0IgRqIAIgBGooAgA2AgAgA0EBaiEDDAALAAsgAUEIaiAEIAJBAnRqQQhqIAYgAyAHEMsFIAAgARD7ASEBDAMLIAAgDRD7ASEBDAILIAAgBUEsaiAQEJ4BDQQgACAFQShqIA8QngENBwJ/AkACQAJAAkACQCACQasBaw4DAQMCAAsCQCACQZ4Baw4CBAAJCyAFKAIsIAUoAih1DAQLIAUoAiggBSgCLHEMAwsgBSgCKCAFKAIscgwCCyAFKAIoIAUoAixzDAELIAUoAiwgBSgCKHQLrQwCC0EAIQELIAAgEBATIAAgDxATIAFFDQUgACABEMIBCyEPIAogDzcDAAwFCxAuAAsgACAPEBMMAgsgEMQg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ASEGDAILIAAgARATDAELIAAQgwELIAJBEGokACAGC8IBAgJ+An8gAUL/////D1gEQCAAIAGnEN8BDwsgAUKAlOvcA4AiAkKA7JSjDH4gAXwhAwJ/IAFCgICAgIDAss07WgRAIAJCgJTr3AOCIQIgAUKAgJC7utat8A2ApyEFIAFCgICgz8jgyOOKf1QEfyAABSAAQTE6AAAgBUEKayEFIABBAWoLIgQgBUEwajoAACAEQQFqIAKnQQkQwAQgBEEKagwBCyAAIAKnEN8BIABqCyIEIAOnQQkQwAQgBCAAa0EJagvHBQIEfwZ+IwBBEGsiCCQAAkACQCABQoCAgIBwVCAEcg0AIAGnIgUvAQZBAkcNACAFLwEEQYAScUGAEkcNACAFKAIUIgYoAiwiBwRAIActAARBgAFxRQ0BCyAFKAIYKQMAIglC/////w9WDQAgCaciByAFKAIoRw0AIAYtADNBCHFFDQAgAiAHaiIGQQBIDQAgBSgCICAGSQRAQoCAgIDgACEBIAAgBSAGEJkCDQILQQAhACACQQAgAkEAShshAgNAIAAgAkcEQCADIABBA3QiBGopAwAiAUKAgICA8H5aBEAgAaciByAHKAIAQQFqNgIACyAFKAIkIAUoAihBA3RqIARqIAE3AwAgAEEBaiEADAELCyAFKAIYIAatIgE3AwAgBSAGNgIoDAELAkAgACAIQQhqIAAgARAmIgoQOA0AIAgpAwgiASACrCIMfCILQoCAgICAgIAQWQRAIABBoecAQQAQFgwBCwJAIARFIAJBAExyRQRAQgAhCSAAIAogDEIAIAFBfxCGAw0CDAELIAEhCQsgAkEAIAJBAEobrSENQgAhAQNAIAEgDVIEQCADIAGnQQN0aikDACIMQoCAgIDwfloEQCAMpyICIAIoAgBBAWo2AgALIAEgCXwhDiABQgF8IQEgACAKIA4gDBCaAUEATg0BDAILCyAAIApBMiALQoCAgIAIfCIJQv////8PWAR+IAtC/////w+DBUKAgICA4H4gC7m9IgFCgICAgKCBgPz/AH0gAUL///////////8Ag0KAgICAgICA+P8AVhsLEDtBAEgNACAAIAoQEyAJQv////8PWARAIAtC/////w+DIQEMAgtCgICAgOB+IAu5vSIBQoCAgICggYD8/wB9IAFC////////////AINCgICA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fwF+AkAgACABpyIDIAIQ4QUEQCABIQkMAQsCfgJAAkAgAqciBigCBCIEQf////8HcSADKAIEIgdB/////wdxaiIIQYCAgIAETwRAIABBkecAQQAQNgwBCyAAIAggBCAHciIFQR92EOABIgcNAQtCgICAgOAADAELIAdBEGohBAJAIAVBAE4EQCADKAIEQf////8HcSIFBEAgBCADQRBqIAX8CgAACyAGKAIEQf////8HcSIFBEAgBCADKAIEQf////8HcWogBkEQaiAF/AoAAAsgBCAIakEAOgAADAELIAQgAyADKAIEQf////8HcRC/BSAEIAMoAgRBAXRqIAYgBigCBEH/////B3EQvwULIAetQoCAgICQf4QLIQkgACABEBMLIAAgAhATIAkLEQAgAgRAIAAgAcAgAvwLAAsLZAAgAUL/////B1gEQCABQoCAgIDwAIQPCwJAIAFCAFkEQCAAIAEQuwUhAAwBCyAAQQMQWSIARQRAQQAhAAwBCyAAQQA2AhAgACABNwIICyAArUKAgICA8H6EQoCAgIDgACAAGwvlAQEFfyABpyIFKAIUIgNBMGohByADIAMoAhggAnFBf3NBAnRqKAIAIQMCQAJAA0AgA0UNASAHIANBAWsiBEEDdGoiAygCACEGIAIgAygCBEcEQCAGQf///x9xIQMMAQsLIAZBgICAgHxODQEgBSgCGCAEQQN0aigCACIAIAAoAgBBAWo2AgAgAA8LQQAhAyAAQQEQxwEiBAR/IAAgBSACQScQfiICRQRAIAAoAhAgBBCNAUEADwsgAiAENgIAIAQgBCgCAEEBajYCACAEBUEACw8LQe6dAUHfkAFBtoIBQY3QABAAAAt2AgF+AX8CfyAAIAIQvQUiA0KAgICAcIMiAkKAgICA4ABRBEBCACECQX8MAQsCQCACQoCAgIDwAFEEQCADxCECDAELIAOnIgQ1AgghAiAEKAIEQQJPBEAgBDUCDEIghiAChCECCyAAIAMQEwtBAAsgASACNwMAC5ABAgN/AX4gASgCGCIFKQMAIgdC/////w9WIAEoAigiBkEBaiIEIAenTXJFBEAgASgCFC0AM0EIcUUEQCAAIAIQEyAAIANBMhChAw8LIAUgBK03AwALAkAgBCABKAIgTQ0AIAAgASAEEJkCRQ0AIAAgAhATQX8PCyABKAIkIAZBA3RqIAI3AwAgASAENgIoQQELvAEBAX8jAEEQayIFJAAgBSADNwMIAkAgAQRAIAEgASgCAEEBajYCACAAIAGtQoCAgIBwhCACQQEgBUEIahA9IQIgACAFKQMIEBNBfyEBIAJCgICAgHCDQoCAgIDgAFENASAAIAIQE0EBIQEMAQsgACADEBMgBEGAgAFxRQRAQQAhASAEQYCAAnFFDQEgACgCECgClAEiBEUNASAELQAkQQFxRQ0BCyAAQYEbQQAQFkF/IQELIAVBEGokACABC7QBAgJ+An8jAEEQayIGJAACQAJAIAAgAUEzECwEQCAAIAFCgICAgDAQkwIiBEKAgICAcINCgICAgOAAUQ0CIAAgBiAEEPYBIQUgACAEEBMgBUKAgICAcINCgICAgOAAUQ0BIAAgASADIAYQxAIDQCAHQQJGRQRAIAAgBiAHQQN0aikDABATIAdBAWohBwwBCwtFDQEgACAFEBMLQoCAgIDgACEEDAELIAUhBAsgBkEQaiQAIAQLswECBn8BfgJAIAEoAmQiAkGA/gNxDQAgASACQYACcjYCZANAIAEoAiAgA0wEQEEADwsgASgCHCADQQR0aiIHKQMIIQggBygCACEEQX8hBiAAIAEoAhAQpgQiAkUNAQJAIAAgBBCmBCIERQRAQQAhBQwBCyAAIAIgBCAIENgFIQUgACACEFEgBCECCyAAIAIQUSAFRQ0BIAcgBTYCBCADQQFqIQMgACAFEI8EQQBODQALCyAGCzMBAX8jAEHQAGsiAyQAIAMgACgCECADQRBqIAEQhQE2AgAgACACIAMQlQEgA0HQAGokAAs7AQF/IAAoAhAiAyABIAIQxgIiAUUEQCAAEMkBQoCAgIDgAA8LIAMoAjggAUECdGo1AgBCgICAgIB/hAuIAQECf0GQASECAkACQAJAAkACQAJAAkACQAJAAkBBCCABQiCIpyIDIANBCGtBb0kbQQlqDhIJBwICCAgICAMAAQYECAgICQAIC0HKAA8LQcsADwtBzAAPCyABpy4BBEEATg0BC0HJAA8LIAAgARAwRQ0AQRsPC0HNAA8LQc4ADwtB0AAhAgsgAgsLACAAIAFBARCiBAuZDwEKfyABpyIGIAI2AiAgBkIANwIkAkAgAigCQCIIRQ0AAkAgACAIQQJ0ED8iD0UNACAGIA82AiQCQCAFRQ0AIAIoAkAiBUEAIAVBAEobIQkDQCAJIAxGDQECQCACKAIkIAxBA3RqIgYvAQAiBUEHcUEERw0AIAVBBHRBgAFxIghBwAByIAggBUGAHnFBgBRGGyEIIAAoAtABIgcoAhQiBUEwaiELIAUgBigCBCIGIAUoAhhxQX9zQQJ0aigCACEFAkACQAJAAkACQANAIAVFDQEgCyAFQQN0aiIKQQhrIQUgBiAKQQRrKAIARwRAIAUoAgBB////H3EhBQwBCwsgCEGAAU8EQCAFRQ0EIAUtAANBBHENBAwFCyAFRQ0BIAhFDQMgBSgCACIFQYCAgCBxDQMgBUGAgICAfHFBgICAgARGDQIgBUGAgIDAAXFBgICAwAFGDQMMAgsgCEGAAU8NAgsgBy0ABUEBcQ0BCyAAIAZB0bgBEJQBDAULIAAoAtgBKAIUIgVBMGohCCAFIAUoAhggBnFBf3NBAnRqKAIAIQUDQCAFRQ0CIAggBUEDdGoiB0EIayEFIAYgB0EEaygCAEcEQCAFKAIAQf///x9xIQUMAQsLIAVFDQELIAAgBhDtBQwDCyAMQQFqIQwMAAsAC0EAIQwDQCAMIAIoAkBODQICQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAIAIoAiQgDEEDdGoiCC8BACIFQQdxQQFrDgcDBAQAAQUNAgsCQAJAIAVBCHEEQEEFQQcgBUEQcRshCyAAKALYASIGKAIUIgdBMGohCiAHIAgoAgQiCSAHKAIYcUF/c0ECdGooAgAhBwJAA0AgB0UNASAKIAdBAWtBA3QiDWoiDigCACEHIAkgDigCBEcEQCAHQf///x9xIQcMAQsLIAdBgICAgHxODQogBigCGCANaigCACIFIAUoAgBBAWo2AgAMDwsgACgC0AEiBygCFCIKQTBqIQ0gCiAKKAIYIAlxQX9zQQJ0aigCACEKA0AgCkUNAiAJIA0gCkEBa0EDdCIOaiIKKAIERwRAIAooAgBB////H3EhCgwBCwsgCigCAEH/////e0oNASAHKAIYIQUgAEEAEMcBIglFDREgCSAFIA5qIgcoAgAiBSkDGDcDGCAFQoCAgIDAADcDGCAHIAk2AgAMAgtBB0EGIAItABJBEHEbIQsgACgC0AEhBgJAA0AgBigCFCIFQTBqIQogBSAIKAIEIgkgBSgCGHFBf3NBAnRqKAIAIQUDQCAFRQ0CIAkgCiAFQQFrQQN0IgVqIgcoAgRHBEAgBygCAEH///8fcSEFDAELCyAGKAIYIAVqIQogBygCAEEadkEwcSIFQSBHBEAgBUEwRw0KIAAgBiAJIAogBxD6AUUNAQwTCwsgCigCACIFIAUoAgBBAWo2AgAMDQsgBi0ABUEBcUUNCSAAKALQASEHIAgvAQAhBQsgACAHKQMgIAkgBUEDdkEBcRDSBSIFRQ0PCyAILQAAQQhxBEAgBUEBOgAGIAUgCC0AAEEEdkEBcToABwsgACAGIAgoAgQgC0EgchB+IgZFBEAgACgCECAFEI0BDA8LIAYgBTYCACAFIAUoAgBBAWo2AgAMCwsgACgC2AEiBigCFCIFQTBqIQkgBSAIKAIEIgcgBSgCGHFBf3NBAnRqKAIAIQUCQANAIAVFDQEgCSAFQQFrQQN0IgtqIgooAgAhBSAHIAooAgRHBEAgBUH///8fcSEFDAELCyAFQYCAgIB8Tg0IIAYoAhggC2ooAgAiBSAFKAIAQQFqNgIADAsLIAAoAtABIQUCQANAIAUoAhQiBkEwaiEHIAYgCCgCBCIJIAYoAhhxQX9zQQJ0aigCACEGA0AgBkUNAiAJIAcgBkEBa0EDdCILaiIGKAIERwRAIAYoAgBB////H3EhBgwBCwsgBSgCGCALaiEHIAYoAgBBGnZBMHEiC0EgRwRAIAtBMEcNAiAAIAUgCSAHIAYQ+gFFDQEMEAsLIAcoAgAiBSAFKAIAQQFqNgIADAsLIAAgBSkDICAJEIoEIQUMCAsgACAEIAgvAQJBABCqAyEFDAcLIAAgBCAILwECQQEQqgMhBQwGCyADIAgvAQJBAnRqKAIAIgUgBSgCAEEBajYCAAwHCyAAIAVBA3ZBAXEQxwEhBQwECyAAIAYpAyAgCRCKBCIFDQQMCAtB7p0BQd+QAUH1ggFB8M8AEAAACyAAIAYpAyAgCRCKBCEFDAELQe6dAUHfkAFB1YMBQdrPABAAAAsgBUUNBAwBCyAILwEAQYAecUGAFEcNACAHKAIAIgZBgICAIHFFDQACQCAGQRp2IghBMHEiCUEgRwRAIAlBEEYEQCAAKAIQIAogCBCwAyAHIAcoAgBB////H3EgC0EadHJBgICAgHhyNgIAIAogBTYCACAFIAUoAgBBAWo2AgAMAgtB7p0BQd+QAUGpgwFB8M8AEAAACyAHIAZB////H3EgCEEocSALckEadHI2AgALIAVBADoABwsgDyAMQQJ0aiAFNgIACyAMQQFqIQwMAAsACyAAIAEQE0KAgICA4AAhAQsgAQttAQJ/AkAgAUKAgICAcFQNACABpyIDLwEGEP8BRQ0AIAMoAiAtABFBCHFFDQAgAygCKCIEBEAgACAErUKAgICAcIQQEwtBACEAIAJCgICAgHBaBEAgAqciACAAKAIAQQFqNgIACyADIAA2AigLCwwAIABBo94AQQAQFguwAwIGfwF+IwBBEGsiBSQAAkAgAkL/////b1gEQCAAQcA1QQAQFgwBCyAAIAVBCGogAhA4DQAgBSkDCCIJQv//A1kEQCAFQf7/AzYCACAAQaCyASAFEDIMAQsgAEEBIAmnIgQgBEEBTRtBA3QQPyIGRQ0AAkACQCACpyIHLwEGIghBCUtBASAIdEGEBnFFcg0AIActAAVBCHFFDQAgBygCKCAERw0AIAhBCUYEQANAIAMgBEYNAyAHKAIkIANBAnRqKAIAKAIQKQMAIgJCgICAgPB+WgRAIAKnIgAgACgCAEEBajYCAAsgBiADQQN0aiACNwMAIANBAWohAwwACwALA0AgAyAERg0CIANBA3QiCCAHKAIkaikDACICQoCAgIDwfloEQCACpyIAIAAoAgBBAWo2AgALIAYgCGogAjcDACADQQFqIQMMAAsACwNAIAMgBEYNASAAIAIgAxCjASIJQoCAgIBwg0KAgICA4ABRBEAgACAGIAMQpwNBACEDDAMFIAYgA0EDdGogCTcDACADQQFqIQMMAQsACwALIAEgBDYCACAGIQMLIAVBEGokACADC5sCAgJ/AX4CfkKAgICA4AAgABB/DQAaAkACQCABQoCAgIBwWgRAIAGnIgctAAVBEHFFBEAgACABEJYCQoCAgIDgAA8LIAVBAXIhBiAHLwEGIgVBDUYNAiAAKAIQKAJEIAVBGGxqKAIQIgUNAQsgAEHJ1QBBABAWQoCAgIDgAA8LIAAgASACIAMgBCAGIAURFwAPCyAHKAIgLQARQQRxBEAgACABQoCAgIAwIAIgAyAEIAYQ3QEPC0KAgICA4AAgACACQQEQViIIQoCAgIBwg0KAgICA4ABRDQAaIAAgASAIIAIgAyAEIAYQ3QEiAUL/////b1ggAUKAgICAcINCgICAgOAAUnFFBEAgACAIEBMgAQ8LIAAgARATIAgLC/gBAgF/AX4CQAJAIAAgAaciBS8AEUEDdkEGcS8B0OQBEIgBIgZCgICAgOAAUQRADAELAkAgACAGIAUgAiADIAQQlAQiAUKAgICA4ABRDQAgACABIAUoAhwiAkEvIAIbIAUvASwQpAMgBS8AESICQRBxBEAgACAAKAI4QdgDQYADIAJBMHFBMEYbaikDABCQASIGQoCAgIDgAFENASAAIAFBPyAGQQIQHhogAQ8LIAJBAXFFDQIgAUKAgICAcFoEQCABpyICIAIvAQRBgCByOwEECyAAIAFBP0EAQQBBAhCjAxogAQ8LCyAAIAEQE0KAgICA4AAhAQsgAQtSAgF/AX5CgICAgCAhA0ERIAFCIIinIgJBCWogAkEIa0FvSRsiAkERS0GPjAwgAnZBAXFFcgR+QoCAgIAgBSAAKAI4IAJBAnQoArCxAmopAwALCzEBAX8jAEEQayICJAAgAkEANgIIIAJCgICAgBA3AgAgACACIAFBARDWAiACQRBqJAALywQCDH8DfiACQQAgA2siCmwhBwJAIAFBAUYNACABQe6zAmotAAAhCSADQQBOBEAgAEEEaiEFQQAhBANAIANFDQIgBCADIAkgAyAJSBsiAkcEQCABIAIQrQOnIQggAiEECyAFIAUgACgCACAIQQAQmAMiDQRAIAAgACgCACIGQQFqNgIAIAUgBkECdGogDTYCAAsgAyACayEDDAALAAsgCSADQX9zaiAJbUEFdCIDIAdqIQ8CfyAERQRAIAUgABCxBmsMAQsgBSAPa0ECagshAkEAIQUgAEEAIAMgAkEAIAJBAEobIhBqa0ECENgCIABBBGohAiABQQVHIRFBACEHQQAhBANAIAoEQCAFIAogCSAJIApKGyIDRwRAAn8gESADQQ1LckUEQCADQQJ0IgVB3LcCaigCACIHIAdnIgd0IQggBUGsuAJqKAIADAELIAEgAxCtA6ciBSAFZyIHdCIIQX9zrUIghkL/////D4QgCK2ApwshDSADIQULIAAoAgAhC0EAIQYgBwRAIAIgAiALIAcQsAYhBgsgCK0hEiANrSETA0AgC0EBayILQQBOBEAgAiALQQJ0IgxqIAYgBiACIAxqKAIAIgxBH3UiDmutIBN+IAggDnEgDGqtfEIgiKdqIg4gDq1Cf4UgEn4gDK0gBq1CIIaEfCIUQiCIpyIGakEBajYCACAUpyAGIAhxaiEGDAELCyAGIAd2IQYgABDnAiAEIAZyIQQgCiADayEKDAELCyACIAIoAgAgBEEAR3I2AgAgDyAQaiEHCyAHCzUAIAAgATcCBCAAQQFBAiABQoCAgIAQVBs2AgAgACAAIAMgBCAFQQEgAhCcBCACayAGENgCC8sBAgN/An4jAEEwayIFJAACQCACQQpGBEAgACABEO4DIQIMAQsgAiACQQFrcUUEQEEfIAJnayEDIAFQBEBBASECIABCACADQQEQvwQMAgsgACABIAMgAyABeadrQT9qwCADbcAiAhC/BAwBCyACrSEGIAVBKWoiAiEDA0AgA0EBayIDQTBB1wAgASABIAaAIgcgBn59pyIEQQpIGyAEajoAACABIAZaIAchAQ0ACyACIANrIgJFDQAgACADIAL8CgAACyAFQTBqJAAgAgs7ACABIAFBAWtxRQRAIAFnIgFBHmsgAEEfdXEgAGpBHyABa20PCyABQQJ0Qci2Amo0AgAgAKx+QhiIpwv2AwIEfgJ/AkAgAb0iBEIBhiIDUCABvUL///////////8Ag0KAgICAgICA+P8AVnJFBEAgAL0iBUI0iKdB/w9xIgZB/w9HDQELIAAgAaIiACAAow8LIAMgBUIBhiICWgRAIABEAAAAAAAAAACiIAAgAiADURsPCyAEQjSIp0H/D3EhBwJ+IAZFBEBBACEGIAVCDIYiAkIAWQRAA0AgBkEBayEGIAJCAYYiAkIAWQ0ACwsgBUEBIAZrrYYMAQsgBUL/////////B4NCgICAgICAgAiECyECAn4gB0UEQEEAIQcgBEIMhiIDQgBZBEADQCAHQQFrIQcgA0IBhiIDQgBZDQALCyAEQQEgB2uthgwBCyAEQv////////8Hg0KAgICAgICACIQLIQQgBiAHSgRAA0ACQCACIAR9IgNCAFMNACADIgJCAFINACAARAAAAAAAAAAAog8LIAJCAYYhAiAGQQFrIgYgB0oNAAsgByEGCwJAIAIgBH0iA0IAUw0AIAMiAkIAUg0AIABEAAAAAAAAAACiDwsgAkL/////////B1gEQANAIAZBAWshBiACIgNCAYYhAiADQoCAgICAgIAEVA0ACwsgBUKAgICAgICAgIB/gyACQoCAgICAgIAIfSAGrUI0hoQgAkEB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BQwBCyAEQQA2AgggACAJai0AAEE6RgRAIAQgCUEBajYCBCAAIARBBGogBEEIakECQQIQjwFFDQQgBCgCCCEFDAELQQAhBSADDQMLIAZBF0oNASAFQTtKDQIgBkE8bCAFaiIAQQAgAGsgCEErRhshByAEKAIEIQYLIAEgBjYCACACIAc2AgBBASEHDAELCyAEQRBqJAAgBwvgAwMGfAJ+A38jAEEQayILJABEAAAAAAAA+H8hBgJAIAArAwAgACsDCCIDRAAAAAAAAChAo5ygIgJEAAAAADSXEMFjIAJEAAAAAMDUEEFkcg0AIAArAxAhBCADRAAAAAAAAChAEKAEIgNEAAAAAAAAKECgIAMgA0QAAAAAAAAAAGMb/AIiDEEAIAxBAEobIQwgAvwCrCIJEM8GIQgDQCAKIAxGRQRAIAggCkECdDQCoOQBfCEIIApBAUYEQCAJEM4GIAh8Qu0CfSEICyAKQQFqIQoMAQsLIAArAxghAiAAKwMwIQMgACsDKCEFIAsgACsDIEQAAAAAAEztQKIiBzkDCCALIAVEAAAAAABAj0CiIgU5AwggCyAEIAi5oEQAAAAAAADwv6BEAAAAAHCZlEGiIgQ5AwggBCADIAJEAAAAAEB3S0GiIAegIAWgoKAiAr1C////////////AINC//////////f/AFYNACABBEAgAkKAgICAgICAgIB/Qv///////////wAgAvwGIAJEAAAAAAAA4ENmGyACRAAAAAAAAODDYxsQzQRB4NQDbLegIQILIAKdRAAAAAAAAAAAoEQAAAAAAAD4fyACmUQAANzCCLI+Q2UbIQYLIAtBEGokACAGC4MBAQJ/IwBBMGsiASQAQcy1BS0AAEEBcSICIAJyRQRAQby1BUHAtQVB0LUFQfC1BRAMQci1BUHwtQU2AgBBxLUFQdC1BTYCAEHMtQVBAToAAAsgAELoB38gAUEEahALIAFByLUFQcS1BSABKAIkGygCADYCLCABKAIoIAFBMGokAEFEbQuDBAMFfgN/AXwjAEEQayIKJAACQCAAIApBCGogARDqAgRAQX8hAgwBCwJ8IAorAwgiDb1C////////////AINCgYCAgICAgPj/AFoEQCAEBEBCACEBRAAAAAAAAAAADAILQQAhAgwCCyAN/AYhAUQAAAAAAAAAACADRQ0AGkEAIAEQzQRr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sAIgBCACIANBsAJqECkNGSADQX82AqgCIANCho6oyOAINwOgAiAEIAIgA0GgAmoQKQ0ZDA0LIANCjoCAgHA3A5ADIANBtAZqIAYgA0GQA2oQKQRAIAMoAsAGIgJBAEgNEiADIAI2AvAGDBILIANCqICAgHA3A4ADIANBtAZqIAYgA0GAA2oQKQRAAkAgAygCwAYiAkEASARAIAMoAvAGIQIMAQsgAyACNgLwBgsgASADKALcBiACEDcgA0HYBmpBKRAVDBILIANC6NKBgHA3A/ACQQAhCiADQbQGaiIEIAYgA0HwAmoQKQ0IIANCqYGAgHA3A+ACIAQgBiADQeACahApBEACQCADKALABiICQQBIBEAgAygC8AYhAgwBCyADIAI2AvAGCyABIAMoAtwGIAIQNyADQdgGakHwARAVDBILIANBfzYC2AIgA0KqgYCAgK0aNwPQAiADQbQGaiAGIANB0AJqEClFDQwCQCADKALABiIFQQBIBEAgAygC8AYhBQwBCyADIAU2AvAGCyABIAMoAtwGIAUQNyADQdgGakHwARAVIAMoAsQGQQFzIQUMEgsgA0F/NgKoAyADQr+AgIDgATcDoAMgA0G0BmogBiADQaADahApRQ0LAkAgAygCwAYiAkEASARAIAMoAvAGIQIMAQsgAyACNgLwBgsgASADKALcBiACEDcgA0HYBmoiAkE/EBUgAiADKALUBhAfDBALIANBfzYC2AMgA0LWwOXidTcD0AMgA0G0BmogBiADQdADahApRQ0KIAMoAsAGIgJBAE4EQCADIAI2AvAGCyADQo6AgIBwNwPAAyADKALEBiIFQQFqIQQCQCADQbQGaiADKAK8BiICIANBwANqECkEfyADKALABiICQQBOBEAgAyACNgLwBgsgAyADKALIBjYCtANBfyEGIANBfzYCuAMgAyAFQQFrNgKwAyADQbQGaiADKAK8BiICIANBsANqEClFDQEgAygCvAYhAiADKALABgVBfwshBiAEIQULIAEgAygC3AYgAygC8AYQNyADQdgGaiAFIAMoAsgGEF8gBkEASA0WIAMgBjYC8AYMFgsgBy8AASICQf8BSw0JIANCjoCAgHA3AuwEIAMgAjYC6AQgA0KOn4KA4Ao3A+AEAkAgA0G0BmoiBCAGIANB4ARqEClFBEAgA0KOgICAcDcD0AQgAyAC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BGshCCACKAIAIQcCQAJAAkACQCACKAIIQQFrDgQCAQMAAwsgAygC2AYgBGogCDYAAAwCCyAIQYCAAmpBgIAETw0JIAMoAtgGIARqIAg7AAAMAQsgCEGAAWpBgAJPDQkgAygC2AYgBGogCDoAAAsgACgCECIEQRBqIAIgBCgCBBEAAAwACwALIAcoAAEiBEGAgICAeEYNAiADQoqBgIBwNwOAAiADQbQGaiAGIANBgAJqEClFDQIgAygCwAYiAkEATgRAIAMgAjYC8AYLIANCjoCAgHA3A/ABIANBtAZqIAMoArwGIANB8AFqECkEQCADKALABiICQQBIDQggAyACNgLwBgwICyABIAMoAtwGIAMoAvAGEDcgA0HYBmoiAkGwARAVIAJBACAEaxAfDAcLIANCjoCAgHA3A8gFIANC1rLxgnA3A8AFIANBtAZqIAYgA0HABWoQKQRAIAMoAsAGIgJBAE4EQCADIAI2AvAGCyADIAMoAsgGIgQ2ArQFIANBfzYCuAUgAyADKALEBiIGQQFrNgKwBSADQbQGaiADKAK8BiICIANBsAVqECkEQCADKALABiICQQBOBEAgAyACNgLwBgsgBkEBaiEGIAMoArwGIQILIAEgAygC3AYgAygC8AYQNyADQdgGaiIIIAVBAmtB/wFxEBUgCCAGIAQQXwwOCyADQo6AgIBwNwOoBSADQpiAgIDwBzcDoAUgA0G0BmogBiADQaAFahApBEACQCADKALABiICQQBIBEAgAygC8AYhAgwBCyADIAI2AvAGCyABIAMoAtwGIAIQNyADQdgGaiICIAVBAmtB/wFxEBUgAkE/EBUgAiADKALUBhAfDAcLIANCjoCAgHA3A5gFIANCmYCAgOAINwOQBSADQbQGaiAGIANBkAVqEClFDQECQCADKALABiICQQBIBEAgAygC8AYhAgwBCyADIAI2AvAGCyABIAMoAtwGIAIQNyADQdgGaiICIAVBAmtB/wFxEBUgAkHGABAVDAYLIANBfzYC6AUgA0KEgICAkNXq06h/NwPgBSADQbQGaiAGIANB4AVqEClFDQAgAygCwAYiBEEATgRAIAMgBDYC8AYLIAMoAsQGIQUgAygC1AYiBEHJAEYEf0HyAQUgBEEbRw0BQfMBCyEKAkACQCAFQacBaw4DAAEAAQsgASADKALcBiADKALwBhA3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AAsgAiAEakEAOgAAIAAgBSADEMYCBUEACwv1AQEIf0F/IQIgASABQQFrcUUEQCAAQRBqIgggAUECdCIDIAAoAgARAwAiBgR/IAMEQCAGQQAgA/wLAAsgAUH/////A2pB/////wNxIQkgACgCNCEHA0AgBCAAKAIkT0UEQCAHIARBAnRqKAIAIQIDQCACBEAgACgCOCACQQJ0aigCACIFKAIMIAUgBiAJIAUoAghxQQJ0aiIFKAIANgIMIAUgAjYCACECDAELCyAEQQFqIQQMAQsLIAggByAAKAIEEQAAIAAgAUEBdDYCMCAAIAE2AiQgACAGNgI0QQAFQX8LDwtB2K4BQd+QAUHBFEGd5gAQAAALRwEBfwJAIAGnKAIgIgNFDQAgAykDACIBQoCAgIBQWgRAIAAgAacgAhEAAAsgAykDCCIBQoCAgIBQVA0AIAAgAacgAhEAAAsLMAEBfyABpygCICICBEAgACACKQMAECIgACACKQMIECIgAEEQaiACIAAoAgQRAAALCxgBAX8gAacoAiAiAwRAIAAgAyACEQAACwseACABpykDICIBQoCAgIBQWgRAIAAgAacgAhEAAAsLZwICfgF/QoCAgIDgACEDIABBtLUFKAIAEIgBIgJCgICAgOAAUgR+IABBBBA/IgRFBEAgACACEBNCgICAgOAADwsgBCABNgIAIAJCgICAgHBaBEAgAqcgBDYCIAsgAgVCgICAgOAACws9AQF/A38gAKchAiAAQoCAgIBwg0KAgICAkH9RBH8gAiABEP4DBSACKQMQIAEQowUhASACKQMYIQAMAQsLC90BAwF+An8BfANAAkBBfyEEAkACQAJAQQggAkIgiKciBSAFQQhrQW9JGw4JAAAAAAICAwIBAgsgAsQhA0EAIQQMAgtBACEEIAJCgICAgKCBgPz/AHwiAkL///////////8Ag0KAgICAgICA+P8AVg0BIAK/IgZEAAAAAAAA4MNjBEBCgICAgICAgICAfyEDDAILIAZEAAAAAAAA4ENmBEBC////////////ACEDDAILIAb8BiEDDAELIAAgAhCGASICQoCAgIBwg0KAgICA4ABSDQELCyABIAM3AwAgBAuAAwEIfwJAAkACQAJAAkAjACIHIAAoAhAoAoABTwRAIAJBCGohCANAIAEoAnggBUwEQEEAIQMMAwtBACED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AgAiBiAFKAIAaiIFIAFqIgE2AgAgBSAGSSABIAVJciEBIARBAWohBAwBCwsgFUEBayEVIAFFDQAgDyAPKAIAQQFqIgE2AgAgAQ0ACwsgDSAYaiAVNgIADAALAAsgByAENgIACyAAKAIQIgFBEGogCSABKAIEEQAAIAAoAhAiAUEQaiECIAEoAgQhASADBEAgAiATIAERAAAgEgRAIAcgByAKIBJBABDLBQsgByAKQQJ0akEANgIAIApBAWohASAWQQBIBEAgByAHIAEQlwMLIAAgDiABEPMFIQYMBgsgAiAOIAERAAAgDSALQQJ0akEANgIEIBYgF3NBAEgEQCANIA0gEygCBBCXAwsgACATEPsBIQYMBQsgCEEBayEIDAALAAsgBEEBayEEDAELCyAAIQYLIBFBEGokACAGC9MBAQF8IAECfwJAA0ACQAJAAkBBCCACQiCIpyIBIAFBCGtBb0kbDgkAAAAAAgICAgECC0EAIQFB/wEgAqciAEEAIABBAEobIgAgAEH/AU4bDAQLQQAhASACQoCAgICggYD8/wB8IgJC////////////AINCgICAgICAgPj/AFYNAiACvyIDRAAAAAAAAAAAYw0CQf8BIANEAAAAAADgb0BkDQMaIAOe/AIMAwsgACACEIYBIgJCgICAgHCDQoCAgIDgAFINAAtBfyEBC0EACzYCACABC4QVAwh/DH4BfCMAQUBqIgQkACAEQQBBwAD8CwAgAUEAQdAB/AsAIAEgADUCEDcDGCABIAA1AhQ3AwAgADUCGCEKIAFCAjcDICABIAo3AwggASAAKAJAQQN0QYACaq03AxAgAEHMAGohAiAAQcgAaiEIA0AgAigCACIFIAhGRQRAIAUoAhAhAiABIAEpAyBCAnw3AyAgASABKQMQIAAoAkBBA3RBgAJqrXw3AxAgASABKQPAASAFMwEIfDcDwAEgASABKQPIASAFNAIMfDcDyAECQCACRQ0AIAItABANACACKAIYIQMgASABKQNoQgF8NwNoIAEgASkDcCADQQJ0IAIoAhxBA3RqQTRqrXw3A3ALIAVB3AFqIQIgBUHYAWohCQNAIAkgAigCACIDRwRAIAEgASkDICIMQgF8Igs3AyAgASABKQMQQtABfCIKNwMQIAMoAggEQCABIAxCAnwiCzcDICABIAogAygCDEEEdK18Igo3AxALAkAgAygCFEUNACABIAtCAXw3AyAgASAKIAMoAhgiBkEUbK18NwMQQQAhAgNAIAIgBk4NAQJAIAMoAhQgAkEUbGoiBygCCA0AIAcoAgRFDQAgASABKQMgQgF8NwMgIAcoAgQpAxggBBCXASADKAIYIQYLIAJBAWohAgwACwALIAMoAiAEQCABIAEpAyBCAXw3AyAgASABKQMQIAMoAiRBAnStfDcDEAsgAygCLARAIAEgASkDIEIBfDcDICABIAEpAxAgAygCMEEEdK18NwMQCyADKQM8IAQQlwEgAykDRCAEEJcBIANBBGohAgwBCwsgBUEEaiECDAELCyAAQdQAaiECIABB0ABqIQkDQCACKAIAIgMgCUZFBEACQAJAAkAgA0EEayIILQAAQQ9xDgIBAAILIAMoAhgEfyADLwEiIAMvASBqQQxsQcQAagVBxAALIQYgAygCMARAQQAhAiADKAI0IgchBQNAIAIgBU5FBEAgAygCMCACQQN0aikDACAEEJcBIAJBAWohAiADKAI0IQUMAQsLIAdBA3QgBmohBgsgAygCHARAIAMoAjhBA3QgBmohBgsCQCADLwAJIgVBgBBxDQAgAygCDEUNACAEIAQpAyggAzQCEHw3AygLAn9BACAFQYAIcUUNABoCfyADKAJMRQRAIAZBFGohBkEADAELIAYgAygCQGpBFWohBkEBCyICIAMoAkQiBUUNABogBCAEKQMwQgF8NwMwIAQgBCkDOCAFrHw3AzggAkEBagshAiAEIAQpAxhCAXw3AxggBCAEKwMgIAa3oDkDICAEIAQrAwAgArigOQMADAELIAMoAgwhByABIAEpA0hCAXw3A0gCQCADKAIQRQ0AIAEgASkDIEIBfDcDICABIAEpA2AgBygCHEEDdK18NwNgIAEgASkDWCAHKAIgIgasfDcDWCAHQTBqIQJBACEFA0AgBSAGTg0BAkAgAigCBEUNACACKAIAQf////8DSw0AIAMoAhAgBUEDdGopAwAgBBCXASAHKAIgIQYLIAVBAWohBSACQQhqIQIMAAsACyAHLQAQRQRAIAcoAhghAiABIAEpA2hCAXw3A2ggASABKQNwIAJBAnQgBygCHEEDdGpBNGqtfDcDcAsCQAJAAkACQAJAAkACQAJAAkACQAJAIANBAmsvAQBBAmsOIQAKAgICAgABAgoD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IgYgAksEQCAAKAIAIAIQICECDAELIAAoAgAhBSACIAZrIgIgACgCFE8EQCADIAAoAgggACgCBGs2AgAgBUHkrwEgAxCVASABQQA2AgBBfyEEIABBfzYCHAwCCyAFIAAoAhggAkECdGooAgAQICECCyABIAI2AgALIANBEGokACAECzwBAX8gACgCDCAAKAIIIgJrQQFMBEAgAUEAOwEAIAAQzQFBfw8LIAEgAi8AADsBACAAIAJBAmo2AghBAAs8AQF/IAAoAgwgACgCCCICa0EHTARAIAFCADcDACAAEM0BQX8PCyABIAIpAAA3AwAgACACQQhqNgIIQQAL/QEBAn8CQAJAIAJBAEgNACACIAAoAiAiA0kNAAJAIAIgA2siAyAAKAIoIgJJBEAgACgCJCADQQJ0aigCACICDQIMAQtBfyEEIAAoAgAgAEEkakEEIABBKGogA0EBahBUDQIDQCACIAAoAihODQEgACgCJCACQQJ0akEANgIAIAJBAWohAgwACwALIAAoAgAgAEEsakEEIABBNGogACgCMEEBahBUBEBBfyEEQQAhAgwBCyAAIAAoAjAiAkEBajYCMCAAKAIsIAJBAnRqIAAoAiAgA2o2AgAgACgCJCADQQJ0aiACIAAoAiBqIgI2AgBBACEECyABIAI2AgALIAQLKgEBfyMAQRBrIgIkACACIAE3AwggAEEEaiACQQhqQQgQYBogAkEQaiQAC4MCAgZ/AX4jAEEQayIEJAACQCABQv////9vWARAIAAQJUF/IQMMAQtBfyEDIAAgAhAmIglCgICAgHCDQoCAgIDgAFENACAAIARBDGogBEEIaiAJp0ETEHchA0KAgICAMCECIAQoAgghBiAEKAIMIQcCQAJAIANBAEgNAANAIAUgBkYEQEEAIQMMAwsgACACEBMgACAJIAcgBUEDdGoiCCgCBCAJQQAQGCICQoCAgIBwg0KAgICA4ABRDQFBfyEDIAVBAWohBSAAIAEgCCgCBCACQYCAARDJBkEATg0ACwwBC0F/IQMLIAAgByAGEFggACAJEBMgACACEBMLIARBEGokACADC18CA34BfyAAKQPQASICQoCAgIDwfloEQCACpyIFIAUoAgBBAWo2AgALIAAgAkGw3gAQpwIhAyAAIAIQEyAAIAAgA0HGxgAQpwIiAiADQQEgARAcIAAgAhAT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QAJAIAkOBAABAgMECyACIAU2AgggAiAGNgIEIAIgBDYCACACQZACaiADakHAACADa0GPmAEgAhBmIANqIQMMAwsgAiAFNgIoIAIgBjYCJCACIAQ2AiAgAkGQAmoiBiADakHAACADa0GPmAEgAkEgahBmIANqIgMgBmpBLUErIBD8AiIEQQBIGzoAACACIAQgBEEfdSIFcyAFayIEQTxuIgU2AhAgAiAFQURsIARqNgIUIAYgA0EBaiIEakE/IANrQfOPASACQRBqEGYgBGohAwwCCyACIAz8AjYCPCACIAU2AjggAiAGNgI0IAIgBDYCMCACQZACaiADakHAACADa0GblQEgAkEwahBmIANqIQMMAQsgAiAFNgJIIAIgBjYCRCACQcEAQdAAIARBDEgbNgJMIAIgBEELakEMb0EBajYCQCACQZACaiADakHAACADa0HQmgEgAkFAaxBmIANqIQMLIAAgAkGQAmogAxDpAiELCyACQdACaiQAIAsLmgECAn8BfANAIAJBB0cEQCAAIAJBA3RqIgMrAwAiBL1C////////////AINC//////////f/AFYEQEQAAAAAAAD4fw8FIAMgBJ05AwACQCACDQAgACsDACIERAAAAAAAAAAAZkUgBEQAAAAAAABZQGNFcg0AIAAgBEQAAAAAALCdQKA5AwALIAJBAWohAgwCCwALCyAAIAEQzAQL3RQDEX8BfAF+IwBBgAJrIgQkAEKAgICA4AAhASAAIAMpAwAQKCIWQoCAgIBwg0KAgICA4ABSBEBB/wAgFqciAigCBCIJQf////8HcSIDIANB/wBPGyEFIAJBEGohBkEAIQMgCUEATiEJA0AgAyAFRkUEQCADIARqQS1B+AACfyAJRQRAIAYgA0EBdGovAQAMAQsgAyAGai0AAAsiAkGSxABGGyACIAJB/wFLGzoAACADQQFqIQMMAQsLQQAhAyAEIAVqQQA6AAAgBEEANgKAAQNAIANBCUZFBEAgBEHQAWogA0ECdGogA0ECRjYCACADQQFqIQMMAQsLAkACQAJAAkACQAJAAkAgBC0AACICQStrDgMAAQABCyAEQQE2AoABIAQgBEGAAWogBEHQAWpBBkEGEI8BRQ0CIAJBLUcNASAEKALQASICRQ0CIARBACACazYC0AEMAQsgBCAEQYABaiAEQdABakEEQQQQ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MGoQ6AQgACAcEBMgACAVEBMgACAeEBMgACAXEBMgACAZEBMgACAYEBMgACAbEBMLIAJBsAFqJAAgFguYAQAjAEEgayICJAACfgJAIAFC/////29YBEAgABAlDAELIAAgAkEIaiIDQQAQQxogA0EvEDUaAkAgAyAAIAFB8AAgAUEAEBgQrQENACADQS8QNRogAyAAIAFB8QAgAUEAEBgQrQENACADEDwMAgsgAigCCCgCECIAQRBqIAIoAgwgACgCBBEAAAtCgICAgOAACyACQSBqJAALTgECfkKAgICA4AAhBCAAIAEgAykDABDTASIBQoCAgIBwgyIFQoCAgIDgAFIEfiAAIAEQEyAFQoCAgIAgUq1CgICAgBCEBUKAgICA4AALCwcAIAAQvwEL6wICA34BfwJAAkAgACABEPsCIgJFDQAgAykDCCEFAkACQAJAIAMpAwAiBEKAgICAcFQNACAEpyIDLwEGQRJHDQAgBUKAgICAcINCgICAgDBSBEAgAEHDjQFBABAWQoCAgIDgAA8LIAMoAiAiByAHKAIAQQFqNgIAIAMoAiQiAyADKAIAQQFqNgIAIAetIQQgA60hBQwBC0KAgICAMCEGAn4gBEKAgICAcINCgICAgDBRBEAgAEEvEDMMAQsgACAEECgLIgRCgICAgHCDQoCAgIDgAFENAUKAgICA4AAhBiAAIAQgBRDbAyIFQoCAgIDgAFENAQsgACACNQIAQoCAgICQf4QQEyAAIAI1AgRCgICAgJB/hBATIAIgBT4CBCACIAQ+AgAgACABQdkAQgAQO0EASA0BIAFCgICAgPB+VA0CIAGnIgAgACgCAEEBajYCAAwCCyAAIAQQEyAAIAYQEwtCgICAgOAADwsgAQtqAQF/IAFC/////29YBEAgABAlQoCAgIDgAA8LAn4gAaciAy8BBkESRwRAQoCAgIAwIAAgASAAKAI4KQOQARBFDQEaIABBEhCWA0KAgICA4AAPCyACIAMoAiQvABBxQQBHrUKAgICAEIQLC7oEAQp/IwBBIGsiByQAAkACQAJAAkACQCABQv////9vWARAIAAQJQwBCyAAIAEgACgCOCkDkAEQRQ0CIAAgARD7AiICDQELQoCAgIDgACEBDAMLIAIoAgAiCCgCBCICQf////8HcSIDDQELIABBgLUBEMgBIQEMAQsgACAHQQhqIAMgAkEfdhCbAhogCEEQaiEGIAgoAgRB/////wdxIQlBACEAA0ACQAJAIAAgCUgEQCAAQQFqIQJBfyEFAkACfwJAAkACQAJAAkACQAJAAn8gCCgCBCIKQQBOIgtFBEAgBiAAQQF0ai8BAAwBCyAAIAZqLQAACyIDQdsAaw4DAwECAAsgAiEAAkAgA0EKaw4EBAsLBQALIANBL0cNByAERQ0FQQEhBEEvIQMMBwtB3AAhAyACIAlODQYgAEECaiEAIAtFBEAgBiACQQF0ai8BACEFDAoLIAIgBmotAAAhBQwJC0EAIQRB3QAhAwwFC0HbACEDIAQgAiAJTnINBiAAQQJqIQAgCkEATgRAQd0AQX8gAiAGai0AAEHdAEYiBBshBSAAIAIgBBshAEEBIQQMCAtBASEEQd0AQX8gBiACQQF0ai8BAEHdAEYiChshBSAAIAIgChshAAwHC0HuAAwCC0HyAAwBC0EAIQRBLwshBUHcACEDCyACIQAMAgsgB0EIahA8IQEMAwsgAiEAQQEhBAsgB0EIaiICIAMQhAEaIAVBAEgNACACIAUQhAEaDAALAAsgB0EgaiQAIAELlgEBBH8jAEEQayIEJAACfgJAIAFC/////29WBEAgBEEIaiEDA0AgAkEIRwRAIAAgACABIAJBAnQoAoDpASABQQAQGBAtIgVBAEgNAyAFBEAgAyACLQCg6QE6AAAgA0EBaiEDCyACQQFqIQIMAQsLIAAgBEEIaiIAIAMgAGsQ6QIMAgsgABAlC0KAgICA4AALIARBEGokAAulAwEEfiMAQRBrIgMkACAEAn8CQAJAAkACQCAAIAFBLxAsIgJFBEBCgICAgDAhAQwBCyACKAIYBEBCgICAgDAhAUEBDAULIAAgAikDACIIIAIpAwgiBhDTASIBQoCAgIBwgyIHQoCAgIDgAFINAQtCgICAgDAhBwwBCyAHQoCAgIAgUQRAIAJBATYCGEKAgICAMCEBQQEMAwsgAigCEARAIAAgACABQgAQUBBAIgdCgICAgHCDIglCgICAgOAAUQ0BAkAgCUKAgICAkH9SDQAgB6coAgRB/////wdxDQAgACADQQhqIAAgCEHZACAIQQAQGBCuAUEASA0CIAAgCEHZAAJ+IAanIAMpAwggAigCFBC1AiIGQoCAgIAIfEL/////D1gEQCAGQv////8PgwwBC0KAgICA4H4gBrm9IgZCgICAgKCBgPz/AH0gBkL///////////8Ag0KAgICAgICA+P8AVhsLEDtBAEgNAgsgACAHEBMMAgsgAkEBNgIYDAELIAAgARATIAAgBxATQoCAgIDgACEBC0EACzYCACADQRBqJAAgAQtGAQF/AkAgAUKAgICAcFQNAEG0tQUoAgAgAaciAi8BBkcNACACKAIgIgJFDQAgACACKAIAEBIgAEEQaiACIAAoAgQRAAALCxgAIAAoAhAiAEEQaiABIAIgACgCCBEBAAspAQF/IAJB/////wNNBH8gACgCECIAQRBqIAEgAiAAKAIIEQEABUEACwsWACAAIAMpAwAgAykDCCADKQMQEK4EC8MBAgN+An8jAEEQayIHJAACQCAAIAdBDGogAykDABDhASIIRQRAQoCAgIDgACEEDAELIAAgCCAHKAIMQdumARCMBiEBIAAgCBBRAkAgAkECSCABQoCAgIDgAFFyDQAgACADKQMIIgYQMEUNAEKAgICA4AAhBAJAIAAQZyIFQoCAgIDgAFEEQCABIQUMAQsgACAFQS8gAUEHEB5BAEgNACAAIAVBLyAGEPAEIQQLIAAgBRATDAELIAEhBAsgB0EQaiQAIAQLDQAgACABIAJBMhCNBgsLACAAIAFBMhCOBgu1AQEDfyMAQRBrIgQkAEF/IQMCQCAAIARBCGogAUHmABCCASICRQ0AIAQpAwgiAUKAgICAcINCgICAgDBRBEAgACACKQMAEP0CIQMMAQsgACABIAIpAwhBASACED0iAUKAgICAcINCgICAgOAAUQ0AIAAgARAtIgNFBEBBACEDDAELIAAgAikDABCcASICQQBIBEAgAiEDDAELIAJFDQAgAEHGPEEAEBZBfyEDCyAEQRBqJAAgAwuuAQEDfyMAQRBrIgQkAEF/IQMCQCAAIARBCGogAUHlABCCASICRQ0AIAQpAwgiAUKAgICAcINCgICAgDBRBEAgACACKQMAEJwBIQMMAQsgACABIAIpAwhBASACED0iAUKAgICAcINCgICAgOAAUQ0AIAAgARAtIQMgACACKQMAEJwBIgJBAEgEQCACIQMMAQsgAiADRg0AIABB+fgAQQAQFkF/IQMLIARBEGokACADC/ABAgR/AX4jAEEgayIDJAACQAJAIAAgA0EYaiABQeQAEIIBIgRFDQAgBCkDACEBIAMpAxgiB0KAgICAcINCgICAgDBRBEAgACABIAJBABCYAiEFDAILIAMgAjcDCCADIAE3AwAgACAHIAQpAwhBAiADED0iAUKAgICAcINCgICAgOAAUQ0AIAAgARAtRQRADAILIAAgBCkDABCcASIGQQBIDQBBASEFIAYNASAAIAQpAwAQ3AEiAUKAgICAcINCgICAgOAAUQ0AIAAgAiABEEUgACABEBMNASAAQebyAEEAEBYLQX8hBQsgA0EgaiQAIAULjwICA38CfiMAQRBrIgMkAAJAAkACQCAAIANBCGogAUHjABCCASICRQ0AIAMpAwgiAUKAgICAcINCgICAgDBRBEAgACACKQMAENwBIQEMAwsgACABIAIpAwhBASACED0iBUKAgICAcINCgICAgOAAUQ0BAkACQCAFQiCIp0EBag4EAAEBAAELIAAgAikDABCcASIEQQBIBEAgACAFEBMMAgsgBA0CQoCAgIDgACEBIAAgAikDABDcASIGQoCAgIBwg0KAgICA4ABRBEAgACAFEBMMBAsgACAGIAUQRSAAIAYQEw0CCyAAIAUQEyAAQebyAEEAEBYLQoCAgIDgACEBDAELIAUhAQsgA0EQaiQAIAELrgMCA38CfiMAQdAAayIGJABBfyEHAkAgACAGQcgAaiABQcYAEIIBIghFDQAgBikDSCIBQoCAgIBwg0KAgICAMFEEQCAIKQMAIQEgA0KAgICA8H5aBEAgA6ciByAHKAIAQQFqNgIACyAAIAEgAiADIAQgBRChASEHDAELIAAgAhBXIglCgICAgOAAUQRAIAAgARATDAELIAgpAwAhCiAGIAQ3AzggBiADNwMwIAYgCTcDKCAGIAo3AyAgACABIAgpAwhBBCAGQSBqED0hASAAIAkQEyABQoCAgIBwg0KAgICA4ABRDQACQAJAIAAgARAtIgcEQCAAIAYgCCgCACACEEoiAkEASA0BIAJFDQMCQCAGKAIAIgJBE3FFBEAgACAGKQMIIAMQRUUNAQwECyACQRFxQRBHDQMgBjUCHEIghkKAgICAMFINAwsgACAGEE4gAEGxMUEAEBYMAQsgBUGAgAFxRQRAQQAhByAFQYCAAnFFDQMgACgCECgClAEiAkUNAyACLQAkQQFxRQ0DCyAAQeYaQQAQFgtBfyEHDAELIAAgBhBOCyAGQdAAaiQAIAcL1gICAn8CfiMAQUBqIgQkAAJAAkAgACAEQThqIAFBxQAQggEiBUUNACAEKQM4IgFCgICAgHCDQoCAgIAwUQRAIAAgBSkDACACIANBABAYIQEMAgsgACACEFciBkKAgICA4ABRBEAgACABEBMMAQsgBSkDACEHIAQgAzcDMCAEIAY3AyggBCAHNwMgIAAgASAFKQMIQQMgBEEgahA9IQEgACAGEBMgAUKAgICAcIMiA0KAgICA4ABRDQAgACAEIAUoAgAgAhBKIgJBAEgEQCAAIAEQEwwBCyACRQ0BAkACQCAEKAIAIgJBE3FFBEAgACAEKQMIIAEQRUUNAQwCCyACQRFxQRBHIANCgICAgDBRcg0BIAQ1AhRCIIZCgICAgDBSDQELIAAgBBBOIAAgARATIABBtzJBABAWDAELIAAgBBBODAELQoCAgIDgACEBCyAEQUBrJAAgAQuPAgIDfwJ+IwBBQGoiAyQAQX8hBAJAIAAgA0E4aiABQecAEIIBIgVFDQAgAykDOCIBQoCAgIBwg0KAgICAMFEEQCAAIAUpAwAgAhBLIQQMAQsgACACEFciBkKAgICA4ABRBEAgACABEBMMAQsgBSkDACEHIAMgBjcDKCADIAc3AyAgACABIAUpAwhBAiADQSBqED0hASAAIAYQEyABQoCAgIBwg0KAgICA4ABRDQAgACABEC0iBA0AAkAgACADIAUoAgAiBCACEEoiAkEATgRAIAJFDQEgAygCACAAIAMQTkEBcQRAIAQtAAVBAXENAgsgAEGowgBBABAWC0F/IQQMAQtBACEECyADQUBrJAAgBAuPBgIHfwN+IwBBQGoiByQAQX8hCQJAIAAgB0E4aiABQekAEIIBIghFDQAgBykDOCIOQoCAgIBwg0KAgICAMFEEQCAAIAgpAwAgAiADIAQgBSAGEHghCQwBCyAAIAIQVyIPQoCAgIDgAFIEQCAAEGciAUKAgICA4ABSBEAgBkGAEHEiDQRAIARCgICAgPB+WgRAIASnIgogCigCAEEBajYCAAsgACABQcUAIARBBxAeGgsgBkGAIHEiCgRAIAVCgICAgPB+WgRAIAWnIgsgCygCAEEBajYCAAsgACABQcYAIAVBBxAeGgsgBkGAwABxIgsEQCADQoCAgIDwfloEQCADpyIMIAwoAgBBAWo2AgALIAAgAUHEACADQQcQHhoLIAZBgARxBEAgACABQcIAIAZBAXZBAXGtQoCAgIAQhEEHEB4aCyAGQYAIcQRAIAAgAUHDACAGQQJ2QQFxrUKAgICAEIRBBxAeGgsgBkGAAnEEQCAAIAFBwQAgBkEBca1CgICAgBCEQQcQHhoLIAgpAwAhECAHIAE3AzAgByAPNwMoIAcgEDcDICAAIA4gCCkDCEEDIAdBIGoQPSEOIAAgDxATIAAgARATIA5CgICAgHCDQoCAgIDgAFENAiAAIA4QLUUEQCAGQYCAAXFFBEBBACEJDAQLIABBuNQAQQAQFgwDCyAAIAcgCCgCACIMIAIQSiICQQBIDQIgBkGBAnEhCAJAAkACQCACRQRAIAhBgAJGDQEgDC8BBEGAAnFFDQEMAwsCQCAHKAIAIgIgBhCfA0UNAAJAIAJBAXENACACQTBxQRBGBEAgDQRAIAAgBCAHKQMQEEVFDQMLIApFDQEgACAFIAcpAxgQRQ0BDAILIAtFIAJBAnFyDQAgACADIAcpAwgQRUUNAQsgBygCACICQQFxIAhBgAJGcQ0AIAJBMHFBEEYgBkGCBHFBgARHciACQQNxQQJHcg0CCyAAIAcQTgsgAEGUHEEAEBYMBAsgACAHEE4LQQEhCQwCCyAAIA8QEwsgACAOEBMLIAdBQGskACAJC6cCAgN/An4jAEFAaiIDJABBfyEEAkAgACADQThqIAFB6AAQggEiBUUNACADKQM4IgFCgICAgHCDQoCAgIAwUQRAIAAgBSkDACACQQAQ2gEhBAwBCyAAIAIQVyIGQoCAgIDgAFEEQCAAIAEQEwwBCyAFKQMAIQcgAyAGNwMoIAMgBzcDICAAIAEgBSkDCEECIANBIGoQPSEBIAAgBhATIAFCgICAgHCDQoCAgIDgAFENACAAIAEQLSIERQRAQQAhBAwBCwJAIAAgAyAFKAIAIAIQSiICQQBOBEAgAkUNAgJAIAMtAABBAXEEQCAAIAUpAwAQnAEiAkEASA0BIAINAwsgAEHxG0EAEBYLIAAgAxBOC0F/IQQMAQsgACADEE4LIANBQGskACAEC/oFAgx/An4jAEFAaiIFJABBfyELAkAgACAFQThqIANB6wAQggEiB0UNACAFKQM4IgNCgICAgHCDQoCAgIAwUQRAIAAgASACIAcoAgBBAxB3IQsMAQsgACADIAcpAwhBASAHED0iA0KAgICAcINCgICAgOAAUQ0AIAVBADYCLCAFQQA2AjQgBUEANgIwIAAgBUE0aiADENsBIQYgBSgCNCEKAkAgBg0AAkAgCkUNACAAIApBA3QQPyIJDQBBACEJDAELAn8CQANAAkAgBCAKRgRAQQEgCiAKQQFNGyEIQQEhBANAIAQgCEYNAiAJIAQgCSAEQQN0aigCBBDzBCAEQQFqIQRBAEgNAAsgAEHIG0EAEBZBAAwECyAAIAMgBBCjASIQQoCAgIBwgyIRQoCAgIDgAFENAiARQoCAgICAf1EgEEIgiEL5////D31CAlRyRQRAIAAgEBATIABBhD1BABAWQQAMBAsgACAQEDEhCCAAIBAQEyAIRQ0CIAkgBEEDdGoiBkEANgIAIAYgCDYCBCAEQQFqIQQMAQsLQQAgACAHKQMAEJwBIgxBAEgNARogBy0AEQRAIAAQwgIMAQsgACAFQSxqIAVBMGogBygCAEEDEHcgBSgCMCEEIAUoAiwhCA0CQQAhBgNAIAQgBkcEQCAHLQARBEAgABDCAgwFCyAAIAVBCGoiDiAHKAIAIAggBkEDdGoiDSgCBBBKIg9BAEgNBAJAIA9FDQAgACAOEE4gDARAIAUoAghBAXENAQsgCSAKIA0oAgQQ8wQiDUEASARAIABBsjZBABAWDAYLIAwNACAJIA1BA3RqQQE2AgALIAZBAWohBgwBCwsCQCAMDQBBACEHA0AgByAKRg0BIAdBA3QgB0EBaiEHIAlqKAIADQALIABB1RlBABAWDAMLIAAgCCAEEFggACADEBMgASAJNgIAIAIgCjYCAEEAIQsMAwtBAAshBEEAIQgLIAAgCCAEEFggACAJIAoQWCAAIAMQEwsgBUFAayQAIAsLuAQCBX8CfiMAQeAAayIEJABBfyEFAkAgACAEQdgAaiACQeoAEIIBIgZFDQAgBigCACEHIAQpA1giAkKAgICAcINCgICAgDBRBEAgACABIAcgAxBKIQUMAQsgACADEFciCUKAgICA4ABRBEAgACACEBMMAQsgBikDACEKIAQgCTcDSCAEIAo3A0AgACACIAYpAwhBAiAEQUBrED0hAiAAIAkQEyACQoCAgIBwgyIJQoCAgIDgAFENAAJAAkACQAJAIAlCgICAgDBRIAJC/////29WckUEQCAAIAIQEwwBCyAAIAQgByADEEoiCEEASA0DAkAgCEUEQCAJQoCAgIAwUg0BDAQLIAAgBBBOIAlCgICAgDBSDQAgBC0AAEEBcUUNASAHLQAFQQFxDQMMAQsgACAGKQMAEJwBIgZBAEgNAyAAIARBIGogAhD0BCAAIAIQE0EASA0EIAQgBCgCICIDQRByIAMgA0GAMHEbIgNBN3EiBzYCIAJAIAgEQCAEKAIAIgVBgDpBgM4AIANBEHEbIAdyEJ8DRQ0BIANBAXENAyAFQQFxDQEgA0EScQ0DIAVBAnENAQwDCyAGRQ0AIANBAXENAgsgACAEQSBqEE4LIABBnMMAQQAQFkF/IQUMAwsCQCABBEAgASAEKQM4NwMYIAEgBCkDMDcDECABIAQpAyg3AwggASAEKQMgNwMADAELIAAgBEEgahBOC0EBIQUMAgtBACEFDAELIAAgAhATCyAEQeAAaiQAIAULSgACQCAFKQMAIgFCgICAgHBUDQAgAaciAi8BBkEyRw0AIAIoAiAiAkUNACACQQE6ABEgACABEBMgBUKAgICAIDcDAAtCgICAgDALuQEBA34jAEEQayICJABCgICAgOAAIQUCQAJAAn5CgICAgDAgAEKAgICAMCAAIAMQiwUiBEKAgICA4ABRDQAaIAIgBDcDCEKAgICA4AAgAEHPAEEAQQBBASACQQhqEG8iBkKAgICA4ABRDQAaIAAQZyIBQoCAgIDgAFINASAGCyEBIAAgBBATIAAgARATDAELIAAgAUGHASAEQQcQHhogACABQYgBIAZBBxAeGiABIQULIAJBEGokACAFC9ICAQZ+IwBBMGsiAiQAQoCAgIDgACEGAkAgACABQSQQLEUNACAAIAMpAwAgAkEQaiACQSBqIAJBGGoQ7QFBAEgNACAAIAIpAyAQE0KAgICAMCEEAkACQCAAIAIpAxgiCSADKQMAQQBBABAcIgVCgICAgHCDQoCAgIDgAFEEQEKAgICAMCEHDAELIAAgBUHuACAFQQAQGCIHQoCAgIBwg0KAgICA4ABRDQAgACABENwDIgRCgICAgHCDQoCAgIDgAFENAANAIAIgACAFIAcgAkEMahA5IgE3AyggAUKAgICAcINCgICAgOAAUQ0BIAIoAgwEQCAEIQYMAwsgACAEIAAgAkEoakEBEN4DIQggACABEBMgCEKAgICAcINCgICAgOAAUQ0BIAAgCBATDAALAAsgACAEEBMLIAAgBxATIAAgBRATIAAgCRATCyACQTBqJAAgBgu3AwIFfgN/IwBBIGsiAiQAQoCAgIDgACEGAkAgACABQSQQLCIKRQ0AIAAgAykDACACQQhqIAJBGGogAkEQahDtAUEASA0AIAAgAikDGBATQoCAgIAwIQQCQAJAIAAgAikDECIIIAMpAwBBAEEAEBwiBUKAgICAcINCgICAgOAAUQRAQoCAgIAwIQcMAQsgACAFQe4AIAVBABAYIgdCgICAgHCDQoCAgIDgAFENACAAIAEQ3AMiBEKAgICAcINCgICAgOAAUQ0AQQAhAwJAIARCgICAgHBUDQAgBKciCS8BBkEkRw0AIAkoAiAhAwsDQCAAIAUgByACQQRqEDkiAUKAgICAcINCgICAgOAAUQ0BIAIoAgQEQCAEIQYMAwsgACAKIAFCACABQiCIp0EIa0FvTxsgASABQv///////////wCDQoCAgIDg/v8DURsiARCZASEJIAAgAyABEJkBIQsCQCAJBEAgACADIAEQuQIaDAELIAsNACAAIAMgARD+AiAAIAEQEw0BDAILIAAgARATDAALAAsgACAEEBMLIAAgBxATIAAgBRATIAAgCBATCyACQSBqJAAgBguqBAIEfgN/IwBBMGsiAiQAAkAgACABQSQQLCIIRQRAQoCAgIDgACEBDAELQoCAgIAwIQUCQAJAIAAgAykDACACQRBqIAJBGGogAkEgahDtAUEASARAQoCAgIAwIQRCgICAgDAhAQwBCyAAIAEQ3AMiAUKAgICAcINCgICAgOAAUQRAQoCAgIAwIQQMAQsCQCABQoCAgIBwVA0AIAGnIgovAQZBJEcNACAKKAIgIQkLIAIpAxAgCDUCDFkEQCAAIAEgACAAQQEQuAIiBEKAgICA4ABRBEBCgICAgOAAIQQMAgsgAikDGCEGA0AgAiAAIAQgACAAIAJBDGpBARC6AiIHNwMoIAdCgICAgHCDQoCAgIDgAFENAiACKAIMBEAMBAsgACAAIAYgAykDAEEBIAJBKGoQHBAtIghBAEgEQCAAIAIpAygQEwwDCyAIBEAgACAJIAIpAygQuQIaCyAAIAIpAygQEwwACwALIAAgAikDICADKQMAQQBBABAcIgRCgICAgHCDQoCAgIDgAFENACAAIARB7gAgBEEAEBgiBUKAgICAcINCgICAgOAAUQ0AA0AgAiAAIAQgBSACQQxqEDkiBjcDKCAGQoCAgIBwg0KAgICA4ABRDQEgAigCDA0CIAAgCSAGELkCGiAAIAYQEwwACwALIAAgARATQoCAgIDgACEBCyAAIAIpAxgQEyAAIAIpAyAQEyAAIAQQEyAAIAUQEwsgAkEwaiQAIAELvAYCBH4CfyMAQTBrIgIkAAJAIAAgAUEkECwiCUUEQEKAgICA4AAhBQwBC0KAgICAMCEFAkACQCAAIAMpAwAgAkEQaiACQRhqIAJBIGoQ7QFBAEgEQEKAgICAMCEGQoCAgIAwIQQMAQsgAikDECAJNQIMUwRAIAAgAikDICADKQMAQQBBABAcIgRCgICAgHCDQoCAgIDgAFEEQEKAgICAMCEGDAILIAAgBEHuACAEQQAQGCIGQoCAgIBwg0KAgICA4ABRDQFBACEDIABCgICAgDBBAEEAQQEQvAIiBUKAgICAcINCgICAgOAAUQ0BAkAgBUKAgICAcFQNACAFpyIILwEGQSRHDQAgCCgCICEDCwNAIAIgACAEIAYgAkEMahA5IgE3AyggAUKAgICAcINCgICAgOAAUQ0CIAIoAgwNAyACIAFCACABQiCIp0EIa0FvTxsgASABQv///////////wCDQoCAgIDg/v8DURsiATcDKAJAIAAgCSABEJkBRQ0AIAAgAyABEJkBDQAgACADIAEQ/gIgACABEBMNAQwDCyAAIAEQEwwACwALQoCAgIDgACEEQoCAgIAwIQYgACABIAIgAkEBELgCIgFCgICAgOAAUQ0AQQAhCQJAIABCgICAgDBBAEEAQQEQvAIiBUKAgICAcINCgICAgOAAUQ0AAkAgBUKAgICAcFQNACAFpyIILwEGQSRHDQAgCCgCICEJCyACKQMYIQcDQCACIAAgASACIAIgAkEMakEBELoCIgQ3AyggBEKAgICAcINCgICAgOAAUQ0BIAIoAgwEQCABIQQMBAsgACAAIAcgAykDAEEBIAJBKGoQHBAtIQggAikDKCEEAkAgCEEASgRAIAIgBEIAIARCIIinQQhrQW9PGyAEIARC////////////AINCgICAgOD+/wNRGyIENwMoIAAgCSAEEJkBIAIpAyghBARAIAAgBBATDAMLIAAgCSAEEP4CIAAgAikDKBATDQIMAQsgACAEEBMg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AxAiBUKAgICA8H5aBEAgBaciCSAJKAIAQQFqNgIACyAIIAU3AwgCQCAEDQAgAykDGCIFQoCAgIDwflQNACAFpyIJIAkoAgBBAWo2AgALIAggATcDECAIIAU3AwAgACAHIAZBAyAIEBwhBSAAIAgpAwAQEyAERQRAIAAgCCkDCBATCyADKAIEIQMgACgCECACEPUDIAVCgICAgHCDQoCAgIDgAFENAiAAIAUQEwsMAAsACyAIQSBqJAAgBQtUACAAIAEgAkEjahAsIgBFBEBCgICAgOAADwsgACgCDCIAQQBOBEAgAK0PC0KAgICA4H4gALi9IgFCgICAgKCBgPz/AH0gAUKAgICAgICA+P8AVhsLcgEBfyAAIAEgBEEjahAsIgJFBEBCgICAgOAADwsgAigCGEECdCIDBEAgAigCEEEAIAP8CwALIAJBBGohAyACKAIIIQQDfiADIARGBH5CgICAgDAFIARBCGshBSAEKAIEIQQgACgCECACIAUQ+AMMAQsLC4UDAgF+An8jAEEQayICJAACfkKAgICA4AAgACABIARBAXUQLCIGRQ0AGgJAIARBAXEiBEUNACAAIAMpAwgQMA0AIABBydUAQQAQFkKAgICA4AAMAQsgAiADKQMAIgFCACABQiCIp0EIa0FvTxsgASABQv///////////wCDQoCAgIDg/v8DURsiBTcDCAJAIAYoAgBFDQAgBRCLAg0AIABBnB5BABAWQoCAgIDgAAwBCwJAIAAgBiAFEJkBIgcEQCAHKQMgIQEMAQsgAykDCCEBAkAgBARAQoCAgIDgACAAIAFCgICAgDBBASACQQhqEBwiAUKAgICAcINCgICAgOAAUQ0DGiAAIAYgAikDCBC5AhogAikDCCEFDAELIAFCgICAgPB+VA0AIAGnIgMgAygCAEEBajYCAAsgACAGIAUQ3QMiA0UEQCAAIAEQE0KAgICA4AAMAgsgAyABNwMgCyABQoCAgIDwfloEQCABpyIAIAAoAgBBAWo2AgALIAELIAJBEGokAAsnACAAIAEgBEEjahAsIgJFBEBCgICAgOAADwsgACACIAMpAwAQuQILXgAgACABIARBI2oQLCICRQRAQoCAgIDgAA8LIAAgAiADKQMAIgFCACABQiCIp0EIa0FvTxsgASABQv///////////wCDQoCAgIDg/v8DURsQ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ahAcIQEgACAEEBMgAUKAgICAcINCgICAgOAAUQ0CCyAAIAggByABEJoBIAdCAXwhB0EATg0ACwsgBSEEDAMLIAUMAQtCgICAgDALIQRCgICAgDAhCAsgACAIEBNCgICAgOAAIQgLIAAgBBATIAAgCRATIAxBIGokACAICzkBAX5CgICAgOB+IAEpAwAiAkKAgICAoIGA/P8AfSACQv///////////wCDQoCAgICAgID4/wBWGws7AQF+QoCAgIDgfiABKgIAu70iAkKAgICAoIGA/P8AfSACQv///////////wCDQoCAgICAgID4/wBWGws9AQF+QoCAgIDgfiABLwEAEPUBvSICQoCAgICggYD8/wB9IAJC////////////AINCgICAgICAgPj/AFYbCwwAIAAgASkDABCJBAsMACAAIAEpAwAQnAMLPQEBfiABKAIAIgBBAE4EQCAArQ8LQoCAgIDgfiAAuL0iAkKAgICAoIGA/P8AfSACQoCAgICAgID4/wBWGwsHACABNQIACwcAIAEzAQALDgAgATIBAEL/////D4MLDgAgATAAAEL/////D4MLBwAgATEAAAsPACAAKwMAIAErAwAQ4QMLEQAgACoCALsgASoCALsQ4QMLFQAgAC8BABD1ASABLwEAEPUBEOEDCxkBAn4gACkDACIDIAEpAwAiBFYgAyAEVGsLGQECfiAAKQMAIgMgASkDACIEVSADIARTawsXACAAKAIAIgAgASgCACIBSiAAIAFIawsNACAALwEAIAEvAQBrCw0AIAAuAQAgAS4BAGsLDQAgACwAACABLAAAawsNACAALQAAIAEtAABrC9gMBAh/AXwBfgF9IwBBIGsiBiQAQoCAgIDgACEOAkAgACABEFsiCEUNACAIEF0EQCAAEJMBDAELQX8hBQJAAkACQCAIKAIoIgdFDQBBASEJAkAgBEEBRgRAQX8hCSAGIAdBAWsiBTYCHEF/IQogAkECSA0BIAAgBiADKQMIQn8gBawgB6wQZQ0FIAYgBigCACICNgIcQX8hBSACQQBODQEMBAsgBkEANgIcIAJBAkgEQCAHIQoMAQsgByEKIAAgBkEcaiADKQMIIAcgBxBaDQQLAkAgBEF/RyAIKAIoIgIgB09yDQAgAzUCBEIghkKAgICAMFINAEEAIQUgBigCHCAHSA0CCwJAIAcgAiACIAdKGyILRQ0AIAZCADcDECAGKAIcIQwCfwJAAkACfwJAAkBBCCADKQMAIgFCIIinIgIgAkEIa0FvSRsiAkEHaw4CAwEACyACQXdGDQIgAg0FIAYgAcQiATcDECABuSENQQAMAQsgAUKAgICAoIGA/P8AfL8iDUQAAAAAAADgw2ZFIA1EAAAAAAAA4ENjRXINAiAGIA38BjcDECANIA2dYgshA0EBDAILIAGnIQUgAkEHRgRAIAYgBTYCCCAGQoCAgIAQNwIAIAYhBQsCQAJAAkAgCC8BBkEcaw4CAQAFCyAFQQRqIAUoAgQiAkECdGooAgBBAEgNBCACQQNJDQEgAkEDRw0EIAUoAhANBAwBCyAFKAIEQQJLDQMLIAAgBkEQaiABEOMDDQZBASEDQQAMAQtBASEDQQELIQcgDCALIARBAUZrIgAgACAMShshACAKIAsgCiALSBshAkF/IQUCQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAIAgvAQZBFWsODAEAAQMEBgcMDAkKCw8LIAMNDSAGKQMQIg5CgAF8QoACWg0NDAELIAMgBikDECIOQv8BVnINDAsgDqchByAIKAIkIQMgBEEBRgRAIAdB//8DcSEFA0AgACACRg0NIAUgACADai0AAEYNDCAAIAlqIQAMAAsACyADRQ0LIAAgA2ogB0H//wNxIAsgAGsQ7gEiAEUNDCAAIANrIQUMDAsgAw0KIAYpAxAiDkKAgAJ8QoCABFoNCgwBCyADIAYpAxAiDkL//wNWcg0JCyAIKAIkIQMgDqdB//8DcSEFA0AgACACRg0JIAMgAEEBdGovAQAgBUYNCCAAIAlqIQAMAAsACyADDQcgBikDECIOQoCAgIAIfEKAgICAEFoNBwwBCyADIAYpAxAiDkL/////D1ZyDQYLIA6nIQMgCCgCJCEFA0AgACACRg0GIAUgAEECdGooAgAgA0YNBSAAIAlqIQAMAAsACyAHRQ0EIA29Qv///////////wCDQoGAgICAgID4/wBaBEAgBEF/Rw0IIAgoAiQhAwNAIAAgAkYNBiADIABBAXRqLwEAQf//AXFBgPgBSw0FIAAgCWohAAwACwALIA1EAAAAAAAAAABhBEAgCCgCJCEDA0AgACACRg0GIAMgAEEBdGovAQBB//8BcUUNBSAAIAlqIQAMAAsACyANEMoCIgMQ9QEgDWINBCAIKAIkIQUDQCAAIAJGDQUgBSAAQQF0ai8BACADRg0EIAAgCWohAAwACwALIAdFDQMgDb1C////////////AINCgYCAgICAgPj/AFoEQCAEQX9HDQcgCCgCJCEDA0AgACACRg0FIAMgAEECdGooAgBB/////wdxQYCAgPwHSw0EIAAgCWohAAwACwALIA0gDbYiD7tiDQMgCCgCJCEDA0AgACACRg0EIAMgAEECdGoqAgAgD1sNAyAAIAlqIQAMAAsACyAHRQ0CIAgoAiQhAyANvUL///////////8Ag0KBgICAgICA+P8AVARAA0AgACACRg0EIAMgAEEDdGorAwAgDWENAyAAIAlqIQAMAAsACyAEQX9HDQUDQCAAIAJGDQMgAyAAQQN0aikDAEL///////////8Ag0KAgICAgICA+P8AVg0CIAAgCWohAAwACwALIAcNASAIKAIkIQMgBikDECEBA0AgACACRg0CIAMgAEEDdGopAwAgAVENASAAIAlqIQAMAAsACyAAIQUMAQtBfyEFCyAEQX9HDQELIAVBAE6tQoCAgIAQhCEODAELIAWtIQ4LIAZBIGokACAOC5cEAgZ/A34jAEEgayIFJABCgICAgOAAIQsCQCAAIAEQWyIKRQ0AIAoQXQRAIAAQkwEMAQsgCigCKCEIQSwhBgJAIAJBAEwgBHJFBEBCgICAgDAhDCAIIgIhCSADKQMAIg1CgICAgHCDQoCAgIAwUQ0BIAAgDRAoIgxCgICAgHCDQoCAgIDgAFENAkF/IQYgDKciBygCBEEBRgRAIActABAhBgsgCCAKKAIoIgkgCCAJSBshAgwBC0KAgICAMCEMIAgiAiEJCyAAIAVBCGpBABBDGiACQQAgAkEAShshA0EAIQICQANAIAIgA0cEQAJAIAJFDQAgBkEATgRAIAVBCGogBhA1RQ0BDAQLIAVBCGogB0EAIAcoAgRB/////wdxEEwNAwsgACABIAIQowEiC0KAgICAcIMiDUKAgICAIFEgDUKAgICAMFFyRQRAIA1CgICAgOAAUQ0DIAVBCGogBAR+IAAgCxCbBQUgCwsQrQENAwsgAkEBaiECDAELC0EBIAkgCUEBTBshAiAGQQBIIQMDQCACIAhIBEACQCADRQRAIAVBCGogBhA1DQQMAQsgBUEIaiAHQQAg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IgAgACgCAEEBajYCAAsgASEHDAELIAAQkwELIAVBEGokACAHC0oCAX4Bf0KAgICAMCECAkAgAUKAgICAcFQNACABpy8BBiIDQRVrQf//A3FBC0sNACAAIAAoAhAoAkQgA0EYbGooAgQQMyECCyACCywBAX5CgICAgOAAIQUgACABEOIDBH5CgICAgOAABSAAIAEgACAAIAQQ5AULC8UDAgV+BX8jAEEQayIJJABCgICAgDAhBUKAgICAMCEEIAJBAk4EQCADKQMIIQQLIAMpAwAhB0KAgICA4AAhCAJAIAAgARBbIgJFDQAgACAJIAQQ8AENAAJAAkACQAJAAkAgCSkDACIEQgBTDQAgAhBdDQQgAjUCKCEGIAAgBxAmIgVCgICAgHCDQoCAgIDgAFENAyAFpyIDLwEGQRVrQf//A3FBC00EQCACLwEGQafIAWoxAAAhByADKAIgIgooAgwoAiAhCyACKAIgIgwoAgwoAiAhDSADEF0NBSAEIAYgAzUCKCIGfVUNASADLwEGIAIvAQZHDQIgBiAHhqciAkUNAyAEIAeGpyANKAIMIAwoAhBqaiALKAIMIAooAhBqIAL8CgAADAMLIAAgCUEIaiAFEDgNAyAEIAYgCSkDCCIGfVcNAQsgAEGf5ABBABAyDAQLIASnIQJBACEDA0AgBiADrVcNASAAIAUgAxCjASIEQoCAgIBwg0KAgICA4ABRDQQgAiADaiEKIANBAWohAyAAIAEgCiAEEJECQQBODQALDAMLQoCAgIAwIQgMAgsMAQsgABCTAQsgACAFEBMgCUEQaiQAIAgLXAAgACABEFsiAEUEQEKAgICA4AAPCyAAEF0EQEIADwsgACgCICgCECIAQQBOBEAgAK0PC0KAgICA4H4gALi9IgFCgICAgKCBgPz/AH0gAUKAgICAgICA+P8AVhsLzgEBAX8gACABEFsiAEUEQEKAgICA4AAPCyAAEF0EQEIADwsgACgCICICKAIYRQRAIAIoAhQiAEEATgRAIACtDwtCgICAgOB+IAC4vSIBQoCAgICggYD8/wB9IAFCgICAgICAgPj/AFYbDwsgADUCKCAALwEGQafIAWoxAACGIgFCgICAgAh8Qv////8PWARAIAFC/////w+DDwtCgICAgOB+IAG5vSIBQoCAgICggYD8/wB9IAFC////////////AINC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KAAAIgAgAEEYeEH/gfwHcSAAQf+B/AdxQQh4ciAHG767vSIBQoCAgICggYD8/wB9IAFC////////////AINCgICAgICAgPj/AFYbIQUMAwtCgICAgOB+IAIpAAAiASABQjiGIAFCgP4Dg0IohoQgAUKAgPwHg0IYhiABQoCAgPgPg0IIhoSEIAFCCIhCgICA+A+DIAFCGIhCgID8B4OEIAFCKIhCgP4DgyABQjiIhISEIAcbIgFCgICAgKCBgPz/AH0gAUL///////////8Ag0KAgICAgICA+P8AVhshBQwCCxAuAAsgAjAAAEL/////D4MhBQsgCEEQaiQAIAULdAIBfwF+QoCAgIDgACEDIAAgARDkAyICBH4gAhD/BARAIAAQkwFCgICAgOAADwsgAigCICgCECIAQQBOBEAgAK0PC0KAgICA4H4gALi9IgFCgICAgKCBgPz/AH0gAUKAgICAgICA+P8AVhsFQoCAgIDgAAsLxAECAX8BfkKAgICA4AAhAyAAIAEQ5AMiAgR+IAIQ/wQEQCAAEJMBQoCAgIDgAA8LIAIoAiAiACgCGARAIAAoAgwoAiAoAgAgACgCEGsiAEEATgRAIACtDwtCgICAgOB+IAC4vSIBQoCAgICggYD8/wB9IAFCgICAgICAgPj/AFYbDwsgACgCFCIAQQBOBEAgAK0PC0KAgICA4H4gALi9IgFCgICAgKCBgPz/AH0gAUKAgICAgICA+P8AVhsFQoCAgIDgAAsLNgAgACABEOQDIgBFBEBCgICAgOAADwsgACgCICgCDCIAIAAoAgBBAWo2AgAgAK1CgICAgHCEC88BAQN/AkAgAUKAgICAcFQNACABpyIDLwEGQTtHDQAgAygCICIERQ0AIARBEGohAyAEQQxqIQUDQCAFIAMoAgAiA0cEQCADKQMQIgFCgICAgFBaBEAgACABpyACEQAACyADKQMYIgFCgICAgFBaBEAgACABpyACEQAACyADKQMgIgFCgICAgFBaBEAgACABpyACEQAACyADKQMoIgFCgICAgFBaBEAgACABpyACEQAACyADQQRqIQMMAQsLIAQoAggiA0UNACAAIAMgAhEAAAsLMAEBfwJAIAFCgICAgHBUDQAgAaciAi8BBkE7Rw0AIAIoAiAiAkUNACAAIAIQiAULCw0AIAAgASACQTkQjQYLCwAgACABQTkQjgYLFgEBfyABpygCICICBEAgACACEPwBCwsxAQF/IAGnKAIgIgIEQCAAIAIoAggQrQUgACACKQMAECIgAEEQaiACIAAoAgQRAAALC80BAQV/AkAgAUKAgICAcFQNACABpyIDLwEGQTNHDQAgAygCICIFRQ0AIAVBBGohBgNAIARBAkZFBEAgBiAEQQN0aiIHIQMDQCAHIAMoAgQiA0cEQCADKQMIIgFCgICAgFBaBEAgACABpyACEQAACyADKQMQIgFCgICAgFBaBEAgACABpyACEQAACyADKQMYIgFCgICAgFBUDQEgACABpyACEQAADAELCyAEQQFqIQQMAQsLIAUpAxgiAUKAgICAUFQNACAAIAGnIAIRAAALC4gBAQZ/AkAgAUKAgICAcFQNACABpyICLwEGQTNHDQAgAigCICIERQ0AIARBBGohBQNAIANBAkZFBEAgBSADQQN0aiIGKAIEIQIDQCACIAZGRQRAIAIoAgQgACACEMMCIQIMAQsLIANBAWohAwwBCwsgACAEKQMYECIgAEEQaiAEIAAoAgQRAAALC+0BAQJ+IwBBEGsiAiQAAkACQCABQv////9vWARAIAAQJQwBCyAAIAIgARD2ASIBQoCAgIBwg0KAgICA4ABRDQECQCAAEGciBEKAgICA4ABRBEAgAikDACEFDAELIAAgBEGGASABQQcQHiACKQMAIQVBAEgNACAAIARBhAEgBUEHEB5BAEgEQEKAgICAMCEBDAELIAAgBEGFASACKQMIQQcQHkEATgRAIAQhAQwDC0KAgICAMCEBQoCAgIAwIQULIAAgBRATIAAgAikDCBATIAAgARATIAAgBBATC0KAgICA4AAhAQsgAkEQaiQAIAEL5AMBBX4jAEEwayICJAACQCABQv////9vWARAIAAQJUKAgICA4AAhBQwBCyAAIAJBIGogARD2ASIFQoCAgIBwg0KAgICA4ABRDQBCgICAgDAhBkKAgICAMCEEAkACQCAAIAFBhAEgAUEAEBgiCEKAgICAcINCgICAgOAAUQ0AIAAgCBBPDQAgACADKQMAQQAQxQEiBEKAgICAcINCgICAgOAAUQRADAELIAAgBEHuACAEQQAQGCIGQoCAgIBwg0KAgICA4ABRDQADQCACIAAgBCAGIAJBFGoQOSIHNwMYIAdCgICAgHCDQoCA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AkACQAJAAkAgAkEAIAFCgICAgHCDIglCgICAgDBSGyICDgIAAQILENUGuQwECwJAIAMpAwAiB0KAgICAcFQNACAHpyIFLwEGQQpHDQAgBSkDICIIQiCIIgpQRSAKp0EJakERSXENACAAIAQgCBBIDQIMAwsgBCAAIAdBAhDZAiIHNwM4IAdCIIhC+////w99Qn5aBEAgACABIAUgBEE4ahDUBiEIIAAgBxATIAhCgICAgHCDQoCAgIDgAFENAiAAIAQgCBBoRQ0DDAILIAAgBCAHEGhFDQIMAQsgBEEAQTj8CwAgBEKAgICAgICA+D83AxBBByACQQAgAkEAShsiAiACQQdOGyEGA0AgBSAGRwRAIAVBA3QhAiAFQQFqIQUgACACIARqIAIgA2opAwAQSEUNAQwCCwsgBEEBENMGDAILQoCAgIDgACEBDAILIAQrAwAiC51EAAAAAAAAAACgRAAAAAAAAPh/IAuZRAAA3MIIsj5DZRsLIQsCQCAAIAFBChBWIgdCgICAgHCDQoCAgIDgAFENACAAIAcCfgJAIAtEAADA////30FlIAtEAAAAAAAA4MFmcUUEQCALvSEBDAELIAu9IgEgC/wCIgW3vVINACAFrQwBC0KAgICA4H4gAUKAgICAoIGA/P8AfSALvUL///////////8Ag0KAgICAgICA+P8AVhsLELIBGiAJQoCAgIAwUg0AIAAgByAFIAVBExDSBiEBIAAgBxATDAELIAchAQsgBEFAayQAIAEL6wMBAn4jAEEQayICJAACQAJAIAFCgICAgHCDQoCAgIAwUgRAIAAgARCWAgwBCyADKQMAIgFCgICAgPB+WgRAIAGnIgMgAygCAEEBajYCAAsDQAJAAkACQAJAAkBBCCABQiCIpyIDIANBCGtBb0kbQQlqDhIHBAICBAQEBAMAAAQEBAQEBwEECyAAIAHEEJwDIQEMBgsgAUKAgICAoIGA/P8AfCIEQjSIp0H/D3EiA0H/D0cEQAJAAn8gBEL/////////B4MiAUIAUiADckUEQCAAQQAQ1wEMAQsgA0H/B0kNASABQoCAgICAgIAIhCEBAn8gA0GyCE0EQCABQn9BswggA2utIgWGQn+Fg0IAUg0DIAEgBYghAUEADAELIANBswhrCyEDIAJBADYCACACAn9CACABfSABIARCAFMbIgFCgICAgAh8Qv////8PWARAIAIgAT4CCEEBDAELIAIgATcCCEECCzYCBCAAIAIgAxDMBQsiA0UNBiAAIAMQwgEhAQwHCyAAQZXMAEEAEDIMBQsgAEGAL0EAEDIMBAsgACABELwFIQEMBAsgACABQQEQtQEiAUKAgICAcINCgICAgOAAUg0BDAMLCyAAIAEQEyAAQakvQQAQFgtCgICAgOAAIQELIAJBEGokACABC3cBAX8gAUKAgICAcINCgICAgDBSBEAgACABEJYCQoCAgIDgAA8LAn4CQCACRQ0AIAMpAwAiAUKAgICAcINCgICAgDBRDQBCgICAgOAAIAAgARAoIgFCgICAgHCDQoCAgIDgAFENARogAachBAsgACAEQQMQkQQLC1kBAX4gACADKQMAEJICQQBHrUKAgICAEIQhBCABQoCAgIBwg0KAgICAMFEEQCAEDwsgACABQQYQViIBQoCAgIBwg0KAgICA4ABSBEAgACABIAQQsgEaCyABC+sDAwN+AXwBfyMAQRBrIggkAAJAAkACQCACRQRADAELIAMpAwAiBEKAgICA8H5aBEAgBKciAiACKAIAQQFqNgIACyAAIAQQbiIEQoCAgIBwg0KAgICA4ABRDQEgBEIgiCIFQvf///8PUgRAIAWnQQdHDQEgBEL/////D4MhBAwBCwJ8IASnIgIoAgQiA0EBRgRAIAIoAgi3DAELIAJBBGogA0ECdGooAgBBH3YhAyAIQQxqIAIQwQUhBQJ+IAgoAgwiAkH/B0oEQEIAIQVCgICAgICAgPj/AAwBCyAFQguIQgGDIAVCAYMgBUIBiIR8Qv8DfCIGQgAgBkIAVRtCCohC/////////weDIQUgAiAGQj+Ip2pB/wdqrUI0hgsgBSADrUI/hoSEvwshByAAIAQQEwJAIAdEAADA////30FlIAdEAAAAAAAA4MFmcUUEQCAHvSEEDAELIAe9IgQgB/wCIgK3vVINACACrSEEDAELQoCAgIDgfiAEQoCAgICggYD8/wB9IAe9Qv///////////wCDQoCAgICAgID4/wBWGyEECyABQoCAgIBwg0KAgICAMFENACAAIAFBBBBWIgFCgICAgHCDQoCAgIDgAFENASAAIAEgBBCyARoMAQsgBCEBCyAIQRBqJAAgAQt8AQF+IAJBAEoEQCADKQMAIgZC/////29YBEAgABAlQoCAgIDgAA8LIAanIgIgAigCAEEBajYCAEKAgICA4ABCgICAgDAgACABQcAAIAZBAxAeQQBIGw8LIAUpAwAiAUKAgICA8H5aBEAgAaciACAAKAIAQQFqNgIACyABC5ACAQl/An4gACgCECgCgAEjACIHIgwgAacoAiAiCigCECIIIANqIgtBA3QiCWtLBEAgABB0QoCAgIDgAAwBCyAIQQAgCEEAShshDSAKQRhqIQ4gByAJQQ9qQXBxayIHJAADfiAGIA1GBH5BACEGIANBACADQQBKGyEDIAcgCEEDdGohCANAIAMgBkZFBEAgCCAGQQN0IglqIAQgCWopAwA3AwAgBkEBaiEGDAELCyAFQQFxBEAgACABIAIQRSEDIAAgCikDACIBIAEgAiADGyALIAcQ0gIMAwsgACAKKQMAIAopAwggCyAHEBwFIAcgBkEDdCIJaiAJIA5qKQMANwMAIAZBAWohBgwBCwsLIAwkAAtUACABQv////9vWARAIABBgrYBQQAQFkKAgICA4AAPCwJAIAGnIgIvAQZBDEcNACACKAIkQRNHDQAgAEGR+gBBABAWQoCAgIDgAA8LIAAgAUEnEFYLjgQCBX8CfiMAQSBrIgYkACAAIAZBCGoiBUEAEEMaIAVBKBA1GiAEQX5xQQJGBEAgBUGrvAEQfBoLIAZBCGoiBUGE1gAQfBogBEF9cUEBRgRAIAVBKhA1GgsgBkEIakHRtQEQfBpBACEFIAJBAWsiB0EAIAdBAEobIQgCQAJAAkADQCAFIAhHBEAgBQRAIAZBCGpBLBA1GgsgBUEDdCEJIAVBAWohBSAGQQhqIAMgCWopAwAQjAFFDQEMAgsLIAZBCGoiBUHAvAEQfBogAkEASgRAIAUgAyAHQQN0aikDABCMAQ0BCyAGQQhqIgJB4K8BEHwaQoCAgIAwIQsgAhA8IgpCgICAgOAAUQ0BIAAgACkD0AEgCkEDQX8QqAMhCyAAIAoQEyALQoCAgIBwg0KAgICA4ABRDQEgAUKAgICAcINCgICAgDBRDQIgACABQT8gAUEAEBgiCkKAgICAcINCgICAgOAAUQ0BAkAgCkL/////b1YNACAAIAoQEyAAIAEQjgMiAkUNAiACKAI4IARBAXQvAdDkAUEDdGopAwAiCkKAgICA8H5UDQAgCqciAiACKAIAQQFqNgIACyAAIAsgCkEBEJgCIAAgChATQQBODQIMAQsgBigCCCgCECICQRBqIAYoAgwgAigCBBEAAEKAgICAMCELCyAAIAsQE0KAgICA4AAhCwsgBkEgaiQAIAsLVQACQCABQoCAgIBwg0KAgICAMFENACAAKAIQKAKUASgCCCABp0YNACAAIAFBARBWDwsgAykDACIBQoCAgIBgg0KAgICAIFEEQCAAEGcPCyAAIAEQJgtDAAJ+AkAgARCyAyIDRQ0AIAMtABBBAXEgAkEASnINAEKAgICAMCADLwARQQFxDQEaCyAAQdg4QQAQFkKAgICA4AALCzUBAX5CgICAgBAhASADKQMAIgRCgICAgHBaBH4gBKcvAQZBA0atQoCAgIAQhAVCgICAgBALC58CAQN+IAFC/////29YBEAgABAlQoCAgIDgAA8LQoCAgIDgACEFAn4gACABQTogAUEAEBgiBEKAgICAcINCgICAgDBRBEAgAEGiARAzDAELIAAgBBBACyIEQoCAgIBwgyIGQoCAgIDgAFIEfgJ+IAAgAUE2IAFBABAYIgFCgICAgHCDQoCAgIAwUQRAIABBLxAzDAELIAAgARBACyIBQoCAgIBwgyIFQoCAgIDgAFEEQCAAIAQQE0KAgICA4AAPCwJAIAZCgICAgJB/UQRAIASnKAIEQf////8HcUUNAQsgBUKAgICAkH9RBEAgAacoAgRB/////wdxRQ0BCyAAQd/AASAEQbK8ARDGASEECyAAIAQgARCXAgVCgICAgOAACwshACABQoCAgIDwfloEQCABpyIAIAAoAgBBAWo2AgALIAELogICBH4CfyMAQRBrIggkAEKAgICA4AAhBQJAAn4CQCABQoCAgIBwVA0AIAGnLQAFQRBxRQ0AIAggAq03AwggACABQQEgCEEIahCvAQwBCyAAEEILIgRCgICAgHCDQoCAgIDgAFENACACQQAgAkEAShutIQdCACEBAkADQCABIAdSBEAgAyABp0EDdGopAwAiBkKAgICA8H5aBEAgBqciCSAJKAIAQQFqNgIACyAAIAQgASAGQYCAARDvASABQgF8IQFBAE4NAQwCCwsgACAEQTIgAkEATgR+IAKtBUKAgICA4H4gAri9IgFCgICAgKCBgPz/AH0gAUKAgICAgICA+P8AVhsLEDtBAEgNACAEIQUMAQsgACAEEBMLIAhBEGokACAFC/AIAgl+An8jAEEgayINJAAgAykDACEEQQEhDgJAAkACfiACQQJIBEBCgICAgDAhCkKAgICAMAwBC0KAgICAMCADKQMIIgpCgICAgHCDQoCAgIAwUQ0AGkKAgICAMCELQoCAgIAwIQZCgICAgDAhB0KAgICAMCEJQoCAgIAwIQUgACAKEE8NAUEAIQ5CgICAgDAgAkECRg0AGiADKQMQCyEMAkACQAJAAkACQAJAIAAgBEHiASAEQQAQGCILQoCAgIBwgyIGQoCAgIAgUSAGQoCAgIAwUXJFBEAgBkKAgICA4ABRDQQgACALEDBFBEAgAEHP+gBBABAWDAULQoCAgIAwIQcCfgJAIAFCgICAgHBUDQAgAactAAVBEHFFDQAgACABQQBBABCvAQwBCyAAEEILIgZCgICAgHCDQoCAgIDgAFENBSAAIAQgCxD0ASIFQoCAgIBwg0KAgICA4ABRBEBCgICAgDAhCQwICyAAIAVB7gAgBUEAEBgiCUKAgICAcINCgICAgOAAUQ0HA0AgACAFIAkgDUEIahA5IgRCgICAgHCDQoCAgIDgAFENCCANKAIIBEAMBQsCQCAOBEAgBCEBDAELIA0gBDcDECANIAhC/////w+DNwMYIAAgCiAMQQIgDUEQahAcIQEgACAEEBMgAUKAgICAcINCgICAgOAAUQ0DCyAAIAYgCCABEGRBAEgNAiAIQgF8IQgMAAsACyAAIAQQJiIHQoCAgIBwg0KAgICA4ABRDQEgACANQQhqIAcQOEEASA0BIA0CfiANKQMIIgRCgICAgAh8Qv////8PWARAIARC/////w+DDAELQoCAgIDgfiAEub0iBkKAgICAoIGA/P8AfSAGQv///////////wCDQoCAgICAgID4/wBWGwsiBTcDEAJ+AkAgAUKAgICAcFQNACABpy0ABUEQcUUNACAAIAFBASANQRBqEK8BDAELIABCgICAgDBBASANQRBqEIkDCyEGIAAgBRATIAZCgICAgHCDQoCAgIDgAFENBEIAIQUgBEIAIARCAFUbIQgDQCAFIAhRBEBCgICAgDAhCUKAgICAMCEFDAQLQoCAgIAwIQkgACAHIAUQciIEQoCAgIBwg0KAgICA4ABRDQYCQCAOBEAgBCEBDAELIA0gBDcDECANIAVC/////w+DNwMYIAAgCiAMQQIg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AEKAgICAMCEGAkACQCAAIA5BCGogACABECYiCBA4BEBCgICAgDAhBQwBC0KAgICAMCEFIAAgAykDACIKEE8NAEKAgICAMCEJIAJBAk4EQCADKQMIIQkLIA4pAwgiBUIBfUIAIARBfnFBAkYiAhshB0J/QgEgAhshC0J/IAUgAhshDANAIAcgDFIEQCAHQoCAgIAIfEL/////D1gEfiAHQv////8PgwVCgICAgOB+IAe5vSIFQoCAgICggYD8/wB9IAVC////////////AINCgICAgICAgPj/AFYbCyIFQoCAgIBwg0KAgICA4ABRDQIgACAIIAUQUCIGQoCAgIBwg0KAgICA4ABRDQIgDiABNwMgIA4gBTcDGCAOIAY3AxAgACAKIAlBAyAOQRBqEBwiDUKAgICAcINCgICAgOAAUQ0CIAAgDRAtBEACQAJAIARBAWsOAwABAAELIAAgBhATIAAgCBATDAULIAAgBRATIAAgCBATIAYhBQwEBSAAIAYQEyAAIAUQEyAHIAt8IQcMAgsACwsgACAIEBNCgICAgDBC/////w8gBEEBa0F9cRshBQwBCyAAIAUQEyAAIAYQEyAAIAgQE0KAgICA4AAhBQsgDkEwaiQAIAULoAICA34BfyMAQSBrIgckAAJAAkAgACAHQRhqIAAgARAmIgUQOA0AIAdCADcDEAJAIAJBAUwEQCAHKQMYIQQMAQsgBykDGCEEIAMpAwgiAUKAgICAcINCgICAgDBSBEAgACAHQRBqIAFCACAEIAQQZQ0CCyAHIAQ3AwggAkECRg0AIAMpAxAiAUKAgICAcINCgICAgDBRDQAgACAHQQhqIAFCACAEIAQQZQ0BIAcpAwghBAsgBykDECIBIAQgASAEVRshBgNAIAEgBlENAiADKQMAIgRCgICAgPB+WgRAIASnIgIgAigCAEEBajYCAAsgACAFIAEgBBCaASABQgF8IQFBAE4NAAsLIAAgBRATQoCAgIDgACEFCyAHQSBqJAAgBQvmBQIDfwl+IwBBQGoiBSQAQoCAgIAwIQsgBUKAgICAMDcDMAJAAkACQCAEQQhxIgcEQCABQoCAgIDwfloEQCABpyIGIAYoAgBBAWo2AgALIAUgACABEJACIgasNwMIIAZBAE4NAQwCCyAAIAVBCGogACABECYiARA4DQELIAAgAykDACIPEE8NAAJAIAJBAUwEQCAFKQMIIgxCACAMQgBVGyEKIARBAXEhBANAIAggClEEQCAAQdoeQQAQFgwECyAMIAhCf4V8IAggBBshCSAIQgF8IQggBwRAIAUgACABIAkQciIJNwMwIAlCgICAgHCDQoCAgIDgAFENBAwDCyAAIAEgCSAFQTBqEFwiAkEASA0DIAJFDQALIAUpAzAhCQwBCyADKQMIIglCgICAgPB+WgRAIAmnIgIgAigCAEEBajYCAAsgBEEBcSEEIAUpAwghDAsgCCAMIAggDFUbIRADQCAIIBBRDQIgDCAIQn+FfCAIIAQbIQoCQAJAAkAgBwRAIAUgACABIAoQciILNwM4IAtCgICAgHCDQoCAgIDgAFINAQwDCyAAIAEgCiAFQThqEFwiAkEASARAIAUpAzghCwwDCyACRQ0BCyAKQoCAgIAIfEL/////D1gEfiAKQv////8PgwVCgICAgOB+IAq5vSILQoCAgICggYD8/wB9IAtC////////////AINCgICAgICAgPj/AFYbCyENIAUpAzghCiANQoCAgIBwg0KAgICA4ABRBEAgCiELDAILIAUgATcDKCAFIA03AyAgBSAKNwMYIAUgCTcDEEKAgICAMCELIAAgD0KAgICAMEEEIAVBEGoQHCEOIAAgDRATIAAgChATIAVCgICAgDA3AzggDkKAgICAcINCgICAgOAAUQ0BIAAgCRATIA4hCQsgCEIBfCEIDAELCyAFIAk3AzALIAAgBSkDMBATIAAgCxATQoCAgIDgACEJCyAAIAEQEyAFQUBrJAAgCQviCAIKfgN/IwBBMGsiDyQAQoCAgIAwIQYgD0KAgICAMDcDKAJAAkACQAJAIARBCHEiEQRAIAFCgICAgPB+WgRAIAGnIhAgECgCAEEBajYCAAsgDyAAIAEQkAIiEKw3AwggEEEATg0BQoCAgIDgACEFDAMLIAAgD0EIaiAAIAEQJiIBEDgNAQsgAykDACENQoCAgIAwIQwgAkECTgRAIAMpAwghDAtCgICAgOAAIQUgACANEE8NAQJAAkACQAJAAkACQAJAIAQODQUABgECBgYGBQAGAwQGC0KAgICAECEGDAULAn4gDykDCCIFQoCAgIAIfEL/////D1gEQCAFQv////8PgwwBC0KAgICA4H4gBbm9IgVCgICAgKCBgPz/AH0gBUL/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QCAAQYAEEJ0FDQAgAEEQakHgyAEhA0EBIQEDQCABQe4BRwRAIAAgAyADEEEiBkEEQQNBASABQeABSxsgAUHgAUYbEJwFRQ0CIAFBAWohASADIAZqQQFqIQMMAQsLIABB8MABQQFBMRC+AkEASA0AIAAoAkQiAUG8xQE2AuwBIAFBvMUBNgLUASABQQU2AvgCIAFBBjYCsAIgAUGUxgE2ApwCIAFB6MUBNgKMASABQQc2ApADIAFBCDYC4AIgAEEANgLwASAAQoSAgICAAjcD6AFBwAAgACgCABEDACIBDQEgAEEANgL0AQsgABCQBQwBCyABQQBBwAD8CwAgAEKAgICAwAA3A4gBIAAgAkGAgEBqNgKAASAAIAI2AnwgAEGAgMAANgJ4IAAgATYC9AEgACEECyACQRBqJAAgBAtaAQJ/IAGnKAIgIgIEQAJAIAIpAwAiAUKAgICAcFQNACABpy0ABUECcQ0AIAIoAgwiA0UNACAAIAMQ9QMgAikDACEBCyAAIAEQIiAAQRBqIAIgACgCBBEAAAsLfQEBfwJAIAGnKAIgIgNFDQAgAykDACIBQoCAgIBQWgRAIAAgAacgAhEAAAsgAykDECIBQoCAgIBQWgRAIAAgAacgAhEAAAsgAykDCCIBQoCAgIBQWgRAIAAgAacgAhEAAAsgAykDGCIBQoCAgIBQVA0AIAAgAacgAhEAAAsLQgEBfyABpygCICICBEAgACACKQMAECIgACACKQMQECIgACACKQMIECIgACACKQMYECIgAEEQaiACIAAoAgQRAAALC44BAQN/AkAgAacoAiAiA0UNACADKQMQIgFCgICAgFBaBEAgACABpyACEQAACyADKQMYIgFCgICAgFBaBEAgACABpyACEQAACyADQSBqIQUgAygCACEEA0AgBCADKAIETg0BIAUgBEEDdGopAwAiAUKAgICAUFoEQCAAIAGnIAIRAAALIARBAWohBAwACwALC2UBA38gAacoAiAiAgRAIAAgAikDEBAiIAAgAikDGBAiIAJBIGohBCACKAIAIQMDQCACKAIEIANMBEAgAEEQaiACIAAoAgQRAAAFIAAgBCADQQN0aikDABAiIANBAWohAwwBCwsLC3gBA38CQCABpygCICIERQ0AIARBCGohAyAEQQRqIQUDQCADKAIAIgMgBUYNAQJAIAQoAgANACADKQMQIgFCgICAgFBUDQAgACABpyACEQAACyADKQMYIgFCgICAgFBaBEAgACABpyACEQAACyADQQRqIQMMAAsACwu/AQEFfyABpygCICICBEAgAEEQaiEEIAJBBGohBiACKAIIIQMDQCADIAZHBEAgAygCBCADQQRrLQAARQRAIAMpAxAhAQJAIAIoAgAEQCAAIAEQmwEMAQsgACABECILIAAgAykDGBAiCyAEIANBCGsgACgCBBEAACEDDAELCyAEIAIoAhAgACgCBBEAACACKAIABEAgAigCICIDIAIoAiQiBTYCBCAFIAM2AgAgAkIANwIgCyAEIAIgACgCBBEAAAsLGwEBfyABpygCICIDBEAgACADKAIMIAIRAAALCz4CAX8BfgJAIAApAwAiAkKAgICAcFQNAEG0tQUoAgAgAqciAC8BBkcNACAAKAIgIgBFDQAgACgCACEBCyABC1IBA38gAacoAiAiAgRAIAIoAgQiAwRAIAIoAgAiBCADNgIEIAMgBDYCACACQgA3AgALIAAgAjUCDEKAgICAcIQQIiAAQRBqIAIgACgCBBEAAAsLpQEBBX8gAacoAiAiAwRAIANBEGohBSADKAIUIQIDQCACIAVHBEAgAigCBCACQgA3AgAgAigCCCEEIQIgBC8BBkEhRg0BIARCADcCJAwBCwsCQAJAIAMtAAlFDQAgACgC2AEiAkUNACAAKALgASADKAIMIAIRAAAMAQsgAygCHCICRQ0AIAAgAygCGCADKAIMIAIRBgALIABBEGogAyAAKAIEEQAACws5AQJ/IAGnIgIoAiQiAwRAIAAgA61CgICAgJB/hBAiCyACKAIgIgIEQCAAIAKtQoCAgICQf4QQIgsLIQAgAacoAiApAwAiAUKAgICAUFoEQCAAIAGnIAIRAAALC2gBA38gACABpygCICICKQMAECIgAi0AEUUEQANAIAIoAhQhBCADIAIoAgxPRQRAIAAgBCADQQN0aigCBBB7IANBAWohAwwBCwsgAEEQaiAEIAAoAgQRAAALIABBEGogAiAAKAIEEQAAC2wBA38CQCABQoCAgIBwVA0AIAGnIgMvAQZBD0cNACADKAIgIgRFDQAgBEEIaiEFQQAhAwNAIAMgBC0ABU8NASAFIANBA3RqKQMAIgFCgICAgFBaBEAgACABpyACEQAACyADQQFqIQMMAAsACwtqAQN/AkAgAUKAgICAcFQNACABpyICLwEGQQ9HDQAgAigCICIDRQ0AIANBCGohBEEAIQIDQCACIAMtAAVPRQRAIAAgBCACQQN0aikDABAiIAJBAWohAgwBCwsgAEEQaiADIAAoAgQRAAALC38BA38gAacoAiAiBCkDACIBQoCAgIBQWgRAIAAgAacgAhEAAAsgBCkDCCIBQoCAgIBQWgRAIAAgAacgAhEAAAsgBEEYaiEFA0AgBCgCECADSgRAIAUgA0EDdGopAwAiAUKAgICAUFoEQCAAIAGnIAIRAAALIANBAWohAwwBCwsLWQEDfyAAIAGnKAIgIgIpAwAQIiAAIAIpAwgQIiACQRhqIQQDQCADIAIoAhBORQRAIAAgBCADQQN0aikDABAiIANBAWohAwwBCwsgAEEQaiACIAAoAgQRAAALcgEEfyABpyIDKAIgIQQgAygCJCEFIAMoAigiAwRAIAAgAyACEQAACyAEBEACQCAFRQ0AQQAhAwNAIAMgBCgCQE4NASAFIANBAnRqKAIAIgYEQCAAIAYgAhEAAAsgA0EBaiEDDAALAAsgACAEIAIRAAALC3wBA38gAaciAigCKCIDBEAgACADrUKAgICAcIQQIgsgAigCICIDBEAgAigCJCIEBEBBACECA0AgAiADKAJATkUEQCAAIAQgAkECdGooAgAQjQEgAkEBaiECDAELCyAAQRBqIAQgACgCBBEAAAsgACADrUKAgICAYIQQIgsLEgAgAacoAiAiAARAIAAQvwELCzgBA38gAaciBCgCJCEFA0AgAyAEKAIoT0UEQCAAIAUgA0ECdGooAgAgAhEAACADQQFqIQMMAQsLC0UBA38gAaciBCgCJCEDA0AgAiAEKAIoT0UEQCAAIAMgAkECdGooAgAQjQEgAkEBaiECDAELCyAAQRBqIAMgACgCBBEAAAsZACAAIAGnIgApAyAQIiAAQoCAgIAwNwMgC0QBAn8gAachBANAIAQoAiggA0sEQCAEKAIkIANBA3RqKQMAIgFCgICAgFBaBEAgACABpyACEQAACyADQQFqIQMMAQsLC0YBA38gAachAwNAIAMoAiQhBCACIAMoAihPRQRAIAAgBCACQQN0aikDABAiIAJBAWohAgwBCwsgAEEQaiAEIAAoAgQRAAALZQECfyMAQRBrIgckAAJ/AkAgAaciCC0ABUEIcUUNACAAIAdBDGogAhCxAUUNACAHKAIMIAgoAihPDQBBfyAAIAgQnQMNARoLIAAgASACIAMgBCAFIAZBgIAEchB4CyAHQRBqJAAL9AECBH8BfgJAAkAgAkEATg0AIAGnKQMgIgtCgICAgHCDQoCAgICQf1INACACQf////8HcSIHIAunIggoAgQiCUH/////B3FPDQACQEEEIAYQnwNFDQAgBkGAwABxRQ0CIANCgICAgHCDQoCAgICQf1INACADpyICKAIEIgpB/////wdxQQFHDQAgCEEQaiEIAn8gCUEASARAIAggB0EBdGovAQAMAQsgByAIai0AAAshBwJ/IApBAEgEQCACLwEQDAELIAItABALIAdGDQILIAAgBkGy+gAQhwEPCyAAIAEgAiADIAQgBSAGQYCABHIQeA8LQQELRgACfwJAIAJBAE4NACABpykDICIBQoCAgIBwg0KAgICAkH9SDQBBACACQf////8HcSABpygCBEH/////B3FJDQEaC0EBCwusAQEDfwJAIANBAE4NACACpykDICICQoCAgIBwg0KAgICAkH9SDQAgA0H/////B3EiAyACpyIEKAIEIgZB/////wdxTw0AQQEhBSABRQ0AIARBEGohBAJ/IAZBAEgEQCAEIANBAXRqLwEADAELIAMgBGotAAALIQMgAUEENgIAIAAgA0H//wNxENUCIQIgAUKAgICAMDcDGCABQoCAgIAwNwMQIAEgAjcDCAsgBQtpAQJ/IAGnKAIUIgBBMGohAyAAIAAoAhggAnFBf3NBAnRqKAIAIQADQAJAIABFBEBBACEADAELIAMgAEEDdGoiBEEIayEAIARBBGsoAgAgAkYNACAAKAIAQf///x9xIQAMAQsLIABBAEcLiwEBAn8gASgCACICQQBKBEAgASACQQFrIgI2AgACQCACDQAgAS0ABEEQcUUNACABKAIIIgIgASgCDCIDNgIEIAMgAjYCACABQQA2AgggACgCYCICIAFBCGoiAzYCBCABIABB4ABqNgIMIAEgAjYCCCAAIAM2AmALDwtBxqwBQd+QAUGBMUHqhgEQAAALCwAgACABEKIFEC8LcAECfyABIAEoAgAiAkEBajYCACACRQRAIAEoAggiAiABKAIMIgM2AgQgAyACNgIAIAFBADYCCCAAKAJQIgIg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ICABIAs3AyggAkHNvQEgAUEgahCwAQsgASkD4AUiC1BFBEAgASABKQPoBTcDECABQck4NgIAIAEgCzcDCCACQbq9ASABEJ0BCyACKAJMGiACELUDGiACIAIoAgwRBAAaIAItAABBAXFFBEAgAigCOCEAIAIoAjQiAwRAIAMgADYCOAsgAARAIAAgAzYCNAsgAkGEtgUoAgBGBEBBhLYFIAA2AgALIAIoAmAQjgEgAhCOAQsgAUGwCGokACAIC+YTAgJ+AX8jAEHQAWsiBCQAIAAgBBDPBSABIAEQZyIDQZAwAn4gBCkDCCICQoCAgIAIfEL/////D1gEQCACQv////8PgwwBC0KAgICA4H4gArm9IgJCgICAgKCBgPz/AH0gAkL///////////8Ag0KAgICAgICA+P8AVhsLEEcgASADQfbtAAJ+IAQpAxAiAkKAgICACHxC/////w9YBEAgAkL/////D4MMAQtCgICAgOB+IAK5vSICQoCAgICggYD8/wB9IAJC////////////AINCgICAgICAgPj/AFYbCxBHIAEgA0HKLAJ+IAQpAxgiAkKAgICACHxC/////w9YBEAgAkL/////D4MMAQtCgICAgOB+IAK5vSICQoCAgICggYD8/wB9IAJC////////////AINCgICAgICAgPj/AFYbCxBHIAEgA0G4LAJ+IAQpAyAiAkKAgICACHxC/////w9YBEAgAkL/////D4MMAQtCgICAgOB+IAK5vSICQoCAgICggYD8/wB9IAJC////////////AINCgICAgICAgPj/AFYbCxBHIAEgA0HrKgJ+IAQpAygiAkKAgICACHxC/////w9YBEAgAkL/////D4MMAQtCgICAgOB+IAK5vSICQoCAgICggYD8/wB9IAJC////////////AINCgICAgICAgPj/AFYbCxBHIAEgA0Gx7QACfiAEKQMwIgJCgICAgAh8Qv////8PWARAIAJC/////w+DDAELQoCAgIDgfiACub0iAkKAgICAoIGA/P8AfSACQv///////////wCDQoCAgICAgID4/wBWGwsQRyABIANBsioCfiAEKQM4IgJCgICAgAh8Qv////8PWARAIAJC/////w+DDAELQoCAgIDgfiACub0iAkKAgICAoIGA/P8AfSACQv///////////wCDQoCAgICAgID4/wBWGwsQRyABIANB7ewAAn4gBCkDQCICQoCAgIAIfEL/////D1gEQCACQv////8PgwwBC0KAgICA4H4gArm9IgJCgICAgKCBgPz/AH0gAkL///////////8Ag0KAgICAgICA+P8AVhsLEEcgASADQb4rAn4gBCkDSCICQoCAgIAIfEL/////D1gEQCACQv////8PgwwBC0KAgICA4H4gArm9IgJCgICAgKCBgPz/AH0gAkL///////////8Ag0KAgICAgICA+P8AVhsLEEcgASADQbvtAAJ+IAQpA1AiAkKAgICACHxC/////w9YBEAgAkL/////D4MMAQtCgICAgOB+IAK5vSICQoCAgICggYD8/wB9IAJC////////////AINCgICAgICAgPj/AFYbCxBHIAEgA0HTKgJ+IAQpA1giAkKAgICACHxC/////w9YBEAgAkL/////D4MMAQtCgICAgOB+IAK5vSICQoCAgICggYD8/wB9IAJC////////////AINCgICAgICAgPj/AFYbCxBHIAEgA0GG7QACfiAEKQNgIgJCgICAgAh8Qv////8PWARAIAJC/////w+DDAELQoCAgIDgfiACub0iAkKAgICAoIGA/P8AfSACQv///////////wCDQoCAgICAgID4/wBWGwsQRyABIANBliwCfiAEKQNoIgJCgICAgAh8Qv////8PWARAIAJC/////w+DDAELQoCAgIDgfiACub0iAkKAgICAoIGA/P8AfSACQv///////////wCDQoCAgICAgID4/wBWGwsQRyABIANBxO0AAn4gBCkDcCICQoCAgIAIfEL/////D1gEQCACQv////8PgwwBC0KAgICA4H4gArm9IgJCgICAgKCBgPz/AH0gAkL///////////8Ag0KAgICAgICA+P8AVhsLEEcgASADQdcsAn4gBCkDeCICQoCAgIAIfEL/////D1gEQCACQv////8PgwwBC0KAgICA4H4gArm9IgJCgICAgKCBgPz/AH0gAkL///////////8Ag0KAgICAgICA+P8AVhsLEEcgASADQYfuAAJ+IAQpA4ABIgJCgICAgAh8Qv////8PWARAIAJC/////w+DDAELQoCAgIDgfiACub0iAkKAgICAoIGA/P8AfSACQv///////////wCDQoCAgICAgID4/wBWGwsQRyABIANB5O0AAn4gBCkDiAEiAkKAgICACHxC/////w9YBEAgAkL/////D4MMAQtCgICAgOB+IAK5vSICQoCAgICggYD8/wB9IAJC////////////AINCgICAgICAgPj/AFYbCxBHIAEgA0GiLAJ+IAQpA5ABIgJCgICAgAh8Qv////8PWARAIAJC/////w+DDAELQoCAgIDgfiACub0iAkKAgICAoIGA/P8AfSACQv///////////wCDQoCAgICAgID4/wBWGwsQRyABIANBz+0AAn4gBCkDmAEiAkKAgICACHxC/////w9YBEAgAkL/////D4MMAQtCgICAgOB+IAK5vSICQoCAgICggYD8/wB9IAJC////////////AINCgICAgICAgPj/AFYbCxBHIAEgA0HlLAJ+IAQpA6ABIgJCgICAgAh8Qv////8PWARAIAJC/////w+DDAELQoCAgIDgfiACub0iAkKAgICAoIGA/P8AfSACQv///////////wCDQoCAgICAgID4/wBWGwsQRyABIANBySkCfiAEKQOoASICQoCAgIAIfEL/////D1gEQCACQv////8PgwwBC0KAgICA4H4gArm9IgJCgICAgKCBgPz/AH0gAkL///////////8Ag0KAgICAgICA+P8AVhsLEEcgASADQcQpAn4gBCkDsAEiAkKAgICACHxC/////w9YBEAgAkL/////D4MMAQtCgICAgOB+IAK5vSICQoCAgICggYD8/wB9IAJC////////////AINCgICAgICAgPj/AFYbCxBHIAEgA0HzNwJ+IAQpA7gBIgJCgICAgAh8Qv////8PWARAIAJC/////w+DDAELQoCAgIDgfiACub0iAkKAgICAoIGA/P8AfSACQv///////////wCDQoCAgICAgID4/wBWGwsQRyABIANB1SkCfiAEKQPAASICQoCAgIAIfEL/////D1gEQCACQv////8PgwwBC0KAgICA4H4gArm9IgJCgICAgKCBgPz/AH0gAkL///////////8Ag0KAgICAgICA+P8AVhsLEEcgASADQdrsAAJ+IAQpA8gBIgJCgICAgAh8Qv////8PWARAIAJC/////w+DDAELQoCAgIDgfiACub0iAkKAgICAoIGA/P8AfSACQv///////////wCDQoCA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BGs2AgQLIAVBADoAACAAIAAoAiwiATYCHCAAIAE2AhQgAguwBQIGfgR/IAEgASgCAEEHakF4cSIBQRBqNgIAIAAgASkDACECIAEpAwghBiMAQSBrIgAkACAGQv///////z+DIQMCfiAGQjCIQv//AYMiBKciCEGB+ABrQf0PTQRAIANCBIYgAkI8iIQhAyAIQYD4AGutIQQCQCACQv//////////D4MiAkKBgICAgICAgAhaBEAgA0IBfCEDDAELIAJCgICAgICAgIAIUg0AIANCAYMgA3whAwtCACADIANC/////////wdWIgEbIQIgAa0gBHwMAQsgAiADhFAgBEL//wFSckUEQCADQgSGIAJCPIiEQoCAgICAgIAEhCECQv8PDAELIAhB/ocBSwRAQgAhAkL/DwwBC0GA+ABBgfgAIARQIgkbIgogCGsiAUHwAEoEQEIAIQJCAAwBCyADIANCgICAgICAwACEIAkbIQNBACEJIAggCkcEQCACIQQgAyEFAkBBgAEgAWsiCEHAAHEEQCACIAhBQGqthiEFQgAhBAwBCyAIRQ0AIAUgCK0iB4YgBEHAACAIa62IhCEFIAQgB4YhBAsgACAENwMQIAAgBTcDGCAAKQMQIAApAxiEQgBSIQkLAkAgAUHAAHEEQCADIAFBQGqtiCECQgAhAwwBCyABRQ0AIANBwAAgAWuthiACIAGtIgSIhCECIAMgBIghAwsgACACNwMAIAAgAzcDCCAAKQMIQgSGIAApAwAiA0I8iIQhAgJAIAmtIANC//////////8Pg4QiA0KBgICAgICAgAhaBEAgAkIBfCECDAELIANCgICAgICAgIAIUg0AIAJCAYMgAnwhAgsgAkKAgICAgICACIUgAiACQv////////8HViIBGyECIAGtCyEDIABBIGokACAGQoCAgICAgICAgH+DIANCNIaEIAKEvzkDAAvAFwMSfwF8A34jAEGwBGsiCyQAIAtBADYCLAJAIAG9IhlCAFMEQEEBIRBBsiIhFCABmiIBvSEZDAELIARBgBBxBEBBASEQQbUiIRQMAQtBuCJBsyIgBEEBcSIQGyEUIBBFIRcLAkAgGUKAgICAgICA+P8Ag0KAgICAgICA+P8AUQRAIABBICACIBBBA2oiBiAEQf//e3EQYSAAIBQgEBBeIABBnd0AQcyaASAFQSBx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AgtBgIDA/wMgB6cNARpEAAAAAAAAAAAPC0HLdyEJIABEAAAAAAAAUEOivSIHQiCIpwtB4r4laiIKQRR2IAlqtyIFRABgn1ATRNM/oiIBIAdC/////w+DIApB//8/cUGewZr/A2qtQiCGhL9EAAAAAAAA8L+gIgAgACAARAAAAAAAAOA/oqIiA6G9QoCAgIBwg78iBEQAACAVe8vbP6IiAqAiBiACIAEgBqGgIAAgAEQAAAAAAAAAQKCjIgEgAyABIAGiIgIgAqIiASABIAFEn8Z40Amawz+iRK94jh3Fccw/oKJEBPqXmZmZ2T+goiACIAEgASABRERSPt8S8cI/okTeA8uWZEbHP6CiRFmTIpQkSdI/oKJEk1VVVVVV5T+goqCgoiAAIAShIAOhoCIARAAAIBV7y9s/oiAFRDYr8RHz/lk9oiAAIASgRNWtmso4lLs9oqCgoKAhAAsgAAuEAQECfyMAQRBrIgEkAAJAIAC9QiCIp0H/////B3EiAkH7w6T/A00EQCACQYCAgPIDSQ0BIABEAAAAAAAAAABBABCWBiEADAELIAJBgIDA/wdPBEAgACAAoSEADAELIAAgARCwBCECIAErAwAgASsDCCACQQFxEJYGIQALIAFBEGokACAACwQAQgALlAECAnwBfkQAAAAAAADgPyAApiECAkAgAJkiAb0iA0L/////n8iLw8AAWARAIAEQogIhASADQv/////////3P1gEQCADQoCAgICAgICoPlQNAiACIAEgAaAgASABoiABRAAAAAAAAPA/oKOhog8LIAIgASABIAFEAAAAAAAA8D+go6CiDwsgASACIAKgEJoGIQALIAALygECAn8BfCMAQRBrIgEkAAJAIAC9QiCIp0H/////B3EiAkH7w6T/A00EQCACQYCAwPIDSQ0BIABEAAAAAAAAAABBABDgAiEADAELIAJBgIDA/wdPBEAgACAAoSEADAELIAAgARCwBCECIAErAwghACABKwMAIQMCQAJAAkACQCACQQNxQQFrDgMBAgMACyADIABBARDgAiEADAMLIAMgABDhAiEADAILIAMgAEEBEOACmiEADAELIAMgABDhApohAAsgAUEQaiQAIAALDQAQCiAAQYABahAQAAsFABAuAAujAQEEfyAAKAJUIgMoAgQiBCADKAIAIgVrIgZBACAEIAZPGyIEIAJJBEAgACAAKAIAQRByNgIAIAQhAgsgASADKAIMIAVqIAIQ1AEaIAMgAygCACACaiIFNgIAIAAgACgCLCIBNgIEIAAgASAEIAJrIgQgACgCMCIAIAAgBEsbIgBqNgIIIAEgAygCDCAFaiAAENQBGiADIAMoAgAgAGo2AgAgAguHAQEBfyMAQRBrIgMkAAJ+AkAgAkEDTw0AIAAoAlQhACADQQA2AgQgAyAAKAIANgIIIAMgACgCBDYCDCABQQAgA0EEaiACQQJ0aigCACICa6xTDQAgASAAKAIIIAJrrFUNACAAIAIgAadqIgA2AgAgAK0MAQtBwLEFQRw2AgBCfwsgA0EQaiQAC40BAQJ+IAAgAikDABAxIQIgACABKQMAIAIgAykDACAEKQMAIgkgBSkDACIKQYECQQEgCBtBACAGG0GECEEEIAgbQQAgBxtyIgEgAUGAEHIgCUKAgICAcINCgICAgDBRGyIBIAFBgCByIApCgICAgHCDQoCAgIAwURsiAUGAwAByIAEgCBsQeBogACACEBkLmwEBAX4CfCAAmSIAvSIBQv////+fyIvzP1gEQEQAAAAAAADwPyABQoCAgICAgICoPlQNARogABCiAiIAIACiIABEAAAAAAAA8D+gIgAgAKCjRAAAAAAAAPA/oA8LIAFC/////5/Ii8PAAFgEQCAAEPEDIgBEAAAAAAAA8D8gAKOgRAAAAAAAAOA/og8LIABEAAAAAAAA8D8QmgYLCwUAIACcC8IBAgF8An8jAEEQayICJAACfCAAvUIgiKdB/////wdxIgNB+8Ok/wNNBEBEAAAAAAAA8D8gA0GewZryA0kNARogAEQAAAAAAAAAABDhAgwBCyAAIAChIANBgIDA/wdPDQAaIAAgAhCwBCEDIAIrAwghACACKwMAIQECQAJAAkACQCADQQNxQQFrDgMBAgMACyABIAAQ4QIMAwsgASAAQQEQ4AKaDAILIAEgABDhApoMAQsgASAAQQEQ4AILIAJBEGokAAtFAQF+IAAgAikDABAxIQIgAykDACIEQoCAgIDwfloEQCAEpyIDIAMoAgBBAWo2AgALIAAgASkDACACIAQQ8AUgACACEBkLBQAgAJsL9gECAXwBfyAAvUIgiKdB/////wdxIgJBgIDA/wdPBEAgACAAoA8LAkACfyACQf//P0sEQCAAIQFBk/H91AIMAQsgAEQAAAAAAABQQ6IiAb1CIIinQf////8HcSICRQ0BQZPx/csCCyACQQNuaq1CIIa/IAGmIgEgASABoiABIACjoiIBIAEgAaKiIAFE1+3k1ACwwj+iRNlR577LROi/oKIgASABRMLWSUpg8fk/okQgJPCS4Cj+v6CiRJLmYQ/mA/4/oKCivUKAgICAfINCgICAgAh8vyIBIAAgASABoqMiACABoSABIAGgIACgo6IgAaAhAAsgAAt7AwF8AX4BfyAAmSEBAkACfCAAvSICQjSIp0H/D3EiA0H9B00EQCADQd8HSQ0CIAEgAaAiACABIACiRAAAAAAAAPA/IAGho6AMAQsgAUQAAAAAAADwPyABoaMiACAAoAsQtgNEAAAAAAAA4D+iIQELIAGaIAEgAkIAUxsLpQMCBX8BfiAAvUL///////////8Ag0KBgICAgICA+P8AVCABvUL///////////8Ag0KAgICAgICA+P8AWHFFBEAgACABoA8LIAG9IgdCIIinIgJBgIDA/wNrIAenIgVyRQRAIAAQsQQPCyACQR52QQJxIgYgAL0iB0I/iKdyIQMCQCAHQiCIp0H/////B3EiBCAHp3JFBEACQAJAIANBAmsOAgABAwtEGC1EVPshCUAPC0QYLURU+yEJwA8LIAJB/////wdxIgIgBXJFBEBEGC1EVPsh+T8gAKYPCwJAIAJBgIDA/wdGBEAgBEGAgMD/B0cNASADQQN0KwOAigUPCyAEQYCAwP8HRyACQYCAgCBqIARPcUUEQEQYLURU+yH5PyAApg8LAnwgBgRARAAAAAAAAAAAIARBgICAIGogAkkNARoLIAAgAaOZELEECyEAAkACQAJAIANBAWsOAwABAgQLIACaDwtEGC1EVPshCUAgAEQHXBQzJqahvKChDwsgAEQHXBQzJqahvKBEGC1EVPshCcCgDwsgA0EDdCsDoIoFIQALIAALpgEDAXwBfwF+IACZIQECQCAAvSIDQjSIp0H/D3EiAkGZCE8EQCABENACRO85+v5CLuY/oCEBDAELIAJBgAhPBEAgASABoEQAAAAAAADwPyABIAAgAKJEAAAAAAAA8D+gn6CjoBDQAiEBDAELIAJB5QdJDQAgASAAIACiIgAgAEQAAAAAAADwP6CfRAAAAAAAAPA/oKOgELYDIQELIAGaIAEg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QSBqJAAgBAsQACAAIAMpAwBBESAEELcCCxAAIAAgAykDAEECQQAQtwILEAAgACADKQMAQQFBABC3AgtIAQF+QoCAgIDgACEEIAAgAykDACIBIAMpAwgQuAYEfkKAgICA4AAFIAFCgICAgPB+WgRAIAGnIgAgACgCAEEBajYCAAsgAQsLQgAgACADKQMAIgEgAykDCEEBEJgCQQBIBEBCgICAgOAADwsgAUKAgICA8H5aBEAgAaciACAAKAIAQQFqNgIACyABC4MBAQF+IAMpAwAiAUL/////b1YgAUKAgICAcINCgICAgCBRckUEQCAAQZnzAEEAEBZCgICAgOAADwsCQCAAIAEQkAEiAUKAgICA4ABSBEAgAykDCCIEQoCAgIBwg0KAgICAMFENASAAIAEgBBC4BkUNASAAIAEQEwtCgICAgOAADwsgAQv6AQICfgF/IwBBIGsiAiQAQoCAgIDgACEFAkACQCAAIAEQJiIBQoCAgIBwg0KAgICA4ABRDQAgACADKQMAEDEiA0UNAANAIAAgAiABpyADEEoiB0EASA0CIAcEQEKAgICAMCEFAkAgAi0AAEEQcUUNACACQRhBECAEG2opAwAiBUKAgICA8H5UDQAgBaciBCAEKAIAQQFqNgIACyAAIAIQTgwDCyAAIAEQzgIiAUKAgICAcIMiBkKAgICAIFEEQEKAgICAMCEFDAMLIAZCgICAgOAAUQ0CIAAQf0UNAAsMAQtBACEDCyAAIAMQGSAAIAEQEyACQSBqJAAgBQuxAQEDfiADKQMIIQUgAykDACEGQoCAgIDgACEHAkAgACABECYiAUKAgICAcINCgICAgOAAUgR+IAAgBRBPDQEgACAGEDEiAkUNASAAIAEgAkKAgICAMEKAgICAMCAFIAQbIAVCgICAgDAgBBtBhaoBQYWaASAEGxB4IQMgACABEBMgACACEBlCgICAgOAAQoCAgIAwIANBAEgbBUKAgICA4AALDwsgACABEBNCgICAgOAAC3IBAX5CgICAgDAhAyABQoCAgIAQhEKAgICAcINCgICAgDBRBEAgABAlQoCAgIDgAA8LIAJCgICAgHCDQoCAgIAgUiACQv////9vWHEEfkKAgICAMAVCgICAgOAAQoCAgIAwIAAgASACQQEQmAJBAEgbCwsuAQF+IAAgARAmIgFCgICAgHCDQoCAgIDgAFEEQCABDwsgACABENwBIAAgARATC6cBAgF+AX8jAEEgayICJAACQCAAIAMpAwAQMSIDRQRAQoCAgIAwIQFCgICAgOAAIQQMAQtCgICAgOAAIQQgACABECYiAUKAgICAcINCgICAgOAAUQ0AIAAgAiABpyADEEoiBUEASA0AIAVFBEBCgICAgBAhBAwBCyACNQIAIAAgAhBOQgKIQgGDQoCAgIAQhCEECyAAIAMQGSAAIAEQEyACQSBqJAAgBAvBAQECfgJAAn5CgICAgBAgAykDACIEQoCAgIBwVA0AGkKAgICA4AAgACABECYiAUKAgICAcINCgICAgOAAUQ0AGiAEpyICIAIoAgBBAWo2AgAgAachAgNAIAAgBBDOAiIEQoCAgIBwgyIFQoCAgIDgAFIEQCACIASnRiAFQoCAgIAgUXINAyAAEH9FDQELCyAAIAQQEyAAIAEQE0KAgICA4AALDwsgACAEEBMgACABEBMgBUKAgICAIFKtQoCAgIAQhAt6AQF+IAAgAykDABAxIgJFBEBCgICAgOAADwtCgICAgOAAIQQgACABECYiAUKAgICAcINCgICAgOAAUQRAIAAgAhAZIAEPCyAAQQAgAacgAhBKIQMgACACEBkgACABEBNCgICAgOAAIANBAEetQoCAgIAQhCADQQBIGwsIACAAIAEQJgsPACAAIAFBO0EAQQAQoAILUwIBfwF+IwBBEGsiACQAQoCAgIAwIQQCQCABELIDIgNFDQAgAy0AEkEEcUUNACADQX8gAEEMahCABiEDIAAoAgwgAyACG60hBAsgAEEQaiQAIAQLMwIBfgF/QoCAgIAwIQICQCABELIDIgNFDQAgAy0AEkEEcUUNACAAIAMoAkQQMyECCyACCygAQoCAgIDgACAAIAMpAwAgARCDBCIAQQBHrUKAgICAEIQgAEEASBsLnQECAX4Bf0KAgICA4AAhBCAAIAEQTwR+QoCAgIDgAAUgACABpyICLwEGEP8BBH8CQCACKAIgIgIvABEiA0GACHFFDQAgAigCVCIFRQ0AIAAgBSACKAJIEOkCDwsgA0ECdkEMcSgCmLICBUGEvAELIAAgAUE6IAFBABAYIgFCgICAgHCDQoCAgIAwUQR+IABBLxAzBSABC0GgGRDGAQsL0wUDA34DfAd/AkAgACABEE8NACAAIAApA0BBDhBpIgVCgICAgOAAUQ0AIAWnIg0gAUKAgICAcFoEfyABpy8BBEGAIHEFQQALIA0vAQRB/98DcXI7AQQCQCAAQQEgAiACQQFMGyIOQQFrIgtBA3RBGGoQJyIKRQ0AIAFCgICAgPB+WgRAIAGnIgIgAigCAEEBajYCAAsgCiABNwMAIAMpAwAiBEKAgICA8H5aBEAgBKciAiACKAIAQQFqNgIACyAKIAs2AhAgCiAENwMIIApBGGohD0EAIQIDQCACIAtHBEAgAyACQQFqIgxBA3RqKQMAIgRCgICAgPB+WgRAIASnIhAgECgCAEEBajYCAAsgDyACQQN0aiAENwMAIAwhAgwBCwsgDSAKNgIgIAAgAUEyELoGIgJBAEgNAEIAIQQCQCACRQ0AIAAgAUEyIAFBABAYIgZCgICAgHCDQoCAgIDgAFENASAGQv////8PWARAIAanIgIgC2tBACACIA5OG60hBAwBCwJAIAZCIIinQQhrQW5NBEACQCAGQoCAgICggYD8/wB8IgRC////////////AINCgICAgICAgPj/AFYNACAEv50iCCALuCIJZQ0AIAggCaEhBwsgB0QAAMD////fQWUgB0QAAAAAAADgwWZxRQRAIAe9IQQMAgsgB70iBCAH/AIiAre9Ug0BIAKtIQQMAgsgACAGEBMMAQtCgICAgOB+IARCgICAgKCBgPz/AH0gB71C////////////AINCgICAgICAgPj/AFYbIQQLIAAgBUEyIARBARAeGiAAIAFBOiABQQAQGCIEQoCAgIBwg0KAgICA4ABRDQAgAEGOvAEgBEIgiEL7////D31CfVgEfiAAIAQQEyAAQS8QMwUgBAtB38ABEMYBIgFCgICAgOAAUQ0AIAAgBUE6IAFBARAeGiAFDwsgACAFEBMLQoCAgIDgAAswACACQQBMBEAgACABQoCAgIAwQQBBABAcDwsgACABIAMpAwAgAkEBayADQQhqEBwLgwMBA34gAykDACIBQv////9vViABQiCIQvv///8PfUJ9VnJFBEAgAEGNM0EAEBZCgICAgOAADwsCQAJAAkACQAJAAkAgACABQeIBIAFBABAYIgVCgICAgHCDIgRCgICAgCBSBEAgBEKAgICA4ABRDQMgBEKAgICAMFINAQsgAUKAgICA8H5UDQEgAaciAiACKAIAQQFqNgIADAELIAAgASAFEPQBIQEgACAFEBNCgICAgOAAIQQgAUKAgICAcINCgICAgOAAUQ0BC0KAgICAMCEFIAAgAUHuACABQQAQGCIGQoCAgIBwg0KAgICA4ABRDQIgACABIAApA6gBEIMEIgJBAEgNAiACRQ0BIAAgBhATIAEhBAsgBA8LQoCAgIDgACEFIABBKhCIASIEQoCAgIDgAFENACAAQRAQJyICDQEgBCEFCyAAIAYQEyAAIAEQEyAAIAUQE0KAgICA4AAPCyACIAY3AwggAiABNwMAIARCgICAgHBaBEAgBKcgAjYCIAsgBAspAQF/IwBBEGsiAiQAIAAgAkEMaiABKQMAEMMEGiACKAIMIAJBEGokAAvoAgIFfwF+IAAgAkEEdEEgahAnIgQEQCAEQoCAgIAwNwMYIARCgICAgDA3AxAgBEIANwMAIARBADYCCCACQQAgAkEAShshByAEQSBqIQZBACECAkADQCACIAdHBEAgAyACQQN0aikDACIBQv////9vWARAIAAQJQwDCyAAIAFB4gEgAUEAEBgiCUKAgICAcINCgICAgOAAUQ0CIAAgCRAwBEAgAaciBSAFKAIAQQFqNgIAIAYgBCgCBCIFQQN0aiIIIAE3AwAgBCAFQQJqNgIEIAggCTcDCCACQQFqIQIMAgUgAEHJ1QBBABAWIAAgCRATDAMLAAsLIABBKBCIASIBQoCAgIDgAFENACABQoCAgIBwWgRAIAGnIAQ2AiALIAEPC0EAIQIDQCACIAQoAgRORQRAIAAgBiACQQN0aikDABATIAJBAWohAgwBCwsgACgCECIAQRBqIAQgACgCBBEAAAtCgICAgOAAC84BAgF/AX4gAUL/////b1gEQCAAECVCgICAgOAADwsgACABIAAoAjgpA7gCEEUEQCAAQcIaQQAQFkKAgICA4AAPC0KAgICA4AAhBAJAIAAgAUHoARC6BiIDQQBIDQACQCADBEAgAkKAgICA8H5aBEAgAqciAyADKAIAQQFqNgIACyAAIAFB6AEgAhA7QQBODQEMAgsgAkKAgICA8H5aBEAgAqciAyADKAIAQQFqNgIACyAAIAFB6AEgAkEHEB5BAEgNAQtCgICAgDAhBAsgBAsJACAAQcUBEDMLlgIBBX4jAEEQayICJAACQCABQv////9vWARAIAAQJUKAgICA4AAhBQwBC0KAgICA4AAhBSAAIAFB7gAgAUEAEBgiB0KAgICAcINCgICAgOAAUQ0AAkAgABBCIgZCgICAgOAAUQ0AA0AgACABIAcgAkEMahA5IghCgICAgHCDQoCAgIDgAFENASACKAIMRQRAIAAgBiAEIAgQZEEASA0CIARCAXwhBAwBCwsgACAGQTIgBKciA0EATgR+IARC/////weDBUKAgICA4H4gA7i9IgFCgICAgKCBgPz/AH0gAUKAgICAgICA+P8AVhsLEDtBAEgNACAAIAcQEyAGIQUMAQsgACAGEBMgACAHEBMLIAJBEGokACAFC/gDAgJ/B34jAEEwayIEJAACQAJAIAFC/////29YBEAgABAlDAELQoCAgIAwIQYCQAJAIAAgAykDABBPBEBCgICAgDAhCEKAgICAMCEJDAELIAMpAwAiCUKAgICA8H5aBEAgCaciBSAFKAIAQQFqNgIACyAAIAFB7gAgAUEAEBgiCEKAgICAcINCgICAgOAAUQ0AAkACQCACQQJOBEAgAykDCCIGQoCAgIDwflQNASAGpyICIAIoAgBBAWo2AgAMAQsgACABIAggBEEMahA5IgZCgICAgHCDQoCAgIDgAFENAyAEKAIMDQFCASEHCwNAIAAgASAIIARBDGoQOSIMQoCAgIBwg0KAgICA4ABRDQMgBCgCDEUEQCAHIQsgB0KAgICACFoEQEKAgICA4H4gB7q9IgpCgICAgKCBgPz/AH0gCkKAgICAgICA+P8AVhshCwsgBCALNwMgIAQgDDcDGCAEIAY3AxAgACAJQoCAgIAwQQMgBEEQahAcIQogACAMEBMgACALEBMgCkKAgICAcINCgICAgOAAUQ0DIAAgBhATIAdCAXwhByAKIQYMAQsLIAAgCRATIAAgCBATDAQLIABBt8QAQQAQFgsgACABQQEQRBoLIAAgBhATIAAgCRATIAAgCBATC0KAgICA4AAhBgsgBEEwaiQAIAYLvwgBBn4jAEEgayICJAACQAJAAkACQCABQv////9vWARAIAAQJQwBC0KAgICAMCEKQoCAgIAwIQkCQAJAIAAgAykDABBPDQAgAykDACIJQoCAgIDwfloEQCAJpyIDIAMoAgBBAWo2AgALIAAgAUHuACABQQAQGCIKQoCAgIBwg0KAgICA4ABRDQECQAJAAkACQAJAIARBAWsOBwAE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AFENCCABQv////9vWARAIAAgARATIABBnjRBABAWDAkLAkACQCAAIAFB4gEgAUEAEBgiB0KAgICAcIMiBkKAgICAIFEgBkKAgICAMFFyRQRAIAZCgICAgOAAUg0BIAAgARATDAsLIAAgBxATDAELIAAgASAHEPQBIAAgBxATIAAgARATIgFCgICAgHCDQoCAgIDgAFENCQsgAiABNwMYCyAAIAEgCSABQQAQGCIBQoCAgIBwgyIGQoCAgIDgAFENBiAFQQFGIAZCgICAgBCEQoCAgIAwUXFFBEAgACACKQMYIAEgBBA5IQYgACABEBMgBkKAgICAcINCgICAgOAAUQ0HIAQoAgBFDQoLIARBADYCACAAIAIpAxhBABBEGiAAIAIpAxgQE0KAgICAMCEBIAJCgICAgDA3AxgMAAsACwJAIAVFBEAgAikDCCIGQoCAgIDwflQNASAGpyIJIAkoAgBBAWo2AgAMAQsgACACKQMAIgFBBiABQQAQGCIGQoCAgIBwg0KAgICA4ABRDQYLIAAgAikDACAGIAQQOSEBIAAgBhATQoCAgIDgACEGIAFCgICAgHCDQoCAgIDgAFENByAFQQFGDQMgBCgCAA0DIAIgAikDICIGQgF8NwMgIAMgBkKAgICACHxC/////w9YBH4gBkL/////D4MFQoCAgIDgfiAGub0iBkKAgICAoIGA/P8AfSAGQv///////////wCDQoCAgICAgID4/wBWGwsiBzcDCCADIAE3AwAgACACKQMQQoCAgIAwQQIgAxAcIQYgACAHEBMgBkKAgICAcINCgICAgOAAUQ0FDAcLIAIpAyAiBkIAVQRAAkAgBUUEQCACKQMIIgFCgICAgPB+VA0BIAGnIgkgCSgCAEEBajYCAAwBCyAAIAIpAwAiAUEGIAFBABAYIgFCgICAgHCDQoCAgIDgAFENBiACKQMgIQYLIAIgBkIBfTcDICAAIAIpAwAgASAEEDkhBiAAIAEQE0KAgICA4AAgBiAGQoCAgIBwg0KAgICA4ABRGyEGDAcLIARBATYCAEKAgICA4ABCgICAgDAgACACKQMAQQAQRBshBgwGCxAuAAsgACAHEBMMBAsgASEGDAMLIAAgAikDGEEAEEQaIAAgAikDGBATIAJCgICAgDA3AxgLIAAgAikDAEEBEEQaC0KAgICA4AAhBgtBASEA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CxDFBiIDQQBODQAgDA0BIAIoAggoAhAiA0EQaiACKAIMIAMoAgQRAAAgACABEBMgACAIEBMgByEFDAQLIAJBCGoiDCAKIAsgAxBMGgJAIA4EQCACIAc3AzAgAiABNwMgIAIgA603AyggACAAIAlCgICAgDBBAyACQSBqEBwQQCIGQoCAgIBwg0KAgICA4ABRDQQgDCAGEK0BGgwBCyAAIAJBCGogASAKIANCgICAgDBCgICAgDAgCEEAQQAQ1AMNAwsgAyANKAIEIgNB/////wdxaiELQQEhDCAEDQELCyACQQhqIgMgCiALIAooAgRB/////wdxEEwaIAAgARATIAAgCBATIAAgBxATIAMQPCEFDAELIAIoAggoAhAiA0EQaiACKAIMIAMoAgQRAAAgACABEBMgACAIEBMgACAHEBMLIAJBQGskACAFC6kCAgN/An4jAEEgayICJABCgICAgOAAIQcCQAJAAkAgACABEFUiAUKAgICAcINCgICAgOAAUQ0AIAAgAiADKQMAEPABDQACQCAAIAIpAwAiCEL/////B1YEf0HyLAUgCEIBUQ0DIAGnIgQoAgQiBkH/////B3EiBUUNAyAIIAWtfkL/////A1gNAUGQ5QALQQAQMgwBCyAAIAJBCGogBSAIpyIDbCAGQR92EJsCDQACQCAFQQFHBEADQCADQQBMDQIgAkEIaiAEQQAgBRBMGiADQQFrIQMMAAsACyACQQhqAn8gBCgCBEEASARAIAQvARAMAQsgBC0AEAsgAxDEBhoLIAAgARATIAJBCGoQPCEHDAILIAAgARATDAELIAEhBwsgAkEgaiQAIAcLwQECAn8CfiMAQRBrIgQkAEKAgICA4AAhBgJAIAAgARBVIgFCgICAgHCDQoCAgIDgAFEEQCABIQYMAQsCQCAAIARBDGogAykDACABpyIFKAIEQf////8HcSICIAIQWg0AIAQgAjYCCCADKQMIIgdCgICAgHCDQoCAgIAwUgRAIAAgBEEIaiAHIAIgAhBaDQEgBCgCCCECCyAAIAUgBCgCDCIDIAIgAyACIANKGxCRASEGCyAAIAEQEwsgBEEQaiQAIAYLwAECA38CfiMAQRBrIgIkAEKAgICA4AAhBwJAIAAgARBVIgFCgICAgHCDQoCAgIDgAFEEQCABIQcMAQsCQCAAIAJBDGogAykDACAB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IgFCgICAgHCDQoCAgIDgAFEEQCABIQwMAQsCQCAAIAMpAwAQKCINQoCAgIBwg0KAgICA4ABRDQAgDaciCSgCBEH/////B3EhBiABpyIKKAIEQf////8HcSEHAkAgBARAIAUgByAGayILNgIMQX8hCEEAIQQgAkECSA0BIAAgBSADKQMIEEgNAiAFKwMAIg69Qv///////////wCDQoCAgICAgID4/wBWDQFBACEDIAUgDkQAAAAAAAAAAGUEf0EABSAOIAu3Y0UNAiAO/AILNgIMDAELIAVBADYCDCACQQJOBEAgACAFQQxqIAMpAwggB0EAEFoNAgsgByAGayEEQQEhCAtC/////w8hDCAGIAdLDQAgBCAFKAIMIgNrIAhsQQBIDQADQAJAIAogCSADQQAgBhDIBAR/IAMgBEcNAUF/BSADC60hDAwCCyADIAhqIQMMAAsACyAAIAEQEyAAIA0QEwsgBUEQaiQAIAwL/wECAn4Cf0KAgICA4AAhBAJAIAAgARBVIgFCgICAgHCDQoCAgIDgAFENACABpyIDEPgCIgJBAEgEQCABIQQMAQsgACADQRBqIAMoAgRB/////wdxEIwDIQUgACABEBMgBUKAgICA4ABRDQAgBaciAEEQaiEDIAAoAgRB/////wdxIQYDQCACIAZOBEAgBQ8FAkAgAyACQQF0aiIHLwEAIgBBgPADcUGAsANGBEACQCAAQYC4A3FBgLADRw0AIAJBAWoiACAGTg0AIAMgAEEBdGovAQBBgPgDcUGAuANGDQILIAdB/f8DOwEACyACIQALIABBAWohAgwBCwALAAsgBAtGAQF+QoCAgIDgACEEIAAgARBVIgFCgICAgHCDQoCAgIDgAFIEfiABpxD4AiAAIAEQE0Efdq1CgICAgBCEBUKAgICA4AALC5IBAgF+An8jAEEQayICJABCgICAgOAAIQQCQCAAIAEQVSIBQoCAgIBwg0KAgICA4ABRBEAgASEEDAELAkAgACACQQxqIgUgAykDABDAAQ0AQoCAgIAwIQQgAigCDCIDQQBIDQAgAyABpyIGKAIEQf////8HcU8NACAGIAUQ7AGtIQQLIAAgARATCyACQRBqJAAgBAtqAgJ/AX4gACABEFUhAQNAIAIgBEwgAUKAgICAcINCgICAgOAAUXJFBEAgAyAEQQN0aikDACIGQoCAgIDwfloEQCAGpyIFIAUoAgBBAWo2AgALIARBAWohBCAAIAEgBhCXAiEBDAELCyABC7EBAgF+An8jAEEQayICJABCgICAgOAAIQQCQCAAIAEQVSIBQoCAgIBwg0KAgICA4ABRBEAgASEEDAELAkAgACACQQxqIAMpAwAQwAENAEKAgICA4H4hBCACKAIMIgNBAEgNACADIAGnIgUoAgQiBkH/////B3FPDQAgBUEQaiEFIAZBAEgEQCAFIANBAXRqMwEAIQQMAQsgAyAFajEAACEECyAAIAEQEwsgAkEQaiQAIAQL7QECAX4CfyMAQRBrIgIkAEKAgICA4AAhBQJAIAAgARBVIgFCgICAgHCDQoCAgIDgAFEEQCABIQUMAQsCQCAAIAJBDGogAykDABDAAQ0AIAGnIQYgBEUgAigCDCIDQQBOckUEQCAGKAIEQf////8HcSADaiEDCwJAIANBAE4EQCADIAYoAgQiB0H/////B3FJDQELQoCAgIAwIQUgBA0BIABBLxAzIQUMAQsgBkEQaiEEIAACfyAHQQBIBEAgBCADQQF0ai8BAAwBCyADIARqLQAAC0H//wNxENUCIQULIAAgARATCyACQRBqJAAgBQveAQIBfgJ/IwBBEGsiAiQAAkAgACABQS4QLCIDRQRAIARBADYCAEKAgICA4AAhAQwBC0KAgICAMCEBAkAgAykDACIGQoCAgIBwg0KAgICAMFIEQCACIAMoAgwiBTYCDCAFIAanIgcoAgRB/////wdxSQ0BIAAgBhATIANCgICAgDA3AwALIARBATYCAAwBCyAHIAJBDGoQ7AEhCCADIAIoAgw2AgwgBEEANgIAIAhB//8DTQRAIAAgCBDVAiEBDAELIAAgByAFQQF0akEQakECEIwDIQELIAJBEGokACABC80KAwZ/BH4BfCMAQdACayIEJABCgICAgOAAIQogACADKQMAQQAQxQEiDEKAgICAcINCgICAgOAAUgRAAkAgACAMQe4AIAxBABAYIg1CgICAgHCDQoCAgIDgAFENACAEQRBqIgdBAEG4AvwLACAEQQA2AgggBEKAgICAoB83AwAgBEEIaiEIAkACQAJAA0BCgICAgOAAIQogACAMIA0gBEHMAmoQOSIBQoCAgIBwg0KAgICA4ABRDQQgBCgCzAJFBEAgAUIgiCILp0EIa0FuTQR+IAFCgICAgKCBgPz/AHwFIAtCAFINAyABp7e9CyIBQv////////8HgyEKAkACQCABQjSIp0H/D3EiAgRAIAJB/w9HDQECQAJAIApCAFINACAEKAIAIgJBA0YNACACQQFBAiABQgBTG0cNAQsgBEEDNgIADAULIAQgAUI/iKdBAWo2AgAMBAsgBCgCCCEDIApQRQRAQQAhAkEAIQUMAgsgBCADIANBASADGyABQgBTGzYCCAwDCyACQQFrIgNB//8DcUE4biICQUhsIANqQf//A3EhBSAKQoCAgICAgIAIhCEKIAQoAgghAwsgByACQQN0aiIGIAYpAwggCkE4IAVrrYgiC0IAIAt9IAFCAFkiCRt8NwMIIAYgBikDACAKIAWthkL//////////wCDIgFCACABfSAJG3w3AwAgBCADIAJBAmoiAiACIANIGzYCCCAEIAQoAgRBAWsiAjYCBCACDQEgBEH6ATYCBCAEEMcGDAELC0QAAAAAAADwfyEOAkACQAJAIAQoAgAOBAIFAAEFC0QAAAAAAADw/yEODAQLRAAAAAAAAPh/IQ4MAwsgBBDHBiAEKAIIIgNFBEBEAAAAAAAAAIAhDgwDCyADQR91IANxIQIDQCADQQBKBEAgCCADQQN0aikDAFAEQCADQQFrIQMMAgUgAyECDAQLAAsLIAINAUQAAAAAAAAAACEODAILIAAgARATIABBk88AQQAQFiAAIAxBARBEGgwCCyAHIAJBAWsiBUEDdGoiBikDACIBQoCAgICAgICAgH+DIQoCQAJAIAFCAFkNAEEAIQMgBUEAIAVBAEobIQVCASEBA0AgAyAFRkUEQCAHIANBA3RqIgggASAIKQMAfUL//////////wB8IgFC//////////8AgzcDACADQQFqIQMgAUI4iCEBDAELCyAGIAEgBikDAEJ/hXw3AwBBASACIAJBAEobIQMDQCACQQJIBEAgAyECDAILIAcgAkEDdGpBCGspAwBCAFINAiACQQFrIQIMAAsACyACQQFHDQBBASECIAQpAxAiAUL/////////B1YNACABIAqEvyEODAELIAJBOGwCQCAHIAJBAWsiA0EDdGopAwAiAXkiC6dBCGsiBUUNACABIAWthiEBIAJBAkgNACABIAQgAkEDdGopAwAiAULAACALfSILhyABQn8gC4ZCf4WDQgBSrYSEIQEgAkECayEDCyAFayEFAkAgA0EATCABQgeDQgRScg0AA0AgByADQQFrIgJBA3RqKQMAUARAIANBAkkgAiEDRQ0BDAILCyABQgGEIQELQU1BTCABIAFCA4hCAYN8QgN8QgOIIgFCgICAgICAgBBRGyAFaiICQf8PTgRAIApCgICAgICAgPj/AIS/IQ4MAQsgAUL/////////B4MgAq1CNIaEIAqEvyEOC0KAgICA4H4gDr0iAUKAgICAoIGA/P8AfSABQv///////////wCDQoCAgICAgID4/wBWGyEKCyAAIAwQEyAAIA0QEwsgBEHQAmokACAKCzgAIwBBEGsiAiQAIAAgAkEMaiADKQMAEIABIQAgAigCDCEDIAJBEGokAEKAgICA4AAgA2etIAAbC1AAIwBBEGsiAiQAQoCAgIDgACEBAkAgACACQQxqIAMpAwAQgAENACAAIAJBCGogAykDCBCAAQ0AIAIoAgggAigCDGytIQELIAJBEGokACABCwYAIAC2uwsKACAAEMoCEPUBC38AIAAgACkD4AEiAUIMiCABhSIBQhmGIAGFIgFCG4ggAYUiATcD4AFCgICAgOB+IAFCnbqz+5SS/aIlfkIMiEKAgICAgICA+D+Ev0QAAAAAAADwv6C9IgFCgICAgKCBgPz/AH0gAUL///////////8Ag0KAgICAgICA+P8AVhsLogQDBHwEfwR+IwBBEGsiCSQAIAlCADcDCAJAAkAgAkEATA0AQoCAgIDgACEBIAAgCUEIaiADKQMAEEgNAUEBIQogCSsDCCEEIAJBAUcEQANAIAIgCkYNAiAAIAkgAyAKQQN0aikDABBIDQMgCkEBaiEKIAkrAwAhBSMAQSBrIggkAAJAIASZIgcgBZkiBiAHvSAGvVQiCxsiBL0iDEI0iCINQv8PUQ0AIAYgByALGyEFAkAgDFANACAFvSIOQjSIIg9C/w9RDQAgD6cgDadrQcEATgRAIAcgBqAhBAwCCwJ8IA5CgICAgICAgPDfAFoEQCAERAAAAAAAADAUoiEEIAVEAAAAAAAAMBSiIQVEAAAAAAAAsGsMAQtEAAAAAAAA8D8gDEL/////////5yNWDQAaIAREAAAAAAAAsGuiIQQgBUQAAAAAAACwa6IhBUQAAAAAAAAwFAsgCEEYaiAIQRBqIAUQlwYgCEEIaiAIIAQQlwYgCCsDACAIKwMQoCAIKwMIoCAIKwMYoJ+iIQQMAQsgBSEECyAIQSBqJAAMAAsACyAEmSEECwJAIAREAADA////30FlIAREAAAAAAAA4MFmcUUEQCAEvSEBDAELIAS9IgEgBPwCIgC3vVINACAArSEBDAELQoCAgIDgfiABQoCAgICggYD8/wB9IAS9Qv///////////wCDQoCAgICAgID4/wBWGyEBCyAJQRBqJAAgAQtOACAAIABEAAAAAAAA8L9EAAAAAAAA8D8gAEQAAAAAAAAAAGMbIAC9Qv///////////wCDQoCAgICAgID4/wBWGyAARAAAAAAAAAAAYRsLQwACfCABvUL///////////8Ag0KAgICAgICA+P8AWgRARAAAAAAAAPh/IACZRAAAAAAAAPA/YQ0BGgsgACABEKEECwsLACAAIAEQqQIQLwt9AgF+AX8gAL0iAUI0iKdB/w9xIgJB/gdNBEAgAkH+B0cgAUKAgICAgICA8L9/UXJFBEBEAAAAAAAA8D8gAKYPCyABQoCAgICAgICAgH+Dvw8LIAJBsghNBHwgAUI/hyABfEIBQbMIIAJrrYYiAUIBiHxCACABfYO/BSAACwuHBQMCfAV/AX4jAEEQayIJJAACfkKAgICA4P7/+/8AQoCAgIDg/v97IAQbIAJFDQAaAkACfCADKQMAIgFC/////w9YBEBBASACIAJBAUwbIQogAachCEEBIQcDQCAHIApHBEAgCLcgAyAHQQN0aikDACIBQoCAgIAQWg0DGiAIIAGnIgsgCCALShsgCCALIAggC0gbIAQbIQggB0EBaiEHDAELCyAIrQwDCyAAIAlBCGogARBIDQFBASEHIAkrAwgLIQUgByACIAIgB0gbIQIDQCACIAdHBEAgACAJIAMgB0EDdGopAwAQSA0CAkAgBb0iDEL///////////8Ag0KAgICAgICA+P8AVg0AIAkrAwAiBr0iAUL///////////8Ag0KAgICAgICA+P8AVgRAIAYhBQwBCyAFRAAAAAAAAAAAYSAGRAAAAAAAAAAAYXEhCiAEBEAgCgRAIAEgDIO/IQUMAgsgBSAFIAalIAa9Qv///////////wCDQoCAgICAgID4/wBWGyAGIAW9Qv///////////wCDQoCAgICAgID4/wBYGyEFDAELIAoEQCABIAyEvyEFDAELIAUgBSAGpCAGvUL///////////8Ag0KAgICAgICA+P8AVhsgBiAFvUL///////////8Ag0KAgICAgICA+P8AWBshBQsgB0EBaiEHDAELCwJAIAVEAADA////30FlIAVEAAAAAAAA4MFmcUUEQCAFvSEBDAELIAW9IgEgBfwCIgC3vVINACAArQwCC0KAgICA4H4gAUKAgICAoIGA/P8AfSAFvUL///////////8Ag0KAgICAgICA+P8AVhsMAQtCgICAgOAACyAJQRBqJAALLQBCgICAgOAAIAAgAykDACADKQMIQQAQmAIiAEEAR61CgICAgBCEIABBAEgbC6EBAQN+IAMpAwAiBSEEIAJBBE4EQCADKQMYIQQLIAVC/////29YBEAgABAlQoCAgIDgAA8LIAMpAxAhAUKAgICA4AAhBgJAIAAgAykDCBAxIgJFDQAgAUKAgICA8H5aBEAgAaciAyADKAIAQQFqNgIACyAAIAUgAiABIARBABChASEDIAAgAhAZIANBAEgNACADQQBHrUKAgICAEIQhBgsgBguQAQACQAJAIAMpAwAiAUL/////b1gEQCAEBEAgABAlDAMLIAFCgICAgPB+VA0BIAGnIgAgACgCAEEBajYCACABDwsgACABEP0CIgJBAEgNASAEBEAgAkEAR61CgICAgBCEDwsgAkUEQCAAQZ3xAEEAEBYMAgsgAaciACAAKAIAQQFqNgIACyABDwtCgICAgOAACyoAIAMpAwAiAUL/////b1gEQCAAECVCgICAgOAADwsgACABQQNBABC3AgtPAAJAAkAgAykDACIBQv////9vWARAIARFBEBCgICAgBAPCyAAECUMAQsgACABEJwBIgBBAE4NAQtCgICAgOAADwsgAEEAR61CgICAgBCEC2MBAX4gAykDACIEQv////9vWARAIAAQJUKAgICA4AAPC0KAgICA4AAhAQJAIAAgAykDCBAxIgJFDQAgACAEIAIQSyEDIAAgAhAZIANBAEgNACADQQBHrUKAgICAEIQhAQsgAQs8ACADKQMAIgFC/////29WIARFIAFCgICAgGCDQoCAgIAgUnFyRQRAIAAQJUKAgICA4AAPCyAAIAEQ3AELXwECfgJAAkAgAykDACIBQv////9vWARAIAAQJQwBCyADKQMIIQUgASEEIAJBA04EQCADKQMQIQQLIAAgBRAxIgINAQtCgICAgOAADwsgACABIAIgBEEAEBggACACEBkLZgEBfiADKQMAIgRC/////29YBEAgABAlQoCAgIDgAA8LQoCAgIDgACEBAkAgACADKQMIEDEiAkUNACAAIAQgAkEAENoBIQMgACACEBkgA0EASA0AIANBAEetQoCAgIAQhCEBCyABC44BAQJ+IAMpAwAiAUL/////b1gEQCAAECVCgICAgOAADwsgAykDECEGQoCAgIDgACEFAkAgACADKQMIEDEiAkUNACAAIAEgAiAGQQBBgIABIAQbEMkGIQMgACACEBkgA0EASA0AIAQEQCADQQBHrUKAgICAEIQPCyABpyIAIAAoAgBBAWo2AgAgASEFCyAFC5gBAgF/An4jAEEQayIEJAAgAykDCCEFIAMpAwAiBiEBAkACQAJAAkAgAkEDSA0AIAMpAxAiAUKAgICAcFoEQCABpy0ABUEQcQ0BCyAAIAEQlgIMAQsgACAEQQxqIAUQlwQiAg0BC0KAgICA4AAhAQwBCyAAIAYgASAEKAIMIgMgAhDSAiEBIAAgAiADEKcDCyAEQRBqJAAgAQsVACAAIAMpAwAgAyADQQhqQQIQqQMLZwEBfiADKQMAIgFCgICAgHCDQoCAgICAf1IEQCAAQaPeAEEAEBZCgICAgOAADwtCgICAgDAhBCABpyIAKAIIQf////97TAR+IAAgACgCAEEBajYCACABQoCAgICQf4QFQoCAgIAwCws8AQF+QoCAgIDgACEBIAAgAykDABAoIgRCgICAgHCDQoCAgIDgAFIEfiAAIASnQQIQkQQFQoCAgIDgAAsLVgIBfgF/IAAgARDJBCIBQoCAgIBwg0KAgICA4ABRBEAgAQ8LQoCAgIAwIQIgAaciAygCBEGAgICAeEcEQCAAIAAoAhAgAxCzARAzIQILIAAgARATIAILCQAgACABEMkECzoCAX8BfCMAQRBrIgIkACACQoCAgICAgID8/wA3AwggACACQQhqIAEpAwAQSBogAisDCCACQRBqJAALWwEBfiMAQRBrIgIkACACIAAgARDJBCIBNwMIAkAgAUKAgICAcINCgICAgOAAUQRAIAEhBAwBCyAAQoCAgIAwQQEgAkEIahCTBSEEIAAgARATCyACQRBqJAAgBAucBAICfwF+AkACQAJAAkACQAJAIAFCgICAgHBaBEAgAaciAi8BBkEwRg0BCyAEQQE2AgAMAQsgAigCICEGIARBATYCACAGDQELIABB98UAQQAQFgwBCwJAAkACQAJAAkACQCAGKAIAIgdBAWsOBAEBBQQACyAFDQJBACEDIAYoAgQiBSECDAELIAYoAgQhAiADKQMAIgFCgICAgPB+WgRAIAGnIgMgAygCAEEBajYCAAsCQCAFQQJHDQBBASEDIAdBAUcNACAAIAEQigEgBigCBCEFDAELIAIoAmAiAyAFrTcDACADQQhrIAE3AwAgAiADQQhqNgJgQQAhAyACIQULIAUgAzYCHCAGQQM2AgAgACAFEMECIQEgBkEBNgIAIAYoAgQoAiAEQCAAKAIQIAYQigMgAQ8LIAFCgICAgBBaDQUgAigCYEEIayIAKQMAIQggAEKAgICAMDcDACABQgJRBEAgBkECNgIAIARBAjYCACAIDwsgBEEANgIAIAgPCyAAKAIQIAYQigMLQoCAgIAwIQECQAJAIAVBAWsOAgABBAsgAykDACIBQoCAgIDwflQNAyABpyIAIAAoAgBBAWo2AgAgAQ8LIAMpAwAiAUKAgICA8H5aBEAgAaciAiACKAIAQQFqNgIACyAAIAEQigEMAQsgAEHVxQBBABAWC0KAgICA4AAhAQsgAQ8LQdSXAUHfkAFBt6ABQckmEAAAC5YDAgN+BX8jAEEQayICJABCgICAgOAAIQECQCAAIAJBCGogAykDABCsAQ0AIAMpAwgiBUKAgICA8H5aBEAgBaciAyADKAIAQQFqNgIACyAAIAUQvQUiBUKAgICAcIMiB0KAgICA4ABRDQAgAikDCCIGUARAIAAgBRATQoCAgIDwACEBDAELAkACQCAHQoCAgIDwAFEEQCAGQh9WDQEgBcRCwAAgBn0iAYYiBSABhyAFIAGIIAQbQv////8Pg0KAgICA8ACEIQEMAwsgBiAFpyIIKAIEQQV0rVQNAQsgBSEBDAELIAAgBkIffEIFiKciAxBZIgpFBEAgACAFEBMMAQsgCiADNgIEIApBCGohCSAIQQhqIQggA0EBayELQQAhAwNAIAMgC0ZFBEAgCSADQQJ0IgxqIAggDGooAgA2AgAgA0EBaiEDDAELCyAJIAtBAnQiA2ogAyAIaigCAEEAIAanayIDdCIJIAN1IAkgA3YgBBs2AgAgACAKEPsBIQMgACAFEBMgACADEMIBIQELIAJBEGokACABCwkAIAAgARDLBgtwAgF+AX8gACABEMsGIgFCgICAgHCDQoCAgIDgAFEEQCABDwtBCiEFAn4CQCACRQ0AIAMpAwAiBEKAgICAcINCgICAgDBRDQAgACAEEMoGIgVBAE4NAEKAgICA4AAMAQsgACABIAUQ9wULIAAgARATC4ACAgN/AXwjAEFAaiIEJAAgBEEAQTj8CwAgBEKAgICAgICA+D83AxACfkKAgICA4H4gAkUNABpBByACQQAgAkEAShsiAiACQQdOGyEGAkADQCAFIAZGDQEgBUEDdCECIAVBAWohBSAAIAIgBGogAiADaikDABBIRQ0AC0KAgICA4AAMAQsCQCAEQQAQ0wYiB0QAAAAAAADgwWYgB0QAAMD////fQWVxRQRAIAe9IQEMAQsgB70iASAH/AIiALe9Ug0AIACtDAELQoCAgIDgfiABQoCAgICggYD8/wB9IAe9Qv///////////wCDQoCAgICAgID4/wBWGwsgBEFAayQAC3YBAX4CfgJAIAFEAADA////30FlIAFEAAAAAAAA4MFmcUUEQCABvSECDAELIAG9IgIgAfwCIgC3vVINACAArQwBC0KAgICA4H4gAkKAgICAoIGA/P8AfSABvUL///////////8Ag0KAgICAgICA+P8AVhsLEC8LVgAQ1QYiAUKAgICACHxC/////w9YBEAgAUL/////D4MPC0KAgICA4H4gAbm9IgFCgICAgKCBgPz/AH0gAUL///////////8Ag0KAgICAgICA+P8AVhsL7wEBA34jAEEQayICJABCgICAgOAAIQUCQCAAIAAgARAmIgFBARDZAiIGQoCAgIBwg0KAgICA4ABRDQAgBkIgiCIEUEUgBKdBCWpBEUlxRQRAIAAgAkEIaiAGEEhBAEgNAUKAgICAICEFIAIpAwhCgICAgICAgPj/AINCgICAgICAgPj/AFENAQtCgICAgOAAIQUgACABQYPpABCnAiIEQoCAgIBwg0KAgICA4ABRDQAgACAEEDBFBEAgAEHegwFBABAWIAAgBBATDAELIAAgBCABQQBBABA9IQULIAAgARATIAAgBhATIAJBEGokACAFC5kCAwF8AX4BfyMAQRBrIgIkAEKAgICA4AAhBQJAIAAgAkEIaiIGIAEQ6gINACAAIAYgAykDABBIDQAgAgJ+IAIrAwgiBL1C////////////AINC//////////f/AFgEQCAEnSIERAAAAAAAsJ1AoCAEIAREAAAAAAAAWUBjGyAEIAREAAAAAAAAAABmGyEECwJAIAREAADA////30FlIAREAAAAAAAA4MFmcUUEQCAEvSEFDAELIAS9IgUgBPwCIgO3vVINACADrQwBC0KAgICA4H4gBUKAgICAoIGA/P8AfSAEvUL///////////8Ag0KAgICAgICA+P8AVhsLNwMAIAAgAUEBIAJBERDQBiEFCyACQRBqJAAgBQt1AwF+AX8BfCMAQRBrIgIkAEKAgICA4AAhBAJAIAAgAkEIaiIFIAEQ6gINACAAIAUgAykDABBIDQAgACABIAIrAwgiBp1EAAAAAAAAAACgRAAAAAAAAPh/IAaZRAAA3MIIsj5DZRsQ0QYhBAsgAkEQaiQAIAQL4AEBAXwjAEHQAGsiAiQAAn5CgICAgOAAIAAgASACIARBD3FBABDOBCIAQQBIDQAaQoCAgIDgfiAARQ0AGiAEQYACcQRAIAIgAisDAEQAAAAAALCdwKA5AwALAkAgAiAEQQR2QQ9xQQN0aisDACIFRAAAAAAAAODBZiAFRAAAwP///99BZXFFBEAgBb0hAQwBCyAFvSIBIAX8AiIAt71SDQAgAK0MAQtCgICAgOB+IAFCgICAgKCBgPz/AH0gBb1C////////////AINCgICAgICAgPj/AFYbCyACQdAAaiQAC2ABAXwjAEEQayICJAACfkKAgICA4AAgACACQQhqIAEQ6gINABpCgICAgOB+IAIrAwgiBL1C////////////AINCgICAgICAgPj/AFYNABogBJ38BhDNBK0LIAJBEGokAAuEAQEBfgJAIAFC/////29YBEAgABAlDAELAkAgAykDACIEQiCIQvv///8PfUJ+VA0AIAAgBBAxIgJFDQEgACACEBlBESEDAkACQAJAIAJBygBrDgYCAwEDAwIACyACQRZHDQILQRAhAwsgACABIAMQ2QIPCyAAQcYtQQAQFgtCgICAgOAACxwAIABCgICAgDAgAq1BAEETIAFBK0EAEKoCEC8LnwEBAXwjAEEQayICJAACfkKAgICA4AAgACACQQhqIAEQ6gINABoCQCACKwMIIgRE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cmVhZCBvbmx5IHByb3BlcnR5AHByb3h5OiBjYW5ub3Qgc2V0IHByb3BlcnR5AG5vIHNldHRlciBmb3IgcHJvcGVydHkAdmFsdWUgaGFzIG5vIHByb3BlcnR5AGNvdWxkIG5vdCBkZWxldGUgcHJvcGVydHkAcHJveHk6IGR1cGxpY2F0ZSBwcm9wZXJ0eQBoYXNPd25Qcm9wZXJ0eQBwcm94eTogaW5jb25zaXN0ZW50IGRlbGV0ZVByb3BlcnR5AHByb3h5OiBpbmNvbnNpc3RlbnQgZGVmaW5lUHJvcGVydHkASlNfRGVmaW5lUHJvcGVydHkAbXItPmVtcHR5AEluZmluaXR5AEZpbmFsaXphdGlvblJlZ2lzdHJ5AG91dCBvZiBtZW1vcnkAdW5rbm93biB1bmljb2RlIGdlbmVyYWwgY2F0ZWdvcnkAR2VuZXJhbF9DYXRlZ29yeQBldmVyeQBhbnkAYXBwbHkAJyVzJyBpcyByZWFkLW9ubHkAZXhwZWN0aW5nIGNhdGNoIG9yIGZpbmFsbHkAc3RpY2t5AHN0cmluZ2lmeQBpbnZhbGlkIHZhbHVlIHVzZWQgYXMgJXMga2V5AGludmFsaWQgdmFsdWUgdXNlZCBhcyBXZWFrTWFwIGtleQBkdXBsaWNhdGUgd2l0aCBrZXkAc3ViYXJyYXkAZW1wdHkgYXJyYXkAbm9uIGludGVnZXIgaW5kZXggaW4gdHlwZWQgYXJyYXkAbmVnYXRpdmUgaW5kZXggaW4gdHlwZWQgYXJyYXkAb3V0LW9mLWJvdW5kIGluZGV4IGluIHR5cGVkIGFycmF5AGNhbm5vdCBjcmVhdGUgbnVtZXJpYyBpbmRleCBpbiB0eXBlZCBhcnJheQBpbnZhbGlkIHR5cGVkIGFycmF5AGlzQXJyYXkAdG9BcnJheQBub3QgYSBUeXBlZEFycmF5AGdldERheQBnZXRVVENEYXkAZ3JvdXBCeQBjIDwgcmFkaXgAbS0+ZGZzX2FuY2VzdG9yX2luZGV4IDw9IG0tPmRmc19pbmRleABqc19nZXRfYXRvbV9pbmRleABpbnZhbGlkIGFycmF5IGluZGV4AEpTX0F0b21Jc0FycmF5SW5kZXgAZmluZExhc3RJbmRleABmaW5kSW5kZXgAaW52YWxpZCBleHBvcnQgc3ludGF4AGludmFsaWQgYXNzaWdubWVudCBzeW50YXgAbWF4AFx1JTA0eABceCUwMngAaW52YWxpZCBvcGNvZGU6IHBjPSV1IG9wY29kZT0weCUwMngALSsgICAwWDB4AC0wWCswWCAwWC0weCsweCAweABsaW5lIHRlcm1pbmF0b3Igbm90IGFsbG93ZWQgYWZ0ZXIgdGhyb3cAZ3JvdwBwb3cAbm93AHN0YWNrIG92ZXJmbG93AGpzX3dlYWtyZWZfbmV3AG11c3QgYmUgY2FsbGVkIHdpdGggbmV3AGlzVmlldwBub3QgYSBEYXRhVmlldwByYXcAJXUAY2xhc3MgZGVjbGFyYXRpb25zIGNhbid0IGFwcGVhciBpbiBzaW5nbGUtc3RhdGVtZW50IGNvbnRleHQAZnVuY3Rpb24gZGVjbGFyYXRpb25zIGNhbid0IGFwcGVhciBpbiBzaW5nbGUtc3RhdGVtZW50IGNvbnRleHQAbGV4aWNhbCBkZWNsYXJhdGlvbnMgY2FuJ3QgYXBwZWFyIGluIHNpbmdsZS1zdGF0ZW1lbnQgY29udGV4dABkdXBsaWNhdGUgYXJndW1lbnQgbmFtZXMgbm90IGFsbG93ZWQgaW4gdGhpcyBjb250ZXh0AGR1cGxpY2F0ZSBwYXJhbWV0ZXIgbmFtZXMgbm90IGFsbG93ZWQgaW4gdGhpcyBjb250ZXh0AGltcG9ydC5tZXRhIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBjb250ZXh0AEpTX0ZyZWVDb250ZXh0AEpTQ29udGV4dABqc19tYXBfaXRlcmF0b3JfbmV4dABqc19nZW5lcmF0b3JfbmV4dABzdHJpbmdfcm9wZV9pdGVyX25leHQAanNfYXN5bmNfZ2VuZXJhdG9yX3Jlc3VtZV9uZXh0AFVuZXhwZWN0ZWQgZW5kIG9mIEpTT04gaW5wdXQAdHQAZXhwb3J0ZWQgdmFyaWFibGUgJyVzJyBkb2VzIG5vdCBleGlzdABwcml2YXRlIGNsYXNzIGZpZWxkICclcycgZG9lcyBub3QgZXhpc3QAcmVfZW1pdF9zdHJpbmdfbGlzdAB0ZXN0AGFzc2lnbm1lbnQgcmVzdCBwcm9wZXJ0eSBtdXN0IGJlIGxhc3QAcHZhbCA9PSBsYXN0AGZpbmRMYXN0AHNxcnQAc29ydAB4cG9ydABtcG9ydABnZXRPckluc2VydABjYnJ0AHRyaW1TdGFydABwYWRTdGFydAB1bmtub3duIHVuaWNvZGUgc2NyaXB0AFNjcmlwdABoeXBvdABmcmVlX3plcm9fcmVmY291bnQAZmFzdF9hcnJheV9jb3VudABiaW5hcnlfb2JqZWN0X2NvdW50AHN0cl9pbmRleCA9PSBudW1fa2V5c19jb3VudCArIHN0cl9rZXlzX2NvdW50AG51bV9pbmRleCA9PSBudW1fa2V5c19jb3VudABzdHJfY291bnQAY29tcHV0ZV9yZWdpc3Rlcl9jb3VudABwcm9wX2NvdW50AHN5bV9pbmRleCA9PSBhdG9tX2NvdW50AGxhYmVsID49IDAgJiYgbGFiZWwgPCBzLT5sYWJlbF9jb3VudABsYWIxID49IDAgJiYgbGFiMSA8IHMtPmxhYmVsX2NvdW50AG9ial9jb3VudAB2YXJfcmVmX2lkeCA8IGItPnZhcl9yZWZfY291bnQAdmFsIDwgcy0+Y2FwdHVyZV9jb3VudAB2YWwyIDwgcy0+Y2FwdHVyZV9jb3VudABzaGFwZV9jb3VudABqc19mdW5jX3BjMmxpbmVfY291bnQAbWVtb3J5X3VzZWRfY291bnQAbWFsbG9jX2NvdW50AGpzX2Z1bmNfY291bnQAY19mdW5jX2NvdW50AGludmFsaWQgcmVwZWF0IGNvdW50AGludmFsaWQgcmVwZXRpdGlvbiBjb3VudABmb250AGludmFsaWQgY29kZSBwb2ludABmcm9tQ29kZVBvaW50AGludmFsaWQgaGludABjYW5ub3QgY29udmVydCB0byBiaWdpbnQAcHJpdmF0ZSBtZXRob2QgaXMgYWxyZWFkeSBwcmVzZW50AEJpZ0ludCBuZWdhdGl2ZSBleHBvbmVudABlbmNvZGVVUklDb21wb25lbnQAZGVjb2RlVVJJQ29tcG9uZW50AHVuZXhwZWN0ZWQgZW5kIG9mIGNvbW1lbnQAaW52YWxpZCBzd2l0Y2ggc3RhdGVtZW50AGNhbm5vdCBjb252ZXJ0IE5hTiBvciBJbmZpbml0eSB0byBCaWdJbnQAY2Fubm90IGNvbnZlcnQgdG8gQmlnSW50AG5vdCBhIEJpZ0ludABEbyBub3Qga25vdyBob3cgdG8gc2VyaWFsaXplIGEgQmlnSW50AHBhcnNlSW50AGR1cGxpY2F0ZSBkZWZhdWx0AG1hbGxvY19saW1pdABzcGxpdABleHBlY3RpbmcgaGV4IGRpZ2l0AHRyaW1SaWdodAByZWR1Y2VSaWdodAB1bnNoaWZ0AHRyaW1MZWZ0AGludmFsaWQgb2Zmc2V0AGludmFsaWQgYnl0ZU9mZnNldABnZXRUaW1lem9uZU9mZnNldAByZXNvbHZpbmcgZnVuY3Rpb24gYWxyZWFkeSBzZXQAcHJveHk6IGluY29uc2lzdGVudCBzZXQAZmluZF9qdW1wX3RhcmdldABleHBlY3RpbmcgdGFyZ2V0AGludmFsaWQgZGVzdHJ1Y3R1cmluZyB0YXJnZXQAaGVsZCB2YWx1ZSBjYW5ub3QgYmUgdGhlIHRhcmdldABpbnZhbGlkIHRhcmdldABwcm94eTogaW5jb25zaXN0ZW50IGdldABXZWFrU2V0AGNvbnN0cnVjdABKU19GcmVlQXRvbVN0cnVjdAB1c2Ugc3RyaWN0AFJlZmxlY3QAcmVqZWN0AEl0ZXJhdG9yLmZyb20gY2FsbGVkIG9uIG5vbi1vYmplY3QAbm90IGFuIEFzeW5jR2VuZXJhdG9yIG9iamVjdABjYW5ub3QgY29udmVydCB0byBvYmplY3QAaW52YWxpZCBicmFuZCBvbiBvYmplY3QAb3BlcmFuZCAncHJvdG90eXBlJyBwcm9wZXJ0eSBpcyBub3QgYW4gb2JqZWN0AGl0ZXJhdG9yIG11c3QgcmV0dXJuIGFuIG9iamVjdABvcHRpb25zIG11c3QgYmUgYW4gb2JqZWN0AG9wdGlvbnMud2l0aCBtdXN0IGJlIGFuIG9iamVjdABub3QgYSBEYXRlIG9iamVjdABNb2R1bGUgY29kZSBjb21waWxlZCB0byBub24tbW9kdWxlIG9iamVjdABub3QgYSBvYmplY3QASlNPYmplY3QAcGFyc2VGbG9hdABmbGF0AG5vdGhpbmcgdG8gcmVwZWF0AGNvbmNhdABJdGVyYXRvciBDb25jYXQAY29kZVBvaW50QXQAY2hhckF0AGNoYXJDb2RlQXQAa2V5cwBwcm94eTogdGFyZ2V0IHByb3BlcnR5IG11c3QgYmUgcHJlc2VudCBpbiBwcm94eSBvd25LZXlzACAgZmFzdCBhcnJheXMAZXhwb3J0ICclcycgaW4gbW9kdWxlICclcycgaXMgYW1iaWd1b3VzAHByaXZhdGUgY2xhc3MgZmllbGQgJyVzJyBhbHJlYWR5IGV4aXN0cwB0b28gbWFueSBhcmd1bWVudHMAVG9vIG1hbnkgY2FsbCBhcmd1bWVudHMAZmFzdF9hcnJheV9lbGVtZW50cwB0b28gbWFueSBlbGVtZW50cwAgIGVsZW1lbnRzAGludmFsaWQgbnVtYmVyIG9mIGRpZ2l0cwB1bmljb2RlU2V0cwBiaW5hcnkgb2JqZWN0cwBpbnZhbGlkIHByb3BlcnR5IGFjY2VzcwBqc19vcF9kZWZpbmVfY2xhc3MAZmQtPmJ5dGVfY29kZS5idWZbZGVmaW5lX2NsYXNzX3Bvc10gPT0gT1BfZGVmaW5lX2NsYXNzAHVuc3VwcG9ydGVkIG9iamVjdCBjbGFzcwBzZXRIb3VycwBnZXRIb3VycwBzZXRVVENIb3VycwBnZXRVVENIb3VycwBnYXRoZXJfYXZhaWxhYmxlX2FuY2VzdG9ycwBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzAHdpdGhSZXNvbHZlcnMAdG9vIG1hbnkgaW1icmljYXRlZCBxdWFudGlmaWVycwBpbnZhbGlkIG1vZGlmaWVycwByZXNpemFibGUgQXJyYXlCdWZmZXJzIG5vdCBzdXBwb3J0ZWQgZm9yIGV4dGVybmFsbHkgbWFuYWdlZCBidWZmZXJzAHVuaWNvZGVfcHJvcF9vcHMAYWNvcwBmb3IgYXdhaXQgaXMgb25seSB2YWxpZCBpbiBhc3luY2hyb25vdXMgZnVuY3Rpb25zAG5ldy50YXJnZXQgb25seSBhbGxvd2VkIHdpdGhpbiBmdW5jdGlvbnMAYnl0ZWNvZGUgZnVuY3Rpb25zAEMgZnVuY3Rpb25zAHByb3h5OiBpbmNvbnNpc3RlbnQgcHJldmVudEV4dGVuc2lvbnMAU2NyaXB0X0V4dGVuc2lvbnMAYXRvbXMAcHJveHk6IHByb3BlcnRpZXMgbXVzdCBiZSBzdHJpbmdzIG9yIHN5bWJvbHMAZ2V0T3duUHJvcGVydHlTeW1ib2xzAHJlc29sdmVfbGFiZWxzAEpTX0V2YWxUaGlzAG4gPD0gc2wtPm5fc3RyaW5ncwBtb2R1bGUgYXR0cmlidXRlIHZhbHVlcyBtdXN0IGJlIHN0cmluZ3MAaW52YWxpZCBkZXNjcmlwdG9yIGZsYWdzAGludmFsaWQgcmVndWxhciBleHByZXNzaW9uIGZsYWdzAHZhbHVlcwBzZXRNaW51dGVzAGdldE1pbnV0ZXMAc2V0VVRDTWludXRlcwBnZXRVVENNaW51dGVzAHRvbyBtYW55IGNhcHR1cmVzACAgc2hhcGVzAGdldE93blByb3BlcnR5TmFtZXMAZ2NfZnJlZV9jeWNsZXMAdW5zY29wYWJsZXMAYWRkX2V2YWxfdmFyaWFibGVzAHJlc29sdmVfdmFyaWFibGVzAHRvbyBtYW55IGxvY2FsIHZhcmlhYmxlcwB0b28gbWFueSBjbG9zdXJlIHZhcmlhYmxlcwBjb21wYWN0X3Byb3BlcnRpZXMAICBwcm9wZXJ0aWVzAGRlZmluZVByb3BlcnRpZXMAZW50cmllcwBmcm9tRW50cmllcwBzcGVjaWVzAHRvbyBtYW55IHJhbmdlcwBpbmNsdWRlcwBoYXNJbmRpY2VzAHNldE1pbGxpc2Vjb25kcwBnZXRNaWxsaXNlY29uZHMAc2V0VVRDTWlsbGlzZWNvbmRzAGdldFVUQ01pbGxpc2Vjb25kcwBzZXRTZWNvbmRzAGdldFNlY29uZHMAc2V0VVRDU2Vjb25kcwBnZXRVVENTZWNvbmRzAGl0YWxpY3MAYWJzAHByb3h5OiBpbmNvbnNpc3RlbnQgaGFzACUuKnMAICglcwBzZXQgJXMAZ2V0ICVzACAgICBhdCAlcwBjYW5ub3QgcmVhZCBwcm9wZXJ0eSBvZiAlcwB1bnN1cHBvcnRlZCBrZXl3b3JkOiAlcwBzdWJzdHIAcHJveHk6IGluY29uc2lzdGVudCBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IAc3VwZXIoKSBpcyBvbmx5IHZhbGlkIGluIGEgZGVyaXZlZCBjbGFzcyBjb25zdHJ1Y3RvcgBwYXJlbnQgY2xhc3MgbXVzdCBiZSBjb25zdHJ1Y3RvcgAlcyBpcyBub3QgYSBjb25zdHJ1Y3RvcgBlbXB0eSBpdGVyYXRvcgBjYW5ub3QgaW52b2tlIGEgcnVubmluZyBpdGVyYXRvcgBhc3luY0l0ZXJhdG9yAEFycmF5IEl0ZXJhdG9yAFNldCBJdGVyYXRvcgBNYXAgSXRlcmF0b3IAUmVnRXhwIFN0cmluZyBJdGVyYXRvcgBub3QgYW4gQXN5bmMtZnJvbS1TeW5jIEl0ZXJhdG9yAGNhbm5vdCBpbnZva2UgYSBydW5uaW5nIGdlbmVyYXRvcgBub3QgYSBnZW5lcmF0b3IAQXN5bmNHZW5lcmF0b3IAc3ludGF4IGVycm9yAGlzRXJyb3IAZmxvb3IAZm9udGNvbG9yAGFuY2hvcgBmb3IAa2V5Rm9yAGV4cGVjdGluZyBzdXJyb2dhdGUgcGFpcgB0bnZmcgBhIGRlY2xhcmF0aW9uIGluIHRoZSBoZWFkIG9mIGEgZm9yLSVzIGxvb3AgY2FuJ3QgaGF2ZSBhbiBpbml0aWFsaXplcgAnYXJndW1lbnRzJyBpZGVudGlmaWVyIGlzIG5vdCBhbGxvd2VkIGluIGNsYXNzIGZpZWxkIGluaXRpYWxpemVyAGludmFsaWQgbnVtYmVyIG9mIGFyZ3VtZW50cyBmb3IgZ2V0dGVyIG9yIHNldHRlcgBpbnZhbGlkIHNldHRlcgBpbnZhbGlkIGdldHRlcgB1bnJlZ2lzdGVyAGZpbHRlcgBtaXNzaW5nIGZvcm1hbCBwYXJhbWV0ZXIAInVzZSBzdHJpY3QiIG5vdCBhbGxvd2VkIGluIGZ1bmN0aW9uIHdpdGggZGVmYXVsdCBvciBkZXN0cnVjdHVyaW5nIHBhcmFtZXRlcgBpbnZhbGlkIGNoYXJhY3RlcgB1bmV4cGVjdGVkIGNoYXJhY3RlcgBCYWQgZXNjYXBlZCBjaGFyYWN0ZXIAcHJpdmF0ZSBjbGFzcyBmaWVsZCBmb3JiaWRkZW4gYWZ0ZXIgc3VwZXIASXRlcmF0b3IgSGVscGVyAGludmFsaWQgcmVkZWZpbml0aW9uIG9mIGxleGljYWwgaWRlbnRpZmllcgAnbGV0JyBpcyBub3QgYSB2YWxpZCBsZXhpY2FsIGlkZW50aWZpZXIAaW52YWxpZCByZWRlZmluaXRpb24gb2YgZ2xvYmFsIGlkZW50aWZpZXIAeWllbGQgaXMgYSByZXNlcnZlZCBpZGVudGlmaWVyACclcycgaXMgYSByZXNlcnZlZCBpZGVudGlmaWVyAG90aGVyAGF0b20xX2lzX2ludGVnZXIgJiYgYXRvbTJfaXNfaW50ZWdlcgBjYW5ub3QgY29udmVydCB0byBCaWdJbnQ6IG5vdCBhbiBpbnRlZ2VyAGlzSW50ZWdlcgBpc1NhZmVJbnRlZ2VyAHRyYW5zZmVyAGludmFsaWQgYXJyYXkgYnVmZmVyAHJlYWQgYWZ0ZXIgdGhlIGVuZCBvZiB0aGUgYnVmZmVyAEpTX1dyaXRlU2hhcmVkQXJyYXlCdWZmZXIAZGV0YWNoZWQgY2FsbGVkIG9uIFNoYXJlZEFycmF5QnVmZmVyAGNhbm5vdCB0cmFuc2ZlciBhIFNoYXJlZEFycmF5QnVmZmVyAGNhbm5vdCB1c2UgaWRlbnRpY2FsIEFycmF5QnVmZmVyAGNhbm5vdCBjb252ZXJ0IGJpZ2ludCB0byBudW1iZXIAY2Fubm90IGNvbnZlcnQgc3ltYm9sIHRvIG51bWJlcgBVbnRlcm1pbmF0ZWQgZnJhY3Rpb25hbCBudW1iZXIAVW5leHBlY3RlZCBudW1iZXIALnNpemUgaXMgbm90IGEgbnVtYmVyAEV4cG9uZW50IHBhcnQgaXMgbWlzc2luZyBhIG51bWJlcgBjb2x1bW5OdW1iZXIAbGluZU51bWJlcgBqc19jbG9zdXJlX2dsb2JhbF92YXIAanNfY2xvc3VyZV9kZWZpbmVfZ2xvYmFsX3ZhcgBqc19nbG9iYWxfb2JqZWN0X2dldF91bmluaXRpYWxpemVkX3ZhcgBqc19nbG9iYWxfb2JqZWN0X2ZpbmRfdW5pbml0aWFsaXplZF92YXIAbWFsZm9ybWVkIHVuaWNvZGUgY2hhcgBjbGVhcgBzZXRZZWFyAGdldFllYXIAc2V0RnVsbFllYXIAZ2V0RnVsbFllYXIAc2V0VVRDRnVsbFllYXIAZ2V0VVRDRnVsbFllYXIAZXhwZWN0aW5nICd7JyBhZnRlciBccQB1bmV4cGVjdGVkIGxpbmUgdGVybWluYXRvciBpbiByZWdleHAAdW5leHBlY3RlZCBlbmQgb2YgcmVnZXhwAFJlZ0V4cABzdXAAaW52YWxpZCBncm91cABkcm9wAHBvcABjb250aW51ZSBtdXN0IGJlIGluc2lkZSBsb29wAG51bV9rZXlzX2NtcABtYXAAZmxhdE1hcABXZWFrTWFwAGV4cGVjdGluZyAneycgYWZ0ZXIgXHAAbG9nMXAAQmlnSW50IGRpdmlzaW9uIGJ5IHplcm8AdW5rbm93bgBoYXNPd24AcmV0dXJuAHByb21pc2Ugc2VsZiByZXNvbHV0aW9uAG91dCBvZiBtZW1vcnkgaW4gcmVnZXhwIGV4ZWN1dGlvbgBkZXNjcmlwdGlvbgAhbS0+ZXZhbF9oYXNfZXhjZXB0aW9uACFtb2R1bGUtPmV2YWxfaGFzX2V4Y2VwdGlvbgBwcm94eTogZGVmaW5lUHJvcGVydHkgZXhjZXB0aW9uAGpzX2FzeW5jX2dlbmVyYXRvcl9yZXNvbHZlX2Z1bmN0aW9uAGpzX2NyZWF0ZV9mdW5jdGlvbgAua2V5cyBpcyBub3QgYSBmdW5jdGlvbgAuaGFzIGlzIG5vdCBhIGZ1bmN0aW9uAHNldC9hZGQgaXMgbm90IGEgZnVuY3Rpb24AcmV0dXJuIG5vdCBpbiBhIGZ1bmN0aW9uAGFyZ3VtZW50IG11c3QgYmUgYSBmdW5jdGlvbgBBc3luY0dlbmVyYXRvckZ1bmN0aW9uAEFzeW5jRnVuY3Rpb24AaW50ZXJzZWN0aW9uAGpzX2lubmVyX21vZHVsZV9ldmFsdWF0aW9uACFtLT5hc3luY19ldmFsdWF0aW9uAG1vZHVsZS0+YXN5bmNfZXZhbHVhdGlvbgBhd2FpdCBpbiBkZWZhdWx0IGV4cHJlc3Npb24AeWllbGQgaW4gZGVmYXVsdCBleHByZXNzaW9uAGludmFsaWQgY2hhcmFjdGVyIGluIGNsYXNzIGluIHJlZ3VsYXIgZXhwcmVzc2lvbgBpbnZhbGlkIGNsYXNzIHNldCBvcGVyYXRpb24gaW4gcmVndWxhciBleHByZXNzaW9uAGludmFsaWQgb3BlcmF0aW9uIGluIHJlZ3VsYXIgZXhwcmVzc2lvbgBpbnZhbGlkIGRlY2ltYWwgZXNjYXBlIGluIHJlZ3VsYXIgZXhwcmVzc2lvbgBiYWNrIHJlZmVyZW5jZSBvdXQgb2YgcmFuZ2UgaW4gcmVndWxhciBleHByZXNzaW9uAGludmFsaWQgZXNjYXBlIHNlcXVlbmNlIGluIHJlZ3VsYXIgZXhwcmVzc2lvbgBleHBlY3RlZCAnb2YnIG9yICdpbicgaW4gZm9yIGNvbnRyb2wgZXhwcmVzc2lvbgB0b28gY29tcGxpY2F0ZWQgZGVzdHJ1Y3R1cmluZyBleHByZXNzaW9uAGV4cGVjdGVkICd9JyBhZnRlciB0ZW1wbGF0ZSBleHByZXNzaW9uAHRvUHJlY2lzaW9uAHVuaW9uAGFzaW4Aam9pbgBtaW4AY29weVdpdGhpbgB0ZW1wbGF0ZSBsaXRlcmFsIGNhbm5vdCBhcHBlYXIgaW4gYW4gb3B0aW9uYWwgY2hhaW4AbmV3IGtleXdvcmQgY2Fubm90IGJlIHVzZWQgd2l0aCBhbiBvcHRpb25hbCBjaGFpbgBjaXJjdWxhciBwcm90b3R5cGUgY2hhaW4AYXNzaWduAGlzRnJvemVuAChwb3MgKyBsZW4pIDw9IGJjX2J1Zl9sZW4AdW5leHBlY3RlZCBlbGxpcHNpcyB0b2tlbgBpbnZhbGlkIHVucmVnaXN0ZXIgdG9rZW4AdGhlbgBzZXR0ZXIgaXMgZm9yYmlkZGVuAG51bGwgb3IgdW5kZWZpbmVkIGFyZSBmb3JiaWRkZW4AYXRhbgBuYW4Abm90IGEgYm9vbGVhbgBCb29sZWFuAGdjX3NjYW4AYmFkIG5vcm1hbGl6YXRpb24gZm9ybQBKU19OZXdTeW1ib2xGcm9tQXRvbQBmcm9tAGlzRGlzam9pbnRGcm9tAHJhbmRvbQB0cmltAG0tPmN5Y2xlX3Jvb3QgPT0gbQBpbXVsAG5vdCBhIHN5bWJvbABTeW1ib2wAUmVnRXhwIGV4ZWMgbWV0aG9kIG11c3QgcmV0dXJuIGFuIG9iamVjdCBvciBudWxsAHBhcmVudCBwcm90b3R5cGUgbXVzdCBiZSBhbiBvYmplY3Qgb3IgbnVsbABNb2R1bGUgY29tcGlsZWQgdG8gbnVsbABjYW5ub3Qgc2V0IHByb3BlcnR5ICclcycgb2YgbnVsbABjYW5ub3QgcmVhZCBwcm9wZXJ0eSAnJXMnIG9mIG51bGwATnVsbABmaWxsAG5ldyBBcnJheUJ1ZmZlciBpcyB0b28gc21hbGwAVHlwZWRBcnJheSBsZW5ndGggaXMgdG9vIHNtYWxsAGNhbGwAZG90QWxsAG1hdGNoQWxsAHJlcGxhY2VBbGwAY2VpbABtcF9zaGwAdXBkYXRlX2xhYmVsAGJjX2J1Zltwb3NdID09IE9QX2xhYmVsAGV2YWwAaW52YWxpZCBiaWdpbnQgbGl0ZXJhbABpbnZhbGlkIG51bWJlciBsaXRlcmFsAEJhZCBjb250cm9sIGNoYXJhY3RlciBpbiBzdHJpbmcgbGl0ZXJhbABtYWxmb3JtZWQgZXNjYXBlIHNlcXVlbmNlIGluIHN0cmluZyBsaXRlcmFsAEpTX1NldFByb3BlcnR5SW50ZXJuYWwASlNfR2V0T3duUHJvcGVydHlOYW1lc0ludGVybmFsAF9fSlNfRXZhbEludGVybmFsAHRvRXhwb25lbnRpYWwAc2VhbABnbG9iYWwAYmxpbmsAcmV0dXJuIGluIGEgc3RhdGljIGluaXRpYWxpemVyIGJsb2NrAHN0YWNrAGxyZV9leGVjX2JhY2t0cmFjawBpAHNldE1vbnRoAGdldE1vbnRoAHNldFVUQ01vbnRoAGdldFVUQ01vbnRoAGludmFsaWQga2V5d29yZDogd2l0aABzdGFydHNXaXRoAGVuZHNXaXRoAHByb3AgPT0gSlNfQVRPTV9sZW5ndGgAaW52YWxpZCBhcnJheSBsZW5ndGgAaW52YWxpZCBhcnJheSBidWZmZXIgbWF4IGxlbmd0aABpbnZhbGlkIG1heCBhcnJheSBidWZmZXIgbGVuZ3RoAGludmFsaWQgYXJyYXkgYnVmZmVyIGxlbmd0aABpbnZhbGlkIHN0cmluZyBsZW5ndGgAaW52YWxpZCBsZW5ndGgAaW52YWxpZCBieXRlT2Zmc2V0IG9yIGJ5dGVMZW5ndGgAaW52YWxpZCBieXRlTGVuZ3RoAG1heEJ5dGVMZW5ndGgAdHJhbnNmZXJUb0ZpeGVkTGVuZ3RoAE1hdGgAcHVzaABhY29zaABKU19SZXNpemVBdG9tSGFzaABhc2luaABhdGFuaABicmVhayBtdXN0IGJlIGluc2lkZSBsb29wIG9yIHN3aXRjaABtYXRjaABuaXBfY2F0Y2gAc2VhcmNoAGZvckVhY2gAbG9nAEFycmF5IHRvbyBsb25nAHN0cmluZyB0b28gbG9uZwBBcnJheSBsb28gbG9uZwBzdWJzdHJpbmcAanNfYmlnaW50X2Zyb21fc3RyaW5nAGNhbm5vdCBjb252ZXJ0IHN5bWJvbCB0byBzdHJpbmcAdW5leHBlY3RlZCBlbmQgb2Ygc3RyaW5nAG5vdCBhIHN0cmluZwB0b1N0cmluZwB0b0RhdGVTdHJpbmcAdG9Mb2NhbGVEYXRlU3RyaW5nAHRvVGltZVN0cmluZwB0b0xvY2FsZVRpbWVTdHJpbmcAdG9Mb2NhbGVTdHJpbmcAdG9HTVRTdHJpbmcASlNTdHJpbmcAdG9JU09TdHJpbmcAdG9VVENTdHJpbmcAYWxyZWFkeSBydW5uaW5nAGpzX2lubmVyX21vZHVsZV9saW5raW5nAGR1cGxpY2F0ZSBpbXBvcnQgYmluZGluZwBpbnZhbGlkIGltcG9ydCBiaW5kaW5nAHByb21pc2UgaXMgcGVuZGluZwBiaWcAcmVnZXhwIG11c3QgaGF2ZSB0aGUgJ2cnIGZsYWcAdG9TdHJpbmdUYWcAb2YAaW5mAGRpZmYgPT0gKGludDhfdClkaWZmAGRpZmYgPT0gKGludDE2X3QpZGlmZgBocmVmAGRlcmVmAGdjX2RlY3JlZgBnZXRfdmFyX3JlZgBmcmVlX3Zhcl9yZWYAc2YtPnZhcl9yZWZzW3Zhcl9yZWYtPnZhcl9yZWZfaWR4XSA9PSB2YXJfcmVmAG9wdGltaXplX3Njb3BlX21ha2VfcmVmAEhvc3RSZWYAV2Vha1JlZgBpbmRleE9mAGxhc3RJbmRleE9mAGlzU3VwZXJzZXRPZgBpc1N1YnNldE9mAHZhbHVlT2YAc2V0UHJvdG90eXBlT2YAZ2V0UHJvdG90eXBlT2YAaXNQcm90b3R5cGVPZgBmb250c2l6ZQByZXNpemUAYmluYXJ5X29iamVjdF9zaXplAHN0cl9zaXplAG5ld19zaXplIDw9IHNoLT5wcm9wX3NpemUAZGVzY3IgPCBydC0+YXRvbV9zaXplAGF0b20gPCBydC0+YXRvbV9zaXplAG9ial9zaXplAHNoYXBlX3NpemUAanNfZnVuY19wYzJsaW5lX3NpemUAanNfZnVuY19jb2RlX3NpemUAbWVtb3J5X3VzZWRfc2l6ZQBqc19mdW5jX3NpemUAbm9ybWFsaXplAGNyX3JlZ2V4cF9jYW5vbmljYWxpemUAZnJlZXplAHJlc29sdmUALnNpemUgbXVzdCBiZSBwb3NpdGl2ZQB0b1ByaW1pdGl2ZQB2YXJfcmVmLT5wdmFsdWUgPT0gcHZhbHVlAHVua25vd24gdW5pY29kZSBwcm9wZXJ0eSB2YWx1ZQByZXN0IGVsZW1lbnQgY2Fubm90IGhhdmUgYSBkZWZhdWx0IHZhbHVlAGludmFsaWQgcmV0IHZhbHVlAF9fSlNfQXRvbVRvVmFsdWUAaXNGaW5pdGUAZGVsZXRlAGNvbnRhaW5zIHVucGFpcmVkIHN1cnJvZ2F0ZQBjcmVhdGUATnVtYmVyIHRhZyBleHBlY3RlZCBmb3IgZGF0ZQBCaWdJbnQgaXMgdG9vIGxhcmdlIHRvIGFsbG9jYXRlAHNldERhdGUAZ2V0RGF0ZQBzZXRVVENEYXRlAGdldFVUQ0RhdGUASW52YWxpZCBEYXRlAHJldmVyc2UAcGFyc2UAcHJveHkgcHJldmVudEV4dGVuc2lvbnMgaGFuZGxlciByZXR1cm5lZCBmYWxzZQBtb2R1bGUgbmFtZXNwYWNlIHByb3BlcnRpZXMgaGF2ZSB3cml0YWJsZSA9IGZhbHNlAFByb21pc2UAc3VtUHJlY2lzZQB0b0xvd2VyQ2FzZQB0b0xvY2FsZUxvd2VyQ2FzZQB0b1VwcGVyQ2FzZQB0b0xvY2FsZVVwcGVyQ2FzZQBpZ25vcmVDYXNlAGxvY2FsZUNvbXBhcmUAcHJveHk6IGluY29uc2lzdGVudCBwcm90b3R5cGUAcHJveHk6IGJhZCBwcm90b3R5cGUAbm90IGEgcHJvdG90eXBlAGludmFsaWQgb2JqZWN0IHR5cGUAdW5lc2NhcGUAQmFkIFVuaWNvZGUgZXNjYXBlAG5vbmUAcmVzdCBlbGVtZW50IG11c3QgYmUgdGhlIGxhc3Qgb25lAG11bHRpbGluZQAgIHBjMmxpbmUAYXN5bmNfZnVuY19yZXN1bWUAc29tZQBKU19GcmVlUnVudGltZQBKU1J1bnRpbWUAc2V0VGltZQBnZXRUaW1lAGFzeW5jX2Z1bmNfZnJlZV9mcmFtZQBzZXRfb2JqZWN0X25hbWUAZXhwZWN0aW5nIHByb3BlcnR5IG5hbWUAdW5rbm93biB1bmljb2RlIHByb3BlcnR5IG5hbWUAaW52YWxpZCBwcm9wZXJ0eSBuYW1lAGR1cGxpY2F0ZSBfX3Byb3RvX18gcHJvcGVydHkgbmFtZQBpbnZhbGlkIHJlZGVmaW5pdGlvbiBvZiBwYXJhbWV0ZXIgbmFtZQBleHBlY3RpbmcgZ3JvdXAgbmFtZQBkdXBsaWNhdGUgZ3JvdXAgbmFtZQBpbnZhbGlkIGdyb3VwIG5hbWUAZHVwbGljYXRlIGxhYmVsIG5hbWUAaW52YWxpZCBmaXJzdCBjaGFyYWN0ZXIgb2YgcHJpdmF0ZSBuYW1lAGludmFsaWQgbGV4aWNhbCB2YXJpYWJsZSBuYW1lAGludmFsaWQgbWV0aG9kIG5hbWUAZXhwZWN0aW5nIGZpZWxkIG5hbWUAaW52YWxpZCBmaWVsZCBuYW1lAGNsYXNzIHN0YXRlbWVudCByZXF1aXJlcyBhIG5hbWUAZmlsZU5hbWUAanNfbGlua19tb2R1bGUAanNfZXZhbHVhdGVfbW9kdWxlAE5vdCBhIG1vZHVsZQBtb2R1bGUtPmN5Y2xlX3Jvb3QgPT0gbW9kdWxlAGNvbXBpbGUAb2JqZWN0IGlzIG5vdCBleHRlbnNpYmxlAHByb3h5OiBpbmNvbnNpc3RlbnQgaXNFeHRlbnNpYmxlAGV4dGVybmFsIGFycmF5IGJ1ZmZlciBpcyBub3QgcmVzaXphYmxlAGdyb3dhYmxlAHByb3RvdHlwZSBpcyBpbW11dGFibGUAY2Fubm90IGhhdmUgc2V0dGVyL2dldHRlciBhbmQgdmFsdWUgb3Igd3JpdGFibGUAYWJzdHJhY3QgY2xhc3Mgbm90IGNvbnN0cnVjdGFibGUAcHJvcGVydHkgaXMgbm90IGNvbmZpZ3VyYWJsZQB2YWx1ZSBpcyBub3QgaXRlcmFibGUAcHJvcGVydHlJc0VudW1lcmFibGUAbWlzc2luZyBpbml0aWFsaXplciBmb3IgY29uc3QgdmFyaWFibGUAbGV4aWNhbCB2YXJpYWJsZQBpbnZhbGlkIHJlZGVmaW5pdGlvbiBvZiBhIHZhcmlhYmxlAGlzQ29uY2F0U3ByZWFkYWJsZQByZXZvY2FibGUAc3RyaWtlAHRha2UAQmlnSW50IGlzIHRvbyBsYXJnZQBpbnZhbGlkIGNsYXNzIHJhbmdlAG1lc3NhZ2UAanNfd2Vha3JlZl9mcmVlAGludmFsaWQgbHZhbHVlIGluIHN0cmljdCBtb2RlAGludmFsaWQgdmFyaWFibGUgbmFtZSBpbiBzdHJpY3QgbW9kZQBjYW5ub3QgZGVsZXRlIGEgZGlyZWN0IHJlZmVyZW5jZSBpbiBzdHJpY3QgbW9kZQBvY3RhbCBlc2NhcGUgc2VxdWVuY2VzIGFyZSBub3QgYWxsb3dlZCBpbiBzdHJpY3QgbW9kZQBvY3RhbCBsaXRlcmFscyBhcmUgZGVwcmVjYXRlZCBpbiBzdHJpY3QgbW9kZQB1bmljb2RlACAgYnl0ZWNvZGUASlNGdW5jdGlvbkJ5dGVjb2RlAHNraXBfZGVhZF9jb2RlAGludmFsaWQgYXJndW1lbnQgbmFtZSBpbiBzdHJpY3QgY29kZQBpbnZhbGlkIGZ1bmN0aW9uIG5hbWUgaW4gc3RyaWN0IGNvZGUAbmVnYXRlZCBjaGFyYWN0ZXIgY2xhc3Mgd2l0aCBzdHJpbmdzIGluIHJlZ3VsYXIgZXhwcmVzc2lvbiBkZWJ1Z2dlciBldmFsIGNvZGUAaW52YWxpZCByZWRlZmluaXRpb24gb2YgZ2xvYmFsIGlkZW50aWZpZXIgaW4gbW9kdWxlIGNvZGUAaW1wb3J0Lm1ldGEgb25seSB2YWxpZCBpbiBtb2R1bGUgY29kZQBmcm9tQ2hhckNvZGUAaW52YWxpZCBmb3IgaW4vb2YgbGVmdCBoYW5kLXNpZGUAaW52YWxpZCBhc3NpZ25tZW50IGxlZnQtaGFuZCBzaWRlAHJlZHVjZQBzb3VyY2UAJ3RoaXMnIGNhbiBiZSBpbml0aWFsaXplZCBvbmx5IG9uY2UAcHJvcGVydHkgY29uc3RydWN0b3IgYXBwZWFycyBtb3JlIHRoYW4gb25jZQBpbnZhbGlkIFVURi04IHNlcXVlbmNlAEJhZCBVVEYtOCBzZXF1ZW5jZQBkaWZmZXJlbmNlAHN5bW1ldHJpY0RpZmZlcmVuY2UAY2lyY3VsYXIgcmVmZXJlbmNlAGhhc0luc3RhbmNlAHNsaWNlAHNwbGljZQByYWNlAHJlcGxhY2UAdW5leHBlY3RlZCAnYXdhaXQnIGtleXdvcmQAdW5leHBlY3RlZCAneWllbGQnIGtleXdvcmQAbWFwX2RlY3JlZl9yZWNvcmQAaXRlcmF0b3IgZG9lcyBub3QgaGF2ZSBhIHRocm93IG1ldGhvZABvYmplY3QgbmVlZHMgdG9JU09TdHJpbmcgbWV0aG9kAHRocm93IGlzIG5vdCBhIG1ldGhvZAAnc3VwZXInIGlzIG9ubHkgdmFsaWQgaW4gYSBtZXRob2QAZnJvdW5kAGYxNnJvdW5kAGJyZWFrL2NvbnRpbnVlIGxhYmVsIG5vdCBmb3VuZABvdXQgb2YgYm91bmQAZmluZABiaW5kAGludmFsaWQgaW5kZXggZm9yIGFwcGVuZABleHRyYW5lb3VzIGNoYXJhY3RlcnMgYXQgdGhlIGVuZAB1bmV4cGVjdGVkIGRhdGEgYXQgdGhlIGVuZAB1bmV4cGVjdGVkIGVuZABpbnZhbGlkIGluY3JlbWVudC9kZWNyZW1lbnQgb3BlcmFuZABpbnZhbGlkICdpbnN0YW5jZW9mJyByaWdodCBvcGVyYW5kAGludmFsaWQgJ2luJyBvcGVyYW5kAHRyaW1FbmQAcGFkRW5kAGJvbGQAaW52YWxpZCBhcnJheSBpbmRleDogJWxsZABnY19kZWNyZWZfY2hpbGQAcmVzb2x2ZV9zY29wZV9wcml2YXRlX2ZpZWxkAGNhbm5vdCBkZWxldGUgYSBwcml2YXRlIGNsYXNzIGZpZWxkAGV4cGVjdGluZyA8YnJhbmQ+IHByaXZhdGUgZmllbGQAQXJyYXlCdWZmZXIgaXMgZGV0YWNoZWQgb3IgcmVzaXplZAAlcyBpcyBub3QgaW5pdGlhbGl6ZWQAZml4ZWQAdG9GaXhlZABvYmplY3QgcmVmZXJlbmNlcyBhcmUgbm90IGFsbG93ZWQAc2V0X29iamVjdF9uYW1lX2NvbXB1dGVkAGdldE9ySW5zZXJ0Q29tcHV0ZWQAZXZhbCBpcyBub3Qgc3VwcG9ydGVkAHJlZ2V4cCBub3Qgc3VwcG9ydGVkAFJlZ0V4cCBhcmUgbm90IHN1cHBvcnRlZABvbmx5IHZhbHVlIHByb3BlcnRpZXMgYXJlIHN1cHBvcnRlZAB0b1NvcnRlZABpbnRlcnJ1cHRlZAAhcy0+aXNfY29tcGxldGVkACVzIG9iamVjdCBleHBlY3RlZABpZGVudGlmaWVyIGV4cGVjdGVkAGJ5dGVjb2RlIGZ1bmN0aW9uIGV4cGVjdGVkAHN0cmluZyBleHBlY3RlZABmcm9tIGNsYXVzZSBleHBlY3RlZABmdW5jdGlvbiBuYW1lIGV4cGVjdGVkAHZhcmlhYmxlIG5hbWUgZXhwZWN0ZWQAbWV0YSBleHBlY3RlZABqc19hc3luY19tb2R1bGVfZXhlY3V0aW9uX3JlamVjdGVkAGpzX3NldF9tb2R1bGVfZXZhbHVhdGVkAG1lbW9yeSBhbGxvY2F0ZWQAbWVtb3J5IHVzZWQAdG9SZXZlcnNlZAB2ZC0+aXNfY2FwdHVyZWQALmtleXMgaXMgdW5kZWZpbmVkAC5oYXMgaXMgdW5kZWZpbmVkAGRlcml2ZWQgY2xhc3MgY29uc3RydWN0b3IgbXVzdCByZXR1cm4gYW4gb2JqZWN0IG9yIHVuZGVmaW5lZABjYW5ub3Qgc2V0IHByb3BlcnR5ICclcycgb2YgdW5kZWZpbmVkAGNhbm5vdCByZWFkIHByb3BlcnR5ICclcycgb2YgdW5kZWZpbmVkAGZsYWdzIG11c3QgYmUgdW5kZWZpbmVkAFVuZGVmaW5lZABwcml2YXRlIGNsYXNzIGZpZWxkIGlzIGFscmVhZHkgZGVmaW5lZAAnJXMnIGlzIG5vdCBkZWZpbmVkAGdyb3VwIG5hbWUgbm90IGRlZmluZWQAaXNXZWxsRm9ybWVkAHRvV2VsbEZvcm1lZABhbGxTZXR0bGVkAGpzX2FzeW5jX21vZHVsZV9leGVjdXRpb25fZnVsZmlsbGVkAGNhbm5vdCBiZSBjYWxsZWQAaXNTZWFsZWQAIXNoLT5pc19oYXNoZWQAIWFidWYtPmRldGFjaGVkAEFycmF5QnVmZmVyIGlzIGRldGFjaGVkAGpzX2FycmF5X3RvU3BsaWNlZABhZGQAJSswN2QAJTA0ZAAlMDJkJTAyZAAlMDJkLyUwMmQvJTAqZAAlLjNzICUuM3MgJTAyZCAlMCpkADolZDolZABpbnZhbGlkIHRocm93IHZhciB0eXBlICVkAHNjAGpzX2RlZl9tYWxsb2MAdHJ1bmMAZ2MAZXhlYwAuLi8uLi92ZW5kb3IvcXVpY2tqcy9xdWlja2pzLmMALi4vLi4vdmVuZG9yL3F1aWNranMvbGlicmVnZXhwLmMALi4vLi4vdmVuZG9yL3F1aWNranMvbGlidW5pY29kZS5jAC4uLy4uL3ZlbmRvci9xdWlja2pzL2R0b2EuYwBzdWIAdHlwZWRfYXJyYXlfaXNfb29iAGRhdGF2aWV3X2lzX29vYgBwcm9taXNlX3JlYWN0aW9uX2pvYgBqc19wcm9taXNlX3Jlc29sdmVfdGhlbmFibGVfam9iAHJ3YQBqc19kdG9hAF9fbG9va3VwU2V0dGVyX18AX19kZWZpbmVTZXR0ZXJfXwBfX2xvb2t1cEdldHRlcl9fAF9fZGVmaW5lR2V0dGVyX18AX19wcm90b19fAFtTeW1ib2wuc3BsaXRdAFtTeW1ib2wudW5zY29wYWJsZXNdAFtTeW1ib2wuc3BlY2llc10AW1N5bWJvbC5pdGVyYXRvcl0AW1N5bWJvbC5hc3luY0l0ZXJhdG9yXQBbU3ltYm9sLm1hdGNoQWxsXQBbU3ltYm9sLm1hdGNoXQBbU3ltYm9sLnNlYXJjaF0AW1N5bWJvbC50b1N0cmluZ1RhZ10AW1N5bWJvbC50b1ByaW1pdGl2ZV0AW3Vuc3VwcG9ydGVkIHR5cGVdAFtmdW5jdGlvbiBieXRlY29kZV0AW1N5bWJvbC5oYXNJbnN0YW5jZV0AW1N5bWJvbC5yZXBsYWNlXQBbACUwMmQ6JTAyZDolMDJkLiUwM2RaAFBPU0lUSVZFX0lORklOSVRZAE5FR0FUSVZFX0lORklOSVRZAHAtPmNsYXNzX2lkID09IEpTX0NMQVNTX0FSUkFZAHAtPmNsYXNzX2lkID49IEpTX0NMQVNTX1VJTlQ4Q19BUlJBWQBwLT5jbGFzc19pZCA8PSBKU19DTEFTU19GTE9BVDY0X0FSUkFZAHN0YWNrX2xlbiA8IFBPUF9TVEFDS19MRU5fTUFYAHAtPmNsYXNzX2lkID09IEpTX0NMQVNTX0RBVEFWSUVXAC0lMDJkLSUwMmRUAEpTX0F0b21HZXRTdHJSVABvcGNvZGUgPCBSRU9QX0NPVU5UAEpTX1ZBTFVFX0dFVF9UQUcodmFsKSA9PSBKU19UQUdfQklHX0lOVABKU19WQUxVRV9HRVRfVEFHKGZ1bmNfcmV0KSA9PSBKU19UQUdfSU5UAEJZVEVTX1BFUl9FTEVNRU5UACUwMmQ6JTAyZDolMDJkIEdNVABKU19WQUxVRV9HRVRfVEFHKHNmLT5jdXJfZnVuYykgPT0gSlNfVEFHX09CSkVDVABuX2RpZ2l0cyA+PSAxICYmIG5fZGlnaXRzIDw9IEpTX0RUT0FfTUFYX0RJR0lUUwBuX2RpZ2l0cyA+PSAwICYmIG5fZGlnaXRzIDw9IEpTX0RUT0FfTUFYX0RJR0lUUwBzaGlmdCA+PSAxICYmIHNoaWZ0IDwgTElNQl9CSVRTAHZhcl9raW5kID09IEpTX1ZBUl9QUklWQVRFX1NFVFRFUgBNQVhfU0FGRV9JTlRFR0VSAE1JTl9TQUZFX0lOVEVHRVIAYXNVaW50TgBhc0ludE4AaXNOYU4ARGF0ZSB2YWx1ZSBpcyBOYU4AdG9KU09OAEVQU0lMT04ATkFOACUwMmQ6JTAyZDolMDJkICVjTQBQTQBBTQBzdGFja190b3AgPT0gTlVMTABzLT5sYWJlbF9zbG90c1tsYWJlbF0uZmlyc3RfcmVsb2MgPT0gTlVMTABsYWJlbF9zbG90c1tpXS5maXJzdF9yZWxvYyA9PSBOVUxMAHBycyAhPSBOVUxMAHNmLT5jdXJfc3AgIT0gTlVMTABzZiAhPSBOVUxMAHZhcl9raW5kICE9IEpTX1ZBUl9OT1JNQUwAYi0+ZnVuY19raW5kID09IEpTX0ZVTkNfTk9STUFMAGVuY29kZVVSSQBkZWNvZGVVUkkAUEkAcy0+c3RhY2tfbGVuIDwgSlNfU1RSSU5HX1JPUEVfTUFYX0RFUFRIAHMtPnN0YXRlID09IEpTX0FTWU5DX0dFTkVSQVRPUl9TVEFURV9FWEVDVVRJTkcAbTEtPnN0YXR1cyA9PSBKU19NT0RVTEVfU1RBVFVTX0VWQUxVQVRJTkcAbTEtPnN0YXR1cyA9PSBKU19NT0RVTEVfU1RBVFVTX0xJTktJTkcASU5GAChwcnMtPmZsYWdzICYgSlNfUFJPUF9UTUFTSykgPT0gSlNfUFJPUF9WQVJSRUYAMDEyMzQ1Njc4OUFCQ0RFRgBTSVpFAE1BWF9WQUxVRQBNSU5fVkFMVUUATkFNRQBldmFsX3R5cGUgPT0gSlNfRVZBTF9UWVBFX0dMT0JBTCB8fCBldmFsX3R5cGUgPT0gSlNfRVZBTF9UWVBFX01PRFVMRQBwLT5nY19vYmpfdHlwZSA9PSBKU19HQ19PQkpfVFlQRV9KU19PQkpFQ1QgfHwgcC0+Z2Nfb2JqX3R5cGUgPT0gSlNfR0NfT0JKX1RZUEVfRlVOQ1RJT05fQllURUNPREUgfHwgcC0+Z2Nfb2JqX3R5cGUgPT0gSlNfR0NfT0JKX1RZUEVfQVNZTkNfRlVOQ1RJT04gfHwgcC0+Z2Nfb2JqX3R5cGUgPT0gSlNfR0NfT0JKX1RZUEVfTU9EVUxFAExPRzJFAExPRzEwRQBzLT5zdGF0ZSA9PSBKU19BU1lOQ19HRU5FUkFUT1JfU1RBVEVfQVdBSVRJTkdfUkVUVVJOIHx8IHMtPnN0YXRlID09IEpTX0FTWU5DX0dFTkVSQVRPUl9TVEFURV9DT01QTEVURUQAbS0+c3RhdHVzID09IEpTX01PRFVMRV9TVEFUVVNfVU5MSU5LRUQgfHwgbS0+c3RhdHVzID09IEpTX01PRFVMRV9TVEFUVVNfTElOS0VEIHx8IG0tPnN0YXR1cyA9PSBKU19NT0RVTEVfU1RBVFVTX0VWQUxVQVRJTkdfQVNZTkMgfHwgbS0+c3RhdHVzID09IEpTX01PRFVMRV9TVEFUVVNfRVZBTFVBVEVEAG0xLT5zdGF0dXMgPT0gSlNfTU9EVUxFX1NUQVRVU19FVkFMVUFUSU5HIHx8IG0xLT5zdGF0dXMgPT0gSlNfTU9EVUxFX1NUQVRVU19FVkFMVUFUSU5HX0FTWU5DIHx8IG0xLT5zdGF0dXMgPT0gSlNfTU9EVUxFX1NUQVRVU19FVkFMVUFURUQAbTEtPnN0YXR1cyA9PSBKU19NT0RVTEVfU1RBVFVTX0xJTktJTkcgfHwgbTEtPnN0YXR1cyA9PSBKU19NT0RVTEVfU1RBVFVTX0xJTktFRCB8fCBtMS0+c3RhdHVzID09IEpTX01PRFVMRV9TVEFUVVNfRVZBTFVBVElOR19BU1lOQyB8fCBtMS0+c3RhdHVzID09IEpTX01PRFVMRV9TVEFUVVNfRVZBTFVBVEVEAG0tPnN0YXR1cyA9PSBKU19NT0RVTEVfU1RBVFVTX0xJTktFRABtLT5zdGF0dXMgPT0gSlNfTU9EVUxFX1NUQVRVU19VTkxJTktFRABVVEMAbS0+c3RhdHVzID09IEpTX01PRFVMRV9TVEFUVVNfRVZBTFVBVElOR19BU1lOQwBtb2R1bGUtPnN0YXR1cyA9PSBKU19NT0RVTEVfU1RBVFVTX0VWQUxVQVRJTkdfQVNZTkMAPGlucHV0PgA8c2V0PgA8YW5vbnltb3VzPgA8ZHVtcD4APG51bGw+AGJpZ2ludCBvcGVyYW5kcyBhcmUgZm9yYmlkZGVuIGZvciA+Pj4AJnF1b3Q7AHNldFVpbnQ4AGdldFVpbnQ4AHNldEludDgAZ2V0SW50OABtYWxmb3JtZWQgVVRGLTgAcmFkaXggbXVzdCBiZSBiZXR3ZWVuIDIgYW5kIDM2AHNldFVpbnQxNgBnZXRVaW50MTYAc2V0SW50MTYAZ2V0SW50MTYAc2V0RmxvYXQxNgBnZXRGbG9hdDE2AGFyZ2MgPT0gNQBzZXRCaWdVaW50NjQAZ2V0QmlnVWludDY0AHNldEJpZ0ludDY0AGdldEJpZ0ludDY0AHNldEZsb2F0NjQAZ2V0RmxvYXQ2NABhcmdjID09IDMAYXRhbjIAbG9nMgBTUVJUMV8yAFNRUlQyAExOMgBjbHozMgBzZXRVaW50MzIAZ2V0VWludDMyAHNldEludDMyAGdldEludDMyAHNldEZsb2F0MzIAZ2V0RmxvYXQzMgBzdGFja19sZW4gPj0gMgBzdGFja19zaXplID49IDIAbW9kX2NvdW50IDwgMgBwLT5oYXNoIDwgSlNfQVRPTV9IQVNIX01BU0sgLSAyAEpTX0F0b21Jc051bWVyaWNJbmRleDEAdW5pY29kZV9zZXF1ZW5jZV9wcm9wMQBleHBtMQBqc19iaWdpbnRfdG9fc3RyaW5nMQBqc19iaWdpbnRfbm9ybWFsaXplMQBscy0+YWRkciA9PSAtMQBwLT53ZWFrcmVmX2NvdW50ID49IDEAc3RhY2tfbGVuID49IDEAcC0+aGFzaCA+PSAxAHAtPnNoYXBlLT5oZWFkZXIucmVmX2NvdW50ID09IDEAYS0+aGVhZGVyLnJlZl9jb3VudCA9PSAxAHN0YWNrX2xlbiA9PSAxAGpzX2ZyZWVfc2hhcGUwAGxvZzEwAExOMTAAcC0+cmVmX2NvdW50ID4gMAB2YXJfcmVmLT5oZWFkZXIucmVmX2NvdW50ID4gMABtLT5wZW5kaW5nX2FzeW5jX2RlcGVuZGVuY2llcyA+IDAAc3RhY2tfc2l6ZSA+IDAAY3Bvb2xfaWR4ID49IDAAcnQtPmF0b21fY291bnQgPj0gMABscy0+cmVmX2NvdW50ID49IDAAcy0+aXNfZXZhbCB8fCBzLT5jbG9zdXJlX3Zhcl9jb3VudCA9PSAwAHAtPnJlZl9jb3VudCA9PSAwAGN0eC0+aGVhZGVyLnJlZl9jb3VudCA9PSAwAHNoLT5oZWFkZXIucmVmX2NvdW50ID09IDAAcC0+bWFyayA9PSAwAChuZXdfaGFzaF9zaXplICYgKG5ld19oYXNoX3NpemUgLSAxKSkgPT0gMABpICE9IDAAc2l6ZSAhPSAwADwvAG1pc3NpbmcgYmluZGluZyBwYXR0ZXJuLi4uAGJpZ2ludCBhcmd1bWVudCB3aXRoIHVuYXJ5ICsAYXN5bmMgZnVuY3Rpb24gKgAKfSkAaW52YWxpZCBhdG9tIGluZGV4IChwb3M9JXUpAGludmFsaWQgdGFnICh0YWc9JWQgcG9zPSV1KQBpbnZhbGlkIG9iamVjdCByZWZlcmVuY2UgKCV1ID49ICV1KQBsaXN0X2VtcHR5KCZydC0+Z2Nfb2JqX2xpc3QpAGxpc3RfZW1wdHkoJnJ0LT53ZWFrcmVmX2xpc3QpAGogPT0gKHNoLT5wcm9wX2NvdW50IC0gc2gtPmRlbGV0ZWRfcHJvcF9jb3VudCkAIV9fSlNfQXRvbUlzVGFnZ2VkSW50KGRlc2NyKQAhYXRvbV9pc19mcmVlKHApAChudWxsKQBKU19Jc1VuZGVmaW5lZCh2YWwpACAobmF0aXZlKQBqc19jbGFzc19oYXNfYnl0ZWNvZGUocC0+Y2xhc3NfaWQpAHRvbyBtYW55IGFyZ3VtZW50cyBpbiBmdW5jdGlvbiBjYWxsIChvbmx5ICVkIGFsbG93ZWQpAGludmFsaWQgdmVyc2lvbiAoJWQgZXhwZWN0ZWQ9JWQpAG5pcF9jYXRjaDogbm8gY2F0Y2ggb3AgKHBjPSVkKQBpbmNvbnNpc3RlbnQgY2F0Y2ggcG9zaXRpb246ICVkICVkIChwYz0lZCkAaW5jb25zaXN0ZW50IHN0YWNrIHNpemU6ICVkICVkIChwYz0lZCkAYnl0ZWNvZGUgYnVmZmVyIG92ZXJmbG93IChvcD0lZCwgcGM9JWQpAHN0YWNrIG92ZXJmbG93IChvcD0lZCwgcGM9JWQpAHN0YWNrIHVuZGVyZmxvdyAob3A9JWQsIHBjPSVkKQBpbnZhbGlkIG9wY29kZSAob3A9JWQsIHBjPSVkKQB1bnN1cHBvcnRlZCB0YWcgKCVkKQAoPzopAGlkeCA8IGNvdW50b2YoY2FzZV9jb252X3RhYmxlMSkAbm8gZnVuY3Rpb24gZmlsZW5hbWUgZm9yIGltcG9ydCgpAC1fLiF+KicoKQAgYW5vbnltb3VzKABTeW1ib2woADAxMjM0NTY3ODkgLS8oAGV4cGVjdGluZyAnfScAY29uc3RydWN0b3IgcmVxdWlyZXMgJ25ldycAY2xhc3MgY29uc3RydWN0b3JzIG11c3QgYmUgaW52b2tlZCB3aXRoICduZXcnAGV4cGVjdGluZyAnYXMnAHVuZXhwZWN0ZWQgdG9rZW4gaW4gZXhwcmVzc2lvbjogJyUuKnMnAHVuZXhwZWN0ZWQgdG9rZW46ICclLipzJwByZWRlY2xhcmF0aW9uIG9mICclcycAZHVwbGljYXRlIGV4cG9ydGVkIG5hbWUgJyVzJwBjaXJjdWxhciByZWZlcmVuY2Ugd2hlbiBsb29raW5nIGZvciBleHBvcnQgJyVzJyBpbiBtb2R1bGUgJyVzJwBDb3VsZCBub3QgZmluZCBleHBvcnQgJyVzJyBpbiBtb2R1bGUgJyVzJwBjb3VsZCBub3QgbG9hZCBtb2R1bGUgJyVzJwBjYW5ub3QgZGVmaW5lIHZhcmlhYmxlICclcycAdW5kZWZpbmVkIHByaXZhdGUgZmllbGQgJyVzJwB1bnN1cHBvcnRlZCByZWZlcmVuY2UgdG8gJ3N1cGVyJwBpbnZhbGlkIHVzZSBvZiAnc3VwZXInACdmb3IgYXdhaXQnIGxvb3Agc2hvdWxkIGJlIHVzZWQgd2l0aCAnb2YnACdmb3Igb2YnIGV4cHJlc3Npb24gY2Fubm90IHN0YXJ0IHdpdGggJ2FzeW5jJwBVbmV4cGVjdGVkIHRva2VuICclYycAZXhwZWN0aW5nICclYycAZHVwbGljYXRlIG1vZGlmaWVyOiAnJWMnAHVucGFyZW50aGVzaXplZCB1bmFyeSBleHByZXNzaW9uIGNhbid0IGFwcGVhciBvbiB0aGUgbGVmdC1oYW5kIHNpZGUgb2YgJyoqJwBpbnZhbGlkIHVzZSBvZiAnaW1wb3J0KCknAGV4cGVjdGluZyAlJQA7Lz86QCY9KyQsIwAsLT08PiMmISU6O0B+J2AiAD0iAHNldCAAZ2V0IABbb2JqZWN0IABhc3luYyBmdW5jdGlvbiAAYm91bmQgACUuM3MsICUwMmQgJS4zcyAlMCpkIABhc3lu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bGluZU51bWJlcgBjb2x1bW5OdW1iZXIAbWVzc2FnZQBjYXVzZQBlcnJvcnMAc3RhY2sAbmFtZQB0b1N0cmluZwB0b0xvY2FsZVN0cmluZwB2YWx1ZU9mAGV2YWwAcHJvdG90eXBlAGNvbnN0cnVjdG9yAGNvbmZpZ3VyYWJsZQB3cml0YWJsZQBlbnVtZXJhYmxlAHZhbHVlAGdldABzZXQAb2YAX19wcm90b19fAHVuZGVmaW5lZABudW1iZXIAYm9vbGVhbgBzdHJpbmcAb2JqZWN0AHN5bWJvbABpbnRlZ2VyAHVua25vd24AYXJndW1lbnRzAGNhbGxlZQBjYWxsZXIAPGV2YWw+ADxyZXQ+ADx2YXI+ADxhcmdfdmFyPgA8d2l0aD4AbGFzdEluZGV4AHRhcmdldABpbmRleABpbnB1dABkZWZpbmVQcm9wZXJ0aWVzAGFwcGx5AGpvaW4AY29uY2F0AHNwbGl0AGNvbnN0cnVjdABnZXRQcm90b3R5cGVPZgBzZXRQcm90b3R5cGVPZgBpc0V4dGVuc2libGUAcHJldmVudEV4dGVuc2lvbnMAaGFzAGRlbGV0ZVByb3BlcnR5AGRlZmluZVByb3BlcnR5AGdldE93blByb3BlcnR5RGVzY3JpcHRvcgBvd25LZXlzAGFkZABkb25lAG5leHQAdmFsdWVzAHNvdXJjZQBmbGFncwBnbG9iYWwAdW5pY29kZQByYXcAbmV3LnRhcmdldAB0aGlzLmFjdGl2ZV9mdW5jADxob21lX29iamVjdD4APGNvbXB1dGVkX2ZpZWxkPgA8c3RhdGljX2NvbXB1dGVkX2ZpZWxkPgA8Y2xhc3NfZmllbGRzX2luaXQ+ADxicmFuZD4AI2NvbnN0cnVjdG9yAGFzAGZyb20AbWV0YQAqZGVmYXVsdCoAKgBNb2R1bGUAdGhlbgByZXNvbHZlAHJlamVjdABwcm9taXNlAHByb3h5AHJldm9rZQBhc3luYwBleGVjAGdyb3VwcwBpbmRpY2VzAHN0YXR1cwByZWFzb24AZ2xvYmFsVGhpcwBiaWdpbnQALTAASW5maW5pdHkALUluZmluaXR5AE5hTgBoYXNJbmRpY2VzAGlnbm9yZUNhc2UAbXVsdGlsaW5lAGRvdEFsbABzdGlja3kAdW5pY29kZVNldHMAbm90LWVxdWFsAHRpbWVkLW91dABvawB0b0pTT04AbWF4Qnl0ZUxlbmd0aABPYmplY3QAQXJyYXkARXJyb3IATnVtYmVyAFN0cmluZwBCb29sZWFuAFN5bWJvbABBcmd1bWVudHMATWF0aABKU09OAERhdGUARnVuY3Rpb24AR2VuZXJhdG9yRnVuY3Rpb24ARm9ySW5JdGVyYXRvcgBSZWdFeHAAQXJyYXlCdWZmZXIAU2hhcmVkQXJyYXlCdWZmZXIAVWludDhDbGFtcGVkQXJyYXkASW50OEFycmF5AFVpbnQ4QXJyYXkASW50MTZBcnJheQBVaW50MTZBcnJheQBJbnQzMkFycmF5AFVpbnQzMkFycmF5AEJpZ0ludDY0QXJyYXkAQmlnVWludDY0QXJyYXkARmxvYXQxNkFycmF5AEZsb2F0MzJBcnJheQBGbG9hdDY0QXJyYXkARGF0YVZpZXcAQmlnSW50AFdlYWtSZWYARmluYWxpemF0aW9uUmVnaXN0cnkATWFwAFNldABXZWFrTWFwAFdlYWtTZXQASXRlcmF0b3IASXRlcmF0b3IgSGVscGVyAEl0ZXJhdG9yIENvbmNhdABJdGVyYXRvciBXcmFwAE1hcCBJdGVyYXRvcgBTZXQgSXRlcmF0b3IAQXJyYXkgSXRlcmF0b3IAU3RyaW5nIEl0ZXJhdG9yAFJlZ0V4cCBTdHJpbmcgSXRlcmF0b3IAR2VuZXJhdG9yAFByb3h5AFByb21pc2UAUHJvbWlzZVJlc29sdmVGdW5jdGlvbgBQcm9taXNlUmVqZWN0RnVuY3Rpb24AQXN5bmNGdW5jdGlvbgBBc3luY0Z1bmN0aW9uUmVzb2x2ZQBBc3luY0Z1bmN0aW9uUmVqZWN0AEFzeW5jR2VuZXJhdG9yRnVuY3Rpb24AQXN5bmNHZW5lcmF0b3IARXZhbEVycm9yAFJhbmdlRXJyb3IAUmVmZXJlbmNlRXJyb3IAU3ludGF4RXJyb3IAVHlwZUVycm9yAFVSSUVycm9yAEludGVybmFsRXJyb3IAQWdncmVnYXRlRXJyb3IAPGJyYW5kPgBTeW1ib2wudG9QcmltaXRpdmUAU3ltYm9sLml0ZXJhdG9yAFN5bWJvbC5tYXRjaABTeW1ib2wubWF0Y2hBbGwAU3ltYm9sLnJlcGxhY2UAU3ltYm9s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LEJyYWkAQnVnaW5lc2UsQnVnaQBCdWhpZCxCdWhkAENhbmFkaWFuX0Fib3JpZ2luYWwsQ2FucwBDYXJpYW4sQ2FyaQBDYXVjYXNpYW5fQWxiYW5pYW4sQWdoYgBDaGFrbWEsQ2FrbQBDaGFtLENoYW0AQ2hlcm9rZWUsQ2hlcgBDaG9yYXNtaWFuLENocnMAQ29tbW9uLFp5eXkAQ29wdGljLENvcHQsUWFhYwBDdW5laWZvcm0sWHN1eABDeXByaW90LENwcnQAQ3lyaWxsaWMsQ3lybABDeXByb19NaW5vYW4sQ3BtbgBEZXNlcmV0LERzcnQARGV2YW5hZ2FyaSxEZXZhAERpdmVzX0FrdXJ1LERpYWsARG9ncmEsRG9ncgBEdXBsb3lhbixEdXBsAEVneXB0aWFuX0hpZXJvZ2x5cGhzLEVneXAARWxiYXNhbixFbGJhAEVseW1haWMsRWx5bQBFdGhpb3BpYyxFdGhpAEdhcmF5LEdhcmEAR2VvcmdpYW4sR2VvcgBHbGFnb2xpdGljLEdsYWcAR290aGljLEdvdGgAR3JhbnRoYSxHcmFuAEdyZWVrLEdyZWsAR3VqYXJhdGksR3VqcgBHdW5qYWxhX0dvbmRpLEdvbmcAR3VybXVraGksR3VydQBHdXJ1bmdfS2hlbWEsR3VraABIYW4sSGFuaQBIYW5ndWwsSGFuZwBIYW5pZmlfUm9oaW5neWEsUm9oZwBIYW51bm9vLEhhbm8ASGF0cmFuLEhhdHIASGVicmV3LEhlYnIASGlyYWdhbmEsSGlyYQBJbXBlcmlhbF9BcmFtYWljLEFybWkASW5oZXJpdGVkLFppbmgsUWFhaQBJbnNjcmlwdGlvbmFsX1BhaGxhdmksUGhsaQBJbnNjcmlwdGlvbmFsX1BhcnRoaWFuLFBydGkASmF2YW5lc2UsSmF2YQBLYWl0aGksS3RoaQBLYW5uYWRhLEtuZGEAS2F0YWthbmEsS2FuYQBLYXRha2FuYV9Pcl9IaXJhZ2FuYSxIcmt0AEthd2ksS2F3aQBLYXlhaF9MaSxLYWxpAEtoYXJvc2h0aGksS2hhcgBLaG1lcixLaG1yAEtob2praSxLaG9qAEtoaXRhbl9TbWFsbF9TY3JpcHQsS2l0cwBLaHVkYXdhZGksU2luZABLaXJhdF9SYWksS3JhaQBMYW8sTGFvbwBMYXRpbixMYXRuAExlcGNoYSxMZXBjAExpbWJ1LExpbWIATGluZWFyX0EsTGluYQBMaW5lYXJfQixMaW5iAExpc3UsTGlzdQBMeWNpYW4sTHljaQBMeWRpYW4sTHlkaQBNYWthc2FyLE1ha2EATWFoYWphbmksTWFoagBNYWxheWFsYW0sTWx5bQBNYW5kYWljLE1hbmQATWFuaWNoYWVhbixNYW5pAE1hcmNoZW4sTWFyYwBNYXNhcmFtX0dvbmRpLEdvbm0ATWVkZWZhaWRyaW4sTWVkZgBNZWV0ZWlfTWF5ZWssTXRlaQBNZW5kZV9LaWtha3VpLE1lbmQATWVyb2l0aWNfQ3Vyc2l2ZSxNZXJjAE1lcm9pdGljX0hpZXJvZ2x5cGhzLE1lcm8ATWlhbyxQbHJkAE1vZGksTW9kaQBNb25nb2xpYW4sTW9uZwBNcm8sTXJvbwBNdWx0YW5pLE11bHQATXlhbm1hcixNeW1yAE5hYmF0YWVhbixOYmF0AE5hZ19NdW5kYXJpLE5hZ20ATmFuZGluYWdhcmksTmFuZABOZXdfVGFpX0x1ZSxUYWx1AE5ld2EsTmV3YQBOa28sTmtvbwBOdXNodSxOc2h1AE55aWFrZW5nX1B1YWNodWVfSG1vbmcsSG1ucABPZ2hhbSxPZ2FtAE9sX0NoaWtpLE9sY2sAT2xfT25hbCxPbmFvAE9sZF9IdW5nYXJpYW4sSHVuZwBPbGRfSXRhbGljLEl0YWwAT2xkX05vcnRoX0FyYWJpYW4sTmFyYgBPbGRfUGVybWljLFBlcm0AT2xkX1BlcnNpYW4sWHBlbwBPbGRfU29nZGlhbixTb2dvAE9sZF9Tb3V0aF9BcmFiaWFuLFNhcmIAT2xkX1R1cmtpYyxPcmtoAE9sZF9VeWdodXIsT3VncgBPcml5YSxPcnlhAE9zYWdlLE9zZ2UAT3NtYW55YSxPc21hAFBhaGF3aF9IbW9uZyxIbW5nAFBhbG15cmVuZSxQYWxtAFBhdV9DaW5fSGF1LFBhdWMAUGhhZ3NfUGEsUGhhZwBQaG9lbmljaWFuLFBobngAUHNhbHRlcl9QYWhsYXZpLFBobHAAUmVqYW5nLFJqbmcAUnVuaWMsUnVucgBTYW1hcml0YW4sU2FtcgBTYXVyYXNodHJhLFNhdXIAU2hhcmFkYSxTaHJkAFNoYXZpYW4sU2hhdwBTaWRkaGFtLFNpZGQAU2lkZXRpYyxTaWR0AFNpZ25Xcml0aW5nLFNnbncAU2luaGFsYSxTaW5oAFNvZ2RpYW4sU29nZABTb3JhX1NvbXBlbmcsU29yYQBTb3lvbWJvLFNveW8AU3VuZGFuZXNlLFN1bmQAU3VudXdhcixTdW51AFN5bG90aV9OYWdyaSxTeWxvAFN5cmlhYyxTeXJjAFRhZ2Fsb2csVGdsZwBUYWdiYW53YSxUYWdiAFRhaV9MZSxUYWxlAFRhaV9UaGFtLExhbmEAVGFpX1ZpZXQsVGF2dABUYWlfWW8sVGF5bwBUYWtyaSxUYWtyAFRhbWlsLFRhbWwAVGFuZ3V0LFRhbmcAVGVsdWd1LFRlbHUAVGhhYW5hLFRoYWEAVGhhaSxUaGFpAFRpYmV0YW4sVGlidABUaWZpbmFnaCxUZm5nAFRpcmh1dGEsVGlyaABUYW5nc2EsVG5zYQBUb2RocmksVG9kcgBUb2xvbmdfU2lraSxUb2xzAFRvdG8sVG90bwBUdWx1X1RpZ2FsYXJpLFR1dGcAVWdhcml0aWMsVWdhcgBWYWksVmFpaQBWaXRoa3VxaSxWaXRoAFdhbmNobyxXY2hvAFdhcmFuZ19DaXRpLFdhcmEAWWV6aWRpLFllemkAWWksWWlpaQBaYW5hYmF6YXJfU3F1YXJlLFphbmIAAAAAAADAGplMhRqZTK4agEyOGoBMhBqWTIAankyAGuFgTKYahEyEGoEOkxrgDzuDLoAagi4Bgy6AGoAuA4AugBqALoAagi4AgC4Aky4Avi6NG48u4CQegTvgSB4ApQUBsQUBggUAtjgHmjgDhTgKhASAGoUEgBqNBIAaggSAGp8EgBqJBIo7mQSAO+ALBIAaoQSNkwC7kwGCk68EsZ4NumsBgmuthQGOhQCbVwGAVwCKkwShBATKBIAanATQIYM7jiGBGpkhgwwAhwwBgQwBlQwAhgwAgAwCgwwBiAwBgQwBgwwHgAwDgQwAhAwBmAwBgjEAhTEDgTEBlTEAhjEAgTEAgTEAgTEBgDEAhDEDgTEBgjECgDEGgzEAgDEGkDEJgi8AiC8Agi8AlS8Ahi8AgS8AhC8BiS8Agi8Agi8BgC8Ogy8Biy8Ghi8AgnoAh3oBgXoBlXoAhnoAgXoAhHoBiHoBgXoB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AAACET7AEu0AAQIEa4AxAAACBJ4JAAACBJ5GAAEFDjQzOUGAmQAEBg40MzlBrgkAAAI5QSwAAQI5QYDfAAEDHx1QAAIdUAMALAMdT1ACAAgCHVCBHwAbAgQbh3UAAAJYeYeNAAACLZsAAAACLZs2AAECLZuMEgABAi2bAAAAAi2bwFxLAAMBJJY7ABEBM55dAAEBM87NLQAAAENuLFVuYXNzaWduZWQATHUsVXBwZXJjYXNlX0xldHRlcgBMbCxMb3dlcmNhc2VfTGV0dGVyAEx0LFRpdGxlY2FzZV9MZXR0ZXIATG0sTW9kaWZpZXJfTGV0dGVyAExvLE90aGVyX0xldHRlcgBNbixOb25zcGFjaW5nX01hcmsATWMsU3BhY2luZ19NYXJrAE1lLEVuY2xvc2luZ19NYXJrAE5kLERlY2ltYWxfTnVtYmVyLGRpZ2l0AE5sLExldHRlcl9OdW1iZXIATm8sT3RoZXJfTnVtYmVyAFNtLE1hdGhfU3ltYm9sAFNjLEN1cnJlbmN5X1N5bWJvbABTayxNb2RpZmllcl9TeW1ib2wAU28sT3RoZXJfU3ltYm9sAFBjLENvbm5lY3Rvcl9QdW5jdHVhdGlvbgBQZCxEYXNoX1B1bmN0dWF0aW9uAFBzLE9wZW5fUHVuY3R1YXRpb24AUGUsQ2xvc2VfUHVuY3R1YXRpb24AUGksSW5pdGlhbF9QdW5jdHVhdGlvbgBQZixGaW5hbF9QdW5jdHVhdGlvbgBQbyxPdGhlcl9QdW5jdHVhdGlvbgBacyxTcGFjZV9TZXBhcmF0b3IAWmwsTGluZV9TZXBhcmF0b3IAWnAsUGFyYWdyYXBoX1NlcGFyYXRvcgBDYyxDb250cm9sLGNudHJsAENmLEZvcm1hdABDcyxTdXJyb2dhdGUAQ28sUHJpdmF0ZV9Vc2UATEMsQ2FzZWRfTGV0dGVyAEwsTGV0dGVyAE0sTWFyayxDb21iaW5pbmdfTWFyawBOLE51bWJlcgBTLFN5bWJvbABQLFB1bmN0dWF0aW9uLHB1bmN0AFosU2VwYXJhdG9yAEMsT3RoZXIAQeCXAwuWCQ4AAAA+AAAAwAEAAAAOAAAA8AAAAAB/AAAAgAMBAAA8QVNDSUlfSGV4X0RpZ2l0LEFIZXgAQmlkaV9Db250cm9sLEJpZGlfQwBEYXNoAERlcHJlY2F0ZWQsRGVwAERpYWNyaXRpYyxEaWEARXh0ZW5kZXIsRXh0AEhleF9EaWdpdCxIZXgASURTX1VuYXJ5X09wZXJhdG9yLElEU1UASURTX0JpbmFyeV9PcGVyYXRvcixJRFNCAElEU19UcmluYXJ5X09wZXJhdG9yLElEU1QASWRlb2dyYXBoaWMsSWRlbwBKb2luX0NvbnRyb2wsSm9pbl9DAExvZ2ljYWxfT3JkZXJfRXhjZXB0aW9uLExPRQBNb2RpZmllcl9Db21iaW5pbmdfTWFyayxNQ00ATm9uY2hhcmFjdGVyX0NvZGVfUG9pbnQsTkNoYXIAUGF0dGVybl9TeW50YXgsUGF0X1N5bgBQYXR0ZXJuX1doaXRlX1NwYWNlLFBhdF9XUwBRdW90YXRpb25fTWFyayxRTWFyawBSYWRpY2FsAFJlZ2lvbmFsX0luZGljYXRvcixSSQBTZW50ZW5jZV9UZXJtaW5hbCxTVGVybQBTb2Z0X0RvdHRlZCxTRABUZXJtaW5hbF9QdW5jdHVhdGlvbixUZXJtAFVuaWZpZWRfSWRlb2dyYXBoLFVJZGVvAFZhcmlhdGlvbl9TZWxlY3RvcixWUwBXaGl0ZV9TcGFjZSxzcGFjZQBCaWRpX01pcnJvcmVkLEJpZGlfTQBFbW9qaQBFbW9qaV9Db21wb25lbnQsRUNvbXAARW1vamlfTW9kaWZpZXIsRU1vZABFbW9qaV9Nb2RpZmllcl9CYXNlLEVCYXNlAEVtb2ppX1ByZXNlbnRhdGlvbixFUHJlcwBFeHRlbmRlZF9QaWN0b2dyYXBoaWMsRXh0UGljdABEZWZhdWx0X0lnbm9yYWJsZV9Db2RlX1BvaW50LERJAElEX1N0YXJ0LElEUwBDYXNlX0lnbm9yYWJsZSxDSQBBU0NJSQBBbHBoYWJldGljLEFscGhhAEFueQBBc3NpZ25lZABDYXNlZABDaGFuZ2VzX1doZW5fQ2FzZWZvbGRlZCxDV0NGAENoYW5nZXNfV2hlbl9DYXNlbWFwcGVkLENXQ00AQ2hhbmdlc19XaGVuX0xvd2VyY2FzZWQsQ1dMAENoYW5nZXNfV2hlbl9ORktDX0Nhc2Vmb2xkZWQsQ1dLQ0YAQ2hhbmdlc19XaGVuX1RpdGxlY2FzZWQsQ1dUAENoYW5nZXNfV2hlbl9V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", "base64")).buffer
  })
);
var getQuickJS = () => runtime;

// v2/validation.ts
async function normalizeRunParams(value) {
  if (typeof value.brief !== "string" || !value.brief.trim())
    throw new Error("brief is required");
  if (typeof value.script !== "string" || !value.script.trim())
    throw new Error(
      "script is required and must be a non-empty JavaScript function body"
    );
  const vm = (await getQuickJS()).newContext();
  try {
    vm.runtime.setMemoryLimit(32 << 20);
    const deadline = Date.now() + 2e3;
    vm.runtime.setInterruptHandler(() => Date.now() > deadline);
    const parsed = vm.evalCode(
      `(async function __workflow__() {
"use strict";
${value.script}
})`,
      "workflow.js",
      { compileOnly: true }
    );
    if (parsed.error) {
      const err = vm.dump(parsed.error);
      parsed.error.dispose();
      throw new Error(`workflow script is invalid JavaScript: ${err.message}`);
    }
    parsed.value.dispose();
  } finally {
    vm.dispose();
  }
  for (const field of ["max_agent_calls", "estimated_agent_calls"]) {
    if (!Number.isInteger(value[field]) || value[field] < 1 || value[field] > 2e3)
      throw new Error(`${field} must be an integer between 1 and 2000`);
  }
  if (value.estimated_agent_calls > value.max_agent_calls)
    throw new Error("estimated_agent_calls must not exceed max_agent_calls");
  const choices = {
    failure_policy: ["collect", "fail_fast"],
    sandbox: ["shared", "isolated"],
    effort_level: ["lite", "standard", "max"]
  };
  const result = { ...value };
  for (const [key, values] of Object.entries(choices)) {
    result[key] ||= values[0];
    if (!values.includes(result[key]))
      throw new Error(
        `${key} must be ${values.length === 2 ? values.join(" or ") : "lite, standard, or max"}`
      );
  }
  return result;
}

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

// v2/bridge.ts
import { setTimeout as sleep2 } from "node:timers/promises";

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

// v2/evaluator/hash.ts
import { createHash as createHash2 } from "node:crypto";
function hashInput(request) {
  const value = fromJson(WorkflowAgentCallSchema, request);
  value.brief = "";
  value.groupKey = "";
  value.groupBrief = "";
  value.effortLevel = 0;
  return JSON.stringify(
    toJson(WorkflowAgentCallSchema, value, { useProtoFieldName: true })
  );
}
function inputHashes(request) {
  const encoded = hashInput(request);
  const spaced = encoded.replace(
    /("(?:[^"\\]|\\.)*"|,)/g,
    (part) => part === "," ? ", " : part
  );
  return [encoded, spaced].map(
    (value) => createHash2("sha256").update(value).digest("hex")
  );
}

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

// v2/journal.ts
function parseCallKey(key) {
  if (!/^a\d+$/.test(key)) return;
  const index = Number(key.slice(1));
  return Number.isInteger(index) && index <= 4294967295 ? index : void 0;
}
function factTerminal(fact) {
  if (fact.status === "completed")
    return {
      result: {
        content: [{ mimeType: "application/json", text: fact.result ?? "" }],
        files: fact.artifacts ?? []
      }
    };
  return {
    error: {
      code: fact.status === "killed" ? codes.cancelled : codes.internal,
      message: fact.status === "killed" ? "agent task was killed" : fact.result ?? ""
    }
  };
}
function buildJournal(current, donors) {
  const result = /* @__PURE__ */ new Map();
  const add = (fact, completedOnly) => {
    const index = parseCallKey(fact.callKey ?? "");
    if (index === void 0 || !fact.requestHash || result.has(index) || !["completed", ...completedOnly ? [] : ["failed"]].includes(fact.status))
      return;
    result.set(index, {
      index,
      effectId: `agent-${index}-${fact.requestHash.slice(0, 12)}`,
      inputHash: fact.requestHash,
      ...factTerminal(fact)
    });
  };
  for (const fact of current) add(fact, false);
  const grouped = /* @__PURE__ */ new Map();
  for (const fact of donors) {
    const source = fact.sourceJobId ?? "";
    const group = grouped.get(source) ?? [];
    group.push(fact);
    grouped.set(source, group);
  }
  for (const group of grouped.values())
    for (const fact of group) add(fact, true);
  return [...result.entries()].sort(([a], [b]) => a - b).map(([, v]) => v);
}

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

// v2/main.ts
async function main() {
  const [command2, ...args] = process.argv.slice(2);
  if (command2 === "mcp") {
    createWorkflowMcpServer(
      false ? "dev" : "0.0.23"
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
