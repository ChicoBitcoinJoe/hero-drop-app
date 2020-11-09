import React from 'react';

import useObject from '../hooks/useObject';
import useList from '../hooks/useList';

export default function useSceneManager(Scene) {

  const [name, setName] = React.useState(Scene.name)
  const assets = useList(Scene.assets);
  const [background, updateBackground, setBackground] = useObject(Scene.background);
  const [grid, updateGrid, setGrid] = useObject(Scene.grid);

  React.useEffect(() => {
    //updateBackground({ ref: React.createRef() })
  }, [])

  /* START HACKS */

  /* This is a hack to make the grid size update properly */
  let interval = null;
  const hideGrid = () => {
    if(interval) clearInterval(interval)
    
    updateGrid({hidden: true})
    interval = setInterval(() => {
      clearInterval(interval)        
      updateGrid({hidden: false})
    }, 0)
  }

  /* END HACKS */

  return [
    {
      name,
      assets,
      background,
      grid
    },
    {
      name: setName,
      background: updateBackground,
      grid: updateGrid,
      src: async (src) => {
        await updateBackground({src, width: 0, height: 0})
        updateBackground({
          height: background.ref.current.offsetHeight,
          width: background.ref.current.offsetWidth
        })
      },
      width: async (width) => {
        await updateBackground({width, height: 0})
        updateBackground({height: background.ref.current.offsetHeight})
      },
      height: async (height) => {
        await updateBackground({height, width: 0})
        updateBackground({width: background.ref.current.offsetWidth})
      },
      hexSize: (hexSize) => {
        hideGrid()
        updateGrid({hexSize: hexSize})
      },
    },
    {
      background: setBackground,
      grid: setGrid
    }
  ]
}