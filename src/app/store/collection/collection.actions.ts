import { createAction, props } from '@ngrx/store';
import { Collection } from '../../models/Collection.model';

export const addRequest = createAction(
  '[Collection] Add Request',
  props<{ request: Collection }>()
);

export const updateRequest = createAction(
  '[Collection] Update Request',
  props<{ id: string; changes: Partial<Collection> }>()
);

export const deleteRequest = createAction(
  '[Collection] Delete Request',
  props<{ id: string }>()
);