import { CircularProgress, Box, Typography } from '@mui/material';

interface LoadingScreenProps {
  message?: string;
}

const LoadingScreen = ({ message = 'Carregando...' }: LoadingScreenProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100%',
        backgroundColor: theme => theme.palette.background.default,
      }}
    >
      <CircularProgress size={60} thickness={4} color="primary" />
      <Typography
        variant="h6"
        sx={{ mt: 3, color: theme => theme.palette.text.secondary }}
      >
        {message}
      </Typography>
    </Box>
  );
};

export default LoadingScreen; 