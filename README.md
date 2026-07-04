# Tak Sranan Man

Content and branding package for **Sranan Tongo** (Sranantongo) — the
English/Dutch-lexified creole language of Suriname — as taught by the
[rarelang](https://github.com/VITAL-Development/rarelang-pwa) platform's
generic learning engine.

This repo follows the same shape as its sibling content package,
[`sarnami-bol-naa`](https://github.com/VITAL-Development/sarnami-bol-naa)
(see that repo's issue #64 for the pattern this mirrors, and
[issue #65](https://github.com/VITAL-Development/sarnami-bol-naa/issues/65)
for this repo's own creation): a data package with no app code, consumed at
runtime by the generic engines.

- **[`rarelang-pwa`](https://github.com/VITAL-Development/rarelang-pwa)** — the generic frontend engine. No content or branding of its own.
- **[`rarelang-server`](https://github.com/VITAL-Development/rarelang-server)** — the generic backend engine. Serves this repo's content/settings over HTTP once wired up as a content source (see "Deployment" below).

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
scripts/
└── generate-icons.mjs   # Regenerates public/ from a hand-authored SVG design
```

This shape exactly mirrors what `rarelang-server` expects to mount via its
`CONTENT_DIR`/`SETTINGS_DIR` env vars (one subdirectory per learning
language code) — see `rarelang-server`'s README "Content ownership"
section.

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
`sarnami-bol-naa` — both languages are spoken in Suriname, and the
rarelang platform established this palette as its shared default theme.
Only the icon glyph differs: a speech bubble (evoking "Tak" — speak),
rather than Sarnami's "ā" macron glyph (which wouldn't fit Sranan Tongo's
diacritic-free orthography). Regenerate the icon set after any design
change:

```bash
npm install
npm run generate-icons
```

## Deployment

Not yet wired into a running `rarelang-server` deployment — the compose
setup described in `rarelang-server`'s README currently only syncs from
`sarnami-bol-naa`. Adding this repo as a second synced content source needs
its own git-sync sidecar + named volume in that compose file (see its
comments on "Multiple content repos"), tracked as a follow-up analogous to
`sarnami-bol-naa`'s issue #76.

## History

Some of this content (the first small greetings lesson) existed earlier as
a stub inside `rarelang-server`'s own repo, authored there as an
architecture smoke test (see `sarnami-bol-naa`'s issue #37). It's been
copied here, not preserved via history-rewriting tools, since it was a
small amount of recently-authored content rather than a large body of
history worth mechanically preserving.
