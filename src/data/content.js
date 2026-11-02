// All site copy lives here. Edit this file to update the site.

export const profile = {
  name: 'Eisha Yadav',
  role: 'Computer Science @ UC Berkeley',
  oneLiner:
    'I build human-centered technology at the intersection of AI, robotics, and social impact.',
  email: 'eishayadav@berkeley.edu',
  location: 'Berkeley, CA',
  links: {
    linkedin: 'https://www.linkedin.com/in/eishayadav/',
    github: 'https://github.com/emill-y',
    beli: 'https://beliapp.co/profile/eishaa',
  },
}

export const quickFacts = [
  { label: 'Studying', value: 'Computer Science, UC Berkeley' },
  { label: 'Building', value: 'Riya, an elder-care app live at 10+ centers' },
  { label: 'Running', value: 'Alexa Academy: 50 students, $10K revenue' },
  { label: 'Research', value: 'MIT Media Lab, UCSC COSMOS' },
]

export const projects = [
  {
    name: 'Riya',
    year: '2025',
    tagline: 'Technology that makes connection easier for older adults.',
    description:
      'A mobile app that helps older adults stay socially connected, designed around accessibility and simplicity rather than feature count. Onboarded at 10+ elder care centers, taking it from prototype to something real communities use.',
    tags: ['iOS', 'Swift', 'Product Design', 'HCI'],
    highlight: '10+ care centers',
  },
  {
    name: 'BrandMap',
    year: '2026',
    tagline: 'An interactive network for teenagers to explore brands.',
    description:
      'A visual platform that replaces list-and-search with an explorable force graph. React + Vite frontend styled with Tailwind, backed by Java Spring Boot and Firebase, with ForceGraph2D for the mind-map.',
    tags: ['React', 'Tailwind', 'Spring Boot', 'Firebase'],
    highlight: 'Full-stack',
  },
  {
    name: 'Flags of the World',
    year: '2026',
    tagline: 'Multimodal ML for flags and spoken country names.',
    description:
      'A CNN classifies hand-drawn flags while an RNN recognizes spoken country names from MFCC audio features (librosa). Most of the learning came from debugging datasets, tensor shapes and models.',
    tags: ['Python', 'PyTorch', 'CNN', 'RNN'],
    highlight: 'Vision + audio',
  },
  {
    name: 'MyMani',
    year: '2026',
    tagline: 'A playful, modern iOS app for booking a manicure.',
    description:
      'A SwiftUI concept for a nail salon that keeps browsing services and booking an appointment simple, wrapped in a soft, polished visual system designed in Figma.',
    tags: ['SwiftUI', 'iOS', 'Figma', 'UI/UX'],
    highlight: 'Design + build',
  },
]

export const education = {
  school: 'University of California, Berkeley',
  degree: 'B.A. Computer Science (in progress)',
  period: '2026 – Present',
  location: 'Berkeley, CA',
  interests: ['Machine Learning', 'Human-AI Interaction', 'Human-Centered Computing', 'Design'],
}

export const research = [
  {
    org: 'MIT Media Lab',
    desc: 'Explored how generative AI can support social connection and address elderly loneliness.',
  },
  {
    org: 'COSMOS × UC Santa Cruz',
    desc: 'Researched brain-inspired machine learning and computational approaches to learning.',
  },
  {
    org: 'Independent ML work',
    desc: 'Built CNN, RNN, LSTM and Transformer models across computer vision and audio recognition.',
  },
]

