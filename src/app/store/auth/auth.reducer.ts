import { createReducer, on } from '@ngrx/store';
import { registerUser } from './auth.actions';
import { AuthState } from './auth.state';

  
  const initialState: AuthState = {
    user: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || 'null') : null,
  };
  
  export const authReducer = createReducer(
    initialState,
    on(registerUser, (state, { user }) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(user));
      }
      return { ...state, user };
    })
  );
  