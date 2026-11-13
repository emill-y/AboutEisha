# eisha yadav — personal site

A personal site that looks and works like VS Code. The workspace folder is **Eisha Yadav**, and each
section of the site is a subfolder:

```
Eisha Yadav/
  projects/    riya.md, brandmap.md, flags_of_the_world.md, mymani.md
  resume/      resume.md, skills.json
  writing/     four short essays
  currently/   currently.yaml
  fun/         hobbies.md, personality_traits.txt
  contact/     contact.json
  playlist.m3u what I'm listening to
  README.md    the quick version (opens first)
```

What works: explorer, open editors, outline, search across files, tabs, breadcrumbs, line numbers,
minimap, Markdown preview, ⌘P quick open, a terminal (`help`, `tldr`, `ls`, `open`, `cat`,
`contact`, `playlist`), a chat panel that answers from the site's content, and a printable résumé
(print icon on `resume.md`). Every file has its own URL, e.g. `/resume/resume.md` (short forms like
`/resume` and `/projects` work too).

## Editing

- All copy: `src/data/content.js`
- Playlist: `src/data/playlist.js`
- How content becomes files: `src/vfs.js`

## Develop

```bash
npm install
npm run dev
npm run build   # -> dist/
```

Netlify builds from `netlify.toml` (`npm run build`, publish `dist`, SPA redirect included).
