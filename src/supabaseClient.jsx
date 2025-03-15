import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ugdmuobbyabqjutfxhjz.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVnZG11b2JieWFicWp1dGZ4aGp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEzODk4MDMsImV4cCI6MjA1Njk2NTgwM30.6lzZSG1oopkEYdixKzIO25_d0YWtj7QNO2IghbyUpuk";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;