import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition'
import { LaptopIcon, PaperIcon, BookIcon, PhoneIcon, SmiskiIcon, ReceiptIcon } from '../icons/DeskObjects'

const items = [
  {
    to: '/projects',
    label: 'projects',
    Icon: LaptopIcon,
    style: { top: '8%', left: '22%', width: 190, rotate: -7 },
  },
  {
    to: '/resume',
    label: 'resume',
    Icon: PaperIcon,
    style: { top: '10%', right: '47%', width: 130, rotate: 1 },
  },
  {
    to: '/blog',
    label: 'thoughts',
    Icon: BookIcon,
    style: { bottom: '10%', left: '40%', width: 190, rotate: 4 },
  },
  {
    to: 'https://www.linkedin.com/in/eishayadav/',
    label: 'linkedin',
    Icon: PhoneIcon,
    style: { bottom: '65%', right: '30%', width: 95, rotate: 6 },
  },
  {
    to: '/fun',
    label: 'the fun stuff',
    Icon: SmiskiIcon,
    style: { top: '38%', right: '15%', width: 110, rotate: 3 },
  },
  {
    to: 'https://beliapp.co/profile/eishaa',
    label: 'food log',  
    Icon: ReceiptIcon,
    style: { bottom: '35%', left: '15%', width: 100, rotate: -4 },
  },
]

function DeskItem({ to, label, Icon, style, index }) {
  return (
    <motion.div
      className="absolute"
      style={{ top: style.top, left: style.left, right: style.right, bottom: style.bottom }}
      initial={{ opacity: 0, y: 16, rotate: 0 }}
      animate={{ opacity: 1, y: 0, rotate: style.rotate }}
      transition={{ delay: 0.25 + index * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link to={to} className="clickable group block" style={{ width: style.width }}>
        <motion.div
          whileHover={{ rotate: 0, y: -6, scale: 1.04 }}
          transition={{ type: 'spring', stiffness: 260, damping: 18 }}
          className="flatlay-shadow"
        >
          <Icon className="w-full h-auto" />
        </motion.div>
        <span
          className="mt-2 block text-center text-[13px] italic text-graphite group-hover:text-rose-deep transition-colors"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {label} →
        </span>
      </Link>
    </motion.div>
  )
}

export default function Home() {
  return (
    <PageTransition>
      {/* ---- mobile / small screens: simple stacked layout ---- */}
      <div className="md:hidden px-6 py-14">
        <Hero />
        <div className="grid grid-cols-2 gap-6 mt-12">
          {items.map((it) => (
            <Link key={it.to} to={it.to} className="clickable flex flex-col items-center gap-2">
              <it.Icon className="w-24 h-auto flatlay-shadow" />
              <span className="text-[13px] italic text-graphite" style={{ fontFamily: 'var(--font-display)' }}>
                {it.label}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* ---- desktop: full aerial desk view ---- */}
      <div className="hidden md:block relative w-full desk-grid" style={{ minHeight: 'calc(100vh - 45px)' }}>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <div className="pointer-events-auto">
            <Hero />
          </div>
        </div>
        {items.map((it, i) => (
          <DeskItem key={it.to} {...it} index={i} />
        ))}
      </div>
    </PageTransition>
  )
}

function Hero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center px-4"
    >
      <p className="font-mono text-[11px] tracking-[0.25em] text-mint-deep uppercase mb-3">
        cs + engineering student
      </p>
      <h1
        className="text-[15vw] md:text-[6.2vw] leading-[0.92] text-ink"
        style={{ fontFamily: 'var(--font-display)', fontWeight: 500 }}
      >
        Eisha Yadav
      </h1>
      <p className="mt-4 font-mono text-[13px] md:text-[14px] text-graphite italic">
        obsessed with the intersection of AI, robotics & social impact.
      </p>
      <div className="mt-6 flex items-center justify-center gap-4 font-mono text-[12px] text-graphite flex-wrap">
        <a href="mailto:eishayadav@berkeley.edu" className="clickable hover:text-rose-deep transition-colors underline decoration-mist underline-offset-4">
          eishayadav@berkeley.edu
        </a>
        <span className="text-mist-2">·</span>
        <a href="https://github.com/emill-y" target="_blank" rel="noreferrer" className="clickable hover:text-rose-deep transition-colors underline decoration-mist underline-offset-4">
          github
        </a>
      </div>
    </motion.div>
  )
}
