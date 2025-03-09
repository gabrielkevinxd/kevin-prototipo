// Tipo para Theme do Material UI
declare module '@mui/material/styles' {
  interface Theme {
    zIndex: {
      drawer: number;
      [key: string]: number;
    };
    transitions: {
      create: (props: string[], options?: any) => string;
      easing: {
        sharp: string;
        [key: string]: string;
      };
      duration: {
        leavingScreen: number;
        enteringScreen: number;
        [key: string]: number;
      };
    };
  }
}

// Declaração para o react-redux
declare module 'react-redux' {
  import { Store } from 'redux';
  
  export function useSelector<TState = any, TSelected = any>(
    selector: (state: TState) => TSelected,
    equalityFn?: (left: TSelected, right: TSelected) => boolean
  ): TSelected;
  
  export function useDispatch<AppDispatch = any>(): AppDispatch;
  
  export function useStore<S = any>(): Store<S>;
  
  export function Provider(props: {
    store: Store;
    context?: React.Context<any>;
    children: React.ReactNode;
  }): React.ReactElement;
  
  export interface TypedUseSelectorHook<TState> {
    <TSelected>(selector: (state: TState) => TSelected, equalityFn?: (left: TSelected, right: TSelected) => boolean): TSelected;
  }
}

// Declaração para o react-router-dom
declare module 'react-router-dom' {
  import * as React from 'react';
  
  export function useNavigate(): (to: string) => void;
  
  export function useLocation(): {
    pathname: string;
    search: string;
    hash: string;
    state: unknown;
    key: string;
  };
  
  export function Link(props: {
    to: string;
    children: React.ReactNode;
    className?: string;
    replace?: boolean;
  }): React.ReactElement;
  
  export function Navigate(props: {
    to: string;
    replace?: boolean;
    state?: any;
  }): React.ReactElement | null;
  
  export function Outlet(): React.ReactElement | null;
}

// Declaração para o @mui/material
declare module '@mui/material' {
  export const Box: React.ComponentType<any>;
  export const Container: React.ComponentType<any>;
  export const Paper: React.ComponentType<any>;
  export const Typography: React.ComponentType<any>;
  export const AppBar: React.ComponentType<any>;
  export const Toolbar: React.ComponentType<any>;
  export const IconButton: React.ComponentType<any>;
  export const Avatar: React.ComponentType<any>;
  export const Menu: React.ComponentType<any>;
  export const MenuItem: React.ComponentType<any>;
  export const Tooltip: React.ComponentType<any>;
  export const Badge: React.ComponentType<any>;
  export const useMediaQuery: (query: any) => boolean;
  export const useTheme: () => any;
  export const Drawer: React.ComponentType<any>;
  export const List: React.ComponentType<any>;
  export const ListItem: React.ComponentType<any>;
  export const ListItemButton: React.ComponentType<any>;
  export const ListItemIcon: React.ComponentType<any>;
  export const ListItemText: React.ComponentType<any>;
  export const Divider: React.ComponentType<any>;
}

// Declaração para o lucide-react
declare module 'lucide-react' {
  import * as React from 'react';
  
  export const Menu: React.ComponentType<any>;
  export const Bell: React.ComponentType<any>;
  export const LogOut: React.ComponentType<any>;
  export const User: React.ComponentType<any>;
  export const Settings: React.ComponentType<any>;
  export const Home: React.ComponentType<any>;
  export const FileText: React.ComponentType<any>;
  export const Search: React.ComponentType<any>;
  export const Users: React.ComponentType<any>;
  export const BookOpen: React.ComponentType<any>;
  export const Activity: React.ComponentType<any>;
  export const HelpCircle: React.ComponentType<any>;
}

// Declaração para o @supabase/supabase-js
declare module '@supabase/supabase-js' {
  export function createClient(
    supabaseUrl: string,
    supabaseKey: string,
    options?: any
  ): any;
}

// Declaração para o @reduxjs/toolkit
declare module '@reduxjs/toolkit' {
  export function createSlice(options: {
    name: string;
    initialState: any;
    reducers: Record<string, any>;
  }): any;
  
  export function configureStore(options: {
    reducer: Record<string, any>;
    middleware?: any;
    devTools?: boolean;
    preloadedState?: any;
    enhancers?: any[];
  }): any;
  
  export interface PayloadAction<P = any> {
    payload: P;
    type: string;
  }
} 