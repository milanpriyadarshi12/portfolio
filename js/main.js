/* ============================================================
   MILAN PRIYADARSHI - PORTFOLIO MAIN JS
   ============================================================ */

'use strict';

/* ---------- Loading Screen ---------- */
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('hidden');
  }, 1400);
});

/* ---------- Custom Cursor ---------- */
const cursorGlow = document.getElementById('cursorGlow');
if (cursorGlow && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  let mx = 0, my = 0, cx = 0, cy = 0;
  window.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
  });
  (function animateCursor() {
    cx += (mx - cx) * 0.15;
    cy += (my - cy) * 0.15;
    cursorGlow.style.left = cx + 'px';
    cursorGlow.style.top = cy + 'px';
    requestAnimationFrame(animateCursor);
  })();

  document.querySelectorAll('a, button, .skill-card, .project-card, .highlight-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorGlow.style.width = '40px';
      cursorGlow.style.height = '40px';
    });
    el.addEventListener('mouseleave', () => {
      cursorGlow.style.width = '20px';
      cursorGlow.style.height = '20px';
    });
  });
}

/* ---------- Scroll Progress ---------- */
const scrollProgress = document.getElementById('scrollProgress');
function updateScrollProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  if (scrollProgress) scrollProgress.style.width = pct + '%';
}
window.addEventListener('scroll', updateScrollProgress, { passive: true });

/* ---------- Back to Top ---------- */
const backToTop = document.getElementById('backToTop');
function updateBackToTop() {
  if (backToTop) {
    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }
}
window.addEventListener('scroll', updateBackToTop, { passive: true });
if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ---------- Navbar Scroll Effect ---------- */
const navbar = document.getElementById('navbar');
function updateNavbar() {
  if (navbar) {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
}
window.addEventListener('scroll', updateNavbar, { passive: true });

/* ---------- Mobile Hamburger Menu ---------- */
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navOverlay = document.getElementById('navOverlay');

function openMenu() {
  if (!navMenu || !navToggle) return;
  navMenu.classList.add('active');
  navToggle.classList.add('open');
  navToggle.setAttribute('aria-expanded', 'true');
  if (navOverlay) {
    navOverlay.classList.add('active');
  }
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  if (!navMenu || !navToggle) return;
  navMenu.classList.remove('active');
  navToggle.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
  if (navOverlay) {
    navOverlay.classList.remove('active');
  }
  document.body.style.overflow = '';
}

function toggleMenu() {
  if (navMenu && navMenu.classList.contains('active')) {
    closeMenu();
  } else {
    openMenu();
  }
}

if (navToggle) navToggle.addEventListener('click', toggleMenu);
if (navOverlay) navOverlay.addEventListener('click', closeMenu);

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeMenu();
});

// Close on nav link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', closeMenu);
});

/* ---------- Active Nav Link ---------- */
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
  const scrollY = window.scrollY;
  let current = '';

  sections.forEach(sec => {
    const top = sec.offsetTop - 100;
    const height = sec.offsetHeight;
    if (scrollY >= top && scrollY < top + height) {
      current = sec.id;
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });
updateActiveNav();

/* ---------- Smooth Scroll ---------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--navbar-h')) || 68;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ---------- Scroll Reveal Animations ---------- */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger child reveals within groups
      const el = entry.target;
      const delay = el.dataset.delay || 0;
      setTimeout(() => el.classList.add('visible'), delay);
      revealObserver.unobserve(el);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
});

// Add stagger delays to card groups
function addStaggerDelays(selector, baseDelay = 100) {
  document.querySelectorAll(selector).forEach((el, i) => {
    el.dataset.delay = i * baseDelay;
  });
}

addStaggerDelays('.skill-card', 80);
addStaggerDelays('.project-card', 120);
addStaggerDelays('.highlight-card', 80);
addStaggerDelays('.education-card', 100);

