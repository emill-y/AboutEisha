import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { files, DEFAULT_FILE, resolvePath, ROOT, languageName } from './vfs'
import { tracks } from './data/playlist'
import { profile } from './data/content'
import { Icon } from './components/Icons'
import Sidebar from './components/Sidebar'
import Editor from './components/Editor'
import Panel from './components/Panel'
import Chat from './components/Chat'
import QuickOpen from './components/QuickOpen'
import useMedia from './useMedia'

const pathToUrl = (p) => (p === DEFAULT_FILE ? '/' : `/${p}`)

export default function App() {
  const isMobile = useMedia('(max-width: 767px)')
  const isWide = useMedia('(min-width: 1280px)')

  const initial = useMemo(() => resolvePath(window.location.pathname) || DEFAULT_FILE, [])
  const [tabs, setTabs] = useState(() => [...new Set([DEFAULT_FILE, initial])])
  const [active, setActive] = useState(initial)
  const [view, setView] = useState(() => (window.innerWidth < 768 ? null : 'explorer'))
  const [panelOpen, setPanelOpen] = useState(() => window.innerWidth >= 768)
  const [chatOpen, setChatOpen] = useState(() => window.innerWidth >= 1280)
  const [preview, setPreview] = useState(() => window.innerWidth < 768)
  const [quickOpen, setQuickOpen] = useState(false)
  const [cursor, setCursor] = useState(1)
  const [reveal, setReveal] = useState(null)
  const hist = useRef({ stack: [initial], i: 0 })

  // keep chat sensible when the window crosses the wide breakpoint
  useEffect(() => setChatOpen(isWide), [isWide])

  const openFile = useCallback(
    (path, { line = 1, fromHistory = false } = {}) => {
      if (!files[path]) return
      setTabs((t) => (t.includes(path) ? t : [...t, path]))
      setActive(path)
      setCursor(line)
      setReveal({ path, line, n: Math.random() })
      if (!fromHistory) {
        const h = hist.current
        if (h.stack[h.i] !== path) {
          h.stack = [...h.stack.slice(0, h.i + 1), path]
          h.i = h.stack.length - 1
        }
      }
      if (window.innerWidth < 768) setView(null)
    },
    [],
  )

  // links inside files, the terminal and the chat all come through here
  const onLink = useCallback(
    (href) => {
      if (/^mailto:/.test(href)) return void (window.location.href = href)
      if (/^https?:/.test(href)) return void window.open(href, '_blank', 'noopener')
      const [p, anchor] = href.split('#')
      const path = resolvePath(p)
      if (!path) return
      let line = 1
      if (anchor) {
        const i = files[path].text.split('\n').findIndex((l) => /^#+ /.test(l) && l.toLowerCase().includes(anchor.toLowerCase()))
        if (i >= 0) line = i + 1
      }
      openFile(path, { line })
    },
    [openFile],
  )

  const closeTab = (path) => {
    const i = tabs.indexOf(path)
    const next = tabs.filter((x) => x !== path)
    setTabs(next)
    if (path === active) {
      const fallback = next[Math.min(i, next.length - 1)]
      if (fallback) openFile(fallback)
      else setActive(null)
    }
  }

  const go = (d) => {
    const h = hist.current
    const i = h.i + d
    if (i < 0 || i >= h.stack.length) return
    h.i = i
    openFile(h.stack[i], { fromHistory: true })
  }

  // url <-> active file
  useEffect(() => {
    if (!active) return
    const url = pathToUrl(active)
    if (window.location.pathname !== url) window.history.replaceState(null, '', url)
    document.title = `${files[active].name} — ${ROOT}`
  }, [active])

  // shortcuts: ⌘P quick open, ⌘B sidebar, ⌃` terminal, ⌥⌘B chat
  useEffect(() => {
    const onKey = (e) => {
      const mod = e.metaKey || e.ctrlKey
      if (mod && e.key.toLowerCase() === 'p') { e.preventDefault(); setQuickOpen(true) }
      else if (mod && e.altKey && e.key.toLowerCase() === 'b') { e.preventDefault(); setChatOpen((v) => !v) }
      else if (mod && e.key.toLowerCase() === 'b') { e.preventDefault(); setView((v) => (v ? null : 'explorer')) }
      else if (e.ctrlKey && e.key === '`') { e.preventDefault(); setPanelOpen((v) => !v) }
      else if (e.key === 'Escape') setQuickOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const toggleView = (v) => setView((cur) => (cur === v ? null : v))
  const file = active ? files[active] : null
  const nowPlaying = tracks[0]

  return (
    <div className="flex h-[100dvh] flex-col overflow-hidden bg-chrome text-fg">
      {/* ---------- title bar ---------- */}
      <header className="relative flex h-[38px] shrink-0 items-center border-b border-border bg-chrome px-3">
        <div className="flex items-center gap-2" aria-hidden="true">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="absolute left-1/2 flex w-[min(560px,calc(100%-120px))] -translate-x-1/2 items-center gap-2 md:w-[min(560px,44%)]">
          <div className="hidden items-center md:flex">
            <TitleBtn label="Go back" onClick={() => go(-1)}><Icon.ArrowLeft className="h-4 w-4" /></TitleBtn>
            <TitleBtn label="Go forward" onClick={() => go(1)}><Icon.ArrowRight className="h-4 w-4" /></TitleBtn>
          </div>
          <button
            type="button"
            onClick={() => setQuickOpen(true)}
            className="flex h-[26px] flex-1 items-center gap-2 rounded-md border border-[#3c3c3c] bg-[#222] px-3 text-[12.5px] text-fg-dim transition-colors hover:border-[#4a4a4a] hover:bg-[#2a2a2a]"
          >
            <Icon.Search className="h-3.5 w-3.5" />
            <span className="truncate">{ROOT}</span>
            <span className="ml-auto hidden text-[11px] text-fg-faint sm:inline">⌘P</span>
          </button>
        </div>
        <div className="ml-auto hidden items-center gap-0.5 md:flex">
          <TitleBtn label="Toggle Primary Side Bar (⌘B)" on={!!view} onClick={() => setView((v) => (v ? null : 'explorer'))}><Icon.Layout className="h-4 w-4" /></TitleBtn>
          <TitleBtn label="Toggle Panel (⌃`)" on={panelOpen} onClick={() => setPanelOpen((v) => !v)}><Icon.LayoutPanel className="h-4 w-4" /></TitleBtn>
          <TitleBtn label="Toggle Chat (⌥⌘B)" on={chatOpen} onClick={() => setChatOpen((v) => !v)}><Icon.LayoutRight className="h-4 w-4" /></TitleBtn>
        </div>
      </header>

      <div className="relative flex min-h-0 flex-1">
        {/* ---------- activity bar ---------- */}
        <nav aria-label="Activity bar" className="flex w-12 shrink-0 flex-col items-center border-r border-border bg-chrome py-1">
          <ActBtn label="Explorer (⌘B)" bar on={view === 'explorer'} onClick={() => toggleView('explorer')}><Icon.Files /></ActBtn>
          <ActBtn label="Search" bar on={view === 'search'} onClick={() => toggleView('search')}><Icon.Search /></ActBtn>
          <ActBtn label="GitHub: emill-y" onClick={() => onLink(profile.links.github)}><Icon.Branch /></ActBtn>
          <ActBtn label="Terminal (⌃`)" on={panelOpen} onClick={() => setPanelOpen((v) => !v)}><Icon.Run /></ActBtn>
          <ActBtn label="Playlist" on={active === 'playlist.m3u'} onClick={() => openFile('playlist.m3u')}><Icon.Music /></ActBtn>
          <ActBtn label="Chat (⌥⌘B)" on={chatOpen} onClick={() => setChatOpen((v) => !v)}><Icon.Chat /></ActBtn>
          <div className="flex-1" />
          <ActBtn label="Contact" onClick={() => openFile('contact/contact.json')}><Icon.Account /></ActBtn>
          <ActBtn label="Go to File (⌘P)" onClick={() => setQuickOpen(true)}><Icon.Gear /></ActBtn>
        </nav>

        {/* ---------- side bar ---------- */}
        {view && isMobile && <div className="absolute inset-0 left-12 z-20 bg-black/40" onClick={() => setView(null)} />}
        {view && (
          <Sidebar
            view={view}
            tabs={tabs}
            active={active}
            openFile={openFile}
            closeTab={closeTab}
            className={isMobile ? 'absolute bottom-0 left-12 top-0 z-30 w-[min(280px,80vw)] shadow-2xl' : 'w-[250px]'}
          />
        )}

        {/* ---------- editor + panel ---------- */}
        <div className="flex min-w-0 flex-1 flex-col">
          <Editor
            file={file}
            tabs={tabs}
            active={active}
            openFile={openFile}
            closeTab={closeTab}
            onLink={onLink}
            preview={preview}
            setPreview={setPreview}
            cursor={cursor}
            setCursor={setCursor}
            reveal={reveal}
            isMobile={isMobile}
          />
          {panelOpen && (
            <Panel
              onClose={() => setPanelOpen(false)}
              openFile={openFile}
              onLink={onLink}
              className={isMobile ? 'h-[45%]' : 'h-[230px]'}
            />
          )}
        </div>

        {/* ---------- chat ---------- */}
        {chatOpen && (
          <Chat
            active={active}
            onLink={onLink}
            onClose={() => setChatOpen(false)}
            className={isMobile || !isWide ? 'absolute inset-y-0 right-0 z-30 w-[min(340px,100%)] shadow-2xl' : 'w-[320px]'}
          />
        )}
      </div>

      {/* ---------- status bar ---------- */}
      <footer className="flex h-[24px] shrink-0 items-center border-t border-border bg-chrome text-[12px] text-fg-dim">
        <button
          type="button"
          aria-label="Open contact"
          title="Open contact"
          onClick={() => openFile('contact/contact.json')}
          className="flex h-full items-center bg-accent px-2.5 text-white hover:bg-[#1a85dc]"
        >
          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true"><path d="M3.5 5.5 1 8l2.5 2.5.7-.7L2.4 8l1.8-1.8zm9 0-.7.7L13.6 8l-1.8 1.8.7.7L15 8zM9.6 3 5.4 13h1l4.2-10z" /></svg>
        </button>
        <StatusItem onClick={() => onLink(profile.links.github)} title="GitHub"><Icon.Branch className="h-3.5 w-3.5" /> main</StatusItem>
        <StatusItem className="hidden sm:flex" title="Synced"><Icon.Sync className="h-3.5 w-3.5" /></StatusItem>
        <StatusItem title="No problems">
          <Icon.Error className="h-3.5 w-3.5" /> 0 <Icon.Warning className="ml-1 h-3.5 w-3.5" /> 0
        </StatusItem>
        <div className="flex-1" />
        <StatusItem onClick={() => openFile('playlist.m3u')} title="Open playlist" className="max-w-[46%] truncate">
          <span className="text-[#e86f9a]">♫</span>
          <span className="truncate">{nowPlaying.artist} – {nowPlaying.title}</span>
        </StatusItem>
        {file && (
          <>
            <StatusItem className="hidden md:flex">Ln {cursor}, Col 1</StatusItem>
            <StatusItem className="hidden lg:flex">Spaces: 2</StatusItem>
            <StatusItem className="hidden lg:flex">UTF-8</StatusItem>
            <StatusItem className="hidden lg:flex">LF</StatusItem>
            <StatusItem className="hidden md:flex">{'{ }'} {languageName[file.lang]}</StatusItem>
          </>
        )}
        <StatusItem title="Notifications"><Icon.Bell className="h-3.5 w-3.5" /></StatusItem>
      </footer>

      {quickOpen && <QuickOpen onClose={() => setQuickOpen(false)} openFile={openFile} />}
    </div>
  )
}

function TitleBtn({ label, on, children, ...p }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={`grid h-[26px] w-[26px] place-items-center rounded-md transition-colors hover:bg-[#2f2f2f] ${on ? 'text-fg' : 'text-fg-dim'}`}
      {...p}
    >
      {children}
    </button>
  )
}

function ActBtn({ label, on, bar, children, ...p }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      aria-pressed={!!on}
      className={`relative grid h-12 w-12 place-items-center transition-colors [&>svg]:h-6 [&>svg]:w-6 ${
        on ? 'text-fg' : 'text-[#868686] hover:text-fg'
      }`}
      {...p}
    >
      {on && bar && <span className="absolute inset-y-0 left-0 w-[2px] bg-accent" />}
      {children}
    </button>
  )
}

function StatusItem({ children, className = '', onClick, title }) {
  const Tag = onClick ? 'button' : 'span'
  return (
    <Tag
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      title={title}
      className={`flex h-full items-center gap-1 whitespace-nowrap px-2 ${onClick ? 'hover:bg-[#ffffff1f] hover:text-fg' : ''} ${className}`}
    >
      {children}
    </Tag>
  )
}
