import { combineReducers, createSlice } from '@reduxjs/toolkit';
import { AuthStatus } from '../config';
import { InitState } from '../types';
import {
  checkAuthAction,
  createBuildAction,
  createItemAction,
  getBuildAction,
  getBuildsAction,
  getItemsAction,
  loginAction,
} from './async-actions';

const initialState: InitState = {
  items: [],
  builds: [],
  isLoading: false,
  message: '',
  authStatus: AuthStatus.Unknown,
  build: null,
};

export const reducer = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getBuildsAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBuildsAction.fulfilled, (state, action) => {
        const { data, error } = action.payload;
        state.builds = data;
        state.isLoading = false;
        if (error) state.message = error;
      })
      .addCase(getBuildsAction.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.error.toString();
      })
      .addCase(getItemsAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getItemsAction.fulfilled, (state, action) => {
        const { data, error } = action.payload;
        state.isLoading = false;
        state.items = data;
        if (error) state.message = error;
      })
      .addCase(getItemsAction.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.error.toString();
      })
      .addCase(getBuildAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBuildAction.fulfilled, (state, action) => {
        const { data, error } = action.payload;
        state.isLoading = false;
        state.build = data;
        state.message = error;
      })
      .addCase(getBuildAction.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.error.toString();
      })
      .addCase(checkAuthAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.authStatus = action.payload;
      })
      .addCase(checkAuthAction.rejected, (state, action) => {
        state.authStatus = AuthStatus.NoAuth;
        state.message = action.error.toString();
      })
      .addCase(createItemAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createItemAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.error;
      })
      .addCase(createItemAction.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.error.toString();
      })
      .addCase(loginAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        const { user, error } = action.payload;
        state.isLoading = false;

        if (user) {
          state.authStatus = AuthStatus.Auth;
          return;
        }

        state.authStatus = AuthStatus.NoAuth;
        state.message = error?.toString() || 'Something went wrong';
      })
      .addCase(loginAction.rejected, (state, action) => {
        state.isLoading = false;
        state.authStatus = AuthStatus.NoAuth;
        state.message = action.error.toString();
      })
      .addCase(createBuildAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBuildAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.error;
      })
      .addCase(createBuildAction.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.error.toString();
      }),
});

export const rootReducer = combineReducers({
  app: reducer.reducer,
});

export const { setIsLoading, setMessage } = reducer.actions;
