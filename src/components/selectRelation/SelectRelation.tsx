import { useCallback, useEffect, useMemo, useState } from "react"
import { useGlobal } from "../../providers/global"
import "./selectRelation.sass"

interface Props {
  changed?: (collection: string) => any
}

const SelectRelation = ({ changed }: Props) => {
  const { state } = useGlobal()
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState("")

  const collections = useMemo(
    () =>
      state.collections
        .map(collection => collection.name)
        .sort((a, b) => (b === selected ? 0 : -1)),
    [state, selected]
  )

  useEffect(() => {
    window.addEventListener("click", () => {
      if (open) setOpen(false)
    })
  }, [open, setOpen])

  const onClickInside = useCallback(e => {
    e.stopPropagation()
  }, [])

  const toggleOpen = useCallback(() => {
    setOpen(!open)
  }, [open, setOpen])

  const onSelect = useCallback(
    (collection: string) => {
      setSelected(collection)
      if (changed) changed(collection)

      setOpen(!open)
    },
    [open, setOpen, setSelected]
  )

  return (
    <div
      className={`box select-relation ${open ? "open" : ""}`}
      onClick={onClickInside}
    >
      <header onClick={toggleOpen}>
        <div className='item'>{selected ? selected : "#"}</div>
      </header>

      <main>
        {collections.map((collection, key) => (
          <div className='item' key={key} onClick={() => onSelect(collection)}>
            {collection}
          </div>
        ))}
      </main>
    </div>
  )
}

export default SelectRelation
