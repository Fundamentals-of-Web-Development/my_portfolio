function handleContact(e) {
  e.preventDefault();
  
  const name = document.getElementById('contactName').value.trim();
  const email = document.getElementById('contactEmail').value.trim();
  const message = document.getElementById('contactMessage').value.trim();

  if (!name || !email || !message) {
    showToast('⚠ Please fill all fields');
    return;
  }

  const btn = e.target;
  const orig = btn.innerHTML;
  btn.innerHTML = '⟳ Sending...';
  btn.disabled = true;

  // Send to Formspree
  const form = event.target.closest('form');
  const formData = new FormData(form);

  fetch('https://formspree.io/f/mzdyzvkv', {
    method: 'POST',
    body: formData
  });

  // Show success message
  setTimeout(() => {
    showToast('✓ Message sent! I\'ll respond soon.');
    document.getElementById('contactName').value = '';
    document.getElementById('contactEmail').value = '';
    document.getElementById('contactMessage').value = '';
    btn.innerHTML = orig;
    btn.disabled = false;
  }, 1200);
}
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
  applyTheme(getAutoTheme(), true);
}

function toggleTheme() {
  const isLight = document.body.classList.contains('light-mode');
  const newTheme = isLight ? 'dark' : 'light';
  applyTheme(newTheme, false);
}

// ===== CLOCK =====
function updateClocks() {
  const now = new Date();
  
  // 1. Format Local Time String
  const localStr = now.toLocaleTimeString('en-US', {
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
  });

  // 2. Format NPL Time (UTC + 5:45)
  // Using Intl.DateTimeFormat is cleaner than manual offset math
  const nplStr = now.toLocaleTimeString('en-US', {
    timeZone: 'Asia/Kathmandu',
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
  });

  // 3. Update all elements (Desktop + Mobile)
  const elements = {
    'localTime': localStr,
    'localTimeMobile': localStr,
    'nplTime': nplStr,
    'nplTimeMobile': nplStr
  };

  for (const [id, value] of Object.entries(elements)) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  }
}

// Initialize the interval
setInterval(updateClocks, 1000);
updateClocks(); // Run immediately on load

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

// ===== IMAGE LOADER =====
function initImageLoader() {
  const img = document.querySelector('.profile-photo');
  const loader = document.querySelector('.image-loader');
  if (!img || !loader) return;

  img.onload = () => {
    loader.style.display = 'none';
  };
  // If already loaded
  if (img.complete) {
    loader.style.display = 'none';
  }
}

// ===== RESUME PREVIEW =====
function initResumePreview() {
  const preview = document.getElementById('resumePreview');
  if (!preview) return;

  const embed = document.createElement('embed');
  embed.src = 'images/resume.pdf';
  embed.type = 'application/pdf';
  embed.width = '100%';
  embed.height = '600';
  embed.style.border = 'none';
  preview.innerHTML = '';
  preview.appendChild(embed);

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
  initImageLoader();
});

// Theme toggle
document.getElementById('themeToggle')?.addEventListener('click', toggleTheme);
document.getElementById('modeIndicator')?.addEventListener('click', toggleTheme);
