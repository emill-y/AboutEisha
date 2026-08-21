// Each of these renders a plain <img> pointing at a PNG in /public/images.
// Drop your own photos into that folder using these exact filenames and
// they'll show up automatically — no other code changes needed.
// Any prop you pass in (className, etc.) is forwarded to the <img>.

export function LaptopIcon(props) {
  return <img src="/images/laptop.png" alt="Projects" {...props} />
}

export function PaperIcon(props) {
  return <img src="/images/resume.webp" alt="Resume" {...props} />
}

export function BookIcon(props) {
  return <img src="/images/book.png" alt="Blog" {...props} />
}

export function PhoneIcon(props) {
  return <img src="/images/linkedin.png" alt="LinkedIn" {...props} />
}

export function SmiskiIcon(props) {
  return <img src="/images/smiski.png" alt="Smiski figurine" {...props} />
}

export function ReceiptIcon(props) {
  return <img src="/images/matcha.png" alt="Food log" {...props} />
}