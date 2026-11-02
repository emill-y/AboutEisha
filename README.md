# eisha yadav — what's in my bag

Personal site built as a "what's in my bag" flat-lay. Each object in the bag opens a panel
(projects, résumé, writing, contact, currently, fun), and a numbered index below the bag lists
everything for quick scanning. React + Vite, React Router, Framer Motion, Tailwind CSS v4.

## Editing

- **Copy**: `src/data/content.js` (all text: projects, résumé, posts, contact).
- **Objects / photos**: `src/data/items.js`. Photos live in `public/bag/`. To swap one, drop in a
  transparent PNG/WebP (1600px+ on the long edge) and update `image` + `ratio`. `desktop` /
  `mobile` set each photo's position on the canvas.
- Every panel has its own URL (`/projects`, `/resume`, `/writing`, `/contact`, `/currently`, `/fun`).
- Keyboard: `1`–`6` open an item, `←`/`→` step through them, `Esc` closes.
- The résumé panel has a print / save-as-PDF button that prints just that panel.

## Develop

```bash
npm install
npm run dev
npm run build   # -> dist/
```

## Deploy

Netlify builds from `netlify.toml` (`npm run build`, publish `dist`, SPA redirect included).
