import { createAsyncThunk } from '@reduxjs/toolkit';
import { getBuilds } from '../api';

export const getBuildsAction = createAsyncThunk('app/getBuilds', async () => {
  try {
    const { data, error } = await getBuilds();

    return { data, error };
  } catch (e) {
    console.log(e);
    return { data: [], error: (e as Error).message };
  }
});
