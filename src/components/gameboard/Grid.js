import React from 'react';

import { HexGrid, Layout, GridGenerator, Hexagon } from 'react-hexgrid';
import { MenuProvider } from 'react-contexify';

export default function Grid({ container, settings, ContextMenu, onContextMenuOpen, hidden, onClick }) {
  const { hexSize, width, height, xOffset, yOffset } = settings;
  return <>
    <MenuProvider id='menu_id_hex' onContextMenu={onContextMenuOpen}>
      <div style={{ 
        position: 'absolute', 
        top: '0px', 
        left: '0px',
        width: container.width + 'px',
        height: container.height + 'px',
      }}>
        <HexGrid
          width={container.width}
          height={container.height}
          viewBox={xOffset + " " + yOffset + " 100 100"}>
          {
            hidden ? null :
            <Layout className="hexagons"
              size={{ x: hexSize, y: hexSize }}
              spacing={1}
              flat={false}
              origin={{ x: 0, y: 0 }}
            >
              {
                GridGenerator.rectangle(width, height).map((hex, i) => {
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