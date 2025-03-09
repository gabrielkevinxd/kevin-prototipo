import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/features/auth/store/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // Adicione outros reducers aqui conforme necessário
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 