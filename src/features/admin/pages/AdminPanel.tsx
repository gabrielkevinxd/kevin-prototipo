import { Container, Typography, Box, Paper, Tabs, Tab } from '@mui/material';
import { useState } from 'react';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`admin-tabpanel-${index}`}
      aria-labelledby={`admin-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const AdminPanel = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Painel Administrativo
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Gerencie usuários, categorias e configurações do sistema.
      </Typography>
      
      <Paper sx={{ mt: 3, borderRadius: 2 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="admin tabs"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="Usuários" />
          <Tab label="Categorias" />
          <Tab label="Configurações" />
        </Tabs>
        
        <TabPanel value={tabValue} index={0}>
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h6">
              Gerenciamento de Usuários
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Módulo em desenvolvimento. Aqui você poderá gerenciar usuários, permissões e departamentos.
            </Typography>
          </Box>
        </TabPanel>
        
        <TabPanel value={tabValue} index={1}>
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h6">
              Gerenciamento de Categorias
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Módulo em desenvolvimento. Aqui você poderá criar e editar categorias para documentos e fóruns.
            </Typography>
          </Box>
        </TabPanel>
        
        <TabPanel value={tabValue} index={2}>
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h6">
              Configurações do Sistema
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Módulo em desenvolvimento. Aqui você poderá ajustar configurações globais da plataforma.
            </Typography>
          </Box>
        </TabPanel>
      </Paper>
    </Container>
  );
};

export default AdminPanel; 