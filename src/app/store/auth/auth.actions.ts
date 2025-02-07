import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user.model';

export const registerUser = createAction(
    '[Auth] Register User',
    props<{ user: User }>()
  );

  export const loginUser = createAction(
    '[Auth] Login User',
    props <{email:string; password: string}>()
  );

  export const logoutUser = createAction('[Auth]Logout User');