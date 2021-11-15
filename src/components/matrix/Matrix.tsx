import { useState, useEffect, useCallback } from "react"
import "./matrix.sass"

import type { Relation } from "../../interfaces/relation"

type Props<T = any> = {
  name: string
  domain: T[]
  range: T[]
  relation: Relation
  changed?: Function
}

const Matrix = ({ name, domain, range, relation, changed }: Props<string>) => {
  const [hovered, setHovered] = useState({ domain: null, range: null })

  const onMouseHover = useCallback(
    (d, r) => {
      setHovered({ domain: d, range: r })
    },
    [setHovered]
  )

  const onMouseLeave = useCallback(() => {
    setHovered({ domain: null, range: null })
  }, [setHovered])

  const onToggle = useCallback(
    (d, r) => {
      if (changed) {
        changed(d, r)

        // force to rerender
        setHovered(h => ({ ...h }))
      }
    },
    [changed, setHovered]
  )

  const getRelation = useCallback(
    (d, r) => {
      return relation.nodes.some(([rd, rr]) => {
        return d === rd && r === rr
      })
    },
    [relation]
  )

  // the main section
  const main = (
    <main>
      <div className='domain'>
        <div></div>
        {domain.map((d, di) => (
          <div key={di} className={hovered.domain === d ? "hovered" : ""}>
            {d}
          </div>
        ))}
      </div>

      <div className='range'>
        <div></div>
        {range.map((r, ri) => (
          <div key={ri} className={hovered.range === r ? "hovered" : ""}>
            {r}
          </div>
        ))}
      </div>

      <div className='table' onMouseLeave={onMouseLeave}>
        {domain.map((d, di) => (
          <div className='row' key={di}>
            {range.map((r, ri) => (
              <div
                key={ri}
                onMouseEnter={() => onMouseHover(d, r)}
                onClick={() => onToggle(d, r)}
                title={`(${d}, ${r})`}
              >
                <span>{getRelation(d, r) ? "1" : "0"}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </main>
  )

  return (
    <div className='matrix'>
      <header>
        M<span>{name}</span>
      </header>

      {domain.length > 0 && range.length > 0 ? (
        main
      ) : (
        <div className='empty'>N/A</div>
      )}
    </div>
  )
}

export default Matrix
