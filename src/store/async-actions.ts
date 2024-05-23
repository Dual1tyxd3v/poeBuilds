import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllItems,  getBuilds } from '../api';

export const getBuildsAction = createAsyncThunk('app/getBuilds', async () => {
  try {
    const { data, error } = await getBuilds();

    return { data, error };
  } catch (e) {
    console.log(e);
    return { data: [], error: (e as Error).message };
  }
});

export const getItemsAction = createAsyncThunk('app/getItems', async () => {
  try {
    const { data, error } = await getAllItems();

    return { data, error };
  } catch (e) {
    console.log(e);
    return { data: [], error: (e as Error).message };
  }
});
