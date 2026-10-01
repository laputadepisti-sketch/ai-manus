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

Use this when a task fans out over many items that EACH require independent research, browsing, or judgment:
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

