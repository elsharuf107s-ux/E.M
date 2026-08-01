# Portfolio — nine business websites

A portfolio index (`index.html`) plus the nine finished business sites it links to.
Everything is hand-written HTML and CSS. No build step, no framework, no package
manager — open `index.html` in a browser and it works.

## The sites

Each one is a single self-contained file with its own layout language and its own
logo inlined as a data URI.

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
index.html               the portfolio — work grid, sector filter, approach, marks, contact
*.html                   the nine sites, one file each
assets/previews/*.jpg    1440×900 hero screenshots used as the cards in the portfolio
assets/logos/*.png       the ten brand marks (also kept zipped in logos-batch-2.zip)
```

## Viewing it

Open `index.html` directly, or serve the folder:

```sh
npx serve .
```

Both work — nothing depends on a server. The only external request any page makes is
to Google Fonts, and every page falls back to system fonts offline.

## Before publishing

Two things in `index.html` are placeholders, each marked with a `<!-- REPLACE -->`
comment:

- the contact email (`hello@example.com`), in the contact button and the details list
- the wordmark in the top bar and the "Open for work" availability line, if those
  aren't what you want them to say

## Regenerating the previews

The card images are screenshots of the sites themselves, so they need refreshing when a
site's hero changes. They were captured with Playwright and Chromium at a 1440×900
viewport, `deviceScaleFactor: 1.5`, clipped to `{ x: 0, y: 0, width: 1440, height: 900 }`
and saved as JPEG quality 76 to `assets/previews/<site-name>.jpg`.

Keep the 16:10 crop — the portfolio cards assume it.
