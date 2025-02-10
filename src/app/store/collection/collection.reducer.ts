import { createReducer, on } from '@ngrx/store';
import { addCollection, updateCollection, deleteCollection  } from './collection.actions';
import { CollectionState } from './collection.state';


export const initialState: CollectionState = {
  collections: JSON.parse(localStorage.getItem('collections') || '[]'),
};

export const collectionReducer = createReducer(
    initialState,
    on(addCollection, (state, { collection }) => {
      const updatedCollections = [...state.collections, collection];
      
      return { ...state, collections: updatedCollections };
    }),
  on(updateCollection, (state, { id, changes }) => {
    const updatedRequests = state.collections.map((request) =>
      request.id === id ? { ...request, ...changes } : request
    );
    localStorage.setItem('collections', JSON.stringify(updatedRequests));
    return { ...state, requests: updatedRequests };
  }),
  on(deleteCollection, (state, { id }) => {
    const updatedRequests = state.collections.filter((request) => request.id !== id);
    localStorage.setItem('collections', JSON.stringify(updatedRequests));
    return { ...state, requests: updatedRequests };
  })
);
