import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshTransmissionMaterial } from '@react-three/drei'
import { Color, DynamicDrawUsage, Float32BufferAttribute, MathUtils, Vector3 } from 'three'

const GRADIENT_TOP_COLOR = new Color('#0a3d75')
const GRADIENT_BOTTOM_COLOR = new Color('#bfe0ff')

const ROTATION_INFLUENCE = 0.5
const POSITION_INFLUENCE = 0.2
const DAMPING = 4

// Water-brush deformation tuning
const BRUSH_RADIUS = 0.85
const BRUSH_RADIUS_SQ = BRUSH_RADIUS * BRUSH_RADIUS
const BRUSH_STRENGTH_SCALE = 6
const BRUSH_MAX_STRENGTH = 1
const BRUSH_PUSH = 0.5 // displacement of a single fully-strength stroke, before falloff/clamp
const BRUSH_DECAY = 0.92 // per-frame decay at 60fps, scaled by delta below
const BRUSH_MIN_STRENGTH = 0.01
const MAX_STROKES = 60
const MAX_DISPLACEMENT = 0.55

// Path sub-sampling so fast drags leave a continuous trail, not gaps
const STEP_LENGTH = 0.05
const MAX_STEPS_PER_MOVE = 8

// How quickly the visible mesh eases toward the freshly computed target
// shape each frame (higher = snappier, lower = softer/laggier trailing)
const EASE_RATE = 9
const SETTLE_EPSILON = 0.0006

