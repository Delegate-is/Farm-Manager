import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey, {
  db: {
    schema: 'public'
  },
  auth: {
    persistSession: true,
    autoRefreshToken: true
  },
  realtime: {
    heartbeatIntervalMs: 10000
  }
});

// Enhanced Storage API
export const storageAPI = {
  async getPresignedUrl(bucket, path) {
    const { data, error } = await supabase
      .storage
      .from(bucket)
      .createSignedUrl(path, 3600);
    return { data, error };
  },

  async uploadProductImage(file, userId) {
    const filePath = `products/${userId}/${Date.now()}_${file.name}`;
    const { data, error } = await supabase
      .storage
      .from('product-images')
      .upload(filePath, file);
    
    return { data, error };
  }
};

// Real-time subscriptions
export const setupRealtime = (table, event, callback) => {
  return supabase
    .channel('custom-all-channel')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table },
      payload => callback(payload)
    )
    .subscribe();
};