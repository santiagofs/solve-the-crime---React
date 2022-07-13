import { useState } from 'react'
import { BiFullscreen, BiExitFullscreen} from 'react-icons/bi'

type FullScreenButtonProps = {
  onClick?:Function
}
export function  FullScreenButton({onClick}:FullScreenButtonProps)  {
  const [isFull, setIsFull] = useState(false)

  const handleClick = () => {
    const status = !isFull
    status ? document.documentElement.requestFullscreen() : document.exitFullscreen()
    setIsFull(status)
    if(onClick) onClick(status)
  }
  return <button onClick={handleClick} className="w-10 text-white aspect-square p-2" title='Full Screen Toggle'>
    {isFull ? <BiExitFullscreen className='w-full h-full' /> : <BiFullscreen className='w-full h-full' /> }
  </button>
}

