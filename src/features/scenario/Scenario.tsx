import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


import { RootState } from '../../store';
import { gameActions } from '../../store/game-slice';

import LivesDisplay from '../../components/lives-display';
import TextButton from '../../components/text-button';

import Board from './Board';
import Rules from './Rules'
// import { Board } from '../board/Board';
// import Rules from '../rules/Rules';

export function Scenario({levelId, backHandler}: {levelId: number, backHandler: () => void}) {
  const dispatch = useDispatch()
  const mistakes = useSelector((state:RootState) => state.game.mistakes)
  const solution = useSelector((state:RootState) => state.game.level?.solution)
  const board = useSelector((state:RootState) => state.game.level?.board)
  const showMistakeDialog = useSelector((state:RootState) => state.game.showMistakeDialog)
  const gameStatus = useSelector((state:RootState) => state.game.status)

  // const [level, setLevel] = useState<Level|null>(null)
  // const [board, setBoard] = useState<BoardType|null>(null)
  // const [rules, setRules] = useState<Rule[]|null>(null)
  // const [solution, setSolution] = useState<CoordMap|null>(null)

  // const [grid, setGrid] = useState<Grid<string[]>|null>(null)

  console.log('render scenario')
  useEffect(() => {
    dispatch(gameActions.createLevel(levelId))
    // const level:Level = createLevel(gameConfig.levels[levelId - 1])
    // setLevel(level)
    // setBoard(level.board)
    // setRules(level.rules)
    // setSolution(level.solution)

  }, [dispatch, levelId])

  useEffect(() => {
    if(mistakes === 0 || mistakes > 2) return
    let timeout: number
    dispatch(gameActions.showMistakeDialog(true))
    timeout = window.setTimeout(() => dispatch(gameActions.showMistakeDialog(false)), 1000)
    return () => clearTimeout(timeout)
  }, [dispatch, mistakes])




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

          {(board && solution) && <Board board={board} solution={solution}/> }

      </div>
      <div className='w-[300px] bg-stone-400'>
        {<LivesDisplay errors={mistakes}/>}
        <Rules />
      </div>

      <dialog className="p-10 border-solid border-red-500 border-2 rounded-md text-center font-bold shadow-md" open={showMistakeDialog}>
        <h1 className='text-red-600 text-2xl'>Oh No!!!!! <br/> that wasn't right</h1>
      </dialog>

      <dialog className="p-10 border-solid border-red-500 border-2 rounded-md text-center font-bold shadow-md" open={gameStatus === 'loose'}>
        <h1 className='text-red-600 text-2xl'>You Loose!!</h1>
        <div><TextButton action={() => {}}>Go To Map</TextButton> <TextButton className='bg-amber-600 text-white font-bold' action={() => dispatch(gameActions.createLevel(levelId))}>Restart</TextButton></div>
      </dialog>

      <dialog className="p-10 border-solid border-amber-500 border-2 rounded-md text-center font-bold shadow-md" open={gameStatus === 'win'}>
        <h1 className='text-red-600 text-2xl'>Congratulations! You Win!!</h1>
        <div><TextButton action={() => {}}>Go To Map</TextButton> <TextButton className='bg-amber-600 text-white font-bold' action={() => dispatch(gameActions.createLevel(levelId))}>Restart</TextButton></div>
      </dialog>
    </div>

  </div>
}
