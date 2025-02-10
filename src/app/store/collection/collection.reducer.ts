import { createReducer, on } from '@ngrx/store';
import { addCollection, updateCollection, deleteCollection  } from './collection.actions';
import { Collection } from "../../models/Collection.model";

export interface CollectionState {
  requests: Collection[];
}

export const initialState: CollectionState = {
  requests: JSON.parse(localStorage.getItem('collections') || '[]'),
};

export const collectionReducer = createReducer(
  initialState,
  on(addCollection, (state, { collection }) => {
    const updatedRequests = [...state.requests, collection];
    return { ...state, requests: updatedRequests };
  }),
  on(updateCollection, (state, { id, changes }) => {
    const updatedRequests = state.requests.map((request) =>
      request.id === id ? { ...request, ...changes } : request
    );
    localStorage.setItem('collections', JSON.stringify(updatedRequests));
    return { ...state, requests: updatedRequests };
  }),
  on(deleteCollection, (state, { id }) => {
    const updatedRequests = state.requests.filter((request) => request.id !== id);
    localStorage.setItem('collections', JSON.stringify(updatedRequests));
    return { ...state, requests: updatedRequests };
  })
);
  