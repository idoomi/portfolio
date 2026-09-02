import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei'
import GlassText from './GlassText.jsx'
import GlowSpheres from './GlowSpheres.jsx'

function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true }}
    >
      <color attach="background" args={['#0a0a0c']} />
      <ambientLight intensity={0.2} />
      <Environment preset="city" />

      <GlassText />
      <GlowSpheres />

      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  )
}

export default HeroScene
