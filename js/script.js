// ===== THEME MANAGEMENT =====
const THEME_KEY = 'portfolio-theme';
const THEME_AUTO = 'auto';

function getAutoTheme() {
  const hour = new Date().getHours();
  return (hour >= 6 && hour < 18) ? 'light' : 'dark';
}

function applyTheme(theme, isAuto = false) {
  const body = document.body;
  const btn = document.getElementById('themeToggle');
  const indicator = document.getElementById('modeIndicator');

  if (theme === 'light') {
    body.classList.add('light-mode');
    if (btn) btn.textContent = '☀️';
  } else {
    body.classList.remove('light-mode');
    if (btn) btn.textContent = '🌙';
  }
  if (indicator) {
    indicator.textContent = isAuto ? 'auto' : 'manual';
  }
}

function initTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  if (!saved || saved === THEME_AUTO) {
    applyTheme(getAutoTheme(), true);
  } else {
    applyTheme(saved, false);
  }
}

function toggleTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  const isLight = document.body.classList.contains('light-mode');
  const newTheme = isLight ? 'dark' : 'light';
  localStorage.setItem(THEME_KEY, newTheme);
  applyTheme(newTheme, false);
}

// ===== CLOCK =====
function updateClocks() {
  const now = new Date();
  const localTimeEl = document.getElementById('localTime');
  const nplTimeEl = document.getElementById('nplTime');

  // Local time
  if (localTimeEl) {
    localTimeEl.textContent = now.toLocaleTimeString('en-US', {
      hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
    });
  }

  // NPL = UTC+5:45
  if (nplTimeEl) {
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const npl = new Date(utc + (5 * 3600000 + 45 * 60000));
    nplTimeEl.textContent = npl.toLocaleTimeString('en-US', {
      hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
    });
  }
}

// ===== CONTACT FORM =====
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('contactName')?.value.trim();
    const email = document.getElementById('contactEmail')?.value.trim();
    const message = document.getElementById('contactMessage')?.value.trim();

    if (!name || !email || !message) {
      showToast('⚠ Please fill all fields');
      return;
    }

    // Simulate send
    const btn = form.querySelector('.btn-send');
    if (btn) {
      btn.textContent = '⟳ Sending...';
      btn.disabled = true;
    }

    setTimeout(() => {
      showToast('✓ Message sent successfully!');
      form.reset();
      if (btn) {
        btn.textContent = '→ Send Message';
        btn.disabled = false;
      }
    }, 1200);
  });
}

// ===== TOAST =====
function showToast(message, duration = 3000) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), duration);
}

// ===== MOBILE NAV =====
function initMobileNav() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.textContent = navLinks.classList.contains('open') ? '✕' : '☰';
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.textContent = '☰';
    });
  });
}

// ===== SMOOTH SCROLL + ACTIVE NAV =====
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(s => observer.observe(s));
}

// ===== RESUME IFRAME =====
function initResumePreview() {
  const preview = document.getElementById('resumePreview');
  if (!preview) return;

  const iframe = document.createElement('iframe');
  iframe.src = 'images/resume.pdf';
  iframe.title = 'Resume Preview';
  preview.innerHTML = '';
  preview.appendChild(iframe);

  iframe.onerror = () => {
    preview.innerHTML = `
      <div class="resume-placeholder">
        <div class="resume-icon">&gt;_</div>
        <div style="text-align:center">
          <div style="color:var(--text-primary);font-size:0.9rem;font-weight:600">Resume Preview</div>
          <div style="font-size:0.8rem;margin-top:4px">PDF Document</div>
        </div>
      </div>`;
  };
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  updateClocks();
  setInterval(updateClocks, 1000);
  setInterval(() => {
    const saved = localStorage.getItem(THEME_KEY);
    if (!saved || saved === THEME_AUTO) applyTheme(getAutoTheme(), true);
  }, 60000);

  initContactForm();
  initMobileNav();
  initScrollSpy();
  initResumePreview();

  // Theme toggle
  document.getElementById('themeToggle')?.addEventListener('click', toggleTheme);
});
