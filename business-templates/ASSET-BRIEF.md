# Asset brief

Two things live here:

1. **[The generation brief](#the-brief)** — a self-contained prompt to paste into whatever
   tool makes the images. Fill in four variables, per client.
2. **[How to hand assets over](#handing-assets-to-claude-code)** — the part that actually
   determines whether they can be used, so read it first.

---

## Handing assets to Claude Code

**A file pasted into the chat cannot be saved.** Claude Code can *see* an attached image but
has no access to its bytes, so it cannot write it to disk. This has already cost one round
trip with the E.M logotype. Files must arrive by one of these three routes instead.

### 1. Commit them yourself — best

Drag and drop onto github.com, or push from Antigravity:

```
business-templates/assets/logos/<slug>.png
business-templates/assets/icons/<slug>-favicon.png
business-templates/assets/social/<slug>-og.png
business-templates/assets/photos/<slug>-hero.jpg
business-templates/assets/textures/<name>.png
```

Then say which site each belongs to. Nothing else needed — a `git pull` finds them.

### 2. Give a URL

Any link that resolves without a login. Say "fetch these" and paste the URLs; they get
downloaded, checked and committed.

### 3. A zip in the repo

Push `assets-drop.zip` to the repo root. It gets unpacked, sorted into the tree above,
renamed to the convention, and the zip deleted in the same commit.

### What happens once they land

Every asset is checked before it is wired in — **never trust that a file is what it claims
to be.** A previous batch of twenty logo crops all reported success and were twenty blank
white PNGs; the run was believed instead of the output being opened. So:

- opened and looked at, one by one
- dimensions and transparency confirmed against the spec below
- checked against the background it will actually sit on (a dark logo on a dark header is
  the most common failure)
- wired into the markup, contrast swept, preview recaptured
- committed with the site it belongs to

### Naming

`<site-slug>-<role>.<ext>` — lowercase, hyphens, no spaces, no version numbers.
`momentum-fitness-og.png`, not `MomentumFitness_OG_final_v2.png`.

The slug must match the HTML filename: `momentum-fitness.html` → `momentum-fitness-*`.

---

## The brief

Paste everything below into the generating tool. Fill in the four variables first.

````markdown
# WEBSITE ASSET GENERATION BRIEF

You are generating image assets for a single-page business website.
Produce every asset listed under "REQUIRED". Skip any marked N/A for this sector.

## FILL THESE IN
- BUSINESS NAME:
- SECTOR:            (e.g. plumber, bakery, law firm, gym, day spa, tour operator)
- BRAND COLOURS:     (hex values, primary + accent)
- TONE:              (e.g. calm and balanced / dynamic and strong / warm and handcrafted)

---

## REQUIRED — every site, no exceptions

### 1. Logo set
| File | Spec |
|---|---|
| `logo.svg` | Vector. Fallback: PNG 1200px wide, transparent |
| `logo-mark.png` | Mark only, no wordmark. 512×512, transparent, no padding |
| `logo-reversed.png` | Light/white version for dark backgrounds. Same sizes |
| `logo-horizontal.png` | ~3:1 lockup, for headers |
| `logo-stacked.png` | ~1:1.2 lockup, for footers and mobile |

The reversed version is not optional. Any site with a dark header or footer
needs it, otherwise the logo has to sit on an ugly white plate.

### 2. Favicons
| File | Spec |
|---|---|
| `favicon.svg` | The mark, square, no padding, legible at 16px |
| `favicon-512.png` | 512×512, transparent |
| `apple-touch-icon.png` | 180×180, **opaque background — not transparent** |

Test the mark at 16×16. If it's mud at that size, simplify it.

### 3. Share card (Open Graph)
| File | Spec |
|---|---|
| `og-image.png` | **1200×630**. Logo + tagline + the one fact that matters |
| `og-square.png` | 1200×1200, same content recomposed |

"The one fact that matters" is sector-specific: phone number for a
tradesperson, address for a restaurant, opening hours for a clinic.
Keep all text inside a 10% safe margin — platforms crop the edges.

---

## SECTOR-DEPENDENT — generate only what applies

### 4. Photography
Shoot or generate in **consistent sets**: same lighting direction, same
colour temperature, same background treatment across all images for one
business. Six mismatched photos look worse than one good one.

| Type | Spec | Sectors that need it |
|---|---|---|
| Hero / establishing | 2400×1350 (16:9) + 1200×1200 mobile crop | Food, hospitality, retail, wellness |
| Product / dish | 1200×1200, identical background | Bakery, restaurant, café, skincare, retail |
| Work in progress | 1600×1200 | Trades, construction, automotive, detailing |
| Before / after pairs | Identical framing and crop, 1600×1200 each | Detailing, construction, plumbing, HVAC, landscaping |
| Interior / premises | 2000×1333 | Spa, gym, studio, café, clinic, shop |
| Material / texture detail | 1600×1600 | Bakery (crumb), joinery (grain), textiles |

### 5. Textures and backgrounds
| File | Spec |
|---|---|
| `texture-*.png` | Seamlessly tileable, 1024×1024 — paper, linen, concrete, chalkboard, kraft |
| `grain.png` | 400×400 noise overlay, applied at 3–6% opacity. Kills gradient banding |
| `mesh-bg.png` | 2400×1600 soft gradient field for hero backdrops |

### 6. Icons and diagrams
- Icon set: **one consistent stroke weight**, SVG, drawn on a 24×24 grid
- Location map: simplified, brand-coloured, 1600×900
- Process/step diagrams, numbered markers, seals and stamps
- Empty-state graphic for filtered lists that return nothing

### 7. Documents
- Menu / price list / spec sheet as PDF
- Capability statement or brochure (construction, consulting)

---

## STYLE RULES

1. **One visual system per business.** Every asset for one client shares a
   palette, a lighting direction and a level of realism. Do not mix flat
   illustration with photorealism in one set.
2. **Transparent PNG for anything that sits on a coloured background.**
3. **Test every logo and icon at its smallest real size** before delivering.
4. **Text inside images must still pass contrast** — 4.5:1 for body-size
   text, 3:1 for large. Text baked into an image cannot be fixed with CSS.
5. **Deliver at 2× the display size**, not more. A 4000px hero on a
   one-page site is dead weight on a phone connection.
6. **Compress before delivery.** JPEG q76–82 for photographs, PNG for
   anything with transparency or flat colour, SVG wherever possible.

## HARD PROHIBITIONS

These are not style preferences. Breaking them creates real liability for
the business the site belongs to.

1. **Never generate a photograph of a person presented as real.** No staff
   photos, no team pages, no customer faces beside testimonials, no
   "founder" portraits. If the business has no photo of a real person, the
   design must work without one.
2. **Never generate a certification, trade body, award or rating badge.**
   Gas Safe, Soil Association, ATOL, ABTA, Michelin, Awwwards, Google
   Reviews stars. All are publicly verifiable and a fake one is instantly
   disprovable.
3. **Never generate a photograph of premises, work or products that do not
   exist.** A photo of a bakery interior implies that bakery looks like
   that. Use texture, pattern or typography instead.
4. **Never imitate an existing brand's identity**, including near-miss
   logos and trade dress.

Anything a customer could reasonably treat as evidence must be real. If it
cannot be real yet, the site should be designed so the gap doesn't show —
that is a design problem, not a licence to fabricate.

## DELIVERY

```
assets/
├── logos/       logo.svg, logo-mark.png, logo-reversed.png, lockups
├── icons/       favicon.svg, favicon-512.png, apple-touch-icon.png
├── social/      og-image.png, og-square.png
├── photos/      hero-*.jpg, product-*.jpg, work-*.jpg, interior-*.jpg
├── textures/    texture-*.png, grain.png, mesh-bg.png
└── docs/        menu.pdf, price-list.pdf
```

Filenames lowercase, hyphen-separated, no spaces. State the exact pixel
dimensions of every file delivered.
````

---

## Where these 29 sites currently stand

Measured, not guessed — every `<img>` across all twenty-nine templates was counted.

| | Count |
|---|---|
| `<img>` tags across all 29 sites | 40 |
| …of which are logos | **40** |
| Sites with a favicon | **0** |
| Sites with an `og:image` | **0** |
| Sites with a reversed logo for their dark header | **0** |

So there are no photographs anywhere, and none of the three REQUIRED asset classes exists
for any site. Favicons, share cards and reversed logos are the highest-value batch to
generate first: all 29 lack all three, and all three are seen before a visitor reads a word.

The absence of photography is **not** currently a defect — every template is built to work
without it, using type, rule and colour instead. Adding photos to a site designed around
their absence usually makes it worse. Add them where the sector genuinely needs them (food,
premises, before/after) and leave the rest alone.
