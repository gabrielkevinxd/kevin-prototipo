import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Container, Grid, Box } from '@mui/material';
import { RootState } from '@/core/store';
import { supabase } from '@/core/services/supabase';
import { DashboardMetrics } from '../components/DashboardMetrics';
import { RecentDocuments } from '../components/RecentDocuments';
import { ActivityFeed } from '../components/ActivityFeed';
import { WelcomeCard } from '../components/WelcomeCard';

interface Document {
  id: string;
  title: string;
  created_at: string;
  category?: {
    name: string;
  };
}

interface Activity {
  id: string;
  action: string;
  entity_type: string;
  entity_id: string;
  created_at: string;
  user: {
    id: string;
    name: string;
    avatar_url: string | null;
  };
}

const DashboardPage = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [metrics, setMetrics] = useState({
    documentsCount: 0,
    forumsCount: 0,
    contributionsCount: 0,
  });
  const [recentDocuments, setRecentDocuments] = useState<Document[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      
      try {
        // Dados de exemplo para desenvolvimento
        // Em produção, isso seria substituído por chamadas reais à API
        
        // Simular atraso de rede
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Métricas simuladas
        setMetrics({
          documentsCount: 24,
          forumsCount: 8,
          contributionsCount: 42,
        });
        
        // Documentos recentes simulados
        setRecentDocuments([
          {
            id: '1',
            title: 'Guia de Instalação de Fibra Óptica',
            created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            category: { name: 'Técnico' }
          },
          {
            id: '2',
            title: 'Procedimentos de Atendimento ao Cliente',
            created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            category: { name: 'Suporte' }
          },
          {
            id: '3',
            title: 'Relatório Trimestral Q1 2023',
            created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
            category: { name: 'Gestão' }
          },
          {
            id: '4',
            title: 'Manual de Configuração de Roteadores',
            created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
            category: { name: 'Técnico' }
          },
        ]);
        
        // Atividades recentes simuladas
        setActivities([
          {
            id: '1',
            action: 'create',
            entity_type: 'document',
            entity_id: '1',
            created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            user: {
              id: '1',
              name: 'Carlos Silva',
              avatar_url: null
            }
          },
          {
            id: '2',
            action: 'comment',
            entity_type: 'document',
            entity_id: '2',
            created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            user: {
              id: '2',
              name: 'Ana Oliveira',
              avatar_url: null
            }
          },
          {
            id: '3',
            action: 'update',
            entity_type: 'document',
            entity_id: '3',
            created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
            user: {
              id: '3',
              name: 'Roberto Almeida',
              avatar_url: null
            }
          },
          {
            id: '4',
            action: 'create',
            entity_type: 'forum_post',
            entity_id: '1',
            created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
            user: {
              id: '4',
              name: 'Juliana Costa',
              avatar_url: null
            }
          },
        ]);
      } catch (error) {
        console.error('Erro ao carregar dados do dashboard:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDashboardData();
  }, [user?.id]);
  
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <WelcomeCard userName={user?.name || 'Usuário'} />
      
      <DashboardMetrics 
        documentsCount={metrics.documentsCount}
        forumsCount={metrics.forumsCount}
        contributionsCount={metrics.contributionsCount}
        isLoading={isLoading}
      />
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <RecentDocuments documents={recentDocuments} isLoading={isLoading} />
        </Grid>
        <Grid item xs={12} md={5}>
          <ActivityFeed activities={activities} isLoading={isLoading} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default DashboardPage; 