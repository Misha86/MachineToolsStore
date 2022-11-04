import React, { useState, useEffect } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import { NestedMenuItem } from 'mui-nested-menu';
import CategoryService from '../../../API/CategoryService';
import { Link } from 'react-router-dom';


const NestedMenu = ({ smallScreen }) => {
  const [menuPosition, setMenuPosition] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [subMenuItems, setSubMenuItems] = useState(null);

  const fetchCategories = async () => {
    setIsLoading(true);
    const categories = await CategoryService.getAllCategories();
    setSubMenuItems(categories);
    setIsLoading(false);
  };

  const handleOpenNavMenu = (event) => {
    fetchCategories();
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
        onMouseDown={handleCloseNavMenu}
      >
        {subMenuItems &&
          subMenuItems.map((category) => (
            <NestedMenuItem
              key={category.name}
              label={category.name}
              parentMenuOpen={!!menuPosition}
              onClick={handleCloseNavMenu}
            >
              {category.children &&
                category.children.map((sub) => (
                  <MenuItem
                    component={Link}
                    to={`/categories/${sub.slug}/products`}
                    key={sub.name}
                    onClick={handleCloseNavMenu}
                  >
                    {sub.name}
                  </MenuItem>
                ))}
            </NestedMenuItem>
          ))}
      </Menu>
    </div>
  );
};

export default NestedMenu;
