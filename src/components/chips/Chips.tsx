import Icon from "../icon/Icon"
import "./chips.sass"

import { IconName } from "../icon/iconPack"

type Props = {
  icon: IconName
  text?: string
  className?: string
}

const Chips = ({ icon, text, className }: Props) => {
  return (
    <div className={`chips ${className}`} title={text}>
      <Icon name={icon} />
      {text && <main>{text}</main>}
    </div>
  )
}

export default Chips
