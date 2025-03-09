import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { supabase } from '@/core/services/supabase';
import { AuthResult, LoginCredentials, RegistrationCredentials } from '@/types/auth';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    login: builder.mutation<AuthResult, LoginCredentials>({
      queryFn: async ({ email, password }) => {
        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (error) {
            return { error: error.message };
          }

          return {
            data: {
              success: true,
              session: data.session,
              user: data.user,
            },
          };
        } catch (error) {
          return {
            error: error instanceof Error ? error.message : 'Erro desconhecido ao fazer login',
          };
        }
      },
    }),
    register: builder.mutation<AuthResult, RegistrationCredentials>({
      queryFn: async ({ email, password, name }) => {
        try {
          const { data: authData, error: authError } = await supabase.auth.signUp({
            email,
            password,
          });

          if (authError) {
            return { error: authError.message };
          }

          if (authData.user) {
            // Criar perfil do usuário
            const { error: profileError } = await supabase.from('profiles').insert({
              id: authData.user.id,
              email,
              name,
              role: 'viewer', // Papel padrão
            });

            if (profileError) {
              return { error: profileError.message };
            }
          }

          return {
            data: {
              success: true,
              session: authData.session,
              user: authData.user,
            },
          };
        } catch (error) {
          return {
            error: error instanceof Error ? error.message : 'Erro desconhecido ao registrar',
          };
        }
      },
    }),
    logout: builder.mutation<{ success: boolean }, void>({
      queryFn: async () => {
        try {
          const { error } = await supabase.auth.signOut();
          
          if (error) {
            return { error: error.message };
          }

          return { data: { success: true } };
        } catch (error) {
          return {
            error: error instanceof Error ? error.message : 'Erro desconhecido ao fazer logout',
          };
        }
      },
    }),
  }),
}); 