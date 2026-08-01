# Business templates

Nine one-page business websites and a gallery that indexes them. Separate from the
E.M portfolio at the repo root — open `business-templates/index.html` to browse them.

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

## Structure

```
business-templates/
├── index.html            the gallery — work grid, sector filter, approach, marks, contact
├── *.html                the nine sites, one file each
├── assets/
│   ├── previews/*.jpg    1440x900 hero screenshots used as the gallery cards
│   └── logos/*.png       the ten brand marks
├── logos-batch-2.zip     the original logo archive
└── README.md
```

All paths inside `index.html` are relative to this folder, so the whole directory can be
moved or served on its own without editing anything.

## Viewing

Open `index.html` directly, or serve the repo and visit `/business-templates/`. Nothing
depends on a server. The only external request any page makes is to Google Fonts, and
every page falls back to system fonts offline.

## Before publishing

Contact details in `index.html` are placeholders, each marked with a `<!-- REPLACE -->`
comment:

- the contact email (`hello@example.com`), in the contact button and the details list
- the wordmark in the top bar and the "Open for work" availability line

## Regenerating the previews

The card images are screenshots of the sites themselves, so they go stale when a site's
hero changes. They were captured with Playwright and Chromium at a 1440x900 viewport,
`deviceScaleFactor: 1.5`, clipped to `{ x: 0, y: 0, width: 1440, height: 900 }`, saved as
JPEG quality 76 to `assets/previews/<site-name>.jpg`.

Keep the 16:10 crop — the gallery cards assume it.
