import { cloneDeep } from "lodash";
import { Room } from "./types";

export const removeItemFromRoom = (item:string, room: Room) => {
  // const ndx = room.items.indexOf(item)
  // if(ndx === -1) return false
  // room.items.splice(ndx,1)
  // return true

  const ndx = room.items.indexOf(item)
  if(ndx === -1) return room
  const ret = cloneDeep(room)
  ret.items.splice(ndx,1)
  return ret
}

export default removeItemFromRoom