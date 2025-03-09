import { createTheme } from '@mui/material/styles';

// Cores corporativas da DSTELECOM (adaptadas conforme necessidade)
export const theme = createTheme({
  palette: {
    primary: {
      main: '#0047AB', // Azul corporativo
      light: '#4F83CC',
      dark: '#003380',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#FF5722', // Laranja de destaque
      light: '#FF8A65',
      dark: '#E64A19',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F5F7FA',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2D3748',
      secondary: '#718096',
    },
    error: {
      main: '#E53E3E',
    },
    warning: {
      main: '#F6AD55',
    },
    info: {
      main: '#4299E1',
    },
    success: {
      main: '#48BB78',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
    button: {
      fontWeight: 500,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          padding: '8px 16px',
        },
        containedPrimary: {
          boxShadow: '0 2px 4px rgba(0, 71, 171, 0.25)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
        },
      },
    },
  },
}); 