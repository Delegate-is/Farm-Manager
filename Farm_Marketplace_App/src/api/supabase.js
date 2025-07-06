// src/api/supabase.js
import { createClient } from '@supabase/supabase-js';

// Load Supabase URL and Anon Key from environment variables
// These are exposed by Vite when prefixed with VITE_
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a Supabase client instance
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

console.log('Supabase Client Initialized:', { supabaseUrl, supabaseAnonKey: supabaseAnonKey ? '*****' : 'Not Set' });

// Optional: Add a listener for auth state changes for debugging
supabase.auth.onAuthStateChange((event, session) => {
  console.log('Supabase Auth State Change:', event, session);
});
