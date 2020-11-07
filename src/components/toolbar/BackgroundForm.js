import React from 'react'

import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

export default function BackgroundForm({ Scene, classes }) {
  return <>
    <div style={{ fontWeight: 'bold', fontSize: '18px', padding: '11.5px 0px'}}>Background Settings</div>
    <form className={classes.form} noValidate autoComplete="off">
      <TextField id="image-url" fullWidth
        value={Scene.background.src} 
        onChange={(e) => Scene.update.src(e.target.value)}
        InputProps={{
          startAdornment: <InputAdornment position="start">Url: </InputAdornment>,
        }} 
      />
      <TextField id="image-width" 
        type="number" 
        value={Scene.background.width} 
        onChange={(e) => Scene.update.width(e.target.value)}
        inputProps={{
          min: 0, 
          style: { textAlign: 'right' }
        }}
        InputProps={{                  
          startAdornment: <InputAdornment position="start">Width: </InputAdornment>,
          endAdornment: <InputAdornment position="start">px</InputAdornment>,
        }} 
      />
      <TextField id="image-height" 
        type="number" 
        value={Scene.background.height} 
        onChange={(e) => Scene.update.height(e.target.value)}
        inputProps={{
          min: 0, 
          style: { textAlign: 'right' }
        }}
        InputProps={{                  
          startAdornment: <InputAdornment position="start">Height: </InputAdornment>,
          endAdornment: <InputAdornment position="start">px</InputAdornment>,
        }} 
      />
    </form>
  </>
}