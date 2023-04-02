import React, { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Decal, Float, OrbitControls, Preload, useTexture } from '@react-three/drei'
import CanvasLoader from '../Loader'
import ParticleSystem from '../../utils/ParticleSystem'

const Ball = (props) => {
  const [ decal ] = useTexture([props.imgUrl])
  const [ clicked, setClicked ] = useState(false)

  const handleClick = () => {
    setClicked(true)
  }

  if(clicked) {
    return (
      <ParticleSystem position={[0, 0, 1]} />
    )
  }

  return (
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2} onClick={handleClick}>
      <ambientLight intensity={0.25}/>
      <directionalLight position={[0, 0, 0.05]}/>
      <mesh castShadow receiveShadow scale={2.75}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial color='#fff8eb' polygonOffset polygonOffsetFactor={-5} flatShading />
        <Decal position={[0, 0, 1]} rotation={[2 * Math.PI, 0, 6.25]} flatShading map={decal}></Decal>
      </mesh>
    </Float>
  )
}

const BallCanvas = ({ icon }) => {
  return (
    <Canvas frameLoop='demand' gl={{ preserveDrawingBuffer: true }}>
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls enableZoom={false}/>
        <Ball imgUrl={icon}/>
      </Suspense>
      <Preload all />
    </Canvas>
  )
}

export default BallCanvas