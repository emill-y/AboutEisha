// Line icons in the style of VS Code's codicons (24px grid, 1.5 stroke).
const base = {
  width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none',
  stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round',
}

export const Icon = {
  Files: (p) => (
    <svg {...base} {...p}><path d="M14.5 3H8a1.5 1.5 0 0 0-1.5 1.5v13A1.5 1.5 0 0 0 8 19h10a1.5 1.5 0 0 0 1.5-1.5V8z" /><path d="M14.5 3v5h5" /><path d="M6.5 6.5H5A1.5 1.5 0 0 0 3.5 8v12A1.5 1.5 0 0 0 5 21.5h9.5A1.5 1.5 0 0 0 16 20" /></svg>
  ),
  Search: (p) => (
    <svg {...base} {...p}><circle cx="14" cy="10" r="6" /><path d="M9.7 14.3 3.5 20.5" /></svg>
  ),
  Branch: (p) => (
    <svg {...base} {...p}><circle cx="6.5" cy="5.5" r="2" /><circle cx="6.5" cy="18.5" r="2" /><circle cx="17.5" cy="7.5" r="2" /><path d="M6.5 7.5v9" /><path d="M17.5 9.5c0 4-11 2.5-11 7" /></svg>
  ),
  Run: (p) => (
    <svg {...base} {...p}><path d="M7 4.5v15l12-7.5z" /><circle cx="17" cy="17" r="3.2" fill="#181818" /><path d="M17 15.6v1.6M15.6 17h2.8" /></svg>
  ),
  Extensions: (p) => (
    <svg {...base} {...p}><rect x="3.5" y="10.5" width="5" height="5" /><rect x="8.5" y="10.5" width="5" height="5" /><rect x="3.5" y="15.5" width="5" height="5" /><rect x="8.5" y="15.5" width="5" height="5" /><rect x="14.5" y="4" width="5" height="5" transform="rotate(12 17 6.5)" /></svg>
  ),
  Music: (p) => (
    <svg {...base} {...p}><path d="M9 18V5.5l11-2V16" /><circle cx="6.5" cy="18" r="2.5" /><circle cx="17.5" cy="16" r="2.5" /></svg>
  ),
  Chat: (p) => (
    <svg {...base} {...p}><path d="M4 5.5A1.5 1.5 0 0 1 5.5 4h13A1.5 1.5 0 0 1 20 5.5v9a1.5 1.5 0 0 1-1.5 1.5H11l-4.5 4v-4h-1A1.5 1.5 0 0 1 4 14.5z" /><path d="M16.5 1.5l.6 1.4 1.4.6-1.4.6-.6 1.4-.6-1.4-1.4-.6 1.4-.6z" fill="currentColor" stroke="none" /></svg>
  ),
  Account: (p) => (
    <svg {...base} {...p}><circle cx="12" cy="12" r="9" /><circle cx="12" cy="10" r="3" /><path d="M6.2 18.4a6.5 6.5 0 0 1 11.6 0" /></svg>
  ),
  Gear: (p) => (
    <svg {...base} {...p}><circle cx="12" cy="12" r="3" /><path d="M12 2.8v2.4M12 18.8v2.4M2.8 12h2.4M18.8 12h2.4M5.5 5.5l1.7 1.7M16.8 16.8l1.7 1.7M5.5 18.5l1.7-1.7M16.8 7.2l1.7-1.7" /><circle cx="12" cy="12" r="6.6" /></svg>
  ),
  Chevron: (p) => (
    <svg {...base} strokeWidth={1.6} {...p}><path d="M9 6l6 6-6 6" /></svg>
  ),
  Close: (p) => (
    <svg {...base} {...p}><path d="M6 6l12 12M18 6 6 18" /></svg>
  ),
  ArrowLeft: (p) => (
    <svg {...base} {...p}><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
  ),
  ArrowRight: (p) => (
    <svg {...base} {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
  ),
  Split: (p) => (
    <svg {...base} {...p}><rect x="3.5" y="4.5" width="17" height="15" rx="1.5" /><path d="M12 4.5v15" /></svg>
  ),
  Preview: (p) => (
    <svg {...base} {...p}><rect x="3.5" y="4.5" width="17" height="15" rx="1.5" /><path d="M12 4.5v15M14.5 9h3.5M14.5 12h3.5M14.5 15h2" /></svg>
  ),
  Print: (p) => (
    <svg {...base} {...p}><path d="M7 9V3.5h10V9" /><rect x="3.5" y="9" width="17" height="7.5" rx="1.5" /><path d="M7 14h10v6.5H7z" /></svg>
  ),
  More: (p) => (
    <svg {...base} {...p}><circle cx="5.5" cy="12" r=".6" fill="currentColor" /><circle cx="12" cy="12" r=".6" fill="currentColor" /><circle cx="18.5" cy="12" r=".6" fill="currentColor" /></svg>
  ),
  Plus: (p) => (
    <svg {...base} {...p}><path d="M12 5v14M5 12h14" /></svg>
  ),
  Trash: (p) => (
    <svg {...base} {...p}><path d="M4.5 6.5h15M9.5 6.5V4h5v2.5M6.5 6.5l1 13.5h9l1-13.5" /></svg>
  ),
  Maximize: (p) => (
    <svg {...base} {...p}><path d="M5 9V5h4M19 9V5h-4M5 15v4h4M19 15v4h-4" /></svg>
  ),
  Terminal: (p) => (
    <svg {...base} {...p}><rect x="3" y="4.5" width="18" height="15" rx="1.5" /><path d="M7 9.5l3 2.5-3 2.5M12 15h5" /></svg>
  ),
  Sparkle: (p) => (
    <svg {...base} {...p}><path d="M4 7.5A1.5 1.5 0 0 1 5.5 6h9A1.5 1.5 0 0 1 16 7.5V15a1.5 1.5 0 0 1-1.5 1.5H10l-4 3.5v-3.5h-.5A1.5 1.5 0 0 1 4 15z" /><path d="M18.5 2.5l.9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9z" fill="currentColor" stroke="none" /><path d="M20.5 9.5l.45 1.05 1.05.45-1.05.45-.45 1.05-.45-1.05L19 11l1.05-.45z" fill="currentColor" stroke="none" /></svg>
  ),
  Send: (p) => (
    <svg {...base} {...p}><path d="M12 19V5M6 11l6-6 6 6" /></svg>
  ),
  Bell: (p) => (
    <svg {...base} {...p}><path d="M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 1.5h-15z" /><path d="M10 20.5a2 2 0 0 0 4 0" /></svg>
  ),
  Error: (p) => (
    <svg {...base} {...p}><circle cx="12" cy="12" r="8.5" /><path d="M9 9l6 6M15 9l-6 6" /></svg>
  ),
  Warning: (p) => (
    <svg {...base} {...p}><path d="M12 3.5 21 19.5H3z" /><path d="M12 10v4M12 16.8v.2" /></svg>
  ),
  Sync: (p) => (
    <svg {...base} {...p}><path d="M19.5 12a7.5 7.5 0 0 1-13.2 4.8M4.5 12a7.5 7.5 0 0 1 13.2-4.8" /><path d="M18 3.5v4h-4M6 20.5v-4h4" /></svg>
  ),
  Play: (p) => (
    <svg {...base} {...p}><path d="M8 5.5v13l10.5-6.5z" fill="currentColor" /></svg>
  ),
  Layout: (p) => (
    <svg {...base} {...p}><rect x="3.5" y="4.5" width="17" height="15" rx="1.5" /><path d="M9 4.5v15" /></svg>
  ),
  LayoutPanel: (p) => (
    <svg {...base} {...p}><rect x="3.5" y="4.5" width="17" height="15" rx="1.5" /><path d="M3.5 14h17" /></svg>
  ),
  LayoutRight: (p) => (
    <svg {...base} {...p}><rect x="3.5" y="4.5" width="17" height="15" rx="1.5" /><path d="M15 4.5v15" /></svg>
  ),
}

// Seti-style file-type glyphs, like VS Code's default icon theme.
const fileGlyph = {
  md: { g: 'M↓', c: '#519aba' },
  json: { g: '{ }', c: '#cbcb41' },
  yaml: { g: '!', c: '#a074c4' },
  txt: { g: '≡', c: '#9da5b4' },
  m3u: { g: '♫', c: '#e86f9a' },
}

export function FileIcon({ name, className = '' }) {
  const ext = name.split('.').pop()
  const f = fileGlyph[ext] || fileGlyph.txt
  return (
    <span
      aria-hidden="true"
      className={`inline-grid w-4 shrink-0 place-items-center font-bold leading-none ${className}`}
      style={{ color: f.c, fontSize: f.g.length > 1 ? 8.5 : 12, letterSpacing: f.g === '{ }' ? -1 : 0 }}
    >
      {f.g}
    </span>
  )
}
