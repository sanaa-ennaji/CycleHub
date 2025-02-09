import { createReducer, on } from '@ngrx/store';
import { addRequest, updateRequest, deleteRequest } from './collection.actions';
import { CollectionState } from './collection.state';


const getInitialState = (): CollectionState => {
  try {
    if (typeof window !== 'undefined') {
      const storedState = localStorage.getItem('collectionState');
      return storedState ? JSON.parse(storedState) : { requests: [] };
    }
  } catch (error) {
    console.error('Error loading state from localStorage:', error);
  }
  return { requests: [] };
};

const initialState: CollectionState = {
    requests: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('collectionState') || '[]') : [],
  };
  
  export const wasteCollectionReducer = createReducer(
    initialState,
    on(addRequest, (state, { request }) => {
      const updatedRequests = [...state.requests, request];
      if (typeof window !== 'undefined') {
        localStorage.setItem('collectionState', JSON.stringify(updatedRequests));
      }
      return { ...state, requests: updatedRequests };
    }),
    on(updateRequest, (state, { id, changes }) => {
      const updatedRequests = state.requests.map((request) =>
        request.id === id ? { ...request, ...changes } : request
      );
      if (typeof window !== 'undefined') {
        localStorage.setItem('collectionState', JSON.stringify(updatedRequests));
      }
      return { ...state, requests: updatedRequests };
    }),
    on(deleteRequest, (state, { id }) => {
      const updatedRequests = state.requests.filter((request) => request.id !== id);
      if (typeof window !== 'undefined') {
        localStorage.setItem('collectionState', JSON.stringify(updatedRequests));
      }
      return { ...state, requests: updatedRequests };
    })
  );
  