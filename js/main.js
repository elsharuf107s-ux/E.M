/* ==========================================================================
   E.M — Behaviour
   Navigation, reveal, counters, filtering, forms. No decorative effects:
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

  /* ---------- skill meters ---------------------------------------------- */
  const meters = $$('.progress-bar__fill');
  if (meters.length && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        el.style.width = (el.dataset.width || el.getAttribute('data-value') || '0') + '%';
        io.unobserve(el);
      });
    }, { threshold: 0.4 });
    meters.forEach(el => io.observe(el));
  } else {
    meters.forEach(el => { el.style.width = (el.dataset.width || '0') + '%'; });
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

  /* ---------- portfolio filtering --------------------------------------- */
  const filterBtns = $$('.filter-btn');
  const items = $$('.portfolio-item');
  if (filterBtns.length && items.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter || 'all';
        filterBtns.forEach(b => {
          const on = b === btn;
          b.classList.toggle('active', on);
          b.setAttribute('aria-pressed', String(on));
        });
        items.forEach(item => {
          const show = filter === 'all' || item.dataset.category === filter;
          item.style.display = show ? '' : 'none';
        });
      });
    });
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
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      if (!btn) return;
      // REPLACE: wire this to a real endpoint (Formspree, Netlify Forms, your API).
      // Until then the form only acknowledges locally and sends nothing.
      const original = btn.innerHTML;
      btn.disabled = true;
      btn.textContent = 'Not connected yet';
      setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = original;
      }, 2600);
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

  /* ---------- images fade in as they decode -------------------------------- */
  $$('.image-reveal').forEach(img => {
    if (img.complete) img.classList.add('loaded');
    else img.addEventListener('load', () => img.classList.add('loaded'), { once: true });
  });
});
