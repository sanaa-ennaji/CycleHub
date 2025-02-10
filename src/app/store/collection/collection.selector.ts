import { createSelector } from '@ngrx/store';
import { CollectionState } from './collection.reducer';  

export const selectCollectionsState = (state: any) => state.collections; // Assuming 'collections' is the key in your store

export const selectCollections = createSelector(
  selectCollectionsState,
  (state: CollectionState) => state.requests
);
