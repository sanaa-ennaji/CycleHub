import { createReducer, on } from '@ngrx/store';
import { registerUser } from './auth.actions';
import { loginUserSuccess , loginUserFailure } from '../auth.actions';
import { User } from "../../models/user.model";

export interface AuthState {
    users: User[];
  }
  
  const initialState: AuthState = {
    users: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('users') || '[]') : [],
  };
  
  export const authReducer = createReducer(
    initialState,
    on(registerUser, (state, { user }) => {
      const updatedUsers = [...state.users, user]; 
  
      if (typeof window !== 'undefined') {
        localStorage.setItem('users', JSON.stringify(updatedUsers));
      }
  
      return { ...state, users: updatedUsers };
    }),   on(loginUserSuccess, (state, { user }) => {
      return { ...state, user, error: null };
    }),
    on(loginUserFailure, (state, { error }) => {
      return { ...state, error, user: null }; 
    })
  );
  