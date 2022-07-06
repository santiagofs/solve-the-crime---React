import { Board, CoordMap } from "./types";

const boardAsCoordinatesMap = (board:Board):CoordMap => {
  const ret:CoordMap = {}
  for(let y = 0; y < board.length; y++) {
    for(let x = 0; x < board[y].length; x++) {
      for(let item of board[y][x]) {
        if(!ret[item]) ret[item] = []
        ret[item].push({col: x, row: y})
      }
    }
  }

  return ret
}

export default boardAsCoordinatesMap