import { useCallback } from "react"
import { useGlobal } from "../../providers/global"
import CollectionSet from "../collectionSet/CollectionSet"
import "./collections.sass"

const Collections = () => {
  const { state, dispatch } = useGlobal()

  const addCollection = useCallback(() => {
    dispatch({ type: "ADD_COLLECTION" })
  }, [dispatch])

  return (
    <div className='collections'>
      {state.collections.map((collection, key) => (
        <CollectionSet key={key} collection={collection} />
      ))}

      <button className='add' onClick={addCollection}>
        Add
      </button>
    </div>
  )
}

export default Collections
