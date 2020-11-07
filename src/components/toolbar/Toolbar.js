import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';

import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

import Save from '@material-ui/icons/Save';
import Place from '@material-ui/icons/Place';
import WallpaperIcon from '@material-ui/icons/Wallpaper';
import GridOnIcon from '@material-ui/icons/GridOn';

import Float from '../Float';

import AssetCreator from './AssetCreator';
import BackgroundForm from './BackgroundForm';
import GridForm from './GridForm';
import LoginForm from './LoginForm';
import SaveForm from './SaveForm';

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexWrap: 'wrap',
  }
}));

export default function Toolbar({ User, Scene, openPopper, popper, asset, editAsset }) {

  const Assets = Scene.assets;
  const classes = useStyles();

  const handlePopperChange = (e, value) => {
    openPopper(value)
  }

  User.set.isLoggedIn(true)
  const handleLogin = (email) => {
    console.log(email)
    openPopper(null)
    User.set.isLoggedIn(true)
    // validate(email)
    // handleLogin(email);
  }
  
  return <>
    <Float x={24} y={24} fixed={true} zIndex={6}>
      <Paper>
        <ToggleButtonGroup exclusive value={popper} onChange={handlePopperChange} aria-label="change edit popper">
          <ToggleButton value="background" aria-label="edit background" style={{ color: 'white' }}>
            <WallpaperIcon />
          </ToggleButton>
          <ToggleButton value="grid" aria-label="edit grid" style={{ color: 'white' }}>
            <GridOnIcon />
          </ToggleButton>
          <ToggleButton value="asset" aria-label="edit assets" style={{ color: 'white' }}>
            <Place />
          </ToggleButton>
          {
            !User.isLoggedIn ? null :
            <ToggleButton value="save" aria-label="save scene" disabled={!User.isLoggedIn} style={{ backgroundColor: '#44975f', color: 'white' }}>
              <Save />
            </ToggleButton>
          }
        </ToggleButtonGroup>
      </Paper>
    </Float>
    {
      User.isLoggedIn ? null :
      <Float x={192} y={24} fixed={true} zIndex={6}>
        <ToggleButtonGroup exclusive value={popper} onChange={handlePopperChange} aria-label="text formatting">
          <ToggleButton value="login" aria-label="color" style={{ marginLeft: '16px', backgroundColor: '#44975f', color: 'white', border: '1px solid #EEE', borderRadius: '4px' }}>
            &nbsp;Sign in&nbsp;
          </ToggleButton>
        </ToggleButtonGroup>
      </Float>
    }
    <Popper open={!(!popper)} placement="bottom-end">
      <Paper className="hideScrollBar" 
        style={{ 
          zIndex: '5',
          width: '272px', 
          maxHeight: '320px', 
          overflow: 'auto',
          padding: '12px', 
          margin: '96px 0px 0px 24px',        
        }}
      >
        {
          popper === 'background' ? <BackgroundForm Scene={Scene} classes={classes} /> :
          popper === 'grid' ? <GridForm Scene={Scene} classes={classes} /> :
          popper === 'asset' ? <AssetCreator Assets={Assets} asset={asset} editAsset={editAsset} /> :
          popper === 'login' ? <LoginForm handleLogin={handleLogin} /> :
          popper === 'save' ? <SaveForm User={User} Scene={Scene} /> :
          <div></div>
        }
      </Paper>
    </Popper>
  </>
}