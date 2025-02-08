import { createReducer, on } from '@ngrx/store';
import { addRequest, updateRequest, deleteRequest } from './collection.actions';
import { CollectionState } from './collection.state';


const initialState: CollectionState = {
  requests: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('collectionState') || '[]') : [],
};

export const wasteCollectionReducer = createReducer(
  initialState,
  // Add a request
  on(addRequest, (state, { request }) => {
    const updatedRequests = [...state.requests, request];
    if (typeof window !== 'undefined') {
      localStorage.setItem('collectionState', JSON.stringify({ requests: updatedRequests }));
    }
    return { ...state, requests: updatedRequests };
  }),
  // Update a request
  on(updateRequest, (state, { id, changes }) => {
    const updatedRequests = state.requests.map((request) =>
      request.id === id ? { ...request, ...changes } : request
    );
    if (typeof window !== 'undefined') {
      localStorage.setItem('collectionState', JSON.stringify({ requests: updatedRequests }));
    }
    return { ...state, requests: updatedRequests };
  }),
  // Delete a request
  on(deleteRequest, (state, { id }) => {
    const updatedRequests = state.requests.filter((request) => request.id !== id);
    if (typeof window !== 'undefined') {
      localStorage.setItem('collectionState', JSON.stringify({ requests: updatedRequests }));
    }
    return { ...state, requests: updatedRequests };
  })
);