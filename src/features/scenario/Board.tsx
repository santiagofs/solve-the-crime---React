import { useDispatch, useSelector } from "react-redux";
import type { Board as BoardType, CoordMap } from "../../engine/types";

import Cell from "./Cell";
import { gameActions, getBoardAsCoordinatesMap } from "../../store/game-slice";

type BoardProps = {
  board: BoardType;
  solution: CoordMap;
};

// we need to hardcode the board classNames
const cellClassnames: { [ndx: string]: string } = {
  w2: "w-1/2",
  w3: "w-1/3",
  "4": "w-1/4",
  h2: "h-1/2",
  h3: "h-1/3",
  h4: "h-1/4",
};

const Board = ({ board, solution }: BoardProps) => {
  const dispatch = useDispatch();
  const coordMap = useSelector(getBoardAsCoordinatesMap);

  const rows = board.length;
  const cols = rows > 0 ? board[0].length : 0;
  let classnames: string[] = [
    cellClassnames["w" + cols],
    cellClassnames["h" + rows],
  ];
  classnames.push("border-collapse border border-slate-400");

  const handleItemClick = (
    col: number,
    row: number,
    itemKey: string,
    remove: boolean = false
  ) => {
    const itemSolution = solution[itemKey][0];
    const isSolution = itemSolution.col === col && itemSolution.row === row;
    if (isSolution === remove) {
      dispatch(gameActions.addError());
      return false;
    }
    if (remove) {
      return dispatch(gameActions.removeFromBoard({ col, row, itemKey }));
    } else {
      return dispatch(gameActions.selectItem({ col, row, itemKey }));
    }
  };

  return (
    <div className="flex flex-wrap aspect-square">
      {board.map((cols, rowIndex) => {
        return cols.map((itemKeys, colIndex) => {
          const bgClassname =
            (colIndex + rowIndex) % 2 === 1 ? " bg-stone-300" : "";
          return (
            <div className={classnames.join(" ") + bgClassname} key={colIndex}>
              <Cell
                itemKeys={itemKeys}
                handleClick={(itemKey, remove = false) =>
                  handleItemClick(colIndex, rowIndex, itemKey, remove)
                }
              />
            </div>
          );
        });
      })}
      <pre>{JSON.stringify(solution, null, 2)}</pre>
      <pre>{JSON.stringify(coordMap, null, 2)}</pre>
    </div>
  );
};

export default Board;
