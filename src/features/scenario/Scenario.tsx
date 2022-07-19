import React, { useEffect, useState } from 'react';

import gameConfig from '../../config';
import createLevel from '../../engine/create-level';
import { Level } from '../../engine/types';
import Board from './Board';
// import { Board } from '../board/Board';
// import Rules from '../rules/Rules';

export function Scenario({levelId, backHandler}: {levelId: number, backHandler: () => void}) {

  const [level, setLevel] = useState<Level|null>(null)
  // const [grid, setGrid] = useState<Grid<string[]>|null>(null)

  console.log('render scenario')
  useEffect(() => {
    console.log('test', levelId)
    console.log(gameConfig.levels[levelId - 1])
    const level:Level = createLevel(gameConfig.levels[levelId - 1])
    setLevel(level)
    // setGrid(level.grid)
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
  return <div>
    <div className='flex h-[calc(100vh-50px)]'>
      <div className='flex-grow flex h-full justify-center p-10'>

          {level && <Board board={level.board} /> }

      </div>
      <div className='w-[300px] bg-stone-400'></div>
    </div>

  </div>
}
