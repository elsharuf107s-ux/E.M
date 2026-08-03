# Ornaments

Nineteen decorative SVGs — rules, corners, artisan flourishes, badge frames, icons, step
chevrons and feedback graphics. Rebuilt from two contact sheets the owner generated, because
the sheets themselves were unusable as assets: one flat PNG each, ~40 elements crammed
together, and a single fixed navy-and-sage palette that would have clashed with 28 of the 29
sites.

## Use them inline. Not as files.

**A `mask-image` or CSS `url()` pointing at an SVG file is blocked when the page is opened
straight off disk**, and these pages are required to work with no server. Four techniques
were tested from a `file://` origin:

| Technique | Result |
|---|---|
| `mask-image: url(wave-rule.svg)` | **Blank.** Chromium treats `file://` as an opaque origin |
| `mask-image: url("data:image/svg+xml,…")` | **Broken** — painted a solid block |
| `<img src="wave-rule.svg">` | Works, but the colour is baked in |
| **Inline `<svg>` with `stroke="currentColor"`** | **Works, and inherits the page's colour** |

So the files in this folder are the **source library** — for reference, for handing to other
tools, or for `<img>` use. What actually ships in the twenty-nine sites is the same path data
inlined, with `currentColor`.

## The pattern in each site

```html
<div class="ornament" aria-hidden="true">
  <svg viewBox="0 0 240 12" fill="none" role="presentation">
    <path d="…" stroke="currentColor" stroke-width="1.5"/>
  </svg>
</div>
```

```css
.ornament{display:flex;justify-content:center;padding-block:clamp(1.75rem,4vw,3rem);
          opacity:.4;pointer-events:none}
.ornament svg{display:block;width:min(100%,200px);height:auto}
```

`currentColor` inherits the site's own body colour, so the ornament can never clash with a
palette — it goes light automatically on the dark sites and dark on the light ones. It is
decoration, so it carries `aria-hidden="true"` and `role="presentation"`; nothing is
announced to a screen reader and nothing is lost by ignoring it.

**The class is `.ornament`, not `.orn`.** `roast-revel.html` already uses `.orn` for its own
labelled section dividers, and the shorter name would have silently overridden them.

## Which site got which

Chosen per idiom rather than applied uniformly — the whole point of this set is that no two
sites argue the same way.

| Ornament | Sites |
|---|---|
| `dotted-rule` | apex-automotive, chronos-consulting, lex-associates, pawsitive-haven |
| `dashed-rule` | apex-outdoor, atlas-travel, nexa, nova-creative, pristine-polish, zenith-tech |
| `chevron-band` | climatecontrol-hvac, flowmaster-plumbing, hydro-flow, momentum-fitness, summit-construction, vitality-gym |
| `wave-rule` | oasis-wellness, riverkeepers, serene-spaces |
| `flourish` | artisans-atelier, bella-italia, daily-crumb |
| `sprig` | artisan-breads, bloom-botanicals, harvest-helpers, root-bloom, urban-harvest |
| `laurel` | future-scholars |
| *(none)* | roast-revel — it already has three period-appropriate dividers of its own |

## The rest of the library

Not yet placed in any site, kept for when there is a use:

`corner-bracket`, `corner-scroll`, `badge-octagon`, `badge-circle`, `icon-star`,
`icon-shield`, `icon-leaf`, `icon-gear`, `icon-calendar`, `icon-map`, `step-chevron`,
`empty-state`, `spinner`.

**The badge frames are decoration only.** Do not put a shield or star seal next to a claim
about certification, accreditation or an award — see the prohibitions in `../../ASSET-BRIEF.md`.
A seal that looks like a credential *is* a credential claim to anyone reading quickly.

## Verified

All twenty-eight render at their intended size, each taking its own site's colour, all
`aria-hidden`. Every one of the twenty-nine sites still passes the full audit afterwards:
no sideways scroll at 320/360/414/768/1024/1920, WCAG AA contrast throughout, no heading
skips, no console errors.

The ornament sits immediately before `</main>` on every site, which is **below the 1440×900
preview crop on all twenty-nine** — checked, not assumed — so the Live Sites card images did
not need recapturing.
