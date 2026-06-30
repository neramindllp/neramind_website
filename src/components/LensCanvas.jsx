/* eslint-disable react/no-unknown-property */
import * as THREE from 'three'
import { useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useFBO, useGLTF, MeshTransmissionMaterial, Environment } from '@react-three/drei'
import { easing } from 'maath'

useGLTF.preload('/assets/3d/lens.glb')

function LensScene({ pointer }) {
  const meshRef = useRef()
  const { nodes } = useGLTF('/assets/3d/lens.glb')
  const { viewport, camera, gl, scene } = useThree()
  const buffer = useFBO()

  useFrame((state, delta) => {
    const v = viewport.getCurrentViewport(camera, [0, 0, 15])
    easing.damp3(
      meshRef.current.position,
      [pointer.current.x * (v.width / 2), pointer.current.y * (v.height / 2), 15],
      0.1,
      delta
    )

    // Render the main scene into FBO so the lens has something to distort
    meshRef.current.visible = false
    gl.setRenderTarget(buffer)
    gl.render(scene, camera)
    gl.setRenderTarget(null)
    meshRef.current.visible = true
  })

  const geo = nodes['Cylinder']?.geometry

  return (
    <>
      <Environment preset="city" />
      <mesh scale={[viewport.width, viewport.height, 1]} position={[0, 0, 0]}>
        <planeGeometry />
        <meshBasicMaterial map={buffer.texture} />
      </mesh>
      {geo && (
        <mesh ref={meshRef} scale={0.18} rotation-x={Math.PI / 2} geometry={geo}>
          <MeshTransmissionMaterial
            buffer={buffer.texture}
            ior={1.2}
            thickness={5}
            anisotropy={0.05}
            chromaticAberration={0.1}
            transmission={1}
            roughness={0}
          />
        </mesh>
      )}
    </>
  )
}

export default function LensCanvas({ pointer }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 20], fov: 15 }}
      gl={{ alpha: true, antialias: true }}
      style={{ width: '100%', height: '100%' }}
    >
      <LensScene pointer={pointer} />
    </Canvas>
  )
}
