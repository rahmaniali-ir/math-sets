import { useState, useEffect, useCallback } from "react"
import "./set.sass"

type Props = {
  name: string
  elements?: string[] | number[]
  changed?: Function
}

const CollectionSet = ({ name, elements, changed }: Props) => {
  const [_elements, setElements] = useState<string[]>([])
  const [input, setInput] = useState("")

  // initialize _elements with props
  useEffect(() => {
    if (elements) setInput(elements.join(","))
  }, [])

  // change _elements on input change
  useEffect(() => {
    if (input.length > 0) {
      const trimmedElements = input.split(",").map(e => e.trim())
      // const noDuplicate = Array.from(new Set(trimmedElements))

      setElements(trimmedElements)
      if (changed) changed(trimmedElements)
    } else {
      setElements([])

      if (changed) changed([])
    }
  }, [input])

  // update input on textbox value change
  const inputChanged = useCallback(
    e => {
      setInput(e.target.value)
    },
    [setInput]
  )

  return (
    <div className='set'>
      <header>
        <input type='text' maxLength={1} defaultValue={name} />
      </header>

      <main>
        <input
          type='text'
          value={_elements.join(", ")}
          onInput={inputChanged}
          style={{ width: `calc(${_elements.join(", ").length}ch + 1px)` }}
        />
      </main>

      <footer>{_elements.length}</footer>
    </div>
  )
}

export default CollectionSet
