# Tak Sranan Man — Claude guidance

## What this repo is

Content and branding package for Sranan Tongo, consumed by a generic,
language-agnostic learning platform's engines (a PWA frontend engine and an
HTTP backend engine, both content-agnostic). No app code, no build, no
`npm` tooling at all — no `package.json`, lockfile, or `scripts/`. Icon
regeneration is a rare, manual design task done ad hoc outside this repo
(see README's "Branding").

## Layout

```
content/sranantongo/{vocab,units,lessons}/*.json   # authored knowledge base
settings/sranantongo/language-settings.json        # romanization/alphabet/audio + branding
public/{favicon.svg,icons/*.png}                   # PWA icon set
docs/lesson-plan.md                                # curriculum plan: unit sequence, scope, sourcing
docs/versioning.md                                 # SemVer git-tag release policy
```

Don't rename/restructure `content/`/`settings/` without checking the
backend engine's `CONTENT_DIR`/`SETTINGS_DIR` mounting expectations first.

[`docs/lesson-plan.md`](docs/lesson-plan.md) is the single source of truth
for the unit/lesson curriculum — sequencing, per-unit scope, exercise-kind
mix, and sourcing strength per unit. Author new units against it rather
than improvising scope or ordering.

## Versioning

Releases are **annotated SemVer git tags** (`vX.Y.Z`) on `main`; the tag is
the single source of truth (this repo has no `package.json` or other
checked-in version to keep in sync — don't add one). Before renaming/removing
a consumed field, changing
a field's type, breaking a `*Ref`, or moving `content/`/`settings/`, know
that's a **MAJOR** (breaking) change; adding content or an optional field is
**MINOR**; a same-shape value/spelling/ref-target fix is **PATCH**. Record
every content/schema change under `## [Unreleased]` in `CHANGELOG.md`. The
authoritative rules — and how a git-sync deployment pins to a tag — live in
[`docs/versioning.md`](docs/versioning.md). This mirrors the platform's
shared content-repository versioning policy.

## Content authoring — verification discipline

Sranan Tongo content here must be cross-checked against **at least two
independent sources** before being tagged `web-verified` — good sources:
Wikivoyage's and Wikitravel's Sranan Tongo phrasebooks, the Glosbe Sranan
Tongo–English dictionary, kaikki.org's Sranan Tongo Wiktionary extract.
Anything single-sourced or unconfirmed gets tagged `needs-verification`
instead of being presented as confirmed — see existing entries in
`content/sranantongo/vocab/*.json` for the pattern. Don't invent or guess
at vocabulary/grammar; a smaller, fully-verified lesson is much better than
a larger one with unverified content.

Sranan Tongo uses a plain, unaccented Latin alphabet — no macrons or
underdots like Sarnami. Don't add diacritics that aren't independently
attested.

CI (`.github/workflows/validate-content.yml`) runs on every PR: a
deterministic gate runs rarelang-server's `validate-content` CLI against
`content/sranantongo` + `settings/sranantongo` (broken `*Ref`s or missing
required fields fail the PR before merge), a contracts-discovery job flags
upstream drift in rarelang-server's contract docs against
`contracts.lock.json`, and — only on PRs touching `content/sranantongo` or
`docs/lesson-plan.md` — an advisory, cost-bounded Claude pass reviews the
two prose/judgment contracts (CEFR-tier correctness, A2 English-readability
ceiling) non-blockingly. This is in addition to, not a replacement for,
the two-independent-source verification above.

A lesson may carry an optional, id-keyed `generatedSpec` (vocab/grammar
refs, topics, exercise kinds, count, distractor scope) alongside its fixed
`exercises` array — this is additive content consumed by the backend
engine's seeded exercise-arrangement generator (rarelang-server#37) to
serve a varied exercise mix per replay; it doesn't replace the fixed
exercises and introduces no new content text (see
`content/sranantongo/units/unit-01-srn-greetings.json` for the pattern).

## Branding

`settings/sranantongo/language-settings.json`'s `branding` field carries
colors (RGB-triplet strings, matching the frontend engine's
`--color-{forest,flame,gold,cream}-*` CSS custom property naming), appName
("Tak Sranan Man"), and icon paths. Colors intentionally match the
platform's shared Suriname-flag palette (reused across the platform's
Suriname-language content); only the icon glyph is distinct.
