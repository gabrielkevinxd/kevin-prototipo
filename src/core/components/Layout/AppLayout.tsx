import { FC, useState, useEffect } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { RootState } from '@/core/store';
import { AppHeader } from './AppHeader';
import { AppSidebar } from './AppSidebar';

export const AppLayout: FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const location = useLocation();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  
  // Toggle sidebar state
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  // Close sidebar on location change (mobile only)
  useEffect(() => {
    if (!isDesktop) {
      setSidebarOpen(false);
    }
  }, [location.pathname, isDesktop]);
  
  // Reset sidebar state when screen size changes
  useEffect(() => {
    setSidebarOpen(isDesktop);
  }, [isDesktop]);
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppHeader 
        sidebarOpen={sidebarOpen} 
        toggleSidebar={toggleSidebar} 
      />
      
      <AppSidebar 
        open={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />
      
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          ml: { md: '240px' }, // Width of the sidebar
          mt: '64px', // Height of the header
          transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}; 