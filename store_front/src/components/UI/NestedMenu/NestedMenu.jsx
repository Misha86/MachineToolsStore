import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import { NestedMenuItem } from 'mui-nested-menu';

const NestedMenu = ({ smallScreen }) => {
  const [menuPosition, setMenuPosition] = useState(null);

  const handleOpenNavMenu = (event) => {
    if (menuPosition) {
      return;
    }
    event.preventDefault();
    let elementPosition = event.currentTarget.getBoundingClientRect();
    setMenuPosition({
      left: smallScreen ? elementPosition.right : elementPosition.left,
      top: smallScreen ? elementPosition.top : elementPosition.bottom,
    });
  };

  const handleCloseNavMenu = (event) => {
    setMenuPosition(null);
  };
  return (
    <div>
      {smallScreen ? (
        <NestedMenuItem label="Products" onClick={handleOpenNavMenu} />
      ) : (
        <Button sx={{ my: 2, color: 'white', display: 'block' }} onClick={handleOpenNavMenu}>
          Products
        </Button>
      )}
      <Menu
        open={!!menuPosition}
        onClose={() => setMenuPosition(null)}
        anchorReference="anchorPosition"
        anchorPosition={menuPosition}
        onMouseDown={() => setMenuPosition(null)}
      >
        <NestedMenuItem
          label="Button1"
          parentMenuOpen={!!menuPosition}
          onClick={handleCloseNavMenu}
        >
          <MenuItem onClick={handleCloseNavMenu}>Sub-Button1</MenuItem>
          <MenuItem onClick={handleCloseNavMenu}>Sub-Button1</MenuItem>
          <MenuItem onClick={handleCloseNavMenu}>Sub-Button1</MenuItem>
          <MenuItem onClick={handleCloseNavMenu}>Sub-Button1</MenuItem>
        </NestedMenuItem>
        <NestedMenuItem
          label="Button1"
          parentMenuOpen={!!menuPosition}
          onClick={handleCloseNavMenu}
        >
          <MenuItem onClick={handleCloseNavMenu}>Sub-Button1</MenuItem>
          <MenuItem onClick={handleCloseNavMenu}>Sub-Button1</MenuItem>
          <MenuItem onClick={handleCloseNavMenu}>Sub-Button1</MenuItem>
          <MenuItem onClick={handleCloseNavMenu}>Sub-Button1</MenuItem>
        </NestedMenuItem>
        <NestedMenuItem
          label="Button1"
          parentMenuOpen={!!menuPosition}
          onClick={handleCloseNavMenu}
        >
          <MenuItem onClick={handleCloseNavMenu}>Sub-Button1</MenuItem>
          <MenuItem onClick={handleCloseNavMenu}>Sub-Button1</MenuItem>
          <MenuItem onClick={handleCloseNavMenu}>Sub-Button1</MenuItem>
          <MenuItem onClick={handleCloseNavMenu}>Sub-Button1</MenuItem>
        </NestedMenuItem>
      </Menu>
    </div>
  );
};

export default NestedMenu;
