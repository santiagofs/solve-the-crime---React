import { cloneDeep } from 'lodash'
import getItemsColsRows from "./get-items-cols-rows";
import removeItemFromBoard from './remove-item-from-board';
import { Board, Rule } from './types'

const applySameAxis = (board:Board, rule:Rule):Board => {
  const ret:Board = cloneDeep(board)
  const boardSize = {rows: board.length, cols: board[0].length}
  const itemsColsRows = getItemsColsRows(board, [rule.a, rule.b])
  for (let row=0; row < boardSize.rows; row++) {
    for (let col=0; col < boardSize.cols; col++) {
      if(rule.distance.cols === 0) {
        if(itemsColsRows[rule.a].cols.indexOf(col) === -1) removeItemFromBoard (ret, col, row, rule.b, true)
        if(itemsColsRows[rule.b].cols.indexOf(col) === -1) removeItemFromBoard (ret, col, row, rule.a, true)
      }
      if(rule.distance.rows === 0) {
        if(itemsColsRows[rule.a].rows.indexOf(row) === -1) removeItemFromBoard (ret, col, row, rule.b, true)
        if(itemsColsRows[rule.b].rows.indexOf(row) === -1) removeItemFromBoard (ret, col, row, rule.a, true)
      }
    }
  }
  return ret
}

export default applySameAxis