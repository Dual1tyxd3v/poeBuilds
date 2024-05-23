import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllItems, getBuild, getBuilds } from '../api';

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

export const getBuildAction = createAsyncThunk('app/getBuild', async (id: number) => {
  try {
    const { data, error } = await getBuild(id);

    return { data, error };
  } catch (e) {
    console.log(e);
    return { data: null, error: (e as Error).message };
  }
});
