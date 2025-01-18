import { createClient } from '@supabase/supabase-js';

const supabaseUrl: string = "https://zgknocivcvvcirnljgcg.supabase.co";
const supabaseKey: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpna25vY2l2Y3Z2Y2lybmxqZ2NnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcxNzc1MDUsImV4cCI6MjA1Mjc1MzUwNX0.MK8sVfNlFzsWB0pOHpMJetQBtXQy-5a8YiXVyJVxLDI";

export const supabase = createClient(supabaseUrl, supabaseKey);
