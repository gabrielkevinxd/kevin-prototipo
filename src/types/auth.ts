import { Session, User } from '@supabase/supabase-js';

export interface AuthUser extends User {
  role?: string;
  name?: string;
  avatar_url?: string;
}

export interface AuthSession extends Session {
  user: AuthUser;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegistrationCredentials extends LoginCredentials {
  name: string;
}

export interface AuthResult {
  success: boolean;
  error?: string;
  session?: AuthSession;
  user?: AuthUser;
} 