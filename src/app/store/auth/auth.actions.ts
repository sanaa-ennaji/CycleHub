import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user.model';

export const register = createAction(
    '[Auth] Register',
    props <{user: User}>()
);

export const registerSuccess = createAction(
    '[Auth] Register Success',
    props<{ user: User }>()
  );
  
  export const registerFailure = createAction(
    '[Auth] Register Failure',
    props<{ error: string }>()
  );
