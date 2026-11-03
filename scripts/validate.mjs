#!/usr/bin/env node
/**
 * Fail if the Codex Toolbelt plugin ships a machine-specific path,
 * a device nickname, a CGNAT example address, or a published host port.
 *
 * Stdio MCP commands must use ${HANDS_HOME}, filled at install time.
 */
import fs from 'fs';
import os from 'os';
import path from 'path';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(import.meta.url);
const { resolveToolbeltPaths } = require(path.join(root, 'scripts', 'resolve-paths.cjs'));

const errors = [];
const warnings = [];

function mustExist(rel) {
  if (!fs.existsSync(path.join(root, rel))) errors.push('missing ' + rel);
}

function readJson(rel) {
  const abs = path.join(root, rel);
  if (!fs.existsSync(abs)) {
    errors.push('missing ' + rel);
    return null;
  }
  try {
    return JSON.parse(fs.readFileSync(abs, 'utf8'));
  } catch (err) {
    errors.push(rel + ' is not JSON: ' + (err && err.message ? err.message : err));
    return null;
  }
}

for (const rel of [
  'README.md',
  'SUBMISSION.md',
  'RELATIONSHIP.md',
  'plugin.json',
  '.codex-plugin/plugin.json',
  'mcp.json',
  '.mcp.json',
  'mcp.optionals.example.json',
  'scripts/resolve-paths.cjs',
  'skills/getting-started/SKILL.md',
  'skills/hands-getting-started/SKILL.md',
  'skills/toolbelt-setup/SKILL.md',
  'skills/cache-first/SKILL.md',
  'skills/enable-optional/SKILL.md',
]) {
  mustExist(rel);
}

function isAbsoluteCommand(cmd) {
  return /^[A-Za-z]:[\\/]/.test(cmd) || cmd.startsWith('/') || cmd.startsWith('\\\\');
}

function assertInstallTime(rel, name, field, value) {
  const text = String(value || '');
  if (!text) {
    errors.push(rel + ' ' + name + ' missing ' + field);
    return;
  }
  if (isAbsoluteCommand(text)) {
    errors.push(rel + ' ' + name + ' ' + field + ' is an absolute path');
  }
  if (!/\$\{HANDS_HOME\}/.test(text)) {
    errors.push(rel + ' ' + name + ' ' + field + ' must use ${HANDS_HOME} (filled at install time)');
  }
}

function assertStdioServers(rel, doc) {
  if (!doc) return;
  const servers = doc.mcpServers || {};
  const names = Object.keys(servers);
  if (names.length === 0) errors.push(rel + ' has no mcpServers');
  for (const [name, spec] of Object.entries(servers)) {
    if (!spec || typeof spec !== 'object') {
      errors.push(rel + ' ' + name + ' is not an object');
      continue;
    }
    if (spec.url) errors.push(rel + ' ' + name + ' must be stdio, not a url');
    if (spec.type !== 'stdio') errors.push(rel + ' ' + name + ' must set type "stdio"');
    assertInstallTime(rel, name, 'command', spec.command);
    if (spec.env && typeof spec.env === 'object') {
      for (const [key, value] of Object.entries(spec.env)) {
        if (typeof value !== 'string') {
          errors.push(rel + ' ' + name + ' env ' + key + ' must be a string');
          continue;
        }
        assertInstallTime(rel, name, 'env.' + key, value);
      }
    }
  }
}

for (const rel of ['mcp.json', '.mcp.json', 'mcp.optionals.example.json']) {
  const doc = readJson(rel);
  assertStdioServers(rel, doc);
  if (rel !== 'mcp.optionals.example.json' && doc) {
    const keys = Object.keys(doc.mcpServers || {});
    if (keys.length !== 1 || keys[0] !== 'hands') {
      errors.push(rel + ' must contain only the hands server');
    }
  }
}

