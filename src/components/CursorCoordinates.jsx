import { useEffect, useState } from 'react'

function CursorCoordinates() {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handlePointerMove = (event) => {
      setPosition({ x: Math.round(event.clientX), y: Math.round(event.clientY) })
    }

    window.addEventListener('pointermove', handlePointerMove)
    return () => window.removeEventListener('pointermove', handlePointerMove)
  }, [])

  return (
    <div
      className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 select-none text-base tracking-wide text-white/70"
      style={{ fontFamily: "'VT323', var(--mono)" }}
    >
      X: {position.x} &nbsp; Y: {position.y}
    </div>
  )
}

export default CursorCoordinates
