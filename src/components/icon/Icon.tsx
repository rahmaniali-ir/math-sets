import { useMemo } from "react"
import "./icon.sass"

import { pack, IconName } from "./iconPack"

type Props = {
  name: IconName
}

const Icon = ({ name }: Props) => {
  const icon = useMemo(() => ({ __html: pack[name] }), [name])

  return <div className='icon' dangerouslySetInnerHTML={icon}></div>
}

export default Icon
