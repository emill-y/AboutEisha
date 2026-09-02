import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'

const experience = [
  {
    role: 'Neurotechnology Engineering Intern',
    org: 'Ampa',
    period: '2026',
    points: [
      'Developed neurotechnology hardware and software for electrical neuromodulation research targeting treatment-resistant depression.',
      'Worked across embedded systems, circuitry, hardware prototyping, and code to support stimulation-device development and experimental testing.',
    ],
  },
  {
    role: 'Founder & CEO',
    org: 'Alexa Academy',
    period: '2024 – Present',
    points: [
      'Built and scaled an education technology venture to 50+ paying customers and $10K+ revenue, owning product, GTM, sales, operations, and engineering.',
      'Developed AI-powered debate evaluation tooling for automated feedback, personalized practice, and structured reasoning assessment.',
    ],
  },
  {
    role: 'Founder & Product Developer',
    org: 'Ayur / Riya',
    period: '2024 – Present',
    points: [
      'Architected and deployed a mobile platform for elder-care social connection spanning user research, UX, engineering, testing, and organizational adoption.',
      'Deployed the platform at 10+ elder-care centers, taking the project from an initial idea to an adopted product.',
    ],
  },
  {
    role: 'Founder & Youth Council Leader',
    org: 'American Friends of HelpAge India',
    period: '2024 – Present',
    points: [
      'Founded and scaled a 50+ member organization across 7+ states focused on engaging young people in issues affecting older adults.',
      'Developed partnerships and secured competitive philanthropic funding to support elder-care initiatives.',
    ],
  },
]

const education = {
  school: 'University of California, Berkeley',
  degree: 'B.A. Computer Science',
  period: 'Aug. 2026 – Present',
  details: 'Berkeley, CA',
}

const projects = [
  {
    name: 'BrandMap',
    desc: 'Engineered a full-stack platform for analyzing teenage brand preferences; built a React frontend, Java/Spring backend, Firebase data layer, and interactive graph visualization.',
  },
  {
    name: 'High-Altitude Balloon Engineering',
    desc: 'Designed and launched high-altitude balloon payloads for near-space flight, integrating electronics, sensors, communications, and payload engineering.',
  },
]

const research = [
  {
    role: 'Researcher',
    org: 'MIT Media Lab',
    location: 'Cambridge, MA',
    period: '2026 – Present',
    desc: 'Research fluid interfaces and human-AI interaction, exploring adaptive interfaces and AI-enabled approaches to eldercare and social connection.',
  },
  {
    role: 'Researcher — Jason Eshraghian',
    org: 'University of California, Santa Cruz',
    location: 'Santa Cruz, CA',
    period: '2025 – Present',
    desc: 'Research brain-inspired machine learning and neuromorphic computing, exploring biologically inspired computational architectures and learning paradigms.',
  },
]

const skills = {
  Languages: ['Python', 'Java', 'C++', 'JavaScript', 'Swift', 'SQL', 'HTML/CSS'],
  'AI/ML': [
    'PyTorch',
    'CNNs',
    'RNNs',
    'LSTMs',
    'Transformers',
    'Computer Vision',
    'NLP',
    'Model Evaluation',
    'Neuromorphic Computing',
  ],
  Engineering: [
    'React',
    'Vite',
    'Tailwind',
    'Spring Boot',
    'SwiftUI',
    'Firebase',
    'REST APIs',
    'Git/GitHub',
    'Embedded Systems',
    'Electronics',
  ],
}

const leadership = [
  {
    role: 'Co-Leader',
    org: 'TEDx Menlo',
    period: '2023 – 2026',
    desc: 'Led execution of a 200+ attendee conference spanning speaker strategy, branding, marketing, and operations.',
  },
  {
    role: 'Recipient',
    org: 'Competitive Grants',
    period: '2024 – 2026',
    desc: 'Awarded $3.4K Koum Family & HANDs Foundation Grant for the Sayodhya Home job program; secured a $1.6K SEIA grant and a $1K India Philanthropy Alliance grant.',
  },
]

