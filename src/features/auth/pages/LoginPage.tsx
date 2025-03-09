import { Box, Container, Paper, Typography } from '@mui/material';
import { LoginForm } from '../components/LoginForm';

const LoginPage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme => theme.palette.background.default,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: 2,
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            DSTELECOM Knowledge
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
            Entre para acessar a plataforma de conhecimento
          </Typography>
          
          <LoginForm />
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginPage; 