// pass gnOMdvsV5VMe7ElE
import { createClient } from "@supabase/supabase-js";

export const SUPABASE_URL = "https://esgzqiobexfizycgihom.supabase.co";

const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVzZ3pxaW9iZXhmaXp5Y2dpaG9tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQ4ODE0NjIsImV4cCI6MjAyMDQ1NzQ2Mn0.W19RBs3Z6rbGx93Td1x-zwvKz1cCjLiUyvSBsXIkBSs";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default supabase;
