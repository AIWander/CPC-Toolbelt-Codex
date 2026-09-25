# Submit / install — Codex & ChatGPT plugins

Docs: https://developers.openai.com/codex/plugins/build  
Public submission: ChatGPT / Codex universal plugin directory (submit portal per OpenAI docs).  
Local / team distribution: repo or personal marketplace (this repo ships one).

## What this repo is

**Plugin package** at repository root:

- Portable: `plugin.json` + `mcp.json` + `skills/`
- Compatibility: `.codex-plugin/plugin.json` + `.mcp.json`
- Marketplace: `.agents/plugins/marketplace.json` (name `aiwander-cpc`, plugin `path: "./"`)

- Repository: `https://github.com/AIWander/CPC-Toolbelt-Codex`
- Manifest name: `cpc-toolbelt`
- Display name: CPC Toolbelt
- Version: 0.1.0

## Local marketplace commands

```bash
codex plugin marketplace add C:\CPC\suite_attempts\CPC-Toolbelt-Codex
codex plugin marketplace add AIWander/CPC-Toolbelt-Codex
codex plugin marketplace list
codex plugin list
```

Then install **cpc-toolbelt** from marketplace `aiwander-cpc` in the ChatGPT desktop Plugins Directory or via `codex plugin add` when targeting a configured marketplace entry.

## Manual fallback

```text
copy/clone → %USERPROFILE%\.codex\plugins\cpc-toolbelt
edit ~/.agents/plugins/marketplace.json → source.path to that folder (relative to marketplace root)
restart ChatGPT desktop / refresh Codex
fix Hands path in .mcp.json if CPC_ROOT ≠ C:/CPC
```

## Listing copy

- Display name: CPC Toolbelt
- Short description: AIwander CPC Toolbelt for Codex/ChatGPT: Hands MCP + Cache path skills + optional Workflow / Manager / Voice. Does not include Autonomous.
- Author: AIwander / contact@aiwander.ai
- Homepage: https://aiwander.ai
- License: Apache-2.0
- Keywords: cpc, hands, toolbelt, aiwander, codex

## Data handling answers (suggested)

| Question | Suggested answer |
|---|---|
| Reads or stores personal data? | Local MCP command paths and optional `CPC_CACHE` path the user configures. No AIwander backend in this package. |
| Sends data to services other than declared connectors? | No. MCP traffic goes to local servers the user configures (e.g. Hands). |
| Retention | No plugin-side retention. |
| Under 18? | No. |

## Not in this submission

- Autonomous / port 7771
- Programmer as a default MCP (directed-only)
- Compiled `hands.exe` binaries inside the plugin folder
- Cache MCP (path + skills only)

## After local verify

1. `codex plugin marketplace add` succeeds (or manual install documented).
2. Hands tools appear after enable.
3. Optional: submit to the public ChatGPT/Codex plugin directory when ready.
