import { Board, Coord, Room } from "./types";

function createRoom(board:Board, col:number, row:number):Room {
  let items = board[col][row]
  return {
    items: items ?? [],
    col,
    row
  }

}

export default createRoom