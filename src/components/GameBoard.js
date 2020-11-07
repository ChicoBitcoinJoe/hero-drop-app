import React from 'react';

import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';

import AssetEditor from '../components/AssetEditor';
import GamePiece from '../components/GamePiece';
import Asset from '../components/Asset';
import useKeyPress from '../hooks/useKeyPress';

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

function GameBoard({ Scene, selectedAsset, onEditAsset, onRightClick }) {
  
  const unlocked = useKeyPress('Control');
  const [anchorEl, setAnchorEl] = React.useState();
  const [open, setOpen] = React.useState(false);

  const handleEditAsset = ({event}, i) => {
    console.log(event, i)
    setAnchorEl(event.srcElement)
    setOpen(true)
    onEditAsset(i)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return <>
    {
      Scene.assets.list.map((asset, i) => {
        let editAsset = Scene.assets.get(i)[1];
        
        const updatePosition = (x,y) => {
          editAsset({ x, y })
        }
        
        return <div key={i}>
          <GamePiece  
            id={i} 
            asset={asset}
            updatePosition={updatePosition}
            draggable={!asset.locked || unlocked}
            onRightClick={onRightClick}
            onEditAsset={(event) => handleEditAsset(event, i)}
            onRemoveAsset={() => Scene.assets.remove(i)}
          >
            <Asset asset={asset} />
          </GamePiece>
        </div>
      })
    }
    <Popper open={open && selectedAsset >= 0} anchorEl={anchorEl} {...popperOptions}>
      <Paper className="hideScrollBar" elevation={3} style={paperStyles}>
        <AssetEditor editableAsset={Scene.assets.get(selectedAsset)} onClose={handleClose} />
      </Paper>
    </Popper>
  </>
}

export default GameBoard;