# Versioning policy

This repo publishes Sranan Tongo's content and settings
(`content/sranantongo/`, `settings/sranantongo/`) as a live source for
`rarelang-server`, which consumes it via a git-sync sidecar (see
[rarelang-server#18](https://github.com/VITAL-Development/rarelang-server/issues/18)
and its `docs/api-contract.md` "Content repository contract" section).
Because a running server reads these files directly, a change to their
**shape** can break a deployment that expects the old shape. This document
defines how we version releases so consumers can pin to a known-good point
and upgrade deliberately, instead of always tracking whatever `main`
happens to be.

This policy mirrors its sibling content repo `sarnami-bol-naa`'s
(sarnami-bol-naa#79 / #86) so both content repos behave identically under
`rarelang-server`'s content-repository contract.

## Scheme: SemVer via annotated git tags

Releases are marked with **annotated, SemVer git tags** of the form
`vMAJOR.MINOR.PATCH` (e.g. `v1.4.0`), cut on `main`.

**The git tag is the single source of truth for "what version is this?"**
There is deliberately no `VERSION` file and no `package.json` version field:

- This repo has **no `package.json`** at all — the npm tooling (the
  `generate-icons` script and its `sharp` dependency) was removed in
  [issue #2](https://github.com/VITAL-Development/tak-sranan-man/issues/2)
  because a content-and-branding package has no build. There is nothing that
  reads a `version` field. A `VERSION` file would just be a second thing to
  keep in sync with the tag and would inevitably drift.
- git-sync (the consumer's sync mechanism) already speaks refs natively — it
  can track a tag directly (see "Pinning" below), so tags need no
  translation to be useful to the one consumer that matters.

If some future tool ever needs a version at build time, derive it from the
git tag (`git describe --tags --always`) rather than reintroducing a
hand-maintained field that would drift.

A tag is immutable and points at an exact tree, so "pinned to `v1.4.0`" is
unambiguous and reproducible. git-sync (the consumer's sync mechanism)
speaks refs natively — it can track a tag directly (see "Pinning" below),
so tags need no translation to be useful to the one consumer that matters.
`main` is the integration branch and is *not* a stable target for a
production deployment.

### What each part means

Given `content/sranantongo/**` and
`settings/sranantongo/language-settings.json`, and the fact that
`rarelang-server` parses these files and serves them over the HTTP contract
in its `docs/api-contract.md`:

| Bump | When | Consumer impact |
|---|---|---|
| **MAJOR** (`1.x.x` → `2.0.0`) | A **breaking** schema/shape change (see below). | A server on the old version may fail to parse or serve content. Requires a coordinated `rarelang-server` upgrade. |
| **MINOR** (`1.3.x` → `1.4.0`) | **Additive** content or schema — new vocab/units/lessons/grammar, or a new *optional* field. | Safe. Old consumers ignore what they don't read; new content simply appears. |
| **PATCH** (`1.4.0` → `1.4.1`) | **Content fixes** that don't change shape — spelling corrections, translation fixes, fixing a dangling `*Ref`, icon-path fixes. | Safe. Same shape, corrected values. |

Pre-1.0.0 (`0.y.z`) the schema is still considered unstable; treat a MINOR
bump as the "may break" signal until the first `v1.0.0` is cut. The initial
release is `v0.1.0`.

## BREAKING vs NON-BREAKING — precise definitions

"Breaking" is defined **relative to what `rarelang-server` reads**, not to
any internal convenience. The authoritative shape is the HTTP contract in
`rarelang-server`'s `docs/api-contract.md` (`GET /content`,
`GET /settings`); the on-disk files below are the source those responses
are built from.

### BREAKING (MAJOR)

A change is breaking if a `rarelang-server` build that predates it could
fail to parse the files, serve malformed responses, or violate the
referential integrity the frontend relies on. Concretely:

- **Renaming or removing a consumed field.** e.g. `id`, `word`,
  `translations`, `tags` on a vocab item
  (`content/sranantongo/vocab/*.json`); `id`, `title`, `order`, `lessons`
  on a unit, and `id`, `unitId`, `order`, `newVocab`,
  `exampleSentenceRefs`, `exercises`, `xpReward`, and per-exercise
  `kind`/`contentRef`/`promptVocabRef`/`vocabRef`/`direction` on the
  lessons nested inside it (`content/sranantongo/units/*.json`); `lessonId`,
  `exampleSentences`, `grammarNotes`, `exercises`, and per-exercise-content
  `kind`, `prompt`, `options`, `correctIndex`, `correctTargetTokens`,
  `distractorTokens`, `sentenceTemplate`, `correctAnswer`, `translations`
  (`content/sranantongo/lessons/*.json`); `code`, `displayName`,
  `scriptDirection`, `romanization`, `alphabet`, `audio`, `branding`
  (and, within `branding`, `appName`, `colors`, `icons`) in
  `settings/sranantongo/language-settings.json`.
- **Changing a field's type or meaning.** e.g. `translations` from an object
  to a string, `correctIndex` from a number to a label, `order` from a
  number to a string.
- **Adding a new *required* field** that old content lacks, or making a
  previously optional field required.
- **Changing the set of allowed enum values** consumers switch on — exercise
  `kind` (currently seen: `multiple-choice` | `word-bank` | `fill-blank` |
  `flashcard`; the engine also understands `matching`) and `direction`
  (`target-to-native` | `native-to-target`).
- **Breaking referential integrity** — removing/renaming a vocab `id`, a
  `contentRef`, `promptVocabRef`, `vocabRef`, `exampleSentenceRef`
  (`exampleSentenceRefs`), `newVocab` entry, or lesson/unit `id` that is
  still referenced elsewhere, so a ref no longer resolves.
- **Changing the on-disk layout** — renaming/moving `content/sranantongo/`
  or `settings/sranantongo/`, changing the `{vocab,units,lessons}`
  subdirectory names (or adding a new `grammar/` subdirectory the engine
  isn't wired to read), or changing the language-code segment
  (`sranantongo`). These are wired to `rarelang-server`'s
  `CONTENT_DIR`/`SETTINGS_DIR` mounts (see this repo's README "Layout" /
  "Deployment"); moving them silently empties a deployment.

### NON-BREAKING — additive (MINOR)

Old consumers keep working; new capability is opt-in:

- **New content** — new vocab entries, new units, new lessons, new example
  sentences / grammar notes / exercises. This is the common case.
- **New *optional* fields** — e.g. adding `en` to a `translations` map,
  adding an `audioUrl` to a vocab item, adding an optional field to
  `language-settings.json`. Old consumers ignore the extra key.
- **New optional exercise metadata** that older engines can safely skip.

### NON-BREAKING — fixes (PATCH)

Same shape, corrected values:

- Fixing a spelling. (Sranan Tongo uses a plain, unaccented Latin
  alphabet — there are no macrons/underdots to correct as there are in
  Sarnami; don't introduce diacritics that aren't independently attested.)
- Fixing or improving a `translations` value or a `notes` string.
- Correcting a wrong `correctIndex`/`correctAnswer`, or fixing a `*Ref` that
  pointed at the wrong (but still existing) id.
- Fixing an icon path in `branding.icons` when the target file already
  exists (a path that points at a *missing* file is a bug, but correcting it
  is a same-shape value fix).
- Editing `docs/**` only (this policy, README pointers) — no served-content
  change at all; still worth a PATCH tag if you want it recorded, otherwise
  it can ride along with the next release.

When a single release mixes levels, take the **highest** applicable bump
(one breaking change in a release full of additions is still a MAJOR).

## Release process

1. Land the changes on `main` via PR as usual.
2. Move the `## [Unreleased]` entries in `CHANGELOG.md` under a new
   `## [X.Y.Z] - YYYY-MM-DD` heading, choosing X.Y.Z per the table above.
3. Commit that changelog edit, then cut an **annotated** tag on it:
   ```bash
   git tag -a vX.Y.Z -m "vX.Y.Z — <one-line summary>"
   git push origin vX.Y.Z
   ```
4. A MAJOR release should be coordinated with `rarelang-server` (open/link an
   issue there) before any deployment repins to it.

## How a git-sync deployment pins and upgrades

> Out of scope for this repo: `rarelang-server`'s git-sync implementation
> itself. This section documents how an *operator deploying it* pins to a
> version — a deployment-config choice, no code change required. Wiring this
> repo in as a second synced content source is tracked separately (README's
> "Deployment", analogous to sarnami-bol-naa#76).

`rarelang-server`'s reference deployment runs a git-sync sidecar that clones
this repo into a shared volume, which the server mounts read-only via
`CONTENT_DIR`/`SETTINGS_DIR`. By default a sidecar can track the `main`
branch — so it would pick up every commit, including a breaking one, on its
next sync interval.

git-sync tracks whatever ref it is told to. **To pin, point it at a tag
instead of `main`:**

- Set the sidecar's ref (`GITSYNC_REF`, or the `--ref` flag) to a release
  tag, e.g. `GITSYNC_REF=v0.1.0` instead of `GITSYNC_REF=main`.
- A tag is immutable, so the sidecar stays on exactly that tree. New commits
  to `main` — including breaking ones — are **not** pulled until an operator
  changes the ref. This is the whole point: production no longer tracks HEAD.

**To upgrade:**

1. Read this repo's `CHANGELOG.md` for the entries between the pinned tag and
   the target tag; note any MAJOR bump.
2. For a MINOR/PATCH upgrade, bump `GITSYNC_REF` to the new tag and let the
   sidecar re-sync (restart the sidecar, or wait for its sync period). No
   `rarelang-server` restart needed — it reads fresh per request.
3. For a MAJOR upgrade, first confirm the running `rarelang-server` build
   understands the new shape (per the coordinated release above), then repin.

A deployment that deliberately wants continuous delivery of Sranan Tongo
content can still track `main` — but it accepts that a breaking change here
can reach it unreviewed. Pinning to a tag is the recommended posture for
anything user-facing.