document.querySelectorAll('.reveal').forEach(el => {
  revealObserver.observe(el);
});

/* ---------- Typing Animation ---------- */
const typingEl = document.getElementById('typingText');
const phrases = [
  'AI & ML Engineer',
  'Creative Problem Solver',
  'Web Developer',
  'Open Source Contributor',
];
let phraseIdx = 0;
let charIdx = 0;
let isDeleting = false;
let typingTimer = null;

function type() {
  if (!typingEl) return;
  const current = phrases[phraseIdx];

  if (isDeleting) {
    typingEl.textContent = current.slice(0, --charIdx);
    if (charIdx === 0) {
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      typingTimer = setTimeout(type, 400);
      return;
    }
    typingTimer = setTimeout(type, 50);
  } else {
    typingEl.textContent = current.slice(0, ++charIdx);
    if (charIdx === current.length) {
      isDeleting = true;
      typingTimer = setTimeout(type, 2000);
      return;
    }
    typingTimer = setTimeout(type, 80);
  }
}

setTimeout(type, 1600);

/* ---------- Canvas Particles ---------- */
(function initParticles() {
  const canvas = document.getElementById('particlesCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let W = 0, H = 0;
  let particles = [];
  const COUNT = window.innerWidth < 768 ? 30 : 60;

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  function createParticle() {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.4 + 0.1,
    };
  }

  for (let i = 0; i < COUNT; i++) particles.push(createParticle());

  function drawParticles() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = '#00d4ff';
      ctx.shadowBlur = 6;
      ctx.shadowColor = '#00d4ff';
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;
    });

    // Draw connections
    if (window.innerWidth >= 768) {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.save();
            ctx.globalAlpha = (1 - dist / 100) * 0.08;
            ctx.strokeStyle = '#00d4ff';
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
            ctx.restore();
          }
        }
      }
    }

    requestAnimationFrame(drawParticles);
  }

  drawParticles();
})();

/* ---------- EmailJS Contact Form ---------- */
const contactForm = document.getElementById('contactForm');
const successPopup = document.getElementById('successPopup');
const emailJsServiceId = 'service_kb5moih';
const emailJsTemplateId = 'template_o1aziol';
const emailJsPublicKey = 'FJpKhy11-HBxXpI4c';
let emailJsInitialized = false;
let successPopupTimer = null;

function showSuccessPopup() {
  if (!successPopup) return;

  successPopup.setAttribute('aria-hidden', 'false');
  successPopup.classList.add('active');

  if (successPopupTimer) {
    clearTimeout(successPopupTimer);
  }

  successPopupTimer = setTimeout(() => {
    successPopup.classList.remove('active');
    successPopup.setAttribute('aria-hidden', 'true');
  }, 3000);
}

function initEmailJs() {
  if (emailJsInitialized) return true;
  if (!window.emailjs || typeof window.emailjs.init !== 'function') return false;

  try {
    window.emailjs.init(emailJsPublicKey);
    emailJsInitialized = true;
    return true;
  } catch (error) {
    console.warn('EmailJS initialization failed:', error);
    return false;
  }
}

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const message = document.getElementById('contactMessage').value.trim();

    if (!name || !email || !message) return;

    if (initEmailJs() && typeof window.emailjs.sendForm === 'function') {
      window.emailjs.sendForm(emailJsServiceId, emailJsTemplateId, this)
        .then(() => {
          this.reset();
          showSuccessPopup();
        })
        .catch((error) => {
          console.error('EmailJS send failed:', error);
          const subject = encodeURIComponent(`Contact from ${name} via Portfolio`);
          const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
          window.location.href = `mailto:milanpriyadarshi447@gmail.com?subject=${subject}&body=${body}`;
        });
      return;
    }

    const subject = encodeURIComponent(`Contact from ${name} via Portfolio`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    window.location.href = `mailto:milanpriyadarshi447@gmail.com?subject=${subject}&body=${body}`;
  });
}