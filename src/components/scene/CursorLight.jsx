import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MathUtils } from 'three'

const DAMPING = 6
const LIGHT_Z = 2

function CursorLight() {
  const lightRef = useRef(null)

  useFrame((state, delta) => {
    const light = lightRef.current
    if (!light) return

    const { pointer, viewport } = state
    const targetX = pointer.x * viewport.width * 0.5
    const targetY = pointer.y * viewport.height * 0.5

    light.position.x = MathUtils.damp(light.position.x, targetX, DAMPING, delta)
    light.position.y = MathUtils.damp(light.position.y, targetY, DAMPING, delta)
  })

  return (
    <pointLight
      ref={lightRef}
      position={[0, 0, LIGHT_Z]}
      color="#ffffff"
      intensity={8}
      distance={5}
    />
  )
}

export default CursorLight
