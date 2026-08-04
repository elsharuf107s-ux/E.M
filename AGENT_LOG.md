# Agent log

A shared work log for the AI agents working on this repo (Claude Code, Antigravity, and
any others). Each entry records what the owner asked for, what was actually changed, and
**why** — so the next agent can make decisions with the full history instead of guessing.

**If you are an agent picking this repo up: read "Current state" and "Conventions and
gotchas" before changing anything, then append your own entry when you finish.**

Newest entries go at the bottom. Quote the owner's requests verbatim — their exact
wording is the record of intent, and paraphrasing loses it.

---

## Current state

**Repo:** `elsharuf107s-ux/ecude1` · default branch `main`

Two separate things live here:

| Path | What it is | Owner |
|---|---|---|
| `index.html`, `about.html`, `work.html`, `contact.html`, `css/`, `js/`, `assets/images/` | The **E.M portfolio** — light editorial minimalism ("The Gallery") | Structure by Antigravity; redesigned by Claude Code |
| `business-templates/` | **Twenty-nine** one-page business websites (no index of their own) | Nine pre-existing; twenty built by Claude Code |

**The E.M site is the only portfolio front door.** Its "Live Sites" section on `index.html`
and `work.html` indexes all twenty-nine templates with search, sector filtering and sorting,
reusing the screenshots in `business-templates/assets/previews/`. The separate gallery page
that used to live at `business-templates/index.html` was **deleted at the owner's request** —
do not recreate it.

**All twenty of the owner's brand-kit sites are now built.** The two supplied briefs
covered twenty brands; every one of them has a site, a logo in `assets/logos/`, a preview
in `assets/previews/`, and a card on both `index.html` and `work.html`. Nothing from those
briefs is outstanding.

Every template has had a quality pass: no sideways scroll from 320px up, every element
passes WCAG AA contrast (headings included), no heading skips, no unlabelled form fields,
and a 10.24px type floor. Their design languages stay deliberately different from each
other — the passes raised craft inside each idiom, they did not unify them.

**Still placeholder on the E.M site:** the contact form posts nowhere, and **the portraits
in `assets/images/` are stock photographs of a person who is not the owner**, used in three
places. The email and the GitHub link are real. **The portrait is now the only thing
standing between this site and being publishable.**

**There are now THIRTY templates.** `cadence.html` (2026-08-04) is a SaaS product site and a
new idiom here — pricing tiers, a help centre, a launcher dock. Any count of "twenty-nine"
anywhere is stale; if you add a thirty-first, the checkable places are the Live Sites heading,
subtitle and counter on `index.html` and `work.html`, the `data-target` counter on
`index.html`, the CTA banner, a sentence on `about.html`, and both READMEs.

**Every template carries a matched integration mount set** — 9 to 11 per site, listed in a
manifest comment before `</body>` in each file. Search a file for `INTEGRATION MOUNTS`. Sets
differ by sector on purpose; do not "helpfully" level them up to twenty everywhere.

**Every template carries an integration panel** — a slide-out hosting a third-party booking
(20 sites), ordering (5) or donation (4) embed. The slot ships **empty and marked `REPLACE`**;
no third-party code is in this repo. `cadence.html` is the exception: it carries **twenty**
mount points and uses an id-addressed controller rather than the single-panel `.ip` pattern,
because it has four overlays. See `business-templates/INTEGRATIONS.md`. The E.M site documents
all of this in its `#integrations` section on `index.html`.

**Open work: none from the briefs.** PRs #1–#11 are all merged. The only work left is the
production pass named above: **a real portrait**, a form endpoint, and — per site, before any
client goes live — the `REPLACE` markers: contact details and the integration embed.

---

## Conventions and gotchas

Things that are easy to get wrong here:

1. **The two projects are independent. Don't let one overwrite the other.**
   The E.M site owns the repo root. The templates own `business-templates/`. This has
   already caused one real collision (see 2026-08-01 entry) — a gallery page was
   originally written to root `index.html` and would have destroyed the E.M homepage.

2. **`business-templates/` is self-contained by design.**
   Every path inside each site is relative to that folder, so the directory can be moved or
   served on its own. Keep it that way — don't introduce paths that reach *up* to the repo
   root. The E.M site reaching *down* into the folder is fine and expected.

3. **The Live Sites card images are real screenshots, not live renders.**
   `business-templates/assets/previews/*.jpg` are captures of the sites. **If you edit a
   template's hero, its card image goes stale and must be recaptured.** Settings
   are in `business-templates/README.md`: Playwright + Chromium, 1440x900 viewport,
   `deviceScaleFactor: 1.5`, clip `{x:0, y:0, width:1440, height:900}`, JPEG quality 76.
   Keep the 16:10 crop — the card CSS assumes it.

4. **The label/value ledger trap — hit in FOUR of the nine templates.**
   `grid-template-columns:7.5rem 1fr` looks fine until an email address lands in the
   second track: `1fr` carries `min-width:auto`, so the track cannot shrink below its
   content and the whole page grows. This caused up to 81px of sideways scroll at 320px.
   **Always write `minmax(0,1fr)`**, add `overflow-wrap:anywhere` to the value, and stack
   the pair under ~400px.

5. **Testing for sideways scroll: measure, don't infer.**
   - `overflow-x:hidden` on `body` does **not** stop the page scrolling while `html` still
     scrolls. Scroll the window and read `window.scrollX`.
   - Comparing `scrollWidth` to `clientWidth` gives false positives for anything inside an
     `overflow-x:auto` scroller.
   - Raising a type floor can *create* overflow — a bigger wordmark tagline is what pushed
     vitality-gym's header from 22px of overflow to 57px.

6. **Contrast sweeps must sample headings, not just body text.**
   The worst defect in the whole pass was a heading: hydro-flow's booking form is a white
   card inside an `.on-dark` section, and `.on-dark h3{color:#fff}` rendered "Request a
   booking" white on white at 1.00:1. A body-text-only sweep missed it entirely.

7. **A trigger that only lives in the nav is invisible on a phone.** Most of these sites
   set `display:none` on the primary `<nav>` below their breakpoint, and two park it
   off-canvas where it still reports a bounding box. A nav-only CTA was unreachable on
   **17 of 29** sites at 390px and nobody noticed until the sweep ran at that width.
   Anything that must be reachable everywhere goes in the hero.

8. **Before adding a CTA, check the site does not already have that button.** Twelve
   headers ended up reading "Donate  Donate" and "Start a box  Start a box". Wiring the
   site's own button beats adding a second one beside it. A passing test suite will not
   tell you this — **open the screenshot.**

9. **A button inside a nav inherits the nav's link colour.** Hit twice —
   flowmaster and future-scholars. `.nav a{color:...}` is specificity 0,1,1 and beats
   `.btn--gold{color:#fff}` at 0,1,0, so the button renders the nav's text colour on the
   button's background. Scope the button rule (`.nav a.btn--gold`) or raise its
   specificity. Same family as `.hero p` beating `.card-ft`.

10. **Moving a heading level means moving its CSS selector.** Several templates styled
   footer headings with `.ft h4`. Changing the markup to `h3` without changing the
   selector silently strips the styling.

11. **Two CSS traps already hit and fixed in the gallery — don't reintroduce them.**
   - An `<img>` with `width`/`height` HTML attributes needs `height:auto` in CSS, or the
     `height` presentational hint wins and `aspect-ratio` is ignored. This silently
     scaled the previews to ~2.5x.
   - A percentage `max-height` needs a definite containing height to resolve against.
     Without one it is ignored, which made ten logo plates render at ten heights.

12. **Every business template carries `<!-- REPLACE -->` placeholders** — phone numbers,
   emails and addresses are invented and the forms post nowhere. Replace them before any
   of these are published as a real business site.

13. **The E.M site's `js/enhancements.js` is nearly empty on purpose.** All four pages
   `<script src>` it, so deleting the file would 404 on every page load. New behaviour
   belongs in `js/main.js`.

14. **Nothing on the E.M site may claim something that is not true.** This was the
   owner's explicit instruction — it is their first portfolio and these are their first
   sites. Invented case studies, awards, degrees, skill percentages, client counts and
   price bands have all been deleted. **The standing rule: a number that cannot be
   verified by clicking does not belong on the page.** Two `<!-- REPLACE -->` markers
   remain — the social links and the form endpoint — plus the stock-photo portraits in
   `assets/images/`, which are of a person who is not the owner. **The site should not go
   public until the portrait is real.**

15. **Nothing here has a build step.** Hand-written HTML/CSS/vanilla JS across both
   projects. Google Fonts is the only external request. Don't add a bundler or framework
   without the owner asking.

16. **Claude Code runs in a temporary cloud container**, not on the owner's machine. Its
   working directory is not visible to Antigravity and is wiped after the session. Only
   what is **committed and pushed** crosses between agents. Git is the handoff medium.

---

## Session log

### 2026-08-01 — Claude Code — build the template gallery

**What the owner asked (verbatim):**

> "I want you to continue building the pro-folio and include the html files for the websites"

> "open a PR for this, also give me the port link so I can view it"

> "Is everything commuted?"

> "Where are these saved I want to use my antigravity that's in my code space to interact with these files but it can't find it"

> "I got a question so everything your doing in here basically doesn't actually affect my GitHub repos, cause if it did I should be able to use my antigravity and this together even if their separate cause once the files are committed I just can go on to the other one right?"

> "This what I want you to start doing create a log of what you did so my antigravity can view it and use it to assist when making decisions and make sure you put what I said so it know"

**Direct answers given, recorded because they set expectations going forward:**

