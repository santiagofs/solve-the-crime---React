import { cloneDeep } from "lodash";
import getBoundaries from "./get-boundaries";
import removeItemFromBoard from "./remove-item-from-board";
import { Board, Rule } from "./types";

const applyTrim = (board:Board, rule:Rule):Board => {
  let ret = cloneDeep(board)
  const boardSize = {rows: board.length, cols: board[0].length}
  const boundaries = getBoundaries(board, [rule.a, rule.b])

  for(let row = 0; row < boardSize.rows; row++) {
    for(let col=0; col < boardSize.cols; col++) {
      if(rule.distance.cols !== 0) {
          if(col >= boundaries[rule.b].right) removeItemFromBoard(ret, col, row, rule.a, true)
          if(col <= boundaries[rule.a].left) removeItemFromBoard(ret, col, row, rule.b, true)
      }
      if(rule.distance.rows !== 0) {
        if(rule.distance.rows > 0) {
          if(row >= boundaries[rule.b].bottom) removeItemFromBoard(ret, col, row, rule.a, true)
          if(row <= boundaries[rule.a].top) removeItemFromBoard(ret, col, row, rule.b, true)
        } else {
          if(row <= boundaries[rule.b].top) removeItemFromBoard(ret, col, row, rule.a, true)
          if(row >= boundaries[rule.a].bottom) removeItemFromBoard(ret, col, row, rule.b, true)
        }
      }
    }
  }

  return ret
}

export default applyTrim