const optionals = readJson('mcp.optionals.example.json');
if (optionals) {
  for (const name of ['voice', 'workflow', 'manager']) {
    if (!optionals.mcpServers?.[name]) errors.push('mcp.optionals.example.json missing ' + name);
  }
  if (optionals.mcpServers?.programmer || optionals.mcpServers?.['cpc-programmer']) {
    errors.push('mcp.optionals.example.json must not default-wire Programmer');
  }
}

const gettingStarted = path.join(root, 'skills', 'getting-started', 'SKILL.md');
if (fs.existsSync(gettingStarted)) {
  const text = fs.readFileSync(gettingStarted, 'utf8');
  if (!text.includes('hands_setup_status')) {
    errors.push('getting-started skill must tell the agent to call hands_setup_status first');
  }
  if (!/Tailscale/i.test(text)) errors.push('getting-started skill must walk through a private tunnel');
  if (!/never store/i.test(text)) errors.push('getting-started skill must say never store keys');
  if (!/public/i.test(text)) errors.push('getting-started skill must refuse a public link by default');
  if (!/hands-getting-started/.test(text)) {
    errors.push('getting-started skill must keep the hands-getting-started tour beside it');
  }
}

const handsTour = path.join(root, 'skills', 'hands-getting-started', 'SKILL.md');
if (fs.existsSync(handsTour)) {
  const text = fs.readFileSync(handsTour, 'utf8');
  if (!/browser_launch/.test(text)) {
    errors.push('hands-getting-started tour must stay the Hands tool tour');
  }
}

const readme = fs.existsSync(path.join(root, 'README.md'))
  ? fs.readFileSync(path.join(root, 'README.md'), 'utf8')
  : '';
if (readme) {
  if (!/autonomous/i.test(readme)) warnings.push('README should mention not branding as autonomous');
  if (!/CPC_CACHE/.test(readme)) warnings.push('README should mention CPC_CACHE');
  if (!/HANDS_HOME/.test(readme)) warnings.push('README should mention HANDS_HOME');
  if (!/stdio/i.test(readme)) errors.push('README must describe stdio MCP');
  if (!/LOCALAPPDATA/.test(readme)) {
    errors.push('README must document the per-user Hands home');
  }
}

const skipScan = new Set([path.normalize('scripts/validate.mjs')]);
const scanExt = new Set(['.md', '.mdc', '.js', '.mjs', '.cjs', '.json', '.svg', '.txt', '.yml', '.yaml']);
const machineRes = [
  new RegExp('C:[\\\\/]+' + 'CPC\\b', 'i'),
  new RegExp('suite_' + 'attempts', 'i'),
  new RegExp('\\b' + String.fromCharCode(66, 69, 69) + '\\b'),
  new RegExp('Jose' + 'p'),
  new RegExp('\\b' + ['p', 'a', 'l'].join('') + '\\b', 'i'),
  new RegExp('tail' + '7263d4', 'i'),
  new RegExp('\\b100\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\b'),
  new RegExp('[A-Za-z]:\\\\Users\\\\', 'i'),
  /\b777[1-9]\b/,
];

const probeSamples = [
  ['C:', '/CPC/servers/hands.exe'].join(''),
  ['C:', '\\CPC\\cache'].join(''),
  ['suite', '_attempts'].join(''),
  String.fromCharCode(66, 69, 69),
  ['Jose', 'p'].join(''),
  ['p', 'a', 'l'].join(''),
  ['tail', '7263d4'].join(''),
  ['100', '.64.1.2'].join(''),
  ['C:\\Users\\', 'someone'].join(''),
  ['777', '1'].join(''),
  ['777', '9'].join(''),
];
for (const sample of probeSamples) {
  if (!machineRes.some((re) => re.test(sample))) {
    errors.push('validator regex missed a machine-specific sample');
  }
}
const allowed = '${HANDS_HOME}/servers/hands.exe';
if (machineRes.some((re) => re.test(allowed))) {
  errors.push('validator regex flagged the install-time Hands command');
}

