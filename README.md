# Lina — Restaurant Website

A premium, animated restaurant website built with React, Tailwind CSS, Vite, Framer Motion, React Router, and Lucide icons.

## Getting started

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

To build for production:

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  components/
    layout/     Navbar, Footer, Layout (page shell)
    ui/         Button, SectionHeading, RatingStars, Ornament — reusable primitives
    sections/   Hero, About, Menu, Gallery, Testimonials, Reservation, Contact
  pages/        Home, MenuPage, AboutPage, ContactPage — routed with React Router
  data/         menu.js, testimonials.js, gallery.js — all content lives here
  hooks/        useActiveSection.js
  App.jsx       route definitions
  main.jsx      entry point
```

## Rebranding for a new client

Everything content-specific is isolated so you can reskin this fast:

1. **Colors & fonts** — edit `tailwind.config.js` (the `colors` and `fontFamily` blocks) and the Google Fonts `<link>` in `index.html`.
2. **Copy & content** — restaurant name and tagline live in `Navbar.jsx`, `Footer.jsx`, and `Hero.jsx`. Menu items, testimonials, and gallery images live entirely in `src/data/`.
3. **Images** — every image is a plain Unsplash URL passed as a prop or constant; swap URLs in the section files or `src/data/gallery.js`.
4. **Logo mark** — currently a Lucide `Waves` icon next to the wordmark in `Navbar.jsx` / `Footer.jsx`.

## Notes

- The reservation form (`components/sections/Reservation.jsx`) is a frontend-only demo: it simulates a submit and shows a confirmation state, but doesn't call any API.
- The map sections are static placeholders — swap in a Google Maps / Mapbox embed if needed.
- Motion respects `prefers-reduced-motion`.
