// checks if an item is out of the boundaries for a related item
import { Boundaries, Direction, Room } from "./types"


const _checkTrim = (position:number, direction:Direction, minA:number, maxA: number, minB:number, maxB:number):[boolean, boolean] => {
  // let a:boolean, b:boolean
  // if(direction < 0) {
  //   a = position > (minB + distance + direction)
  //   b = position < (maxA + distance + direction)
  // } else if(direction === 0) {
  //   a = position < (maxB - distance + direction)
  //   b = position > (minA - distance + direction)
  // } else {
  //   // A is to the left or on top of B
  //   // check if A should be removed
  //   a = position < maxB
  // }
  // return [a, b]
  return [false, false]
}
const checkTrim = (room: Room, A: Boundaries, B: Boundaries, directions:[Direction, Direction]):[boolean, boolean] => {

  const [colA, colB] = _checkTrim(room.col, directions[0], A.left, A.right, B.left, B.right)
  const [rowA, rowB] = _checkTrim(room.row, directions[1], A.top, A.bottom, B.top, B.bottom)

  return [colA || rowA, colB || rowB]
}

export default checkTrim