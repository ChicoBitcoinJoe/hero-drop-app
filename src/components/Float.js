import React from 'react';

export default function Float(props) {
  return <div style={{
      ...props.style,
      position: props.fixed ? 'fixed' : 'absolute', 
      top: (props.y ? props.y : '0') + 'px', 
      left: (props.x ? props.x : '0') + 'px', 
      zIndex: props.zIndex 
    }}>
    {props.children}
  </div>
}