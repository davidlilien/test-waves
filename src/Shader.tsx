import * as THREE from 'three'
import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import './index.css';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';

function Box3(props: JSX.IntrinsicElements['mesh']) {
  const mesh = useRef<THREE.Mesh>(null!)
  const ref = useRef<THREE.ShaderMaterial>(null!);
let factor = 1;
  useFrame(() => { ref.current.uniforms.test.value =  (ref.current.uniforms.test.value + 0.1)
      if (ref.current.uniforms.height.value >= 1) {
         factor=-1;
        
      } 

      if (ref.current.uniforms.height.value <= -1) {
        factor=1;
      }
      ref.current.uniforms.height.value =  (ref.current.uniforms.height.value + 0.02 * factor) 
    });


  return (
    <mesh
      {...props}
      ref={mesh}
    >
       <planeGeometry  args={[20, 20, 50, 50]} />
      <shaderMaterial ref={ref} vertexShader={shader} side={THREE.DoubleSide} wireframe={true} color="#A0A0A0" uniforms={{ test: { value: 0 }, height: { value: 0.1}}}/>

    </mesh>
  )
}
export const Shader = () => { 
  const virtualCamera = React.useRef<THREE.Camera>()
  return (<Canvas>
    <ambientLight />
    <Box3 position={[0, 0, -0]}  />
    <PerspectiveCamera makeDefault name="FBO Camera" ref={virtualCamera} position={[0, 0, -15]} fov={120}></PerspectiveCamera>
<OrbitControls enableRotate={true} camera={virtualCamera.current} />
   
  </Canvas>)
}

const shader = `uniform float test;
uniform float height;
void main() {
  gl_Position = projectionMatrix *
                modelViewMatrix *
                vec4(position.x, position.y, height * sin(position.x + test), 1);
}`
