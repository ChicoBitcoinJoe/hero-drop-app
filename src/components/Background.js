import React from 'react';

export default function Background({ Scene }) {
  return <>
    <div style={{ 
      position: 'absolute', 
      top: '0px', 
      left: '0px',
      width: Scene.background.width + 'px',
      height: Scene.background.height + 'px',
    }}>
      <img alt="gameboard"
        ref={Scene.background.ref}
        onLoad={Scene.onLoad}
        src={Scene.background.src}
        style={{ 
          display:'block', 
          width: Scene.background.width > 0 ? Scene.background.width + 'px' : 'auto', 
          height: Scene.background.height > 0 ? Scene.background.height + 'px' : 'auto',
        }}
      />
    </div>
  </>
}