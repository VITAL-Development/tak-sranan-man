# Changelog

All notable changes to this repo's **published content and settings**
(`content/sranantongo/`, `settings/sranantongo/`) are recorded here. The
format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this repo follows [Semantic Versioning](https://semver.org/) via
annotated git tags — see [`docs/versioning.md`](docs/versioning.md) for the
scheme and the precise definition of what counts as a **breaking** (MAJOR)
vs additive (MINOR) vs fix (PATCH) change.

This log tracks **content and schema-relevant** changes — anything a
`rarelang-server` consumer syncing this repo would care about (new/changed
vocab, units, lessons, or `language-settings.json` shape). Pure docs or
tooling edits that don't affect served content need not appear.

Releases are cut as git tags `vX.Y.Z`. The entries below accumulate under
`[Unreleased]` until the next release is cut, at which point they move under
a dated `## [X.Y.Z]` heading.

## [Unreleased]

## [0.1.0] - 2026-07-05

### Added

- Initial release of the Sranan Tongo content package: `unit-01`
  greetings/numbers content (`content/sranantongo/{vocab,units,lessons}/`),
  `language-settings.json` (romanization/alphabet/audio + branding), and the
  PWA icon set under `public/`.
- Versioning policy (`docs/versioning.md`): SemVer via annotated git tags as
  the single source of truth, breaking/non-breaking definitions tied to this
  repo's on-disk content/settings schema and `rarelang-server`'s HTTP
  contract, the release process, and how a git-sync deployment pins to a tag
  (`GITSYNC_REF=vX.Y.Z`) instead of tracking `main`. Also this `CHANGELOG.md`
  and README/CLAUDE pointers. (issue #1, mirrors sarnami-bol-naa#86)

[Unreleased]: https://github.com/VITAL-Development/tak-sranan-man/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/VITAL-Development/tak-sranan-man/releases/tag/v0.1.0
