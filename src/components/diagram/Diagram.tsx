import { useEffect, useMemo, useRef } from "react"
import { OrderedPair, Relation } from "../../interfaces/relation"
import { useGlobal } from "../../providers/global"
import "./diagram.sass"

const PI2 = Math.PI * 2

interface Props {
  relation: Relation
}

const getRandom = (range: number, offset: number = 0) => {
  if (offset > 0)
    return Math.max(
      offset,
      Math.min(range - offset, Math.floor(Math.random() * range))
    )

  return Math.floor(Math.random() * range)
}

const pointTo = (
  ctx: CanvasRenderingContext2D,
  from: OrderedPair<number>,
  to: OrderedPair<number>,
  headLength: number = 8,
  theta: number = 30
) => {
  theta = 180 - theta

  const leftDeg = (-theta * Math.PI) / 180
  const rightDeg = (theta * Math.PI) / 180

  const dx = to[0] - from[0]
  const dy = to[1] - from[1]

  ctx.beginPath()
  ctx.moveTo(from[0], from[1])
  ctx.lineTo(to[0], to[1])
  ctx.stroke()

  const angle = Math.atan2(dy, dx)
  const h1x = to[0] + headLength * Math.cos(angle + leftDeg)
  const h1y = to[1] + headLength * Math.sin(angle + leftDeg)
  const h2x = to[0] + headLength * Math.cos(angle + rightDeg)
  const h2y = to[1] + headLength * Math.sin(angle + rightDeg)

  ctx.beginPath()
  ctx.moveTo(to[0], to[1])
  ctx.lineTo(h1x, h1y)
  ctx.stroke()

  ctx.beginPath()
  ctx.moveTo(to[0], to[1])
  ctx.lineTo(h2x, h2y)
  ctx.stroke()
}

const Diagram = ({ relation }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { state } = useGlobal()

  const domain = useMemo(() => {
    return state.collections.find(coll => coll.name === relation.source)
  }, [state.collections, relation.source])

  const range = useMemo(() => {
    return state.collections.find(coll => coll.name === relation.target)
  }, [state.collections, relation.target])

  useEffect(() => {
    const ctx = canvasRef.current!.getContext("2d")!
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current!
    const height = canvas.height
    const width = canvas.width
    const ctx = canvas.getContext("2d")!
    const radius = 8

    // ctx.clearRect(0, 0, width, height)
    ctx.fillStyle = "#f5f5f5"
    ctx.fillRect(0, 0, width, height)
    ctx.fillStyle = "#000"

    if (relation.source === relation.target) {
      relation.nodes.forEach((node, i) => {
        const [d] = node

        const x = getRandom(width, radius + 1)
        const y = getRandom(height, radius + 1)

        ctx.beginPath()
        ctx.arc(x, y, radius, 0, PI2)
        ctx.closePath()
        ctx.stroke()

        ctx.beginPath()
        ctx.fillText(d, x, y, radius * 2)
      })
    } else {
      const column = width / 4
      const columnPadding = column * 0.2
      const verticalCenter = height / 2
      const sourceFloor = height / domain!.elements.length
      const targetFloor = height / range!.elements.length

      // ellipse 1
      ctx.beginPath()
      ctx.ellipse(
        column,
        verticalCenter,
        column / 2,
        verticalCenter * 0.9,
        0,
        0,
        PI2
      )
      ctx.stroke()

      // ellipse 2
      ctx.beginPath()
      ctx.ellipse(
        column * 3,
        verticalCenter,
        column / 2,
        verticalCenter * 0.9,
        0,
        0,
        PI2
      )
      ctx.stroke()

      // source set
      domain!.elements.forEach((element, i) => {
        ctx.fillText(element, column, sourceFloor * i + sourceFloor / 2, column)
      })

      // target set
      range!.elements.forEach((element, i) => {
        ctx.fillText(
          element,
          column * 3,
          targetFloor * i + targetFloor / 2,
          column
        )
      })

      relation.nodes.forEach(node => {
        const [d, r] = node
        const di = domain!.elements.findIndex(e => e === d)
        const ri = range!.elements.findIndex(e => e === r)

        pointTo(
          ctx,
          [column + columnPadding, sourceFloor * di + sourceFloor / 2],
          [column * 3 - columnPadding, targetFloor * ri + targetFloor / 2],
          6
        )
      })
    }
  }, [relation, state, domain, range])

  return (
    <div className='diagram'>
      <canvas ref={canvasRef}></canvas>
    </div>
  )
}

export default Diagram
