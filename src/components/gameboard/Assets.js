import React from 'react';

import Draggable from 'react-draggable'
import { Menu, Item, Separator, Submenu, MenuProvider } from 'react-contexify'

import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';

import AssetEditor from '../AssetEditor';
import Asset from './Asset';
import useKeyPress from '../../hooks/useKeyPress';

const popperOptions = {
  placement: "right-start",
  disablePortal: true,
  modifiers: {
    flip: {
      enabled: true,
    },
    preventOverflow: {
      enabled: true,
      boundariesElement: 'scrollParent',
    },
  }
}

const paperStyles = { 
  zIndex: '5', 
  maxWidth: '272px', 
  maxHeight: '320px', 
  padding: '12px', 
  margin: '24px', 
  overflow: 'auto' 
};

export default function Assets({ assets, ContextMenu, onChange, locked }) {
  
  const ctrlDown = useKeyPress('Control');
  const [anchorEl, setAnchorEl] = React.useState();
  const [open, setOpen] = React.useState(false);

  const handleEditAsset = ({event}, i) => {
    console.log(event, i)
    setAnchorEl(event.srcElement)
    setOpen(true)
    //onEditAsset(i)
  }

  const handleClose = () => {
    setOpen(false)
  }
  
  const handleGrab = (id, asset) => (event, prop) => {
    let x = prop.x;
    let y = prop.y;
    onChange({
      target: 'asset',
      function: 'handleGrab',
      data: { id, x, y }
    })
  }

  let interval = null;
  let x = null;
  let y = null;
  const handleDrag = (id, asset) => (event, prop) => {
    x = prop.x;
    y = prop.y;
    if(interval) return;
    interval = setInterval(() => {
      onChange({
        target: 'asset',
        function: 'handleDrag',
        data: { id, x, y }
      })
    }, 250)
  }

  const handleDrop = (id, asset) => (event, prop) => {
    let x = prop.x;
    let y = prop.y;
    onChange({
      target: 'asset',
      function: 'handleDrop',
      data: { id, x, y }
    })    
    clearInterval(interval)
  }
  
  return <>
    {
      assets.list.map((asset, id) => {
        let draggable = (!asset.locked || ctrlDown) && !locked;
        return <div key={id}>
          <MenuProvider id={'asset_menu' + id}>
            <Draggable disabled={!draggable} 
              position={{ x: asset.x, y: asset.y }}
              onStart={handleGrab(id, asset)}
              onDrag={handleDrag(id, asset)}
              onStop={handleDrop(id, asset)}
            >
              <div className="game-piece" 
                style={{ 
                  cursor: !draggable ? 'default' : 'grab', 
                  userSelect: draggable ? 'default' : 'none', 
                  pointerEvents: draggable ? 'auto' : 'none',
                }}
              >
                <div style={{ pointerEvents: 'none'}}>
                  <Asset asset={asset} />
                </div>
              </div>
            </Draggable>
          </MenuProvider>
          {ContextMenu(asset, id)}
        </div>
      })
    }
  </>
}

/*
    <Popper open={open && selectedAsset >= 0} anchorEl={anchorEl} {...popperOptions}>
      <Paper className="hideScrollBar" elevation={3} style={paperStyles}>
        <AssetEditor editableAsset={Scene.assets.get(selectedAsset)} onClose={handleClose} />
      </Paper>
    </Popper>
*/