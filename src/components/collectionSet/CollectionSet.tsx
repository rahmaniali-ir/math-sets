import { useCallback, useEffect, useRef } from "react"
import { Collection } from "../../interfaces/collection"
import { useGlobal } from "../../providers/global"
import "./collectionSet.sass"

type Props = {
  collection: Collection
}

const CollectionSet = ({ collection }: Props) => {
  const { dispatch } = useGlobal()
  const inputRef = useRef<HTMLInputElement>(null)

  // update name if updated
  useEffect(() => {
    inputRef.current!.value = collection.name
  }, [collection.name])

  // update input on textbox value change
  const onNameChange = useCallback(
    e => {
      if (e.key === "Enter") {
        dispatch({
          type: "RENAME_COLLECTION",
          payload: { collection: collection.name, name: e.target.value },
        })
      }
    },
    [dispatch, collection.name]
  )

  // update input on textbox value change
  const onAdd = useCallback(
    e => {
      if (e.key === "Enter") {
        dispatch({
          type: "ADD_TO_COLLECTION",
          payload: { collection: collection.name, input: e.target.value },
        })

        e.target.value = ""
      }
    },
    [dispatch, collection.name]
  )

  // update input on textbox value change
  const onRemoveCollection = useCallback(() => {
    dispatch({
      type: "REMOVE_COLLECTION",
      payload: { name: collection.name },
    })
  }, [dispatch, collection.name])

  // update input on textbox value change
  const onRemoveElement = useCallback(
    (element: string) => {
      dispatch({
        type: "REMOVE_FROM_COLLECTION",
        payload: { name: collection.name, element },
      })
    },
    [dispatch, collection.name]
  )

  return (
    <div className='set'>
      <header>
        <input
          type='text'
          maxLength={1}
          defaultValue={collection.name}
          onKeyUp={onNameChange}
          ref={inputRef}
        />
      </header>

      <main>
        {collection.elements.map((element, key) => (
          <div
            className='element'
            key={key}
            onClick={() => onRemoveElement(element)}
          >
            <span>{element}</span>
          </div>
        ))}
      </main>

      <div className='add'>
        <input type='text' onKeyUp={onAdd} />
      </div>

      <div className='delete'>
        <button onClick={onRemoveCollection}>Del</button>
      </div>

      <footer>{collection.elements.length}</footer>
    </div>
  )
}

export default CollectionSet
