// checks if an item is out of the boundaries for a related item
import { Boundaries, Direction, Room } from "./types"


const checkTrim = (room: Room, A: Boundaries, B: Boundaries, directions:[Direction, Direction]):[boolean, boolean] => {
  const [col, row] = directions

  console.log(room, A)
  return [true, false]
}

export default checkTrim