export default function Resume() {
  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto px-6 py-16 flex flex-col items-center">
        <div className="w-full flex justify-end mb-4">
          <a
            href="#"
            className="clickable font-mono text-[12px] px-4 py-2 rounded-full border border-mist-2 text-graphite hover:border-rose-deep hover:text-rose-deep transition-colors"
          >
            ↓ download pdf
          </a>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20, rotate: -1.2 }}
          animate={{ opacity: 1, y: 0, rotate: -0.6 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full bg-card"
          style={{
            boxShadow:
              '0 40px 70px -25px rgba(23,24,28,0.28), 0 2px 4px rgba(23,24,28,0.08)',
          }}
        >
          <div className="absolute left-0 right-0 top-1/3 h-px bg-mist" />

          <div className="p-8 md:p-14">
            <header className="flex flex-wrap items-start justify-between gap-4 border-b border-mist pb-6 mb-8">
              <div>
                <h1
                  className="text-4xl md:text-5xl"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Eisha Yadav
                </h1>

                <p className="font-mono text-[12px] text-graphite mt-2">
                  3042050690 · Berkeley, CA · eishayadav@berkeley.edu ·{' '}
                  <a href="#" className="hover:text-rose-deep transition-colors">
                    LinkedIn
                  </a>{' '}
                  ·{' '}
                  <a href="#" className="hover:text-rose-deep transition-colors">
                    GitHub
                  </a>
                </p>
              </div>

              <span className="font-mono text-[11px] text-mint-deep uppercase tracking-[0.2em] mt-1">
                résumé
              </span>
            </header>

            <Section title="Education">
              <div className="flex flex-wrap justify-between gap-2">
                <div>
                  <p className="font-medium">{education.school}</p>
                  <p className="text-[13.5px] text-graphite">
                    {education.degree}
                  </p>
                </div>

                <p className="font-mono text-[12px] text-graphite">
                  {education.period}
                </p>
              </div>

              <p className="text-[13px] text-graphite mt-2">
                {education.details}
              </p>
            </Section>

            <Section title="Experience">
              <div className="space-y-6">
                {experience.map((e) => (
                  <div key={`${e.role}-${e.org}`}>
                    <div className="flex flex-wrap justify-between gap-2">
                      <p className="font-medium">
                        {e.role}{' '}
                        <span className="text-graphite font-normal">
                          — {e.org}
                        </span>
                      </p>

                      <p className="font-mono text-[12px] text-graphite">
                        {e.period}
                      </p>
                    </div>

                    <ul className="mt-1.5 space-y-1">
                      {e.points.map((pt, i) => (
                        <li
                          key={i}
                          className="text-[13px] text-graphite pl-4 relative before:content-['—'] before:absolute before:left-0 before:text-rose"
                        >
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="Research">
              <div className="space-y-4">
                {research.map((r) => (
                  <div key={`${r.role}-${r.org}`}>
                    <div className="flex flex-wrap justify-between gap-2">
                      <p className="font-medium">
                        {r.role}{' '}
                        <span className="text-graphite font-normal">
                          — {r.org}
                        </span>
                      </p>

                      <p className="font-mono text-[12px] text-graphite">
                        {r.period}
                      </p>
                    </div>

                    <p className="text-[13px] text-graphite mt-0.5">
                      {r.desc}
                    </p>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="Select Technical Projects">
              <div className="space-y-3">
                {projects.map((project) => (
                  <div key={project.name}>
                    <p className="font-medium text-[13.5px]">
                      {project.name}
                    </p>

                    <p className="text-[13px] text-graphite mt-0.5">
                      {project.desc}
                    </p>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="Technical Skills">
              <div className="grid sm:grid-cols-3 gap-4">
                {Object.entries(skills).map(([cat, list]) => (
                  <div key={cat}>
                    <p className="font-mono text-[11px] uppercase tracking-wide text-mint-deep mb-1.5">
                      {cat}
                    </p>

                    <ul className="text-[13px] text-graphite space-y-0.5">
                      {list.map((s) => (
                        <li key={s}>{s}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="Leadership & Recognition" last>
              <div className="space-y-4">
                {leadership.map((l) => (
                  <div key={`${l.role}-${l.org}`}>
                    <div className="flex flex-wrap justify-between gap-2">
                      <p className="font-medium">
                        {l.org}{' '}
                        <span className="text-graphite font-normal">
                          — {l.role}
                        </span>
                      </p>

                      <p className="font-mono text-[12px] text-graphite">
                        {l.period}
                      </p>
                    </div>

                    <p className="text-[13px] text-graphite mt-0.5">
                      {l.desc}
                    </p>
                  </div>
                ))}
              </div>
            </Section>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  )
}

function Section({ title, children, last }) {
  return (
    <section className={last ? '' : 'mb-8'}>
      <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-rose-deep mb-3">
        {title}
      </h2>

      {children}
    </section>
  )
}
