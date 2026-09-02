import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import GlassKnot from './GlassKnot.jsx'
import GlowSpheres from './GlowSpheres.jsx'

function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true }}
    >
      <color attach="background" args={['#0a0a0c']} />
      <ambientLight intensity={0.2} />
      <Environment preset="city" />

      <GlassKnot />
      <GlowSpheres />
    </Canvas>
  )
}

export default HeroScene
