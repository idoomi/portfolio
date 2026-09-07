import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import GlassKnot from './GlassKnot.jsx'
import GlowLights from './GlowLights.jsx'
import CursorLight from './CursorLight.jsx'

function HeroScene({ interactive = true }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true }}
    >
      <color attach="background" args={['#3c93ff']} />
      <ambientLight intensity={0.2} />
      <Environment preset="city" />

      <GlassKnot interactive={interactive} />
      <GlowLights />
      <CursorLight />
    </Canvas>
  )
}

export default HeroScene
