import { Container, Typography, Box } from '@mui/material';

const DocumentsPage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Biblioteca de Documentos
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Acesse a documentação técnica, manuais e procedimentos da DSTELECOM.
      </Typography>
      
      <Box sx={{ mt: 4, p: 4, textAlign: 'center', bgcolor: 'background.paper', borderRadius: 2 }}>
        <Typography variant="h6">
          Módulo em desenvolvimento
        </Typography>
        <Typography variant="body2" color="text.secondary">
          A biblioteca de documentos estará disponível em breve.
        </Typography>
      </Box>
    </Container>
  );
};

export default DocumentsPage; 