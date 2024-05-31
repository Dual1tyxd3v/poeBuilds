import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  checkAuth,
  createBuild,
  createItem,
  deleteBuild,
  deleteItem,
  editBuild,
  editItem,
  getAllItems,
  getBuild,
  getBuilds,
  login,
} from '../api';
import { AuthStatus } from '../config';
import { CreateItem, NewBuild } from '../types';

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

export const createBuildAction = createAsyncThunk('app/createBuild', async (newBuild: NewBuild) => {
  try {
    const resp = await createBuild(newBuild);

    return resp;
  } catch (e) {
    console.log(e);

    return { id: 0, error: (e as Error).message };
  }
});

export const editBuildAction = createAsyncThunk(
  'app/editBuild',
  async ({ editedBuild, id }: { editedBuild: NewBuild; id: number }) => {
    try {
      const resp = await editBuild(editedBuild, id);

      return resp;
    } catch (e) {
      console.log(e);

      return { id: 0, error: (e as Error).message };
    }
  }
);

export const deleteItemAction = createAsyncThunk('app/deleteItem', async (id: number) => {
  try {
    const resp = await deleteItem(id);

    return resp;
  } catch (e) {
    console.log(e);
    return { isSuccess: false, error: (e as Error).message };
  }
});

export const deleteBuildAction = createAsyncThunk('app/deleteBuild', async (id: number) => {
  try {
    const resp = await deleteBuild(id);

    return resp;
  } catch (e) {
    console.log(e);
    return { isSuccess: false, error: (e as Error).message };
  }
});

export const editItemAction = createAsyncThunk(
  'app/editItem',
  async ({ newItem, id }: { newItem: CreateItem; id: number }) => {
    try {
      const resp = await editItem(newItem, id);

      return resp;
    } catch (e) {
      console.log(e);
      return { isSuccess: false, error: (e as Error).message, data: undefined };
    }
  }
);
