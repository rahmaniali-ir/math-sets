import { Dispatch } from "react"
import { Action } from "../interfaces/action"
import { Collection } from "../interfaces/collection"
import { Relation } from "../interfaces/relation"

// interfaces
export interface GlobalState {
  collections: Collection[]
  relations: Relation[]
}

// actions
export type GlobalAction = Action<
  // collections
  | "ADD_COLLECTION"
  | "ADD_TO_COLLECTION"
  | "REMOVE_FROM_COLLECTION"
  | "RENAME_COLLECTION"
  | "REMOVE_COLLECTION"

  // relations
  | "ADD_RELATION"
  | "UPDATE_RELATION_SOURCE"
  | "UPDATE_RELATION_TARGET"
  | "TOGGLE_RELATION_NODE"
>

// reducer interface
export interface GlobalReducer {
  state: GlobalState
  dispatch: Dispatch<GlobalAction>
}
