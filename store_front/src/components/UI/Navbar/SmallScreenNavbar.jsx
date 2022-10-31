import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Handyman from '@mui/icons-material/Handyman';
import Box from '@mui/material/Box';
import { IconSm, TypographySm, BoxSm, MenuSm } from './NavbarStyles';
import NestedMenu from '../NestedMenu/NestedMenu';
import { Link } from 'react-router-dom';

const SmallScreenNavbar = ({ pages }) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <>
      <Handyman sx={IconSm} />
      <Typography component={Link} to="/" variant="h4" noWrap sx={TypographySm}>
        KS
      </Typography>
      <Box sx={BoxSm}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={MenuSm}
        >
          <NestedMenu smallScreen={true} />
          {pages.map((page) => (
            <MenuItem
              component={Link}
              to={page.path}
              key={page.name}
              onClick={handleCloseNavMenu}
            >
              <Typography textAlign="center">{page.name}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </>
  );
};

export default SmallScreenNavbar;
