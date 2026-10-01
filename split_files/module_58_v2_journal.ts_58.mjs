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

