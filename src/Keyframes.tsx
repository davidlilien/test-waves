
import React from 'react';
import './Keyframes.css';


const COLUMNS = 20;
const ROWS = 20;


export const Keyframes: React.FC = () => { 
  
    const divs = [];

    for (let i=0; i<COLUMNS; i++) {
      for (let j=0; j<ROWS; j++) {
        divs.push(<div key={`i${i}j${j}`} style={{ 
          gridColumn: i+1,
         gridRow: j+1,
        background: 'blue',
        border: '4px solid black',
        opacity: 0.5,
      // transform: `translate3d(0,0,${Math.random()*25}px)`,
      animation: `pulse${Math.floor(Math.random() * 10) + 1} ${(Math.random()+0.5)*2}s infinite alternate`,
      animationTimingFunction: 'ease-in-out'
      }} />)
      }
    }
  
  
  return (
    <div style={{ perspective: '500px', width: '100%', height: '100%'}}>
  <div style={{ display: 'grid',
    gridTemplateColumns: `repeat(${COLUMNS}, 1fr)`,
    gridTemplateRows: `repeat(${ROWS}, 1fr)`,
    gridGap: "4px",
    width: '100%',
    height: '100%',
    transform: 'translate3d(0,0,-150px) rotate3d(0.1, 0, 0.1, 45deg)',
    transformOrigin: 'center',
    perspective: '100px'
   }}>
     {divs}

   </div>
   </div>
)}