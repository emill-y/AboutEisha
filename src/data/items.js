// The objects in the bag. To swap a photo, drop a new image into /public/bag
// (transparent PNG/WebP, 1600px+ on the long edge looks best) and update `image`.
//
// `desktop` / `mobile` place each photo on the canvas in design units
// (desktop canvas = 1200 x 640, mobile canvas = 600 x 830).
// x / y = top-left corner, w = width; height follows the photo's aspect ratio.

export const items = [
  {
    slug: 'projects',
    object: 'Laptop',
    section: 'Projects',
    blurb: 'Riya, BrandMap, Flags of the World, MyMani',
    image: '/bag/laptop.webp',
    ratio: 431 / 304,
    desktop: { x: 70, y: 56, w: 440, r: -2 },
    mobile: { x: 30, y: 40, w: 340, r: -2 },
  },
  {
    slug: 'resume',
    object: 'Printed résumé',
    section: 'Résumé',
    blurb: 'Experience, education, skills, leadership and grants',
    image: '/bag/resume.webp',
    ratio: 640 / 828,
    desktop: { x: 585, y: 40, w: 205, r: 4 },
    mobile: { x: 50, y: 330, w: 200, r: -4 },
    paper: true,
  },
  {
    slug: 'writing',
    object: 'Open book',
    section: 'Writing',
    blurb: '4 short essays on building, debate and design',
    image: '/bag/journal.webp',
    ratio: 413 / 269,
    desktop: { x: 845, y: 84, w: 315, r: 3 },
    mobile: { x: 250, y: 600, w: 320, r: 3 },
  },
  {
    slug: 'contact',
    object: 'Phone',
    section: 'Contact',
    blurb: 'Email, LinkedIn, GitHub',
    image: '/bag/phone.webp',
    ratio: 192 / 399,
    desktop: { x: 230, y: 384, w: 112, r: -8 },
    mobile: { x: 430, y: 40, w: 118, r: 6 },
  },
  {
    slug: 'currently',
    object: 'Strawberry matcha',
    section: 'Currently',
    blurb: 'What I’m drinking, listening to and planning',
    image: '/bag/matcha.webp',
    ratio: 365 / 486,
    desktop: { x: 610, y: 364, w: 150, r: 3 },
    mobile: { x: 330, y: 330, w: 160, r: 3 },
  },
  {
    slug: 'fun',
    object: 'Meditating Smiski',
    section: 'The fun stuff',
    blurb: 'Debate, yoga, food and making things',
    image: '/bag/smiski.webp',
    ratio: 90 / 113,
    desktop: { x: 950, y: 440, w: 108, r: 0 },
    mobile: { x: 90, y: 660, w: 96, r: 0 },
  },
]

export const aliases = { blog: 'writing', thoughts: 'writing', linkedin: 'contact' }

export const findItem = (slug) => items.find((i) => i.slug === (aliases[slug] || slug))
