export const blogPosts = [
  {
    id: 'b1',
    title: 'I built Riya because loneliness is a design problem too',
    date: 'August 6, 2026',
    preview:
      'What started as an app idea for helping older adults stay connected became a lesson in designing technology around people, not features.',
    body: `Riya started with a pretty simple question: what if technology could make it easier for older adults to feel connected to the people around them?

I built Riya as an app focused on connection for older adults, but the more I worked on it, the more I realized that the hardest part wasn't building the interface. It was understanding what people actually needed from it. A technically impressive product isn't useful if the person you're designing for doesn't want to use it.

That pushed me toward a much more human-centered approach to building. I started thinking less about what features I could add and more about what would make someone feel comfortable, understood, and willing to come back.

Riya eventually expanded beyond the app itself. I worked with elder care centers to get it into the hands of real users, and it has now been onboarded by more than 10 centers.

The biggest thing I learned is that building technology for people means spending a lot of time understanding the problem before trying to solve it.`,
  },
  {
    id: 'b2',
    title: 'The best ideas usually start with a terrible first prototype',
    date: 'July 20, 2026',
    preview:
      'What teaching design thinking to middle school students taught me about building things myself.',
    body: `I've become increasingly convinced that you shouldn't try to make your first idea good.

While developing a design thinking curriculum for middle school students, I kept coming back to the same five steps: empathize, define, ideate, prototype, test. The important part isn't just knowing the steps. It's actually being willing to move through them.

For one workshop, students tackled a real-world irrigation challenge connected to the Central Valley water crisis. They had to understand the problem, decide what they were actually solving, come up with ideas, build prototypes, and test them.

Watching students get attached to an idea, realize it didn't work, and then completely change it was probably the best reminder I could have given myself.

I've started applying the same process to my own projects. A prototype isn't supposed to prove that you're right. It's supposed to give you something concrete enough to prove yourself wrong.`,
  },
  {
    id: 'b3',
    title: 'What debate taught me about building technology',
    date: 'July 2, 2026',
    preview:
      'Learning to argue against my own ideas made me much better at designing them.',
    body: `Debate taught me something that I didn't expect to carry into computer science: having an idea isn't the same thing as having a good idea.

When you're debating, you can't just explain why your argument works. You have to think about the strongest version of the argument against you, identify where your reasoning breaks down, and respond to it directly.

I started noticing that I was doing the same thing when building projects.

Instead of asking only, "How can I make this work?" I started asking, "Why might this not work? Who wouldn't use it? What am I assuming? What happens if I'm completely wrong about what people need?"

That mindset has changed how I approach product design. I don't think good technology comes from defending an idea until everyone agrees with you. I think it comes from being willing to attack your own assumptions before someone else does.`,
  },
  {
    id: 'b4',
    title: 'I didnt expect a flag classifier to teach me this much',
    date: 'June 18, 2026',
    preview:
      'A machine learning project involving drawings and audio turned into a lesson about what happens when a model meets messy data.',
    body: `One of my favorite ML projects started with something that sounds almost too simple: recognizing flags.

I worked on a project using a CNN to classify drawings of world flags and an RNN to recognize spoken country names. For the audio side, I extracted MFCC features with librosa and worked through the less glamorous parts of machine learning: datasets that didn't load correctly, unexpected tensor shapes, and the realization that a model can't learn from data you accidentally gave it zero samples of.

The debugging was frustrating, but it was also the part I learned the most from.

It made me much more interested in what happens between an idea and a working model. The architecture matters, but so do the assumptions behind the dataset, the representation of the input, and all the little decisions that happen before training even starts.

Sometimes the most educational part of an ML project isn't the final accuracy. It's figuring out why the first version completely failed.`,
  },
]

export const projects = [
  {
    id: 'p1',
    name: 'Riya',
    tagline: 'an app designed to help older adults stay connected',
    description:
      'Built an app focused on helping older adults maintain meaningful social connection. The project grew beyond the product itself through partnerships with elder care centers, with Riya eventually being onboarded by 10+ centers.',
    tags: ['iOS', 'Product Design', 'Human-Centered Computing'],
    github: null,
    live: null,
    year: '2025',
  },
  {
    id: 'p2',
    name: 'BrandMap',
    tagline: 'a platform for exploring and understanding teenage brands',
    description:
      'A web platform built to help teenagers explore brands through an interactive visual experience. Built with React and Vite on the frontend, Tailwind CSS for styling, Spring Boot and Java on the backend, Firebase Admin SDK for services, and ForceGraph2D for the interactive mind-map experience.',
    tags: ['React', 'Vite', 'Tailwind CSS', 'Java', 'Spring Boot', 'Firebase'],
    github: null,
    live: null,
    year: '2026',
  },
  {
    id: 'p3',
    name: 'MyMani',
    tagline: 'a cute, modern iOS experience for nail salon appointments',
    description:
      'A SwiftUI iOS app concept for a nail salon experience, designed around a modern, playful visual identity. The project combines product thinking with interface design, including a soft pink visual direction and a focus on making the booking experience feel simple and approachable.',
    tags: ['SwiftUI', 'iOS', 'Figma', 'UI/UX'],
    github: null,
    live: null,
    year: '2026',
  },
  {
    id: 'p4',
    name: 'Flags of the World',
    tagline: 'a multimodal ML project for recognizing flags and spoken countries',
    description:
      'A machine learning project combining computer vision and audio recognition. A CNN was used to classify drawings of world flags, while an RNN processed audio features extracted with librosa MFCCs to recognize country names. The project became an exercise in working through real ML debugging challenges, from dataset issues to model and tensor errors.',
    tags: ['Python', 'PyTorch', 'CNN', 'RNN', 'librosa', 'Machine Learning'],
    github: null,
    live: null,
    year: '2026',
  },
]