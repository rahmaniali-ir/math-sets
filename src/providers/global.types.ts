import { Dispatch } from "react"
import { Action } from "../interfaces/action"
import { Collection } from "../interfaces/collection"

// interfaces
export interface GlobalState {
  collections: Collection[]
  relations: any[]
}

// actions
export type GlobalAction = Action<
  | "ADD_COLLECTION"
  | "ADD_TO_COLLECTION"
  | "REMOVE_FROM_COLLECTION"
  | "RENAME_COLLECTION"
  | "REMOVE_COLLECTION"
>

// reducer interface
export interface GlobalReducer {
  state: GlobalState
  dispatch: Dispatch<GlobalAction>
}
