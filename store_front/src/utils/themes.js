import { createTheme } from '@mui/material/styles';

export const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#003049',
    },
    secondary: {
      main: '#bdbdbd',
    },
  },
  button: {
    '&.active': {
      background: 'black',
    },
  },
});
