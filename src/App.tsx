import React, { useState, useCallback } from "react"
import type { Relation, OrderedPair } from "./interfaces/relation"

import CollectionSet from "./components/set/Set"
import Matrix from "./components/matrix/Matrix"

function App() {
  const [a, setA] = useState(["a", "b", "c"])
  const [b, setB] = useState(["1", "2", "3", "4"])
  const [r, setR] = useState<Relation>([])

  const changeA = useCallback(
    set => {
      setA(set)
    },
    [setA]
  )

  const changeB = useCallback(
    set => {
      setB(set)
    },
    [setB]
  )

  const toggleR = useCallback(
    (domain: any, range: any) => {
      const func = ([rd, rr]: OrderedPair) => {
        return domain === rd && range === rr
      }

      const exists = r.some(func)

      if (exists) setR(oldR => oldR.filter(x => !func(x)))
      else setR(oldR => [...oldR, [domain, range]])
    },
    [r, setR]
  )

  return (
    <div className='app'>
      <div className='sets'>
        <CollectionSet name='A' elements={a} changed={changeA} />
        <CollectionSet name='B' elements={b} changed={changeB} />
      </div>

      <Matrix name='R' domain={a} range={b} relation={r} changed={toggleR} />
    </div>
  )
}

export default App
