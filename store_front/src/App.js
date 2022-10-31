import Navbar from './components/UI/Navbar/Navbar';
import { ThemeProvider } from '@mui/material/styles';
import { darkTheme } from './utils/themes';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';


function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <BrowserRouter>
        <Navbar />
        <AppRouter />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
