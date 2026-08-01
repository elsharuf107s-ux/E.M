# Business templates

Twelve one-page business websites. They are indexed from the **E.M portfolio at the repo
root** — see the "Live Sites" section on `index.html` and `work.html`, which has search,
sector filtering and sorting. There is no separate gallery page here any more; E.M is the
only front door.

Everything here is hand-written HTML and CSS with no build step. Each site is a single
self-contained file with its own layout language and its own logo inlined as a data URI.

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

## Structure

```
business-templates/
├── *.html                the twelve sites, one file each
├── assets/
│   ├── previews/*.jpg    1440x900 hero screenshots used as the Live Sites cards
│   └── logos/*.png       thirty brand marks (ten original, twenty from the kits)
├── logos-batch-2.zip     the original logo archive
└── README.md
```

All paths inside each site are relative to this folder, so the whole directory can be moved
or served on its own. The E.M site reaches *down* into it, which does not break that.

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
