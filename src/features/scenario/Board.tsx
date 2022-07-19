import type { Board as BoardType } from "../../engine/types"

type BoardProps = {
  board: BoardType
}

// we need to hardcode the board classNames
const cellClassnames:{[ndx:string]:string} = {
    'w2': 'w-1/2', 'w3': 'w-1/3', '4': 'w-1/4',
    'h2': 'h-1/2', 'h3': 'h-1/3', 'h4': 'h-1/4'
}

const Board = ({board}:BoardProps) => {
  const rows = (board.length)
  const cols = rows > 0 ? board[0].length : 0
  let classnames:string[] = [cellClassnames['w'+cols],  cellClassnames['h'+rows]]
  classnames.push('border-collapse border border-slate-400')

  return (
    <div className="flex flex-wrap aspect-square">
      {board.map((cols, rowIndex) => {
        return  cols.map((itemKeys, colIndex) => {
          const bgClassname = (colIndex + rowIndex) % 2 === 1 ? ' bg-stone-300' : ''
          return <div className={classnames.join(' ') + bgClassname} key={colIndex}>{itemKeys?.map(itemKey => {
            return <span>{itemKey}</span>
          })}
          </div>
        })})}
    </div>
  )
}

export default Board