export const experience = [
  {
    role: 'Founder & Developer',
    org: 'Ayur / Riya',
    period: '2024 – Present',
    points: [
      'Founded Ayur to tackle elderly loneliness with technology; built Riya, a mobile app for meaningful social connection.',
      'Partnered with elder care communities and onboarded Riya at 10+ centers, from idea to deployed product.',
    ],
  },
  {
    role: 'Founder & CEO',
    org: 'Alexa Academy',
    period: '2024 – Present',
    points: [
      'Debate and public speaking education for middle schoolers: workshops, camps and curriculum.',
      'Grew to 50 paying customers and $10K revenue; building an AI tool for debate practice.',
    ],
  },
  {
    role: 'Founder & Youth Council Leader',
    org: 'American Friends of HelpAge India',
    period: '2024 – Present',
    points: [
      'Built a youth council of 50+ members across 7+ states focused on issues affecting older adults.',
      'Supported elder housing and access to cataract surgeries.',
    ],
  },
  {
    role: 'Women in STEM Leader',
    org: 'Menlo School',
    period: '2023 – 2026',
    points: [
      'Led hands-on workshops, mentorship and community-building to widen access to STEM for girls.',
      'Secured grant funding for STEM and design-thinking workshops in under-resourced Central California communities.',
    ],
  },
]

export const skills = {
  Languages: ['Python', 'Java', 'C++', 'JavaScript', 'Swift'],
  Tools: ['React', 'Vite', 'Tailwind CSS', 'Spring Boot', 'Firebase', 'SwiftUI', 'PyTorch', 'OpenAI APIs'],
  Design: ['Figma', 'UI/UX', 'Prototyping', 'Design Thinking', 'User-Centered Design'],
}

export const leadership = [
  { name: 'TEDx Menlo', role: 'Co-Leader', desc: 'Organized programming for 200+ attendees; led branding and marketing.' },
  { name: 'Robotics Team', role: 'Builder & Programmer', desc: 'Designed VEX competition robots and programmed autonomous driving.' },
  { name: 'Parliamentary Debate', role: 'Varsity Debater & Leader', desc: 'Tournament champion with multiple elimination-round finishes.' },
  { name: 'Art & Mural Club', role: 'Founder', desc: 'Painted community murals, including one for an Alzheimer’s-focused organization.' },
  { name: 'South Asian Affinity Group', role: 'Co-President', desc: 'Built community around South Asian culture, traditions and identity.' },
  { name: 'Book Club', role: 'Founder', desc: 'Donated 200+ books to women’s prisons and 1,000 through the African Library Project.' },
]

export const teaching = [
  { name: 'CS Teaching Assistant', desc: 'Supported students in Computer Science 2.' },
  { name: 'Peer Tutor', desc: 'Writing, mathematics and computer science.' },
  { name: 'STEM Mentorship Leader', desc: 'Lab skills, physics and mechanical engineering workshops for middle school girls.' },
  { name: 'Certified Yoga Instructor (RYT-200)', desc: 'Teaches yoga to adults with special needs.' },
  { name: 'Kumon Tutor', desc: 'Math and reading for elementary and middle schoolers.' },
]

export const awards = [
  {
    amount: '$3,400',
    name: 'Koum Family & HANDs Foundation Grant',
    desc: 'Top-three global issues pitch; funded a job program for underserved women through Sayodhya Home, Hyderabad.',
  },
  {
    amount: '$1,600',
    name: 'Social Entrepreneurship & Action Grant',
    desc: 'Funded STEM workshops in under-resourced Central California schools.',
  },
  {
    amount: '$1,000',
    name: 'India Philanthropy Alliance Grant',
    desc: 'Essay competition award, used to support American Friends of HelpAge India.',
  },
]

