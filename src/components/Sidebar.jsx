import { useEffect, useMemo, useRef, useState } from 'react'
import { files, tree, ROOT } from '../vfs'
import { FileIcon, Icon } from './Icons'

export default function Sidebar({ view, ...props }) {
  return (
    <aside
      className={`flex shrink-0 flex-col overflow-hidden border-r border-border bg-chrome ${props.className}`}
      aria-label={view === 'search' ? 'Search' : 'Explorer'}
    >
      {view === 'search' ? <SearchView {...props} /> : <Explorer {...props} />}
    </aside>
  )
}

function Header({ title }) {
  return (
    <div className="flex h-[35px] shrink-0 items-center justify-between pl-5 pr-2 text-[11px] font-normal uppercase tracking-[0.04em] text-fg-dim">
      {title}
      <Icon.More className="h-4 w-4" />
    </div>
  )
}

function Section({ title, open, onToggle, children, bold }) {
  return (
    <div className="border-t border-border first:border-t-0">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex h-[22px] w-full items-center gap-0.5 px-1 text-left text-[11px] font-bold uppercase tracking-[0.02em] text-fg hover:bg-hover"
      >
        <Icon.Chevron className={`h-4 w-4 transition-transform ${open ? 'rotate-90' : ''}`} />
        <span className={bold ? '' : 'font-bold'}>{title}</span>
      </button>
      {open && children}
    </div>
  )
}

function Row({ depth = 0, active, onClick, children, title }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`group flex h-[22px] w-full items-center gap-1.5 pr-2 text-left text-[13px] ${
        active ? 'bg-active-select text-white outline outline-1 -outline-offset-1 outline-accent' : 'text-fg hover:bg-hover'
      }`}
      style={{ paddingLeft: 8 + depth * 12 }}
    >
      {children}
    </button>
  )
}

