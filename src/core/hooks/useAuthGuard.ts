import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/core/store';
import { supabase } from '@/core/services/supabase';
import { setCredentials, clearCredentials } from '@/features/auth/store/authSlice';

export const useAuthGuard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        // Buscar perfil do usuário para obter informações adicionais
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
          
        dispatch(
          setCredentials({
            user: { ...session.user, ...profileData },
            session,
          })
        );
      } else if (event === 'SIGNED_OUT') {
        dispatch(clearCredentials());
        navigate('/login');
      }
    });
    
    // Verificar sessão atual ao montar o componente
    const checkCurrentSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
          
        dispatch(
          setCredentials({
            user: { ...session.user, ...profileData },
            session,
          })
        );
      } else if (isAuthenticated) {
        // Sessão expirada, mas estado ainda indica autenticado
        dispatch(clearCredentials());
        navigate('/login');
      }
    };
    
    checkCurrentSession();
    
    return () => {
      if (authListener && authListener.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, [dispatch, navigate, isAuthenticated]);
}; 