function walk(dir, relBase) {
  for (const name of fs.readdirSync(dir)) {
    if (name === '.git' || name === 'node_modules') continue;
    const abs = path.join(dir, name);
    const rel = relBase ? relBase + '/' + name : name;
    const st = fs.statSync(abs);
    if (st.isDirectory()) {
      walk(abs, rel);
      continue;
    }
    if (!scanExt.has(path.extname(name))) continue;
    if (skipScan.has(path.normalize(rel))) continue;
    const text = fs.readFileSync(abs, 'utf8');
    for (const re of machineRes) {
      if (re.test(text)) errors.push('hard-coded machine path or host detail in ' + rel + ' (' + re + ')');
    }
  }
}
walk(root, '');

function withEnv(extra, fn) {
  const keys = ['HANDS_HOME', 'CPC_ROOT', 'CPC_CACHE', 'LOCALAPPDATA', 'XDG_DATA_HOME'];
  const saved = {};
  for (const key of keys) {
    saved[key] = process.env[key];
    delete process.env[key];
  }
  Object.assign(process.env, extra);
  try {
    return fn();
  } finally {
    for (const key of keys) {
      if (saved[key] === undefined) delete process.env[key];
      else process.env[key] = saved[key];
    }
  }
}

const fixture = fs.mkdtempSync(path.join(os.tmpdir(), 'cpc-toolbelt-codex-'));
try {
  const handsHome = path.join(fixture, 'hands-home');
  const olderRoot = path.join(fixture, 'older-root');
  const cacheOverride = path.join(fixture, 'cache-override');
  const localApp = path.join(fixture, 'local');

  const prefer = withEnv(
    { HANDS_HOME: handsHome, CPC_ROOT: olderRoot, CPC_CACHE: cacheOverride },
    () => resolveToolbeltPaths()
  );
  if (prefer.home.source !== 'HANDS_HOME' || prefer.home.path !== path.resolve(handsHome)) {
    errors.push('HANDS_HOME must win over CPC_ROOT');
  }
  if (prefer.cache.source !== 'CPC_CACHE' || prefer.cache.path !== path.resolve(cacheOverride)) {
    errors.push('CPC_CACHE must override <Hands home>/cache');
  }
  if (prefer.handsExe !== path.join(path.resolve(handsHome), 'servers', 'hands.exe')) {
    errors.push('hands.exe must stay under the resolved Hands home');
  }

  const backCompat = withEnv({ CPC_ROOT: olderRoot }, () => resolveToolbeltPaths());
  if (backCompat.home.source !== 'CPC_ROOT' || backCompat.home.path !== path.resolve(olderRoot)) {
    errors.push('CPC_ROOT should be the Hands home when HANDS_HOME is unset');
  }
  if (backCompat.cache.path !== path.join(path.resolve(olderRoot), 'cache')) {
    errors.push('default Cache must be <Hands home>/cache');
  }

  const perUser = withEnv({ LOCALAPPDATA: localApp }, () => resolveToolbeltPaths());
  const expectedHome = path.resolve(path.join(localApp, 'AIWander', 'Hands'));
  if (perUser.home.source !== 'default' || perUser.home.path !== expectedHome) {
    errors.push('default Hands home must be %LOCALAPPDATA%/AIWander/Hands');
  }
  if (perUser.cache.source !== 'default' || perUser.cache.path !== path.join(expectedHome, 'cache')) {
    errors.push('default Cache must be <Hands home>/cache when CPC_CACHE is unset');
  }
} finally {
  fs.rmSync(fixture, { recursive: true, force: true });
}

if (warnings.length) {
  for (const warning of warnings) process.stderr.write('warning: ' + warning + '\n');
}
if (errors.length) {
  for (const error of errors) process.stderr.write('error: ' + error + '\n');
  process.exit(1);
}
process.stdout.write('ok\n');
