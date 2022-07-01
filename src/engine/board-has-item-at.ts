import { Board } from "./types"

const boardHasItemAt = (board:Board, col: number, row: number, item:string) => {
  return board[row][col].indexOf(item) !== -1
}

export default boardHasItemAt