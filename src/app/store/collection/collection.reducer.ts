import { createReducer, on } from '@ngrx/store';
import { addRequest, updateRequest, deleteRequest } from './collection.actions';
import { CollectionState } from './collection.state';


const getStoredRequests = (): CollectionState[] => {
  try {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('collectionRequests');
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return [];
  }
};


const initialState: CollectionState = {
  requests: getStoredRequests()
};

// Helper function to save to localStorage
const saveToLocalStorage = (requests:CollectionState[]) => {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem('collectionRequests', JSON.stringify(requests));
    }
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const wasteCollectionReducer = createReducer(
  initialState,
  on(addRequest, (state, { request }) => {
    const updatedRequests = [...state.requests, request];
    saveToLocalStorage(updatedRequests);
    return { ...state, requests: updatedRequests };
  }),
  
  on(updateRequest, (state, { id, changes }) => {
    const updatedRequests = state.requests.map(request =>
      request.id === id ? { ...request, ...changes } : request
    );
    saveToLocalStorage(updatedRequests);
    return { ...state, requests: updatedRequests };
  }),
  
  on(deleteRequest, (state, { id }) => {
    const updatedRequests = state.requests.filter(request => request.id !== id);
    saveToLocalStorage(updatedRequests);
    return { ...state, requests: updatedRequests };
  })
);