import { cloneDeep } from "lodash";
import { Board } from "./types";

export const removeItemFromBoard = (board:Board, col: number, row: number, item:string, reference:boolean = false) => {
  const ndx = board[row][col].indexOf(item)
  if(ndx === -1) return board
  const ret = reference ?  board : cloneDeep(board)
  ret[row][col].splice(ndx,1)
  return ret
}

export default removeItemFromBoard