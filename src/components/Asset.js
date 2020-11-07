import React from 'react'

import Avatar from '@material-ui/core/Avatar'

function Asset({ asset }) {
  return <>
    {
      asset.type === 'avatar' ? <AvatarAsset asset={asset} /> :
      asset.type === 'text' ? <TextAsset asset={asset} /> :
      asset.type === 'object' ? <ObjectAsset asset={asset} /> :
      null
    }
  </>
}

function AvatarAsset({ asset }) {
  return <>
    <div style={{ zIndex: '2', width: (asset.width * 96) + 'px', height: (asset.height * 96 + 24) + 'px' }}>
      <Avatar style={{ 
          border: '4px solid ' + (asset.backgroundColor ? asset.backgroundColor : 'rgba(255,255,255,1)'), 
          width: asset.width + 'in', 
          height: asset.height + 'in'
        }}
        ref={asset.ref}
        src={asset.src}
      />
      {
        !asset.text ? null :
        <div style={{ 
          whiteSpace: 'nowrap',
          textAlign: 'center',
          backgroundColor: (asset.backgroundColor ? asset.backgroundColor : 'rgba(255,255,255,1)'), 
          color: (asset.textColor ? asset.textColor : 'rgba(0,0,0,1)'),
          margin: '4px 0px', 
          padding: '0px 8px', 
          height: '20px', 
          width: asset.width + 'in', 
          overflow: 'hidden', 
          textOverflow: 'ellipsis', 
          borderRadius: '16px',
          fontWeight: 'bold'
        }}>
          {asset.text}
        </div> 
      }
    </div>
  </>
}

function TextAsset({ asset }) {
  return <>
    <div style={{ 
      fontSize: asset.fontSize + 'px', 
      fontWeight: asset.fontWeight, 
      color: (asset.textColor ? asset.textColor : 'rgba(0,0,0,1)'),
      width: asset.width + 'px', 
      height: asset.height + 'px',
      border: '8px solid ' + (asset.backgroundColor ? asset.backgroundColor : 'rgba(255,255,255,0)'),
      backgroundColor: asset.backgroundColor,
    }}>
      {asset.text}
    </div>
  </>
}

function ObjectAsset({ asset }) {
  let rotation = 'rotate(' + asset.rotation + 'deg)';
  return <>
    <img alt="object asset" 
      src={asset.src} 
      onLoad={asset.onLoad}
      ref={asset.ref} 
      style={{ 
        zIndex: '2', 
        width: asset.width ? asset.width + 'px' : 'auto', 
        height: asset.height ? asset.height + 'px' : 'auto',
        WebkitTransform: rotation,
        MozTransform: rotation,
        msTransform: rotation,
        OTransform: rotation,
        transform: rotation,
      }} 
    />
  </>
}

export default Asset;
