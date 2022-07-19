import React from 'react';
import gameConfig from '../../config';
import { useLocalStorage } from 'usehooks-ts';

export function Map({levelHandler}: {levelHandler: (levelId:number) => void}) {
  const [solvedLevels] = useLocalStorage<number[]>('levels', [])
  const lastSolved = solvedLevels[solvedLevels.length-1]
  const nextLevel = (lastSolved || 0) + 1

  return (
    <div className='grid grid-cols-4 p-20 gap-20 h-[calc(100vh-50px)]'>

      { Object.keys(gameConfig.levels).map(ndx => {
        const levelNumber = Number(ndx) + 1
        const enabled = solvedLevels.indexOf(levelNumber) !== -1 || nextLevel === levelNumber

        return (
          <button className='flex bg-amber-500 items-center justify-center rounded-lg disabled:bg-stone-400 enabled:hover:opacity-60 transition-all ' key={ndx} onClick={() => levelHandler(levelNumber)} disabled={!enabled}>
            <span className='text-4xl text-white font-bold'>{levelNumber}</span>
          </button>
        )
      })}
    </div>
  );
}
