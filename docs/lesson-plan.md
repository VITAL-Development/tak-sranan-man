# Sranan Tongo lesson plan

The single source of truth for the app's **unit/lesson curriculum**. Each
per-topic unit is authored against this plan so that scope, sequencing and
vocab ownership stay consistent across units and nothing is taught twice.

This is a planning/design doc, not served content. It guides authoring order.
For the on-disk content model (`vocabRef`/`contentRef`, verification tags,
directory layout) and the verification discipline see
[`../CLAUDE.md`](../CLAUDE.md); for how content ships (SemVer tags, breaking
vs additive changes) see [`versioning.md`](versioning.md).

It takes **structural** inspiration from the sibling
[`sarnami-bol-naa`](https://github.com/VITAL-Development/sarnami-bol-naa)
lesson plan — the same parallel shape (orientation → sounds → basics →
grammar → applied → reading capstone) and level progression — but **not** its
content. Sranan Tongo is a different language with its own grammar, vocabulary
and sources; where Sarnami is an inflectional Indo-Aryan language driven by a
single grammar book, Sranan Tongo is an English/Dutch-lexified **creole** with
largely analytic grammar and no single canonical source, so the units below
are organised around Sranan Tongo's own structure, not transplanted from
Sarnami's grammar chapters.

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
  dialogues and graded readers for the capstone.
- **Koen Kamphuijs's ["De Sranantongo files"](http://koenkamphuijs.nl/sranantongo/)**
  and **suriname.nu's ["Sranan, de grammatica"](https://www.suriname.nu/201cult/sranan01.html)**
  — two independent Dutch-authored grammar sketches (articles, pronouns,
  demonstratives, question words, TMA particles, copulas). Neither is an
  academic source; used as a pair so entries can be cross-checked between
  them per the discipline below. See "Attribution" at the end of this doc.

No entry is presented as confirmed on a single source: two independent sources
must agree before a vocab entry is tagged `web-verified`; otherwise it is
tagged `needs-verification`. See the *Sourcing & verification* section below
for which units are well-sourced today vs. thin.

## The content model, briefly

- A **unit** (`content/sranantongo/units/*.json`) has an `id`, `title`,
  `description`, an integer `order` (display sort key), and an ordered list of
  **lessons**. (Sranan Tongo units carry **no `bookChapterRef`** — there is no
  single book; a lesson's sourcing lives in its vocab entries' `notes`, as it
  already does in `content/sranantongo/vocab/*.json`.)
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

## Unit sequence

Units are ordered pedagogically, not by id number: orientation and sounds come
first, the existing basics slot in early, productive grammar builds on the
basics, applied everyday-topic units follow, and reading is a capstone. One
unit already exists — **`unit-01-srn-greetings`** — and keeps its **id** (ids
are the stable reference used by any consumer). Its `order` is reassigned to
fit the sequence below as each new unit lands; because `order` is only a sort
key and ids don't change, renumbering it is an **additive/non-breaking**
content change (see [`versioning.md`](versioning.md)).

| # | Unit id | Title (nl) | Grammar / theme | Status |
|---|---------|------------|-----------------|--------|
| 1 | `unit-00-srn-about` | Over het Sranan Tongo | orientation, no grammar | new |
| 2 | `unit-02-srn-sounds` | Klanken & spelling | alphabet, spelling, stress | new |
| 3 | `unit-01-srn-greetings` | Basiswoorden | greetings + numbers 1–10 | **exists** |
| 4 | `unit-03-srn-nouns` | Zelfstandige naamwoorden & lidwoorden | `a`/`den`/`wan`, plural, `fu`-possession | new |
| 5 | `unit-04-srn-pronouns` | Voornaamwoorden & vraagwoorden | personal/possessive/demonstrative + question words | **exists** |
| 6 | `unit-05-srn-verbs` | Werkwoorden, tijd & aspect | TMA particles `e`/`ben`/`o`/`sa`, `de`/`na`, `no` | new |
| 7 | `unit-06-srn-food` | Nyanyan & dringi | food & drink vocab | new |
| 8 | `unit-07-srn-people` | Famiri & sma | family & people vocab | new |
| 9 | `unit-08-srn-getting-around` | Na pasi | place, time, direction; `na`/`nanga` | new |
| 10 | `unit-09-srn-reading` | Leesteksten & dialogen | applied reading capstone | new |

New unit ids are numbered `00` and `02`–`09` so they don't collide with the
existing `unit-01-srn-greetings`; the **`order` column** (1–10) is what
actually drives display sequence. (An implementer may instead renumber all
unit ids to a clean `unit-01`…`unit-10`; if so, do it as one dedicated change
and update every `unitId` back-reference — the id-preserving scheme above
avoids that churn, exactly as the sibling repo does.)

## Sequencing & dependencies

- **Orientation first, no prerequisites.** `unit-00-srn-about` is
  background/cultural (what Sranan Tongo is, its history as Suriname's
  English/Dutch-lexified creole and lingua franca) and can be taken cold.
- **Sounds before everything productive.** `unit-02-srn-sounds` teaches the
  plain, unaccented Latin spelling and pronunciation that every later unit
  relies on. Because Sranan Tongo has **no diacritics** (see below), this unit
  is lighter than Sarnami's sounds unit — there are no macrons/underdots to
  drill — but it still gates the grammar units.
- **The existing basics slot in third.** `unit-01-srn-greetings` already
  teaches the first greetings/politeness words and numbers 1–10. It sits after
  sounds (so learners can read the spellings) and before the grammar units,
  which **extend** it and must not re-teach that starter set (see *Overlap*).
- **Nouns before pronouns before verbs.** The article/plural system
  (`a`/`den`/`wan`) underpins how nouns appear in sentences; the pronoun set
  is needed as verb subjects; the verb/TMA unit then combines them into
  clauses. This is the productive spine.
- **Everyday-topic units after the grammar spine.** Food, people, and
  getting-around are vocab-expansion units that reuse the article, pronoun and
  TMA machinery in real sentences; they can otherwise be taken in any order.
- **Reading is the capstone.** `unit-09-srn-reading` reuses vocab and grammar
  from earlier units and introduces little new machinery — only reading
  strategy and passage-specific vocab. It sits at the end.

## Overlap with the existing greetings unit

`unit-01-srn-greetings` intentionally front-loads a small, high-frequency
slice of later material. The deeper units own the rest:

- **Numbers** — the greetings unit's lesson 2 teaches `srn-num-wan`…`srn-num-tin`
  (1–10) as bare vocab. A later numbers extension (folded into
  `unit-08-srn-getting-around`, for prices/time) owns 11+, tens and counting in
  context; it may *reuse* those ids in examples but introduces no duplicate
  entries.
- **Greetings/politeness** — `odi`, `fa waka`, `fa yu tan`, `mi bun`, `tangi`,
  `gran tangi` are owned here. Later units reference them in dialogues by id
  and do not re-introduce them.
- **Pronoun/verb glimpses** — phrases like `fa yu tan` and `mi bun` already
  expose `yu`, `mi` and predicate `bun`. `unit-04-srn-pronouns` and
  `unit-05-srn-verbs` generalise these into the full pronoun set and the
  copula/TMA system; they treat the greeting phrases as fixed expressions
  already known, not as new vocab.

Rule of thumb: a vocab entry has exactly one owning lesson (its `newVocab`);
every other lesson references it by id.

## Per-unit scope

Sizing follows the existing unit: **2–5 lessons per unit**, **~3–5 exercises
per lesson**, ending each multi-lesson grammar/topic unit with a **review
lesson** (`newVocab: []`, mixed exercises, higher `xpReward`). Vocab counts
below are **targets**, to be met only with entries cross-checked against ≥2
independent sources; anything single-sourced ships as `needs-verification`
rather than padding the count. A smaller, fully-verified unit beats a larger,
thin one.

### 1. `unit-00-srn-about` — Over het Sranan Tongo
Background/cultural, reading-led. What Sranan Tongo is (Suriname's
English/Dutch-lexified creole and everyday lingua franca), a sketch of its
history, and an at-a-glance look at its plain-Latin writing system.
- ~2–3 short reading lessons + a light review. Little to no productive drilling.
- Vocab: a small set of key terms/proper nouns (flashcard-worthy: *Sranan*,
  *Sranan Tongo*, *Suriname*), not a general vocab set.
- **Exercise mix:** heavy `multiple-choice` comprehension + a few `flashcard`
  for key terms. No `word-bank`/`fill-blank` (nothing to construct yet).

### 2. `unit-02-srn-sounds` — Klanken & spelling
The foundation unit: the five vowels (`a e i o u`) and the consonant set from
`language-settings.json`, plus the fact that Sranan Tongo is written in a
**plain, unaccented Latin alphabet** — no macrons or underdots. Teaches
learners to map spelling to sound and to read the spellings used everywhere
else.
- ~3 lessons: vowels → consonants (incl. how `w`/`y` and common
  spelling patterns behave) → review. Kept lighter than Sarnami's sounds unit
  because there are no diacritics to teach.
- Vocab: minimal-pair / example words drawn from already-verified vocab rather
  than a new themed set.
- **Exercise mix:** `matching` (letter ↔ sound/description), `multiple-choice`
  (which spelling / which sound), `flashcard` (letter recognition). Avoid
  `word-bank`; use `fill-blank` only for "pick the correctly-spelled form".

### 3. `unit-01-srn-greetings` — Basiswoorden *(exists)*
Already authored and web-verified: greetings/politeness (lesson 1) and numbers
1–10 (lesson 2). No new authoring needed beyond keeping its `order` in step
with this sequence. Later units reference its vocab by id.

### 4. `unit-03-srn-nouns` — Zelfstandige naamwoorden & lidwoorden
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

### 5. `unit-04-srn-pronouns` — Voornaamwoorden & vraagwoorden *(exists)*
The pronoun system and question words — Sranan Tongo has no case endings, so
this is a **closed set to memorise and place**, not a paradigm to inflect.
- 4 lessons: personal pronouns (`mi`, `yu`, `a`/`en`, `wi`, `unu`, `den`) →
  possessive use of the same forms + demonstratives (`disi`/`dati`) →
  question words (`san`, `suma`, `pe`, `sortu`, `oten`, `fa`, `omeni`, `fu san
  ede`) → review.
- 16 pronoun/question forms (`vocab/pronouns.json`), cross-checked between
  Koen Kamphuijs's and suriname.nu's grammar pages (see "Attribution" below);
  `oten`, `omeni` and `fu san ede` ship `needs-verification` (single-sourced
  or disputed between the two — see each entry's `notes`). Does **not**
  re-introduce the greeting phrases' embedded `mi`/`yu`.
- **Exercise mix:** `matching` (form ↔ meaning), `fill-blank` (choose the right
  pronoun/question word in a sentence), `multiple-choice`, `flashcard`.

### 6. `unit-05-srn-verbs` — Werkwoorden, tijd & aspect
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

### 7. `unit-06-srn-food` — Nyanyan & dringi
Applied vocab: food and drink, the kind of high-frequency words the
phrasebooks cover well. Reuses articles and the TMA system in example
sentences ("mi wani…", "a de switi").
- ~3 lessons grouped (staples/dishes → drinks & the market → review).
- Vocab ~15–20 food/drink items (own vocab file).
- **Exercise mix:** `flashcard` + `matching` (word ↔ meaning/picture-caption),
  `multiple-choice`, and `word-bank`/`fill-blank` for short "I want…" /
  "it is tasty" sentences.

### 8. `unit-07-srn-people` — Famiri & sma
Applied vocab: family and people (*famiri*, *sma*), roles and relationships,
used with the possessive constructions from `unit-03`.
- ~3 lessons (immediate family → wider people/roles → review).
- Vocab ~15–20 people/family terms.
- **Exercise mix:** `flashcard` + `matching` (term ↔ meaning), `word-bank`
  (possessive phrases: *mi m'ma*, *a brada fu mi*), `fill-blank`,
  `multiple-choice`.

### 9. `unit-08-srn-getting-around` — Na pasi
Applied: place, direction and time — the prepositions `na` (at/to/in) and
`nanga` (with), directions, and numbers in use (prices, telling the time,
counting past ten). This is where the numbers from `unit-01` are extended and
applied.
- ~4 lessons: places & the `na` preposition → directions & `nanga` → time &
  higher numbers → review.
- Vocab ~15–20 place/direction/time words + higher numerals, cross-checked
  against the phrasebooks' directions and numbers sections.
- **Exercise mix:** `word-bank` (build "go to the market" style phrases) and
  `fill-blank` (choose `na`/`nanga`) lead; `matching`, `multiple-choice`,
  `flashcard`.

### 10. `unit-09-srn-reading` — Leesteksten & dialogen
Capstone/applied: short graded dialogues and reading passages (with Dutch
translations) that reuse earlier vocab and grammar. Introduces little new
machinery — reading strategy and passage-specific vocab only.
- ~3–4 graded reading/dialogue lessons → review; sits at the end.
- **Exercise mix:** `multiple-choice` comprehension leads; `word-bank`
  (reconstruct a line of dialogue), `fill-blank` (cloze over known words),
  `matching` (passage vocab). Passages must themselves be sourced (Peace
  Corps / SIL graded readers, phrasebook dialogues) — no invented text.

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
strength varies a lot by unit. Author well-sourced units first:

| Unit | Sourcing strength | Notes |
|------|-------------------|-------|
| `unit-01-srn-greetings` | **Well-sourced (done)** | Every entry already `web-verified` across ≥2 phrasebooks/dictionaries. |
| `unit-02-srn-sounds` | **Well-sourced** | Alphabet/spelling fixed by `language-settings.json`; no diacritics to dispute. |
| `unit-00-srn-about` | Well-sourced (facts) | History/status well documented on Wikipedia; keep claims sourced, not embellished. |
| `unit-03-srn-nouns` | Mixed | The `a`/`den`/`wan` + `fu` system is well attested; individual noun spellings need per-word cross-checking. |
| `unit-04-srn-pronouns` | **Well-sourced (done)** | Pronoun set and question words cross-checked between Kamphuijs's and suriname.nu's grammar pages; `oten`/`omeni`/`fu san ede` remain `needs-verification` (single-sourced or disputed between the two — see "Attribution"). |
| `unit-05-srn-verbs` | Mixed | TMA particles/copulas well documented in creole descriptions; confirm example sentences against a second source. |
| `unit-06-srn-food` | Mixed–thin | Phrasebooks cover common items; many foods are single-sourced — expect `needs-verification`. |
| `unit-07-srn-people` | Thin | Family/role terms are patchily covered; verify each or defer. |
| `unit-08-srn-getting-around` | Mixed | Directions/numbers/time are in the phrasebooks; less-common place words are thin. |
| `unit-09-srn-reading` | Depends on source text | Only as sourced as its underlying passage; use attributed graded readers/dialogues, never invented prose. |

Two things to hold throughout, from the repo's rules:

- **Plain, unaccented Latin alphabet.** Sranan Tongo does **not** use macrons
  (`ā/ī/ū`) or underdots (`ṭ/ḍ/ṇ`) like Sarnami; its `romanization.diacritics`
  is intentionally empty. Never add diacritics that aren't independently
  attested — the sounds unit teaches this explicitly, and no later unit should
  reintroduce them.
- **Don't invent or guess.** Where sources disagree or a word is single-sourced,
  tag `needs-verification` and prefer shipping less. A verified 3-lesson unit is
  better than a padded 5-lesson one.

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
- **Deep/rare grammar** — serial-verb constructions beyond simple examples,
  the full modal/aspect long tail, and reported speech are deferred; the verb
  unit ships the common TMA particles and copulas only.
- **Dialectal / sociolectal variation** beyond what the sources document;
  where they disagree, tag `needs-verification` until a second source confirms.

## Attribution

`unit-04-srn-pronouns` (`content/sranantongo/vocab/pronouns.json`) is sourced
from **Koen Kamphuijs's ["De Sranantongo files"](http://koenkamphuijs.nl/sranantongo/)**
and **suriname.nu's ["Sranan, de grammatica"](https://www.suriname.nu/201cult/sranan01.html)**
(Webteam Suriname / Afdeling Suriname) — see `README.md`'s "Content" section
for the credit line and each affected vocab entry's `notes` field for the
specific citation, including the disagreements between the two sources that
were resolved (or left `needs-verification`) during authoring.
