import { useCallback, useEffect, useMemo, useState } from "react"
import { Relation as Rel } from "../../interfaces/relation"
import { useGlobal } from "../../providers/global"
import Chips from "../chips/Chips"
import Matrix from "../matrix/Matrix"
import Diagram from "../diagram/Diagram"
import SelectRelation from "../selectRelation/SelectRelation"
import "./relation.sass"

interface Props {
  relation: Rel
}

const Relation = ({ relation }: Props) => {
  const { state, dispatch } = useGlobal()
  const [source, setSource] = useState("")
  const [target, setTarget] = useState("")

  // domain
  const domainSet = useMemo(() => {
    return state.collections.find(
      collection => collection.name === relation.source
    )?.elements
  }, [state, relation.source])

  // range
  const rangeSet = useMemo(() => {
    return state.collections.find(
      collection => collection.name === relation.target
    )?.elements
  }, [state, relation.target])

  const isFilled = useMemo(() => {
    return (
      domainSet &&
      rangeSet &&
      relation.nodes.length === domainSet.length * rangeSet.length
    )
  }, [relation.nodes.length, domainSet, rangeSet])

  useEffect(() => {
    if (relation.source) setSource(relation.source)
    if (relation.target) setTarget(relation.target)
  }, [relation.source, relation.target, setSource, setTarget])

  const onSourceChange = useCallback(
    (collection: string) => {
      setSource(collection)

      dispatch({
        type: "UPDATE_RELATION_SOURCE",
        payload: { name: relation.name, source: collection },
      })
    },
    [setSource, dispatch, relation.name]
  )

  const onTargetChange = useCallback(
    (collection: string) => {
      setTarget(collection)

      dispatch({
        type: "UPDATE_RELATION_TARGET",
        payload: { name: relation.name, target: collection },
      })
    },
    [setTarget, dispatch, relation.name]
  )

  const onMatrixToggle = useCallback(
    (d: string, r: string) => {
      dispatch({
        type: "TOGGLE_RELATION_NODE",
        payload: { name: relation.name, node: [d, r] },
      })
    },
    [dispatch, relation.name]
  )

  return (
    <div className='box column relation'>
      <header className='flex-align'>
        <div className='flex-align relation-details'>
          <input type='text' maxLength={1} defaultValue={relation.name} />
          =
          <SelectRelation changed={coll => onSourceChange(coll)} />
          {"->"}
          <SelectRelation changed={coll => onTargetChange(coll)} />
        </div>

        <div className='flex-align attributes'>
          <Chips
            icon='grid'
            text='Filled'
            className={isFilled ? "on" : "off"}
          />
        </div>
      </header>

      {(!source || !target) && (
        <main className='not-ready'>Select source and target sets!</main>
      )}

      {source && target && (
        <main>
          <Matrix
            name={relation.name}
            relation={relation}
            domain={domainSet!}
            range={rangeSet!}
            changed={onMatrixToggle}
          />

          <Diagram relation={relation} />
        </main>
      )}
    </div>
  )
}

export default Relation
