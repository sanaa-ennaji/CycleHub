import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user.model';

export const registerUser = createAction(
    '[Auth] Register User',
    props<{ user: User }>()
  );
