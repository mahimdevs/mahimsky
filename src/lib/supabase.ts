import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wzddzeirmmtwjdjuijho.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind6ZGR6ZWlybW10d2pkanVpamhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc5NjEyMDYsImV4cCI6MjA4MzUzNzIwNn0.-0qgiU7YN-9QyBVpYnb1Ivai4VjxLza4whYbqkWGriA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
