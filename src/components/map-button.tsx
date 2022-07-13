import { BiMapAlt } from 'react-icons/bi'

type MapButtonProps = {
  onClick:React.MouseEventHandler
}
export function  MapButton({onClick}:MapButtonProps)  {
  return <button onClick={onClick} className="w-10 text-white aspect-square p-2" title='Exit Game'>
    <BiMapAlt className='w-full h-full' />
  </button>
}

