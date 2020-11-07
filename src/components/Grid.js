import React from 'react';

import { HexGrid, Layout, GridGenerator, Hexagon } from 'react-hexgrid';
import { Menu, Item, MenuProvider } from 'react-contexify';

export default function Grid({ Scene, onClick, onContextMenuOpen, openBackgroundSettings }) {
  
  let { grid, background } = Scene;

  const ContextMenu = (e) => (
    <Menu id='menu_id_hex'>
      <Item onClick={openBackgroundSettings}>Background Settings</Item>
    </Menu>
  );

  return <>
    <MenuProvider id='menu_id_hex' onContextMenu={onContextMenuOpen}>
      <div style={{ 
        position: 'absolute', 
        top: '0px', 
        left: '0px',
        width: background.width + 'px',
        height: background.height + 'px',
      }}>
        <HexGrid
          width={background.width}
          height={background.height}
          viewBox={grid.xOffset + " " + grid.yOffset + " 100 100"}>
          {
            grid.hidden ? null :
            <Layout className="hexagons"
              size={{ x: grid.hexSize, y: grid.hexSize }}
              spacing={1}
              flat={false}
              origin={{ x: 0, y: 0 }}
            >
              {
                GridGenerator.rectangle(grid.width, grid.height).map((hex, i) => {
                  hex.draggable = false;
                  return <Hexagon
                    key={i}
                    q={hex.q}
                    r={hex.r}
                    s={hex.s}
                    className={(hex.blocked ? 'blocked' : null)}
                    data={hex}
                    onClick={onClick}
                  ></Hexagon>
                })
              }
            </Layout>
          }
        </HexGrid>
      </div>
    </MenuProvider>
    <ContextMenu />
  </>
}