import { createAction, props } from '@ngrx/store';
import { User } from '../models/user.model';


export const loginUser = createAction(
  '[Auth] Login User',
  props<{ credentials: { email: string; password: string } }>()
);

export const loginUserSuccess = createAction(
  '[Auth] Login User Success',
  props<{ user: User }>()
);

export const loginUserFailure = createAction(
  '[Auth] Login User Failure',
  props<{ error: string }>()
);