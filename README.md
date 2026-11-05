# CPC Toolbelt for Codex / ChatGPT

**Publisher:** AIwander  
**Tagline:** Tools Codex reaches for when you ask

This repository is a **Codex / ChatGPT plugin** (Agent Plugins portable layout + `.codex-plugin` compatibility) for Copy Paste Compute (CPC). It is the Codex face of the same free Toolbelt lane as the Cursor, Claude, and Grok packs.

## What you get

| Piece | How it ships (v0.1) |
|---|---|
| Hands | Stdio MCP in `.mcp.json` and `mcp.json`, started by `scripts/launch-hands.cjs` |
| Cache | `CPC_CACHE`, or `<Hands home>/cache` when that variable is unset, via the `cache-first` skill — **no Cache MCP** |
| Workflow / Manager / Voice | Skills + `mcp.optionals.example.json` (optional stdio; not wired by default) |
| Programmer | **Directed-only** — do not default-wire Programmer MCP (same as Cursor) |
| Autonomous | **Not** included — a separate product, not part of this pack |

This plugin does **not** ship compiled MCP binaries and does **not** send your files to AIwander. Hands and other CPC servers run on your machine. Codex and ChatGPT desktop load the skills and start Hands through the bundled launcher.

## Paths

The launcher runs `scripts/resolve-paths.cjs` each time Hands starts.

1. **Hands home:** `HANDS_HOME` if set, else `CPC_ROOT` (older installs), else `%LOCALAPPDATA%\AIWander\Hands`. When `LOCALAPPDATA` is unset, that is the current user's application-data directory plus `AIWander/Hands`.
2. **Cache:** `CPC_CACHE` if set, else `<Hands home>/cache`.
3. **Binaries:** `<Hands home>/servers/<name>.exe`.

Leave `HANDS_HOME` and `CPC_ROOT` unset to use the default. Set either override in the environment that starts Codex or ChatGPT desktop. Codex forwards those variables through the compatibility config.

## Requirements

1. Hands installed on this machine (`<Hands home>/servers/hands.exe`).
2. Codex CLI and/or ChatGPT desktop with plugins enabled.
3. Node.js (`node` on the local client’s PATH) to run the Hands launcher.

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
4. Verify that `node` is available and run the `getting-started` skill.

Check the tree with `node scripts/validate.mjs` before publishing. It fails if a machine-specific path is committed.

## Package layout

```
plugin.json                 # portable Agent Plugins manifest ($schema)
.codex-plugin/plugin.json   # Codex compatibility (skills + interface)
.mcp.json                   # Hands stdio (Codex-compat)
mcp.json                    # Hands stdio (portable Agent Plugins)
mcp.optionals.example.json  # voice / workflow / manager (not default)
scripts/launch-hands.cjs    # launches Hands over stdio
scripts/resolve-paths.cjs   # HANDS_HOME, else CPC_ROOT, else per-user Hands home
scripts/validate.mjs        # fails if a machine-specific path is committed
.agents/plugins/marketplace.json
skills/                     # getting-started, toolbelt-setup, hands tour, cache-first, enable-optional, ...
assets/logo.svg
```

## MCP transport

Every MCP server shipped here is **stdio**. The bundled Hands launcher resolves its executable at startup. Optional examples still require the local Hands path to be filled in. This pack does not publish a shared-host port map. Remote use, when you need it, is a private tunnel you sign into yourself. The `getting-started` skill walks through that. There is no public link by default.

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
