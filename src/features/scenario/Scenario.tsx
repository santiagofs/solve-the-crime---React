import React, { useEffect, useState } from 'react';
import { Game, Level, Grid, Rule } from '../../classes';
import { Board } from '../board/Board';
import Rules from '../rules/Rules';

export function Scenario({levelId, game, backHandler}: {levelId: number, game:Game, backHandler: () => void}) {
  const [level, setLevel] = useState<Level|null>(null)
  const [grid, setGrid] = useState<Grid<string[]>|null>(null)

  console.log('render scenario')
  useEffect(() => {
    console.log('test')
    const level = game.createLevel(levelId)
    setLevel(level)
    setGrid(level.grid)
  }, [levelId, game])

  function removeFromGrid(key:string) {
    if(grid === null) return
    const [row, col, group, item] = key.split('.')

    const ndx = grid[Number(row)][Number(col)]?.indexOf(group + '.' +item)

    console.log(row, col, item, ndx)
    if (ndx === -1 || ndx === undefined) return

    grid[Number(row)][Number(col)]?.splice(ndx, 1)
    setGrid([...grid!])
  }

  function solveHandler() {
    if(level === null) return
    level.solve()
    setGrid([...level.grid])
  }
  function applyRule(rule:Rule) {
    if(level === null) return
    console.log(level.findMinMax(rule.a, rule.b, level.grid))
    level.applyRule(rule, level.grid)
    setGrid([...level.grid])
  }


  return (
    <div>
      <h1>The Scenario <button onClick={() => backHandler()}>Back</button> <button onClick={() => solveHandler()}>Solve</button> </h1>
      <div className='flex gap-10'>
      {(level !== null) && <Board grid={level!.solution.grid} collections={level!.collections}></Board> }
      {(level !== null) && <Board grid={grid!} collections={level!.collections} clickHandler={removeFromGrid}></Board> }

      {(level !== null) && <Rules rules={level.rules} clickHandler={applyRule} /> }
      </div>
      {/* {JSON.stringify(game)} */}
    </div>
  );
}