- Yes, work done in Claude Code does reach GitHub. Commits and pushes are real; only the
  container's scratch filesystem is ephemeral. The owner's model was correct — commit,
  push, then continue in the other tool.
- The reason Antigravity "couldn't find" the files was that they were on a branch, while
  the codespace was on `main`.

**What was built:**

A gallery page for the nine business templates, now at `business-templates/index.html`:

- Nine cards, one per template, each with a screenshot in a browser-chrome frame, the
  project's own accent colour, its layout concept, and a link to the HTML file
- Sector filter chips (trades / professional / hospitality / health / arts) with a live
  count, written in vanilla JS
- Hero with stat strip, name marquee, an approach section, a brand-marks grid, contact block
- `business-templates/assets/previews/` — nine 1440x900 screenshots captured with Playwright
- `business-templates/assets/logos/` — ten brand marks, unzipped from `logos-batch-2.zip`
- `business-templates/README.md` — structure, viewing, how to regenerate previews

**Decisions and why:**

- *Near-black ground with per-card accent colours.* The nine templates are visually loud
  and clash with each other. A quiet shell lets each screenshot read as itself; each card
  borrows its own site's accent rather than the page imposing one.
- *Screenshots committed rather than live `<iframe>` embeds.* Nine iframes would be slow,
  would fight the page's own scroll, and would render inconsistently. The trade-off is
  staleness — see gotcha 3.
- *Three of the ten logos link to sites; seven are labelled "mark only."* Only three marks
  have matching templates. Labelling the rest honestly avoids implying work that doesn't
  exist.
- *Gallery placed inside `business-templates/` rather than at the repo root.* Decided with
  the owner after the collision (below). A useful side effect: sitting beside the nine
  sites means every card link and image path resolves unchanged, so no path rewriting was
  needed.

**The collision, and how it was resolved:**

This branch was cut when the repo root still held the nine templates. Partway through,
Antigravity pushed two commits to `main` — it added the E.M portfolio site and moved the
templates into `business-templates/`. That left PR #1 conflicting in three ways: its root
`index.html` would have **overwritten the E.M homepage**, its `README.md` would have
replaced the E.M one, and its nine card links pointed at paths that no longer existed.

The owner was asked how to resolve it and chose: put the gallery in
`business-templates/index.html`, and keep the E.M README over the Claude-written one.

Resolved accordingly. `main` was merged into the branch and every conflict settled in the
E.M site's favour. Verified with `git diff --quiet` that `index.html`, `README.md`,
`about.html`, `work.html`, `contact.html`, `css/`, `js/` and `assets/images/` are
**byte-identical to `main`**.

**Verified in a real browser** (Chromium via Playwright), from the final location:

- 9/9 site links and 19/19 images resolve; no broken images, no console errors
- Filters report correct counts (2/2/2/2/1/9) with correct `aria-pressed` state
- No horizontal overflow at 360, 768, 1024, 1440, 1920px
- Reviewed at desktop and 390px mobile
- Motion respects `prefers-reduced-motion`; skip link and visible focus states present

**Deliberately not done:**

- `work.html` does **not** link to the gallery. It belongs to the E.M site and uses a
  different design system (dark/gold); adding a link was offered but not done unasked.
- The placeholder contact details were left in place — there were no real details to use.
- A published preview link was requested. GitHub Pages could not be enabled from the
  session (the API is blocked by its egress policy) and third-party HTML preview hosts
  were unreachable, so a self-contained rendered copy was published for viewing instead
  and the Pages route was handed to the owner as a one-click setting.

### 2026-08-01 (second session) — Antigravity — workspace cleanup and handoff setup

**What the owner asked (verbatim):**

> "check the code and see what websites and otter are in it organized my workspace crewte folder ect this is supose to be a porfolio workspace so find my porfilio websites and if need be combine them also commit everything, i use claude code to make some things aswell and there should be a log somwhere i basically want you clean things up"

> "can you open the port so i can ciew the sites did you find the one that claude made aswell that website has a header called porfolio in the top left"

> "i want you to create you to create a log of what you do so my claude code can view it and use to assist when making decisions and make sure yo put what i said so you know, look for claude md"

**What was done:**

1. **Full workspace audit** — Identified one unified E.M portfolio (4 HTML pages + CSS/JS/images)
   plus 9 business website templates loose at the repo root.
2. **Rewrote `README.md`** — Replaced the bare "# ecude1 / tester" with full project docs:
   tech stack, features list, folder structure, setup instructions.
3. **Created `.gitignore`** — Rules for OS files (.DS_Store, Thumbs.db), editor configs
   (.vscode, .idea), and node_modules.
4. **Organized business templates** — Moved all 9 business HTML files + `logos-batch-2.zip`
   into `business-templates/` folder. (Claude Code later also moved them independently on
   its branch, so both agents converged on the same structure.)
5. **Committed and pushed** two commits:
   - `37f0a90` — Add complete E.M portfolio website with cleanup
   - `15e5aaf` — Organize workspace: move business templates to dedicated folder
6. **Started local dev server** — `npx serve` on port 8080 so the owner could preview.
7. **Searched for the Claude-made portfolio** — Owner described a site with "Portfolio" in
   the top-left header/nav. Could not find it in this repo (all pages use "E.M" as the
   header logo). Only one repo exists on the GitHub account. Informed the owner it may have
   been in a deleted Codespace or on a different account.
