---
name: toolbelt-setup
description: >-
  Configure CPC Toolbelt on Codex/ChatGPT after install. Use when enabling the
  plugin, checking ~/.codex, HANDS_HOME, the Cache path, marketplace install,
  or first-run Toolbelt setup. Never wires Autonomous.
---

# CPC Toolbelt setup (Codex)

Run the `getting-started` skill first if `hands_setup_status` has not been called this session.

## Goal

Confirm Hands MCP, Cache path skills, and optional CPC servers work for Codex.
Do not brand this pack as autonomous, and do not publish a port map.

## Paths

1. Hands home: `HANDS_HOME` if set, else `CPC_ROOT` (back-compat), else `%LOCALAPPDATA%\AIWander\Hands`. When `LOCALAPPDATA` is unset, that is the current user's application-data directory plus `AIWander/Hands`.
2. Cache: `CPC_CACHE` if set, else `<Hands home>/cache`.
3. Binaries: `<Hands home>/servers/<name>.exe`.

## Steps

1. Confirm this plugin is installed (repo marketplace, personal marketplace, or
   `~/.codex/plugins/cpc-toolbelt`). Identity: `cpc-toolbelt` / display name
   **CPC Toolbelt**.
2. Read `.mcp.json` and portable `mcp.json` at the plugin root. Both must be
   stdio. The committed Hands command is `${HANDS_HOME}/servers/hands.exe`.
   Fill `HANDS_HOME` at install time so the variable expands. If the host
   cannot expand variables, write the resolved command only into the user's
   private MCP config. On Windows, use forward slashes there — backslash paths
   get mangled in some MCP loaders. Never write that absolute path back into
   this repository.
3. Verify `hands.exe` exists under `<Hands home>/servers` when the session can
   see the local filesystem. If missing, tell the user to install Hands first.
4. Confirm Cache: `CPC_CACHE`, or `<Hands home>/cache` when they have not set
   one. Create the folder only if the user says yes. There is **no Cache MCP** —
   Cache is path + skills only (`cache-first`).
5. Confirm Codex can see the `hands` MCP tools (`tools/list` or equivalent).
   This pack ships Hands in `.mcp.json`; optionals (voice / workflow / manager)
   are documented in `mcp.optionals.example.json` and the `enable-optional`
   skill — do not auto-merge them.
6. After Hands is wired, point the user at `hands-getting-started` for the
   tool tour. That tour is separate from `getting-started`.
7. **Never** add Autonomous, never suggest a shared-host port list, and never
   brand this pack as autonomous. Programmer MCP is **optional / directed-only**
   — same as Cursor — do **not** default-wire it.

## Codex notes

- Portable identity lives in root `plugin.json` (`$schema` Agent Plugins 1.0).
- Compatibility overlay: `.codex-plugin/plugin.json` with `skills: "./skills/"`.
- Local marketplace: `.agents/plugins/marketplace.json` (marketplace name
  `aiwander-cpc`, plugin path `./`).
- Config home: `~/.codex/` (Windows: `%USERPROFILE%\.codex`). Do not rewrite the
  user's `config.toml` unless they explicitly ask; marketplace add is enough for
  discovery.

## Done when

- Hands command is stdio and `HANDS_HOME` is filled for this machine (or the private config holds the resolved command)
- Cache path is `CPC_CACHE` or `<Hands home>/cache`
- Hands tools are available (or the gap is clearly named)
- User knows the next skill (`hands-getting-started` or `enable-optional`)
