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


function Box2(props: JSX.IntrinsicElements['mesh'] & { wireframe: boolean }) {
  const mesh2 = useRef<THREE.Mesh>(null!)
  const geom = useRef<THREE.PlaneGeometry>(null!);
  // const [test, setTest] = useState(0);

  

  let test = 0;

  useFrame((state, delta) => {
    const position = geom.current.attributes.position;

      for ( let i = 0; i < position.count; i ++ ) {

        position.setZ( i, Math.sin(position.getX(i) + test));

      }

      test += 0.1;

      position.needsUpdate = true;
  })
  return (

     <mesh
      ref={mesh2}
    >
  
      <planeGeometry ref={geom} args={[20, 20, 100, 100]} />
      <meshStandardMaterial color={ props.wireframe?"green": "darkgreen"} side={THREE.DoubleSide} wireframe={props.wireframe} opacity={1}/>
      
    </mesh>
    
  )
}





const Camera = () =>{ const virtualCamera = React.useRef<THREE.Camera>()
  const [state, setState] = useState(0)
  //useFrame(() => {
    // setState((state+1) % 360)
  //})

 return (<><PerspectiveCamera makeDefault name="FBO Camera" ref={virtualCamera} position={[0,0,-20]} fov={100}></PerspectiveCamera>
<OrbitControls enableRotate={true} camera={virtualCamera.current} /></>)}

export const Geometry2 = () => { 
  return (<Canvas>
    <ambientLight />
    {/*<Box1 position={[0, 0, 0]} wireframe={false}/>*/}
    {/*<Box1 position={[0, 0, 0]} wireframe={true}/>*/}
    {/*<Box3 position={[-(MAX/2), 0, -(MAX/2)]}  wireframe={false}/>*/}
    {/*<Box3 position={[-(MAX/2), 0, -(MAX/2)]}  wireframe={true}/>*/}
    <Box2 position={[0, 0, 0]} wireframe={true}/>
    <Camera />
   
  </Canvas>)
}
