import { createReducer, on } from '@ngrx/store';
import { addRequest, updateRequest, deleteRequest } from './collection.actions';
import { CollectionState } from './collection.state';


const getInitialState = (): CollectionState => {
  try {
    if (typeof window !== 'undefined') {
      const storedState = localStorage.getItem('collectionState');
      return storedState ? JSON.parse(storedState) : [];
    }
    return [];
  } catch (error) {
    console.error('Error loading state from localStorage:', error);
    return [];
  }

};
const initialState: CollectionState = getInitialState();
const saveStateToLocalStorage = (state: CollectionState) => {
  try {
    if (typeof window !== 'undefined') {
        console.log('Attempting to save state to localStorage:', state);
      localStorage.setItem('collectionState', JSON.stringify(state));
      console.log('State saved to localStorage successfully.'); 
    } else {
        console.log('Window is undefined. Skipping localStorage save.');
      }
  } catch (error) {
    console.error('Error saving state to localStorage:', error);
  }
};
export const wasteCollectionReducer = createReducer(
  initialState,
//   on(addRequest, (state, { request }) => {
//     console.log('Current state before adding request:', state);
//     const updatedRequests = [...state.requests, request];
//     const newState = { ...state, requests: updatedRequests };
//     console.log('New state after adding request:', newState);
//     saveStateToLocalStorage(newState);
//     return newState;
//   }),

  on(addRequest, (state, { request }) => {
    const updatedRequests = [...state.requests, request];
  
    if (typeof window !== 'undefined') {
      localStorage.setItem('collectionState', JSON.stringify({ requests: updatedRequests }));
      console.log('Updated Local Storage:', JSON.parse(localStorage.getItem('collectionState') || '[]')); // Debugging line
    }
  
    return { ...state, requests: updatedRequests };
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