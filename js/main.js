/* ==========================================================================
   E.M — Behaviour
   Navigation, reveal, counters, search/sort, forms. No decorative effects:
   the previous build's particle field, custom cursor, magnetic buttons,
   3D tilt and parallax were removed with the design, not merely hidden.
   Every lookup is guarded so each page can carry only the markup it needs.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $  = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  /* ---------- header: hairline appears once you leave the top ---------- */
  const header = $('.header');
  if (header) {
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- mobile navigation ---------------------------------------- */
  const toggle  = $('#nav-toggle');
  const overlay = $('#mobile-overlay');
  if (toggle && overlay) {
    const setOpen = (open) => {
      toggle.classList.toggle('active', open);
      overlay.classList.toggle('active', open);
      toggle.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    };
    toggle.setAttribute('aria-expanded', 'false');
    toggle.addEventListener('click', () => setOpen(!overlay.classList.contains('active')));
    $$('.nav__mobile-link', overlay).forEach(l => l.addEventListener('click', () => setOpen(false)));
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && overlay.classList.contains('active')) setOpen(false);
    });
  }

  /* ---------- in-page anchors ------------------------------------------ */
  $$('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const id = link.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
    });
  });

  /* ---------- reveal on scroll ----------------------------------------- */
  const revealables = $$('.reveal, .reveal-left, .reveal-right');
  if (!('IntersectionObserver' in window) || reduced) {
    revealables.forEach(el => el.classList.add('visible'));
  } else {
    // index children of .stagger containers so CSS can offset them
    $$('.stagger').forEach(group => {
      Array.from(group.children).forEach((child, i) => child.style.setProperty('--i', i));
    });
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    revealables.forEach(el => io.observe(el));
  }

  /* ---------- counters -------------------------------------------------- */
  const counters = $$('.count-up');
  if (counters.length) {
    const run = (el) => {
      const target = parseFloat(el.dataset.target || '0');
      const suffix = el.dataset.suffix || '';
      if (reduced) { el.textContent = target + suffix; return; }
      const duration = 1600;
      const start = performance.now();
      const step = (now) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          run(entry.target);
          io.unobserve(entry.target);
        });
      }, { threshold: 0.5 });
      counters.forEach(el => io.observe(el));
    } else {
      counters.forEach(run);
    }
  }

  /* ---------- marquee: duplicate the track so the loop is seamless ------ */
  const track = $('.marquee__track');
  if (track && track.children.length === 1) {
    track.appendChild(track.firstElementChild.cloneNode(true));
  }

  /* ---------- active nav link on the long page -------------------------- */
  const navLinks = $$('.nav__link[href^="#"]');
  const sections = navLinks
    .map(l => document.querySelector(l.getAttribute('href')))
    .filter(Boolean);
  if (sections.length && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navLinks.forEach(l => {
          l.classList.toggle('active', l.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(s => io.observe(s));
  }

  /* ---------- FAQ accordion ---------------------------------------------- */
  $$('.faq-item').forEach(item => {
    const q = $('.faq-item__question', item);
    const a = $('.faq-item__answer', item);
    if (!q || !a) return;
    q.setAttribute('aria-expanded', 'false');
    q.addEventListener('click', () => {
      const open = item.classList.contains('active');
      $$('.faq-item.active').forEach(other => {
        other.classList.remove('active');
        const oa = $('.faq-item__answer', other);
        const oq = $('.faq-item__question', other);
        if (oa) oa.style.maxHeight = null;
        if (oq) oq.setAttribute('aria-expanded', 'false');
      });
      if (!open) {
        item.classList.add('active');
        a.style.maxHeight = a.scrollHeight + 40 + 'px';
        q.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ---------- contact form ------------------------------------------------ */
  const form = $('#contact-form');
  if (form) {
    /* No backend, and inventing a fake "message sent" would be a lie. So the
       form composes the message and hands it to the visitor's own mail client,
       which does reach a real inbox. The page says so above the button, so
       nobody is surprised when their mail app opens.

       REPLACE: when a real endpoint exists (Formspree, Netlify Forms, your own
       API), set the form's action= and delete this handler. */
    var TO = 'elsharuf107s@gmail.com';
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }

      const val = (n) => {
        const el = form.querySelector('[name="' + n + '"]');
        return el && el.value.trim() ? el.value.trim() : '';
      };
      const lines = [];
      [['Name','name'], ['Email','email'], ['Phone','phone'], ['Company','company'],
       ['Business','trade'], ['Budget','budget'], ['Subject','subject']]
        .forEach(([label, n]) => { const v = val(n); if (v) lines.push(label + ': ' + v); });
      const msg = val('message');
      if (msg) lines.push('', msg);

      const subject = val('subject') || ('Website enquiry' + (val('name') ? ' from ' + val('name') : ''));
      const href = 'mailto:' + TO
        + '?subject=' + encodeURIComponent(subject)
        + '&body=' + encodeURIComponent(lines.join('\n'));
      // an anchor click rather than location.href: some browsers refuse a
      // scripted navigation to an external scheme, and this one always works.
      const a = document.createElement('a');
      a.href = href;
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      a.remove();

      const btn = form.querySelector('button[type="submit"]');
      if (!btn) return;
      const original = btn.innerHTML;
      btn.textContent = 'Opening your email app…';
      setTimeout(() => { btn.innerHTML = original; }, 3200);
    });
  }

  /* ---------- back to top -------------------------------------------------- */
  const toTop = $('#back-to-top');
  if (toTop) {
    const onScroll = () => toTop.classList.toggle('visible', window.scrollY > 700);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    toTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
    });
  }

  /* ---------- live sites: search, filter, sort --------------------------- */
  var grid = $('#sites-grid');
  if (grid) {
    var sites   = $$('.site', grid);
    var order   = sites.slice();                 // authored order = by sector
    var q       = $('#site-q');
    var sortSel = $('#site-sort');
    var chips   = $$('.sites-bar .chip');
    var countEl = $('#site-count');
    var emptyEl = $('#sites-empty');
    var reset   = $('#site-reset');
    var filter  = 'all';

    sites.forEach(function (el) {
      el.dataset.search = (el.dataset.search || el.textContent).toLowerCase();
    });

    function apply() {
      var term = (q && q.value || '').trim().toLowerCase();
      var shown = 0;
      sites.forEach(function (el) {
        var okCat  = filter === 'all' || el.dataset.cat === filter;
        var okTerm = !term || el.dataset.search.indexOf(term) !== -1;
        var show   = okCat && okTerm;
        el.classList.toggle('is-hidden', !show);
        if (show) shown++;
      });
      if (countEl) countEl.textContent = 'Showing ' + shown + ' of ' + sites.length;
      if (emptyEl) emptyEl.classList.toggle('show', shown === 0);
    }

    function resort() {
      var mode = sortSel ? sortSel.value : 'default';
      var list = order.slice();
      if (mode === 'az' || mode === 'za') {
        list.sort(function (a, b) {
          return (a.dataset.name || '').localeCompare(b.dataset.name || '');
        });
        if (mode === 'za') list.reverse();
      }
      list.forEach(function (el) { grid.appendChild(el); });
    }

    if (q) q.addEventListener('input', apply);
    if (sortSel) sortSel.addEventListener('change', resort);
    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        filter = chip.dataset.filter;
        chips.forEach(function (c) {
          c.setAttribute('aria-pressed', String(c === chip));
        });
        apply();
      });
    });
    if (reset) reset.addEventListener('click', function () {
      filter = 'all';
      if (q) q.value = '';
      chips.forEach(function (c) { c.setAttribute('aria-pressed', String(c.dataset.filter === 'all')); });
      apply();
    });
    apply();
  }

  /* ---------- images fade in as they decode --------------------------------
     .image-reveal starts at opacity:0 and only becomes visible once .loaded
     lands, so anything this misses stays invisible forever. It used to assume
     the class was always on the <img> — on about.html it sits on a wrapper
     <div>, whose .complete is undefined, so a 'load' listener was attached to
     a div and never fired. That page's only image was hidden the whole time.
     Handle both shapes, and reveal on error too: a broken image should show a
     broken image, not silently delete the section. */
  $$('.image-reveal').forEach(el => {
    const imgs = el.tagName === 'IMG' ? [el] : $$('img', el);
    if (!imgs.length) { el.classList.add('loaded'); return; }
    let pending = imgs.length;
    const settle = () => { if (--pending <= 0) el.classList.add('loaded'); };
    imgs.forEach(img => {
      if (img.complete) { settle(); return; }
      img.addEventListener('load', settle, { once: true });
      img.addEventListener('error', settle, { once: true });
    });
  });
});
