import { Suspense, useEffect, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Preload, useGLTF } from "@react-three/drei"
import CanvasLoader from '../Loader'

const Computers = ({ isMobile }) => {
  const computer = useGLTF('./desktop_pc/scene.gltf') // this is how we are rendering in the desktop computer 3d model

  return (
    <mesh>
      <hemisphereLight intensity={0.15} groundColor='black'/>
      <pointLight intensity={1}/> {/* Line above, under, and this line are all lighting */}
      <spotLight position={[-20, 50, 10]} angle={0.12} penumbra={1} intensity={1} castShadow shadow-mapSize={1024}/>
      <primitive object={computer.scene} scale={isMobile ? 0.5 : 0.75} position={isMobile ? [-3, -2.9, -1.5] : [0, -3.25, -1.5]} rotation={[-0.01, -0.2, -0.1]}/> {/* Computer Model */}
    </mesh>
  )
}

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 500px)') // Gets screen width

    setIsMobile(mediaQuery.matches) // are we on the device that is smaller than the width of 500px

    const handleMediaQueryChange = (e) => { // If the matches changes this will set isMobile to the new match
      setIsMobile(e.matches)
    }

    mediaQuery.addEventListener('change', handleMediaQueryChange) // calls the handleMediaQueryChange when the event listener listens to a change

    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange) // we have to close the eventListener in a useEffect function
    }
  }, [])

  return (  
    <Canvas frameLoop="demand" shadows camera={{ position: [20, 3, 5], fov: 25}} gl={{ preserveDrawingBuffer: true }}> {/* Canvas/background to render the 3d model */}
      <Suspense fallback={<CanvasLoader />}> {/* Loading screen */}
        <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2}/> {/* When rotating the 3d model this keeps it on a horizontal plane */}
        <Computers isMobile={isMobile}/> 
      </Suspense>
      <Preload all />
    </Canvas>
    )
}

export default ComputersCanvas