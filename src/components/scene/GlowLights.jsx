const lights = [
  { position: [-1.6, 0.6, -1.2], color: '#00e5ff' },
  { position: [1.7, -0.4, -0.8], color: '#ff2ea6' },
  { position: [0.2, 1.4, -1.6], color: '#ff8a00' },
]

function GlowLights() {
  return (
    <>
      {lights.map((light) => (
        <pointLight
          key={light.color}
          position={light.position}
          color={light.color}
          intensity={4}
          distance={4}
        />
      ))}
    </>
  )
}

export default GlowLights
