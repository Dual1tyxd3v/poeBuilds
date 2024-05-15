import { createClient } from '@supabase/supabase-js';
import { AuthStatus } from './config';
import { Build, Item } from './types';
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

export const getBuildDetails = async (id: number) => {
  try {
    const { data: build, error } = await supabase.from('builds').select('*').eq('id', id);

    if (error || !build.length) return { data: [], error };

    const itemsID = (build[0] as Build).items.map((item) => item.id);
    const { data: items, error: itemsError } = await supabase.from('items').select('*').in('id', itemsID);

    return { data: [build as Build[], items as Item[]], error: itemsError };
  } catch (e) {
    console.log(e);
    return { data: [], error: (e as Error).message };
  }
};
