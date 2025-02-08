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

const initialState: CollectionState = getInitialState();

const saveStateToLocalStorage = (state: CollectionState) => {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem('collectionState', JSON.stringify(state));
    }
  } catch (error) {
    console.error('Error saving state to localStorage:', error);
  }
};

export const wasteCollectionReducer = createReducer(
  initialState,
  on(addRequest, (state, { request }) => {
    const updatedRequests = [...state.requests, request];
    const newState = { ...state, requests: updatedRequests };
    saveStateToLocalStorage(newState);
    return newState;
  }),
  on(updateRequest, (state, { id, changes }) => {
    const updatedRequests = state.requests.map((request) =>
      request.id === id ? { ...request, ...changes } : request
    );
    const newState = { ...state, requests: updatedRequests };
    saveStateToLocalStorage(newState);
    return newState;
  }),
  on(deleteRequest, (state, { id }) => {
    const updatedRequests = state.requests.filter((request) => request.id !== id);
    const newState = { ...state, requests: updatedRequests };
    saveStateToLocalStorage(newState);
    return newState;
  })
);