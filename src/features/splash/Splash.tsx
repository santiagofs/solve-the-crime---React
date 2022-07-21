import { random, sample } from 'lodash';
import React, { useEffect, useState } from 'react';

import gameConfig from '../../config';

import SplashIcon from './SplashIcon'
type splashProps = {
  continueHandler: () => void,
}
type IconKey = {
  collection:string, item:string
}



const heroIconKeys = Object.keys(gameConfig.collections.heroes)
const villainIconKeys = Object.keys(gameConfig.collections.villains)
const iconKeys:IconKey[] = []

for(let i=0; i < 36; i++) {
  iconKeys.push({
    collection: 'heroes',
    item: sample(heroIconKeys) as string
  })
  iconKeys.push({
    collection: 'villains',
    item: sample(villainIconKeys) as string
  })
}


export function Splash({continueHandler}: splashProps) {
  const [highlighted, setHighlighted] = useState([1, 23, 33, 38, 57, 66]) as [number[], Function]
  const [icons, setIcons] = useState<IconKey[]>([])


  useEffect(() => {
    let timeout: number

    const replace = random(0, 71)
    const remove = random(0, 5)
    const indexes:number[] = [...highlighted]
    indexes.splice(remove, 1, replace)

    timeout = window.setTimeout(() => setHighlighted(indexes), 200);

    return () => {
      clearTimeout(timeout);
    };
  }, [highlighted])

  useEffect(() => {
    const icons = []
    for(let i=0; i < 36; i++) {
      icons.push({
        collection: 'heroes',
        item: sample(heroIconKeys) as string
      })
      icons.push({
        collection: 'villains',
        item: sample(villainIconKeys) as string
      })
    }
    setIcons(icons)

  }, [])


  return (
    <div className='flex h-screen'>
      <div className='absolute flex flex-wrap w-full h-screen bg-stone-100 z-0 p-10'>

        { icons.map((key, ndx) => {
          const highlight:boolean = highlighted.indexOf(ndx) !== -1
          const item = gameConfig.collections[key.collection][key.item]
          return <SplashIcon src={item.icon} alt={item.name} highlight={highlight} key={ndx} />
        }) }



      </div>
      <div className='m-auto z-10 text-center'>
        <h1 className='text-white text-[120px] leading-none bg-opacity-90 bg-amber-500 px-40 py-10 rounded-lg shadow-md'>Hero Detective</h1>
        <button className="text-2xl mt-10 bg-orange-500 text-white font-bold rounded-lg px-10 py-2 shadow-md" onClick={() => continueHandler()}>start</button>
      </div>

    </div>
  );
}
