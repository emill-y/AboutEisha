# eisha yadav — personal site

A multi-page personal site built with React + Vite, React Router, Framer Motion, and Tailwind CSS v4.

## Design

- **Palette**: techy-feminine-minimalist — off-white paper background, near-black ink text, muted dusty rose + soft mint accents (no purple gradients, no warm-cream/terracotta defaults).
- **Type**: Fraunces (editorial display serif) + JetBrains Mono (technical accents, nav, labels) + Inter (body).
- **Signature moment**: the home page is an aerial "desk" view — a cutting-mat grid background with flat-lay SVG objects (laptop, resume paper, book, phone, Smiski figurine, receipt) scattered and lightly rotated, each linking to its page.
- **Nav**: a VS Code–style tab bar across every page, with a custom flower cursor sitewide.

## Getting started

```bash
npm install
npm run dev       # local dev server
npm run build      # production build -> dist/
npm run preview    # preview the production build
```

Requires Node 18+.

## Project structure

```
src/
  components/     TabNav, Cursor, PageTransition
  icons/          hand-drawn SVG "flat lay" desk objects
  data/           placeholder content (projects, blog posts, LinkedIn posts, food spots)
  pages/          one file per route
```

## Content

All copy is realistic placeholder content — swap it out in `src/data/*.js` and directly inside
each page component (Resume.jsx has its own inline content) whenever real content is ready.

## Deploying

### Netlify
1. Push this repo to GitHub.
2. In Netlify: **Add new site → Import an existing project**, pick this repo.
3. Build command: `npm run build`. Publish directory: `dist`.

### Pushing to GitHub (from scratch)
```bash
git init
git add .
git commit -m "initial commit"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```
