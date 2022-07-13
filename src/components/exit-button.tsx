import { BiExit } from 'react-icons/bi'
type ExitButtonProps = {
  onClick:React.MouseEventHandler
}
export function  ExitButton({onClick}:ExitButtonProps)  {
  return <button onClick={onClick} className="w-10 text-white aspect-square p-2" title='Exit Game'>
    <BiExit className='w-full h-full' />
  </button>
}