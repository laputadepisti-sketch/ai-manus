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

