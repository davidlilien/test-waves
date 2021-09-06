import ReactDOM from 'react-dom'
import React, { useState } from 'react'
import './index.css';
import { Geometry } from './Geometry';
import { Geometry2 } from './Geometry2';
import { Shader } from './Shader';
import { Keyframes } from './Keyframes';
import { Spring } from './Spring';
import FPSStats from "react-fps-stats";
import { Audio } from './Audio';

/*
const components = [ Geometry, Shader, Spring, Audio]

const Test = () => {
  const [display, setDisplay] = useState(0);

  const Component = components[display];

  return <><Component /><button style={{ position: 'fixed', bottom: 0, left: 0}} onClick={() => setDisplay((display+1)%components.length)}>Click me</button></>


}*/

ReactDOM.render(
  <><Audio /><FPSStats /></>,
  document.getElementById('root')
)
