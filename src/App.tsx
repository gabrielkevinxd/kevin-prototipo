import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { store } from '@/core/store';
import { AppRouter } from '@/core/router/AppRouter';
import { theme } from '@/core/theme/theme';

const App = () => {
  return (
    <StrictMode>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppRouter />
        </ThemeProvider>
      </Provider>
    </StrictMode>
  );
};

export default App; 