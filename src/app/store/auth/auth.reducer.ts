import { createReducer, on } from '@ngrx/store';
import { registerUser , loginUser, logoutUser} from './auth.actions';
import { User } from "../../models/user.model";

export interface AuthState {
    users: User[];
    currentUser: User | null;
  }
  

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
 // login 
    on(loginUser, (state, { email, password }) => {
      const user = state.users.find((u) => u.email === email && u.password === password);
  
      if (user) {
        if (typeof window !== 'undefined') {
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        return { ...state, currentUser: user };
      } else {
        console.error('Invalid email or password');
        return state;
      }
    }),
  
    // Logout 
    on(logoutUser, (state) => {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('currentUser');
      }
      return { ...state, currentUser: null };
    })
  );
  