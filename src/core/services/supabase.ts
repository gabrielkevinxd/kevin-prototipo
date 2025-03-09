import { createClient } from '@supabase/supabase-js';

// Valores padrão para desenvolvimento local
const supabaseUrl = 'https://sua-url-supabase.supabase.co';
const supabaseAnonKey = 'sua-chave-anonima-supabase';

// Cria o cliente Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Função para verificar o estado de autenticação atual
export const getCurrentUser = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();
    
    if (error) {
      return { user: null, session: null };
    }
    
    if (data?.session) {
      const { data: userData } = await supabase.auth.getUser();
      return {
        user: userData.user,
        session: data.session,
      };
    }
    
    return { user: null, session: null };
  } catch (error) {
    console.error('Erro ao verificar autenticação:', error);
    return { user: null, session: null };
  }
}; 