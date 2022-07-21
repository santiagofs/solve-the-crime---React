import { useDispatch } from "react-redux"
import type { Board as BoardType, CoordMap } from "../../engine/types"

import Cell from './Cell'
import { gameActions } from '../../store/game-slice'

type BoardProps = {
  board: BoardType,
  solution: CoordMap
}

// we need to hardcode the board classNames
const cellClassnames:{[ndx:string]:string} = {
    'w2': 'w-1/2', 'w3': 'w-1/3', '4': 'w-1/4',
    'h2': 'h-1/2', 'h3': 'h-1/3', 'h4': 'h-1/4'
}

const Board = ({board, solution}:BoardProps) => {
  const dispatch = useDispatch()


  const rows = (board.length)
  const cols = rows > 0 ? board[0].length : 0
  let classnames:string[] = [cellClassnames['w'+cols],  cellClassnames['h'+rows]]
  classnames.push('border-collapse border border-slate-400')

  const onRemoveItem = (col: number, row: number, itemKey: string) => {
    const itemSolution = solution[itemKey][0]
    if(itemSolution.col === col && itemSolution.row === row) {

      dispatch(gameActions.addError())
      return false
    }

    dispatch(gameActions.removeFromBoard({col, row, itemKey}))
  }

  return (
    <div className="flex flex-wrap aspect-square">
      {board.map((cols, rowIndex) => {
        return  cols.map((itemKeys, colIndex) => {
          const bgClassname = (colIndex + rowIndex) % 2 === 1 ? ' bg-stone-300' : ''
          return <div className={classnames.join(' ') + bgClassname} key={colIndex}>
          <Cell itemKeys={itemKeys} removeItem={itemKey => onRemoveItem(colIndex, rowIndex, itemKey) }/>
          </div>
        })})}
    </div>
  )
}

export default Board