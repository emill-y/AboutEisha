import { useEffect, useRef, useState } from 'react'
import { files } from '../vfs'
import { profile, projects, education, experience, research, skills, awards, posts, hobbies } from '../data/content'
import { tracks } from '../data/playlist'
import { FileIcon, Icon } from './Icons'

// Canned answers, built only from the site's own content.
const topics = [
  {
    keys: ['study', 'school', 'berkeley', 'major', 'education', 'college', 'class'],
    q: 'What is she studying?',
    a: () => [`${education.degree} at ${education.school} (${education.period}).`, `Interests: ${education.interests.join(', ')}.`],
    file: 'resume/resume.md',
  },
  {
    keys: ['build', 'built', 'project', 'riya', 'brandmap', 'mymani', 'flag', 'app', 'made'],
    q: 'What has she built?',
    a: () => projects.map((p) => `${p.name} (${p.year}): ${p.tagline}`),
    file: 'projects/riya.md',
  },
  {
    keys: ['experience', 'work', 'founder', 'alexa', 'job', 'company', 'startup', 'helpage'],
    q: 'What’s her experience?',
    a: () => experience.map((e) => `${e.role}, ${e.org} (${e.period})`),
    file: 'resume/resume.md',
  },
  {
    keys: ['research', 'mit', 'lab', 'cosmos', 'ml', 'machine learning', 'ai'],
    q: 'Has she done research?',
    a: () => research.map((r) => `${r.org}: ${r.desc}`),
    file: 'resume/resume.md',
  },
  {
    keys: ['skill', 'language', 'python', 'stack', 'tools', 'react', 'swift', 'figma'],
    q: 'What are her skills?',
    a: () => Object.entries(skills).map(([k, v]) => `${k}: ${v.join(', ')}`),
    file: 'resume/skills.json',
  },
  {
    keys: ['award', 'grant', 'recognition', 'prize'],
    q: 'Any awards?',
    a: () => awards.map((a) => `${a.amount} ${a.name}`),
    file: 'resume/resume.md',
  },
  {
    keys: ['listen', 'music', 'song', 'playlist', 'noah', 'spotify'],
    q: 'What’s she listening to?',
    a: () => tracks.slice(0, 5).map((t) => `${t.artist} – ${t.title}`),
    file: 'playlist.m3u',
  },
  {
    keys: ['write', 'blog', 'essay', 'post', 'writing', 'thought'],
    q: 'What does she write about?',
    a: () => posts.map((p) => p.title),
    file: Object.keys(files).find((p) => p.startsWith('writing/')),
  },
  {
    keys: ['fun', 'hobby', 'hobbies', 'yoga', 'debate', 'food', 'free time'],
    q: 'What does she do for fun?',
    a: () => hobbies.map((h) => `${h.title}: ${h.desc}`),
    file: 'fun/hobbies.md',
  },
  {
    keys: ['contact', 'email', 'reach', 'linkedin', 'github', 'hire', 'intern', 'resume', 'résumé'],
    q: 'How do I contact her?',
    a: () => [`Email: ${profile.email}`, `LinkedIn: in/eishayadav`, `GitHub: emill-y`],
    file: 'contact/contact.json',
  },
]

const suggestions = [topics[1], topics[0], topics[9], topics[6]]

function answer(text) {
  const t = text.toLowerCase()
  const hit = topics.find((tp) => tp.keys.some((k) => new RegExp(`\\b${k}`).test(t)))
  if (hit) return { lines: hit.a(), file: hit.file }
  return {
    lines: ['I can answer questions about Eisha’s projects, experience, research, skills, writing, music and how to reach her. Try one of the suggestions, or open README.md.'],
    file: 'README.md',
  }
}

