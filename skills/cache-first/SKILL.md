---
name: cache-first
description: >-
  Prefer the local Cache path (path skills, no Cache MCP) before network fetches.
  Use when looking up prior artifacts, continuity notes, screenshots, or
  Toolbelt session residue under the configured cache directory.
---

# Cache-first (CPC Toolbelt)

## Rule

Before downloading, scraping, or re-fetching something that may already exist
locally, resolve Cache: `CPC_CACHE` if set, otherwise `<Hands home>/cache`.
The Hands home is `HANDS_HOME`, else `CPC_ROOT`, else `%LOCALAPPDATA%\AIWander\Hands`
(the current user's application-data directory plus `AIWander/Hands` when
`LOCALAPPDATA` is unset).

## Steps

1. Resolve Cache from the environment using the rule above, or ask the user.
   The `getting-started` skill usually establishes the Hands home first.
2. List or search that directory for matching files, notes, or prior outputs.
3. Reuse local content when it is fresh enough for the task.
4. Only then hit the network or re-run expensive capture.

## Constraints

- There is **no Cache MCP** in this pack — path + skills only.
- Do not invent an Autonomous cache service, and do not publish a port map.
- Do not upload cache contents to AIwander backends from this plugin.
- Do not assume a fixed drive path.
