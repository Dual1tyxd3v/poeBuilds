import { createAsyncThunk } from '@reduxjs/toolkit';
import { checkAuth, createItem, getAllItems, getBuild, getBuilds, login } from '../api';
import { AuthStatus } from '../config';
import { CreateItem } from '../types';

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

export const checkAuthAction = createAsyncThunk('app/checkAuth', async () => {
  try {
    const resp = await checkAuth();

    return resp;
  } catch (e) {
    console.log(e);
    return AuthStatus.NoAuth;
  }
});

export const createItemAction = createAsyncThunk('app/createItem', async (item: CreateItem) => {
  try {
    const resp = await createItem(item);

    return resp;
  } catch (e) {
    console.log(e);
    return { isSuccess: false, error: (e as Error).message };
  }
});

export const loginAction = createAsyncThunk(
  'app/login',
  async ({ email, password }: { email: string; password: string }) => {
    try {
      const resp = await login(email, password);

      return resp;
    } catch (e) {
      console.log(e);

      return { user: null, error: (e as Error).message };
    }
  }
);
