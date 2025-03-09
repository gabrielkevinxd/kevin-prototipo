import { lazy, Suspense, ReactNode } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/core/store';
import { AppLayout } from '@/core/components/Layout/AppLayout';
import LoadingScreen from '@/core/components/UI/LoadingScreen';

// Lazy-loaded pages para otimização de performance
const Login = lazy(() => import('@/features/auth/pages/LoginPage'));
const Register = lazy(() => import('@/features/auth/pages/RegisterPage'));
const Dashboard = lazy(() => import('@/features/dashboard/pages/DashboardPage'));
const Documents = lazy(() => import('@/features/library/pages/DocumentsPage'));
const Profile = lazy(() => import('@/features/profile/pages/ProfilePage'));
const AdminPanel = lazy(() => import('@/features/admin/pages/AdminPanel'));

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: string | null;
}

// Higher-order component para rotas protegidas
const ProtectedRoute = ({ children, requiredRole = null }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
};

export const AppRouter = () => (
  <BrowserRouter>
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        {/* Rotas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Rotas protegidas dentro do layout principal */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="documents" element={<Documents />} />
          <Route path="profile" element={<Profile />} />
          
          {/* Rotas de administração */}
          <Route
            path="admin/*"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminPanel />
              </ProtectedRoute>
            }
          />
        </Route>
        
        {/* Rota de fallback */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Suspense>
  </BrowserRouter>
); 