8. **Discovered Claude Code's CLAUDE.md and AGENT_LOG.md on remote** — After a push
   conflict, found that Claude Code had already created the handoff system on a branch
   (PR #1). Reset to `origin/main` to adopt Claude Code's structure instead of overwriting it.
9. **Appended this entry** to AGENT_LOG.md per the conventions in CLAUDE.md.

**Decisions and why:**

- *Adopted Claude Code's CLAUDE.md and AGENT_LOG.md rather than replacing them.* Claude
  Code's version has better structure — it separates conventions (CLAUDE.md) from the
  chronological log (AGENT_LOG.md). My initial CLAUDE.md was a monolithic file. After
  discovering the conflict, I aborted the rebase, reset to remote, and appended to the
  existing log instead.
- *Server started on port 8080.* The Codespace port-forwarding panel exposes this to the
  browser. The owner can click the forwarded URL to preview all pages.

**What was verified:**

- All files accounted for after reorganization (`git status` clean)
- Both commits pushed successfully to `origin/main`
- Server running and accessible at `http://localhost:8080`
- Claude Code's gallery at `business-templates/index.html` intact after reset

**Deliberately not done:**

- Did not update social links or contact info — no real details provided by the owner.
- Did not combine any sites — the E.M portfolio is one cohesive site, the business templates
  are separate. There was nothing to merge.
- Did not modify any of Claude Code's work in `business-templates/` — respected the
  convention that the two projects are independent.

---

### 2026-08-01 — Claude Code — redesign the E.M portfolio

**What the owner asked (verbatim):**

> "Now it's time for bussiness i wan to work on the portfolio website now I need my
> website to loook way better use the already template and adjust it I'm going for a
> spacious minimalist e.m website that has limits to all my website like how you made
> before but I want it to look for. High end and professional"

Read as: restyle the existing E.M pages (don't rebuild from scratch) toward spacious
minimalism, and link out to all nine business sites the way the template gallery does.

**Two choices put to the owner, and what they picked:**

- *Light editorial gallery* over refined-dark or a mixed scheme. The site was dark
  luxury; "spacious" reads better on a light ground, and this was the biggest jump in
  perceived quality. It is a rebrand from dark to light, which is why it was asked.
- *Fix contradictions, keep placeholders, mark them* over stripping invented claims
  or restyling only.

**Correction on record:** the stats were flagged as contradictory ("7 years" in the bio
vs "2+ years" in the counter). That was wrong — the markup says `data-target="7"` and
the screenshot had simply caught the count-up mid-animation. No contradiction existed
and none was "fixed". The genuine content problems are the stock-photo portraits, the
invented testimonials and case studies, and a "$8M+ in client revenue" claim.

**What changed:**

- `css/style.css` — replaced wholesale with a new system. Warm pale-grey ground
  (`#F2F0EB`), warm ink type (`#1A1814`), one deep desaturated brass accent (`#8A6E3B`)
  restricted to hairlines and micro-labels. Newsreader for display, Hanken Grotesk for
  everything else. Roughly double the vertical rhythm. No shadows, gradients,
  glassmorphism or border-radius anywhere.
- `css/enhancements.css` — reduced to a single reveal gesture plus reduced-motion and
  print rules. The old file was 21KB of effects.
- `js/main.js` — rewritten. Kept nav, reveal, counters, meters, filtering, FAQ, form,
  back-to-top. Removed particle canvas, custom cursor, magnetic buttons, 3D tilt,
  parallax, typed text, page-transition wipe.
- `js/enhancements.js` — now nearly empty. **Kept deliberately**: all four pages
  `<script src>` it, so deleting the file would 404 on every page load.
- All four pages — decorative markup deleted (loader, cursor, noise overlay, particle
  canvas, glow orbs, floating badges, hero background image, scroll progress, page
  transition), font links swapped, `theme-color` updated, footer year corrected to 2026.
- **New "Live Sites" section** on `index.html` and `work.html`: all nine business
  templates with their real screenshots, linking into `business-templates/`.
- `REPLACE` comments added at every placeholder: stat figures, testimonials, the four
  invented case studies, contact details, social links, and the form endpoint.

**Decisions and why:**

- *Kept the existing BEM class names* rather than renaming. The owner asked to adjust
  the template, and reusing the class contract meant the redesign landed mostly through
  CSS, with HTML edits limited to deleting ornament and adding one section.
- *Retired-ornament rules kept at the bottom of `style.css`.* The decorative markup is
  gone, but the `display:none` rules stay so that if another tool re-adds a glow orb or
  a cursor node, it cannot reappear visually. `js/enhancements.js` also marks any such
  node `aria-hidden`.
- *The dark ground survives as punctuation*, not as the brand — the About, Work,
  Testimonials and CTA sections sit on ink so the light sections read as air.
- *The contact form deliberately says "Not connected yet"* instead of faking a success
  message. It posts nowhere; claiming otherwise would lose real enquiries silently.

**Two CSS bugs found and fixed during review** (both now in the gotchas above):

- `.contact__detail` was a two-column grid whose first child (`.contact__detail-icon`)
  is `display:none`. A `display:none` element is not a grid item, so the text dropped
  into the narrow 9rem track and the email address wrapped to three lines. Changed to
  block layout.
- Native `<select>` elements on the contact form arrived with full system chrome
  against an otherwise borderless form. Stripped with `appearance:none` and given a
  drawn caret.

**Verified in a real browser** (Chromium via Playwright), all four pages:

- Both typefaces load; 0 broken images; no console or page errors
- No horizontal overflow at 360, 414, 768, 1024, 1440, 1920px
- Portfolio filter 6 → 2 → 6; FAQ accordion opens (0 → 147px); counters reach
  50+ / 30+ / 7+ when scrolled into view; mobile nav overlay opens
- All local links resolve, including the nine into `business-templates/`

**Deliberately not done:**

- The stock-photo portraits in `assets/images/` were left in place — they are the only
  images available, and removing them would leave empty frames. They are placeholders
  and should be replaced with real photographs of E.M.
- The invented testimonials, case studies and contact details were kept but marked,
  per the owner's choice. **None of this should go public as-is.**
- `business-templates/` was not touched.

---

### 2026-08-01 — Claude Code — merge-timing incident and a new convention

**What the owner asked (verbatim):**

> "I told antigravity to open the port for this website but it opened the old version I'm confused"

> "Yes do that and remember to do that"

**What actually happened:**

PR #1 was merged at 14:21, capturing the branch at commit `a05c876` — the gallery and the
log. The E.M redesign was pushed as `0f7693f` a few minutes **after** that merge. So `main`
received the gallery but not the redesign, and Antigravity's `npx serve` on port 8080 —
serving `main` — correctly showed the old dark site. Nothing was broken. The redesign
simply missed the merge.

**Resolved by:** rebasing the redesign onto current `main` (a merged PR cannot take new
commits) and opening **PR #2**. The rebase hit a conflict in this file, because Antigravity
had appended its own entry in the meantime. Resolved by keeping **both** entries in
chronological order — nothing was discarded. `.gemini/` and `business-templates/` were
verified untouched by `git diff` against `main`, and all four pages were re-rendered after
the rebase to confirm the merge of Antigravity's commits disturbed nothing.

**New convention, added to `CLAUDE.md`:** every Claude Code reply now ends with a single
merge-status line — ready / not ready / nothing to merge. The owner previews from a local
server off `main`, so they need to know when merging is safe without reading the whole
reply. The line also carries a hard-refresh reminder whenever CSS or JS changed, since a
cached stylesheet will keep painting the old design over new files.

**Note for other agents:** if you also work in a tool that ends turns with a summary, the
same habit would help. The failure mode is generic — the owner merges on a signal that is
not synchronised with the push.

---

### 2026-08-01 — Claude Code — business templates: quality pass (pilot)

**What the owner asked (verbatim):**

> "Check the logs then with the information so far begin changering the 9 bussiness template websites"

**Direction agreed before starting.** The nine templates are deliberately nine *different*
design languages, and that variety is the entire pitch of the gallery. Flattening them to
one style would destroy it. Offered four readings; the owner chose **polish each in its own
idiom** — raise the craft inside each design without homogenising them — and **pilot one
site first** before touching the other eight.

**Pilot: `apex-automotive.html`.** Audited rather than restyled by eye. Four real defects
found and fixed, all within the "spec sheet" idiom:

1. **Horizontal scroll at 320–360px (real bug).** `.bk dl div` used
   `grid-template-columns:7.5rem 1fr`; the `1fr` track has `min-width:auto`, so the booking
   email set a floor of 222px. 120 + 16 + 222 = 358px against a 288px content box, pushing
   the page 54px wide. `body{overflow-x:hidden}` did **not** contain it, because `html`
   still scrolls — measured `window.scrollX` reached 54. Fixed with `minmax(0,1fr)`,
   `overflow-wrap:anywhere` on the value, and a stacked layout under 400px.
   Verified: `scrollX` now 0.
2. **Contrast.** `.step .sn` (the 41.6px stage numeral) sat at **1.74:1** — far below the
   3:1 large-text floor. Moved off `--steel-2` to `#6A6A78`. Still recessive, now visible.
3. **Sub-legible type.** The wordmark's second line rendered at **8px**. Raised it, then set
   a floor of `.64rem` (10.24px) across the micro-labels. The tracked-mono character of the
   design is unchanged.
4. **Heading order.** Footer column headings were `h4` directly after section `h2`, skipping
   a level. Changed to `h3` — and the CSS rule was `.ft h4`, so that selector had to move
   with it or the footer would have silently lost its styling.

**Preview recaptured** per gotcha 3 — `assets/previews/apex-automotive.jpg` was rebuilt at
the documented settings, since it appears both in the gallery and in the E.M site's "Live
Sites" section.

**Verified:** no overflow at 320/360/414/768/1024/1440/1920; `scrollX` 0 at 320; no low
contrast; no heading skips; all type ≥10.24px; no console errors; desktop rendering
unchanged.

**A note for the audit of the remaining eight:** `overflow-x:hidden` on `body` alone is not
a guard against sideways scroll. Test by scrolling and reading `window.scrollX` — comparing
`scrollWidth` to `clientWidth` also produces false positives for anything inside an
`overflow-x:auto` scroller.

**Not done yet:** the other eight templates. Awaiting the owner's sign-off on this approach.

---

### 2026-08-01 — Claude Code — business templates: quality pass (remaining eight)

**What the owner asked (verbatim):**

> "do the other 8 now"

Approach approved, so the same audit-then-fix method was applied to the remaining eight.
All nine now pass the same bar. **No design was homogenised** — a contact sheet of all
nine confirms they still read as nine different languages.

**Defects found and fixed:**

- **The same grid trap recurred in three more sites.** `grid-template-columns:7.5rem 1fr`
  with a `1fr` track whose `min-width:auto` was pinned by an email address — hydro-flow
  (81px of sideways scroll at 320), lex-associates (44px), nexa. Identical fix each time:
  `minmax(0,1fr)`, `overflow-wrap:anywhere`, stacked under 400px. **If you write a
  label/value ledger in a new template, use `minmax(0,1fr)` from the start.**
- **nexa** — `.metrics-g` had two fixed tracks that could not compress; added
  `minmax(0,1fr)` and `min-width:0`, and lowered the metric value's clamp floor.
- **vitality-gym** — the sticky header overflowed at 320. Note the ordering trap: raising
  the type floor *made this worse* (22px → 57px) because the wordmark tagline grew. Fixed
  by letting the lockup shrink and dropping the tagline under 430px.
- **hydro-flow — an invisible heading.** The booking form is a white card inside an
  `.on-dark` section, and `.on-dark h3{color:#fff}` won. "Request a booking" was rendering
  **white on white**, 1.00:1. Found only because the second contrast sweep included
  headings; the first sweep sampled text elements only.
- **serene-spaces** — footer column headings used `--lav-txt`, a *dark* lavender intended
  for light grounds, on the plum footer: 2.32:1. Switched to `--lav-lt`. The hero italic
  sat at 2.89:1, just under the 3:1 large-text floor, and was darkened a shade.
- **apex-automotive** — the price unit sat at 2.95:1; moved to `--red-lt`.
- **Heading order** — `h4` after `h2` in artisans-atelier and serene-spaces. As with apex,
  the CSS selector had to move with the markup or the styling would silently vanish.
- **Type floor** of 10.24px applied across all nine; the smallest was 8px.

**Verified across all nine:** no sideways scroll at 320/360/414/768/1024/1920 (measured by
scrolling and reading `window.scrollX`, not by comparing `scrollWidth`); every element
passes WCAG AA contrast including headings; no heading skips; no missing alt text or form
labels; no console errors. All nine previews recaptured.

**Method notes for whoever audits next:**

- `overflow-x:hidden` on `body` does **not** prevent sideways scroll while `html` still
  scrolls. Test it, don't infer it.
- Comparing `scrollWidth` to `clientWidth` gives false positives for anything inside an
  `overflow-x:auto` scroller.
- Sample **headings** in contrast sweeps. The worst defect found in this pass — invisible
  white-on-white text — was invisible to a sweep that only looked at body text.

**Deliberately not done:** no content changes. Placeholder phone numbers, emails and
addresses are untouched, and the forms still post nowhere. That is a separate production
pass the owner has not asked for yet.

---

### 2026-08-01 — Claude Code — new brand sites, and E.M becomes the only front door

**What the owner asked (verbatim):**

> "Create these websites using the logos and the text as descriptions of them, add them to my portfolio website then, add a way to sort and search website types on my portfolio page"

> "continue"

> "before  you finish I need you to remove the old index.html and add the new one that's like e.m, I'm saying remove portfolio, index.html and keep e.m and make that the main not protfolio"

The owner supplied two brand-kit briefs (20 brands) and two contact sheets of logo assets.

**Done:**

- **All 20 logos extracted** from the sheets into `assets/logos/`. Worth knowing: a
  Playwright page built with `setContent` cannot load `file://` subresources, so the first
  run produced twenty blank white PNGs and reported success. Re-cropped from a real
  file-origin page. **Always open one output rather than trusting the run.**
- **Three sites built** to their briefs: `flowmaster-plumbing` ("The Service Call"),
  `climatecontrol-hvac` ("The Thermostat"), `pristine-polish` ("The Studio").
- **`business-templates/index.html` deleted.** The owner wanted one portfolio, not two, and
  that page's wordmark literally read "Portfolio". The E.M site is now the sole front door.
- **Live Sites rebuilt** on `index.html` and `work.html`: twelve cards, plus **search,
  sector filter and A–Z / Z–A sort**, with a live count and an empty state that offers to
  clear the filters. Search matches name, sector *and* the description line — typing
  "calendar" finds Root & Bloom.

**Defects caught while building the three sites** (all fixed, all found by audit rather
than by eye):

- `.hero p` beat `.card-ft` on specificity in flowmaster, painting the card footer
  hero-blue on near-white at **1.39:1**. A textbook cascade collision.
- HVAC's hero service blocks were `h3` straight after `h1`.
- Pristine's `--chrome-3` sat at 3.60:1 on navy and 3.18:1 on the form panel.

**Verified:** all three sites and both E.M pages — no sideways scroll 320–1920, every
element passes AA contrast, no heading skips, no unlabelled fields, no console errors.
Search/filter/sort exercised end to end (12 → 5 on trades, 0 with empty state on a
contradictory combination, correct A–Z and Z–A order, all twelve links resolving).

**Scope, stated plainly:** the owner asked for **twenty** sites. **Three** are built.
Each takes roughly a full session at this quality, including its audit-and-fix cycle.
Three options were put to the owner — continue at depth, build lighter, or pick the best
six to eight and mark the rest logo-only — and no choice has been made yet, so the default
has been to continue at full depth.

**Not done:** the remaining 17 sites.

---

### 2026-08-02 — Claude Code — freelance repositioning; real work replaces invented case studies

**What the owner asked (verbatim, via Antigravity then handed to Claude Code):**

> "now charged the fetured works area and put my acutal work also im a freelancer so change my website to fit this bill"

> "are these added and completely"

> "continue from where Gemini left off"

**Answer to "are these added and completely":** 23 of 23 built sites are wired into the
portfolio — 23 files, 23 cards on both `index.html` and `work.html`, 23 previews, all links
resolving, no broken images. **6 of the owner's 20 brand-kit sites are still not built:**
oasis-wellness, nova-creative, urban-harvest, atlas-travel, artisan-breads,
momentum-fitness.

**A bug of mine that Antigravity found and fixed (commit `93c7f71`).** When the maximalist
markup was regex-stripped during the redesign, the page-loader pattern matched only part of
its block, leaving orphan `loader-*` divs and two stray `</div>` immediately after `<body>`.
My verification checked rendering, contrast, overflow and links — **none of which catch
unbalanced tags, because browsers silently repair them.** Now checking `<div>`/`</div>` and
`<section>`/`</section>` counts after any structural edit. All four E.M pages balance.

**What changed this session:**

- **Featured Work now shows real, open sites.** The four invented case studies (Aeterna,
  Zenith Finance, Aurélia Vance, Aurora Analytics) are gone, replaced by four genuine
  builds — hydro-flow, lex-associates, serene-spaces, summit-construction — each linking
  through to the live page. Picked because each solves a different problem in a different
  language.
- **Hero repositioned for freelance:** "One-page sites for real businesses", with the
  freelance promise made explicit — one person from first email to handover.
- **Experience timeline replaced by "How it works"** — four stages of a freelance
  engagement (conversation, fixed quote, build in the open, handover you own) instead of
  an invented employment history at invented companies.
- **Testimonials section deleted, not rewritten.** The three quotes there were invented.
  A freelancer quoting fake clients is a liability. A comment in the markup says to add
  real ones, with permission, when they exist.
- Title and meta description rewritten to say freelancer.

**Still placeholder:** the portraits in `assets/images/` are stock photos, contact details
are invented, and the contact form posts nowhere. **The site still should not go public
until those are real** — that is now the only thing standing between this and a usable
freelance site.

**Coordination note:** Antigravity had subagents mid-edit on `index.html` when this was
handed over. This work is on a branch, not `main`, so it lands as a PR rather than
colliding. If Antigravity later pushes its own version of the featured-work section,
whoever merges second must reconcile rather than overwrite.


---

### 2026-08-02 — Claude Code — the last six brand-kit sites; the set is now complete

**What the owner asked (verbatim):**

> "finish the 6 sites"

That is the six brand-kit sites that were still unbuilt after the previous session:
oasis-wellness, nova-creative, urban-harvest, atlas-travel, artisan-breads,
momentum-fitness. All six are built. **The twenty-brand brief is now finished — there is
no remaining backlog from the kits.**

**The six, each in its own idiom** (the house rule is that no two templates share a design
language, so each got its own structural argument rather than a recoloured shell):

| Site | Idiom | The argument |
|---|---|---|
| `oasis-wellness.html` | *The Still Room* | Nothing has a hard edge. A treatment list priced by the hour, thermal suite in every booking. |
| `nova-creative.html` | *The Colour Wheel* | Dark page where the colour **is** the content — each work tile carries its own gradient, filterable by discipline in vanilla JS. |
| `urban-harvest.html` | *The Chalkboard* | Structured like the board outside a stall: what is good this week, which day the stall is where, what a box costs. |
| `atlas-travel.html` | *The Field Journal* | A departures board — dates, group size, cost and a written "what is *not* included" column, before any adjective. |
| `artisan-breads.html` | *The Bake Sheet* | The page is the sheet pinned above the bench: four timed bakes and what comes out of each. |
| `momentum-fitness.html` | *The Split* | Built on the logo's forward slash. Red is reserved for the next action only; the timetable is the centre of the page. |

Content decisions worth knowing: every one of these leads with **facts a customer needs**
— prices, times, group sizes, what is included — rather than atmosphere. That is
deliberate and consistent with the earlier twenty-three. The taglines come straight from
the owner's contact sheets ("Find your inner calm.", "Creativity reimagined",
"Fresh. Local. Organic.", "Explore the world.", "Baked with love.",
"Power your potential.").

**Defects found by audit and fixed** — none of these were visible by eye:

- **Buttons failing AA on their own brand colour.** Oasis's lotus `#B5647A` gave white
  text **4.14:1** and Nova's magenta `#FF3D9A` gave **3.29:1**. Fixed by splitting the
  brand colour from the *button* colour: the vivid hue still runs the gradients and
  decoration, a darkened variant (`--magenta-btn:#D41A78`, lotus `#964C60`) carries text.
  Worth copying — a brand hue that is legal as a decoration is often illegal behind text.
- **A red diagonal painting over the copy.** momentum-fitness's `.hero::after` stripe is a
  child of `.hero`, so it painted *after* `.hero-in` and cut through the stats row, eating
  the `£` of "£0 joining fee". `position:relative` alone does not decide paint order —
  both pseudo-elements now carry `z-index:0` and the content `z-index:2`. **Caught only by
  opening the screenshot**; every automated check passed.
- Three muted greys under 4.5:1 on their own paper (`#6E6862` on sand, `#67787E` on
  `#F2ECE1`, `#0A8478` on near-white). Darkened at the token, not per-rule.

**A sweep artefact worth recording so the next agent does not chase it.** The contrast
script walks up the tree for a background colour, and `background:linear-gradient(...)`
leaves `background-color` transparent — so white text on a gradient band reports **1.00:1**
against whatever opaque ancestor is behind it. Three of these appeared. The fix is real
rather than cosmetic: gradient elements now declare `background-color` **and**
`background-image`, which both silences the false positive and gives a genuine fallback.
The one remaining flag — Nova's `background-clip:text` headline, which computes to
`color:transparent` by design — was **verified in a screenshot** instead.

- **The same diagonal, still wrong on phones.** With the paint order fixed, the stripe
  passed *behind* the copy — but below 760px the text column spans the full width, so red
  ran behind body paragraphs. The diagonal is a wide-screen device; it is now dropped under
  760px and replaced by a flat gradient. Also found only in a screenshot.

**Also changed:** oasis-wellness's nav was `display:none` below 820px with no hamburger to
replace it, which simply hid the navigation on phones. It now wraps instead.

**The lesson from momentum-fitness, stated once:** every automated check passed on that
hero, twice. Both defects were visible only by opening the image. Keep opening the image.

**Verified across all six:** one `h1` each, no heading skips, no missing `alt`, no
unlabelled fields, no text under 10.24px, **no sideways scroll at 320/360/414/768/1024/1920**
(measured by scrolling and reading `window.scrollX`), every element passing AA including
headings, and no console errors. Six previews captured at the documented settings. Both
E.M pages balance their `<div>`/`<section>`/`<a>` tags — the check added after the orphan-div
bug. Search, sector filter and A–Z/Z–A sort exercised against all twenty-nine cards.

**Deliberately not done:** contact details, addresses and phone numbers in the six new
sites are placeholders marked `<!-- REPLACE -->`, and the forms post nowhere, matching the
other twenty-three. Making those real is a production pass the owner has not asked for.

**Landed as PR #6, merged.** Everything in this entry is on `main`.

> "fix the log"

The "Open work" line above still said the six sites were sitting on a branch after PR #6
had already merged — exactly the kind of stale handoff note that caused confusion once
before. Corrected. **Whoever merges a PR from this repo: update "Open work" in the same
breath**, because it is the first thing the next agent reads and a wrong answer there is
worse than no answer.


---

### 2026-08-02 — Claude Code — removing invented contact details

**What the owner asked (verbatim):**

> "now update the portriate and contact details"

Asked what to use, since none of it can be invented. The owner chose: **leave the portrait
for now** (they will send a photo), **supply a different email** (not yet given), and
**drop the phone number and location entirely**, keeping email as the only contact channel.

**Done — everything that did not depend on the missing email:**

- **Phone and location blocks deleted** from `index.html` and `contact.html`. Email is now
  the only `.contact__detail`.
- **`contact.html`'s map section deleted.** It existed solely to print "New York, NY —
  Available Worldwide" over a placeholder panel; with the location gone it had no content
  left. Its now-unused `.map-container` rule was removed from `css/style.css` too, rather
  than left to rot.
- **The "do you work remotely?" FAQ answer rewritten.** It claimed a home city and a client
  history across Europe, Asia and Australia — all invented. It now says the work is remote
  end to end and asks for your timezone, which is true and just as useful.

**Not done, and why:**

- **The email is still `hello@em-portfolio.com`.** The owner said they would supply a
  different address and has not yet. The `<!-- REPLACE -->` marker above it was narrowed to
  name the email specifically, so it is obvious what is left.
- **The portraits are untouched** — `hero-portrait.jpg` and `about-hero.jpg` are still stock
  photographs of someone who is not the owner, used in four places. At the owner's request
  they stay until a real photo arrives. **This is the single most important thing to fix
  before the site goes public.**
- **The four social links still point at `#`.** No URLs supplied.
- The owner sent their **"em" logotype** (lowercase serif with a connecting swash) as a chat
  attachment. **An attached image cannot be written to disk from a session** — it can be
  viewed but its bytes are not reachable. The file has to be committed to the repo, or
  fetched from a URL, before it can be used. Nothing was approximated or redrawn.

**Noticed but deliberately left alone (out of the scope asked for):**

- `contact.html` has a **pre-existing `h1 > h3` heading skip** — it predates this session's
  changes, confirmed by re-running the check against the previous commit.
- `about.html` still lists **"Parsons School of Design, New York"** as education, and
  `index.html` still claims **50+ projects and 30+ clients**. Both are invented and are the
  same class of problem as the contact details. They were not in the request.


---

### 2026-08-02 — Claude Code — stripping every claim that was not true

**What the owner asked (verbatim):**

> "gix those"

> "I want to be honest and also don't want to provide useless information, this is my first ever website portfolio and those are my first ever websites no lies remove anything that I sent true"

The second message reframed the whole job. A full text audit of all four E.M pages found
invented claims on **every one of them** — not just the two flagged earlier.

**Deleted outright, because nothing true could replace them:**

- **Six invented case studies on `work.html`** — Aeterna, Zenith Finance, Aurélia Vance,
  Aurora Analytics, Aeterna Realty, FitPulse — with stock images and a filter bar. The same
  four fictions had already been removed from `index.html` in an earlier session; **nobody
  checked `work.html`, so they sat there for two more sessions.** When you delete a lie,
  grep the whole repo for it.
- **The awards section on `about.html`.** Awwwards, CSS Design Awards and FWA are real
  organisations with public, searchable winner databases, and two of the three awards cited
  case studies that had already been deleted as fictional. This was the most dangerous
  claim on the site — trivially disprovable by anyone who cared to look.
- **The education section** — an MFA from Parsons and a BSc from Carnegie Mellon.
- **The skill percentage meters** (95% HTML, 88% React, 85% Node…). A percentage next to a
  skill is a number somebody invented; half the rows named technologies that appear nowhere
  in this repo.
- **Seven of eleven "tools"** — React, Next.js, Node, PostgreSQL, Docker, AWS, Photoshop,
  After Effects, Blender. The list is now HTML, CSS, JavaScript, Git, which is what the repo
  actually contains.
- **Invented personal detail** ("photography, studying architecture, sketching in my
  notebook") and an invented client history ("Fortune 500 companies and ambitious
  startups").
- **Six service cards** claiming mobile development, motion design and strategy consulting,
  tagged React Native, Flutter, iOS, GSAP, Framer Motion, Lottie, A/B testing.
- **The stock project images** `project-1..6.jpg` and `hero-bg.jpg`, unreferenced once the
  fake case studies went. ~3.6 MB.

**Rewritten to what is true:**

- **The stats** are now `29 / 1 / 0` — sites you can open, person start to finish,
  frameworks or plugins. Every one is checkable *from the page itself*. That is the rule
  now: **if a number cannot be verified by clicking, it does not belong.**
- **The four service cards** are the four things every site in the portfolio is actually
  made of: one page, hand-written HTML/CSS, readable on a phone, accessible by default.
- **`about.html` skills** became a two-column **"Can do" / "Can't do yet"** list. The second
  column names React, back-end, e-commerce, mobile apps and hosting as things the owner
  cannot do. For a first portfolio this is a stronger sell than a fake 88%, and it prevents
  the worst outcome — winning a job that cannot be delivered.
- **Contact pricing.** The budget dropdown ($5k–$50k+) and the FAQ's "most projects range
  from $5,000 to $50,000+, I offer retainers" are gone. Budget is a free-text field, and the
  FAQ says plainly that no rates are set yet and the first number will be agreed, not
  published.
- **The bio on both pages now states it outright:** first portfolio, first sites, nobody has
  paid for one yet.

**Dead code removed with the markup** — the portfolio filter and skill-meter handlers in
`js/main.js`, and the `.filter-btn`, `.portfolio-item`, `.progress-bar`, `.education-card`,
`.award-card` and `.map-container` rules in `css/style.css`. Deleting a section and leaving
its CSS behind is how a stylesheet rots.

**A correction I owe.** Earlier entries and PR bodies said the E.M pages pass WCAG AA. **They
do not, and never did.** A sweep across all four pages found the design tokens `--muted`
(#78746A) and `--muted-2` (#9A958A) failing on `--paper`: body copy at **4.09:1**, the hero
scroll label and the sites count at **2.62:1**. Verified against the unmodified pages, so
this predates every change in this session — but the earlier claim was wrong and should not
be trusted. It was fixed in the
next commit — see the entry below.

**Also pre-existing, also not fixed:** `about.html` and `contact.html` each have an
`h1 > h3` skip — their first content block opens at `h3` with no `h2`. `work.html`'s skip
went away on its own when the fake case studies were deleted.

**Verified:** all four pages balance their `<div>`/`<section>`/`<a>`/`<form>` tags, one `h1`
each, no empty sections left behind, no sideways scroll at 320/414/768/1280/1920, no console
errors, and no dead CSS or JS selectors pointing at deleted markup. Deleting the fake grid
also removed the two worst contrast failures on the site (a 1.13:1 project title and a
2.01:1 category label).

**Still outstanding:** the email address, the four social links, and the portraits — which
are still stock photographs of a person who is not the owner.


---

### 2026-08-02 — Claude Code — fixing the contrast failures for real

**What the owner asked (verbatim):**

> "fix the contrast"

**Every element sampled across all four E.M pages now passes WCAG AA.** The sweep that
found the failures returns nothing.

**What was actually wrong.** Three design tokens were too light for text on `--paper`:

| Token | Was | Now | On `--paper` |
|---|---|---|---|
| `--muted` | `#78746A` | `#656159` | 4.09 → **5.41** |
| `--muted-2` | `#9A958A` | `#6F6B63` | 2.62 → **4.66** |
| `--brass` | `#8A6E3B` | `#836838` | 4.22 → **4.61** |

**A judgement worth recording.** The obvious move was to make all three safe against the
*darkest* light ground (`--paper-3`), but that collapses them to `#646058`, `#635F58` and
`#745C32` — three near-identical greys with the brass hue gone. The tonal hierarchy is the
design. Since **every** measured failure occurred on `--paper`, the tokens were tuned
against that ground instead: `--muted` at a comfortable 5.41, `--muted-2` at the lightest
legal value it can hold, and `--brass` just clearing the line with its warmth intact. If a
future change puts these on `--paper-2` or `--paper-3`, re-measure — they are not safe there
by construction.

**The dark sections were the harder half.** `--brass` is 3.38:1 on `--ink-ground` and
`--muted` is 2.88:1, so every rule painting them needed a `.section--dark` counterpart
flipping to `--brass-lt` and `--on-ink-2`. Five of those were added, and three more turned
up one at a time as the sweep was re-run — `.about__stat-label`, `.skill-card__tag`, and
`.project-card__tech span`, the last of which is an unclassed `<span>` and only findable by
querying computed styles. **Fix a token, then re-run the sweep until it is silent; do not
assume the first pass caught everything.**

**Two decorative glyphs** were painted `--rule` (`#D6D2C8`) at **1.33:1** — the ◆ separators
in the marquee and the em dash before each skill tag. They are ornament rather than content,
so they now take `--muted-2` and the marquee separators carry `aria-hidden="true"`.

**Tokens are annotated now.** `--muted` and `--muted-2` carry a comment saying they are
pinned by contrast rather than taste, and `--brass` carries one saying it is a light-ground
token that must not be used on ink. The next person to "tidy the palette" needs to know the
values are load-bearing.

**Verified:** the contrast sweep is silent across all four pages at 1280px with reveals
forced visible; no sideways scroll at 320/414/768/1280/1920; one `h1` per page; no console
errors; the design still reads as intended in a screenshot — the greys shifted, the brass
accent did not lose its hue.

**Still not fixed, still flagged:** `about.html` and `contact.html` open their first content
block at `h3` with no `h2` (a 1.3.1 failure). It is two lines to fix and the owner has not
asked. The email, the social links and the stock portraits also remain.


---

### 2026-08-02 — Claude Code — the real email

**What the owner asked (verbatim):**

> "Use elsharuf107s@gmail.com"

`hello@em-portfolio.com` is gone from `index.html` and `contact.html`. **The E.M site's
contact address is now real for the first time.**

Made it an actual `mailto:` link rather than plain text in a `<div>` — it was the only
contact detail left on the page, and a freelance site whose one point of contact cannot be
tapped is a bad joke on a phone. The anchor takes a hairline underline in the house style
and `overflow-wrap:anywhere` so a long address cannot push the layout sideways.

The `<!-- REPLACE -->` marker above it is deleted, because there is nothing left to replace
there.

**Verified:** the rendered `href` is `mailto:elsharuf107s@gmail.com` on both pages at 1280px
and 390px; contrast sweep still silent across all four pages; tags balance; one `h1` each;
no sideways scroll; no console errors.

**Still placeholder:** the four social links, the form endpoint, and the stock portraits.


---

### 2026-08-02 — Claude Code — an asset pipeline the owner can actually use

**What the owner asked (verbatim):**

> "should I generarte more website assets if so what should I make"

> "give me a full universal list of stuff I should gernerate for the websites"

> "what I'm trying to do is gernerate assets then send them to you so you can implement them
> and save them for later"

**The constraint that shapes all of this, stated plainly for the next agent:**
**an image attached in chat cannot be written to disk.** It can be viewed; its bytes are
not reachable. This already cost a round trip when the owner sent their `em` logotype and it
could not be saved. Assets must arrive **committed to the repo, at a fetchable URL, or in a
zip pushed to the repo root.** Say so early rather than accepting a file and failing later.

**Added `business-templates/ASSET-BRIEF.md`** — a paste-ready generation brief with the
handover routes at the top, since that is the part that decides whether anything is usable.
It is written to be handed to *any* tool and reused per client: four variables at the top,
then required assets, sector-dependent assets, style rules, prohibitions and a delivery
tree.

**The prohibitions are the point of the document.** Never generate a photograph of a person
presented as real; never generate a certification, trade body or award badge; never
photograph premises or work that do not exist; never imitate an existing brand. These are
the same failure that put a stock portrait and three fabricated awards on the owner's own
site — except on a client's live site it misleads *their* customers. The rule written down
is: **anything a customer could reasonably treat as evidence must be real, and if it cannot
be real yet the design has to work without it.**

**Five drop-zone folders created** under `business-templates/assets/` — `icons/`,
`social/`, `photos/`, `textures/`, `docs/` — each with a `.gitkeep` naming the brief.

**Measured, not guessed, and recorded in the brief.** Across all twenty-nine templates there
are **40 `<img>` tags and every one is a logo**: no photography anywhere, **0 favicons,
0 `og:image`, 0 reversed logos** for the dark-header sites. Favicons, share cards and
reversed logos are therefore the first batch worth generating — every site lacks all three
and all three are seen before a word is read.

**Advice deliberately given against more sites.** Twenty-nine already answers "can this
person do my sector?". A thirtieth does not. The absence of photography is also **not** a
defect — every template is built to work without it, and adding photos to a layout designed
around their absence usually makes it worse.

**Naming convention fixed** so dropped files can be wired up without asking:
`<site-slug>-<role>.<ext>`, lowercase, hyphens, slug matching the HTML filename.

**Nothing was implemented from it yet** — no assets have been received.


---

### 2026-08-02 — Claude Code — ornaments across all twenty-nine templates

**What the owner asked (verbatim):**

> "Add this too the websites all of them these are generic assets"

Two PNGs were attached — **the first time an upload actually reached disk this session**, at
`/root/.claude/uploads/…`. Worth knowing for next time: uploads made this way *are* readable;
it is images pasted inline in the message that are not.

**What they actually were, and why they could not be used as delivered.** Two contact
sheets, not assets: one flat PNG each holding roughly forty elements — geometric rules,
corner brackets, artisan flourishes, laurels, badge frames, service icons, step chevrons and
empty-state graphics. Two problems:

1. Cropping an element out gives a **~100px raster** that blurs the moment it scales.
2. Everything is in **one fixed navy-and-sage palette**. Dropping that onto Momentum Fitness
   (red/black), Nova Creative (magenta/violet) or Urban Harvest (green/orange) would read as
   bolted on.

Every element is simple geometry, so they were **rebuilt as nineteen SVGs** in
`assets/ornaments/` — total about 6 KB.

**The delivery technique took four attempts, and the first two failed silently.** Tested from
a `file://` origin, because these pages must work with no server:

| Technique | Result |
|---|---|
| `mask-image:url(file.svg)` | **Blank.** Chromium treats `file://` as an opaque origin |
| `mask-image:url("data:image/svg+xml,…")` | **Broken** — painted a solid block |
| `<img src="file.svg">` | Works, colour baked in |
| **inline `<svg>` + `currentColor`** | **Works, inherits the page's colour** |

The first proof sheet came back with **every single cell blank** and would have been easy to
wave through. **Build a proof sheet and look at it before wiring anything into 29 files.**

**Applied to 28 of 29, chosen per idiom** — dotted and dashed rules for the precise sites,
chevron bands for trades and gyms, wave rules for the calm ones, flourishes for the
hospitality sites, sprigs for anything growing, a laurel for the certificate. The whole point
of this set is that no two sites argue the same way, so a uniform ornament would have worked
against it. `roast-revel` was deliberately **left alone** — it already has three
period-appropriate dividers.

**A collision caught before it landed.** The class was going to be `.orn`. `roast-revel`
already defines `.orn` for its own labelled dividers, and appending a second `.orn{…}` rule
would have silently overridden them — later declaration wins. Renamed to `.ornament`
everywhere. **Grep for a class name before introducing it across 29 files.**

**Verified:** all 28 ornaments render at their intended size, each taking its own site's
computed colour (light on dark sites, dark on light ones), all `aria-hidden="true"`. All 29
sites re-audited afterwards — no sideways scroll at 320/360/414/768/1024/1920, AA contrast
throughout, no heading skips, no unlabelled fields, no console errors, tags balanced.

**Previews deliberately not recaptured.** The ornament sits before `</main>`, and its
y-offset was **measured on all 29** as falling below the 1440×900 crop. Checked rather than
assumed, because gotcha 3 says a stale preview is a real defect.

**Not placed anywhere yet:** the corner brackets, badge frames, six icons, step chevron,
empty-state and spinner. They are in the library for when there is a use. **The badge frames
are decoration only** — a shield or star seal beside a claim about certification reads as a
credential, which is the prohibition in `ASSET-BRIEF.md`.


---

### 2026-08-02 — Claude Code — a hidden image, found by looking

**What the owner asked (verbatim):**

> "Isn't to view why the website looks now send me some screenshots"

Captured full-page screenshots of all four E.M pages at 1440px plus the home page at 390px.
**Taking them found a live bug that every automated check had passed over.**

**`about.html`'s only image had been invisible the entire time.** `.image-reveal` starts at
`opacity:0` in `css/enhancements.css` and is only revealed when JS adds `.loaded`. The
handler assumed the class always sat on an `<img>`:

```js
$$('.image-reveal').forEach(img => {
  if (img.complete) img.classList.add('loaded');
  else img.addEventListener('load', …);
});
```

On `about.html` the class is on a wrapper `<div>`. `div.complete` is `undefined`, so the
`else` branch ran and attached a `load` listener **to a div**, which never fires. The
wrapper sat at `opacity:0` forever. `index.html` has no `.image-reveal`, so it was
unaffected — which is why this survived so long.

Now handles both shapes, and **reveals on `error` as well as `load`**: a broken image should
render as a broken image, not silently delete the section around it.

**Why nothing caught it.** The contrast sweep skips images. The overflow check measures
`window.scrollX`. The link checker verified the file *loads* — and it did load, at
`naturalWidth` 531px, perfectly fine, just painted at zero opacity by its parent. **An image
that loads is not the same as an image that is visible.** Check computed opacity on the
ancestor chain, not just `img.complete`.

**A consequence worth stating:** fixing this makes the stock workspace photo *visible* on the
About page, where it previously was not. That is the right outcome for the code and the wrong
outcome for the content — it strengthens rather than weakens the case for replacing the
placeholder photography.


---

### 2026-08-02 — Claude Code — the social links

**What the owner asked (verbatim):**

> "fix the socail links"

Asked which of the four profiles actually exist rather than guessing. Answer: **GitHub only.**

- `github.com/elsharuf107s-ux` wired into `index.html` and `contact.html`, with
  `target="_blank" rel="noopener me"` and an `aria-label` naming the account. `rel="me"`
  because this is an identity link, which is what that value is for.
- **LinkedIn, Dribbble and Twitter deleted.** An icon pointing at `#` looks like a profile
  that exists and is not there — the same class of problem as the invented awards, just
  quieter.
- The `<!-- REPLACE -->` marker is gone; there is nothing left to replace in that block.

**Two things found while in there:**

- **`index.html`'s header and footer logos also pointed at `#`** — the only two dead links
  left on the site. The other three pages link theirs to `index.html`; on `index` itself a
  bare `#` is a no-op that moves focus and appends a stray `#` to the URL. Pointed both at
  `#hero`, which already exists and is what the nav's own Home link uses. **Every in-page
  anchor across all four pages now resolves** — checked by diffing every `href="#…"` against
  every `id="…"`.
- **The social link's tap target was 17×30px.** Below the 24×24 WCAG 2.2 minimum and far
  below a comfortable thumb, on a site whose entire pitch is that it works on a phone. Now
  44×44 via `display:inline-flex` with a fixed box, the 17px glyph centred inside it, and a
  negative margin on the row so the icon stays optically aligned with the text above despite
  the new padding.

**Verified:** both pages render the single icon correctly at 1280px and 390px, `href`
resolving to the real profile, `svg` still `aria-hidden`; zero `href="#"` anywhere on the
site; contrast sweep silent across all four pages; one `h1` each; no sideways scroll; no
console errors.


---

### 2026-08-03 — Claude Code — favicons on all 33 pages

**What the owner asked (verbatim):**

> "now add favicons to all the websites"

**All 29 templates and all 4 E.M pages now carry a favicon.** Before this, 29 of 33 had
none at all and the E.M pages had a `✦` emoji nobody chose.

**Brand colours were measured, not guessed.** A script loaded every template in Chromium and
read the computed `background-color` of its primary action button — the most reliable read on
a site's brand colour — plus the button's text colour and the site's display font. All 29
returned a value. Palette is in the scratchpad as `palettes.json`.

Each favicon is a **rounded tile in the site's own brand colour with its initial in the
button's text colour**: `A` on Apex red, `M` on Momentum red, `S` on Summit yellow. Written
as SVG, embedded as a percent-encoded data URI so there is **no extra request and it works
offline**, matching the no-build-step rule. Source SVGs also live in `assets/icons/`.

**Three things caught by checking rather than assuming:**

1. **The font stack broke the data URI.** `font-family="system-ui,-apple-system,'Segoe UI',
   sans-serif"` — the inner single quotes collided with the attribute quoting and produced
   malformed SVG in all 29 files. Fixed by using quote-free stacks (`system-ui,sans-serif`,
   `Georgia,serif`) and percent-encoding via `urllib.parse.quote` rather than hand-rolled
   replacements. **Stripped all 29 and redid them.**
2. **Two near-white tiles.** `pristine-polish` measured `#F7FAFD` and `apex-outdoor`
   `#E3D9C6` — a white square is invisible on a light browser tab, it has no silhouette.
   Any ground with luminance above 0.6 is now inverted, ground and letter swapped.
3. **My verification was wrong before the favicons were.** The first probe sampled the pixel
   at dead centre and reported 13 "blank tiles" — every one of them a letter with an open
   counter (A, C, D, L, O, U, V). The icons were fine; the test was not. Rewritten to render
   at 16px and count distinct colours. **Check the checker before believing a failure.**

**Apple touch icons are real 180×180 PNGs** — iOS ignores SVG for these. Rendered in
Chromium, opaque, square, no rounded corners because iOS applies its own mask. All 29
verified as 180×180 and **opened as a contact sheet and looked at**, per the blank-PNG
lesson from the logo crops.

**Verified:** every favicon decodes in the browser, fills its tile, and renders a distinct
letter at 16px; every letter/ground pair clears 4.5:1; all four E.M pages still audit clean.

**Contrast note:** the pairs come from real buttons, which already pass AA — but the script
asserts it anyway and would substitute black or white if one ever failed. None did; the
lowest is `urban-harvest` at 4.53:1.

---

## 2026-08-03 — Claude Code — integration panel on all 29 templates, and an Integrations section on the E.M site

**The owner's requests, verbatim:**

> "We need to integrate an advanced booking system into the template. Create a dedicated
> 'Schedule Service' modal or slide-out panel. For now, build a placeholder structure that
> can accept a third-party script embed (like Jobber or Calendly). Ensure the modal is fully
> responsive, accessible, and can be triggered by CTA buttons placed throughout the homepage
> and service pages."

> "and add other integrations needed based on the website types and include what's needed
> into the portfolio page e.m"

### One thing in the brief did not fit the repo, and I said so rather than inventing it

"the homepage and service pages" describes a multi-page site. **These are one-page sites —
there are no separate service pages.** So "throughout the homepage" is the whole of it, and
the triggers went in the hero and the header rather than being spread over pages that do
not exist. Nothing was scaled down; there was simply nowhere else to put them.

I also did not hard-code Jobber or Calendly. The brief said "like" them, and the sites span
three different sectors, so hard-coding one provider into 29 files would have to be undone
28 times. The slot is provider-agnostic and the suggested providers are named in a comment
beside it.

### What each site got

A slide-out `<aside class="ip">` plus backdrop before `</body>`, CSS appended to the site's
own `<style>` block using that site's palette tokens. Bottom sheet under 720px, right-hand
slide-out above. **The embed slot is empty and marked `REPLACE`.** No third-party code is in
this repo and none should be added — the client supplies their own provider on their own
account.

Three kinds, chosen by sector rather than one label everywhere — the second half of the
owner's request:

- **booking / scheduling — 20 sites** (trades, clinics, studios, restaurants, legal, consulting)
- **ordering / subscriptions — 5 sites** (apex-outdoor, artisan-breads, daily-crumb, roast-revel, urban-harvest)
- **donations — 4 sites** (future-scholars, harvest-helpers, pawsitive-haven, riverkeepers)

Full documentation is now in **`business-templates/INTEGRATIONS.md`** — which site is which,
where the two `REPLACE` markers are, and the accessibility contract.

### The trigger placement was wrong first time, and the sweep is what caught it

The first pass appended a button to each site's primary `<nav>`. That looked fine at 1280px.
**At 390px, 17 of the 29 sites had no reachable trigger at all** — the nav is `display:none`
below each site's breakpoint — and two more (`apex-outdoor`, `lex-associates`) rendered it
off-canvas, where it reports a bounding box but cannot be clicked. A feature that is
invisible on a phone is not shipped.

Fixed by moving the trigger into the **hero**, the one region visible at every width:

- **converted in place** (14 sites) where the hero's primary button already *was* the
  integration action — "Book a table", "Order ahead", "Start a box". Adding a second button
  saying the same thing would have been worse than useless.
- **added beside it** (13 sites) where the primary was a browse action — "View our projects",
  "Read the menu".

Both reuse the site's own `<a class="btn ...">` element and classes, so each site's button
styling applies verbatim, and both keep the original `href` — **without JavaScript the button
still jumps to the relevant section instead of doing nothing.**

### Then the screenshots caught what the sweep could not

The automated sweep went 29/29 green while the header on twelve sites read **"Donate  Donate"**
and **"Start a box  Start a box"** — our injected nav button sitting next to the site's own
header CTA meaning exactly the same thing. A passing test says nothing about whether the page
looks stupid. On those twelve the site's own header button is now the trigger and ours is
deleted, along with its now-dead `.ip-cta` rule. Where the header CTA says something genuinely
different — "Request a bid" beside "Request a site visit", "Join us" beside "Donate" — both stay.

`roast-revel` was worse: its centred serif nav could not hold a button at all, and the thing
broke out to `x=0` and hung off the left edge over the rule. Removed; that site relies on its
hero trigger. Two hero near-duplicates went the same way — `zenith-tech` had our "Book a demo"
beside the site's "Request a demo", `atlas-travel` had "Talk to us" beside "Ask a question".

### Accessibility, verified rather than asserted

`modal-all.mjs` drives every site at 1280px and 390px and checks: hidden at rest, opens from a
visible in-viewport trigger, `role=dialog` + `aria-modal`, `aria-labelledby`/`aria-describedby`
resolving to real elements, focus moved inside, panel on screen and large enough, background
scroll-locked, embed slot present, close target ≥24px, Tab trapped over 25 presses, no sideways
scroll while open, Escape closes, focus returned to the trigger, lock released, no page errors.

**29/29 pass.** Also: no sideways scroll at 320/390/768/1280 on any site, all 29 well-formed
under a real `HTMLParser`, and the heroes reviewed as contact sheets at both widths.

### On the E.M site

New `#integrations` section on `index.html`, dark, between Live Sites and How it works. Three
columns — 20 / 5 / 4 — naming the providers each slot is shaped for, plus a closing note. The
Live Sites subtitle on both `index.html` and `work.html` now links into it.

**The honesty rule (now gotcha 14) governed every word of it.** What is true and is claimed: the panel is built, it is
keyboard-operable, it was checked on all 29. What is not claimed: that any booking, payment or
donation service is live, or that there is any arrangement with the companies named. The note
says so outright — *"I have no arrangement with any of those companies and I will not sign you
up to one."* New CSS is token-only; the section audits clean at AA at both widths.

### What I deliberately did not do

- **No provider embedded.** Signing the owner up to Calendly or Stripe is his decision and his
  billing relationship, not something to bury in 29 files.
- **No nav link for `#integrations`.** `#sites` does not have one either; the nav is five items
  and adding a sixth for a supporting section unbalances it.
- **`work.html` did not get the section duplicated**, only a link to it. Two copies of the same
  block drift apart — that is how the six invented case studies survived on `work.html` after
  being deleted from `index.html`.
- **The stock portraits are still there.** Unrelated to this request, still the one thing
  blocking publication.

### Lessons worth carrying

- **A green test suite is not a look at the page.** The sweep passed while a dozen headers read
  "Donate  Donate". Screenshots found it; assertions never would have.
- **Test at the width the customer uses.** Desktop-only verification would have shipped a
  feature that 17 of 29 sites could not open on a phone.
- **When a revert regex matches more than you meant, it deletes real work.** Un-wiring the first
  pass with `re.subn` on the whole anchor destroyed five hero buttons whose attribute order put
  `href` before `class`. Caught by reading `git diff` for deleted lines and restoring each by
  hand — but the honest fix is to check the pattern against the corpus before running it.
- **Playwright hanging is not always Playwright.** Navigation took ~13s per page because the
  Google Fonts stylesheet blocks DCL through the proxy. Routing non-`file:` requests to `abort`
  cut a 12-minute sweep to under two. The sites themselves are fine.

---

## 2026-08-04 — Claude Code — a thirtieth template: `cadence.html`, wired for twenty integrations

**The owner's request, verbatim:**

> "Create a modern business website template with these integrations:
> AI chatbot / website assistant, appointment booking / scheduling, contact form to CRM sync,
> email marketing automation, lead capture popups / exit-intent forms, live chat / customer
> messaging, payment gateway, CRM integration, analytics / tracking, meeting transcription /
> notes, automation platform connector, review / testimonial collection, SMS / text follow-up,
> support ticketing, newsletter signup, calendar sync, lead scoring, visitor identification,
> social media scheduling, and knowledge base / help center.
>
> Use clean section cards, icons, short labels, and a professional SaaS/business style."

### What was built

`business-templates/cadence.html` — a SaaS product site. **A new idiom for this folder:**
nothing among the other twenty-nine is a software product with pricing tiers, a status mock
and a help centre. Warm off-white ground, near-black ink, one saturated indigo, hairline
cards, monospace micro-labels. Deliberately unlike the two existing light business sites
(pure-white corporate) and the greens (organic).

The twenty appear twice: as a **twenty-card grid** with icons and short labels — that is the
"clean section cards" the owner asked for — and again as an indexed comment block at the foot
of the file, next to the code. Each card carries an honest status dot: seven are built and
working on the page, thirteen are a marked endpoint, tag or webhook.

Seven are real, working shells rather than descriptions: four overlays (assistant, booking,
live chat, exit intent), the help-centre search, the review grid, the newsletter and lead
forms. **Every one has an empty `.slot`.** No third-party script is in the file.

### Why it does not use the `.ip` pattern

The other twenty-nine carry one panel and their controller does
`document.querySelector('.ip')`. Cadence has four overlays, so they are addressed by id via
`[data-open="ID"]`, with one extra rule the single-panel sites never needed: **only one
overlay open at a time.** Opening a second closes the first — which is what stops the
assistant and live chat fighting over focus and leaving two scroll locks on the body.
`cadence-a11y.mjs` tests that swap case explicitly. Documented in `INTEGRATIONS.md`.

### Three bugs, all found by measuring rather than looking at the code

1. **`.ov{display:flex}` outranks the UA's `[hidden]{display:none}`.** All four overlays were
   live at rest — parked off-screen by their transform, but still swallowing clicks across the
   bottom of the viewport. Playwright surfaced it as "`<p>` from `<aside hidden id="ov-chat">`
   subtree intercepts pointer events". An explicit `.ov[hidden]{display:none}` fixes it, and
   the rule now carries a comment saying it is load-bearing.

2. **The mobile drawer was `class="draw wrap"`, and `.bar .wrap` is the 72px flex header row.**
   So the drawer became a 72px-tall flex row and shoved its links 160px past the viewport
   edge — `scrollWidth` 553 at a 390 viewport. `overflow-x:hidden` hid it until a Tab keypress
   scrolled the off-screen button into view. This is gotcha 11 (CSS class collision) and
   gotcha 5 (measure, don't infer) at the same time.

3. **`.kb__search input` had `min-width:auto`**, so the flex input kept its intrinsic width and
   pushed its button off screen. `min-width:0` and a wrap.

### Verified

- **All four overlays pass at 1280px and 390px** — dialog semantics, labelled and described,
  focus moved in, Tab trapped over 25 presses, Escape, focus returned, scroll locked and
  released, 44×44 close, no sideways scroll while open, plus the swap case leaving exactly one
  open and clearing cleanly.
- **Clean at 320 / 390 / 768 / 1280 / 1600** — contrast AA, no sideways scroll, no type under
  10.24px, no unlabelled fields, no heading skips, no JS errors, target sizes.
- Well-formed under a real `HTMLParser`. Preview and apple-touch icon generated and **opened
  and looked at**, per the blank-PNG lesson.
- All four E.M pages still clean after the count changes; all 30 previews load.

### A checker that was wrong again

The target-size check flagged eleven 16px-tall anchors as WCAG 2.2 failures. They are not:
two are inline links in a sentence, and all eleven clear the spacing exception with 35–39px
between target centres against a 24px requirement. **The audit script was fixed to apply both
exceptions** rather than the site being changed. That is the third time this has happened —
the favicon probe and the tag-balance grep were the others.

### Repo-wide consequences of a thirtieth site

Twenty-nine became thirty in every checkable place: the Live Sites heading, subtitle and
counter on `index.html` and `work.html`, the "Sites you can open" counter (`data-target`),
the CTA banner, the sentence on `about.html`, and both READMEs. A card was added to the grid
on both pages under `professional`, which now filters to 5.

The E.M `#integrations` section keeps its 20 / 5 / 4 breakdown — those denominators describe
the twenty-nine one-action sites and adding Cadence to "booking" would have been false. The
label now reads "of the 29 one-action sites" and a new paragraph names Cadence as the
exception that carries twenty.

### What I deliberately did not do

- **No provider embedded, no keys, no analytics tag.** Same rule as the other twenty-nine.
- **No consent banner.** Three of the twenty (analytics, lead scoring, visitor identification)
  must not load before consent. Rather than ship a fake banner, the file and `INTEGRATIONS.md`
  both say plainly that one has to be added before those tags go live. **This is the one item
  on the page that is a legal problem rather than a taste one.**
- **No invented testimonials and no real company names.** The review cards say "Placeholder
  review" in the copy itself, and the logo strip is labelled "Placeholder — replace or remove"
  on the page. A logo wall is a claim about who you work for.

---

## 2026-08-04 (2) — Claude Code — matched integration mounts on all 29 remaining templates

**The owner's request, verbatim:**

> "I ment include these updates to all the websites not on one website or should I sell it
> as a speperate service, but I do need the templates to have their respected integrations,"

Two things in one message: a correction (the twenty were meant for all the sites, not only
Cadence) and a real business question.

### The business answer, which decided the shape of the work

**Sell the wiring-up as a service; ship the empty mounts for free.** Those are not in
tension. An empty documented mount costs nothing and makes the sale easy — the site is
already built for it. The chargeable work is the part with real cost: an account per
provider, keys, configuration, testing, and the support call when a client's booking widget
breaks at 8am. Bundled into a site price, that is eaten forever.

So: mounts in the templates, setup as an add-on. The E.M site was **not** given a service or
pricing section — the owner did not answer the question about it, and inventing prices would
break the honesty rule.

### What was actually added, and what deliberately was not

**Most of the twenty are not user interface.** Analytics, CRM sync, lead scoring, visitor
identification, automation, SMS, calendar sync and meeting transcription are a head tag, a
form endpoint or a webhook. Only a handful need markup.

So no chat dock, no review grid and no newsletter block was bolted onto 29 bespoke designs.
That would have wrecked finished work to add features most of these trades will never switch
on — and would have repeated, at scale, the "a passing test says nothing about whether the
page looks stupid" mistake from the panel rollout.

Each of the 29 got:

- a **`<head>` slot** for tracking tags, carrying the consent warning
- its **`<form>` marked** `data-int="crm"` — 21 of 29 have one
- its **email field marked** `data-int="list"` — 14 of 29
- its **quote block marked** as the review render target — 4 of 29
- a **manifest comment** before `</body>` naming that site's own set and where each attaches

**Nothing renders differently.** The changes are HTML comments and two inert data attributes.

### The sets, and why they differ

Core five everywhere — analytics, contact→CRM, messaging, review collection, SMS/email
follow-up — plus the booking/ordering/donation panel already there. Then by sector:

| Sector | Sites | Extras | Total |
|---|---|---|---|
| Trades | 6 | calendar sync, ticketing, payments | 9 |
| Retail & food | 6 | payments, social scheduling, newsletter | 9 |
| Wellness & fitness | 6 | calendar sync, payments, newsletter | 9 |
| Professional / B2B | 7 | lead scoring, visitor ID, meeting notes, automation | 11 |
| Charity | 4 | payments, social scheduling, automation | 9 |

**A bakery does not get lead scoring and a food bank does not get a checkout.** Putting all
twenty everywhere would be padding the owner would have to defend in a sales conversation.

### Verified

- **29/29 pass the `.ip` modal sweep**, cadence passes its own four-overlay harness
- No sideways scroll on any of the 30 at 320/390/768/1280
- All 30 well-formed under a real `HTMLParser`
- Spot-rendered the four sites carrying every marker type: no comment leaked into visible
  text, both data attributes resolve, no JS errors, layout unchanged

### A checker wrong for the fourth time

`modal-all.mjs` reported cadence failing — "not hidden at rest", "no visible trigger". It
looks for `.ip` and `[data-ip-open]`; cadence uses the id-addressed `.ov` controller. The
site was fine; **the harness was pointed at the wrong pattern.** It now skips cadence with a
comment saying where cadence's own harness lives. Favicon probe, tag-balance grep,
target-size check, and now this.

### Open question the owner did not answer

Whether to build an integration-setup service section on the E.M site. Left undone rather
than guessed. If it is wanted later, the honest framing is already written down above: the
slots ship with every site, the wiring-up is the service, and no figures should be invented.
