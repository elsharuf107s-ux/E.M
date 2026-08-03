# Integrations — the slide-out panel

Every one of the 29 templates ships with a panel that hosts a third-party embed.
**No third-party code ships in this repo.** The panel is built, wired and tested;
the slot inside it is empty and documented, so a client drops in their own
provider's snippet without touching layout.

---

## What each site is set up for

The action a site is *for* depends on the trade, so the panel is labelled and
worded per site rather than being one generic "Contact us".

| Kind | Sites | What the panel is for |
|------|-------|-----------------------|
| **Booking / scheduling** | 20 | Customer picks a slot — a service call, a treatment, a class, a table, a consultation. |
| **Ordering / subscriptions** | 5 | Customer buys or starts a standing order — bread, coffee, a veg box, gear. |
| **Donations** | 4 | Supporter gives once or monthly. |

**Booking (20):** apex-automotive · artisans-atelier · atlas-travel ·
bella-italia · bloom-botanicals · chronos-consulting · climatecontrol-hvac ·
flowmaster-plumbing · hydro-flow · lex-associates · momentum-fitness · nexa ·
nova-creative · oasis-wellness · pristine-polish · root-bloom · serene-spaces ·
summit-construction · vitality-gym · zenith-tech

**Ordering (5):** apex-outdoor · artisan-breads · daily-crumb · roast-revel ·
urban-harvest

**Donations (4):** future-scholars · harvest-helpers · pawsitive-haven ·
riverkeepers

---

## Dropping in a real provider

Open the site's `.html` and search for `REPLACE`. There are two markers.

**1. The embed slot.** Inside `.ip-body`:

```html
<!-- REPLACE: drop the booking system embed in here.
     Suggested providers for this sector: Jobber, Housecall Pro. ... -->
<div class="ip-slot">
  <p><strong>Booking system goes here.</strong></p>
  <p>Paste the embed from <code>Jobber</code> into <code>.ip-slot</code>...</p>
</div>
```

Delete the two placeholder `<p>`s and paste the provider's snippet — most give
you a container element plus one script tag; both go inside `.ip-slot`. Sizing is
already handled: the slot fills the panel and scrolls if the widget is taller.

**2. The fallback line.** Under `.ip-alt`, a placeholder link points at
`#contact`. Point it at the client's real phone number or address.

Nothing else needs to change. Do not restyle the panel to match the provider —
the panel already uses the site's own palette, and a provider's default theme
dropped on top is the thing that will look wrong.

### Providers the slot is shaped for

Named as examples of what the slot accepts. There is no arrangement with any of
them and none is required.

- **Booking:** Jobber, Housecall Pro, ServiceTitan, Shopmonkey, Buildertrend,
  Squire, Calendly, Cal.com, Acuity, Chili Piper, HubSpot, Clio Grow, TravelJoy,
  Fresha, Mindbody, Momence, TeamUp, OpenTable, Resy
- **Ordering:** Shopify, Shopify Buy Button, Square Online, Toast, Snipcart, Stripe
- **Donations:** Stripe, JustGiving, Donorbox

---

## How the panel is built

One `<aside class="ip">` plus a backdrop, both `hidden` at rest, injected before
`</body>`. CSS lives at the end of the site's own `<style>` block and uses that
site's palette tokens — the panel is not a visitor from another design.

Layout: a bottom sheet under 720px, a right-hand slide-out above it.

```
.ip-backdrop      the scrim; clicking it closes
.ip               the dialog
  .ip-head        heading, blurb, close button
  .ip-body
    .ip-slot      >>> the embed goes here <<<
    .ip-alt       "rather not use a form?" fallback
```

### Accessibility

This is the part that is fiddly and is already done:

- `role="dialog"` + `aria-modal="true"`, with `aria-labelledby` and
  `aria-describedby` pointing at real elements in the head
- focus moves to the first control on open
- Tab is trapped inside while open (both directions)
- Escape closes
- focus returns to the trigger that opened it
- the page behind is scroll-locked via `body.ip-open`
- 44×44 close target
- `prefers-reduced-motion` drops the transition

Verified on all 29 at 1280px and 390px by `modal-all.mjs` — see the AGENT_LOG
entry for 2026-08-03.

### Triggers

`data-ip-open` on any element opens the panel; `data-ip-close` closes it. The
handler is delegated from `document`, so **you can add as many triggers as you
like anywhere on the page** and they work with no extra wiring.

Every site has a trigger in the hero, because that is the one region visible at
every width. Most also have one in the header. Two rules were learned the hard
way and are worth keeping:

- **Do not rely on a trigger inside the primary `<nav>`.** Most of these sites set
  `display:none` on it below their nav breakpoint, so a nav-only trigger is
  unreachable on a phone. Two sites park the nav off-canvas, where it reports a
  box but cannot be clicked.
- **Check the site does not already have that button.** Where a header CTA
  already said the same thing, wiring it was better than adding a second one
  beside it; otherwise the header reads "Donate  Donate".

Triggers reuse the site's own `<a class="btn ...">` element and classes, and keep
their original `href` — so without JavaScript the button still jumps to the
relevant section instead of doing nothing.
