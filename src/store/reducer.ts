import { combineReducers, createSlice } from '@reduxjs/toolkit';
import { AuthStatus } from '../config';
import { InitState } from '../types';
import { getBuildsAction } from './async-actions';

const initialState: InitState = {
  items: [],
  builds: [],
  isLoading: false,
  message: '',
  authStatus: AuthStatus.Unknown,
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
        const { error, data } = action.payload;
        state.message = error;
        state.builds = data;
        state.isLoading = false;
      })
      .addCase(getBuildsAction.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.error.toString();
      }),
});

export const rootReducer = combineReducers({
  app: reducer.reducer,
});

export const { setIsLoading, setMessage } = reducer.actions;
