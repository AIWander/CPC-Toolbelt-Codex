---
name: enable-optional
description: >-
  Merge optional CPC MCP servers (voice, workflow, manager) into Codex
  .mcp.json / mcp.json. Use when the user asks to enable optionals. Never
  wires Autonomous; Programmer stays directed-only.
---

# Enable optional CPC MCP servers (Codex)

## Default matrix

| Server | Default | Notes |
|---|---|---|
| Hands | Wired in `.mcp.json` / `mcp.json` | Required free Toolbelt surface |
| Cache | Path skills only | No Cache MCP |
| Voice | Optional | See `mcp.optionals.example.json` |
| Workflow | Optional | See example file |
| Manager | Optional | See example file |
| Programmer | Directed-only | Do **not** default-wire (Codex pack same as Cursor) |
| Autonomous | **Never** | Not in free Toolbelt; no port 7771 |

## How to merge

1. Open the plugin root `.mcp.json` (Codex compatibility) and, if present,
   portable `mcp.json`.
2. Copy only the servers the user requested from `mcp.optionals.example.json`.
3. Keep **forward-slash** absolute paths on Windows, e.g.
   `C:/CPC/servers/voice.exe`. Adjust if `CPC_ROOT` differs.
4. For portable `mcp.json`, include `"type": "stdio"` on each stdio server.
5. Restart Codex or refresh the plugin so MCP tools reload.
6. Run the matching getting-started / setup skill (`voice-command-setup`,
   `workflow-getting-started`, `manager-getting-started`).

## Programmer (optional directed)

Only add a Programmer MCP entry when the user explicitly wants the Claude-default
Programmer binary in a Codex coding stack. Prefer Codex-native coding otherwise.
Never treat Programmer as part of the free default matrix.

## Forbidden

- Autonomous / `autonomous` branding / port `7771`
- Shipping binaries inside the plugin folder
- Silently rewriting `~/.codex/config.toml` without user request
