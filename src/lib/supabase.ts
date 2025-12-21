import { createClient } from '@supabase/supabase-js';
import { env } from '$env/dynamic/public';

const supabaseUrl = env.PUBLIC_PROJECT_URL || '';
const supabaseAnonKey = env.PUBLIC_PUBLISH_API || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
