import { useState } from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  List, 
  ListItem, 
  ListItemText,
  ListItemIcon,
  Chip,
  Skeleton,
  Divider,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material';
import { File, MoreVertical, Calendar } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface Document {
  id: string;
  title: string;
  created_at: string;
  category?: {
    name: string;
  };
}

interface RecentDocumentsProps {
  documents: Document[];
  isLoading: boolean;
}

export const RecentDocuments = ({ documents, isLoading }: RecentDocumentsProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null);
  
  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>, docId: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedDocId(docId);
  };
  
  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedDocId(null);
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
          <Typography variant="h6">Documentos Recentes</Typography>
          <Chip 
            label="Ver todos" 
            size="small" 
            color="primary" 
            variant="outlined" 
            onClick={() => console.log('Ver todos os documentos')} 
            sx={{ cursor: 'pointer' }} 
          />
        </Box>
        
        <List sx={{ p: 0 }}>
          {isLoading ? (
            Array(5).fill(0).map((_, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Skeleton variant="rectangular" height={20} width="70%" sx={{ mb: 1 }} />
                <Skeleton variant="rectangular" height={16} width="40%" />
                {index < 4 && <Divider sx={{ my: 2 }} />}
              </Box>
            ))
          ) : documents.length > 0 ? (
            documents.map((doc, index) => (
              <Box key={doc.id}>
                <ListItem 
                  disablePadding 
                  sx={{ 
                    py: 1.5,
                    display: 'flex',
                    alignItems: 'flex-start',
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <File size={20} />
                  </ListItemIcon>
                  <ListItemText
                    primary={doc.title}
                    secondary={
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                        <Calendar size={14} style={{ marginRight: '4px' }} />
                        <Typography variant="caption" color="text.secondary">
                          {formatDate(doc.created_at)}
                        </Typography>
                        {doc.category && (
                          <Chip 
                            label={doc.category.name} 
                            size="small" 
                            sx={{ ml: 1, height: 20, fontSize: '0.625rem' }}
                          />
                        )}
                      </Box>
                    }
                  />
                  <IconButton 
                    size="small" 
                    onClick={(e) => handleOpenMenu(e, doc.id)}
                    sx={{ ml: 1 }}
                  >
                    <MoreVertical size={16} />
                  </IconButton>
                </ListItem>
                {index < documents.length - 1 && <Divider />}
              </Box>
            ))
          ) : (
            <Typography color="text.secondary" align="center" sx={{ py: 4 }}>
              Nenhum documento encontrado.
            </Typography>
          )}
        </List>
        
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
        >
          <MenuItem onClick={handleCloseMenu}>Ver detalhes</MenuItem>
          <MenuItem onClick={handleCloseMenu}>Editar</MenuItem>
          <MenuItem onClick={handleCloseMenu}>Compartilhar</MenuItem>
        </Menu>
      </CardContent>
    </Card>
  );
}; 