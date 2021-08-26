import React from 'react';
import { useSpring, animated, useTrail } from 'react-spring'

const barStyle= {
  width: '24px',
  height: '512px',
  margin: '8px',
  backgroundColor: 'red',
  opacity: 0.5,
}

const COUNT = 24;

export const Audio = () => {
  const trail = useTrail(COUNT, { from: { scaleY: 0.2}, to: { scaleY: 1 }, loop: { reverse: true }, mass: 10 })
  const divs = [];
  for (let i=0; i<COUNT; i++) {
      divs.push(<animated.div key={`i${i}`} style={{...barStyle,
      ...trail[i],
   
    }} ></animated.div>)
  }

  return <div style={{ display: 'flex', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
{divs}
  </div>
}