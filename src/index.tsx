import ReactDOM from 'react-dom'
import React from 'react'
import './index.css';
import { Geometry } from './Geometry';
import { Geometry2 } from './Geometry2';
import { Shader } from './Shader';
import { Keyframes } from './Keyframes';
import { Spring } from './Spring';
import FPSStats from "react-fps-stats";

ReactDOM.render(
  <><Shader /><FPSStats /></>,
  document.getElementById('root')
)