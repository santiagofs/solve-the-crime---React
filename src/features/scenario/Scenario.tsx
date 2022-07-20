import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import LivesDisplay from '../../components/lives-display';

import gameConfig from '../../config';
import createLevel from '../../engine/create-level';
import removeItemFromBoard from '../../engine/remove-item-from-board';
import { Board as BoardType, CoordMap, Level, Rule } from '../../engine/types';
import { RootState } from '../../store';
import Board from './Board';
// import { Board } from '../board/Board';
// import Rules from '../rules/Rules';

export function Scenario({levelId, backHandler}: {levelId: number, backHandler: () => void}) {
  const mistakes = useSelector((state:RootState) => state.game.errors)

  const [level, setLevel] = useState<Level|null>(null)
  const [board, setBoard] = useState<BoardType|null>(null)
  const [rules, setRules] = useState<Rule[]|null>(null)
  const [solution, setSolution] = useState<CoordMap|null>(null)

  // const [grid, setGrid] = useState<Grid<string[]>|null>(null)

  console.log('render scenario')
  useEffect(() => {
    const level:Level = createLevel(gameConfig.levels[levelId - 1])
    setLevel(level)
    setBoard(level.board)
    setRules(level.rules)
    setSolution(level.solution)

  }, [levelId])

  // function removeFromGrid(key:string) {
  //   if(grid === null) return
  //   const [row, col, group, item] = key.split('.')

  //   const ndx = grid[Number(row)][Number(col)]?.indexOf(group + '.' +item)

  //   console.log(row, col, item, ndx)
  //   if (ndx === -1 || ndx === undefined) return

  //   grid[Number(row)][Number(col)]?.splice(ndx, 1)
  //   setGrid([...grid!])
  // }

  // function solveHandler() {
  //   if(level === null) return
  //   level.solve()
  //   setGrid([...level.grid])
  // }
  // function applyRule(rule:Rule) {
  //   if(level === null) return
  //   console.log(level.findMinMax(rule.a, rule.b, level.grid))
  //   level.applyRule(rule, level.grid)
  //   setGrid([...level.grid])
  // }


  // return (
  //   <div>
  //     <h1>The Scenario <button onClick={() => backHandler()}>Back</button> <button onClick={() => solveHandler()}>Solve</button> </h1>
  //     <div className='flex gap-10'>
  //     {(level !== null) && <Board grid={level!.solution.grid} collections={level!.collections}></Board> }
  //     {(level !== null) && <Board grid={grid!} collections={level!.collections} clickHandler={removeFromGrid}></Board> }

  //     {(level !== null) && <Rules rules={level.rules} clickHandler={applyRule} /> }
  //     </div>
  //     {/* {JSON.stringify(game)} */}
  //   </div>
  // );
  const onRemoveItem = (board:BoardType, col:number, row:number, itemKey:string) => {
    const newBoard = removeItemFromBoard(board, col, row, itemKey)
    console.log(newBoard)
    setBoard(newBoard)
  }
  return <div>
    <div className='flex h-[calc(100vh-50px)]'>
      <div className='flex-grow flex h-full justify-center p-10'>

          {(board && solution) && <Board board={board} solution={solution} removeItem={(col:number, row:number, itemKey:string) => onRemoveItem(board, col, row, itemKey) }/> }

      </div>
      <div className='w-[300px] bg-stone-400'>
      {<LivesDisplay errors={mistakes}/>}
      </div>
    </div>

  </div>
}
