import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  'https://peiriuszdvhtwewydgte.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBlaXJpdXN6ZHZodHdld3lkZ3RlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI1NTkyMzEsImV4cCI6MjA5ODEzNTIzMX0.UZtCSfBnO6aN0QbFRYibnrVdssoENq6FgtnYVUDLt7Q'
);
