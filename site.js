/* ============================================================
   Maredin Wealth Advisors — Shared JS
   ============================================================ */

(function () {
  // ── Fade in on load ──
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => document.body.classList.add('ready'), 30);
  });

  // ── Nav scroll shadow ──
  const nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  // ── Active nav link ──
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mob-nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  // ── Reveal on scroll ──
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('on'); });
  }, { threshold: 0.08, rootMargin: '0px 0px -28px 0px' });

  document.querySelectorAll('.rev, .rev-l, .rev-r').forEach(el => io.observe(el));

  // Trigger anything already in view
  setTimeout(() => {
    document.querySelectorAll('.rev, .rev-l, .rev-r').forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('on');
    });
  }, 60);

  // ── Page transitions ──
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href]');
    if (!a) return;
    const href = a.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto:') ||
        href.startsWith('tel:') || href.startsWith('http') ||
        a.target === '_blank') return;
    e.preventDefault();
    document.body.classList.add('fade-out');
    setTimeout(() => { location.href = href; }, 260);
  });

  // ── Mobile nav ──
  window.openMob  = () => document.getElementById('mobNav')?.classList.add('open');
  window.closeMob = () => document.getElementById('mobNav')?.classList.remove('open');

  // ── Smooth scroll for anchor links ──
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (t) {
        e.preventDefault();
        window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - 68, behavior: 'smooth' });
      }
    });
  });
})();
