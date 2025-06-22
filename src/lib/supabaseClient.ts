// import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// if (!supabaseUrl || !supabaseAnonKey) {
//   console.warn('Supabase environment variables are not configured. Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your .env.local file.');
// }

// export const supabase = createClient(
//   supabaseUrl || 'https://placeholder.supabase.co',
//   supabaseAnonKey || 'placeholder-key'
// );

// Temporary mock supabase object for compatibility
export const supabase = {
  from: () => ({
    select: () => Promise.resolve({ data: null, error: null }),
    upsert: () => Promise.resolve({ error: null }),
    rpc: () => Promise.resolve({ data: null, error: null })
  })
}; 