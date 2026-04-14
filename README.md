# Prashanna Dhami — Terminal Portfolio

A terminal-style developer portfolio built with vanilla HTML, CSS, and JavaScript.

## Project Structure

```
web-dev-project/
├── index.html          # Main single-page portfolio
├── css/
│   └── style.css       # All styles with CSS variables
├── js/
│   └── script.js       # Theme, clock, form, nav logic
├── images/
│   └── resume.pdf      # Prashanna's resume PDF
└── pages/              # (reserved for future sub-pages)
```

## Features

- **Terminal aesthetic** — monospace font, green accent, dark background
- **Dark/Light mode** — time-based auto-toggle with manual override (persisted in localStorage)
- **Live clocks** — NPL (UTC+5:45) and local time
- **Blinking cursors** on all section headers
- **Hover effects** — card glow lift, button scale, icon brand colors
- **Resume download** — direct PDF download + inline preview
- **Contact form** — client-side with toast notification
- **Mobile responsive** — hamburger nav, stacked layout

## Setup

Open `index.html` directly in a browser — no build step required.

For contact form in production, integrate [Formspree](https://formspree.io) or [EmailJS](https://www.emailjs.com).

## Customization

Update GitHub/LinkedIn URLs in `index.html`.
Resume PDF is at `images/resume.pdf`.
