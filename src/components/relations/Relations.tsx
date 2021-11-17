import { useCallback } from "react"
import { useGlobal } from "../../providers/global"
import Relation from "../relation/Relation"
import "./relations.sass"

const Relations = () => {
  const { state, dispatch } = useGlobal()

  const addRelation = useCallback(() => {
    dispatch({ type: "ADD_RELATION" })
  }, [dispatch])

  return (
    <div className='relations'>
      <main>
        {state.relations.map((relation, key) => (
          <Relation relation={relation} key={key} />
        ))}
      </main>

      <footer>
        <button className='add' onClick={addRelation}>
          Add Relation
        </button>
      </footer>

      {/* <pre>{JSON.stringify(state, null, 2)}</pre> */}
    </div>
  )
}

export default Relations
