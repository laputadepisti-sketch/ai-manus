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

