import { createReducer, on } from '@ngrx/store';
import { addRequest, updateRequest, deleteRequest } from './waste-collection.actions';
import {Collection } from '../../models/Collection.model';



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