import { State } from '.';

export const getIsLoading = (state: State) => state.app.isLoading;
export const getMessage = (state: State) => state.app.message;
export const getBuildsFromState = (state: State) => state.app.builds;
