---
name: toolbelt-setup
description: >-
  Configure CPC Toolbelt on Codex/ChatGPT after install. Use when enabling the
  plugin, checking ~/.codex, .mcp.json Hands path, CPC_CACHE, marketplace
  install, or first-run Toolbelt setup. Never wires Autonomous.
---

# CPC Toolbelt setup (Codex)

## Goal

Confirm Hands MCP, Cache path skills, and optional CPC servers work for Codex
without touching Autonomous / port 7771.

## Steps

1. Confirm this plugin is installed (repo marketplace, personal marketplace, or
   `~/.codex/plugins/cpc-toolbelt`). Identity: `cpc-toolbelt` / display name
   **CPC Toolbelt**.
2. Read `.mcp.json` (and portable `mcp.json` if present) at the plugin root.
   Default Hands command is `C:/CPC/servers/hands.exe` using **forward slashes**
   (Windows backslash paths get mangled in some MCP loaders). If the user's
   `CPC_ROOT` differs from `C:/CPC`, update the Hands `command` path and tell
   them to restart Codex / refresh the plugin.
3. Verify `hands.exe` exists at that path when the session can see the local
   filesystem. If missing, tell the user to install CPC Hands first under their
   CPC root (`servers/hands.exe`).
4. Prefer env / convention `CPC_CACHE` (suggest `C:\CPC\cache` or
   `C:/CPC/cache`). Create the folder if missing. There is **no Cache MCP** —
   Cache is path + skills only (`cache-first`).
5. Confirm Codex can see the `hands` MCP tools (`tools/list` or equivalent).
   This pack ships Hands in `.mcp.json`; optionals (voice / workflow / manager)
   are documented in `mcp.optionals.example.json` and the `enable-optional`
   skill — do not auto-merge them.
6. Point the user at `hands-getting-started` for the first real automation task.
7. **Never** add Autonomous, never suggest wiring port `7771`, and never brand
   this pack as autonomous. Programmer MCP is **optional / directed-only** —
   same as Cursor — do **not** default-wire it.

## Codex notes

- Portable identity lives in root `plugin.json` (`$schema` Agent Plugins 1.0).
- Compatibility overlay: `.codex-plugin/plugin.json` with `skills: "./skills/"`.
- Local marketplace: `.agents/plugins/marketplace.json` (marketplace name
  `aiwander-cpc`, plugin path `./`).
- Config home: `~/.codex/` (Windows: `%USERPROFILE%\.codex`). Do not rewrite the
  user's `config.toml` unless they explicitly ask; marketplace add is enough for
  discovery.

## Done when

- Hands path is correct for this machine
- `CPC_CACHE` is set or clearly named
- Hands tools are available (or the gap is clearly named)
- User knows the next skill (`hands-getting-started` or `enable-optional`)
