import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import { SmiskiIcon } from '../icons/DeskObjects'

const obsessed = [
  { label: 'currently drinking', value: 'matcha, espresso, and sometimes a good chai. ' },
  { label: 'currently listening', value: 'whatever country song I have decided is my entire personality for the week & noah kahan' },
  { label: 'currently craving', value: 'something sweet after saying I am "not really hungry"' },
  { label: 'currently planning', value: 'my next unnecessarily elaborate idea' },
]

const traits = [
  'will say "wait, I have an idea" and immediately open Notes',
  'takes approximately 47 pictures before choosing one',
  'has strong opinions about fonts, food, and whether something is actually cute',
]

const hobbies = [
  { title: 'Debate', desc: 'I love arguing but only when its productive, which is probably why I somehow ended up teaching debate...' },
  { title: 'Yoga', desc: 'One of the few things that can convince me to stop doing five things at once. Im a certified teacher!!' },
  { title: 'Trying new food', desc: 'I will absolutely travel across town for a place someone described as "really good." LOOK at my beli:) profile plzzz @eishaa' },
  { title: 'Making things', desc: 'Apps, posters, random ideas, workshop activities... if I think "I could make that," it is already over, my cricut and sewing machine are out.' },
]

export default function Fun() {
  return (
    <PageTransition>
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <SmiskiIcon className="w-32 md:w-40 h-auto flatlay-shadow" />
          </motion.div>

          <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-mint-deep mt-6 mb-2">
            important information
          </p>

          <h1
            className="text-[11vw] md:text-5xl"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            The Fun Stuff
          </h1>

          <p className="text-[14px] text-graphite mt-3 max-w-md">
            A few things about me that probably won't make it onto my resume.
          </p>
        </div>

        {/* hobbies grid */}
        <div className="grid sm:grid-cols-2 gap-4 mb-14">
          {hobbies.map((h, i) => (
            <motion.div
              key={h.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="bg-card rounded-2xl p-5 border border-mist hover:border-rose transition-colors"
            >
              <h3
                className="text-lg mb-1"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {h.title}
              </h3>

              <p className="text-[13px] text-graphite">
                {h.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* currently obsessed */}
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-rose-deep mb-4">
              currently obsessed with
            </p>

            <ul className="space-y-3">
              {obsessed.map((o) => (
                <li
                  key={o.label}
                  className="flex flex-col border-b border-mist pb-3"
                >
                  <span className="font-mono text-[10.5px] text-graphite uppercase tracking-wide">
                    {o.label}
                  </span>

                  <span
                    className="text-[14.5px]"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {o.value}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* personality traits */}
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-mint-deep mb-4">
              field-verified personality traits
            </p>

            <ul className="space-y-3">
              {traits.map((t, i) => (
                <li
                  key={i}
                  className="text-[13.5px] text-[#2b2c31] leading-relaxed pl-4 relative before:content-['🌸'] before:absolute before:left-0 before:top-0.5 before:text-[10px]"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* tiny disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-graphite">
            yes, I probably have a Pinterest board for this
          </p>
        </motion.div>
      </div>
    </PageTransition>
  )
}
