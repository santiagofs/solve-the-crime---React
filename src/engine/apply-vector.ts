import { cloneDeep } from "lodash";
import removeItemFromBoard from "./remove-item-from-board";
import { Board, Vector } from "./types";

const applyVector = (board:Board, vector:Vector, itemA:string, itemB:string):Board => {
  const boardSize = {rows: board.length, cols: board[0].length}
  const ret = cloneDeep(board)
  for (let row=0; row < boardSize.rows; row++) {
    for (let col=0; col < boardSize.cols; col++) {
      const [colA, rowA] = [col - vector.cols, row - vector.rows]
      const [colB, rowB] = [col + vector.cols, row + vector.rows]
      if ( colA < 0 || rowA < 0 || board[row][col].indexOf(itemB) === -1) removeItemFromBoard(ret, col, row, itemA, true)
      if ( colB > boardSize.cols || rowB > boardSize.rows || board[row][col].indexOf(itemA) === -1) removeItemFromBoard(ret, col, row, itemB, true)
    }
  }
  return ret
}

export default applyVector