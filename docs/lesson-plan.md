# Sranan Tongo lesson plan

The single source of truth for the app's **unit/lesson curriculum**. Each
per-topic unit is authored against this plan so that scope, sequencing and
vocab ownership stay consistent across units and nothing is taught twice.

This is a planning/design doc, not served content. It guides authoring order.
For the on-disk content model (`vocabRef`/`contentRef`, verification tags,
directory layout) and the verification discipline see
[`../CLAUDE.md`](../CLAUDE.md); for how content ships (SemVer tags, breaking
vs additive changes) see [`versioning.md`](versioning.md). The curriculum is
organized into three CEFR tiers — **Beginner (A1–A2)**, **Intermediate
(B1–B2)**, **Advanced (C1–C2)** — per the shared, cross-language
[lesson-plan authoring contract](https://github.com/VITAL-Development/rarelang-server/blob/main/docs/lesson-plan-authoring-contract.md);
that contract defines what each tier means, the required document shape, and
the `cefrLevel` unit field. This document covers only what's
Sranan-Tongo-specific.

It takes **structural** inspiration from the sibling
[`sarnami-bol-naa`](https://github.com/VITAL-Development/sarnami-bol-naa)
lesson plan — the same parallel shape (orientation → sounds → basics →
grammar → applied → reading capstone) and the same three-tier structure —
but **not** its content. Sranan Tongo is a different language with its own
grammar, vocabulary and sources; where Sarnami is an inflectional Indo-Aryan
language driven by a single grammar book, Sranan Tongo is an English/Dutch-
lexified **creole** with largely analytic grammar and no single canonical
source, so the units below are organised around Sranan Tongo's own
structure, not transplanted from Sarnami's grammar chapters.

## Source material

Unlike Sarnami — whose curriculum maps one grammar-book chapter to one unit —
Sranan Tongo has **no single canonical grammar reference** to author against.
The curriculum is instead built from, and cross-checked across, independent
public sources (per [`../CLAUDE.md`](../CLAUDE.md)'s verification discipline):

- **Wikivoyage's and Wikitravel's Sranan Tongo phrasebooks** — greetings,
  numbers, everyday phrases, food, directions. Good for high-frequency
  conversational vocab; weaker on systematic grammar.
- **Glosbe Sranan Tongo–English dictionary** and **kaikki.org's Sranan Tongo
  Wiktionary extract** — per-word confirmation, part of speech, etymology,
  alternate spellings.
- **Wikipedia's "Sranan Tongo" article and creole-linguistics descriptions**
  — the analytic grammar (articles, the tense–mood–aspect particles, copulas,
  negation, serial verbs) that the phrasebooks only show by example.
- **Peace Corps / SIL Suriname learner materials** where available — running
  dialogues and graded readers for the Advanced tier's capstone.
- **Koen Kamphuijs's ["De Sranantongo files"](http://koenkamphuijs.nl/sranantongo/)**
  — a personal Dutch-authored reference site (spelling, grammar sketch,
  numbers, vocabulary). Useful as source material, especially for spelling
  (`unit-02-srn-sounds`) and numbers beyond ten, but it is one enthusiast's
  site, not an academic source — entries drawn from it alone stay
  `needs-verification` until cross-checked against a second source, per the
  discipline below. See "Attribution" at the end of this doc.

No entry is presented as confirmed on a single source: two independent sources
must agree before a vocab entry is tagged `web-verified`; otherwise it is
tagged `needs-verification`. See the *Sourcing & verification* section below
for which units are well-sourced today vs. thin.

## The content model, briefly

- A **unit** (`content/sranantongo/units/*.json`) has an `id`, `title`,
  `description`, an integer `order` (display sort key), a `cefrLevel` (per
  the shared contract), and an ordered list of **lessons**. (Sranan Tongo
  units carry **no `bookChapterRef`** — there is no single book; a lesson's
  sourcing lives in its vocab entries' `notes`, as it already does in
  `content/sranantongo/vocab/*.json`.)
- A **lesson** lists `newVocab` (vocab ids it introduces), optional
  `exampleSentenceRefs` / `grammarNoteRefs`, an ordered `exercises` array, and
  an `xpReward`. The prompt/sentence/note text itself lives in the parallel
  `content/sranantongo/lessons/*.json`, keyed by `contentRef`; vocab lives in
  `content/sranantongo/vocab/*.json`, keyed by `vocabRef`.
- **Exercise kinds** the generic engine supports: `multiple-choice`,
  `flashcard`, `word-bank`, `fill-blank`, `matching`. The existing greetings
  unit uses the first four; `matching` is available and suits the grammar and
  sounds units below.

Native/explanation language is **Dutch (`nl`)** throughout, matching the
existing greetings/numbers content (`translations: { "nl": … }`) and
Suriname's official language.

## Tier overview

Units are ordered pedagogically within and across tiers, not by id number:
orientation and sounds come first, the existing basics slot in early,
productive grammar builds on the basics, applied everyday-topic units
follow, and reading is a capstone. One unit already exists —
**`unit-01-srn-greetings`** — and keeps its **id** (ids are the stable
reference used by any consumer). Its `order`/`cefrLevel` are assigned to fit
the sequence below; because `order`/`cefrLevel` are only metadata and ids
don't change, assigning them is an **additive/non-breaking** content change
(see [`versioning.md`](versioning.md) and the shared authoring contract's
`cefrLevel` versioning note).

| Tier | Units | CEFR range |
|---|---|---|
| Beginner | 5 | A1–A2 |
| Intermediate | 4 | B1–B2 |
| Advanced | 1 | C1 |

New unit ids are numbered `00` and `02`–`09` so they don't collide with the
existing `unit-01-srn-greetings`; the **`order` column** (1–10, spanning
tiers) is what actually drives display sequence. (An implementer may instead
renumber all unit ids to a clean `unit-01`…`unit-10`; if so, do it as one
dedicated change and update every `unitId` back-reference — the id-preserving
scheme above avoids that churn, exactly as the sibling repo does.)

---

## Beginner tier (A1–A2)

*A learner completing this tier can greet people, exchange basic
pleasantries, count to ten, read and pronounce the plain Latin spelling,
name everyday nouns with the article/possession system, and use the core
pronoun and question-word set — with no productive grammar beyond simple
noun phrases.*

| # | Unit id | Title (nl) | CEFR | Grammar / theme | Status |
|---|---------|------------|------|-----------------|--------|
| 1 | `unit-00-srn-about` | Over het Sranan Tongo | A1 | orientation, no grammar | new |
| 2 | `unit-02-srn-sounds` | Klanken & spelling | A1 | alphabet, spelling, stress | **exists** |
| 3 | `unit-01-srn-greetings` | Basiswoorden | A1 | greetings + numbers 1–10 | **exists** |
| 4 | `unit-03-srn-nouns` | Zelfstandige naamwoorden & lidwoorden | A2 | `a`/`den`/`wan`, plural, `fu`-possession | new |
| 5 | `unit-04-srn-pronouns` | Voornaamwoorden & vraagwoorden | A2 | personal/possessive/demonstrative + question words | new |

### Sequencing & dependencies

- **Orientation first, no prerequisites.** `unit-00-srn-about` is
  background/cultural (what Sranan Tongo is, its history as Suriname's
  English/Dutch-lexified creole and lingua franca) and can be taken cold.
- **Sounds before everything productive.** `unit-02-srn-sounds` teaches the
  plain, unaccented Latin spelling and pronunciation that every later unit
  relies on. Because Sranan Tongo has **no diacritics** (see below), this unit
  is lighter than Sarnami's sounds unit — there are no macrons/underdots to
  drill — but it still gates the rest of this tier and every higher tier.
- **The existing basics slot in third.** `unit-01-srn-greetings` already
  teaches the first greetings/politeness words and numbers 1–10. It sits after
  sounds (so learners can read the spellings) and before the grammar units,
  which **extend** it and must not re-teach that starter set (see *Overlap*).
- **Nouns before pronouns.** The article/plural system (`a`/`den`/`wan`)
  underpins how nouns appear in sentences; the pronoun set is needed as verb
  subjects for the Intermediate tier's verb unit.
- No unit in this tier carries an Intermediate- or Advanced-tier
  prerequisite, per the shared contract's cross-tier sequencing rule.

### Overlap with the existing greetings unit

`unit-01-srn-greetings` intentionally front-loads a small, high-frequency
slice of later material. The deeper units own the rest:

- **Numbers** — the greetings unit's lesson 2 teaches `srn-num-wan`…`srn-num-tin`
  (1–10) as bare vocab. A later numbers extension (folded into
  `unit-08-srn-getting-around`, Intermediate tier, for prices/time) owns 11+,
  tens and counting in context; it may *reuse* those ids in examples but
  introduces no duplicate entries.
- **Greetings/politeness** — `odi`, `fa waka`, `fa yu tan`, `mi bun`, `tangi`,
  `gran tangi` are owned here. Later units reference them in dialogues by id
  and do not re-introduce them.
- **Pronoun/verb glimpses** — phrases like `fa yu tan` and `mi bun` already
  expose `yu`, `mi` and predicate `bun`. `unit-04-srn-pronouns` (this tier)
  and `unit-05-srn-verbs` (Intermediate tier) generalise these into the full
  pronoun set and the copula/TMA system; they treat the greeting phrases as
  fixed expressions already known, not as new vocab.

Rule of thumb: a vocab entry has exactly one owning lesson (its `newVocab`);
every other lesson references it by id — including across tier boundaries.

### Per-unit scope

Sizing follows the existing unit: **2–5 lessons per unit**, **~3–5 exercises
per lesson**, ending each multi-lesson unit with a **review lesson**
(`newVocab: []`, mixed exercises, higher `xpReward`). Vocab counts below are
**targets**, to be met only with entries cross-checked against ≥2
independent sources; anything single-sourced ships as `needs-verification`
rather than padding the count. A smaller, fully-verified unit beats a larger,
thin one.

#### 1. `unit-00-srn-about` — Over het Sranan Tongo (A1)
Background/cultural, reading-led. What Sranan Tongo is (Suriname's
English/Dutch-lexified creole and everyday lingua franca), a sketch of its
history, and an at-a-glance look at its plain-Latin writing system.
- ~2–3 short reading lessons + a light review. Little to no productive drilling.
- Vocab: a small set of key terms/proper nouns (flashcard-worthy: *Sranan*,
  *Sranan Tongo*, *Suriname*), not a general vocab set.
- **Exercise mix:** heavy `multiple-choice` comprehension + a few `flashcard`
  for key terms. No `word-bank`/`fill-blank` (nothing to construct yet).

#### 2. `unit-02-srn-sounds` — Klanken & spelling (A1) *(exists)*
The foundation unit: the five vowels (`a e i o u`) and the consonant set from
`language-settings.json`, plus the fact that Sranan Tongo is written in a
**plain, unaccented Latin alphabet** — no macrons or underdots. Teaches
learners to map spelling to sound and to read the spellings used everywhere
else.
- 3 lessons: vowels → consonants (`w`/`y` diphthongs, the eind-n → `ng` rule,
  the letters `c j q v x z` that Sranan Tongo doesn't use) → review. Kept
  lighter than Sarnami's sounds unit because there are no diacritics to teach.
- Vocab: no new vocab file — illustrative examples (`tangi`, `tan`, `yu`,
  `wan`/`tu`/`tin`, …) are drawn from the existing greetings/numbers vocab, per
  the scoping above.
- **Exercise mix:** `matching` (letter ↔ sound/description), `multiple-choice`
  (which spelling / which sound), `flashcard` (letter recognition), `fill-blank`
  for "pick the correctly-spelled form". Sourced from Koen Kamphuijs's
  ["Spelling van het Sranantongo"](http://koenkamphuijs.nl/sranantongo/sranaspl.html)
  (see "Attribution" below) cross-checked against the alphabet already fixed
  in `language-settings.json`.

#### 3. `unit-01-srn-greetings` — Basiswoorden (A1) *(exists)*
Already authored and web-verified: greetings/politeness (lesson 1) and numbers
1–10 (lesson 2). No new authoring needed beyond keeping its `order`/
`cefrLevel` in step with this sequence. Later units reference its vocab by id.

#### 4. `unit-03-srn-nouns` — Zelfstandige naamwoorden & lidwoorden (A2)
The noun phrase: the definite article `a` (sg) / `den` (pl), the indefinite
`wan`, plural marking via `den`, and possession (both juxtaposition — *mi oso*
— and with `fu` — *a oso fu mi*). Extends the greetings vocab with common
concrete nouns.
- ~4 lessons: articles `a`/`wan` → plural with `den` → possession (`fu` /
  juxtaposition) → review.
- Vocab target ~15–20 everyday nouns (own vocab file, e.g.
  `vocab/nouns.json`), each cross-checked before `web-verified`.
- **Exercise mix:** full mix; lean on `word-bank` (build the noun phrase),
  `fill-blank` (choose `a`/`den`/`wan`), `matching` (noun ↔ meaning),
  `multiple-choice`.

#### 5. `unit-04-srn-pronouns` — Voornaamwoorden & vraagwoorden (A2)
The pronoun system and question words — Sranan Tongo has no case endings, so
this is a **closed set to memorise and place**, not a paradigm to inflect.
- ~4 lessons: personal pronouns (`mi`, `yu`, `a`/`en`, `wi`, `unu`, `den`) →
  possessive use of the same forms + demonstratives (`disi`/`dati`) →
  question words (`san`, `suma`, `pe`, `oten`, `fa`, `fu san`) → review.
- Vocab ~15–20 pronoun/question forms (`vocab/pronouns.json`). Does **not**
  re-introduce the greeting phrases' embedded `mi`/`yu`.
- **Exercise mix:** `matching` (form ↔ meaning), `fill-blank` (choose the right
  pronoun/question word in a sentence), `word-bank`, `multiple-choice`.

---

## Intermediate tier (B1–B2)

*A learner completing this tier can build clauses with the tense-mood-aspect
particle system, use both copulas, negate sentences, and talk about food,
family/people, and getting around — reusing the Beginner tier's articles and
pronouns in real, everyday sentences.*

| # | Unit id | Title (nl) | CEFR | Grammar / theme | Status |
|---|---------|------------|------|-----------------|--------|
| 6 | `unit-05-srn-verbs` | Werkwoorden, tijd & aspect | B1 | TMA particles `e`/`ben`/`o`/`sa`, `de`/`na`, `no` | new |
| 7 | `unit-06-srn-food` | Nyanyan & dringi | B1 | food & drink vocab | new |
| 8 | `unit-07-srn-people` | Famiri & sma | B1 | family & people vocab | new |
| 9 | `unit-08-srn-getting-around` | Na pasi | B2 | place, time, direction; `na`/`nanga` | new |

### Sequencing & dependencies

- **The verb/TMA unit is the productive spine** and unlocks everything after
  it in this tier — it combines the Beginner tier's nouns and pronouns into
  clauses.
- **Everyday-topic units after the grammar spine.** Food, people, and
  getting-around are vocab-expansion units that reuse the article, pronoun and
  TMA machinery in real sentences; they can otherwise be taken in any order.
- No unit in this tier carries an Advanced-tier prerequisite, per the shared
  contract's cross-tier sequencing rule; every unit here depends only on
  Beginner-tier material.

### Per-unit scope

Same sizing convention as the Beginner tier: **2–5 lessons per unit**, **~3–5
exercises per lesson**, review lesson per multi-lesson unit.

#### 6. `unit-05-srn-verbs` — Werkwoorden, tijd & aspect (B1)
The sentence-building spine, and where Sranan Tongo differs most from Sarnami:
verbs **do not conjugate**; tense/mood/aspect is carried by **pre-verbal
particles**. Teaches the bare verb plus the TMA markers and copulas.
- **~5 lessons:** bare verb + `e` (progressive/habitual) → `ben` (past/anterior)
  → `o`/`sa` (future/irrealis) → the two copulas `de` (locative/predicative)
  and `na` (equative/identifying) + negation `no` → review. Common modals
  (`kan`, `musu`, `wani`) fold into the future/irrealis lesson.
- Vocab ~15–20 high-frequency verbs, taught bare with their particle
  combinations shown in `grammarNotes` (not as inflected forms).
- **Exercise mix:** `fill-blank` (insert the right TMA particle) and
  `word-bank` (build the clause `subject + particle + verb`) dominate;
  `matching` (particle ↔ tense/aspect), `multiple-choice` (which tense/mood),
  `flashcard` for verb meanings.

#### 7. `unit-06-srn-food` — Nyanyan & dringi (B1)
Applied vocab: food and drink, the kind of high-frequency words the
phrasebooks cover well. Reuses articles and the TMA system in example
sentences ("mi wani…", "a de switi").
- ~3 lessons grouped (staples/dishes → drinks & the market → review).
- Vocab ~15–20 food/drink items (own vocab file).
- **Exercise mix:** `flashcard` + `matching` (word ↔ meaning/picture-caption),
  `multiple-choice`, and `word-bank`/`fill-blank` for short "I want…" /
  "it is tasty" sentences.

#### 8. `unit-07-srn-people` — Famiri & sma (B1)
Applied vocab: family and people (*famiri*, *sma*), roles and relationships,
used with the possessive constructions from `unit-03-srn-nouns`.
- ~3 lessons (immediate family → wider people/roles → review).
- Vocab ~15–20 people/family terms.
- **Exercise mix:** `flashcard` + `matching` (term ↔ meaning), `word-bank`
  (possessive phrases: *mi m'ma*, *a brada fu mi*), `fill-blank`,
  `multiple-choice`.

#### 9. `unit-08-srn-getting-around` — Na pasi (B2)
Applied: place, direction and time — the prepositions `na` (at/to/in) and
`nanga` (with), directions, and numbers in use (prices, telling the time,
counting past ten). This is where the numbers from `unit-01-srn-greetings`
are extended and applied.
- ~4 lessons: places & the `na` preposition → directions & `nanga` → time &
  higher numbers → review.
- Vocab ~15–20 place/direction/time words + higher numerals, cross-checked
  against the phrasebooks' directions and numbers sections.
- **Exercise mix:** `word-bank` (build "go to the market" style phrases) and
  `fill-blank` (choose `na`/`nanga`) lead; `matching`, `multiple-choice`,
  `flashcard`.

---

## Advanced tier (C1)

*A learner completing this tier can follow short graded dialogues and
reading passages, reconstructing meaning from context using the full
Intermediate-tier grammar spine.*

| # | Unit id | Title (nl) | CEFR | Grammar / theme | Status |
|---|---------|------------|------|-----------------|--------|
| 10 | `unit-09-srn-reading` | Leesteksten & dialogen | C1 | applied reading capstone | new |

This tier currently holds a single unit and is expected to stay thin for a
while: Sranan Tongo has no single canonical grammar reference and no deep
long-tail grammar corpus to draw on (see *Out of scope* below), so — per the
"don't invent or guess" rule — no further Advanced units are planned until
genuinely sourced material (serial-verb constructions, reported speech,
sociolectal variation) becomes available.

### Sequencing & dependencies

- **Reading is the capstone.** `unit-09-srn-reading` reuses vocab and grammar
  from every lower tier and introduces little new machinery — only reading
  strategy and passage-specific vocab. It sits at the end.

### Per-unit scope

#### 10. `unit-09-srn-reading` — Leesteksten & dialogen (C1)
Capstone/applied: short graded dialogues and reading passages (with Dutch
translations) that reuse earlier vocab and grammar. Introduces little new
machinery — reading strategy and passage-specific vocab only.
- ~3–4 graded reading/dialogue lessons → review; sits at the end.
- **Exercise mix:** `multiple-choice` comprehension leads; `word-bank`
  (reconstruct a line of dialogue), `fill-blank` (cloze over known words),
  `matching` (passage vocab). Passages must themselves be sourced (Peace
  Corps / SIL graded readers, phrasebook dialogues) — no invented text.

---

## Exercise-type reference

| Kind | Best for |
|------|----------|
| `flashcard` | Raw vocab memorisation, both directions (`target-to-native`, `native-to-target`). |
| `matching` | Sets of pairs: word↔meaning, letter↔sound, particle↔tense/aspect. |
| `multiple-choice` | Meaning recognition, "which article/particle/spelling", reading comprehension. |
| `fill-blank` | One targeted slot: the right article, TMA particle, pronoun, or preposition. |
| `word-bank` | Word order & construction: noun phrases, `subject + particle + verb` clauses, short dialogue lines. |

Progression within a unit: recognition first (`flashcard`/`multiple-choice`),
then production (`fill-blank` → `word-bank`), with `matching` for
consolidation. Review lessons mix the kinds and carry the highest `xpReward`.
Because Sranan Tongo grammar is analytic (particles and word order, not
endings), `fill-blank` targets **whole function words** (`a`, `e`, `ben`, `na`)
rather than inflectional suffixes, and `word-bank` word-order drills carry more
of the grammar load than they do in Sarnami.

## Sourcing & verification

Every unit must clear [`../CLAUDE.md`](../CLAUDE.md)'s bar — **≥2 independent
sources agreeing** before a vocab entry is tagged `web-verified`; single-sourced
or unconfirmed entries ship as `needs-verification` and are not presented as
confirmed. Because Sranan Tongo has no single canonical grammar book, sourcing
strength varies a lot by unit and generally thins as tier rises. Author
well-sourced units first:

| Unit | Tier | Sourcing strength | Notes |
|------|------|-------------------|-------|
| `unit-01-srn-greetings` | Beginner | **Well-sourced (done)** | Every entry already `web-verified` across ≥2 phrasebooks/dictionaries. |
| `unit-02-srn-sounds` | Beginner | **Well-sourced (done)** | Alphabet fixed by `language-settings.json`; spelling/pronunciation rules sourced from Koen Kamphuijs's spelling page, cross-checked against the settings-file alphabet — no diacritics to dispute. |
| `unit-00-srn-about` | Beginner | Well-sourced (facts) | History/status well documented on Wikipedia; keep claims sourced, not embellished. |
| `unit-03-srn-nouns` | Beginner | Mixed | The `a`/`den`/`wan` + `fu` system is well attested; individual noun spellings need per-word cross-checking. |
| `unit-04-srn-pronouns` | Beginner | Mixed | Pronoun set and question words are well attested; confirm each form and its `en`/`a` variants. |
| `unit-05-srn-verbs` | Intermediate | Mixed | TMA particles/copulas well documented in creole descriptions; confirm example sentences against a second source. |
| `unit-06-srn-food` | Intermediate | Mixed–thin | Phrasebooks cover common items; many foods are single-sourced — expect `needs-verification`. |
| `unit-07-srn-people` | Intermediate | Thin | Family/role terms are patchily covered; verify each or defer. |
| `unit-08-srn-getting-around` | Intermediate | Mixed | Directions/numbers/time are in the phrasebooks; less-common place words are thin. |
| `unit-09-srn-reading` | Advanced | Depends on source text | Only as sourced as its underlying passage; use attributed graded readers/dialogues, never invented prose. |

Two things to hold throughout, from the repo's rules:

- **Plain, unaccented Latin alphabet.** Sranan Tongo does **not** use macrons
  (`ā/ī/ū`) or underdots (`ṭ/ḍ/ṇ`) like Sarnami; its `romanization.diacritics`
  is intentionally empty. Never add diacritics that aren't independently
  attested — the sounds unit teaches this explicitly, and no later unit should
  reintroduce them.
- **Don't invent or guess.** Where sources disagree or a word is single-sourced,
  tag `needs-verification` and prefer shipping less. A verified 3-lesson unit is
  better than a padded 5-lesson one — the same principle that keeps the
  Advanced tier thin above.

## Out of scope / deferred for a first release

- **Audio recording/playback** beyond what `language-settings.json`'s `audio`
  config already references — no new audio assets authored here.
- **Tone.** Sranan Tongo has some tonal minimal pairs, but the plain
  orthography doesn't mark tone and the sources don't teach it systematically;
  it is out of scope for the first release.
- **Free-text / speaking / listening-transcription** exercise kinds — the
  engine ships the five kinds above; nothing here assumes more.
- **Spaced-repetition scheduling & mastery tracking** — engine/app concerns,
  not content.
- **Deep/rare grammar (a future C2 candidate)** — serial-verb constructions
  beyond simple examples, the full modal/aspect long tail, and reported
  speech are deferred; the verb unit ships the common TMA particles and
  copulas only. This is the most likely source of future Advanced-tier units
  once it's genuinely sourced.
- **Dialectal / sociolectal variation** beyond what the sources document;
  where they disagree, tag `needs-verification` until a second source confirms.

## Attribution

`unit-02-srn-sounds` and the extended numbers (`srn-num-erfu` … `srn-num-wan-milyun`
in `content/sranantongo/vocab/numbers.json`) are sourced from Koen Kamphuijs's
["De Sranantongo files"](http://koenkamphuijs.nl/sranantongo/) — see
`README.md`'s "Content" section for the credit line and each affected vocab
entry's `notes` field for the specific citation.
