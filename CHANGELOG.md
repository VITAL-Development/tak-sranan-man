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

- `content/sranantongo/audio/*.mp3` — pronunciation audio for all 56 vocab
  entries across `content/sranantongo/vocab/*.json`, batch-generated via
  `scripts/generate-audio.mjs` against a local rarelang-server +
  `facebook/mms-tts-srn` MMS-TTS stack (rarelang-server#79/#80,
  backend-gateway#34) and converted from the script's raw `.wav` output to
  `.mp3` (`libmp3lame -q:a 4`) to match `settings/sranantongo/
  language-settings.json`'s `audio.format`. Each vocab entry now carries an
  `audioUrl` field (`/audio/sranantongo/<id>.mp3`, matching `audio.baseUrl`)
  pointing at its generated clip — additive, optional field, no shape
  change to existing fields. Sanity-checked automatically (ffprobe duration
  + `ffmpeg volumedetect` non-silence) for all 56 files, not by human
  listening — see PR description; a human spot-listen is still recommended
  before merge. (#44)

## [0.4.1] - 2026-07-18

### Fixed

- `content/sranantongo/lessons/unit-02-srn-sounds.json`: simplified
  `srn-gr-vowels` and `srn-gr-consonants` grammar-note bodies to A2-level
  Dutch — split `srn-gr-vowels` into short plain sentences and dropped an
  arrow-notation aside; defined "tweeklank" inline on first use in
  `srn-gr-consonants` and rephrased its passive constructions — per
  `source-language-authoring-contract.md` §2/§2a. Same-shape value edit
  only. (#38)

## [0.4.0] - 2026-07-18

### Added

- `settings/sranantongo/language-settings.json`: `audio.ttsModel` field
  (`"facebook/mms-tts-srn"`), declaring the MMS-TTS model id this repo's own
  `scripts/generate-audio.mjs` uses when calling rarelang-server's
  `POST /audio/generate` (rarelang-server#79/#80). Additive, no shape change
  to existing fields.
- Optional `tokenVocabRefs` per-word translation refs on example sentences
  and fill-in-the-blank sentence templates in `unit-01-srn-greetings.json`,
  `unit-02-srn-sounds.json`, and `unit-04-srn-pronouns.json`, per
  rarelang-server's `api-contract.md` (v1.2.0, issue #67). Additive and
  authored incrementally: entries with no matching standalone vocab item
  are left `null` rather than guessed. (#29)
- New `vocab/nouns.json`, `vocab/verbs.json`, `vocab/grammar.json` files
  (lampu, sani, tan, wani, libi, srn-art-a, srn-gram-na, srn-prep-fu,
  srn-prep-e-locative — all tagged `needs-verification`), added to give
  the tokenVocabRefs above a full, non-null tooltip mapping per PR #36's
  review.

### Removed

- `flashcard` exercises from `content/sranantongo/units/{unit-01-srn-greetings,
  unit-02-srn-sounds,unit-04-srn-pronouns}.json`'s authored `exercises` arrays
  and `generatedSpec.kinds` lists (7 exercises across 6 lessons) — `flashcard`
  is Review-only per rarelang-server's api-contract.md 2.0.0 (issue #75) and
  must not be authored in Path lesson content. This content had drifted out
  of conformance with that contract change; `contracts.lock.json` is bumped
  to match (BREAKING per this repo's own schema, though it only brings
  already-authored content back into conformance with an upstream rule that
  had already landed — no new rule introduced here).

## [0.3.0] - 2026-07-14

### Added

- `content/sranantongo/units/unit-01-srn-greetings.json`: `cefrLevel: "A1"`
  unit-level field, per `lesson-plan-authoring-contract.md` §3, matching the
  A1 classification already assigned to this unit in `docs/lesson-plan.md`'s
  unit-sequence table. Optional/additive. `docs/versioning.md`'s consumed
  field list updated to include `cefrLevel`. (#23)
- `settings/sranantongo/language-settings.json`: `defaultUiLanguage: "nl"`,
  reflecting that this repo's content is authored entirely in Dutch.
  Optional/additive, bundled with the `cefrLevel` change above. (#23)
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

[Unreleased]: ../../compare/v0.4.1...HEAD
[0.4.1]: ../../compare/v0.4.0...v0.4.1
[0.4.0]: ../../compare/v0.3.0...v0.4.0
[0.3.0]: ../../compare/v0.2.0...v0.3.0
[0.2.0]: ../../compare/v0.1.0...v0.2.0
[0.1.0]: ../../releases/tag/v0.1.0
