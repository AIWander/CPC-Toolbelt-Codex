# CPC Toolbelt for Codex / ChatGPT

**Publisher:** AIwander  
**Tagline:** Tools Codex reaches for when you ask

This repository is a **Codex / ChatGPT plugin** (Agent Plugins portable layout + `.codex-plugin` compatibility) for Copy Paste Compute (CPC). It is the Codex face of the same free Toolbelt lane as the Cursor, Claude, and Grok packs.

## What you get

| Piece | How it ships (v0.1) |
|---|---|
| Hands | Required stdio MCP in `.mcp.json` / `mcp.json`: `${HANDS_HOME}/servers/hands.exe` |
| Cache | `CPC_CACHE`, or `<Hands home>/cache` when that variable is unset, via the `cache-first` skill — **no Cache MCP** |
| Workflow / Manager / Voice | Skills + `mcp.optionals.example.json` (optional stdio; not wired by default) |
| Programmer | **Directed-only** — do not default-wire Programmer MCP (same as Cursor) |
| Autonomous | **Not** included — a separate product, not part of this pack |

This plugin does **not** ship compiled MCP binaries and does **not** send your files to AIwander. Hands and other CPC servers run on your machine. Codex / ChatGPT load the skills and the MCP command filled in at install time.

## Paths

Resolved at install time, and again by `scripts/resolve-paths.cjs`. Nothing in this repo points at one person's machine.

1. **Hands home:** `HANDS_HOME` if set, else `CPC_ROOT` (older installs), else `%LOCALAPPDATA%\AIWander\Hands`. When `LOCALAPPDATA` is unset, that is the current user's application-data directory plus `AIWander/Hands`.
2. **Cache:** `CPC_CACHE` if set, else `<Hands home>/cache`.
3. **Binaries:** `<Hands home>/servers/<name>.exe`.

`CPC_ROOT` and `CPC_CACHE` are back-compat environment overrides. Leave them empty on a new install. Fill `HANDS_HOME` at install time so the stdio command can expand. If the host cannot expand variables, write the resolved command only into the user's private MCP config. Do not paste an absolute path back into this repository.

## Requirements

1. Hands installed on this machine (`<Hands home>/servers/hands.exe`).
2. Codex CLI and/or ChatGPT desktop with plugins enabled.
3. Stdio Hands entry `${HANDS_HOME}/servers/hands.exe` in `.mcp.json` and `mcp.json`. On Windows, a path written into the user's private config should use forward slashes — backslash paths get mangled in some MCP loaders. The `getting-started` skill covers this.

## Install (local marketplace)

From this repo root (plugin **is** the repo root):

```bash
codex plugin marketplace add .
codex plugin marketplace add AIWander/CPC-Toolbelt-Codex
```

Marketplace catalog: `.agents/plugins/marketplace.json`  
- Marketplace name: `aiwander-cpc`  
- Plugin path: `./` (resolved relative to marketplace root = repo root)

Then install/enable **CPC Toolbelt** (`cpc-toolbelt`) from that marketplace in Codex / ChatGPT Plugins.

Run the `getting-started` skill. It calls `hands_setup_status` before any other Hands tool.

### Manual install (if marketplace add fails)

1. Copy this folder to `~/.codex/plugins/cpc-toolbelt` (Windows: `%USERPROFILE%\.codex\plugins\cpc-toolbelt`).
2. Add a personal marketplace entry at `~/.agents/plugins/marketplace.json` pointing `source.path` at that plugin directory (path relative to the marketplace root).
3. Restart ChatGPT desktop / refresh Codex plugins.
4. Set `HANDS_HOME` so `${HANDS_HOME}` expands, or write the resolved stdio command only into the user's private MCP config.

Check the tree with `node scripts/validate.mjs` before publishing. It fails if a machine-specific path is committed.

## Package layout

```
plugin.json                 # portable Agent Plugins manifest ($schema)
.codex-plugin/plugin.json   # Codex compatibility (skills + interface)
.mcp.json                   # Hands stdio (Codex-compat)
mcp.json                    # Hands stdio (portable Agent Plugins)
mcp.optionals.example.json  # voice / workflow / manager (not default)
scripts/resolve-paths.cjs   # HANDS_HOME, else CPC_ROOT, else per-user Hands home
scripts/validate.mjs        # fails if a machine-specific path is committed
.agents/plugins/marketplace.json
skills/                     # getting-started, toolbelt-setup, hands tour, cache-first, enable-optional, ...
assets/logo.svg
```

## MCP transport

Every MCP server shipped here is **stdio**. Commands use `${HANDS_HOME}` (filled at install time). This pack does not publish a shared-host port map. Remote use, when you need it, is a private tunnel you sign into yourself. The `getting-started` skill walks through that. There is no public link by default.

## Privacy

- Skills stay on-device with Codex / ChatGPT.
- MCP traffic goes to the servers **you** configure (local `hands.exe` or your own connector).
- We do not collect analytics inside this plugin package.

Privacy policy: https://aiwander.ai/privacy

## Related

- Lane map: [`RELATIONSHIP.md`](./RELATIONSHIP.md)
- Cursor plugin: https://github.com/AIWander/CPC-Toolbelt
- Claude directory: https://github.com/AIWander/CPC-Toolbelt-Claude
- Grok companion: https://github.com/AIWander/CPC-Toolbelt-Grok
- Protocol skills: https://github.com/AIWander/GrokCLI
- Human tour: https://github.com/AIWander/StartHERE
- Signed installers: https://github.com/AIWander/CPC-Suite

## License

Apache-2.0 — see `LICENSE`.
