import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AuthState } from './auth.state';


export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectCurrentUser = createSelector(
  selectAuthState,
  (auth) => auth.currentUser
);