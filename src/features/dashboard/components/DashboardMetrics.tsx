import { Box, Card, Typography, Grid } from '@mui/material';
import { BookText, MessageSquare, Users } from 'lucide-react';

interface DashboardMetricsProps {
  documentsCount: number;
  forumsCount: number;
  contributionsCount: number;
  isLoading: boolean;
}

export const DashboardMetrics = ({
  documentsCount,
  forumsCount,
  contributionsCount,
  isLoading,
}: DashboardMetricsProps) => {
  const metricsData = [
    {
      id: 'documents',
      title: 'Documentos',
      value: documentsCount,
      icon: <BookText size={24} />,
      color: '#4F83CC',
      bgColor: 'rgba(79, 131, 204, 0.1)',
    },
    {
      id: 'forums',
      title: 'Tópicos de Fórum',
      value: forumsCount,
      icon: <MessageSquare size={24} />,
      color: '#48BB78',
      bgColor: 'rgba(72, 187, 120, 0.1)',
    },
    {
      id: 'contributions',
      title: 'Contribuições',
      value: contributionsCount,
      icon: <Users size={24} />,
      color: '#805AD5',
      bgColor: 'rgba(128, 90, 213, 0.1)',
    },
  ];

  return (
    <Box sx={{ mt: 3, mb: 4 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Resumo de Atividades
      </Typography>
      <Grid container spacing={3}>
        {metricsData.map((metric) => (
          <Grid item xs={12} sm={4} key={metric.id}>
            <Card
              sx={{
                p: 3,
                display: 'flex',
                alignItems: 'center',
                borderRadius: 2,
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
              }}
            >
              <Box
                sx={{
                  mr: 2,
                  p: 1.5,
                  borderRadius: 2,
                  display: 'flex',
                  backgroundColor: metric.bgColor,
                  color: metric.color,
                }}
              >
                {metric.icon}
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  {metric.title}
                </Typography>
                <Typography variant="h5" sx={{ mt: 0.5, fontWeight: 600 }}>
                  {isLoading ? '...' : metric.value.toLocaleString()}
                </Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}; 