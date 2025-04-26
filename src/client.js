import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://pewgtehrbvfronhxumon.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBld2d0ZWhyYnZmcm9uaHh1bW9uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU2NTE2MDQsImV4cCI6MjA2MTIyNzYwNH0.SuJ6oQ1EJ5k5FHZeHufrzAOOkA6Y_Fh3y_3D0uqQA_M";
export const supabase = createClient(supabaseUrl, supabaseAnonKey);