# Working in this repo

## Always update AGENT_LOG.md

`AGENT_LOG.md` is a shared handoff log for the AI agents working on this repo — Claude
Code, Antigravity, and any others. The owner works across more than one tool, so this file
is how context survives between them.

**At the end of any session where you change something, append an entry.** Include:

- **The owner's requests, quoted verbatim.** Their exact wording is the record of intent —
  do not paraphrase it away.
- What you actually changed, and **why** — especially decisions where a different choice
  was plausible.
- What you verified, and how.
- What you deliberately did *not* do, and why.

Also update the "Current state" and "Conventions and gotchas" sections at the top when
either has changed. Those two sections are what another agent reads before acting.

## Two independent projects share this repo

- The **E.M portfolio** owns the repo root: `index.html`, `about.html`, `work.html`,
  `contact.html`, `css/`, `js/`, `assets/images/`.
- The **business templates** own `business-templates/` — nine one-page sites plus a
  gallery indexing them.

Do not let work on one overwrite the other. This has already caused one real collision;
see the 2026-08-01 entry in `AGENT_LOG.md`.

## House rules

- No build step anywhere. Hand-written HTML, CSS and vanilla JS in both projects. Don't
  introduce a framework or bundler unless the owner asks.
- `business-templates/` is self-contained — all paths inside it are relative to that
  folder. Keep it that way.
- The gallery's card images are committed screenshots, not live renders. Edit a template's
  hero and its preview goes stale; recapture it using the settings in
  `business-templates/README.md`.
