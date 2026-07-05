# Tak Sranan Man — Claude guidance

## What this repo is

Content and branding package for Sranan Tongo, consumed by the rarelang
platform's generic engines
([`rarelang-pwa`](https://github.com/VITAL-Development/rarelang-pwa),
[`rarelang-server`](https://github.com/VITAL-Development/rarelang-server)).
No app code, no build, no `npm` tooling at all — no `package.json`,
lockfile, or `scripts/`. Icon regeneration is a rare, manual design task
done ad hoc outside this repo (see README's "Branding").

## Layout

```
content/sranantongo/{vocab,units,lessons}/*.json   # authored knowledge base
settings/sranantongo/language-settings.json        # romanization/alphabet/audio + branding
public/{favicon.svg,icons/*.png}                   # PWA icon set
```

Don't rename/restructure `content/`/`settings/` without checking
`rarelang-server`'s `CONTENT_DIR`/`SETTINGS_DIR` mounting expectations
first (see that repo's README).

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
