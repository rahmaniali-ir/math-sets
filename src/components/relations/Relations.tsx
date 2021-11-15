import { useCallback } from "react"
import { useGlobal } from "../../providers/global"
import Relation from "../relation/Relation"
import "./relations.sass"

const Relations = () => {
  const { state, dispatch } = useGlobal()

  // const addCollection = useCallback(() => {
  //   dispatch({ type: "ADD_COLLECTION" })
  // }, [dispatch])

  return (
    <div className='relations'>
      <main>
        {state.relations.map((relation, key) => (
          <Relation relation={relation} key={key} />
        ))}
      </main>

      <footer>
        <button className='add'>Add Relation</button>
      </footer>
    </div>
  )
}

export default Relations
