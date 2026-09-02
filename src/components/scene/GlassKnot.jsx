import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshTransmissionMaterial } from '@react-three/drei'

function GlassKnot() {
  const ref = useRef(null)

  useFrame((_, delta) => {
    if (!ref.current) return
    ref.current.rotation.x += delta * 0.15
    ref.current.rotation.y += delta * 0.2
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
