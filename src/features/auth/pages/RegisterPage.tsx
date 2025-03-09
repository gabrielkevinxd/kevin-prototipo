import { Box, Container, Paper, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
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
            Criar Conta
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
            Registre-se para acessar a plataforma de conhecimento
          </Typography>
          
          {/* Formulário de registro seria implementado aqui */}
          <Typography variant="body1" sx={{ mb: 3, textAlign: 'center' }}>
            O registro de novos usuários é gerenciado pelo administrador do sistema.
            Entre em contato com o departamento de TI para solicitar acesso.
          </Typography>
          
          <Button
            component={Link}
            to="/login"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Voltar para Login
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default RegisterPage; 