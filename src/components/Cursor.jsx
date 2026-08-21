import { useEffect, useRef } from 'react'

export default function Cursor() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    let x = window.innerWidth / 2
    let y = window.innerHeight / 2

    const move = (e) => {
      x = e.clientX
      y = e.clientY
      el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`
    }

    const down = () => el.classList.add('is-active')
    const up = () => el.classList.remove('is-active')

    window.addEventListener('mousemove', move)
    window.addEventListener('mousedown', down)
    window.addEventListener('mouseup', up)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mousedown', down)
      window.removeEventListener('mouseup', up)
    }
  }, [])

  return (
    <div ref={ref} className="cursor-flower" aria-hidden="true">
      🌸
    </div>
  )
}
