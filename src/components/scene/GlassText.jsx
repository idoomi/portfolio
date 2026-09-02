import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Center, MeshTransmissionMaterial, Text3D } from '@react-three/drei'

const FONT_URL = '/fonts/helvetiker_bold.typeface.json'

function GlassText() {
  const ref = useRef(null)

  useFrame((_, delta) => {
    if (!ref.current) return
    ref.current.rotation.x += delta * 0.15
    ref.current.rotation.y += delta * 0.2
  })

  return (
    <group ref={ref}>
      <Center>
        <Text3D
          font={FONT_URL}
          size={2}
          height={0.6}
          curveSegments={32}
          bevelEnabled
          bevelThickness={0.08}
          bevelSize={0.04}
          bevelSegments={8}
        >
          Hi
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
          />
        </Text3D>
      </Center>
    </group>
  )
}

export default GlassText
