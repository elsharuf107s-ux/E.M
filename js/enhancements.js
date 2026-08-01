/* ==========================================================================
   E.M — (intentionally almost empty)

   This file used to hold the particle canvas, cursor trail, spotlight
   follow, per-letter text splitting, 3D tilt and page-transition wipe.
   All of it was removed with the redesign — the current design gets its
   character from type and space, and those effects worked against it.

   Everything still in use lives in js/main.js. The file itself stays
   because all four pages reference it; deleting it would 404 on each load.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // Guard against markup left behind by an older build: if a decorative node
  // is ever re-added by another tool, take it out of the accessibility tree
  // as well as hiding it in CSS.
  ['.particle-canvas', '.cursor-dot', '.cursor-outline', '.noise-overlay',
   '.glow-orb', '.page-loader', '.page-transition', '.scroll-progress',
   '.floating-badge', '.hero__bg'].forEach(sel => {
    document.querySelectorAll(sel).forEach(el => el.setAttribute('aria-hidden', 'true'));
  });
});
