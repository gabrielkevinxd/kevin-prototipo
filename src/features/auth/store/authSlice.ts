import { createSlice } from '@reduxjs/toolkit';

// Define o tipo para o estado de autenticação
interface AuthState {
  user: {
    id?: string;
    email?: string;
    name?: string;
    avatar_url?: string;
    role?: string;
    department?: string;
  } | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

// Estado inicial
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Cria o slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = !!action.payload.user;
      state.error = null;
    },
    clearCredentials: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

// Exporta as ações
export const { setCredentials, clearCredentials, setLoading, setError } = authSlice.actions;

// Exporta o reducer
export default authSlice.reducer; 