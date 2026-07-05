# Tak Sranan Man

Content and branding package for **Sranan Tongo** (Sranantongo) — the
English/Dutch-lexified creole language of Suriname — as taught by a generic,
language-agnostic learning platform.

This repo follows the same shape as the platform's other content packages:
a data package with no app code, consumed at runtime by two generic,
content-agnostic engines:

- **A generic frontend engine** — a PWA that renders whatever content and branding it is served. No content or branding of its own.
- **A generic backend engine** — serves this repo's content/settings over HTTP once wired up as a content source (see "Deployment" below).

## Layout

```
content/sranantongo/
├── vocab/*.json      # VocabItem[] — any filename, looked up by id
├── units/*.json      # Unit objects (id/title/order/lessons/exercises)
└── lessons/*.json    # Lesson-adjacent content (example sentences, grammar
                       # notes, exercise prompts/options), keyed by contentRef
settings/sranantongo/
└── language-settings.json   # Romanization rules, alphabet, audio config,
                              # and the `branding` object (colors/appName/icons)
public/
├── favicon.svg
└── icons/            # PWA icon set (192/512/maskable-512)
```

This shape exactly mirrors what the backend engine expects to mount via its
`CONTENT_DIR`/`SETTINGS_DIR` env vars (one subdirectory per learning
language code).

## Content

Sranan Tongo uses a **plain, unaccented Latin alphabet** — no macrons or
underdots like Sarnami — confirmed by every Sranan Tongo loanword the
Sarnami grammar reference attests to (see
`settings/sranantongo/language-settings.json`'s `romanization.notes`).

Every vocab entry is tagged `web-verified` (cross-checked against at least
two independent sources — Wikivoyage's and Wikitravel's Sranan Tongo
phrasebooks, the Glosbe Sranan Tongo–English dictionary, kaikki.org's
Sranan Tongo Wiktionary extract, and similar) or `needs-verification`
(single-sourced or unconfirmed) — check each entry's `notes` field for its
specific sourcing. Real Sranan Tongo speakers are welcome to correct
anything here; nothing is presented as confirmed without at least two
independent sources agreeing.

## Branding

Colors intentionally **reuse the same Suriname-flag-derived palette** as
the platform's other Suriname-language content — the platform established
this palette as its shared default theme.
Only the icon glyph differs: a speech bubble (evoking "Tak" — speak),
rather than Sarnami's "ā" macron glyph (which wouldn't fit Sranan Tongo's
diacritic-free orthography). The icon set in `public/` is committed and
regenerated rarely, as a one-off design task — this content package
deliberately ships no build tooling or `npm` scripts (see `CLAUDE.md`). To
regenerate icons, do the `sharp`-based rasterization ad hoc from the
`favicon.svg` design outside this repo, then commit the resulting `public/`
assets.

## Deployment

Not yet wired into a running backend-engine deployment — the reference
compose setup currently syncs only the platform's other content package.
Adding this repo as a second synced content source needs its own git-sync
sidecar + named volume in that compose file, tracked as a follow-up.

## Versioning

Releases are cut as **annotated SemVer git tags** (`vX.Y.Z`) on `main` — the
git tag is the single source of truth (this repo ships no `package.json` or
other checked-in version, so there is nothing to drift from the tag). A
backend-engine deployment pins to a tag (`GITSYNC_REF=vX.Y.Z`) rather than
tracking `main`, so a breaking content or schema change can't reach
production unreviewed. See [`docs/versioning.md`](docs/versioning.md) for the
scheme, the precise breaking-vs-additive-vs-fix definitions against this
repo's schema, and the release/upgrade process, and
[`CHANGELOG.md`](CHANGELOG.md) for what changed per release. This mirrors the
platform's shared content-repository versioning policy so all content repos
behave identically under the backend engine's content-repository contract.

## History

Some of this content (the first small greetings lesson) existed earlier as
a stub inside the backend engine's own repo, authored there as an
architecture smoke test. It's been copied here, not preserved via
history-rewriting tools, since it was a small amount of recently-authored
content rather than a large body of history worth mechanically preserving.
