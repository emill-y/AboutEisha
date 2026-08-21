import { NavLink } from 'react-router-dom'

const tabs = [
  { path: '/', label: 'home.jsx', dot: 'bg-rose' },
  { path: '/projects', label: 'projects.js', dot: 'bg-mint' },
  { path: '/resume', label: 'resume.pdf', dot: 'bg-graphite' },
  { path: '/blog', label: 'thoughts.md', dot: 'bg-rose-deep' },
  { path: '/fun', label: 'fun.tsx', dot: 'bg-rose' },
]

export default function TabNav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-mist bg-[#f0f1f4]">
      <div className="flex items-center overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2 px-4 py-2.5 shrink-0">
          <span className="font-mono text-[11px] tracking-wide text-graphite select-none">
            eisha—yadav
          </span>
        </div>
        <nav className="flex items-stretch">
          {tabs.map((t) => (
            <NavLink
              key={t.path}
              to={t.path}
              end={t.path === '/'}
              className={({ isActive }) =>
                [
                  'clickable group relative flex items-center gap-2 px-4 py-2.5 border-r border-mist font-mono text-[12.5px] whitespace-nowrap transition-colors',
                  isActive
                    ? 'bg-card text-ink'
                    : 'bg-transparent text-graphite hover:bg-white/60 hover:text-ink',
                ].join(' ')
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span
                      className="absolute top-0 left-0 right-0 h-[2px]"
                      style={{ background: 'var(--color-rose-deep)' }}
                    />
                  )}
                  <span className={`inline-block h-1.5 w-1.5 rounded-full ${t.dot} opacity-80`} />
                  {t.label}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
