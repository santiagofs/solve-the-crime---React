import { BsFillHeartFill } from 'react-icons/bs'
export function LivesDisplay({totalLives = 3, errors = 0}:{totalLives?:number, errors?:number}) {
  const hearts = []

  for(let i = 0; i < totalLives; i++) {
    const color = i < errors ? 'text-stone-200' : 'text-orange-700'
    hearts.push(<BsFillHeartFill width={'50px'} className={'w-6 h-6 mx-2 ' + color}/>)
  }
  return <div className='flex p-2 bg-white mr-4 w-full justify-center'>
    {hearts}
  </div>
}

export default LivesDisplay