/* ============================================================
   E.M — Advanced Enhancements JavaScript
   Particle canvas, spotlight, text split, scroll progress,
   FAQ accordion, portfolio filter, back-to-top, cursor trail
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ============================================================
  // 1. PARTICLE CANVAS BACKGROUND
  // ============================================================
  const canvas = document.getElementById('particle-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    const isMobile = window.innerWidth < 768;
    let particles = [];
    let mouseX = -1000;
    let mouseY = -1000;
    const particleCount = isMobile ? 30 : 60;

    function resizeCanvas() {
      const hero = canvas.parentElement;
      canvas.width = hero.offsetWidth;
      canvas.height = hero.offsetHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = -Math.random() * 0.3 - 0.1;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.fadeSpeed = Math.random() * 0.002 + 0.001;
        this.golden = Math.random() > 0.3;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Mouse repulsion
        const dx = this.x - mouseX;
        const dy = this.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const force = (120 - dist) / 120;
          this.x += (dx / dist) * force * 2;
          this.y += (dy / dist) * force * 2;
        }

        // Wrap around
        if (this.x < -10) this.x = canvas.width + 10;
        if (this.x > canvas.width + 10) this.x = -10;
        if (this.y < -10) {
          this.y = canvas.height + 10;
          this.x = Math.random() * canvas.width;
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        if (this.golden) {
          ctx.fillStyle = `rgba(201, 169, 110, ${this.opacity})`;
        } else {
          ctx.fillStyle = `rgba(232, 193, 122, ${this.opacity * 0.6})`;
        }
        ctx.fill();
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Track mouse on hero
    const heroSection = document.getElementById('hero');
    if (heroSection) {
      heroSection.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
      }, { passive: true });

      heroSection.addEventListener('mouseleave', () => {
        mouseX = -1000;
        mouseY = -1000;
      }, { passive: true });
    }

    function drawConnections() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            const opacity = (1 - dist / 120) * 0.15;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(201, 169, 110, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      drawConnections();
      requestAnimationFrame(animateParticles);
    }

    // Start after loader
    setTimeout(animateParticles, 2600);
  }

  // ============================================================
  // 2. MOUSE SPOTLIGHT EFFECT
  // ============================================================
  const spotlightSections = document.querySelectorAll('.spotlight-section');
  spotlightSections.forEach(section => {
    section.addEventListener('mousemove', (e) => {
      const rect = section.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width * 100).toFixed(1);
      const y = ((e.clientY - rect.top) / rect.height * 100).toFixed(1);
      section.style.setProperty('--mouse-x', x + '%');
      section.style.setProperty('--mouse-y', y + '%');
    }, { passive: true });
  });

  // ============================================================
  // 3. TEXT SPLIT ANIMATION
  // ============================================================
  const splitElements = document.querySelectorAll('.split-text');
  splitElements.forEach(el => {
    const text = el.textContent.trim();
    el.textContent = '';
    el.setAttribute('aria-label', text);

    text.split('').forEach((char, i) => {
      const span = document.createElement('span');
      if (char === ' ') {
        span.className = 'char-space';
        span.innerHTML = '&nbsp;';
      } else {
        span.className = 'char';
        span.textContent = char;
        span.style.transitionDelay = `${i * 0.03}s`;
      }
      el.appendChild(span);
    });

    // Observe for viewport entry
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.3 });
      observer.observe(el);
    }
  });

  // ============================================================
  // 4. SCROLL PROGRESS BAR
  // ============================================================
  const scrollProgress = document.getElementById('scroll-progress');
  if (scrollProgress) {
    let progressTicking = false;
    window.addEventListener('scroll', () => {
      if (!progressTicking) {
        requestAnimationFrame(() => {
          const scrollTop = window.scrollY;
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          const progress = (scrollTop / docHeight) * 100;
          scrollProgress.style.width = progress + '%';
          progressTicking = false;
        });
        progressTicking = true;
      }
    }, { passive: true });
  }

  // ============================================================
  // 5. IMAGE REVEAL ON SCROLL
  // ============================================================
  const imageReveals = document.querySelectorAll('.image-reveal');
  if ('IntersectionObserver' in window && imageReveals.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    imageReveals.forEach(el => revealObserver.observe(el));
  }

  // ============================================================
  // 6. FAQ ACCORDION
  // ============================================================
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-item__question');
    if (question) {
      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');

        // Close all others
        faqItems.forEach(other => {
          if (other !== item) other.classList.remove('open');
        });

        // Toggle current
        item.classList.toggle('open', !isOpen);
      });
    }
  });

  // ============================================================
  // 7. PROJECT FILTER
  // ============================================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      portfolioItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.9)';
          item.style.display = '';
          requestAnimationFrame(() => {
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }, 50);
          });
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.9)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 350);
        }
      });
    });
  });

  // ============================================================
  // 8. PROGRESS BAR ANIMATION
  // ============================================================
  const progressBars = document.querySelectorAll('.progress-bar');
  if ('IntersectionObserver' in window && progressBars.length > 0) {
    const progressObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          progressObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    progressBars.forEach(bar => progressObserver.observe(bar));
  }

  // ============================================================
  // 9. ACTIVE NAV LINK (multi-page)
  // ============================================================
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav__link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || 
        (currentPage === '' && href === 'index.html') ||
        (currentPage === 'index.html' && href.startsWith('#'))) {
      // Keep home page links as-is (handled by scroll observer)
    } else if (href === currentPage) {
      link.classList.add('active');
    }
  });

  // ============================================================
  // 10. BACK TO TOP BUTTON
  // ============================================================
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    let bttTicking = false;
    window.addEventListener('scroll', () => {
      if (!bttTicking) {
        requestAnimationFrame(() => {
          if (window.scrollY > 500) {
            backToTop.classList.add('visible');
          } else {
            backToTop.classList.remove('visible');
          }
          bttTicking = false;
        });
        bttTicking = true;
      }
    }, { passive: true });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ============================================================
  // 11. CURSOR TRAIL EFFECT
  // ============================================================
  const isMobileDevice = window.matchMedia('(max-width: 768px)').matches || 'ontouchstart' in window;
  if (!isMobileDevice) {
    let trailThrottle = 0;
    document.addEventListener('mousemove', (e) => {
      const now = Date.now();
      if (now - trailThrottle < 40) return; // throttle to ~25fps
      trailThrottle = now;

      const dot = document.createElement('div');
      dot.className = 'cursor-trail-dot';
      dot.style.left = e.clientX + 'px';
      dot.style.top = e.clientY + 'px';
      document.body.appendChild(dot);

      requestAnimationFrame(() => {
        dot.classList.add('fading');
      });

      setTimeout(() => {
        if (dot.parentNode) dot.parentNode.removeChild(dot);
      }, 350);
    }, { passive: true });
  }

  // ============================================================
  // 12. DYNAMIC YEAR IN FOOTER
  // ============================================================
  const footerText = document.querySelector('.footer__text');
  if (footerText) {
    const currentYear = new Date().getFullYear();
    footerText.textContent = footerText.textContent.replace(/© \d{4}/, `© ${currentYear}`);
  }

  // ============================================================
  // 13. PRELOAD CRITICAL IMAGES
  // ============================================================
  const criticalImages = [
    'assets/images/hero-bg.jpg',
    'assets/images/hero-portrait.jpg'
  ];
  criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });

  // ============================================================
  // 14. SMOOTH PORTFOLIO ITEM TRANSITIONS
  // ============================================================
  portfolioItems.forEach(item => {
    item.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
  });

});
