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

