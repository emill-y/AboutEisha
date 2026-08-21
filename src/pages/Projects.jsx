import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import { projects } from '../data/projects'

export default function Projects() {
  const allTags = useMemo(() => {
    const s = new Set()
    projects.forEach((p) => p.tags.forEach((t) => s.add(t)))
    return Array.from(s)
  }, [])

  const [active, setActive] = useState('all')

  const filtered = active === 'all' ? projects : projects.filter((p) => p.tags.includes(active))

  return (
    <PageTransition>
      <div className="max-w-5xl mx-auto px-6 py-16">
        <header className="mb-10">
          <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-mint-deep mb-2">selected work</p>
          <h1 className="text-[10vw] md:text-5xl" style={{ fontFamily: 'var(--font-display)' }}>Projects</h1>
        </header>

        {/* --- monitor frame --- */}
        <div className="rounded-t-2xl bg-[#e6e7ec] pt-3 px-3">
          <div className="flex gap-1.5 px-2 pb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose" />
            <span className="w-2.5 h-2.5 rounded-full bg-mist-2" />
            <span className="w-2.5 h-2.5 rounded-full bg-mint" />
          </div>
        </div>
        <div className="bg-ink rounded-b-sm px-3 pb-6 pt-4 shadow-[0_30px_60px_-15px_rgba(23,24,28,0.35)]">
          <div className="bg-[#0e0f12] rounded-md p-5 md:p-8 font-mono text-[13px] leading-relaxed">
            <p className="text-mint mb-4">
              <span className="text-graphite">eisha@studio</span>
              <span className="text-mist-2">:~$</span> ls ./projects {active !== 'all' && `--tag=${active}`}
            </p>

            {/* filter row */}
            <div className="flex flex-wrap gap-2 mb-6">
              <button
                onClick={() => setActive('all')}
                className={`clickable px-2.5 py-1 rounded-full border text-[11px] transition-colors ${
                  active === 'all'
                    ? 'bg-mint text-ink border-mint'
                    : 'border-[#2a2b31] text-mist-2 hover:border-mint hover:text-mint'
                }`}
              >
                all
              </button>
              {allTags.map((t) => (
                <button
                  key={t}
                  onClick={() => setActive(t)}
                  className={`clickable px-2.5 py-1 rounded-full border text-[11px] transition-colors ${
                    active === t
                      ? 'bg-mint text-ink border-mint'
                      : 'border-[#2a2b31] text-mist-2 hover:border-mint hover:text-mint'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="space-y-5">
              {filtered.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i, duration: 0.4 }}
                  className="border border-[#23242a] rounded-lg p-4 md:p-5 hover:border-rose transition-colors"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h2 className="text-[15px] text-rose">
                      <span className="text-mist-2 mr-1">$</span>{p.name}
                    </h2>
                    <span className="text-[11px] text-graphite">{p.year}</span>
                  </div>
                  <p className="text-[12.5px] text-mist-2 italic mt-1">{p.tagline}</p>
                  <p className="text-[12.5px] text-[#c7cad2] mt-3 leading-relaxed">{p.description}</p>
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {p.tags.map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded-full bg-[#1a1b20] text-[10.5px] text-mint">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4 mt-4 text-[11.5px]">
                    <a href={p.github} target="_blank" rel="noreferrer" className="clickable text-mist-2 hover:text-rose transition-colors underline underline-offset-4 decoration-[#2a2b31]">
                      github →
                    </a>
                    {p.live && (
                      <a href={p.live} target="_blank" rel="noreferrer" className="clickable text-mist-2 hover:text-mint transition-colors underline underline-offset-4 decoration-[#2a2b31]">
                        live site →
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
