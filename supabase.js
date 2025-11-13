// js/supabase.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';

const SUPABASE_URL = 'https://uakuebstkidhwjgbsbut.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVha3VlYnN0a2lkaHdqZ2JzYnV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMwNjM0OTcsImV4cCI6MjA3ODYzOTQ5N30.fiNd1S6UA3bWnF600a6AE9ODB9QKjDjynsSr8Jt7YOw';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
