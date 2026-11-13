import { Fragment, useEffect, useMemo, useRef } from 'react'
import { files, ROOT } from '../vfs'
import { tokenize } from '../highlight'
import { tracks, trackUrl } from '../data/playlist'
import { FileIcon, Icon } from './Icons'

const LINE_H = 20

export default function Editor({ file, tabs, active, openFile, closeTab, onLink, preview, setPreview, cursor, setCursor, reveal, isMobile }) {
  const tabStrip = useRef(null)

  // keep the active tab scrolled into view
  useEffect(() => {
    tabStrip.current?.querySelector('[data-active="true"]')?.scrollIntoView({ block: 'nearest', inline: 'nearest' })
  }, [active])

  const isMd = file?.lang === 'md'
  const showPreview = isMd && preview

  return (
    <section className="flex min-h-0 flex-1 flex-col bg-editor" aria-label="Editor">
      {/* tabs */}
      <div className="flex h-[35px] shrink-0 bg-tabbar">
        <div ref={tabStrip} role="tablist" className="no-scrollbar flex min-w-0 flex-1 overflow-x-auto">
          {tabs.map((p) => {
            const on = p === active
            return (
              <div
                key={p}
                role="tab"
                aria-selected={on}
                data-active={on}
                tabIndex={0}
                onClick={() => openFile(p)}
                onKeyDown={(e) => e.key === 'Enter' && openFile(p)}
                onAuxClick={(e) => e.button === 1 && closeTab(p)}
                className={`group relative flex h-full shrink-0 cursor-pointer items-center gap-1.5 border-r border-border pl-3 pr-1.5 text-[13px] ${
                  on ? 'bg-editor text-white' : 'border-b bg-tabbar text-fg-dim hover:bg-[#1f1f1f]'
                }`}
              >
                {on && <span className="absolute inset-x-0 top-0 h-px bg-accent" />}
                <FileIcon name={files[p].name} />
                <span className="whitespace-nowrap">{files[p].name}</span>
                <button
                  type="button"
                  aria-label={`Close ${files[p].name}`}
                  onClick={(e) => { e.stopPropagation(); closeTab(p) }}
                  className={`ml-1 grid h-5 w-5 place-items-center rounded-[4px] hover:bg-[#ffffff1f] ${on ? '' : 'invisible group-hover:visible'}`}
                >
                  <Icon.Close className="h-3.5 w-3.5" />
                </button>
              </div>
            )
          })}
          <div className="flex-1 border-b border-border" />
        </div>
        {file && (
          <div className="flex shrink-0 items-center gap-0.5 border-b border-border px-2 text-fg-dim">
            {isMd && (
              <ToolBtn label={preview ? 'Show source' : 'Open preview'} on={preview} onClick={() => setPreview(!preview)}>
                <Icon.Preview className="h-4 w-4" />
              </ToolBtn>
            )}
            {file.path === 'resume/resume.md' && (
              <ToolBtn
                label="Print / save résumé as PDF"
                onClick={() => {
                  setPreview(true)
                  setTimeout(() => window.print(), 60)
                }}
              >
                <Icon.Print className="h-4 w-4" />
              </ToolBtn>
            )}
            <ToolBtn label="Split editor" className="hidden md:grid"><Icon.Split className="h-4 w-4" /></ToolBtn>
            <ToolBtn label="More actions"><Icon.More className="h-4 w-4" /></ToolBtn>
          </div>
        )}
      </div>

      {file ? (
        <>
          {/* breadcrumbs */}
          <div className="no-scrollbar flex h-[22px] shrink-0 items-center gap-0.5 overflow-x-auto whitespace-nowrap px-3 text-[12.5px] text-fg-dim">
            <span>{ROOT}</span>
            {file.path.split('/').map((seg, i, arr) => (
              <Fragment key={seg}>
                <Icon.Chevron className="h-3.5 w-3.5 shrink-0" />
                {i === arr.length - 1 ? (
                  <span className="flex items-center gap-1 text-fg">
                    <FileIcon name={seg} /> {seg}
                  </span>
                ) : (
                  <span>{seg}</span>
                )}
              </Fragment>
            ))}
          </div>

          {showPreview ? (
            <div className="scroll print-area min-h-0 flex-1 overflow-y-auto px-6 py-5 md:px-10">
              <MarkdownPreview text={file.text} onLink={onLink} />
            </div>
          ) : (
            <Code file={file} onLink={onLink} cursor={cursor} setCursor={setCursor} reveal={reveal} isMobile={isMobile} />
          )}
        </>
      ) : (
        <Welcome openFile={openFile} />
      )}
    </section>
  )
}

