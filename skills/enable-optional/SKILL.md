---
name: enable-optional
description: >-
  Merge optional CPC MCP servers (voice, workflow, manager) into Codex
  .mcp.json / mcp.json. Use when the user asks to enable optionals. Never
  wires Autonomous; Programmer stays directed-only.
---

# Enable optional CPC MCP servers (Codex)

Ask yes/no for each. All of them are stdio. The Hands home is `HANDS_HOME`, else `CPC_ROOT`, else `%LOCALAPPDATA%\AIWander\Hands` (the current user's application-data directory plus `AIWander/Hands` when `LOCALAPPDATA` is unset).

## Default matrix

| Server | Default | Notes |
|---|---|---|
| Hands | Wired in `.mcp.json` / `mcp.json` | Required free Toolbelt surface. Bundled launcher resolves Hands at startup. |
| Cache | Path skills only | `CPC_CACHE`, or `<Hands home>/cache`. No Cache MCP |
| Voice | Optional | `<Hands home>/servers/voice.exe` |
| Workflow | Optional | `<Hands home>/servers/workflow.exe`. Data dir `${HANDS_HOME}/data/workflow` |
| Manager | Optional | `<Hands home>/servers/manager.exe`. Data dir `${HANDS_HOME}/data/manager` |
| Programmer | Directed-only | Do **not** default-wire (Codex pack same as Cursor) |
| Autonomous | **Never** | Separate product. Not in free Toolbelt |

## How to merge

1. Open the plugin root `.mcp.json` (Codex compatibility) and portable `mcp.json`.
2. Copy only the servers the user requested from `mcp.optionals.example.json`.
3. Keep `"type": "stdio"` and `${HANDS_HOME}` in the command and data-dir env values. Fill `HANDS_HOME` at install time. If the host cannot expand variables, write the resolved command only into the user's private MCP config, with forward slashes on Windows. Do not write an absolute path into this repository.
4. Restart Codex or refresh the plugin so MCP tools reload.
5. Run the matching getting-started / setup skill (`voice-command-setup`,
   `workflow-getting-started`, `manager-getting-started`).

## Programmer (optional directed)

Only add a Programmer MCP entry when the user explicitly wants Programmer in a Codex coding stack. Prefer Codex-native coding otherwise. The command is stdio `${HANDS_HOME}/servers/programmer.exe`. Never treat Programmer as part of the free default matrix. Never commit an absolute path.

## Forbidden

- Autonomous branding, a public URL, or a shared-host port map
- Shipping binaries inside the plugin folder
- Silently rewriting `~/.codex/config.toml` without user request
