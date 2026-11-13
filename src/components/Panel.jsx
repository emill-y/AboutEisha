import { useEffect, useRef, useState } from 'react'
import { files, tree, resolvePath, ROOT } from '../vfs'
import { profile, quickFacts } from '../data/content'
import { tracks, trackUrl, playlistName } from '../data/playlist'
import { Icon } from './Icons'

const TABS = ['Problems', 'Output', 'Debug Console', 'Terminal', 'Ports']
const PROMPT = 'eisha@berkeley'

function Prompt({ cmd }) {
  return (
    <div>
      <span className="text-[#3fb950]">{PROMPT}</span>
      <span className="text-fg-dim">:</span>
      <span className="text-[#3794ff]">~/{ROOT.replace(' ', '\\ ')}</span>
      <span className="text-fg-dim">$ </span>
      <span className="text-fg">{cmd}</span>
    </div>
  )
}

export default function Panel({ onClose, openFile, onLink, className }) {
  const [tab, setTab] = useState('Terminal')
  const [history, setHistory] = useState(() => [
    { cmd: 'whoami', out: whoami() },
  ])
  const [input, setInput] = useState('')
  const [past, setPast] = useState([])
  const [pi, setPi] = useState(-1)
  const scroller = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight })
  }, [history, tab])

  const L = ({ href, children }) => (
    <button type="button" onClick={() => onLink(href)} className="text-[#3794ff] hover:underline">
      {children}
    </button>
  )

  function whoami() {
    return (
      <>
        <div className="text-fg">{profile.name} · {profile.role}</div>
        <div className="text-fg-dim">{profile.oneLiner}</div>
        <div className="mt-1 text-fg-faint">
          type <span className="text-[#e5c07b]">help</span> to see commands, or open a file on the left.
        </div>
      </>
    )
  }

  function run(raw) {
    const line = raw.trim()
    const [cmd, ...args] = line.split(/\s+/)
    const arg = args.join(' ')
    let out = null
    switch ((cmd || '').toLowerCase()) {
      case '':
        break
      case 'help':
        out = (
          <div className="grid grid-cols-[max-content_1fr] gap-x-6">
            {[
              ['whoami', 'who I am, in one line'],
              ['tldr', 'the quick version'],
              ['ls [folder]', 'list files'],
              ['open <file>', 'open a file in the editor (e.g. open resume)'],
              ['cat <file>', 'print a file here'],
              ['contact', 'how to reach me'],
              ['playlist', "what I'm listening to"],
              ['clear', 'clear the terminal'],
            ].map(([c, d]) => (
              <div key={c} className="contents">
                <span className="text-[#e5c07b]">{c}</span>
                <span className="text-fg-dim">{d}</span>
              </div>
            ))}
          </div>
        )
        break
      case 'whoami':
        out = whoami()
        break
      case 'tldr':
        out = quickFacts.map((f) => (
          <div key={f.label}>
            <span className="text-[#9cdcfe]">{f.label.padEnd(9)}</span> {f.value}
          </div>
        ))
        break
      case 'ls': {
        const dir = arg.replace(/\/$/, '')
        const nodes = dir ? tree.find((n) => n.type === 'dir' && n.name === dir)?.children : tree
        out = nodes ? (
          <div className="flex flex-wrap gap-x-6">
            {nodes.map((n) => (
              <button
                key={n.path}
                type="button"
                onClick={() => (n.type === 'dir' ? run(`ls ${n.name}`) : openFile(n.path))}
                className={n.type === 'dir' ? 'font-bold text-[#3794ff] hover:underline' : 'text-fg hover:underline'}
              >
                {n.name}{n.type === 'dir' ? '/' : ''}
              </button>
            ))}
          </div>
        ) : (
          <span className="text-[#f14c4c]">ls: {arg}: No such file or directory</span>
        )
        break
      }
      case 'open':
      case 'code': {
        const p = resolvePath(arg) || resolvePath(findByName(arg))
        if (p) {
          openFile(p)
          out = <span className="text-fg-dim">opened {p}</span>
        } else out = <span className="text-[#f14c4c]">open: {arg || '(nothing)'}: no such file. try `ls`</span>
        break
      }
      case 'cat': {
        const p = resolvePath(arg) || resolvePath(findByName(arg))
        out = p ? (
          <pre className="whitespace-pre-wrap text-fg-dim">{files[p].text}</pre>
        ) : (
          <span className="text-[#f14c4c]">cat: {arg}: No such file or directory</span>
        )
        break
      }
      case 'contact':
      case 'email':
        out = (
          <>
            <div>email     <L href={`mailto:${profile.email}`}>{profile.email}</L></div>
            <div>linkedin  <L href={profile.links.linkedin}>in/eishayadav</L></div>
            <div>github    <L href={profile.links.github}>emill-y</L></div>
          </>
        )
        break
      case 'playlist':
      case 'music':
        out = (
          <>
            <div className="text-fg-dim">♫ {playlistName}</div>
            {tracks.map((t, i) => (
              <div key={t.title}>
                <span className="text-fg-faint">{String(i + 1).padStart(2, '0')} </span>
                <L href={trackUrl(t)}>{t.artist} – {t.title}</L>
                <span className="text-fg-faint"> {t.length}</span>
              </div>
            ))}
          </>
        )
        break
      case 'resume':
        openFile('resume/resume.md')
        out = <span className="text-fg-dim">opened resume/resume.md</span>
        break
      case 'sudo':
        out = (
          <span>
            permission granted ✓ next step: <L href={`mailto:${profile.email}`}>{profile.email}</L>
          </span>
        )
        break
      case 'clear':
        setHistory([])
        return
      default:
        out = <span className="text-fg-dim">zsh: command not found: {cmd}. try `help`</span>
    }
    setHistory((h) => [...h, { cmd: line, out }])
  }

  return (
    <section className={`flex shrink-0 flex-col border-t border-border bg-chrome ${className}`} aria-label="Panel">
      <div className="flex h-[35px] shrink-0 items-center pl-2 pr-2">
        <div role="tablist" className="no-scrollbar flex min-w-0 items-center gap-1 overflow-x-auto">
          {TABS.map((t) => (
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={tab === t}
              onClick={() => setTab(t)}
              className={`relative whitespace-nowrap px-2 py-1 text-[11px] uppercase tracking-[0.04em] ${
                tab === t ? 'text-fg' : 'text-fg-dim hover:text-fg'
              } ${t === 'Ports' || t === 'Debug Console' ? 'hidden sm:block' : ''}`}
            >
              {t}
              {tab === t && <span className="absolute inset-x-2 -bottom-[5px] h-px bg-fg" />}
            </button>
          ))}
        </div>
        <div className="ml-auto flex shrink-0 items-center gap-0.5 text-fg-dim">
          <span className="mr-2 hidden items-center gap-1 text-[12px] lg:flex">
            <Icon.Terminal className="h-4 w-4" /> zsh – {ROOT}
          </span>
          <PanelBtn label="New terminal" onClick={() => { setTab('Terminal'); inputRef.current?.focus() }}><Icon.Plus className="h-4 w-4" /></PanelBtn>
          <PanelBtn label="Clear terminal" onClick={() => setHistory([])}><Icon.Trash className="h-4 w-4" /></PanelBtn>
          <PanelBtn label="Close panel" onClick={onClose}><Icon.Close className="h-4 w-4" /></PanelBtn>
        </div>
      </div>

      {tab === 'Terminal' ? (
        <div
          ref={scroller}
          className="scroll font-code min-h-0 flex-1 overflow-y-auto px-5 pb-3 text-[12.5px] leading-[1.55]"
          onClick={() => window.getSelection()?.isCollapsed && inputRef.current?.focus({ preventScroll: true })}
        >
          {history.map((h, i) => (
            <div key={i} className="mb-2">
              <Prompt cmd={h.cmd} />
              {h.out && <div className="text-fg">{h.out}</div>}
            </div>
          ))}
          <form
            onSubmit={(e) => {
              e.preventDefault()
              if (input.trim()) setPast((p) => [input, ...p])
              setPi(-1)
              run(input)
              setInput('')
            }}
            className="flex items-center"
          >
            <span className="shrink-0">
              <span className="text-[#3fb950]">{PROMPT}</span>
              <span className="text-fg-dim">:</span>
              <span className="text-[#3794ff]">~/{ROOT.replace(' ', '\\ ')}</span>
              <span className="text-fg-dim">$&nbsp;</span>
            </span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'ArrowUp' && past.length) {
                  e.preventDefault()
                  const n = Math.min(pi + 1, past.length - 1)
                  setPi(n)
                  setInput(past[n])
                } else if (e.key === 'ArrowDown') {
                  e.preventDefault()
                  const n = pi - 1
                  setPi(Math.max(n, -1))
                  setInput(n >= 0 ? past[n] : '')
                }
              }}
              aria-label="Terminal input"
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
              placeholder="type help"
              className="min-w-0 flex-1 bg-transparent text-fg caret-fg placeholder:text-fg-faint"
            />
          </form>
        </div>
      ) : (
        <div className="px-5 py-2 text-[12.5px] text-fg-dim">
          {tab === 'Problems' && 'No problems have been detected in the workspace.'}
          {tab === 'Output' && <span className="font-code">[info] {Object.keys(files).length} files indexed · build passed · 0 warnings</span>}
          {tab === 'Debug Console' && 'Nothing to debug. Everything works on the first try (this time).'}
          {tab === 'Ports' && 'No forwarded ports. Try the Terminal tab.'}
        </div>
      )}
    </section>
  )
}

function findByName(q) {
  const s = q.toLowerCase().replace(/\.\w+$/, '')
  if (!s) return ''
  return Object.keys(files).find((p) => p.toLowerCase().includes(s)) || ''
}

function PanelBtn({ label, children, ...p }) {
  return (
    <button type="button" aria-label={label} title={label} className="grid h-[22px] w-[22px] place-items-center rounded-[4px] hover:bg-[#ffffff1a]" {...p}>
      {children}
    </button>
  )
}
