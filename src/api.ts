import { createClient } from '@supabase/supabase-js';
import { AuthStatus } from './config';
import { Build } from './types';
const supabaseUrl = 'https://pvtdmhslfcmhyjopnlen.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2dGRtaHNsZmNtaHlqb3BubGVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU2ODQ3NjUsImV4cCI6MjAzMTI2MDc2NX0.G1oeZ4L99pZqcDA7oo3K1XmI694j7fAq1OgmrlFJTCc';
const supabase = createClient(supabaseUrl, supabaseKey);

export const checkAuth = async () => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    return user ? AuthStatus.Auth : AuthStatus.NoAuth;
  } catch (e) {
    console.log(e);
    return AuthStatus.NoAuth;
  }
};

export const getBuilds = async () => {
  try {
    const { data, error } = await supabase.from('builds').select('*');
    
    return { data: data as Build[], error: error ? error.toString() : null };
  } catch (e) {
    console.log(e);
    return { data: [], error: (e as Error).message };
  }
};
