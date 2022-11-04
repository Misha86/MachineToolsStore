import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import SearchIcon from '@mui/icons-material/Search';
import { Search, SearchIconWrapper, StyledInputBase } from '../Search/Search';
import SmallScreenNavbar from './SmallScreenNavbar';
import LargeScreenNavbar from './LargeScreenNavbar';

const pages = [
  { name: 'About Us', path: '/about' },
  { name: 'Contacts', path: '/contacts' },
];

const Navbar = () => {
  
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <SmallScreenNavbar pages={pages} />
          <LargeScreenNavbar pages={pages} />
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Пошук..." inputProps={{ 'aria-label': 'search' }} />
          </Search>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
