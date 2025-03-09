import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  List, 
  ListItem, 
  Avatar, 
  Skeleton,
  Divider,
  Chip
} from '@mui/material';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

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

interface ActivityFeedProps {
  activities: Activity[];
  isLoading: boolean;
}

export const ActivityFeed = ({ activities, isLoading }: ActivityFeedProps) => {
  const getActivityIcon = (entityType: string) => {
    switch (entityType) {
      case 'document':
        return '📄';
      case 'forum_post':
        return '💬';
      case 'comment':
        return '🗨️';
      default:
        return '🔔';
    }
  };

  const getActivityText = (activity: Activity) => {
    const actionMap: Record<string, string> = {
      create: 'criou',
      update: 'atualizou',
      delete: 'removeu',
      comment: 'comentou em',
      like: 'curtiu',
      share: 'compartilhou'
    };

    const entityMap: Record<string, string> = {
      document: 'um documento',
      forum_post: 'um tópico no fórum',
      comment: 'um comentário',
      profile: 'um perfil'
    };

    const action = actionMap[activity.action] || activity.action;
    const entity = entityMap[activity.entity_type] || activity.entity_type;

    return `${action} ${entity}`;
  };

  const formatDate = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { 
        addSuffix: true,
        locale: ptBR
      });
    } catch (error) {
      return 'Data inválida';
    }
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">Atividades Recentes</Typography>
        </Box>
        
        <List sx={{ p: 0 }}>
          {isLoading ? (
            Array(5).fill(0).map((_, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Skeleton variant="circular" width={40} height={40} sx={{ mr: 2 }} />
                  <Box sx={{ width: '100%' }}>
                    <Skeleton variant="rectangular" height={20} width="60%" sx={{ mb: 1 }} />
                    <Skeleton variant="rectangular" height={16} width="40%" />
                  </Box>
                </Box>
                {index < 4 && <Divider sx={{ my: 2 }} />}
              </Box>
            ))
          ) : activities.length > 0 ? (
            activities.map((activity, index) => (
              <Box key={activity.id}>
                <ListItem 
                  disablePadding 
                  sx={{ 
                    py: 1.5,
                    display: 'flex',
                    alignItems: 'flex-start',
                  }}
                >
                  <Avatar 
                    src={activity.user.avatar_url || undefined} 
                    alt={activity.user.name}
                    sx={{ mr: 2, width: 40, height: 40 }}
                  >
                    {activity.user.name.charAt(0).toUpperCase()}
                  </Avatar>
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                      <Typography variant="body2" sx={{ fontWeight: 500, mr: 1 }}>
                        {activity.user.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {getActivityText(activity)}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                        <Chip 
                          label={getActivityIcon(activity.entity_type)} 
                          size="small" 
                          sx={{ 
                            mr: 1, 
                            height: 24, 
                            minWidth: 24,
                            fontSize: '0.75rem',
                            backgroundColor: 'rgba(0, 71, 171, 0.1)',
                            color: 'primary.main'
                          }}
                        />
                        <Typography variant="caption" color="text.secondary">
                          {formatDate(activity.created_at)}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </ListItem>
                {index < activities.length - 1 && <Divider />}
              </Box>
            ))
          ) : (
            <Typography color="text.secondary" align="center" sx={{ py: 4 }}>
              Nenhuma atividade recente.
            </Typography>
          )}
        </List>
      </CardContent>
    </Card>
  );
}; 