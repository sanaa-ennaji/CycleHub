import { createReducer, on } from '@ngrx/store';
import { addRequest, updateRequest, deleteRequest } from './collection.actions';
import {CollectionState   } from './collection.state'

const initialState: CollectionState = {
    requests: [],
  };
export const wasteCollectionReducer = createReducer(
  initialState,
  on(addRequest, (state, { request }) => ({
    ...state,
    requests: [...state.requests, request],
  })),
  on(updateRequest, (state, { id, changes }) => ({
    ...state,
    requests: state.requests.map((request) =>
      request.id === id ? { ...request, ...changes } : request
    ),
  })),
  on(deleteRequest, (state, { id }) => ({
    ...state,
    requests: state.requests.filter((request) => request.id !== id),
  }))
);