import * as THREE from 'three'
import React, { useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import './index.css';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useEffect } from 'react';
import { useSpring,  } from '@react-spring/three';

const height = 5;
const MAX = 100;

const anim = {
  loop: { reverse: true },
  from: {
    y: -height,
  },
  to: {
    y: height,
  },
  mass: 10
}


const processPoints = (points: Float32Array | undefined, value: number) => {
  const max = MAX;
  let result = points ? points : new Float32Array(max*max*18);
  

  if (!points) {
    for (let i=0; i<max; i++) {
      for (let j=0; j<max; j++) {
        const indexBase = (i*18*max + j*18);
    
        // Triagnle 1
        result[indexBase+0] = i;
        result[indexBase+1] = 0;
        result[indexBase+2] = j;
        result[indexBase+3] = i;
        result[indexBase+4] = 0;
        result[indexBase+5] = j+1;
        result[indexBase+6] = i+1;
        result[indexBase+7] = 0;
        result[indexBase+8] = j;
        
        // Triangle 2
        result[indexBase+9] = i+1;
        result[indexBase+10] = 0;
        result[indexBase+11] = j;
        result[indexBase+12] = i+1;
        result[indexBase+13] = 0;
        result[indexBase+14] = j+1;
        result[indexBase+15] = i;
        result[indexBase+16] = 0;
        result[indexBase+17] = j+1;
       }
      }
  }
  
  return result;
}



function Box3(props: JSX.IntrinsicElements['mesh']) {
  const mesh = useRef<THREE.Mesh>(null!)
  const ref = useRef<THREE.ShaderMaterial>(null!);
  const buffer = useRef<THREE.BufferGeometry>(null!)
  const [value, setValue] = useState(height);
  const [test, setTest] = useState(2);
  const points = useMemo(() => processPoints(undefined, height), []);

  useFrame(() => { ref.current.uniforms.test.value =  (ref.current.uniforms.test.value + 0.1) })


/*
  useSpring({ 
    ...anim,
    onChange: (param) => { processPoints(points, param.value.y); buffer.current.attributes.position.needsUpdate = true; } 
  });
*/
  useEffect(() => {
    // buffer.current.setAttribute('position', new THREE.BufferAttribute(processPoints(points, value), 3));
  }, [
    
  ])

  return (
    <mesh
      {...props}
      ref={mesh}
    >
       <planeGeometry  args={[20, 20, 100, 100]} />
      {/*<meshStandardMaterial color="#A0A0A0" wireframe={true} side={THREE.DoubleSide} />*/}
      <shaderMaterial ref={ref} vertexShader={shader} side={THREE.DoubleSide} wireframe={true} color="#A0A0A0" uniforms={{ test: { value: test }}}/>

    </mesh>
  )
}

const Camera = () =>{ const virtualCamera = React.useRef<THREE.Camera>()
  
 return (<><PerspectiveCamera makeDefault name="FBO Camera" ref={virtualCamera} position={[0, 0, -15]} fov={120}></PerspectiveCamera>
<OrbitControls enableRotate={true} camera={virtualCamera.current} /></>)}

export const Shader = () => { 
  return (<Canvas>
    <ambientLight />
    <Box3 position={[0, 0, -0]}  />
    <Camera />
   
  </Canvas>)
}

const shader = `uniform float test;
void main() {
  gl_Position = projectionMatrix *
                modelViewMatrix *
                vec4(position.x, position.y, sin(position.x + test), 1);
}`
