import { createSelector } from '@ngrx/store';
import { AuthState } from './auth.state';

export const selectCurrentUser = createSelector(
  (state: { auth: AuthState }) => state.auth,
  (auth) => auth.currentUser
);