export default function Inventory({ items, hovered, setHovered, onOpen }) {
  return (
    <section id="index" className="scroll-mt-20 pt-16 sm:pt-20">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-raspberry">The index</p>
          <h2 className="font-display mt-2 text-[34px] leading-none sm:text-[42px]">Everything, at a glance</h2>
        </div>
        <p className="hidden max-w-[30ch] text-right text-[13.5px] text-muted sm:block">
          Same contents as the bag, as a list. Each row opens its panel.
        </p>
      </div>

      <ol className="overflow-hidden rounded-2xl border border-line bg-card">
        {items.map((item, i) => (
          <li key={item.slug} className="border-b border-line last:border-b-0">
            <button
              type="button"
              onClick={() => onOpen(item.slug)}
              onMouseEnter={() => setHovered(item.slug)}
              onMouseLeave={() => setHovered(null)}
              className={`group grid w-full grid-cols-[44px_56px_1fr_auto] items-center gap-3 px-4 py-3.5 text-left transition-colors sm:grid-cols-[52px_64px_200px_1fr_auto] sm:gap-5 sm:px-6 sm:py-4 ${
                hovered === item.slug ? 'bg-blush/35' : 'hover:bg-blush/35'
              }`}
            >
              <span className="font-mono text-[12px] text-raspberry">{String(i + 1).padStart(2, '0')}</span>
              <span className="block h-12 w-14 sm:h-14 sm:w-16">
                <img src={item.image} alt="" className="h-full w-full object-contain drop-shadow-[0_4px_6px_rgba(90,50,40,0.18)]" />
              </span>
              <span className="min-w-0">
                <span className="font-display block text-[22px] leading-tight text-ink">{item.section}</span>
                <span className="block truncate text-[12.5px] text-muted sm:hidden">{item.blurb}</span>
                <span className="hidden text-[12px] text-muted sm:block">{item.object}</span>
              </span>
              <span className="hidden text-[14px] text-cocoa sm:block">{item.blurb}</span>
              <span
                aria-hidden="true"
                className="grid h-8 w-8 place-items-center rounded-full border border-line text-cocoa transition-all group-hover:border-raspberry group-hover:bg-raspberry group-hover:text-cream"
              >
                →
              </span>
            </button>
          </li>
        ))}
      </ol>
    </section>
  )
}
