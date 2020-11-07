import React from 'react'

import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';

export default function SaveForm({ User, Scene }) {

  const submit = (e) => {
    e.preventDefault()
    let background = { 
      src: Scene.background.src,
      width: Scene.background.width,
      height: Scene.background.height,
    };
    
    let grid = { 
      hexSize: Scene.background.hexSize,
      width: Scene.background.width,
      height: Scene.background.height,
      xOffset: Scene.background.xOffset,
      yOffset: Scene.background.yOffset,
    };

    let currentScene = {
      name: Scene.name,
      assets: [...Scene.assets.list],
      background,
      grid,
    }
    
    let sceneJSON = JSON.stringify(currentScene);
    console.log('JSON', {sceneJSON})
  }

  return <>
    <div style={{ fontWeight: 'bold', fontSize: '18px', padding: '11.5px 0px'}}>Save Scene</div>
    <form noValidate autoComplete="on" onSubmit={submit}>
      <TextField id="scene-name"
        value={Scene.name} 
        onChange={(e) => Scene.update.name(e.target.value)}
        InputProps={{                  
          startAdornment: <InputAdornment position="start">Name: </InputAdornment>
        }} 
      />
      <Button
        variant="outlined"
        className="green"
        style={{ width: '100%', margin: '16px 0px'}}
        type="submit"
        disabled={!Scene.name}>
        continue
      </Button>
    </form>
  </>
}