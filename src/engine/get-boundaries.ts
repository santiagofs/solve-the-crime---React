import iterateBoard from "./iterate-board";
import { Board, Boundaries } from "./types";

function getBoundaries(board:Board,  items: string[]):{[itemName: string]:Boundaries} {
  const ret:{[itemName: string]:Boundaries} = {}

  const cols:{[itemName:string]: number[]} = {}
  const rows:{[itemName:string]: number[]} = {}
  for(const itemName of items) {
    cols[itemName] = []
    rows[itemName] = []
  }
  iterateBoard(board, (room) => {
    for(const itemName of items) {
      if(room.items.includes(itemName)) {
        cols[itemName].push(room.col)
        rows[itemName].push(room.row)
      }
    }
  })

  for(const itemName of items) {
    ret[itemName] = {
      top: Math.min(...rows[itemName]),
      left: Math.min(...cols[itemName]),
      right: Math.max(...cols[itemName]),
      bottom: Math.max(...rows[itemName])
    }
  }
  return ret
}

export default getBoundaries