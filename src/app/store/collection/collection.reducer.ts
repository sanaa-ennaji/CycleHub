import { createReducer, on } from '@ngrx/store';
import { addRequest, updateRequest, deleteRequest } from './collection.actions';
import { CollectionState } from './collection.state';


const getInitialState = (): CollectionState => {
  try {
    if (typeof window !== 'undefined') {
      console.log('Attempting to load state from localStorage...'); // Debug
      const storedState = localStorage.getItem('collectionState');
      console.log('Stored state:', storedState); // Debug
      return storedState ? JSON.parse(storedState) : { requests: [] };
    }
  } catch (error) {
    console.error('Error loading state from localStorage:', error); // Debug
  }
  return { requests: [] };
};

const initialState: CollectionState = getInitialState();
console.log('Initial state:', initialState); // Debug

// Helper function to save state to localStorage
const saveStateToLocalStorage = (state: CollectionState) => {
  try {
    if (typeof window !== 'undefined') {
      console.log('Attempting to save state to localStorage:', state); // Debug
      localStorage.setItem('collectionState', JSON.stringify(state));
      console.log('State saved to localStorage successfully.'); // Debug
    }
  } catch (error) {
    console.error('Error saving state to localStorage:', error); // Debug
  }
};

export const wasteCollectionReducer = createReducer(
  initialState,
  on(addRequest, (state, { request }) => {
    console.log('Adding request:', request); // Debug
    const updatedRequests = [...state.requests, request];
    const newState = { ...state, requests: updatedRequests };
    saveStateToLocalStorage(newState);
    return newState;
  }),
  on(updateRequest, (state, { id, changes }) => {
    console.log('Updating request with ID:', id, 'Changes:', changes); // Debug
    const updatedRequests = state.requests.map((request) =>
      request.id === id ? { ...request, ...changes } : request
    );
    const newState = { ...state, requests: updatedRequests };
    saveStateToLocalStorage(newState);
    return newState;
  }),
  on(deleteRequest, (state, { id }) => {
    console.log('Deleting request with ID:', id); // Debug
    const updatedRequests = state.requests.filter((request) => request.id !== id);
    const newState = { ...state, requests: updatedRequests };
    saveStateToLocalStorage(newState);
    return newState;
  })
);