function ToolBtn({ label, on, children, className = '', ...p }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={`grid h-[22px] w-[22px] place-items-center rounded-[4px] hover:bg-[#ffffff1a] ${on ? 'bg-[#ffffff1a] text-fg' : ''} ${className}`}
      {...p}
    >
      {children}
    </button>
  )
}

function Code({ file, onLink, cursor, setCursor, reveal, isMobile }) {
  const scroller = useRef(null)
  const lines = useMemo(() => file.text.replace(/\n$/, '').split('\n'), [file])
  const tokens = useMemo(() => lines.map((l) => tokenize(l, file.lang)), [lines, file.lang])

  // scroll to top on file change, or to a requested line
  useEffect(() => {
    const el = scroller.current
    if (!el) return
    if (reveal?.path === file.path && reveal.line > 1) {
      const row = el.querySelector(`[data-line="${reveal.line}"]`)
      if (row) el.scrollTo({ top: row.offsetTop - el.clientHeight / 3 })
    } else {
      el.scrollTo({ top: 0 })
    }
  }, [file.path, reveal])

  const isPlaylist = file.lang === 'm3u'
  const gutter = isMobile ? 40 : 64

  return (
    <div className="relative flex min-h-0 flex-1">
      <div ref={scroller} className="scroll font-code min-h-0 flex-1 overflow-y-auto pb-[40vh] text-[13px]" style={{ lineHeight: `${LINE_H}px` }}>
        {lines.map((line, i) => {
          const n = i + 1
          const lens = isPlaylist ? playlistLens(line, onLink, gutter) : null
          return (
            <Fragment key={n}>
              {lens}
              <div
                data-line={n}
                onClick={() => setCursor(n)}
                className={`flex border-y ${n === cursor ? 'border-[#282828]' : 'border-transparent'}`}
              >
                <span
                  className={`shrink-0 select-none pr-4 text-right ${n === cursor ? 'text-[#cccccc]' : 'text-fg-faint'}`}
                  style={{ width: gutter }}
                >
                  {n}
                </span>
                <span className={`min-w-0 flex-1 whitespace-pre-wrap break-words ${isMobile ? 'pr-3' : 'pr-[110px]'}`}>
                  {tokens[i].length === 0 ? '​' : tokens[i].map((t, j) => <Token key={j} t={t} onLink={onLink} />)}
                </span>
              </div>
            </Fragment>
          )
        })}
      </div>
      {!isMobile && <Minimap tokens={tokens} scroller={scroller} />}
    </div>
  )
}

function Token({ t, onLink }) {
  const style = t.b ? { fontWeight: 700 } : undefined
  if (!t.href) return <span className={t.c} style={style}>{t.t}</span>
  const external = /^(https?:|mailto:)/.test(t.href)
  return (
    <a
      href={external ? t.href : `/${t.href}`}
      target={external && !t.href.startsWith('mailto:') ? '_blank' : undefined}
      rel="noreferrer"
      title={external ? `Open ${t.href}` : `Open ${t.href.split('#')[0]}`}
      className={t.c}
      style={style}
      onClick={(e) => {
        e.stopPropagation()
        if (!external) {
          e.preventDefault()
          onLink(t.href)
        }
      }}
    >
      {t.t}
    </a>
  )
}

