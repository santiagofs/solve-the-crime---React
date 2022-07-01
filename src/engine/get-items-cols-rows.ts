import iterateBoard from "./iterate-board";
import { Board} from "./types";

function getRowsCols(board:Board,  items: string[]):{[itemName: string]:{cols:number[], rows:number[]}} {
  const ret:{[itemName: string]:{cols:number[], rows:number[]}} = {}
  for(const itemName of items) {
    ret[itemName]= {cols: [], rows: []}
  }
  iterateBoard(board, (room) => {
    for(const itemName of items) {
      if(room.items.includes(itemName)) {
        ret[itemName].cols.push(room.col)
        ret[itemName].rows.push(room.row)
      }
    }
  })
  return ret
}

export default getRowsCols