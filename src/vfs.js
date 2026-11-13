// Turns the site content into a little "workspace" of files.
import {
  profile, quickFacts, projects, education, research, experience, skills,
  leadership, teaching, awards, posts, currently, hobbies, traits,
} from './data/content'
import { playlistName, tracks, trackUrl } from './data/playlist'

export const ROOT = 'Eisha Yadav'

const slug = (s) =>
  s.toLowerCase().replace(/['’]/g, '').replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '')

const postSlugs = ['loneliness_is_a_design_problem', 'terrible_first_prototypes', 'what_debate_taught_me', 'the_flag_classifier']

const files = {}
const add = (path, text) => {
  files[path] = { path, name: path.split('/').pop(), lang: path.split('.').pop(), text: text.trim() + '\n' }
}

/* ---------- projects ---------- */
projects.forEach((p) => {
  add(
    `projects/${slug(p.name)}.md`,
    `# ${p.name}

\`${p.year}\` · ${p.tags.join(' · ')}

**${p.tagline}**

${p.description}

- highlight: **${p.highlight}**
- stack: ${p.tags.map((t) => `\`${t}\``).join(', ')}

[← all projects](README.md#projects)`,
  )
})

/* ---------- resume ---------- */
add(
  'resume/resume.md',
  `# ${profile.name}

${profile.email} · ${education.school} · ${profile.location}
[LinkedIn](${profile.links.linkedin}) · [GitHub](${profile.links.github})

## Education

**${education.school}** · ${education.period}
${education.degree}
Interests: ${education.interests.join(', ')}

## Experience
${experience
  .map(
    (e) => `
### ${e.role} · ${e.org}
\`${e.period}\`
${e.points.map((pt) => `- ${pt}`).join('\n')}`,
  )
  .join('\n')}

## Research
${research.map((r) => `- **${r.org}:** ${r.desc}`).join('\n')}

## Selected projects
${projects.map((p) => `- [${p.name}](projects/${slug(p.name)}.md): ${p.tagline}`).join('\n')}

## Skills
${Object.entries(skills)
  .map(([k, v]) => `- **${k}:** ${v.join(', ')}`)
  .join('\n')}

## Grants & recognition
${awards.map((a) => `- **${a.amount}** ${a.name}: ${a.desc}`).join('\n')}

## Leadership & activities
${leadership.map((l) => `- **${l.name}** (${l.role}): ${l.desc}`).join('\n')}

## Teaching & service
${teaching.map((t) => `- **${t.name}:** ${t.desc}`).join('\n')}`,
)

add(
  'resume/skills.json',
  JSON.stringify(
    Object.fromEntries(Object.entries(skills).map(([k, v]) => [k.toLowerCase(), v])),
    null,
    2,
  ),
)

/* ---------- writing ---------- */
posts.forEach((p, i) => {
  add(
    `writing/${postSlugs[i]}.md`,
    `# ${p.title}

> ${p.date} · ${p.preview}

${p.body}`,
  )
})

/* ---------- currently ---------- */
const yamlKey = (s) => s.toLowerCase()
add(
  'currently/currently.yaml',
  `# what I'm into right now (fall '26)
${currently.map((c) => `${yamlKey(c.label)}: "${c.value.replace(/"/g, "'")}"`).join('\n')}
playlist: ../playlist.m3u  # what's on repeat`,
)

/* ---------- fun ---------- */
add(
  'fun/hobbies.md',
  `# The fun stuff

A few things that probably won't make it onto my résumé.

${hobbies.map((h) => `## ${h.title}\n${h.desc}`).join('\n\n')}

[my food log on Beli](${profile.links.beli})`,
)
add(
  'fun/personality_traits.txt',
  `field-verified personality traits
=================================

${traits.map((t, i) => `${i + 1}. ${t}`).join('\n')}

yes, I probably have a Pinterest board for this.`,
)

/* ---------- contact ---------- */
add(
  'contact/contact.json',
  JSON.stringify(
    {
      name: profile.name,
      email: profile.email,
      linkedin: profile.links.linkedin,
      github: profile.links.github,
      beli: profile.links.beli,
      location: profile.location,
      fastest_way_to_reach_me: 'email',
      happy_to_talk_about: ['human-centered AI', 'elder-care tech', 'research', 'a good matcha spot'],
    },
    null,
    2,
  ),
)

/* ---------- playlist ---------- */
add(
  'playlist.m3u',
  `#EXTM3U
#PLAYLIST:${playlistName}
${tracks
  .map((t) => {
    const [m, s] = t.length.split(':').map(Number)
    return `\n#EXTINF:${m * 60 + s},${t.artist} - ${t.title}\n${trackUrl(t)}`
  })
  .join('\n')}`,
)

/* ---------- README ---------- */
const firstPost = `writing/${postSlugs[0]}.md`
add(
  'README.md',
  `# ${profile.name}

> ${profile.role}. ${profile.oneLiner}

## tl;dr
${quickFacts.map((f) => `- **${f.label}:** ${f.value}`).join('\n')}
- **Email:** [${profile.email}](mailto:${profile.email})

## what's in here
- [projects/](projects/riya.md): ${projects.map((p) => p.name).join(', ')}
- [resume/](resume/resume.md): experience, education, skills, grants
- [writing/](${firstPost}): ${posts.length} short essays on building, debate and design
- [currently/](currently/currently.yaml): what I'm drinking, listening to and planning
- [fun/](fun/hobbies.md): debate, yoga, food and making things
- [contact/](contact/contact.json): email, LinkedIn, GitHub
- [playlist.m3u](playlist.m3u): what I'm listening to

## projects
${projects.map((p) => `- [${p.name}](projects/${slug(p.name)}.md) \`${p.year}\`: ${p.tagline}`).join('\n')}

## links
[LinkedIn](${profile.links.linkedin}) · [GitHub](${profile.links.github}) · [Beli](${profile.links.beli})

<!-- tip: press ⌘P / Ctrl+P to open any file, or type \`help\` in the terminal below -->`,
)

export { files }
export const DEFAULT_FILE = 'README.md'

// Folder tree, folders first, in the order sections appear on the site.
const folderOrder = ['projects', 'resume', 'writing', 'currently', 'fun', 'contact']
export const tree = [
  ...folderOrder.map((dir) => ({
    type: 'dir',
    name: dir,
    path: dir,
    children: Object.keys(files)
      .filter((p) => p.startsWith(dir + '/'))
      .map((p) => ({ type: 'file', name: files[p].name, path: p })),
  })),
  { type: 'file', name: 'playlist.m3u', path: 'playlist.m3u' },
  { type: 'file', name: 'README.md', path: 'README.md' },
]

export const aliases = {
  projects: 'projects/riya.md',
  resume: 'resume/resume.md',
  writing: firstPost,
  blog: firstPost,
  currently: 'currently/currently.yaml',
  fun: 'fun/hobbies.md',
  contact: 'contact/contact.json',
  playlist: 'playlist.m3u',
}

export function resolvePath(raw) {
  const p = decodeURIComponent(raw || '').replace(/^\/+|\/+$/g, '').split('#')[0]
  if (!p) return DEFAULT_FILE
  if (files[p]) return p
  if (aliases[p]) return aliases[p]
  return null
}

export const languageName = {
  md: 'Markdown', json: 'JSON', yaml: 'YAML', txt: 'Plain Text', m3u: 'M3U Playlist',
}
