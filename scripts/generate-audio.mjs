#!/usr/bin/env node
// Generates pronunciation audio for every vocab entry in
// content/sranantongo/vocab/ via rarelang-server's POST /audio/generate
// (issue tak-sranan-man#33 / rarelang-server#79/#80). Dependency-free
// (Node >=18's built-in fetch) — deliberately not an npm project (see this
// repo's CLAUDE.md: no npm tooling at all).
//
// Unlike Sarnami's equivalent script, no text transliteration is needed
// here: Sranan Tongo is authored in plain, unaccented Latin (see
// settings/sranantongo/language-settings.json's romanization.diacritics,
// which is intentionally empty), and facebook/mms-tts-srn's tokenizer
// vocabulary is plain ASCII plus only "á è ê ô" — every authored `word`
// already falls within it, so the exact authored text is sent as-is. This
// script still reads its model id from this repo's own settings (the new
// audio.ttsModel field), rather than hardcoding it, since
// rarelang-server's /audio/generate is language-agnostic by design and
// expects the caller to supply the model id on every request.
//
// Usage:
//   node scripts/generate-audio.mjs [--out <dir>] [--force] [--server <url>]
//
// Output: one <vocabId>.wav per vocab entry in --out (default
// generated-audio/sranantongo/). Wiring the result into each vocab entry's
// `audioUrl` field, converting to the settings-declared "mp3" format, and
// publishing it to wherever /audio/sranantongo/ is actually served from are
// follow-up steps outside this script's scope — this script only produces
// the audio.
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { glob } from "node:fs/promises";

const REPO_ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

function parseArgs(argv) {
  const args = {
    out: join(REPO_ROOT, "generated-audio", "sranantongo"),
    force: false,
    server: "http://localhost:8787",
  };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--out") args.out = argv[++i];
    else if (argv[i] === "--force") args.force = true;
    else if (argv[i] === "--server") args.server = argv[++i];
  }
  return args;
}

async function loadTtsModel() {
  const settingsPath = join(REPO_ROOT, "settings", "sranantongo", "language-settings.json");
  const settings = JSON.parse(await readFile(settingsPath, "utf-8"));
  const model = settings.audio?.ttsModel;
  if (!model) {
    throw new Error(`settings/sranantongo/language-settings.json has no audio.ttsModel — cannot generate audio`);
  }
  return model;
}

async function loadVocabEntries() {
  const entries = [];
  for await (const filePath of glob(join(REPO_ROOT, "content", "sranantongo", "vocab", "*.json"))) {
    const items = JSON.parse(await readFile(filePath, "utf-8"));
    for (const item of items) entries.push(item);
  }
  return entries;
}

async function generateOne(serverUrl, model, text) {
  const res = await fetch(`${serverUrl}/audio/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model, text }),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`/audio/generate ${res.status}: ${detail}`);
  }
  return Buffer.from(await res.arrayBuffer());
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const model = await loadTtsModel();
  const entries = await loadVocabEntries();
  await mkdir(args.out, { recursive: true });

  let generated = 0;
  let skipped = 0;
  let failed = 0;
  for (const entry of entries) {
    const outPath = join(args.out, `${entry.id}.wav`);
    if (!args.force && existsSync(outPath)) {
      skipped++;
      continue;
    }
    try {
      const audio = await generateOne(args.server, model, entry.word);
      await writeFile(outPath, audio);
      generated++;
      console.log(`generated ${entry.id} ("${entry.word}")`);
    } catch (err) {
      failed++;
      console.error(`FAILED ${entry.id} ("${entry.word}"): ${err.message}`);
    }
  }

  console.log(`\n${generated} generated, ${skipped} skipped (already present), ${failed} failed. Output: ${args.out}`);
  if (failed > 0) process.exitCode = 1;
}

main();
