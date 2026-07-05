# Tak Sranan Man — Claude guidance

## What this repo is

Content and branding package for Sranan Tongo, consumed by the rarelang
platform's generic engines
([`rarelang-pwa`](https://github.com/VITAL-Development/rarelang-pwa),
[`rarelang-server`](https://github.com/VITAL-Development/rarelang-server)).
No app code, no build, no `npm run dev`/`npm test`. The only script is icon
regeneration (see README's "Branding").

## Layout

```
content/sranantongo/{vocab,units,lessons}/*.json   # authored knowledge base
settings/sranantongo/language-settings.json        # romanization/alphabet/audio + branding
public/{favicon.svg,icons/*.png}                   # PWA icon set
scripts/generate-icons.mjs                         # regenerates public/ from a hand-authored SVG
```

Don't rename/restructure `content/`/`settings/` without checking
`rarelang-server`'s `CONTENT_DIR`/`SETTINGS_DIR` mounting expectations
first (see that repo's README).

## Versioning

Releases are **annotated SemVer git tags** (`vX.Y.Z`) on `main`; the tag is
the single source of truth (there is no `version` field in `package.json` —
don't reintroduce one). Before renaming/removing a consumed field, changing
a field's type, breaking a `*Ref`, or moving `content/`/`settings/`, know
that's a **MAJOR** (breaking) change; adding content or an optional field is
**MINOR**; a same-shape value/spelling/ref-target fix is **PATCH**. Record
every content/schema change under `## [Unreleased]` in `CHANGELOG.md`. The
authoritative rules — and how a git-sync deployment pins to a tag — live in
[`docs/versioning.md`](docs/versioning.md). This mirrors `sarnami-bol-naa`'s
policy (sarnami-bol-naa#86).

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

## Branding

`settings/sranantongo/language-settings.json`'s `branding` field carries
colors (RGB-triplet strings, matching `rarelang-pwa`'s
`--color-{forest,flame,gold,cream}-*` CSS custom property naming), appName
("Tak Sranan Man"), and icon paths. Colors intentionally match
`sarnami-bol-naa`'s palette (shared Suriname-flag theme across the
platform); only the icon glyph is distinct.
