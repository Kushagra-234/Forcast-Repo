import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://pjjwkfawdlzflrqxwepn.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBqandrZmF3ZGx6ZmxycXh3ZXBuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzk1MTI5NjQsImV4cCI6MTk5NTA4ODk2NH0.2r-wgNcbu8OZga921Md0k6SmzCulKBWiHwofip1wYDE"

export const supabase = createClient(supabaseUrl, supabaseKey);
