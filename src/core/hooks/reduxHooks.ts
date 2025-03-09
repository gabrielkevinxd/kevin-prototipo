import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store';

// Use estes hooks em vez dos hooks padrão do Redux
// useAppSelector permite acessar o estado global com tipagem
export const useAppSelector = <T>(selector: (state: RootState) => T): T => {
  return useSelector(selector);
};

// useAppDispatch permite despachar ações com tipagem correta
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Exemplo de uso:
/*
import { useAppSelector, useAppDispatch } from '@/core/hooks/reduxHooks';
import { setCredentials } from '@/features/auth/store/authSlice';

// Em um componente:
const { user } = useAppSelector(state => state.auth);
const dispatch = useAppDispatch();

// Exemplo de dispatch tipado:
dispatch(setCredentials({ user: userData }));
*/ 