import { createTheme, ThemeOptions } from '@mui/material/styles'

const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: '#2d304d',
      light: '#fff',
      dark: '#2b2e4a',
    },
    secondary: {
      main: '#e84545',
      light: '#ECF4FF',
    },
    error: {
      main: '#c0392b',
      dark: '#C70039',
    },
    success: {
      main: '#fff',
    },
    warning: {
      main: '#efbd26',
    },
    background: {
      default: '#fff',
      paper: '#f5f5f5',
    },
    info: {
      main: '#000',
      light: '#fff',
      contrastText: '#6D6D6D',
      dark: '#E6E6E6',
    },
  },
  typography: {
    fontFamily: 'Inter, Arial, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
    },
    h3: {
      fontSize: '1.8rem',
      fontWeight: 700,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 700,
    },
    h5: {
      fontSize: '1.2rem',
      fontWeight: 700,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 700,
    },
    body1: {
      fontSize: '1rem',
    },
    body2: {
      fontSize: '0.8rem',
    },
  },
}

const theme = createTheme(themeOptions)

export default theme
