# Integrations — the slide-out panel

Every one of the 30 templates ships with at least one panel that hosts a
third-party embed. **No third-party code ships in this repo.** The panels are
built, wired and tested; the slots inside them are empty and documented, so a
client drops in their own provider's snippet without touching layout.

Twenty-nine of the thirty are local businesses with **one** action that matters,
so they carry one panel. The thirtieth, `cadence.html`, is a SaaS product
template and carries **twenty** mount points — see the last section.

---

## What each site is set up for

The action a site is *for* depends on the trade, so the panel is labelled and
worded per site rather than being one generic "Contact us". These twenty-nine
carry one panel each; `cadence.html` is covered separately below.

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

Verified on all 29 at 1280px and 390px by `modal-all.mjs`, and on `cadence.html`'s
four overlays by `cadence-a11y.mjs` — see the AGENT_LOG
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


---

## `cadence.html` — the twenty-mount template

A SaaS product site rather than a local business, built to demonstrate a full
integration stack on one page. It does **not** use the `.ip` pattern above,
because that controller does `document.querySelector('.ip')` and assumes a
single panel. Cadence has four overlays, so they are addressed by id.

### The controller

```html
<button data-open="ov-book">…</button>   <!-- opens #ov-book -->
<button data-close>…</button>            <!-- closes whatever is open -->
```

Same accessibility contract as `.ip` — `role=dialog` + `aria-modal`, focus moved
in and returned, Tab trapped, Escape, scroll lock, 44×44 close — plus one extra
rule: **only one overlay is open at a time.** Opening a second closes the first,
which is what stops the assistant and live chat fighting over focus. Verified by
`cadence-a11y.mjs`, including the swap case.

`window.cadenceOverlay.open(id, trigger)` / `.close()` are exposed for anything
that needs to drive a panel from script.

### Where each of the twenty lives

Four are built shells with an empty `.slot`; three are built page sections; the
rest are a marked endpoint, tag or webhook. Search the file for `REPLACE`.

| # | Integration | Mount |
|---|---|---|
| 1 | AI assistant | `#ov-bot > .slot` — shell built |
| 2 | Booking / scheduling | `#ov-book > .slot` — shell built |
| 3 | Contact form → CRM | `#lead-form` action + stub handler |
| 4 | Email automation | list id on `#news-form` |
| 5 | Exit-intent capture | `#ov-exit > .slot` — shell built |
| 6 | Live chat | `#ov-chat > .slot` — shell built |
| 7 | Payment gateway | `[data-checkout]` buttons in `#plans` |
| 8 | CRM | same endpoint as 3 |
| 9 | Analytics / tracking | `<head>` tag, behind consent |
| 10 | Meeting transcription | booking provider's post-call webhook |
| 11 | Automation connector | one webhook, subscribed to 3, 7, 12 |
| 12 | Review collection | `#proof .quotes` — section built |
| 13 | SMS follow-up | triggered from 11, or the CRM's sender |
| 14 | Support ticketing | out-of-hours fallback on 6 |
| 15 | Newsletter | `#news-form` action — form built |
| 16 | Calendar sync | configured inside 2, two-way |
| 17 | Lead scoring | events from 9 + form starts on 3 |
| 18 | Visitor identification | `<head>` tag, behind consent |
| 19 | Social scheduling | webhook from 11 on publish |
| 20 | Knowledge base | `#help .kb__list` — section built |

The same list, with the exact selectors, is repeated in a comment block at the
foot of `cadence.html` so it stays next to the code.

### Two rules that come with it

- **Nothing that identifies or tracks a visitor (9, 17, 18) loads before
  consent.** There is no consent banner in the file yet. Add one before those
  tags go live — this is the one item that is a legal problem, not a taste one.
- **The exit-intent popup is deliberately conservative:** desktop pointer only,
  leaving through the top of the window, after 400px of scroll, once per
  session, and never while another overlay is open. A popup that fires on a
  first scroll is the reason people hate popups.

### Two bugs this file hit, worth not repeating

- **`.ov{display:flex}` outranks the user agent's `[hidden]{display:none}`.**
  Without an explicit `.ov[hidden]{display:none}` the "hidden" overlays stayed
  in the layout — parked off-screen by their transform but still swallowing
  clicks across the bottom of the viewport.
- **A drawer must not reuse a class the header row styles.** The mobile drawer
  was `class="draw wrap"`, and `.bar .wrap{display:flex;height:72px}` turned it
  into a 72px flex row that shoved its links 160px past the viewport edge.
  `overflow-x:hidden` hid it until a Tab keypress scrolled it into view.
