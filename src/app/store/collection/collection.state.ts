import { Collection } from "../../models/Collection.model";

export interface CollectionState {
  requests: Collection[];
}

const initialState: CollectionState = {
  requests: [],
};