export default function Chat({ active, onLink, onClose, className }) {
  const [msgs, setMsgs] = useState([])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const scroller = useRef(null)

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: 'smooth' })
  }, [msgs, typing])

  const ask = (q) => {
    if (!q.trim() || typing) return
    setMsgs((m) => [...m, { role: 'user', text: q }])
    setInput('')
    setTyping(true)
    setTimeout(() => {
      setMsgs((m) => [...m, { role: 'bot', ...answer(q) }])
      setTyping(false)
    }, 450)
  }

  return (
    <aside aria-label="Chat" className={`flex shrink-0 flex-col border-l border-border bg-chrome ${className}`}>
      <div className="flex h-[35px] shrink-0 items-center justify-between pl-3 pr-2">
        <span className="rounded-[4px] bg-[#ffffff12] px-2 py-0.5 text-[13px] text-fg">Chat</span>
        <div className="flex items-center gap-0.5 text-fg-dim">
          <HeadBtn label="New chat" onClick={() => setMsgs([])}><Icon.Plus className="h-4 w-4" /></HeadBtn>
          <HeadBtn label="More"><Icon.More className="h-4 w-4" /></HeadBtn>
          <HeadBtn label="Close chat" onClick={onClose}><Icon.Close className="h-4 w-4" /></HeadBtn>
        </div>
      </div>

      <div ref={scroller} className="scroll min-h-0 flex-1 overflow-y-auto px-4 py-3">
        {msgs.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center px-2 text-center">
            <Icon.Sparkle className="h-12 w-12 text-fg-dim" />
            <h2 className="mt-4 text-[14px] font-semibold text-fg">Ask about Eisha</h2>
            <p className="mt-1.5 text-[12.5px] leading-relaxed text-fg-dim">
              Answers come from the files in this workspace. Start with{' '}
              <button type="button" onClick={() => onLink('README.md')} className="text-accent-fg hover:underline">README.md</button>{' '}
              for the quick version.
            </p>
            <div className="mt-5 flex w-full flex-col gap-1.5">
              {suggestions.map((s) => (
                <button
                  key={s.q}
                  type="button"
                  onClick={() => ask(s.q)}
                  className="rounded-md border border-[#3c3c3c] px-3 py-1.5 text-left text-[12.5px] text-fg hover:border-[#4a4a4a] hover:bg-hover"
                >
                  {s.q}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {msgs.map((m, i) =>
              m.role === 'user' ? (
                <div key={i} className="ml-6 rounded-lg bg-[#2b2b2b] px-3 py-2 text-[13px] text-fg">{m.text}</div>
              ) : (
                <div key={i} className="text-[13px] leading-relaxed text-fg">
                  {m.lines.length > 1 ? (
                    <ul className="list-disc space-y-1 pl-4">{m.lines.map((l) => <li key={l}>{l}</li>)}</ul>
                  ) : (
                    <p>{m.lines[0]}</p>
                  )}
                  {m.file && (
                    <button
                      type="button"
                      onClick={() => onLink(m.file)}
                      className="mt-2 inline-flex items-center gap-1.5 rounded-[4px] border border-[#3c3c3c] px-2 py-0.5 text-[12px] text-fg-dim hover:bg-hover hover:text-fg"
                    >
                      <FileIcon name={files[m.file].name} /> {m.file}
                    </button>
                  )}
                </div>
              ),
            )}
            {typing && <p className="text-[13px] text-fg-dim">Thinking<span className="blink">…</span></p>}
          </div>
        )}
      </div>

      <div className="shrink-0 px-3 pb-3">
        <p className="mb-2 rounded-md border border-border bg-[#1f1f1f] px-3 py-2 text-[12px] leading-relaxed text-fg-dim">
          <span className="font-semibold text-fg">Tip:</span> press <span className="text-accent-fg">⌘P</span> to jump to any file, or type{' '}
          <span className="text-accent-fg">help</span> in the terminal.
        </p>
        <form
          onSubmit={(e) => { e.preventDefault(); ask(input) }}
          className="rounded-md border border-[#3c3c3c] bg-[#1f1f1f] focus-within:border-accent"
        >
          {active && (
            <div className="px-2 pt-2">
              <span className="inline-flex items-center gap-1 rounded-[4px] border border-[#3c3c3c] px-1.5 py-0.5 text-[11.5px] text-fg-dim">
                <FileIcon name={files[active].name} /> <span className="italic">{files[active].name}</span>
              </span>
            </div>
          )}
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything about Eisha"
            aria-label="Ask a question"
            className="h-9 w-full bg-transparent px-3 text-[13px] text-fg placeholder:text-fg-faint"
          />
          <div className="flex items-center gap-3 px-2 pb-1.5 text-[12px] text-fg-dim">
            <span>Ask</span>
            <span>Workspace</span>
            <button type="submit" aria-label="Send" className="ml-auto grid h-6 w-6 place-items-center rounded-[4px] hover:bg-hover hover:text-fg">
              <Icon.Send className="h-4 w-4" />
            </button>
          </div>
        </form>
      </div>
    </aside>
  )
}

function HeadBtn({ label, children, ...p }) {
  return (
    <button type="button" aria-label={label} title={label} className="grid h-[22px] w-[22px] place-items-center rounded-[4px] hover:bg-[#ffffff1a]" {...p}>
      {children}
    </button>
  )
}
