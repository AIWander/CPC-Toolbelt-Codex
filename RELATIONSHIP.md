# Relationship

| Lane | Repo | Role |
|---|---|---|
| Cursor Toolbelt | AIWander/CPC-Toolbelt | Cursor marketplace plugin |
| Grok companion | AIWander/CPC-Toolbelt-Grok | Grok walkthrough / skills |
| Claude directory | AIWander/CPC-Toolbelt-Claude | Claude plugin bundle for directory |
| Codex / ChatGPT | AIWander/CPC-Toolbelt-Codex (this repo) | Codex/ChatGPT Agent Plugins pack (Hands + Cache skills + optionals) |
| Suite | [AIWander/CPC-Suite](https://github.com/AIWander/CPC-Suite) | Signed installers for the local binaries |
| Protocol | AIWander/GrokCLI | `cpc-*` protocol skills |

Free Toolbelt matrix: Hands + Cache (path/skills). Optional Voice / Workflow / Manager. Programmer directed-only. Autonomous stays a separate product and out of free Toolbelt branding.

Paths are per user. The Hands home is `HANDS_HOME`, else `CPC_ROOT`, else `%LOCALAPPDATA%\AIWander\Hands`. Cache is `CPC_CACHE`, else `<Hands home>/cache`. This map does not name a developer machine or a private checkout.

## MCP wiring default

- **Default:** stdio via `${HANDS_HOME}/servers/*.exe` (see `mcp.json`, `.mcp.json`, `mcp.optionals.example.json`). Fill `HANDS_HOME` at install time, or write the resolved command into the user's private MCP config.
- Do not commit absolute paths. Do not publish a shared-host port list. Remote access is a private tunnel the user signs into themselves (`getting-started` skill).
