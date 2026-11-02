import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  profile, projects, education, research, experience, skills, leadership,
  teaching, awards, posts, currently, hobbies, traits,
} from '../data/content'

function Label({ children, className = '' }) {
  return (
    <h3 className={`mb-3 font-mono text-[10.5px] uppercase tracking-[0.2em] text-raspberry ${className}`}>{children}</h3>
  )
}

function Chip({ children }) {
  return (
    <span className="rounded-full border border-line bg-card px-2.5 py-0.5 text-[11.5px] text-cocoa">{children}</span>
  )
}

function Card({ children, className = '' }) {
  return <div className={`rounded-2xl border border-line bg-card p-5 ${className}`}>{children}</div>
}

/* ---------- 01 projects ---------- */
function Projects() {
  return (
    <div className="space-y-3">
      {projects.map((p) => (
        <Card key={p.name}>
          <div className="flex items-baseline justify-between gap-3">
            <h4 className="font-display text-[28px] leading-none">{p.name}</h4>
            <span className="font-mono text-[11px] text-muted">{p.year}</span>
          </div>
          <p className="mt-2 text-[14.5px] font-medium text-cocoa">{p.tagline}</p>
          <p className="mt-2 text-[14px] leading-relaxed text-muted">{p.description}</p>
          <div className="mt-4 flex flex-wrap items-center gap-1.5">
            <span className="rounded-full bg-raspberry px-2.5 py-0.5 text-[11.5px] text-cream">{p.highlight}</span>
            {p.tags.map((t) => <Chip key={t}>{t}</Chip>)}
          </div>
        </Card>
      ))}
    </div>
  )
}

