---
name: getting-started
description: Use when installing CPC Toolbelt, connecting Hands for the first time, or reaching Hands from another device. Call hands_setup_status before any other Hands tool.
---

# Getting started

Call `hands_setup_status` before any other Hands tool. Use that report for the install home, whether Hands is reachable, and whether a private tunnel is already configured. Do not guess those facts. If the tool is missing, say so and continue with the local stdio checks below.

This skill is setup. The Hands tool tour stays in `hands-getting-started`. Do not replace that tour.

## Paths

Resolve these at runtime. Do not invent a drive letter or a home directory.

1. Hands home: `HANDS_HOME` if set, else `CPC_ROOT` (back-compat), else `%LOCALAPPDATA%\AIWander\Hands`. When `LOCALAPPDATA` is unset, use the current user's application-data directory plus `AIWander/Hands`.
2. Cache: `CPC_CACHE` if set, else `<Hands home>/cache`.
3. Hands binary: `<Hands home>/servers/hands.exe` (or the executable `hands_setup_status` reports).

The committed stdio entries start the bundled Hands launcher with `node`. The launcher resolves the executable at startup. Confirm that `node` is on the local client’s PATH. Set `HANDS_HOME` in the client’s environment only to override the resolved home.

## Wire Hands

- Transport is stdio. One server, key `hands`, in both `.mcp.json` and `mcp.json`.
- Do not add a URL, a published port, or a second copy of Hands.
- Confirm the `hands` tools are listed.
- Cache is a directory plus skills. There is no Cache MCP server in v1.

## Private tunnel (only if they need remote access)

If `hands_setup_status` says Hands is local-only and the user wants another device to reach this host, walk them through a private tunnel. Suggest Tailscale first. Another private mesh or an SSH tunnel is fine when they already use one.

- The user installs the client and signs in themselves, in their own browser or system prompt.
- The user signs in themselves. Never store keys, tokens, or passwords, and never ask them to paste those into chat.
- Do not enable a public URL, a funnel, or an internet-open listener. The default is a private network that only their own devices join.
- After they finish sign-in, call `hands_setup_status` again and report what it returns.

Skip the tunnel when they only use Hands on this machine. No public link by default.

## Do not

- Do not brand Toolbelt or Hands as autonomous, unattended, or hands-off.
- Do not add Programmer, Voice, Workflow, or Manager here. Use `toolbelt-setup` or `enable-optional` only after the user opts in.
- Do not create the Cache directory unless the user says yes.
- Do not publish a host port map.
