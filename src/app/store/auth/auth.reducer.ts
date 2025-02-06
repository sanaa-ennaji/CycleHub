import { createReducer, on } from '@ngrx/store';
import { registerUser } from './auth.actions';
import { User } from '../../models/user.model';

export interface AuthState {
    user: User | null;
  }
  
  const initialState: AuthState = {
    user: JSON.parse(localStorage.getItem('user') || 'null'),
  };
  
  export const authReducer = createReducer(
    initialState,
    on(registerUser, (state, { user }) => {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('user', JSON.stringify(user));
      }
      return { ...state, user };
    })
  );
  