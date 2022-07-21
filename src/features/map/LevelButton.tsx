import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store"
import { gameActions } from '../../store/game-slice'
import { viewsActions } from '../../store/views-slice'

type LevelButtonProps = {level: {id:number, solved:boolean, elapsedTime: number}}

const LevelButton = ({level}:LevelButtonProps) => {
  const dispatch = useDispatch()
  const nextLevel = useSelector((state:RootState) => state.game.nextLevel)
  const enabled = level.solved || level.id === nextLevel

  const clickHandler = () => {
    dispatch(gameActions.createLevel(level.id))
    dispatch(viewsActions.setMainView('scenario'))
  }

  return <button className='w-1/4 h-1/3 flex flex-col bg-amber-500 items-center justify-center rounded-lg disabled:bg-stone-400 enabled:hover:opacity-60 transition-all '
    key={level.id} onClick={clickHandler} disabled={!enabled}>
    <div className='text-4xl text-white font-bold'>{level.id}</div>
  {/* <div className='text-3xl text-white'>00 : 00 : 00</div> */}
</button>
}

export default LevelButton