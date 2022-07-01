import getRowsCols from "./get-items-cols-rows";
import { Board, Boundaries } from "./types";

function getBoundaries(board:Board,  items: string[]):{[itemName: string]:Boundaries} {
  const ret:{[itemName: string]:Boundaries} = {}
  const rowsCols = getRowsCols(board, items)

  for(const itemName of items) {
    ret[itemName] = {
      top: Math.min(...rowsCols[itemName].rows),
      left: Math.min(...rowsCols[itemName].cols),
      right: Math.max(...rowsCols[itemName].cols),
      bottom: Math.max(...rowsCols[itemName].rows)
    }
  }
  return ret
}

export default getBoundaries