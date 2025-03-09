import { Card, CardContent, Typography, Box, Button } from '@mui/material';
import { PlusCircle } from 'lucide-react';

interface WelcomeCardProps {
  userName: string;
}

export const WelcomeCard = ({ userName }: WelcomeCardProps) => {
  // Determinar o cumprimento com base na hora do dia
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
  };

  return (
    <Card 
      sx={{ 
        mb: 4, 
        background: 'linear-gradient(to right, #0047AB, #4F83CC)',
        color: 'white',
        borderRadius: 2,
        boxShadow: '0 4px 20px rgba(0, 71, 171, 0.15)',
      }}
    >
      <CardContent sx={{ py: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
              {getGreeting()}, {userName}!
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9, mb: 2 }}>
              Bem-vindo à plataforma de conhecimento da DSTELECOM. 
              Aqui você pode acessar documentos, participar do fórum e colaborar com a equipe.
            </Typography>
            <Button 
              variant="contained" 
              startIcon={<PlusCircle size={18} />}
              sx={{ 
                bgcolor: 'rgba(255, 255, 255, 0.2)', 
                '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.3)' },
                backdropFilter: 'blur(4px)',
                color: 'white',
                fontWeight: 500,
                mt: 1,
              }}
            >
              Criar Novo Documento
            </Button>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            {/* Aqui poderia ser adicionada uma ilustração ou ícone */}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}; 