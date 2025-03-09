import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../api/authApi';
import { setCredentials, setError, setLoading } from '../store/authSlice';
import { AuthResult, LoginCredentials } from '@/types/auth';

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setLoginError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginMutation] = authApi.endpoints.login.useMutation();

  const login = async (credentials: LoginCredentials): Promise<AuthResult> => {
    setIsLoading(true);
    setLoginError(null);
    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
      const result = await loginMutation(credentials).unwrap();
      
      if (result.success && result.session && result.user) {
        dispatch(
          setCredentials({
            user: result.user,
            session: result.session,
          })
        );
        navigate('/dashboard');
        return { success: true, user: result.user, session: result.session };
      } else {
        const errorMessage = result.error || 'Falha na autenticação';
        setLoginError(errorMessage);
        dispatch(setError(errorMessage));
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido ao fazer login';
      setLoginError(errorMessage);
      dispatch(setError(errorMessage));
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
      dispatch(setLoading(false));
    }
  };

  return { login, isLoading, error };
}; 