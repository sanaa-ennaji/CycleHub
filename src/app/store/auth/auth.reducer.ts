import { createReducer, on } from '@ngrx/store';
import { registerUser , loginUser, logoutUser, loginFailure, loginSuccess} from './auth.actions';
import { AuthState } from './auth.state';



  const initialState: AuthState = {
    users: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('users') || '[]') : [],
    currentUser: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('currentUser') || 'null') : null,
  };
  
  export const authReducer = createReducer(
    initialState,
    // register 
    on(registerUser, (state, { user }) => {
      const updatedUsers = [...state.users, user]; 
  
      if (typeof window !== 'undefined') {
        localStorage.setItem('users', JSON.stringify(updatedUsers));
      }
  
      return { ...state, users: updatedUsers };
    }),
    on(loginUser, (state, { email, password }) => {
      const foundUser = state.users.find(user => user.email === email && user.password === password);
  
      if (foundUser) {
        if (typeof window !== 'undefined') {
          localStorage.setItem('currentUser', JSON.stringify(foundUser));
        }
        return { ...state, currentUser: foundUser, error: null };
      } else {
        return { ...state, currentUser: null, error: 'Invalid email or password' };
      }
    }),
  
    on(loginSuccess, (state, { user }) => ({
      ...state,
      currentUser: user,
      error: null
    })),
  
    on(loginFailure, (state) => ({
      ...state,
      currentUser: null,
      error: 'Invalid email or password'
    })),
  
    // Logout 
    on(logoutUser, (state) => {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('currentUser');
      }
      return { ...state, currentUser: null };
    })
  );
  