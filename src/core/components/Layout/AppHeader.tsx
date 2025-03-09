import { FC, useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  IconButton, 
  Typography, 
  Box, 
  Avatar, 
  Menu, 
  MenuItem, 
  Tooltip, 
  Badge
} from '@mui/material';
import { Theme } from '@mui/material/styles';
import { Menu as MenuIcon, Bell, LogOut, User, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from '@/core/hooks/reduxHooks';
import { RootState } from '@/core/store';
import { supabase } from '@/core/services/supabase';
import { clearCredentials } from '@/features/auth/store/authSlice';

interface AppHeaderProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

export const AppHeader: FC<AppHeaderProps> = ({ sidebarOpen, toggleSidebar }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state: RootState) => state.auth);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      dispatch(clearCredentials());
      navigate('/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };
  
  const handleProfile = () => {
    handleMenuClose();
    navigate('/profile');
  };
  
  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme: Theme) => theme.zIndex.drawer + 1,
        backgroundColor: 'background.paper',
        color: 'text.primary',
        boxShadow: 1,
        width: { md: sidebarOpen ? `calc(100% - 240px)` : '100%' },
        ml: { md: sidebarOpen ? '240px' : 0 },
        transition: (theme: Theme) => theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="toggle sidebar"
          edge="start"
          onClick={toggleSidebar}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          DSTELECOM Knowledge
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title="Notificações">
            <IconButton color="inherit">
              <Badge badgeContent={3} color="error">
                <Bell size={20} />
              </Badge>
            </IconButton>
          </Tooltip>
          
          <Tooltip title={user?.name || 'Usuário'}>
            <IconButton
              onClick={handleMenuOpen}
              sx={{ ml: 1 }}
              aria-controls="menu-appbar"
              aria-haspopup="true"
            >
              <Avatar 
                alt={user?.name || 'Usuário'} 
                src={user?.avatar_url || undefined}
                sx={{ width: 32, height: 32 }}
              >
                {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </Avatar>
            </IconButton>
          </Tooltip>
        </Box>
        
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleProfile}>
            <User size={16} style={{ marginRight: 8 }} />
            Perfil
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Settings size={16} style={{ marginRight: 8 }} />
            Configurações
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <LogOut size={16} style={{ marginRight: 8 }} />
            Sair
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}; 