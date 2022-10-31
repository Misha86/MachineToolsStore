import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Handyman from '@mui/icons-material/Handyman';
import { IconLg, TypographyLg, BoxLg } from './NavbarStyles';
import NestedMenu from '../NestedMenu/NestedMenu';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const LargeScreenNavbar = ({ pages }) => {
  const location = useLocation();

  return (
    <>
      <Handyman sx={IconLg} />
      <Typography component={Link} to="/" variant="h5" noWrap sx={TypographyLg}>
        KS
      </Typography>

      <Box sx={BoxLg}>
        <NestedMenu />
        {pages.map((page) => (
          <Button
            style={page.path === location.pathname ? { color: 'grey' } : { color: 'white' }}
            selected={page.path === location.pathname}
            component={Link}
            to={page.path}
            key={page.name}
            sx={{ my: 2, display: 'block' }}
          >
            {page.name}
          </Button>
        ))}
      </Box>
    </>
  );
};

export default LargeScreenNavbar;
