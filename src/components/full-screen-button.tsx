import { useState } from 'react'
import { BsFullscreen, BsFullscreenExit} from 'react-icons/bs'

type FullScreenButtonProps = {
  onClick?:Function
}
export function  FullScreenButton({onClick}:FullScreenButtonProps)  {
  const [isFull, setIsFull] = useState(false)

  const handleClick = () => {
    const status = !isFull
    status ? document.documentElement.requestFullscreen() : document.exitFullscreen()
  }
  return <button>
    hola
  </button>
}

