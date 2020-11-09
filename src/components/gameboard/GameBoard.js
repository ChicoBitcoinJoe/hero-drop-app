import React from 'react'

import ScrollContainer from 'react-indiana-drag-scroll';
import { Menu, Item, Submenu } from 'react-contexify';

import Assets from './Assets';
import Background from './Background';
import Grid from './Grid';

export default function GameBoard({ name, assets, background, grid, player, sync, allowRightClick }) {

  const handleAssetChange = (change) => {
    sync(change)    
  }

  const ping = ({event, props}) => {
    let x = event.offsetX;
    let y = event.offsetY;
    sync({
      target: 'grid',
      function: 'ping',
      data: { x, y }
    })
  }

  const onGridClick = (event, props) => {
    let x = event.nativeEvent.offsetX;
    let y = event.nativeEvent.offsetY;
    console.log('Clicked grid at:', x, y)
  }

  const GridContextMenu = (e) => (
    !allowRightClick ? null :
    <Menu id='menu_id_hex'>
      <Item onClick={ping}>Ping Location</Item>
    </Menu>
  );

  const onAssetRightClick = (id, asset) => {
    console.log('Right clicked', {id, asset})
  }

  const onEditAsset = (id, asset) => {
    console.log({id, asset})
  }
  
  const onRemoveAsset = (id, asset) => {
    console.log({id, asset})
  }

  const getAssetContextMenu = (asset, id) => {
    return (
      !allowRightClick ? null :
      <Menu id={'asset_menu' + id} style={{ zIndex: '10' }} onShown={() => onAssetRightClick(id, asset)}>
        <Item onClick={() => onEditAsset(id, asset)}>Edit</Item>
        <Submenu label="Delete">
          <Item onClick={() => onRemoveAsset(id, asset)}>Confirm</Item>
        </Submenu>
      </Menu>
    )
  }

  const onGridContextMenuOpen = () => {
    if(allowRightClick) console.log('Opened Grid Context Menu')
  }

  return <>
    <ScrollContainer className="game-board" ignoreElements={".game-piece"} hideScrollbars={false}>
      <Background {...background} />
      <Grid container={background} settings={grid} onClick={onGridClick} ContextMenu={GridContextMenu} onContextMenuOpen={onGridContextMenuOpen} hidden={false} />
      <Assets assets={assets} ContextMenu={getAssetContextMenu} onChange={handleAssetChange} locked={false} />
    </ScrollContainer>
  </>
}