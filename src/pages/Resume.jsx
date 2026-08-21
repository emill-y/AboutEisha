import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'

const experience = [
  {
    role: 'Founder & Developer',
    org: 'Ayur / Riya',
    period: '2024 – Present',
    points: [
      'Founded Ayur to explore technology-driven solutions to elderly loneliness and developed Riya, a mobile app focused on helping older adults build meaningful social connections.',
      'Worked directly with elder care communities and onboarded Riya at 10+ elder care centers, taking the project from an initial idea to a deployed product.',
    ],
  },
  {
    role: 'Founder & CEO',
    org: 'Alexa Academy',
    period: '2024 – Present',
    points: [
      'Founded a debate and public speaking education initiative providing workshops, camps, and curriculum for middle school students.',
      'Grew Alexa Academy to 50 paying customers and generated $10K in revenue while developing an AI-powered tool to help students practice debate.',
    ],
  },
  {
    role: 'Founder & Youth Council Leader',
    org: 'American Friends of HelpAge India',
    period: '2024 – Present',
    points: [
      'Founded and led a youth council focused on engaging young people in issues affecting older adults and expanding support for elder-care initiatives.',
      'Built a community of 50+ members across 7+ states and helped support initiatives including elder housing and access to cataract surgeries.',
    ],
  },
  {
    role: 'Women in STEM Leader',
    org: 'Menlo School',
    period: '2023 – 2026',
    points: [
      'Led programming focused on increasing access to STEM for girls through hands-on workshops, mentorship, and community-building.',
      'Secured grant funding to develop and facilitate STEM and design-thinking workshops for students in under-resourced Central California communities.',
    ],
  },
]

const education = {
  school: 'University of California, Berkeley',
  degree: 'Undergraduate Student · Computer Science',
  period: '2026 – Present',
  details:
    'Berkeley, CA · Interests: Machine Learning, Human-AI Interaction, Human-Centered Computing, and Design',
}

const projects = [
  {
    name: 'Riya',
    desc: 'Mobile elder-care app designed around social connection and wellbeing; onboarded at 10+ elder care centers.',
  },
  {
    name: 'BrandMap',
    desc: 'Interactive platform for exploring teenage brands using React, Vite, Tailwind CSS, Java, Spring Boot, Firebase, and ForceGraph2D.',
  },
  {
    name: 'Flags of the World',
    desc: 'Multimodal ML project using a CNN for flag classification and an RNN with MFCC audio features for spoken country recognition.',
  },
  {
    name: 'MyMani',
    desc: 'SwiftUI iOS app for a nail salon, combining product design with a modern, playful interface.',
  },
]

const research = [
  'MIT Media Lab — Research experience exploring how generative AI can support social connection and address elderly loneliness.',
  'Cosmos Research Program with UCSC — Conducted research in brain-inspired machine learning and explored computational approaches to learning and intelligence.',
  'Machine Learning — Built models using CNN, RNN, LSTM, and Transformer architectures, including projects involving computer vision and audio recognition.',
]

const skills = {
  Languages: ['Python', 'Java', 'C++', 'JavaScript', 'Swift'],
  Technologies: [
    'React',
    'Vite',
    'Tailwind CSS',
    'Spring Boot',
    'Firebase',
    'SwiftUI',
    'PyTorch',
    'OpenAI APIs',
  ],
  Design: [
    'Figma',
    'UI/UX Design',
    'Prototyping',
    'Design Thinking',
    'User-Centered Design',
  ],
}

const leadership = [
  'TEDx Menlo — Co-Leader; helped organize TEDx programming for 200+ attendees and contributed to event branding and marketing.',
  'Robotics Team — TDesigned and built VEX competition robots and programmed autonomous driving systems.',
  'Parliamentary Debate Team — Varsity debater and leader; competed at tournaments, earning a tournament championship and multiple elimination-round finishes.',
  'Art & Mural Club — Founder & Co-Leader; designed and painted community murals, including an installation for an Alzheimer’s-focused organization.',
  'South Asian Affinity Group — Co-President; helped build community around South Asian culture, traditions, and identity.',
  'Book Club — Founder & Leader; organized book drives and community programming, including a donation of 200+ books to women’s prisons and 1,000 books through the African Library Project.',
]

const teaching = [
  'Computer Science Teaching Assistant — supported students in Computer Science 2.',
  'Peer Tutor — mentored underclassmen in writing, mathematics, and computer science.',
  'STEM Mentorship Leader — developed workshops for middle school girls covering laboratory skills, physics, and mechanical engineering.',
  'Certified Yoga Instructor (RYT-200) — teach yoga to adults with special needs.',
  'Kumon Tutor — taught mathematics and reading to elementary and middle school students.',
]

const awards = [
  '$1,600 Social Entrepreneurship & Action Grant — supported STEM workshops in under-resourced Central California schools.',
  '$3,400 Koum Family & HANDs Foundation Grant — awarded for a top-three global issues pitch; funding supported a job program for underserved women through Sayodhya Home in Hyderabad.',
  '$1,000 India Philanthropy Alliance Grant — awarded through an essay competition and used to support work with American Friends of HelpAge India.',
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
                  eishayadav@berkeley.edu · UC Berkeley · Berkeley, CA
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

            <Section title="Selected Projects">
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

            <Section title="Research & Technical Experience">
              <ul className="space-y-1">
                {research.map((item, i) => (
                  <li
                    key={i}
                    className="text-[13px] text-graphite pl-4 relative before:content-['—'] before:absolute before:left-0 before:text-rose"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="Skills">
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

            <Section title="Leadership & Activities">
              <ul className="space-y-1">
                {leadership.map((l, i) => (
                  <li
                    key={i}
                    className="text-[13px] text-graphite pl-4 relative before:content-['—'] before:absolute before:left-0 before:text-rose"
                  >
                    {l}
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="Teaching & Service">
              <ul className="space-y-1">
                {teaching.map((t, i) => (
                  <li
                    key={i}
                    className="text-[13px] text-graphite pl-4 relative before:content-['—'] before:absolute before:left-0 before:text-rose"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="Grants & Recognition" last>
              <ul className="space-y-1">
                {awards.map((award, i) => (
                  <li
                    key={i}
                    className="text-[13px] text-graphite pl-4 relative before:content-['—'] before:absolute before:left-0 before:text-rose"
                  >
                    {award}
                  </li>
                ))}
              </ul>
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
