import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

const spheres = [
  { position: [-1.6, 0.6, -1.2], color: '#00e5ff', speed: 0.6 },
  { position: [1.7, -0.4, -0.8], color: '#ff2ea6', speed: 0.45 },
  { position: [0.2, 1.4, -1.6], color: '#ff8a00', speed: 0.75 },
]

function GlowSphere({ position, color, speed }) {
  const ref = useRef(null)

  useFrame((_, delta) => {
    if (!ref.current) return
    ref.current.rotation.x += delta * speed
    ref.current.rotation.y += delta * speed * 0.7
  })

  return (
    <group ref={ref} position={position}>
      <mesh>
        <sphereGeometry args={[0.45, 32, 32]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
      <pointLight color={color} intensity={4} distance={4} />
    </group>
  )
}

function GlowSpheres() {
  return (
    <>
      {spheres.map((sphere) => (
        <GlowSphere key={sphere.color} {...sphere} />
      ))}
    </>
  )
}

export default GlowSpheres
