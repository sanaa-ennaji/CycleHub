import { createReducer, on } from '@ngrx/store';
import { registerUser , loginUser, logoutUser, loginFailure, loginSuccess, updateUser} from './auth.actions';
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
    }),

    on(updateUser, (state, { user }) => {
      const updatedUsers = state.users.map((u) => (u.id === user.id ? user : u));
    
      if (typeof window !== 'undefined') {
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        if (state.currentUser?.id === user.id) {
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
      }
    
      return {
        ...state,
        users: updatedUsers,
        currentUser: state.currentUser?.id === user.id ? user : state.currentUser,
      };
    })

  );
  