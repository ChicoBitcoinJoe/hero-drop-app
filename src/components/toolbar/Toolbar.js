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
import ChromeReaderModeIcon from '@material-ui/icons/ChromeReaderMode';

import AssetCreator from './AssetCreator';
import BackgroundForm from './BackgroundForm';
import GridForm from './GridForm';
import LoginForm from './LoginForm';
import SaveForm from './SaveForm';

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  flipX: {
    '-webkit-transform': 'rotateX(180deg)',
    'transform': 'rotateX(180deg)'
  }
}));

export default function Toolbar({ User, Scene, openPopper, popper, asset, editAsset }) {

  const Assets = Scene.assets;
  const classes = useStyles();
  const [anchorEl] = React.useState(React.createRef());

  const handlePopperChange = (e, value) => {
    openPopper(value)
  }

  const handleLogin = (email) => {
    console.log(email)
    openPopper(null)
    User.set.isLoggedIn(true)
    // validate(email)
    // handleLogin(email);
  }
  
  return <>
    <Paper ref={anchorEl} style={{ position: 'absolute', top: '24px', left: '24px', zIndex: '5'}}>
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
          !User.isLoggedIn ?
          <ToggleButton value="login" aria-label="color" style={{ backgroundColor: '#44975f', color: 'white' }}>
            &nbsp;Sign in&nbsp;
          </ToggleButton> :
          <ToggleButton value="save" aria-label="save scene" disabled={!User.isLoggedIn} style={{ backgroundColor: '#44975f', color: 'white' }}>
            <Save />
          </ToggleButton>
        }
      </ToggleButtonGroup>
    </Paper>
    {
      //BrandingWatermark, ChromeReaderMode, CropFree, PhotoSizeSelectLarge
      !User.isLoggedIn ? null :
      <Paper style={{ position: 'absolute', top: '24px', right: '24px', zIndex: '5', transform: 'rotateY(180deg)' }}>
        <ToggleButtonGroup value={popper} onChange={null} aria-label="change edit popper">
          <ToggleButton value="background" aria-label="edit background" style={{ color: 'white' }}>
            <ChromeReaderModeIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </Paper>
    }
    
    <Popper open={!(!popper)} anchorEl={anchorEl.current} placement="bottom-start">
      <Paper className="hideScrollBar" 
        style={{ 
          zIndex: '5',
          width: '272px', 
          maxHeight: '320px', 
          overflow: 'auto',
          padding: '12px',
          marginTop: '24px'
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