/* ---------- 02 résumé ---------- */
function Resume() {
  return (
    <div>
      <div className="no-print mb-8 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => window.print()}
          className="rounded-full bg-ink px-4 py-2 text-[13px] text-cream transition-colors hover:bg-raspberry"
        >
          Print / save as PDF
        </button>
        <a
          href={`mailto:${profile.email}`}
          className="rounded-full border border-line bg-card px-4 py-2 text-[13px] text-cocoa transition-colors hover:border-ink"
        >
          {profile.email}
        </a>
      </div>

      <Label>Education</Label>
      <Card className="mb-8">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <p className="font-medium">{education.school}</p>
          <p className="font-mono text-[11.5px] text-muted">{education.period}</p>
        </div>
        <p className="mt-0.5 text-[14px] text-muted">{education.degree} · {education.location}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {education.interests.map((i) => <Chip key={i}>{i}</Chip>)}
        </div>
      </Card>

      <Label>Experience</Label>
      <ol className="mb-8 space-y-5 border-l border-line pl-5">
        {experience.map((e) => (
          <li key={e.org} className="relative">
            <span className="absolute -left-[25px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-cream bg-raspberry" />
            <div className="flex flex-wrap items-baseline justify-between gap-x-3">
              <p className="font-medium">{e.role} <span className="font-normal text-muted">· {e.org}</span></p>
              <p className="font-mono text-[11.5px] text-muted">{e.period}</p>
            </div>
            <ul className="mt-1.5 space-y-1">
              {e.points.map((pt) => (
                <li key={pt} className="text-[13.5px] leading-relaxed text-muted">{pt}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>

      <Label>Research</Label>
      <div className="mb-8 space-y-2.5">
        {research.map((r) => (
          <p key={r.org} className="text-[13.5px] leading-relaxed text-muted">
            <span className="font-medium text-ink">{r.org}.</span> {r.desc}
          </p>
        ))}
      </div>

      <Label>Skills</Label>
      <div className="mb-8 space-y-3">
        {Object.entries(skills).map(([cat, list]) => (
          <div key={cat} className="grid gap-2 sm:grid-cols-[96px_1fr]">
            <p className="text-[13px] text-cocoa">{cat}</p>
            <div className="flex flex-wrap gap-1.5">{list.map((s) => <Chip key={s}>{s}</Chip>)}</div>
          </div>
        ))}
      </div>

      <Label>Grants &amp; recognition</Label>
      <div className="mb-8 grid gap-2.5">
        {awards.map((a) => (
          <Card key={a.name} className="flex gap-4 !p-4">
            <span className="font-display w-[78px] shrink-0 text-[26px] leading-none text-raspberry">{a.amount}</span>
            <span>
              <span className="block text-[14px] font-medium">{a.name}</span>
              <span className="block text-[13px] leading-relaxed text-muted">{a.desc}</span>
            </span>
          </Card>
        ))}
      </div>

      <Label>Leadership &amp; activities</Label>
      <dl className="mb-8 divide-y divide-line rounded-2xl border border-line bg-card">
        {leadership.map((l) => (
          <div key={l.name} className="px-4 py-3">
            <dt className="text-[14px] font-medium">{l.name} <span className="font-normal text-muted">· {l.role}</span></dt>
            <dd className="text-[13px] text-muted">{l.desc}</dd>
          </div>
        ))}
      </dl>

      <Label>Teaching &amp; service</Label>
      <dl className="divide-y divide-line rounded-2xl border border-line bg-card">
        {teaching.map((t) => (
          <div key={t.name} className="px-4 py-3">
            <dt className="text-[14px] font-medium">{t.name}</dt>
            <dd className="text-[13px] text-muted">{t.desc}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

/* ---------- 03 writing ---------- */
function Writing() {
  const [open, setOpen] = useState(null)
  return (
    <div className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-card">
      {posts.map((p, i) => {
        const isOpen = open === i
        return (
          <article key={p.title}>
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-blush/30"
            >
              <span>
                <span className="block font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted">{p.date}</span>
                <span className="font-display mt-1 block text-[23px] leading-tight">{p.title}</span>
                {!isOpen && <span className="mt-1 block text-[13.5px] text-muted">{p.preview}</span>}
              </span>
              <span className={`mt-5 shrink-0 text-cocoa transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>+</span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="space-y-3.5 px-5 pb-6 text-[14.5px] leading-[1.75] text-cocoa">
                    {p.body.split('\n\n').map((para) => <p key={para.slice(0, 24)}>{para}</p>)}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </article>
        )
      })}
    </div>
  )
}

/* ---------- 04 contact ---------- */
function Contact() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }
  const rows = [
    { label: 'LinkedIn', value: 'in/eishayadav', href: profile.links.linkedin },
    { label: 'GitHub', value: 'emill-y', href: profile.links.github },
    { label: 'Beli', value: '@eishaa', href: profile.links.beli },
  ]
  return (
    <div>
      <p className="mb-6 max-w-[46ch] text-[15px] leading-relaxed text-cocoa">
        Always happy to talk about human-centered AI, elder-care tech, research, or a good matcha spot. Email is the
        fastest way to reach me.
      </p>
      <Card className="mb-3 !p-0">
        <div className="flex flex-wrap items-center justify-between gap-3 p-5">
          <div>
            <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted">Email</p>
            <a href={`mailto:${profile.email}`} className="font-display text-[26px] leading-tight hover:text-raspberry sm:text-[30px]">
              {profile.email}
            </a>
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={copy} className="rounded-full border border-line px-4 py-2 text-[13px] text-cocoa transition-colors hover:border-ink">
              {copied ? 'Copied ✓' : 'Copy'}
            </button>
            <a href={`mailto:${profile.email}`} className="rounded-full bg-ink px-4 py-2 text-[13px] text-cream transition-colors hover:bg-raspberry">
              Write
            </a>
          </div>
        </div>
      </Card>
      <div className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-card">
        {rows.map((r) => (
          <a key={r.label} href={r.href} target="_blank" rel="noreferrer" className="group flex items-center justify-between px-5 py-4 transition-colors hover:bg-blush/30">
            <span>
              <span className="block font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted">{r.label}</span>
              <span className="text-[16px]">{r.value}</span>
            </span>
            <span className="text-cocoa transition-transform group-hover:translate-x-1">↗</span>
          </a>
        ))}
      </div>
    </div>
  )
}

/* ---------- 05 currently ---------- */
function Currently() {
  const tints = ['bg-blush/60', 'bg-powder/60', 'bg-butter/60', 'bg-linen']
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {currently.map((c, i) => (
        <div key={c.label} className={`rounded-2xl p-5 ${tints[i % tints.length]}`}>
          <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-cocoa/70">Currently {c.label.toLowerCase()}</p>
          <p className="font-display mt-2 text-[22px] leading-snug">{c.value}</p>
        </div>
      ))}
    </div>
  )
}

/* ---------- 06 fun ---------- */
function Fun() {
  return (
    <div>
      <p className="mb-6 text-[15px] text-cocoa">A few things that probably won’t make it onto my résumé.</p>
      <div className="mb-9 grid gap-3 sm:grid-cols-2">
        {hobbies.map((h) => (
          <Card key={h.title}>
            <h4 className="font-display text-[24px] leading-none">{h.title}</h4>
            <p className="mt-2 text-[13.5px] leading-relaxed text-muted">{h.desc}</p>
          </Card>
        ))}
      </div>
      <Label>Field-verified personality traits</Label>
      <ul className="space-y-2.5">
        {traits.map((t) => (
          <li key={t} className="flex gap-3 text-[14.5px] text-cocoa">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-raspberry" />
            {t}
          </li>
        ))}
      </ul>
      <a
        href={profile.links.beli}
        target="_blank"
        rel="noreferrer"
        className="mt-9 flex items-center justify-between rounded-2xl bg-raspberry px-5 py-4 text-cream transition-colors hover:bg-raspberry-deep"
      >
        <span>
          <span className="block font-mono text-[10.5px] uppercase tracking-[0.16em] text-cream/70">Food log</span>
          <span className="font-display text-[22px]">Every spot I’ve rated, on Beli ↗</span>
        </span>
      </a>
    </div>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const sections = {
  projects: Projects,
  resume: Resume,
  writing: Writing,
  contact: Contact,
  currently: Currently,
  fun: Fun,
}
