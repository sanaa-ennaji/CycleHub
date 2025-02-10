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
  export const loginSuccess = createAction(
    '[Auth] Login Success',
    props<{ user: User }>()
  );
  export const loginFailure = createAction(
    '[Auth] Login Failure');
  export const logoutUser = createAction('[Auth]Logout User');

  export const updateUser = createAction(
    '[Auth] Update User',
    props<{ user: User }>()
  );

  export const deleteUser = createAction(
    '[Auth] Delete User',
    props<{ userId: string }>()
  );
  