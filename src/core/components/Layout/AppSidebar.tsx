import { FC } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Toolbar,
  Typography,
} from '@mui/material';
import {
  Home,
  FileText,
  Search,
  Users,
  Settings,
  BookOpen,
  Activity,
  HelpCircle,
} from 'lucide-react';
import { RootState } from '@/core/store';

const DRAWER_WIDTH = 240;

interface SidebarItem {
  title: string;
  path: string;
  icon: React.ReactNode;
  adminOnly?: boolean;
}

interface AppSidebarProps {
  open: boolean;
  onClose: () => void;
}

export const AppSidebar: FC<AppSidebarProps> = ({ open, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  
  const isAdmin = user?.role === 'admin';
  
  const mainItems: SidebarItem[] = [
    {
      title: 'Dashboard',
      path: '/',
      icon: <Home size={20} />,
    },
    {
      title: 'Documentos',
      path: '/documents',
      icon: <FileText size={20} />,
    },
    {
      title: 'Pesquisar',
      path: '/search',
      icon: <Search size={20} />,
    },
    {
      title: 'Biblioteca',
      path: '/library',
      icon: <BookOpen size={20} />,
    },
    {
      title: 'Atividades',
      path: '/activities',
      icon: <Activity size={20} />,
    },
  ];
  
  const adminItems: SidebarItem[] = [
    {
      title: 'Usuários',
      path: '/admin/users',
      icon: <Users size={20} />,
      adminOnly: true,
    },
    {
      title: 'Configurações',
      path: '/admin/settings',
      icon: <Settings size={20} />,
      adminOnly: true,
    },
  ];
  
  const supportItems: SidebarItem[] = [
    {
      title: 'Ajuda',
      path: '/help',
      icon: <HelpCircle size={20} />,
    },
  ];
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const handleNavigation = (path: string) => {
    navigate(path);
    if (window.innerWidth < 900) {
      onClose();
    }
  };
  
  const renderNavItems = (items: SidebarItem[]) => {
    return items
      .filter(item => !item.adminOnly || isAdmin)
      .map((item) => (
        <ListItem key={item.path} disablePadding>
          <ListItemButton
            selected={isActive(item.path)}
            onClick={() => handleNavigation(item.path)}
            sx={{
              '&.Mui-selected': {
                backgroundColor: 'primary.light',
                '&:hover': {
                  backgroundColor: 'primary.light',
                },
              },
              borderRadius: 1,
              mb: 0.5,
              mx: 1,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 40,
                color: isActive(item.path) ? 'primary.main' : 'inherit',
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.title}
              primaryTypographyProps={{
                fontWeight: isActive(item.path) ? 'medium' : 'normal',
              }}
            />
          </ListItemButton>
        </ListItem>
      ));
  };
  
  const content = (
    <>
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ fontWeight: 'bold', color: 'primary.main' }}
        >
          DSTELECOM
        </Typography>
      </Toolbar>
      <Divider />
      <Box sx={{ overflow: 'auto', mt: 2 }}>
        <List>{renderNavItems(mainItems)}</List>
        
        {isAdmin && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography
              variant="subtitle2"
              color="text.secondary"
              sx={{ px: 3, mb: 1, fontWeight: 'medium' }}
            >
              Administração
            </Typography>
            <List>{renderNavItems(adminItems)}</List>
          </>
        )}
        
        <Divider sx={{ my: 2 }} />
        <Typography
          variant="subtitle2"
          color="text.secondary"
          sx={{ px: 3, mb: 1, fontWeight: 'medium' }}
        >
          Suporte
        </Typography>
        <List>{renderNavItems(supportItems)}</List>
      </Box>
    </>
  );
  
  return (
    <>
      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={open}
        onClose={onClose}
        ModalProps={{
          keepMounted: true, // Better performance on mobile
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: DRAWER_WIDTH,
            borderRight: '1px solid',
            borderColor: 'divider',
          },
        }}
      >
        {content}
      </Drawer>
      
      {/* Desktop drawer */}
      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: DRAWER_WIDTH,
            borderRight: '1px solid',
            borderColor: 'divider',
          },
        }}
      >
        {content}
      </Drawer>
    </>
  );
}; 