function Explorer({ tabs, active, openFile, closeTab }) {
  const [open, setOpen] = useState({ editors: true, root: true, outline: true, timeline: false })
  const [expanded, setExpanded] = useState(() => new Set(['projects', 'resume', 'writing', 'currently', 'fun', 'contact']))
  const toggle = (k) => setOpen((o) => ({ ...o, [k]: !o[k] }))

  // reveal the active file's folder
  useEffect(() => {
    if (!active?.includes('/')) return
    const dir = active.split('/')[0]
    setExpanded((s) => (s.has(dir) ? s : new Set([...s, dir])))
  }, [active])

  const outline = useMemo(() => {
    if (!active) return []
    const f = files[active]
    const lines = f.text.split('\n')
    if (f.lang === 'md')
      return lines.flatMap((l, i) => {
        const m = l.match(/^(#{1,3}) (.*)$/)
        return m ? [{ depth: m[1].length - 1, label: m[2].replace(/\*\*/g, ''), line: i + 1 }] : []
      })
    if (f.lang === 'json' || f.lang === 'yaml')
      return lines.flatMap((l, i) => {
        const m = l.match(/^\s{0,2}"?([\w_]+)"?\s*:/)
        return m ? [{ depth: 0, label: m[1], line: i + 1 }] : []
      })
    if (f.lang === 'm3u')
      return lines.flatMap((l, i) => {
        const m = l.match(/^#EXTINF:\d+,(.*)$/)
        return m ? [{ depth: 0, label: m[1], line: i + 1 }] : []
      })
    return []
  }, [active])

  return (
    <>
      <Header title="Explorer" />
      <div className="scroll min-h-0 flex-1 overflow-y-auto">
        <Section title="Open Editors" open={open.editors} onToggle={() => toggle('editors')}>
          <div className="pb-1">
            {tabs.map((p) => (
              <Row key={p} depth={1} active={p === active} onClick={() => openFile(p)} title={p}>
                <span
                  role="button"
                  tabIndex={-1}
                  aria-label={`Close ${files[p].name}`}
                  onClick={(e) => { e.stopPropagation(); closeTab(p) }}
                  className={`-ml-4 grid h-4 w-4 place-items-center rounded-sm hover:bg-[#ffffff1f] ${p === active ? '' : 'invisible group-hover:visible'}`}
                >
                  <Icon.Close className="h-3 w-3" />
                </span>
                <FileIcon name={files[p].name} />
                <span className="truncate">{files[p].name}</span>
                {p.includes('/') && <span className="truncate text-[12px] text-fg-faint">{p.split('/')[0]}</span>}
              </Row>
            ))}
          </div>
        </Section>

        <Section title={ROOT} open={open.root} onToggle={() => toggle('root')}>
          <div className="pb-2">
            {tree.map((node) =>
              node.type === 'dir' ? (
                <div key={node.path}>
                  <Row
                    depth={0}
                    onClick={() =>
                      setExpanded((s) => {
                        const n = new Set(s)
                        n.has(node.path) ? n.delete(node.path) : n.add(node.path)
                        return n
                      })
                    }
                  >
                    <Icon.Chevron className={`h-4 w-4 shrink-0 text-fg-dim transition-transform ${expanded.has(node.path) ? 'rotate-90' : ''}`} />
                    <span className="truncate">{node.name}</span>
                  </Row>
                  {expanded.has(node.path) && (
                    <div className="relative">
                      <span className="absolute bottom-0 left-[15px] top-0 w-px bg-[#585858]/40" />
                      {node.children.map((c) => (
                        <Row key={c.path} depth={1.5} active={c.path === active} onClick={() => openFile(c.path)} title={c.path}>
                          <FileIcon name={c.name} />
                          <span className="truncate">{c.name}</span>
                        </Row>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Row key={node.path} depth={0.4} active={node.path === active} onClick={() => openFile(node.path)} title={node.path}>
                  <span className="w-1" />
                  <FileIcon name={node.name} />
                  <span className="truncate">{node.name}</span>
                </Row>
              ),
            )}
          </div>
        </Section>

        <Section title="Outline" open={open.outline} onToggle={() => toggle('outline')}>
          <div className="pb-2">
            {outline.length === 0 && <p className="px-5 py-1 text-[12px] text-fg-faint">No symbols found in this file.</p>}
            {outline.map((o) => (
              <Row key={o.line} depth={1 + o.depth} onClick={() => openFile(active, { line: o.line })}>
                <span className="text-[11px] text-[#b180d7]">{o.depth === 0 ? '▣' : '▢'}</span>
                <span className="truncate">{o.label}</span>
              </Row>
            ))}
          </div>
        </Section>

        <Section title="Timeline" open={open.timeline} onToggle={() => toggle('timeline')}>
          <div className="pb-2 text-[12.5px]">
            {[
              ['2026', 'Started CS at UC Berkeley'],
              ['2026', 'Shipped BrandMap, MyMani, Flags'],
              ['2025', 'Riya onboarded at 10+ centers'],
              ['2024', 'Founded Ayur & Alexa Academy'],
            ].map(([y, t]) => (
              <div key={t} className="flex gap-2 py-0.5 pl-6 pr-2 text-fg">
                <span className="text-fg-faint">○</span>
                <span className="truncate">{t}</span>
                <span className="ml-auto shrink-0 text-fg-faint">{y}</span>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </>
  )
}

function SearchView({ openFile }) {
  const [q, setQ] = useState('')
  const input = useRef(null)
  useEffect(() => input.current?.focus(), [])

  const results = useMemo(() => {
    const term = q.trim().toLowerCase()
    if (term.length < 2) return []
    return Object.values(files).flatMap((f) => {
      const hits = f.text.split('\n').flatMap((l, i) => (l.toLowerCase().includes(term) ? [{ line: i + 1, text: l }] : []))
      return hits.length ? [{ file: f, hits }] : []
    })
  }, [q])
  const total = results.reduce((n, r) => n + r.hits.length, 0)

  return (
    <>
      <Header title="Search" />
      <div className="px-3 pb-2">
        <input
          ref={input}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search"
          aria-label="Search files"
          className="h-[26px] w-full rounded-[2px] border border-[#3c3c3c] bg-input px-2 text-[13px] text-fg placeholder:text-fg-faint focus:border-accent"
        />
        {q.trim().length >= 2 && (
          <p className="mt-2 text-[12px] text-fg-dim">
            {total} result{total === 1 ? '' : 's'} in {results.length} file{results.length === 1 ? '' : 's'}
          </p>
        )}
        {!q && <p className="mt-2 text-[12px] leading-relaxed text-fg-faint">Try “Riya”, “Python”, “debate” or “matcha”.</p>}
      </div>
      <div className="scroll min-h-0 flex-1 overflow-y-auto pb-2">
        {results.map(({ file, hits }) => (
          <div key={file.path} className="mb-1">
            <div className="flex h-[22px] items-center gap-1.5 px-3 text-[13px]">
              <Icon.Chevron className="h-4 w-4 rotate-90 text-fg-dim" />
              <FileIcon name={file.name} />
              <span>{file.name}</span>
              <span className="truncate text-[12px] text-fg-faint">{file.path.includes('/') ? file.path.split('/')[0] : ''}</span>
              <span className="ml-auto rounded-full bg-badge px-1.5 text-[11px] text-white">{hits.length}</span>
            </div>
            {hits.map((h) => (
              <button
                type="button"
                key={h.line}
                onClick={() => openFile(file.path, { line: h.line })}
                className="block w-full truncate py-[1px] pl-11 pr-3 text-left text-[13px] text-fg-dim hover:bg-hover"
              >
                <Highlight text={h.text.trim()} term={q.trim()} />
              </button>
            ))}
          </div>
        ))}
      </div>
    </>
  )
}

function Highlight({ text, term }) {
  const i = text.toLowerCase().indexOf(term.toLowerCase())
  const start = Math.max(0, i - 24)
  const pre = (start > 0 ? '…' : '') + text.slice(start, i)
  return (
    <>
      {pre}
      <mark className="bg-[#9e6a03]/60 text-fg">{text.slice(i, i + term.length)}</mark>
      {text.slice(i + term.length)}
    </>
  )
}
