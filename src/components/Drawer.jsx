import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import useMediaQuery from '../useMediaQuery'
import { items } from '../data/items'
import { sections } from './Sections'

export default function Drawer({ item, onClose, onOpen }) {
  const isMobile = useMediaQuery('(max-width: 720px)')
  const panelRef = useRef(null)
  const scrollRef = useRef(null)
  const index = items.indexOf(item)
  const prev = items[(index - 1 + items.length) % items.length]
  const next = items[(index + 1) % items.length]
  const Body = sections[item.slug]

  // lock page scroll, move focus in, give it back on close
  useEffect(() => {
    const previouslyFocused = document.activeElement
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    panelRef.current?.focus({ preventScroll: true })
    return () => {
      document.body.style.overflow = overflow
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus({ preventScroll: true })
    }
  }, [])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 })
  }, [item.slug])

  const panelMotion = isMobile
    ? { initial: { y: '100%' }, animate: { y: 0 }, exit: { y: '100%' } }
    : { initial: { x: '100%' }, animate: { x: 0 }, exit: { x: '100%' } }

  return (
    <div className="fixed inset-0 z-50">
      <motion.div
        className="no-print absolute inset-0 bg-ink/25 backdrop-blur-[3px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
      />
      <motion.aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
        ref={panelRef}
        tabIndex={-1}
        {...panelMotion}
        transition={{ type: 'spring', stiffness: 320, damping: 36 }}
        className={`print-area absolute flex flex-col outline-none bg-cream shadow-[0_0_80px_-20px_rgba(60,30,20,0.45)] ${
          isMobile
            ? 'inset-x-0 bottom-0 h-[92dvh] rounded-t-[26px]'
            : 'inset-y-0 right-0 w-[min(640px,100vw)] rounded-l-[26px]'
        }`}
      >
        {isMobile && <div className="no-print mx-auto mt-2.5 h-1 w-10 rounded-full bg-line" />}

        {/* header */}
        <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-3 sm:px-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
            <span className="text-raspberry">{String(index + 1).padStart(2, '0')}</span> / {String(items.length).padStart(2, '0')} · {item.object}
          </p>
          <div className="no-print flex items-center gap-1.5">
            <IconButton label={`Previous: ${prev.section}`} onClick={() => onOpen(prev.slug)}>←</IconButton>
            <IconButton label={`Next: ${next.section}`} onClick={() => onOpen(next.slug)}>→</IconButton>
            <IconButton label="Close" onClick={onClose}>✕</IconButton>
          </div>
        </div>

        <div ref={scrollRef} className="drawer-scroll flex-1 overflow-y-auto overscroll-contain">
          <motion.div
            key={item.slug}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="px-5 pb-16 pt-7 sm:px-8 sm:pt-9"
          >
            <div className="mb-8 flex items-center gap-5">
              <div className="grid h-24 w-24 shrink-0 place-items-center rounded-2xl bg-linen p-3 sm:h-28 sm:w-28">
                <img src={item.image} alt={item.object} className="h-full w-full object-contain drop-shadow-[0_8px_10px_rgba(90,50,40,0.2)]" />
              </div>
              <div>
                <h2 id="drawer-title" className="font-display text-[40px] leading-[1.02] sm:text-[48px]">
                  {item.section}
                </h2>
                <p className="mt-1.5 text-[14px] text-muted">{item.blurb}</p>
              </div>
            </div>

            <Body />

            <div className="no-print mt-14 grid grid-cols-2 gap-3">
              <NavCard dir="Previous" item={prev} onClick={() => onOpen(prev.slug)} />
              <NavCard dir="Next" item={next} onClick={() => onOpen(next.slug)} align="right" />
            </div>
          </motion.div>
        </div>
      </motion.aside>
    </div>
  )
}

function IconButton({ label, children, ...props }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className="grid h-9 w-9 place-items-center rounded-full border border-line bg-card text-[14px] text-cocoa transition-colors hover:border-ink hover:bg-ink hover:text-cream"
      {...props}
    >
      {children}
    </button>
  )
}

function NavCard({ dir, item, onClick, align }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex items-center gap-3 rounded-2xl border border-line bg-card p-3 transition-colors hover:border-raspberry ${
        align === 'right' ? 'flex-row-reverse text-right' : ''
      }`}
    >
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-linen p-1.5">
        <img src={item.image} alt="" className="h-full w-full object-contain" />
      </span>
      <span className="min-w-0">
        <span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-muted">{dir}</span>
        <span className="font-display block truncate text-[20px] leading-tight group-hover:text-raspberry">{item.section}</span>
      </span>
    </button>
  )
}
