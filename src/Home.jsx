import { useCallback, useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { items, findItem } from './data/items'
import { profile, quickFacts } from './data/content'
import Bag from './components/Bag'
import Drawer from './components/Drawer'
import Inventory from './components/Inventory'

const ease = [0.22, 1, 0.36, 1]

export default function Home() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [hovered, setHovered] = useState(null)
  const active = slug ? findItem(slug) : null

  const open = useCallback((s) => navigate(`/${s}`), [navigate])
  const close = useCallback(() => navigate('/'), [navigate])

  // number keys open items, arrows step through them, esc closes
  useEffect(() => {
    const onKey = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      if (e.target instanceof HTMLElement && e.target.closest('input, textarea')) return
      const n = Number(e.key)
      if (n >= 1 && n <= items.length) return open(items[n - 1].slug)
      if (!active) return
      const i = items.indexOf(active)
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') open(items[(i + 1) % items.length].slug)
      if (e.key === 'ArrowLeft') open(items[(i - 1 + items.length) % items.length].slug)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active, open, close])

  useEffect(() => {
    document.title = active ? `${active.section} · ${profile.name}` : `${profile.name}, what's in my bag`
  }, [active])

  if (slug && !active) return <Navigate to="/" replace />

  return (
    <div className="min-h-screen">
      <Header open={open} />

      <main className="mx-auto max-w-[1240px] px-4 sm:px-6">
        <Hero />

        <motion.section
          aria-label="What's in my bag"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.1 }}
        >
          <Bag
            items={items}
            hovered={hovered}
            setHovered={setHovered}
            activeSlug={active?.slug}
            onOpen={open}
          />
        </motion.section>

        <Inventory items={items} hovered={hovered} setHovered={setHovered} onOpen={open} />
      </main>

      <Footer />

      <AnimatePresence>
        {active && <Drawer key="drawer" item={active} onClose={close} onOpen={open} />}
      </AnimatePresence>
    </div>
  )
}

function Header({ open }) {
  return (
    <header className="sticky top-0 z-30 border-b border-line/70 bg-cream/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-[1240px] items-center justify-between px-4 sm:px-6">
        <a href="/" className="font-display text-[22px] leading-none text-ink">
          Eisha Yadav
        </a>
        <nav className="flex items-center gap-1 text-[13.5px] text-cocoa">
          <a href="#index" className="hidden rounded-full px-3 py-1.5 transition-colors hover:bg-linen sm:inline-block">
            Index
          </a>
          <button onClick={() => open('projects')} className="hidden rounded-full px-3 py-1.5 transition-colors hover:bg-linen sm:inline-block">
            Projects
          </button>
          <button onClick={() => open('contact')} className="rounded-full px-3 py-1.5 transition-colors hover:bg-linen">
            Contact
          </button>
          <button
            onClick={() => open('resume')}
            className="ml-1 rounded-full bg-ink px-3.5 py-1.5 text-cream transition-colors hover:bg-raspberry"
          >
            Résumé
          </button>
        </nav>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="grid gap-9 pb-8 pt-12 sm:pb-10 sm:pt-14 lg:grid-cols-[1.35fr_1fr] lg:items-end lg:gap-14">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }}>
        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.22em] text-raspberry">
          What’s in my bag · Fall ’26
        </p>
        <h1 className="font-display max-w-[18ch] text-[44px] leading-[1.02] text-ink sm:text-[64px]">
          Hi, I’m Eisha. <span className="italic text-cocoa">Here’s what I carry.</span>
        </h1>
        <p className="mt-5 max-w-[56ch] text-[16px] leading-relaxed text-muted sm:text-[17px]">
          {profile.role}. {profile.oneLiner} Tap anything in the bag to see the work behind it, or skim the index
          below.
        </p>
      </motion.div>

      <motion.dl
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease, delay: 0.08 }}
        className="grid grid-cols-2 gap-px self-end overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4 lg:grid-cols-2"
      >
        {quickFacts.map((f) => (
          <div key={f.label} className="bg-card px-4 py-3.5 sm:px-5 sm:py-4">
            <dt className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted">{f.label}</dt>
            <dd className="mt-1 text-[14px] leading-snug text-ink">{f.value}</dd>
          </div>
        ))}
      </motion.dl>
    </section>
  )
}

function Footer() {
  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-3 px-4 py-8 text-[13px] text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>© {new Date().getFullYear()} {profile.name} · {profile.location}</p>
        <div className="flex gap-5">
          <a className="hover:text-raspberry" href={`mailto:${profile.email}`}>Email</a>
          <a className="hover:text-raspberry" href={profile.links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a className="hover:text-raspberry" href={profile.links.github} target="_blank" rel="noreferrer">GitHub</a>
          <a className="hover:text-raspberry" href={profile.links.beli} target="_blank" rel="noreferrer">Beli</a>
        </div>
      </div>
    </footer>
  )
}
