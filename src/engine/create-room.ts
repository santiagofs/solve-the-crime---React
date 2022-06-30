import { Board, Room } from "./types";

function createRoom(board:Board, col:number, row:number):Room {
  let items = board[row][col]
  return {
    items: items ?? [],
    col,
    row
  }

}

export default createRoom