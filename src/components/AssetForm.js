import React from 'react'

import { CompactPicker } from 'react-color'

import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';

export default function AssetForm({ asset, editAsset }) {
  
  const [backgroundColor, setBackgroundColor] = React.useState(asset.backgroundColor);
  const [textColor, setTextColor] = React.useState(asset.textColor);

  const handleBackgroundColorChange = (newColor) => {
    editAsset({backgroundColor: newColor})
    setBackgroundColor(newColor.hex)
  }

  const handleTextColorChange = (newColor) => {
    editAsset({textColor: newColor})
    setTextColor(newColor.hex)
  }

  const setNoBackgroundColor = (e) => {
    e.preventDefault()
    handleBackgroundColorChange('rgba(0,0,0,0)')
  }

  React.useEffect(() => {
    setBackgroundColor(asset.backgroundColor)
    setTextColor(asset.textColor)
  }, [asset])

  return <>
    {
      asset.type === 'text' ? null :
      <TextField id="asset-url" fullWidth
        value={asset.src} 
        onChange={(e) => editAsset({src: e.target.value})}
        inputProps={{
          step: 0.1,
          style: { textAlign: 'right' }
        }}
        InputProps={{
          startAdornment: <InputAdornment position="start">Url: </InputAdornment>,
        }}
      />
    }
    {
      asset.type === 'object' ? null :
      <TextField id="asset-text"
        value={asset.text} 
        onChange={(e) => editAsset({text: e.target.value})}
        inputProps={{
          step: 0.1,
          style: { textAlign: 'right' }
        }}
        InputProps={{
          startAdornment: <InputAdornment position="start">
            <div style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              { asset.type === 'avatar' ? <>Name:</> : <>Text:</> } 
            </div>
          </InputAdornment>,
        }} 
      />
    }
    {
      asset.type !== 'text' ? null :
      <TextField id="asset-text-size"
        type="number"
        value={asset.fontSize} 
        onChange={(e) => editAsset({fontSize: e.target.value})}
        inputProps={{
          step: 1,
          style: { textAlign: 'right' }
        }}
        InputProps={{
          startAdornment: <InputAdornment position="start">Text Size</InputAdornment>,
        }} 
      />
    }
    <TextField id="asset-width" fullWidth
      type="number"
      value={asset.width} 
      onChange={(e) => editAsset({width: e.target.value})}
      inputProps={{
        step: asset.type === 'avatar' ? 0.1 : 1,
        style: { textAlign: 'right' }
      }}
      InputProps={{
        startAdornment: <InputAdornment position="start">Width: </InputAdornment>,
        endAdornment: <InputAdornment position="start">{ asset.type === 'avatar' ? 'in' : 'px'}</InputAdornment>,
      }} 
    />
    <TextField id="asset-height" fullWidth
      type="number"
      value={asset.height} 
      onChange={(e) => editAsset({height: e.target.value})}
      inputProps={{
        step: asset.type === 'avatar' ? 0.1 : 1,
        style: { textAlign: 'right' }
      }}
      InputProps={{
        startAdornment: <InputAdornment position="start">Height: </InputAdornment>,
        endAdornment: <InputAdornment position="start">{ asset.type === 'avatar' ? 'in' : 'px'}</InputAdornment>,
      }} 
    />
    {
      asset.type !== 'object' ? null :
      <TextField id="asset-rotation" fullWidth
        type="number"
        value={asset.rotation} 
        onChange={(e) => editAsset({rotation: e.target.value})}
        inputProps={{
          step: 15,
          min: 0,
          max: 360,
          style: { textAlign: 'right' }
        }}
        InputProps={{
          startAdornment: <InputAdornment position="start">Rotation: </InputAdornment>,
          endAdornment: <InputAdornment position="start">degrees</InputAdornment>,
        }} 
      />
    }
    {
      asset.type === 'object' ? null :
      <div style={{ width: '100%', borderBottom: '1px solid #EEE', padding: '4px 0 8px 0' }}>
        <Grid container justify={'space-between'} style={{ color: 'rgba(255,255,255,0.7)', paddingBottom: '4px' }}>
          Primary Color:
          <Link component="button" color="inherit" onClick={setNoBackgroundColor}>[none]</Link>
        </Grid>
        <CompactPicker color={ backgroundColor } onChange={(color) => handleBackgroundColorChange(color.hex) }/>
      </div>
    }
    {
      asset.type === 'object' ? null :
      <div style={{ width: '100%', borderBottom: '1px solid #EEE', padding: '4px 0 8px 0' }}>
        <div style={{ color: 'rgba(255,255,255,0.7)', paddingBottom: '4px' }}>Text Color:</div>
        <CompactPicker color={ textColor } onChange={(color) => handleTextColorChange(color.hex) }/>
      </div>
    }
  </>

}