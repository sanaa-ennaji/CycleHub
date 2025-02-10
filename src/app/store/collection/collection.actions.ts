import { createAction, props } from '@ngrx/store';
import { Collection } from '../../models/Collection.model';

export const addCollection = createAction(
    '[Collection] Add Collection',
    props<{ collection: Collection }>()
  );
  console.log('Action addCollection is defined'); 
  export const updateCollection = createAction(
    '[Collection] Update Collection',
    props<{ id: string; changes: Partial<Collection> }>()
  );
  
  export const deleteCollection = createAction(
    '[Collection] Delete Collection',
    props<{ id: string }>()
  );