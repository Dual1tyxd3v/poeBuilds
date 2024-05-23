import { State } from '.';

export const getIsLoading = (state: State) => state.app.isLoading;
export const getMessage = (state: State) => state.app.message;
export const getBuildsFromState = (state: State) => state.app.builds;
export const getItemsFromState = (state: State) => state.app.items;
export const getBuildFromState = (state: State) => state.app.build;
export const getAuthStatus = (state: State) => state.app.authStatus;
