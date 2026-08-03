# Business templates

Twenty-nine one-page business websites. They are indexed from the **E.M portfolio at the
repo root** — see the "Live Sites" section on `index.html` and `work.html`, which has
search, sector filtering and sorting. There is no separate gallery page here any more; E.M
is the only front door.

Everything here is hand-written HTML and CSS with no build step. Each site is a single
self-contained file with its own layout language, referencing its logo from
`assets/logos/`.

## The sites

| # | File | Business | Concept |
|---|------|----------|---------|
| 01 | `apex-automotive.html` | Independent workshop | *The Spec Sheet* — job card, live bay board, published rates |
| 02 | `hydro-flow.html` | 24/7 emergency plumber | *The Dispatch* — symptom triage, response times, persistent call bar |
| 03 | `lex-associates.html` | Law firm | *The Brief* — fixed rail, roman numerals, hairline rules |
| 04 | `nexa.html` | Managed IT & security | *The Console* — service board, coverage matrix, incident timeline |
| 05 | `roast-revel.html` | Coffee roastery & café | *The Broadsheet* — masthead, drop caps, price leaders |
| 06 | `root-bloom.html` | Nursery & garden centre | *The Field Guide* — specimen entries, sowing calendar |
| 07 | `serene-spaces.html` | Yoga studio | *The Breath* — vertical rhythm, working breath pacer |
| 08 | `vitality-gym.html` | Gym & strength coaching | *The Board* — full-bleed blocks, hazard stripes |
| 09 | `artisans-atelier.html` | Studio & gallery | *The Catalogue* — hanging wall, catalogue numbering |
| 10 | `flowmaster-plumbing.html` | Plumbing | *The Service Call* — click-to-call everywhere, dispatch card |
| 11 | `climatecontrol-hvac.html` | Heating & cooling | *The Thermostat* — red half, blue half, grey middle |
| 12 | `pristine-polish.html` | Car detailing | *The Studio* — dark room, one light, drag-to-reveal slider |
| 13 | `daily-crumb.html` | Bakery | *The Shop Sign* — centred, soft-edged, dotted-leader menu board |
| 14 | `bella-italia.html` | Restaurant | *The Menu Card* — trattoria linen, four courses, hand-set |
| 15 | `pawsitive-haven.html` | Animal rescue | *The Noticeboard* — filterable pets, three ways to help |
| 16 | `harvest-helpers.html` | Food bank | *The Pantry Board* — find food first, appeal second |
| 17 | `riverkeepers.html` | Conservation charity | *The Field Station* — catchment readings, clean-up calendar |
| 18 | `future-scholars.html` | Education foundation | *The Certificate* — gold rules, numbered steps, alumni |
| 19 | `summit-construction.html` | Construction | *The Site Board* — hazard stripes, project grid, safety record |
| 20 | `apex-outdoor.html` | Outdoor gear retail | *The Spec Tag* — honest weights, field notes, repair-first warranty |
| 21 | `bloom-botanicals.html` | Skincare | *The Pressed Page* — green washes, six-ingredient formulas |
| 22 | `chronos-consulting.html` | Consulting | *The Memorandum* — text as hero, numbered services, no photography |
| 23 | `zenith-tech.html` | Technology platform | *The Lit Grid* — published latency, status board, monospace |
| 24 | `oasis-wellness.html` | Day spa | *The Still Room* — soft gradients, treatments priced by the hour |
| 25 | `nova-creative.html` | Creative agency | *The Colour Wheel* — gradient tiles, filterable by discipline |
| 26 | `urban-harvest.html` | Market garden & veg boxes | *The Chalkboard* — this week's harvest, stall times, box sizes |
| 27 | `atlas-travel.html` | Small-group tour operator | *The Field Journal* — fixed departures, what the price includes |
| 28 | `artisan-breads.html` | Sourdough bakery | *The Bake Sheet* — four timed bakes, what comes out of each |
| 29 | `momentum-fitness.html` | Gym & coaching | *The Split* — hard diagonal, timetable at the centre |

## Structure

```
business-templates/
├── *.html                the twenty-nine sites, one file each
├── assets/
│   ├── previews/*.jpg    1440x900 hero screenshots used as the Live Sites cards
│   ├── logos/*.png       thirty brand marks (ten original, twenty from the kits)
│   ├── icons/            favicons — empty, see ASSET-BRIEF.md
│   ├── social/           1200x630 share cards — empty
│   ├── photos/           photography — empty
│   ├── ornaments/*.svg   nineteen decorative SVGs + how they are used
│   ├── textures/         tileable textures and grain — empty
│   └── docs/             menus, price lists — empty
├── ASSET-BRIEF.md        what to generate, and how to hand it over
├── logos-batch-2.zip     the original logo archive
└── README.md
```

The five empty folders are drop zones. **`ASSET-BRIEF.md` holds a paste-ready brief for
whatever tool generates the images, plus the thing that catches people out: an *uploaded*
file reaches disk and can be used, but an image *pasted inline* into a message cannot.**
Committing, linking or zipping assets into the repo always works.

All paths inside each site are relative to this folder, so the whole directory can be moved
or served on its own. The E.M site reaches *down* into it, which does not break that.

**Ornaments are inlined, not linked.** Twenty-eight sites carry a decorative section break
before `</main>`, inline SVG painted with `currentColor` so it takes each site's own palette.
`assets/ornaments/` is the source library and explains why a linked SVG could not be used —
a CSS mask pointing at a file is blocked when the page is opened straight off disk.

## Viewing

Open the E.M site's `index.html` at the repo root and use the Live Sites section, or open
any file in this folder directly. Nothing depends on a server. The only external request any page makes is to Google Fonts, and
every page falls back to system fonts offline.

## Before publishing

Contact details in every site are placeholders, each marked with a `<!-- REPLACE -->`
comment, and the forms post nowhere.

## Regenerating the previews

The card images are screenshots of the sites themselves, so they go stale when a site's
hero changes. They were captured with Playwright and Chromium at a 1440x900 viewport,
`deviceScaleFactor: 1.5`, clipped to `{ x: 0, y: 0, width: 1440, height: 900 }`, saved as
JPEG quality 76 to `assets/previews/<site-name>.jpg`.

Keep the 16:10 crop — the E.M Live Sites cards assume it.
