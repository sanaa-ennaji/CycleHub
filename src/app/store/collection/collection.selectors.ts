import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CollectionState } from './collection.state';
export const selectCollectionState = createFeatureSelector<CollectionState>('collections');
export const selectCollections = createSelector(
  selectCollectionState,
  (state: CollectionState) => state.collections
);
