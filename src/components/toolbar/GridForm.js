import React from 'react'

import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

export default function GridForm({ Scene, classes }) {
  return <>
    <div style={{ fontWeight: 'bold', fontSize: '18px', padding: '11.5px 0px'}}>Grid Settings</div>
    <form className={classes.form} noValidate autoComplete="off">
      <TextField id="hex-size" 
        type="number" 
        value={Scene.grid.hexSize} 
        onChange={(e) => Scene.update.hexSize(e.target.value)}
        inputProps={{
          min: 0,
          style: { textAlign: 'right' },
          step: 0.1
        }}
        InputProps={{                  
          startAdornment: <InputAdornment position="start">Hex Size: </InputAdornment>,
          endAdornment: <InputAdornment position="start">units</InputAdornment>,
        }} 
      />
      <TextField id="grid-width" 
        type="number" 
        value={Scene.grid.width} 
        onChange={(e) => Scene.update.grid({width: e.target.value})}
        inputProps={{
          min: 0, 
          style: { textAlign: 'right' }
        }}
        InputProps={{                  
          startAdornment: <InputAdornment position="start">Width: </InputAdornment>,
          endAdornment: <InputAdornment position="start">hexes</InputAdornment>,
        }} 
      />
      <TextField id="grid-width" 
        type="number" value={Scene.grid.height} 
        onChange={(e) => Scene.update.grid({height: e.target.value})}
        inputProps={{
          min: 0, 
          style: { textAlign: 'right' }
        }}
        InputProps={{                  
          startAdornment: <InputAdornment position="start">Height: </InputAdornment>,
          endAdornment: <InputAdornment position="start">hexes</InputAdornment>,
        }} 
      />
      <TextField id="grid-xOffset" 
        type="number" 
        value={Scene.grid.xOffset} 
        onChange={(e) => Scene.update.grid({xOffset: e.target.value})}
        inputProps={{
          step: 1,
          style: { textAlign: 'right' }
        }}
        InputProps={{
          startAdornment: <InputAdornment position="start">X-Offset: </InputAdornment>,
          endAdornment: <InputAdornment position="start">px</InputAdornment>,
        }} 
      />
      <TextField id="grid-yOffset" 
        type="number" 
        step={1} 
        value={Scene.grid.yOffset} 
        onChange={(e) => Scene.update.grid({yOffset: e.target.value})}
        inputProps={{
          style: { textAlign: 'right' }
        }}
        InputProps={{
          startAdornment: <InputAdornment position="start">Y-Offset: </InputAdornment>,
          endAdornment: <InputAdornment position="start">px</InputAdornment>,
        }} 
      />
    </form>
  </>  
}