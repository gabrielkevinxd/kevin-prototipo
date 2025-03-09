import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  TextField, 
  Button, 
  FormControlLabel, 
  Checkbox,
  Link,
  Alert,
  CircularProgress
} from '@mui/material';
import { supabase } from '@/core/services/supabase';
import { setCredentials } from '../store/authSlice';

export const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      if (data.user && data.session) {
        // Buscar perfil do usuário para obter informações adicionais
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();
          
        dispatch(
          setCredentials({
            user: { ...data.user, ...profileData },
            session: data.session,
          })
        );
        
        navigate('/dashboard');
      }
    } catch (err: any) {
      console.error('Erro ao fazer login:', err);
      setError(err.message || 'Falha ao fazer login. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email"
        name="email"
        autoComplete="email"
        autoFocus
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading}
      />
      
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Senha"
        type="password"
        id="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={loading}
      />
      
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
        <FormControlLabel
          control={
            <Checkbox 
              value="remember" 
              color="primary" 
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              disabled={loading}
            />
          }
          label="Lembrar-me"
        />
        
        <Link href="#" variant="body2" onClick={() => console.log('Implementar recuperação de senha')}>
          Esqueceu a senha?
        </Link>
      </Box>
      
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2, py: 1.5 }}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : 'Entrar'}
      </Button>
    </Box>
  );
}; 