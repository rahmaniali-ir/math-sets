import { createContext, useContext, useReducer } from "react"
import { Collection } from "../interfaces/collection"
import { OrderedPair } from "../interfaces/relation"
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
  relations: [
    {
      name: "R",
      source: "A",
      target: "B",
      nodes: [],
    },
  ],
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

const generateUniqueRelationLetter = (state: GlobalState) => {
  const charSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  const usedChars = state.relations.map(relation => relation.name)

  if (usedChars.length === charSet.length) return ""

  do {
    const char = charSet[Math.floor(Math.random() * charSet.length)]
    if (!usedChars.includes(char)) return char
  } while (true)
}

const collectionLetterExists = (state: GlobalState, name: string) => {
  return state.collections.some(collection => collection.name === name)
}

const getCollectionIndex = (state: GlobalState, name: string) => {
  return state.collections.findIndex(collection => collection.name === name)
}

const getRelationIndex = (state: GlobalState, name: string) => {
  return state.relations.findIndex(relation => relation.name === name)
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
      const collectionIndex = getCollectionIndex(
        state,
        action.payload.collection
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

      const collectionIndex = getCollectionIndex(state, action.payload.name)

      const newCollections: Collection[] = state.collections.map(
        (collection, index) =>
          index === collectionIndex
            ? { name, elements: collection.elements }
            : collection
      )

      return { ...state, collections: newCollections }
    }

    case "REMOVE_COLLECTION": {
      const collectionIndex = getCollectionIndex(state, action.payload.name)

      return {
        ...state,
        collections: state.collections.filter(
          (_, index) => index !== collectionIndex
        ),
      }
    }

    case "REMOVE_FROM_COLLECTION": {
      const collectionIndex = getCollectionIndex(state, action.payload.name)

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

    case "ADD_RELATION": {
      const name = generateUniqueRelationLetter(state)

      return {
        ...state,
        relations: [
          ...state.relations,
          { name, source: "", target: "", nodes: [] },
        ],
      }
    }

    case "UPDATE_RELATION_SOURCE": {
      const relIndex = getRelationIndex(state, action.payload.name)

      if (state.relations[relIndex].source === action.payload.source)
        return state

      const newRelations = state.relations.map((coll, index) => {
        return index === relIndex
          ? { ...coll, source: action.payload.source, nodes: [] }
          : coll
      })

      return { ...state, relations: newRelations }
    }

    case "UPDATE_RELATION_TARGET": {
      const relIndex = getRelationIndex(state, action.payload.name)

      if (state.relations[relIndex].target === action.payload.target)
        return state

      const newRelations = state.relations.map((coll, index) => {
        return index === relIndex
          ? { ...coll, target: action.payload.target, nodes: [] }
          : coll
      })

      return { ...state, relations: newRelations }
    }

    case "TOGGLE_RELATION_NODE": {
      const relIndex = getRelationIndex(state, action.payload.name)
      const rel = state.relations[relIndex]
      const [d, r]: OrderedPair<string> = action.payload.node

      const exists = rel.nodes.some(node => node[0] === d && node[1] === r)

      if (exists) {
        rel.nodes = rel.nodes.filter(node => !(node[0] === d && node[1] === r))
      } else {
        rel.nodes = [...rel.nodes, [d, r]]
      }

      return { ...state }
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
