# Working in this repo

## End every reply with a merge-status line

The owner works across Claude Code and Antigravity and previews the site from a local
server running off `main`. Once, a PR was merged while work was still in flight: the
merge captured the branch one commit early, `main` kept serving the old design, and the
owner reasonably thought something was broken. That cost a rebase and a second PR.

**So finish every reply with a single line saying whether anything is ready to merge.**
Put it last, after the explanation, separated by a rule. Three forms:

- `**Ready to merge:** PR #N — <one-line description>.` — pushed, verified, safe to merge.
- `**Not ready yet** — still <what remains>. Don't merge PR #N until I say so.`
- `**Nothing to merge** — no code changed this turn.`

Never say "ready to merge" for work that is only partly pushed or not yet verified in a
browser. The point of the line is that the owner can trust it without reading the rest.

Remind them to hard-refresh after merging when CSS or JS changed — a cached stylesheet
will keep painting the old design over the new files.

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