export const posts = [
  {
    title: 'I built Riya because loneliness is a design problem too',
    date: 'Aug 6, 2026',
    preview:
      'An app for helping older adults stay connected became a lesson in designing around people, not features.',
    body: `Riya started with a pretty simple question: what if technology could make it easier for older adults to feel connected to the people around them?

I built Riya as an app focused on connection for older adults, but the more I worked on it, the more I realized that the hardest part wasn't building the interface. It was understanding what people actually needed from it. A technically impressive product isn't useful if the person you're designing for doesn't want to use it.

That pushed me toward a much more human-centered approach to building. I started thinking less about what features I could add and more about what would make someone feel comfortable, understood, and willing to come back.

Riya eventually expanded beyond the app itself. I worked with elder care centers to get it into the hands of real users, and it has now been onboarded by more than 10 centers.

The biggest thing I learned is that building technology for people means spending a lot of time understanding the problem before trying to solve it.`,
  },
  {
    title: 'The best ideas usually start with a terrible first prototype',
    date: 'Jul 20, 2026',
    preview: 'What teaching design thinking to middle schoolers taught me about building things myself.',
    body: `I've become increasingly convinced that you shouldn't try to make your first idea good.

While developing a design thinking curriculum for middle school students, I kept coming back to the same five steps: empathize, define, ideate, prototype, test. The important part isn't just knowing the steps. It's actually being willing to move through them.

For one workshop, students tackled a real-world irrigation challenge connected to the Central Valley water crisis. They had to understand the problem, decide what they were actually solving, come up with ideas, build prototypes, and test them.

Watching students get attached to an idea, realize it didn't work, and then completely change it was probably the best reminder I could have given myself.

I've started applying the same process to my own projects. A prototype isn't supposed to prove that you're right. It's supposed to give you something concrete enough to prove yourself wrong.`,
  },
  {
    title: 'What debate taught me about building technology',
    date: 'Jul 2, 2026',
    preview: 'Learning to argue against my own ideas made me much better at designing them.',
    body: `Debate taught me something that I didn't expect to carry into computer science: having an idea isn't the same thing as having a good idea.

When you're debating, you can't just explain why your argument works. You have to think about the strongest version of the argument against you, identify where your reasoning breaks down, and respond to it directly.

I started noticing that I was doing the same thing when building projects.

Instead of asking only, "How can I make this work?" I started asking, "Why might this not work? Who wouldn't use it? What am I assuming? What happens if I'm completely wrong about what people need?"

That mindset has changed how I approach product design. I don't think good technology comes from defending an idea until everyone agrees with you. I think it comes from being willing to attack your own assumptions before someone else does.`,
  },
  {
    title: "I didn't expect a flag classifier to teach me this much",
    date: 'Jun 18, 2026',
    preview: 'A drawings-and-audio ML project turned into a lesson about models meeting messy data.',
    body: `One of my favorite ML projects started with something that sounds almost too simple: recognizing flags.

I worked on a project using a CNN to classify drawings of world flags and an RNN to recognize spoken country names. For the audio side, I extracted MFCC features with librosa and worked through the less glamorous parts of machine learning: datasets that didn't load correctly, unexpected tensor shapes, and the realization that a model can't learn from data you accidentally gave it zero samples of.

The debugging was frustrating, but it was also the part I learned the most from.

It made me much more interested in what happens between an idea and a working model. The architecture matters, but so do the assumptions behind the dataset, the representation of the input, and all the little decisions that happen before training even starts.

Sometimes the most educational part of an ML project isn't the final accuracy. It's figuring out why the first version completely failed.`,
  },
]

export const currently = [
  { label: 'Drinking', value: 'Matcha, espresso, and sometimes a really good chai.' },
  { label: 'Listening', value: 'Noah Kahan, plus whichever country song is my entire personality this week.' },
  { label: 'Craving', value: 'Something sweet, right after saying I’m “not really hungry.”' },
  { label: 'Planning', value: 'My next unnecessarily elaborate idea.' },
]

export const hobbies = [
  { title: 'Debate', desc: 'I love arguing, but only when it’s productive, which is probably why I ended up teaching it.' },
  { title: 'Yoga', desc: 'One of the few things that gets me to stop doing five things at once. I’m a certified teacher.' },
  { title: 'Trying new food', desc: 'I will cross town for a place someone called “really good.” Find me on Beli: @eishaa.' },
  { title: 'Making things', desc: 'Apps, posters, workshop activities. Once I think “I could make that,” the Cricut and sewing machine come out.' },
]

export const traits = [
  'Says “wait, I have an idea” and immediately opens Notes.',
  'Takes roughly 47 pictures before choosing one.',
  'Has strong opinions about fonts, food, and whether something is actually cute.',
]
