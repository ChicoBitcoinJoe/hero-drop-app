import React from 'react';

import Draggable from 'react-draggable'
import { Menu, Item, Separator, Submenu, MenuProvider } from 'react-contexify'

export default function GamePiece({ id, x, y, draggable, onGrab, onMove, onDrop, onRightClick, onEditAsset, onRemoveAsset, children }) {

  const onStart = (event, props) => {
    let x = props.x;
    let y = props.y;
    onGrab(id,x,y)
  }
  
  const onDrag = (event, props) => {
    let x = props.x;
    let y = props.y;
    onMove(id,x,y)
  }

  const onStop = (event, props) => {
    let x = props.x;
    let y = props.y;
    onDrop(id,x,y)
  }

  return <>
    <MenuProvider id={'asset_menu' + id}>
      <Draggable disabled={!draggable} 
        position={{x, y}}
        onStart={onStart}
        onDrag={onDrag}
        onStop={onStop}
      >
        <div className="game-piece" 
          style={{ 
            cursor: !draggable ? 'default' : 'grab', 
            userSelect: draggable ? 'default' : 'none', 
            pointerEvents: draggable ? 'auto' : 'none',

          }}
        >
          <div style={{ pointerEvents: 'none'}}>{children}</div>
        </div>
      </Draggable>
    </MenuProvider>
    <Menu id={'asset_menu' + id} style={{ zIndex: '10' }}
      onShown={onRightClick}>
      <Item onClick={onEditAsset}>Edit</Item>
      <Submenu label="Delete">
        <Item onClick={onRemoveAsset}>Confirm</Item>
       </Submenu>
    </Menu>
  </>
}