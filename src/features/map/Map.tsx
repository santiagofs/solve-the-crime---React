import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';


export function Map({levelHandler}: {levelHandler: (levelId:number) => void}) {
  const levels = useSelector((state:RootState) => state.game.levels)

  const lastSolved = 0

  return (
    <div className='flex flex-wrap p-20 gap-20 h-[calc(100vh-50px)]'>

      { levels.map((level, ndx) => {
        const levelNumber = level.id
        const enabled = (ndx <= lastSolved)

        return (
          <button className='w-1/4 h-1/3 flex flex-col bg-amber-500 items-center justify-center rounded-lg disabled:bg-stone-400 enabled:hover:opacity-60 transition-all ' key={level.id} onClick={() => levelHandler(level.id)} disabled={!enabled}>
            <div className='text-4xl text-white font-bold'>{levelNumber}</div>
            <div className='text-3xl text-white'>00 : 00 : 00</div>
            {enabled ? 'si' : 'no'}
          </button>
        )
      })}
    </div>
  );
}
