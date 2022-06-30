import { Board } from "../types"
import roomItems from "./room-items"

const createBoard = function(cols:number, rows:Number):Board {
  let ret:Board = []
  for(let y=0; y < rows; y++) {
    ret[y] = []
    for (let x=0; x < cols; x++) {
      ret[y][x] = [...roomItems]
    }
  }
  return ret
}


export default createBoard
