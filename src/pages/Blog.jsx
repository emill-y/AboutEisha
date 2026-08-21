import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import { blogPosts } from '../data/blogPosts'

export default function Blog() {
  const [selected, setSelected] = useState(blogPosts[0].id)
  const post = blogPosts.find((p) => p.id === selected)

  return (
    <PageTransition>
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <header className="mb-8 text-center">
          <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-mint-deep mb-2">field notes</p>
          <h1 className="text-[11vw] md:text-5xl" style={{ fontFamily: 'var(--font-display)' }}>Thoughts</h1>
        </header>

        <div
          className="grid md:grid-cols-2 rounded-sm overflow-hidden"
          style={{
            boxShadow: '0 40px 80px -30px rgba(23,24,28,0.3)',
            background: 'linear-gradient(90deg, #fff 0%, #fdfcfa 50%, #fff 100%)',
          }}
        >
          {/* left page: index */}
          <div className="p-6 md:p-10 md:border-r border-mist relative">
            <div className="absolute right-0 top-0 bottom-0 w-4 hidden md:block bg-gradient-to-r from-transparent to-mist/40" />
            <p className="font-mono text-[10.5px] uppercase tracking-widest text-graphite mb-6">contents</p>
            <ul className="space-y-5">
              {blogPosts.map((p) => (
                <li key={p.id}>
                  <button
                    onClick={() => setSelected(p.id)}
                    className={`clickable text-left w-full group transition-colors ${
                      selected === p.id ? 'text-rose-deep' : 'text-ink hover:text-rose-deep'
                    }`}
                  >
                    <p
                      className="text-[19px] leading-snug"
                      style={{ fontFamily: 'var(--font-display)', fontStyle: selected === p.id ? 'italic' : 'normal' }}
                    >
                      {p.title}
                    </p>
                    <p className="font-mono text-[10.5px] text-graphite mt-1">{p.date}</p>
                    <p className="text-[12.5px] text-graphite mt-1 group-hover:text-ink transition-colors">{p.preview}</p>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* right page: full post */}
          <div className="p-6 md:p-10 min-h-[420px] relative">
            <div className="absolute left-0 top-0 bottom-0 w-4 hidden md:block bg-gradient-to-l from-transparent to-mist/40" />
            <AnimatePresence mode="wait">
              <motion.article
                key={post.id}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.35 }}
              >
                <p className="font-mono text-[10.5px] text-mint-deep uppercase tracking-widest mb-2">{post.date}</p>
                <h2 className="text-2xl md:text-3xl mb-5" style={{ fontFamily: 'var(--font-display)' }}>
                  {post.title}
                </h2>
                <div className="space-y-4">
                  {post.body.split('\n\n').map((para, i) => (
                    <p key={i} className="text-[14.5px] leading-[1.85] text-[#2b2c31]">
                      {para}
                    </p>
                  ))}
                </div>
              </motion.article>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
