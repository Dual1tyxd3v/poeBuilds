import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './reducer';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: rootReducer,
});

export type State = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
