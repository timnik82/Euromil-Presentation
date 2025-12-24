import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Session {
  id: string;
  started_at: string;
  last_active_at: string;
  completed: boolean;
  sound_enabled: boolean;
  created_at: string;
}

export interface SlideProgress {
  id: string;
  session_id: string;
  slide_number: number;
  viewed_at: string;
  time_spent_seconds: number;
  created_at: string;
}

export interface ExperimentResult {
  id: string;
  session_id: string;
  user_age: number;
  years_needed: number;
  generations_needed: number;
  created_at: string;
}
