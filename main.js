// ── Nav: add glass effect on scroll ──────────────
const nav = document.getElementById('nav');

function handleNavScroll() {
  nav.classList.toggle('is-scrolled', window.scrollY > 60);
}

window.addEventListener('scroll', handleNavScroll, { passive: true });
handleNavScroll();

// ── Mobile nav burger toggle ─────────────────────
const burger = document.querySelector('.nav__burger');
const navLinks = document.querySelector('.nav__links');

if (burger && navLinks) {
  burger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('nav__links--open');
    burger.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('nav__links--open');
      burger.setAttribute('aria-expanded', 'false');
    });
  });
}

// ── Scroll-reveal: fade-in elements on enter ─────
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      // Stagger siblings for a cascading effect
      const siblings = Array.from(
        entry.target.parentElement?.querySelectorAll('.js-reveal') ?? []
      );
      const index = siblings.indexOf(entry.target);
      entry.target.style.transitionDelay = `${index * 80}ms`;
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.12 }
);

document
  .querySelectorAll('.js-reveal')
  .forEach((el) => revealObserver.observe(el));

// ── Stat counters: animate numbers on view ───────
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1200; // ms
  const startTime = performance.now();

  function tick(now) {
    const elapsed = Math.min(now - startTime, duration);
    const progress = elapsed / duration;
    // Ease-out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.5 }
);

document
  .querySelectorAll('.stat__num')
  .forEach((el) => counterObserver.observe(el));

// ── Flavor cards: active selection state ─────────
document.querySelectorAll('.flavor-card').forEach((card) => {
  card.addEventListener('click', () => {
    document
      .querySelectorAll('.flavor-card')
      .forEach((c) => c.classList.remove('flavor-card--active'));
    card.classList.add('flavor-card--active');
  });
});

// ── Button actions: ─────
function preorder(smoothieID){
  if(smoothieID === "reenmachine"){
    console.log("Pre-order triggered")
  }
  console.log("Hmm - I don't know the smoothie: " + smoothieID)
}