import createRoom from "./create-room";
import { Board, Room } from "./types";

function iterateBoard (board:Board, callback:(room:Room) => void) {
  for(let y = 0; y < board.length; y++) {
    for(let x = 0; x < board[y].length; x++) {
      callback( createRoom(board, x, y) )
    }
  }
}

export default iterateBoard