// "codelens" above each track, like VS Code's Run | Debug hints
function playlistLens(line, onLink, gutter) {
  const m = line.match(/^#EXTINF:\d+,(.*) - (.*)$/)
  if (!m) return null
  const track = tracks.find((t) => t.artist === m[1] && t.title === m[2])
  if (!track) return null
  return (
    <div className="flex h-[18px] items-center text-[11.5px] text-fg-dim">
      <span className="shrink-0" style={{ width: gutter }} />
      <button type="button" onClick={() => onLink(trackUrl(track))} className="flex items-center gap-1 hover:text-accent-fg">
        <Icon.Play className="h-2.5 w-2.5" /> Play on Spotify
      </button>
      <span className="mx-1.5 text-fg-faint">|</span>
      <span className="text-fg-faint">{track.length}</span>
    </div>
  )
}

function Minimap({ tokens, scroller }) {
  const colors = {
    'tk-heading': '#569cd6', 'tk-string': '#ce9178', 'tk-key': '#9cdcfe', 'tk-comment': '#6a9955',
    'tk-link': '#4ec9b0', 'tk-url': '#3794ff', 'tk-code': '#ce9178', 'tk-keyword': '#c586c0', 'tk-num': '#b5cea8',
    'tk-bullet': '#6796e6', 'tk-quote': '#6a9955',
  }
  return (
    <div
      aria-hidden="true"
      className="absolute right-[14px] top-0 hidden w-[72px] cursor-pointer overflow-hidden pt-1 opacity-70 hover:opacity-100 md:block"
      onClick={(e) => {
        const el = scroller.current
        const rect = e.currentTarget.getBoundingClientRect()
        const ratio = (e.clientY - rect.top) / (tokens.length * 3)
        el.scrollTo({ top: ratio * el.scrollHeight - el.clientHeight / 2, behavior: 'smooth' })
      }}
    >
      {tokens.slice(0, 260).map((line, i) => (
        <div key={i} className="flex h-[3px] items-center gap-px">
          {line.map((t, j) => (
            <span
              key={j}
              className="h-[2px] shrink-0"
              style={{ width: Math.min(t.t.trim().length * 0.55, 70), background: colors[t.c] || '#7a7a7a', marginLeft: j === 0 ? (t.t.length - t.t.trimStart().length) * 0.55 : 0 }}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

/* ---------- markdown preview ---------- */
function inline(s, onLink, keyBase) {
  const parts = []
  const re = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g
  let last = 0
  let k = 0
  for (const m of s.matchAll(re)) {
    if (m.index > last) parts.push(s.slice(last, m.index))
    const tok = m[0]
    if (tok.startsWith('**')) parts.push(<strong key={`${keyBase}-${k++}`}>{tok.slice(2, -2)}</strong>)
    else if (tok.startsWith('`')) parts.push(<code key={`${keyBase}-${k++}`}>{tok.slice(1, -1)}</code>)
    else {
      const [, label, href] = tok.match(/\[([^\]]+)\]\(([^)]+)\)/)
      const external = /^(https?:|mailto:)/.test(href)
      parts.push(
        <a
          key={`${keyBase}-${k++}`}
          href={external ? href : `/${href}`}
          target={external && !href.startsWith('mailto:') ? '_blank' : undefined}
          rel="noreferrer"
          onClick={(e) => { if (!external) { e.preventDefault(); onLink(href) } }}
        >
          {label}
        </a>,
      )
    }
    last = m.index + tok.length
  }
  if (last < s.length) parts.push(s.slice(last))
  return parts
}

function MarkdownPreview({ text, onLink }) {
  const blocks = []
  let list = null
  let para = null
  const flush = () => {
    if (list) blocks.push({ type: 'ul', items: list })
    if (para) blocks.push({ type: 'p', lines: para })
    list = null
    para = null
  }
  for (const line of text.split('\n')) {
    let m
    if (!line.trim() || /^<!--/.test(line)) { flush(); continue }
    if ((m = line.match(/^(#{1,3}) (.*)$/))) { flush(); blocks.push({ type: `h${m[1].length}`, text: m[2] }); continue }
    if ((m = line.match(/^> (.*)$/))) { flush(); blocks.push({ type: 'quote', text: m[1] }); continue }
    if ((m = line.match(/^- (.*)$/))) { if (para) flush(); (list ||= []).push(m[1]); continue }
    if (list) flush()
    ;(para ||= []).push(line)
  }
  flush()

  return (
    <article className="md-preview">
      {blocks.map((b, i) => {
        if (b.type === 'ul') return <ul key={i}>{b.items.map((it, j) => <li key={j}>{inline(it, onLink, `${i}-${j}`)}</li>)}</ul>
        if (b.type === 'p')
          return (
            <p key={i}>
              {b.lines.map((l, j) => (
                <Fragment key={j}>
                  {j > 0 && <br />}
                  {inline(l, onLink, `${i}-${j}`)}
                </Fragment>
              ))}
            </p>
          )
        if (b.type === 'quote') return <blockquote key={i}>{inline(b.text, onLink, i)}</blockquote>
        const H = b.type
        return <H key={i}>{inline(b.text, onLink, i)}</H>
      })}
    </article>
  )
}

function Welcome({ openFile }) {
  const rows = [
    ['Open README', 'README.md'],
    ['Open résumé', 'resume/resume.md'],
    ['Open projects', 'projects/riya.md'],
    ['Open playlist', 'playlist.m3u'],
  ]
  return (
    <div className="grid flex-1 place-items-center p-6">
      <div className="text-center">
        <p className="text-[64px] font-light leading-none text-[#2f2f2f]">EY</p>
        <div className="mt-8 grid gap-2 text-[13px]">
          {rows.map(([label, p]) => (
            <button key={p} type="button" onClick={() => openFile(p)} className="flex justify-between gap-10 text-fg-dim hover:text-fg">
              <span>{label}</span>
              <span className="font-code text-fg-faint">{p}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
