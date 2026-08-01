# E.M — Creative Designer & Developer Portfolio

A premium dark-themed portfolio website showcasing creative design and full-stack development work. Features a luxury aesthetic with gold accents, glassmorphism, particle effects, 3D card interactions, and smooth scroll-driven animations.

## ✨ Features

- **Dark luxury design** — Deep monochrome surfaces with warm gold (#d4a853) accents
- **Interactive particle canvas** — Mouse-reactive particles with golden connecting vectors
- **3D card tilt effects** — Perspective transforms on hover with glare highlights
- **Custom cursor** — Dual-layer animated cursor with magnetic button attraction
- **Typed text animation** — Rotating titles in the hero section
- **Scroll-driven animations** — Reveal effects, parallax layers, progress bar
- **Category filtering** — Interactive project gallery with animated transitions
- **Contact form** — Validated form with simulated submission
- **FAQ accordion** — Expandable Q&A section
- **Fully responsive** — Optimized for desktop, tablet, and mobile

## 📁 Project Structure

```
ecude1/
├── index.html          # Homepage — hero, featured work, skills, testimonials
├── about.html          # About — bio, skills, tools, education, awards
├── work.html           # Portfolio — filterable project gallery, process
├── contact.html        # Contact — inquiry form, FAQ, location
├── css/
│   ├── style.css       # Core design system, layout, components
│   └── enhancements.css # Advanced effects, animations, polish
├── js/
│   ├── main.js         # Core interactions, form validation, scroll logic
│   └── enhancements.js # Particles, cursor, 3D tilt, page transitions
├── assets/
│   └── images/         # Hero backgrounds, portrait, project thumbnails
└── README.md
```

## 🛠 Tech Stack

- **HTML5** — Semantic markup with Open Graph meta tags
- **CSS3** — Custom properties, glassmorphism (`backdrop-filter`), fluid typography (`clamp()`), CSS Grid & Flexbox
- **Vanilla JavaScript** — Intersection Observer, Canvas API, requestAnimationFrame, custom easing
- **Google Fonts** — Playfair Display, Inter, JetBrains Mono
- **No build tools** — Pure HTML/CSS/JS, open directly in a browser

## 🚀 Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/elsharuf107s-ux/ecude1.git
   cd ecude1
   ```

2. Open `index.html` in your browser, or use a local server:
   ```bash
   # Python
   python -m http.server 8000

   # Node.js
   npx serve .
   ```

3. Visit `http://localhost:8000`

## 📄 Pages

| Page | Description |
|------|-------------|
| **Home** | Hero with particle canvas, featured projects, skill bars, testimonials |
| **About** | Bio, technical proficiency bars, tools arsenal, education, awards |
| **Work** | Filterable portfolio grid (Web, Mobile, Branding, SaaS), process methodology |
| **Contact** | Inquiry form with budget/timeline selectors, FAQ accordion, social links |

## 📝 License

© E.M. All rights reserved.
