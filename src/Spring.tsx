import React from 'react';
import { useSpring, animated, useTrail } from 'react-spring'

const COLUMNS = 10;
const ROWS = 10;

export const Spring = () => {
  // const props = useSpring({ to: { opacity: 1 }, from: { opacity: 0 }, loop: { reverse: true }, })
  const trail = useTrail(COLUMNS*ROWS, { from: { transform: 'translate3d(0,100px,-15px)'}, to: { transform: 'translate3d(0,100px,15px)' }, loop: { reverse: true },  })
  const divs = [];

  for (let i=0; i<COLUMNS; i++) {
    for (let j=0; j<ROWS; j++) {
      divs.push(<animated.div key={`i${i}j${j}`} style={{ 
        gridColumn: i+1,
       gridRow: j+1,
      background: 'blue',
      opacity: 0.5,
      ...trail[i * 1 + j],
   
    }} />)
    }
  }




  return  <div style={{ perspective: '500px', width: '100%', height: '100%'}}>
  <div style={{ display: 'grid',
    gridTemplateColumns: `repeat(${COLUMNS}, 1fr)`,
    gridTemplateRows: `repeat(${ROWS}, 1fr)`,
    gridGap: "8px",
    width: '100%',
    height: '100%',
    transform: 'translate3d(0,0,-150px) rotate3d(0.1, 0, 0.1, 45deg)',
    transformOrigin: 'center',
    perspective: '100px'
   }}>
     {divs}

   </div>
   </div>  
}