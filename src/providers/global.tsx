import { createContext, useContext, useReducer } from "react"
import { Collection } from "../interfaces/collection"
import { GlobalAction, GlobalReducer, GlobalState } from "./global.types"

// state
const global: GlobalState = {
  collections: [
    {
      elements: ["a", "b", "c"],
      name: "A",
    },
    {
      elements: ["1", "2", "3", "4"],
      name: "B",
    },
  ],
  relations: [],
}

const generateUniqueCollectionLetter = (state: GlobalState) => {
  const charSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  const usedChars = state.collections.map(collection => collection.name)

  if (usedChars.length === charSet.length) return ""

  do {
    const char = charSet[Math.floor(Math.random() * charSet.length)]
    if (!usedChars.includes(char)) return char
  } while (true)
}

const collectionLetterExists = (state: GlobalState, name: string) => {
  return state.collections.some(collection => collection.name === name)
}

// reducer
const reducer = (state: GlobalState, action: GlobalAction): GlobalState => {
  switch (action.type) {
    case "ADD_COLLECTION": {
      const name = generateUniqueCollectionLetter(state)
      if (!name) return state

      const newCollection: Collection = { name, elements: [] }

      return { ...state, collections: [...state.collections, newCollection] }
    }

    case "ADD_TO_COLLECTION": {
      const collectionIndex = state.collections.findIndex(
        collection => collection.name === action.payload.collection
      )

      const newElements = action.payload.input
        .split(",")
        .map((e: string) => e.trim())
        .filter((e: string) => e)

      const allElements = [
        ...state.collections[collectionIndex].elements,
        ...newElements,
      ]
      const duplicatesFiltered = Array.from(new Set(allElements))

      const newCollections: Collection[] = state.collections.map(
        (collection, index) => {
          if (index === collectionIndex) {
            collection.elements = duplicatesFiltered
          }
          return collection
        }
      )

      return {
        ...state,
        collections: newCollections,
      }
    }

    case "RENAME_COLLECTION": {
      const name: string = action.payload.name.toUpperCase()

      if (collectionLetterExists(state, name)) return state

      const collectionIndex = state.collections.findIndex(
        collection => collection.name === action.payload.collection
      )

      const newCollections: Collection[] = state.collections.map(
        (collection, index) =>
          index === collectionIndex
            ? { name, elements: collection.elements }
            : collection
      )

      return { ...state, collections: newCollections }
    }

    case "REMOVE_COLLECTION": {
      const collectionIndex = state.collections.findIndex(
        collection => collection.name === action.payload.name
      )

      return {
        ...state,
        collections: state.collections.filter(
          (_, index) => index !== collectionIndex
        ),
      }
    }

    case "REMOVE_FROM_COLLECTION": {
      const collectionIndex = state.collections.findIndex(
        collection => collection.name === action.payload.name
      )

      const newCollections = state.collections.map((collection, index) => {
        return index === collectionIndex
          ? {
              ...collection,
              elements: collection.elements.filter(
                element => element !== action.payload.element
              ),
            }
          : collection
      })

      return {
        ...state,
        collections: newCollections,
      }
    }

    default:
      return state
  }
}

// context
const globalContext = createContext<GlobalReducer>({
  state: global,
  dispatch: () => {},
})

// context hook
export const useGlobal = () => useContext(globalContext)

// provider
export const GlobalProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, global)

  return (
    <globalContext.Provider value={{ state, dispatch }}>
      {children}
    </globalContext.Provider>
  )
}
