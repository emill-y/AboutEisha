// Tiny line tokenizers for the languages in the workspace.
// Each token: { t: text, c: colour class, href?, b?: bold }

const C = {
  text: 'tk-text', heading: 'tk-heading', punct: 'tk-punct', bullet: 'tk-bullet',
  string: 'tk-string', key: 'tk-key', num: 'tk-num', comment: 'tk-comment',
  link: 'tk-link', url: 'tk-url', code: 'tk-code', keyword: 'tk-keyword', quote: 'tk-quote',
}

const URL_RE = /(https?:\/\/[^\s"')]+|mailto:[^\s"')]+|[\w.+-]+@[\w-]+\.[\w.]+)/g

function hrefFor(s) {
  if (/^[\w.+-]+@[\w-]+\.[\w.]+$/.test(s)) return `mailto:${s}`
  return s
}

// split plain text, linking any urls/emails found
function withUrls(text, c) {
  const out = []
  let last = 0
  for (const m of text.matchAll(URL_RE)) {
    if (m.index > last) out.push({ t: text.slice(last, m.index), c })
    out.push({ t: m[0], c: C.url, href: hrefFor(m[0]) })
    last = m.index + m[0].length
  }
  if (last < text.length) out.push({ t: text.slice(last), c })
  return out
}

// inline markdown: **bold**, `code`, [text](href)
function mdInline(s, base = C.text, bold = false) {
  const out = []
  const re = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g
  let last = 0
  for (const m of s.matchAll(re)) {
    if (m.index > last) out.push(...withUrls(s.slice(last, m.index), base).map((x) => ({ ...x, b: bold })))
    const tok = m[0]
    if (tok.startsWith('**')) {
      out.push({ t: '**', c: C.punct }, { t: tok.slice(2, -2), c: C.heading, b: true }, { t: '**', c: C.punct })
    } else if (tok.startsWith('`')) {
      out.push({ t: tok, c: C.code })
    } else {
      const [, label, href] = tok.match(/\[([^\]]+)\]\(([^)]+)\)/)
      out.push(
        { t: '[', c: C.punct },
        { t: label, c: C.link, href },
        { t: '](', c: C.punct },
        { t: href, c: C.url, href },
        { t: ')', c: C.punct },
      )
    }
    last = m.index + tok.length
  }
  if (last < s.length) out.push(...withUrls(s.slice(last), base).map((x) => ({ ...x, b: bold })))
  return out
}

function md(line) {
  let m
  if ((m = line.match(/^(#{1,6} )(.*)$/))) return [{ t: m[1], c: C.heading, b: true }, ...mdInline(m[2], C.heading, true)]
  if ((m = line.match(/^(> )(.*)$/))) return [{ t: m[1], c: C.quote }, ...mdInline(m[2], C.quote)]
  if ((m = line.match(/^(\s*[-*] )(.*)$/))) return [{ t: m[1], c: C.bullet }, ...mdInline(m[2])]
  if (/^<!--.*-->$/.test(line)) return [{ t: line, c: C.comment }]
  return mdInline(line)
}

function json(line) {
  const out = []
  const re = /("(?:[^"\\]|\\.)*")(\s*:)?|(-?\d+\.?\d*)|(true|false|null)|([{}[\],])/g
  let last = 0
  for (const m of line.matchAll(re)) {
    if (m.index > last) out.push({ t: line.slice(last, m.index), c: C.text })
    if (m[1] && m[2]) out.push({ t: m[1], c: C.key }, { t: m[2], c: C.punct })
    else if (m[1]) out.push(...withUrls(m[1], C.string).map((x) => (x.href ? { ...x, c: C.string } : x)))
    else if (m[3]) out.push({ t: m[3], c: C.num })
    else if (m[4]) out.push({ t: m[4], c: C.keyword })
    else out.push({ t: m[5], c: C.punct })
    last = m.index + m[0].length
  }
  if (last < line.length) out.push({ t: line.slice(last), c: C.text })
  return out
}

function yaml(line) {
  if (/^\s*#/.test(line)) return [{ t: line, c: C.comment }]
  const m = line.match(/^(\s*[\w-]+)(:)(\s*)(.*?)(\s+#.*)?$/)
  if (!m) return [{ t: line, c: C.text }]
  const out = [{ t: m[1], c: C.key }, { t: m[2], c: C.punct }, { t: m[3], c: C.text }]
  if (m[4]) {
    const isPath = /\.\w+$/.test(m[4]) && !m[4].startsWith('"')
    out.push(isPath ? { t: m[4], c: C.url, href: m[4].replace(/^\.\.\//, '') } : { t: m[4], c: C.string })
  }
  if (m[5]) out.push({ t: m[5], c: C.comment })
  return out
}

function m3u(line) {
  let m
  if ((m = line.match(/^(#EXTINF:)(\d+)(,)(.*)$/)))
    return [{ t: m[1], c: C.keyword }, { t: m[2], c: C.num }, { t: m[3], c: C.punct }, { t: m[4], c: C.string }]
  if ((m = line.match(/^(#[A-Z0-9]+)(:?)(.*)$/)))
    return [{ t: m[1], c: C.keyword }, { t: m[2], c: C.punct }, { t: m[3], c: C.heading, b: true }]
  return withUrls(line, C.text)
}

function txt(line) {
  if (/^=+$/.test(line)) return [{ t: line, c: C.comment }]
  const m = line.match(/^(\d+\. )(.*)$/)
  if (m) return [{ t: m[1], c: C.num }, { t: m[2], c: C.text }]
  return withUrls(line, C.text)
}

const byLang = { md, json, yaml, m3u, txt }

export function tokenize(line, lang) {
  if (!line) return []
  return (byLang[lang] || txt)(line)
}
