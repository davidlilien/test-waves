import * as THREE from 'three'
import React, { useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import './index.css';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useEffect } from 'react';
import { useSpring,  } from '@react-spring/three';

const height = 5;
const MAX = 30;

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

function Box1(props: JSX.IntrinsicElements['mesh'] & { wireframe: boolean }) {
  const mesh2 = useRef<THREE.Mesh>(null!)
  useSpring({ 
    ...anim,
     // reverse: true,
     onChange: (param) => {mesh2.current.position.y = param.value.y }

});

  

  // useFrame((state, delta) => {(mesh.current.rotation.x += 0.01)})
  return (

     <mesh
      ref={mesh2}
    >
      <sphereGeometry args={[2, 12, 12]} />
      <meshStandardMaterial color={ props.wireframe?"green": "darkgreen"} side={THREE.DoubleSide} wireframe={props.wireframe} opacity={0.5}/>
      
    </mesh>
    
  )
}





const processPoints = (points: Float32Array | undefined, value: number) => {
  const max = MAX;
  let result = points ? points : new Float32Array(max*max*18);
  // let result = new Float32Array(/*max*max*3*6*/18*max*max);
  
  //const unit = 1;
  /*if (!points) {
    console.log('plouf')
    for (let i=0; i<max; i++) {
      for (let j=0; j<max; j++) {
        result.push(new THREE.Vector3(i, 0, j))
        result.push(new THREE.Vector3(i, 0, j+unit))
        result.push(new THREE.Vector3(i+unit, 0, j))
        result.push(new THREE.Vector3(i+unit, 0, j))
        result.push(new THREE.Vector3(i+unit, 0, j+unit))
        result.push(new THREE.Vector3(i, 0, j+unit))
      }
    }
  }*/

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
    
    
          
          /*
          //.push(new THREE.Vector3(i, 0, j))
          /*result.push(new THREE.Vector3(i, 0, j+unit))
          result.push(new THREE.Vector3(i+unit, 0, j))
          result.push(new THREE.Vector3(i+unit, 0, j))
          result.push(new THREE.Vector3(i+unit, 0, j+unit))
          result.push(new THREE.Vector3(i, 0, j+unit))*/
       }
      }
  }
  


  const propagation = MAX/2;

  

  const x = MAX/2;
  const z = MAX/2;

  let p = 0;
  for (let i=0; i< 18*max*max; i+=3) {
   
    const pointX = result[i+0];
    const pointY = result[i+1];
    const pointZ = result[i+2];
    const deltaX = Math.abs(pointX - x);
    const deltaZ = Math.abs(pointZ - z);

    if (pointX === x && pointZ === z) {
      result[i+1] = value
    }
    else if (deltaX < propagation && deltaZ < propagation) {
      result[i+1] = value / Math.max(deltaX, deltaZ);
    }  
  
   


  }


  return result;
}



function Box3(props: JSX.IntrinsicElements['mesh'] & { wireframe: boolean }) {
  const mesh1 = useRef<THREE.Mesh>(null!)
  const mesh2 = useRef<THREE.Mesh>(null!)
  const buffer = useRef<THREE.BufferGeometry>(null!)
  const [value, setValue] = useState(height);
  const [test, setTest] = useState(2);
  const points = useMemo(() => processPoints(undefined, height), []);


  useSpring({ 
    ...anim,

     onChange: (param) => { processPoints(points, param.value.y); buffer.current.attributes.position.needsUpdate = true; } 
  });

  useEffect(() => {
    buffer.current.setAttribute('position', new THREE.BufferAttribute(processPoints(points, value), 3));
  }, [
    
  ])

  return (
    <>
    <mesh
      {...props}
      ref={mesh1}
    >
      <bufferGeometry  ref={buffer}/>
      <meshStandardMaterial color={props.wireframe ? "darkblue" : "blue"} side={THREE.DoubleSide} wireframe={props.wireframe} opacity={0.5}/>
     
    </mesh>
    
    </>
  )
}

const Camera = () =>{ const virtualCamera = React.useRef<THREE.Camera>()
  const [state, setState] = useState(0)
  useFrame(() => {
    // setState((state+1) % 360)
  })

 return (<><PerspectiveCamera makeDefault name="FBO Camera" ref={virtualCamera} position={[Math.cos(state * Math.PI / 180)*10, 3, Math.sin(state * Math.PI / 180)*10]} fov={120}></PerspectiveCamera>
<OrbitControls enableRotate={true} camera={virtualCamera.current} /></>)}

export const Geometry = () => { 
  return (<Canvas>
    <ambientLight />
    {/*<Box1 position={[0, 0, 0]} wireframe={false}/>*/}
    {<Box1 position={[0, 0, 0]} wireframe={true}/>}
    {/*<Box3 position={[-(MAX/2), 0, -(MAX/2)]}  wireframe={false}/>*/}
    <Box3 position={[-(MAX/2), 0, -(MAX/2)]}  wireframe={true}/>
    <Camera />
   
  </Canvas>)
}
