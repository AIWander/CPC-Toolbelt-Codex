# CPC Toolbelt for Codex / ChatGPT

**Publisher:** AIwander  
**Tagline:** Tools Codex reaches for when you ask

This repository is a **Codex / ChatGPT plugin** (Agent Plugins portable layout + `.codex-plugin` compatibility) for Copy Paste Compute (CPC). It is the Codex face of the same free Toolbelt lane as the Cursor, Claude, and Grok packs.

## What you get

| Piece | How it ships (v0.1) |
|---|---|
| Hands | Stdio MCP in `.mcp.json` / `mcp.json` + getting-started skill |
| Cache | Path `CPC_CACHE` (suggest `C:/CPC/cache`) via `cache-first` skill — **no Cache MCP** |
| Workflow / Manager / Voice | Skills + `mcp.optionals.example.json` (optional; not wired by default) |
| Programmer | **Directed-only** — do not default-wire Programmer MCP (same as Cursor) |
| Autonomous | **Not** included — never port 7771 / autonomous branding |

This plugin does **not** ship compiled MCP binaries and does **not** send your files to AIwander. Hands and other CPC servers run on your machine. Codex / ChatGPT load the skills and the MCP command you configure.

## Requirements

1. A Windows host with CPC installed (`%CPC_ROOT%\servers\hands.exe`, usually `C:\CPC\servers\hands.exe`).
2. Codex CLI and/or ChatGPT desktop with plugins enabled.
3. Forward-slash Hands path in `.mcp.json` (default `C:/CPC/servers/hands.exe`). **Change this if your `CPC_ROOT` differs** — Windows backslash paths get mangled in some MCP loaders. The `toolbelt-setup` skill covers this.

## Install (local marketplace)

From this repo root (plugin **is** the repo root):

```bash
codex plugin marketplace add C:\CPC\suite_attempts\CPC-Toolbelt-Codex
```

Or after clone:

```bash
codex plugin marketplace add .
codex plugin marketplace add AIWander/CPC-Toolbelt-Codex
```

Marketplace catalog: `.agents/plugins/marketplace.json`  
- Marketplace name: `aiwander-cpc`  
- Plugin path: `./` (resolved relative to marketplace root = repo root)

Then install/enable **CPC Toolbelt** (`cpc-toolbelt`) from that marketplace in Codex / ChatGPT Plugins.

### Manual install (if marketplace add fails)

1. Copy this folder to `~/.codex/plugins/cpc-toolbelt` (Windows: `%USERPROFILE%\.codex\plugins\cpc-toolbelt`).
2. Add a personal marketplace entry at `~/.agents/plugins/marketplace.json` pointing `source.path` at that plugin directory (path relative to the marketplace root).
3. Restart ChatGPT desktop / refresh Codex plugins.
4. Edit `.mcp.json` Hands `command` if `CPC_ROOT` is not `C:/CPC`.

## Package layout

```
plugin.json                 # portable Agent Plugins manifest ($schema)
.codex-plugin/plugin.json   # Codex compatibility (skills + interface)
.mcp.json                   # Hands stdio (Codex-compat)
mcp.json                    # Hands stdio (portable Agent Plugins)
mcp.optionals.example.json  # voice / workflow / manager (not default)
.agents/plugins/marketplace.json
skills/                     # toolbelt-setup, hands, cache-first, enable-optional, ...
assets/logo.svg
```

## Privacy

- Skills stay on-device with Codex / ChatGPT.
- MCP traffic goes to the servers **you** configure (local `hands.exe` or your own connector).
- We do not collect analytics inside this plugin package.

Privacy policy: https://aiwander.ai/privacy

## Related

- Cursor plugin: https://github.com/AIWander/CPC-Toolbelt
- Claude directory: https://github.com/AIWander/CPC-Toolbelt-Claude
- Grok companion: https://github.com/AIWander/CPC-Toolbelt-Grok
- Protocol skills: https://github.com/AIWander/GrokCLI
- Human tour: https://github.com/AIWander/StartHERE

## License

Apache-2.0 — see `LICENSE`.
