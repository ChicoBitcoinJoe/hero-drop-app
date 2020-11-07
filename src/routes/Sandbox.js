import React from 'react';

import ScrollContainer from 'react-indiana-drag-scroll';

import useSceneManager from '../services/Scene'

import Background from '../components/Background';
import GameBoard from '../components/GameBoard';
import Grid from '../components/Grid';
import Toolbar from '../components/toolbar/Toolbar';

import useObject from '../hooks/useObject';

const defaultScene = {
  name: 'The Pool of Dreams',
  background: {
    src: 'https://mk0a2minutetabl7hq7i.kinstacdn.com/wp-content/uploads/2019/05/Jungle-Temple-RPG-battle-map-color.jpg', 
    width: 1600,
    height: 1120,
  },
  grid: {
    hexSize: 5.4,
    width: 16,
    height: 13,
    xOffset: 21.4,
    yOffset: -2,
  },
  assets: [
    {
      type: 'avatar',
      src: "https://theoneworldblog.files.wordpress.com/2017/11/shepherd-druid.jpg?w=100",
      x: 1326,
      y: 488,
      textColor: 'rgba(255,255,255,0.87)',
      backgroundColor: 'rgba(255,51,51,1)',
      text: 'Dalla',
      width: 1,
      height: 1
    },
    {
      type: 'avatar',
      src: "https://external-preview.redd.it/rBBZcGNkiqI9Bvx-fB9XT9KEniDWNeuBNvs5EtZylYc.png?auto=webp&s=149ae6bfeeccd69989b1650309d623352fcaa4ca",
      x: 238,
      y: 220,
      textColor: 'rgba(255,255,255,0.87)',
      backgroundColor: 'rgba(55,251,51,1)',
      text: 'Thader',
      width: 1,
      height: 1
    }, 
    {
      type: 'object',
      src: "https://i.pinimg.com/originals/f2/8d/ed/f28ded56a3a38308a0d770d009f90416.png",
      x: 476,
      y: 616,
      width: 150,
      height: 150,
      rotation: 140,
      locked: true,
    }, 
    {
      type: 'object',
      src: "https://i.pinimg.com/originals/f2/8d/ed/f28ded56a3a38308a0d770d009f90416.png",
      x: 536,
      y: 436,
      width: 150,
      height: 150,
      rotation: 0,
      locked: true,
    }, 
    {
      type: 'text',
      text: 'Hero',
      fontSize: 120,
      fontWeight: 'bold',
      x: 800,
      y: 340,
      textColor: 'rgba(255,255,2550.87)',
      backgroundColor: 'rgba(0,0,0,0)',
      width: 360,
      height: 240,
      locked: true,
    },
    {
      type: 'text',
      text: 'Drop',
      fontSize: 120,
      fontWeight: 'bold',
      x: 870,
      y: 464,
      textColor: 'rgba(255,255,2550.87)',
      backgroundColor: 'rgba(0,0,0,0)',
      width: 360,
      height: 240,
      locked: true,
    }
  ]
}

function Sandbox({ User }) {
  
  const Scene = useSceneManager(defaultScene);
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
    //setOpen(false)
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
    <Toolbar User={User} Scene={Scene} openPopper={openPopper} popper={currentPopper} asset={asset} editAsset={editAsset} />
    <ScrollContainer className="game-board" ignoreElements={".game-piece"} hideScrollbars={false}>
      <Background Scene={Scene} />
      <Grid Scene={Scene} onClick={placeAsset} onContextMenuOpen={closeOpenPoppers} openBackgroundSettings={openBackgroundSettings}/>
      <GameBoard Scene={Scene} selectedAsset={selectedAsset} onEditAsset={showEditAssetPopper} onRightClick={closeOpenPoppers} />
    </ScrollContainer>
  </>
}

export default Sandbox;
