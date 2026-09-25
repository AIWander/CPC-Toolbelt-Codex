---
name: cache-first
description: >-
  Prefer local CPC_CACHE (path skills, no Cache MCP) before network fetches.
  Use when looking up prior artifacts, continuity notes, screenshots, or
  Toolbelt session residue under the configured cache directory.
---

# Cache-first (CPC Toolbelt)

## Rule

Before downloading, scraping, or re-fetching something that may already exist
locally, check `CPC_CACHE` (default suggestion: `C:/CPC/cache`).

## Steps

1. Resolve `CPC_CACHE` from the environment or ask the user (plugin setup skill
   usually sets this).
2. List or search that directory for matching files, notes, or prior outputs.
3. Reuse local content when it is fresh enough for the task.
4. Only then hit the network or re-run expensive capture.

## Constraints

- There is **no Cache MCP** in this pack — path + skills only.
- Do not invent Autonomous / port 7771 cache services.
- Do not upload cache contents to AIwander backends from this plugin.
