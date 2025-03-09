export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string | null;
          email: string;
          name: string | null;
          avatar_url: string | null;
          role: string;
          department: string | null;
        };
        Insert: {
          id: string;
          created_at?: string;
          updated_at?: string | null;
          email: string;
          name?: string | null;
          avatar_url?: string | null;
          role?: string;
          department?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string | null;
          email?: string;
          name?: string | null;
          avatar_url?: string | null;
          role?: string;
          department?: string | null;
        };
      };
      documents: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string | null;
          title: string;
          content: string;
          author_id: string;
          category_id: string | null;
          is_published: boolean;
          tags: string[] | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string | null;
          title: string;
          content: string;
          author_id: string;
          category_id?: string | null;
          is_published?: boolean;
          tags?: string[] | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string | null;
          title?: string;
          content?: string;
          author_id?: string;
          category_id?: string | null;
          is_published?: boolean;
          tags?: string[] | null;
        };
      };
      categories: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          description: string | null;
          parent_id: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          name: string;
          description?: string | null;
          parent_id?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          name?: string;
          description?: string | null;
          parent_id?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      user_role: 'admin' | 'editor' | 'viewer';
    };
  };
} 