import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

const ParticleSystem = ({ position }) => {
  const particleRef = useRef()

  useFrame(({ clock }) => {
    if (particleRef.current) {
      const particles = particleRef.current.vertices
      for (let i = 0; i < particles.length; i++) {
        particles[i].y -= 0.05
        particles[i].x += Math.sin(clock.elapsedTime + i * 10) * 0.01
        particles[i].z += Math.cos(clock.elapsedTime + i * 10) * 0.01
      }
      particleRef.current.verticesNeedUpdate = true
    }
  })

  const handleOnClick = () => {
    const particleCount = 10
    const particles = new THREE.Geometry()
    const material = new THREE.PointsMaterial({ size: 0.05, color: '#ffffff' })

    for (let i = 0; i < particleCount; i++) {
      const x = position.x
      const y = position.y
      const z = position.z
      const particle = new THREE.Vector3(x, y, z)
      particles.vertices.push(particle)
    }

    const particleSystem = new THREE.Points(particles, material)
    particleRef.current = particleSystem

  }

  return (
    <mesh onClick={handleOnClick}>
      <sphereBufferGeometry args={[0.2, 32, 32]} />
      <meshBasicMaterial color='#ffffff' />
    </mesh>
  )
}

export default ParticleSystem