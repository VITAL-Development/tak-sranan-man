# Changelog

All notable changes to this repo's **published content and settings**
(`content/sranantongo/`, `settings/sranantongo/`) are recorded here. The
format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this repo follows [Semantic Versioning](https://semver.org/) via
annotated git tags — see [`docs/versioning.md`](docs/versioning.md) for the
scheme and the precise definition of what counts as a **breaking** (MAJOR)
vs additive (MINOR) vs fix (PATCH) change.

This log tracks **content and schema-relevant** changes — anything a
consumer syncing this repo would care about (new/changed vocab, units,
lessons, or `language-settings.json` shape). Pure docs or tooling edits that
don't affect served content need not appear.

Releases are cut as git tags `vX.Y.Z`. The entries below accumulate under
`[Unreleased]` until the next release is cut, at which point they move under
a dated `## [X.Y.Z]` heading.

## [Unreleased]

### Added

- `content/sranantongo/units/unit-02-srn-sounds.json` and
  `content/sranantongo/lessons/unit-02-srn-sounds.json`: new `Klanken &
  spelling` unit (vowels, consonants/diphthongs, review), sourced from Koen
  Kamphuijs's Sranan Tongo spelling reference and cross-checked against the
  alphabet already fixed in `settings/sranantongo/language-settings.json`.
  Illustrative examples reuse existing greetings/numbers vocab rather than
  introducing a new vocab file. (#15)
- `content/sranantongo/vocab/numbers.json`: numbers beyond ten (`erfu` 11
  through `wan milyun` 1,000,000), tagged `needs-verification`
  (single-sourced from Koen Kamphuijs's site pending a second independent
  source). (#15)
- `content/sranantongo/vocab/pronouns.json`,
  `content/sranantongo/units/unit-04-srn-pronouns.json`,
  `content/sranantongo/lessons/unit-04-srn-pronouns.json`: new `Voornaamwoorden
  & vraagwoorden` unit (personal/possessive pronouns, demonstratives, question
  words, review), cross-sourced between Koen Kamphuijs's and suriname.nu's
  Sranan Tongo grammar pages. `srn-q-oten`, `srn-q-omeni` and
  `srn-q-fu-san-ede` ship `needs-verification` (single-sourced or disputed
  between the two sources). (#19)

### Changed

- `content/sranantongo/units/unit-01-srn-greetings.json`: `order` reassigned
  from `1` to `3` to fit the sequence in `docs/lesson-plan.md` now that
  `unit-02-srn-sounds` (`order: 2`) exists; ids are unchanged, so this is
  additive per `docs/versioning.md`. (#15)

## [0.2.0] - 2026-07-09

### Added

- `content/sranantongo/units/unit-01-srn-greetings.json`: opt-in, id-keyed
  `generatedSpec` on the greetings lesson (additive — the fixed `exercises`
  array is left in place) so the seeded exercise-arrangement generator
  (rarelang-server#37) can serve a freshly varied exercise mix on each
  replay. Every id is a foreign key into this repo's own vocab; no content
  text moves into the engine. (#9)

### Changed

- `settings/sranantongo/language-settings.json`: reworded
  `romanization.notes` to drop an internal cross-repository citation
  (same-shape notes-string edit; no schema or served-field change).

## [0.1.0] - 2026-07-05

### Added

- Initial release of the Sranan Tongo content package: `unit-01`
  greetings/numbers content (`content/sranantongo/{vocab,units,lessons}/`),
  `language-settings.json` (romanization/alphabet/audio + branding), and the
  PWA icon set under `public/`.
- Versioning policy (`docs/versioning.md`): SemVer via annotated git tags as
  the single source of truth, breaking/non-breaking definitions tied to this
  repo's on-disk content/settings schema and the backend engine's HTTP
  content contract, the release process, and how a git-sync deployment pins
  to a tag (`GITSYNC_REF=vX.Y.Z`) instead of tracking `main`. Also this
  `CHANGELOG.md` and README/CLAUDE pointers.

[Unreleased]: ../../compare/v0.1.0...HEAD
[0.1.0]: ../../releases/tag/v0.1.0
