import { useEffect, useMemo, useRef, useState } from 'react'
import { files } from '../vfs'
import { FileIcon } from './Icons'

export default function QuickOpen({ onClose, openFile }) {
  const [q, setQ] = useState('')
  const [sel, setSel] = useState(0)
  const input = useRef(null)
  useEffect(() => input.current?.focus(), [])

  const list = useMemo(() => {
    const s = q.trim().toLowerCase()
    const all = Object.values(files)
    if (!s) return all
    return all
      .filter((f) => f.path.toLowerCase().includes(s) || f.text.toLowerCase().includes(s))
      .sort((a, b) => Number(!a.path.toLowerCase().includes(s)) - Number(!b.path.toLowerCase().includes(s)))
  }, [q])

  const pick = (f) => {
    if (!f) return
    openFile(f.path)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50" onClick={onClose}>
      <div
        role="dialog"
        aria-label="Go to file"
        onClick={(e) => e.stopPropagation()}
        className="absolute left-1/2 top-[44px] w-[min(600px,calc(100vw-24px))] -translate-x-1/2 overflow-hidden rounded-lg border border-[#3c3c3c] bg-[#222] shadow-[0_8px_30px_rgba(0,0,0,0.6)]"
      >
        <div className="p-1.5">
          <input
            ref={input}
            value={q}
            onChange={(e) => { setQ(e.target.value); setSel(0) }}
            onKeyDown={(e) => {
              if (e.key === 'ArrowDown') { e.preventDefault(); setSel((s) => Math.min(s + 1, list.length - 1)) }
              if (e.key === 'ArrowUp') { e.preventDefault(); setSel((s) => Math.max(s - 1, 0)) }
              if (e.key === 'Enter') pick(list[sel])
              if (e.key === 'Escape') onClose()
            }}
            placeholder="Search files by name or content"
            aria-label="Search files"
            className="h-[28px] w-full rounded-[4px] border border-accent bg-input px-2 text-[13px] text-fg placeholder:text-fg-faint"
          />
        </div>
        <ul className="scroll max-h-[340px] overflow-y-auto pb-1.5">
          {list.length === 0 && <li className="px-3 py-1.5 text-[13px] text-fg-dim">No matching files</li>}
          {list.map((f, i) => (
            <li key={f.path}>
              <button
                type="button"
                onMouseEnter={() => setSel(i)}
                onClick={() => pick(f)}
                className={`mx-1.5 flex w-[calc(100%-12px)] items-center gap-2 rounded-[4px] px-2 py-[3px] text-left text-[13px] ${
                  i === sel ? 'bg-active-select text-white' : 'text-fg'
                }`}
              >
                <FileIcon name={f.name} />
                <span>{f.name}</span>
                <span className="truncate text-[12px] text-fg-dim">{f.path.includes('/') ? f.path.split('/')[0] : ''}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
