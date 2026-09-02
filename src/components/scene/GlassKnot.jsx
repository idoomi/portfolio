import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshTransmissionMaterial } from '@react-three/drei'
import { MathUtils } from 'three'

const ROTATION_INFLUENCE = 0.5
const POSITION_INFLUENCE = 0.2
const DAMPING = 4

function GlassKnot() {
  const ref = useRef(null)
  const target = useRef({ x: 0, y: 0 })
  const isPointerActive = useRef(true)

  useEffect(() => {
    const handlePointerLeave = () => {
      isPointerActive.current = false
      target.current.x = 0
      target.current.y = 0
    }

    const handlePointerEnter = () => {
      isPointerActive.current = true
    }

    document.addEventListener('pointerleave', handlePointerLeave)
    document.addEventListener('pointerenter', handlePointerEnter)

    return () => {
      document.removeEventListener('pointerleave', handlePointerLeave)
      document.removeEventListener('pointerenter', handlePointerEnter)
    }
  }, [])

  useFrame((state, delta) => {
    if (!ref.current) return

    if (isPointerActive.current) {
      target.current.x = state.pointer.x
      target.current.y = state.pointer.y
    }

    const { x, y } = target.current

    ref.current.rotation.x = MathUtils.damp(
      ref.current.rotation.x,
      y * ROTATION_INFLUENCE,
      DAMPING,
      delta,
    )
    ref.current.rotation.y = MathUtils.damp(
      ref.current.rotation.y,
      x * ROTATION_INFLUENCE,
      DAMPING,
      delta,
    )
    ref.current.position.x = MathUtils.damp(
      ref.current.position.x,
      x * POSITION_INFLUENCE,
      DAMPING,
      delta,
    )
    ref.current.position.y = MathUtils.damp(
      ref.current.position.y,
      y * POSITION_INFLUENCE,
      DAMPING,
      delta,
    )
  })

  return (
    <mesh ref={ref}>
      <torusKnotGeometry args={[1, 0.32, 256, 32]} />
      <MeshTransmissionMaterial
        transmission={1}
        thickness={1.5}
        roughness={0.1}
        ior={1.5}
        chromaticAberration={0.05}
        anisotropy={0.3}
        distortion={0.1}
        distortionScale={0.2}
        temporalDistortion={0.1}
        clearcoat={1}
        background={undefined}
      />
    </mesh>
  )
}

export default GlassKnot