function GlassKnot() {
  const ref = useRef(null)
  const geometryRef = useRef(null)
  const target = useRef({ x: 0, y: 0 })
  const isPointerActive = useRef(true)

  const basePositions = useRef(null)
  const targetPositions = useRef(null)
  const strokes = useRef([])
  const lastLocalPoint = useRef(null)
  const wasDeformed = useRef(false)

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

  useEffect(() => {
    const geometry = geometryRef.current
    if (!geometry) return

    const positionAttribute = geometry.attributes.position
    positionAttribute.setUsage(DynamicDrawUsage)
    basePositions.current = Float32Array.from(positionAttribute.array)
    targetPositions.current = Float32Array.from(positionAttribute.array)

    let minY = Infinity
    let maxY = -Infinity
    for (let i = 1; i < positionAttribute.array.length; i += 3) {
      const y = positionAttribute.array[i]
      if (y < minY) minY = y
      if (y > maxY) maxY = y
    }
    const yRange = maxY - minY || 1

    const colors = new Float32Array(positionAttribute.count * 3)
    const color = new Color()
    for (let i = 0, v = 0; i < positionAttribute.count; i++, v += 3) {
      const y = positionAttribute.array[v + 1]
      const t = (y - minY) / yRange
      color.copy(GRADIENT_TOP_COLOR).lerp(GRADIENT_BOTTOM_COLOR, t)
      colors[v] = color.r
      colors[v + 1] = color.g
      colors[v + 2] = color.b
    }
    geometry.setAttribute('color', new Float32BufferAttribute(colors, 3))
  }, [])

  const handleSurfaceMove = (event) => {
    event.stopPropagation()
    if (!ref.current) return

    const localPoint = ref.current.worldToLocal(event.point.clone())

    if (lastLocalPoint.current) {
      const fullDelta = localPoint.clone().sub(lastLocalPoint.current)
      const fullDistance = fullDelta.length()

      if (fullDistance > 0.0005) {
        const steps = Math.min(
          Math.max(Math.round(fullDistance / STEP_LENGTH), 1),
          MAX_STEPS_PER_MOVE,
        )
        const unitDirection = fullDelta.clone().normalize()
        const stepVector = fullDelta.multiplyScalar(1 / steps)
        const stepStrength = Math.min(
          fullDistance * BRUSH_STRENGTH_SCALE,
          BRUSH_MAX_STRENGTH,
        )
        const cursor = lastLocalPoint.current.clone()

        for (let s = 0; s < steps; s++) {
          cursor.add(stepVector)
          strokes.current.push({
            point: cursor.clone(),
            direction: unitDirection,
            strength: stepStrength,
          })
        }

        while (strokes.current.length > MAX_STROKES) {
          strokes.current.shift()
        }
      }
    }

    lastLocalPoint.current = localPoint
  }

  const handleSurfaceLeave = () => {
    lastLocalPoint.current = null
  }

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

    const geometry = geometryRef.current
    const base = basePositions.current
    const targetArray = targetPositions.current
    if (!geometry || !base || !targetArray) return

    const decay = Math.pow(BRUSH_DECAY, delta * 60)
    for (let i = strokes.current.length - 1; i >= 0; i--) {
      const stroke = strokes.current[i]
      stroke.strength *= decay
      if (stroke.strength < BRUSH_MIN_STRENGTH) {
        strokes.current.splice(i, 1)
      }
    }

    const hasActiveStrokes = strokes.current.length > 0
    if (!hasActiveStrokes && !wasDeformed.current) return

    targetArray.set(base)

    if (hasActiveStrokes) {
      const activeStrokes = strokes.current
      const displacement = new Vector3()

      for (let v = 0; v < targetArray.length; v += 3) {
        const vx = base[v]
        const vy = base[v + 1]
        const vz = base[v + 2]

        displacement.set(0, 0, 0)

        for (const stroke of activeStrokes) {
          const dx = vx - stroke.point.x
          const dy = vy - stroke.point.y
          const dz = vz - stroke.point.z
          const distSq = dx * dx + dy * dy + dz * dz
          if (distSq > BRUSH_RADIUS_SQ) continue

          // Smooth polynomial falloff (zero value AND zero slope at the
          // brush radius boundary) instead of a gaussian's long, jittery tail
          const u = distSq / BRUSH_RADIUS_SQ
          const falloff =
            (1 - u) * (1 - u) * (1 - u) * stroke.strength * BRUSH_PUSH

          displacement.x += stroke.direction.x * falloff
          displacement.y += stroke.direction.y * falloff
          displacement.z += stroke.direction.z * falloff
        }

        const magnitude = displacement.length()
        if (magnitude > MAX_DISPLACEMENT) {
          displacement.multiplyScalar(MAX_DISPLACEMENT / magnitude)
        }

        targetArray[v] += displacement.x
        targetArray[v + 1] += displacement.y
        targetArray[v + 2] += displacement.z
      }
    }

    // Ease the actual mesh toward the freshly computed target shape rather
    // than snapping to it, so motion reads as fluid instead of jittery
    const positionAttribute = geometry.attributes.position
    const current = positionAttribute.array
    const easeFactor = 1 - Math.exp(-EASE_RATE * delta)

    let maxDiff = 0
    for (let i = 0; i < current.length; i++) {
      const diff = targetArray[i] - current[i]
      current[i] += diff * easeFactor
      const remaining = Math.abs(targetArray[i] - current[i])
      if (remaining > maxDiff) maxDiff = remaining
    }

    positionAttribute.needsUpdate = true
    geometry.computeVertexNormals()
    wasDeformed.current = hasActiveStrokes || maxDiff > SETTLE_EPSILON
  })

  return (
    <mesh
      ref={ref}
      onPointerMove={handleSurfaceMove}
      onPointerOut={handleSurfaceLeave}
    >
      <torusKnotGeometry ref={geometryRef} args={[1, 0.32, 256, 32]} />
      <MeshTransmissionMaterial
        vertexColors
        transparent
        opacity={1}
        transmission={1}
        thickness={0.1}
        roughness={0}
        ior={1.5}
        chromaticAberration={0.02}
        anisotropy={0.3}
        distortion={0.03}
        distortionScale={0.05}
        temporalDistortion={0.02}
        clearcoat={1}
        samples={10}
        resolution={1024}
        background={undefined}
      />
    </mesh>
  )
}

export default GlassKnot
