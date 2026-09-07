import { useEffect, useState } from 'react'

const SHEET_COLS = 11
const SHEET_ROWS = 53

function AnimatedSprite({ row, frameCount, size = 96, fps = 6, className = '' }) {
  const [frame, setFrame] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setFrame((f) => (f + 1) % frameCount)
    }, 1000 / fps)
    return () => clearInterval(id)
  }, [frameCount, fps])

  return (
    <div
      aria-hidden="true"
      className={`animated-sprite ${className}`}
      style={{
        width: size,
        height: size,
        backgroundImage: 'url(/sprites/cat-sheet.png)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: `${SHEET_COLS * size}px ${SHEET_ROWS * size}px`,
        backgroundPosition: `-${frame * size}px -${row * size}px`,
      }}
    />
  )
}

export default AnimatedSprite
