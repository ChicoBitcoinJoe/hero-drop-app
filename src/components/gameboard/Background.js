import React from 'react';

export default function Background({ ref, src, width, height }) {
  return <>
    <div style={{ 
      position: 'absolute', 
      top: '0px', 
      left: '0px',
      width: width + 'px',
      height: height + 'px',
    }}>
      <img alt="gameboard"
        src={src}
        style={{ 
          display:'block', 
          width: width > 0 ? width + 'px' : 'auto', 
          height: height > 0 ? height + 'px' : 'auto',
        }}
      />
    </div>
  </>
}