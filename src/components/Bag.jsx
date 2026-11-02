import { motion } from 'framer-motion'
import useMediaQuery from '../useMediaQuery'

const CANVAS = { desktop: { w: 1200, h: 640 }, mobile: { w: 600, h: 830 } }

export default function Bag({ items, hovered, setHovered, activeSlug, onOpen }) {
  const isMobile = useMediaQuery('(max-width: 720px)')
  const mode = isMobile ? 'mobile' : 'desktop'
  const { w: W, h: H } = CANVAS[mode]

  return (
    <div className="bag-surface overflow-hidden rounded-[28px] border border-line/80 shadow-[0_1px_0_rgba(255,255,255,0.8)_inset,0_30px_60px_-40px_rgba(90,50,40,0.35)]">
      <div className="relative w-full" style={{ aspectRatio: `${W} / ${H}` }}>
        {items.map((item, i) => {
          const p = item[mode]
          const dim = hovered && hovered !== item.slug
          return (
            <motion.button
              key={item.slug}
              type="button"
              aria-label={`${String(i + 1).padStart(2, '0')}: ${item.object}, open ${item.section}`}
              data-active={hovered === item.slug || activeSlug === item.slug}
              className="bag-item group absolute block cursor-pointer select-none"
              style={{
                left: `${(p.x / W) * 100}%`,
                top: `${(p.y / H) * 100}%`,
                width: `${(p.w / W) * 100}%`,
                zIndex: hovered === item.slug ? 5 : 1,
              }}
              initial={{ opacity: 0, y: -18, scale: 1.04 }}
              animate={{ opacity: dim ? 0.42 : 1, y: 0, scale: 1 }}
              transition={{
                opacity: { duration: 0.3 },
                default: { delay: 0.25 + i * 0.07, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
              }}
              onMouseEnter={() => setHovered(item.slug)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(item.slug)}
              onBlur={() => setHovered(null)}
              onClick={() => onOpen(item.slug)}
            >
              <motion.div
                style={{ rotate: p.r }}
                whileHover={{ y: -8, rotate: 0, scale: 1.035 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              >
                <img
                  src={item.image}
                  alt=""
                  draggable={false}
                  decoding="async"
                  className={`cutout block h-auto w-full ${item.paper ? 'rounded-[3px]' : ''}`}
                  style={{ aspectRatio: item.ratio }}
                />
              </motion.div>

              {/* number tag */}
              <span className="pointer-events-none absolute -left-1 -top-1 grid h-6 w-6 place-items-center rounded-full bg-card/95 font-mono text-[10px] text-raspberry shadow-[0_2px_8px_rgba(90,50,40,0.15)] ring-1 ring-line sm:-left-2 sm:-top-2 sm:h-7 sm:w-7 sm:text-[11px]">
                {String(i + 1).padStart(2, '0')}
              </span>

              {/* caption on hover */}
              <span className="pointer-events-none absolute left-1/2 top-full mt-3 hidden -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-full bg-ink px-3 py-1.5 text-[12px] text-cream opacity-0 shadow-lg transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 md:block">
                <span className="text-mauve">{item.object}</span>
                <span className="mx-1.5 text-cream/40">→</span>
                {item.section}
              </span>
            </motion.button>
          )
        })}

        <p className="pointer-events-none absolute bottom-3 right-4 font-mono text-[10px] uppercase tracking-[0.18em] text-muted/80 sm:bottom-5 sm:right-6 sm:text-[10.5px]">
          {isMobile ? 'Tap an item' : `Click an item · or press 1–${items.length}`}
        </p>
      </div>
    </div>
  )
}
