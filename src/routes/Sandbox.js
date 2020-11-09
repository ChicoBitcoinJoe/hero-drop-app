import React from 'react';

import ScrollContainer from 'react-indiana-drag-scroll';

import Background from '../components/gameboard/Background';
import GameBoard from '../components/GamePieces';
import GridOverlay from '../components/GridOverlay';
import Toolbar from '../components/toolbar/Toolbar';
import useObject from '../hooks/useObject';

function Sandbox({ User, Scene, masterLocked, history }) {

  console.log(User,Scene)
  
  const [currentPopper, setCurrentPopper] = React.useState('');
  const [selectedAsset, setSelectedAsset] = React.useState(null);

  const [asset, editAsset] = useObject({
    type: 'avatar',
    text: 'Hero',
    textColor: '#FFFFFF',
    backgroundColor: '#0062B1',
    width: 1,
    height: 1,
  })

  const showEditAssetPopper = (index) => {
    setSelectedAsset(index)
  }

  const openBackgroundSettings = (e) => {
    console.log(e)
  }

  const openPopper = (popperName) => {
    closeOpenPoppers()
    setCurrentPopper(popperName)
  }

  const closeOpenPoppers = () => {
    setCurrentPopper(null)
    setSelectedAsset(null)
  }

  const placeAsset = (e) => {
    if(currentPopper === 'asset') {
      const widthOffset = asset.type === 'avatar' ? asset.width*48 : asset.width / 2;
      const heightOffset = asset.type === 'avatar' ? asset.height*48 : asset.height / 2;
      const x = e.nativeEvent.offsetX - widthOffset; 
      const y = e.nativeEvent.offsetY - heightOffset;
      console.log(x,y)
      Scene.assets.push({
        ...asset,
        x, 
        y
      })
    }
  }
  
  return <>
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <Toolbar User={User} Scene={Scene} openPopper={openPopper} popper={currentPopper} asset={asset} editAsset={editAsset} history={history} />
      <ScrollContainer className="game-board" ignoreElements={".game-piece"} hideScrollbars={false}>
        <Background Scene={Scene} />
        <GridOverlay Scene={Scene} onClick={placeAsset} onContextMenuOpen={closeOpenPoppers} openBackgroundSettings={openBackgroundSettings} masterLocked={masterLocked} />
        <GameBoard Scene={Scene} selectedAsset={selectedAsset} onEditAsset={showEditAssetPopper} onRightClick={closeOpenPoppers} masterLocked={masterLocked} />
      </ScrollContainer>
    </div>
  </>
}

export default Sandbox;
