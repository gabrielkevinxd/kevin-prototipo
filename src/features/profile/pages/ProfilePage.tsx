import { Container, Typography, Box, Paper, Avatar, Grid, Divider } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '@/core/store';

const ProfilePage = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Meu Perfil
      </Typography>
      
      <Paper sx={{ p: 3, borderRadius: 2, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar
              sx={{ width: 120, height: 120, mb: 2, fontSize: '3rem' }}
              src={user?.avatar_url || undefined}
            >
              {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </Avatar>
            <Typography variant="h6" align="center">
              {user?.name || 'Usuário'}
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
              {user?.role || 'Colaborador'}
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={9}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Email
              </Typography>
              <Typography variant="body1">
                {user?.email || 'email@dstelecom.com.br'}
              </Typography>
            </Box>
            
            <Divider sx={{ my: 2 }} />
            
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Departamento
              </Typography>
              <Typography variant="body1">
                {user?.department || 'Não especificado'}
              </Typography>
            </Box>
            
            <Divider sx={{ my: 2 }} />
            
            <Box>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Função
              </Typography>
              <Typography variant="body1">
                {user?.role === 'admin' ? 'Administrador' : 
                 user?.role === 'editor' ? 'Editor' : 'Visualizador'}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
      
      <Box sx={{ mt: 4, p: 4, textAlign: 'center', bgcolor: 'background.paper', borderRadius: 2 }}>
        <Typography variant="h6">
          Módulo em desenvolvimento
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Funcionalidades adicionais de perfil estarão disponíveis em breve.
        </Typography>
      </Box>
    </Container>
  );
};

export default ProfilePage; 