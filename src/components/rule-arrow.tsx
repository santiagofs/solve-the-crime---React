import { IconType } from 'react-icons'
import { BsArrowDownRight, BsArrowUpRight, BsArrowRight, BsArrowDown, BsArrowsAngleContract } from 'react-icons/bs'

import { Vector } from "../engine/types"


type RuleIconProps = Vector

const RuleArrow = function({cols, rows}:RuleIconProps) {
  let Icon:IconType
  if(cols === 0 && rows === 0) {
    Icon = BsArrowsAngleContract
  } else if(cols === 0) {
    Icon = BsArrowDown
  } else if(rows === 0) {
    Icon = BsArrowRight
  } else if(rows > 0) {
    Icon = BsArrowDownRight
  } else {
    Icon = BsArrowUpRight
  }

  return <Icon className='w-full h-full'/>
}

export default RuleArrow