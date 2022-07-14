import { random } from 'lodash';
import React, { useEffect, useState } from 'react';

import * as heroIcons from '../../assets/icons/heroes'
import * as villainIcons from '../../assets/icons/villains'

import SplashIcon from './SplashIcon'
type splashProps = {
  continueHandler: () => void,
  isReady: boolean
}
export function Splash({continueHandler, isReady}: splashProps) {
  // 1-12, 13-24, 25-36, 37-48, 49-60, 61-72
  const [highlighted, setHighlighted] = useState([1, 23, 33, 38, 57, 66]) as [number[], Function]

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


  const icons = [
    {src: heroIcons.batman, alt: 'batman'},
    {src: villainIcons.walter, alt: 'walter'},
    {src: heroIcons.birdman, alt: 'birdman'},
    {src: villainIcons.alien1, alt: 'alien1'},
    {src: heroIcons.flash, alt: 'flash'},
    {src: villainIcons.flyman, alt: 'm'},
    {src: heroIcons.hulk, alt: 'hulk'},
    {src: villainIcons.guason, alt: 'guason'},
    {src: heroIcons.leono, alt: 'leono'},
    {src: villainIcons.hannibal, alt: 'hannibal'},
    {src: heroIcons.robocop, alt: 'robocop'},
    {src: villainIcons.alien2, alt: 'alien2'},

    {src: heroIcons.thor, alt: 'thor'},
    {src: villainIcons.prisoner, alt: 'prisoner'},
    {src: heroIcons.superman, alt: 'superman'},
    {src: villainIcons.psycho1, alt: 'psycho1'},
    {src: heroIcons.batman, alt: 'batman'},
    {src: villainIcons.psycho2, alt: 'psycho2'},
    {src: heroIcons.batman, alt: 'batman'},
    {src: villainIcons.supervillian, alt: 'supervillian'},
    {src: heroIcons.superhero6, alt: 'batman'},
    {src: villainIcons.mib2, alt: 'mib2'},
    {src: heroIcons.batman, alt: 'batman'},
    {src: villainIcons.mib3, alt: 'mib3'},


    {src: heroIcons.flash, alt: 'flash'},
    {src: villainIcons.flyman, alt: 'm'},
    {src: heroIcons.hulk, alt: 'hulk'},
    {src: villainIcons.guason, alt: 'guason'},
    {src: heroIcons.leono, alt: 'leono'},
    {src: villainIcons.hannibal, alt: 'hannibal'},
    {src: heroIcons.robocop, alt: 'robocop'},
    {src: villainIcons.alien2, alt: 'alien2'},

    {src: heroIcons.thor, alt: 'thor'},
    {src: villainIcons.prisoner, alt: 'prisoner'},
    {src: heroIcons.superman, alt: 'superman'},
    {src: villainIcons.psycho1, alt: 'psycho1'},
    {src: heroIcons.batman, alt: 'batman'},
    {src: villainIcons.psycho2, alt: 'psycho2'},
    {src: heroIcons.batman, alt: 'batman'},
    {src: villainIcons.supervillian, alt: 'supervillian'},
    {src: heroIcons.superhero6, alt: 'batman'},
    {src: villainIcons.mib2, alt: 'mib2'},
    {src: heroIcons.batman, alt: 'batman'},
    {src: villainIcons.mib3, alt: 'mib3'},
    {src: heroIcons.batman, alt: 'batman'},
    {src: villainIcons.walter, alt: 'walter'},
    {src: heroIcons.birdman, alt: 'birdman'},
    {src: villainIcons.alien1, alt: 'alien1'},

    {src: heroIcons.leono, alt: 'leono'},
    {src: villainIcons.hannibal, alt: 'hannibal'},
    {src: heroIcons.robocop, alt: 'robocop'},
    {src: villainIcons.alien2, alt: 'alien2'},

    {src: heroIcons.thor, alt: 'thor'},
    {src: villainIcons.prisoner, alt: 'prisoner'},
    {src: heroIcons.superman, alt: 'superman'},
    {src: villainIcons.psycho1, alt: 'psycho1'},
    {src: heroIcons.batman, alt: 'batman'},
    {src: villainIcons.psycho2, alt: 'psycho2'},
    {src: heroIcons.batman, alt: 'batman'},
    {src: villainIcons.supervillian, alt: 'supervillian'},
    {src: heroIcons.superhero6, alt: 'batman'},
    {src: villainIcons.mib2, alt: 'mib2'},
    {src: heroIcons.batman, alt: 'batman'},
    {src: villainIcons.mib3, alt: 'mib3'},
    {src: heroIcons.batman, alt: 'batman'},
    {src: villainIcons.walter, alt: 'walter'},
    {src: heroIcons.birdman, alt: 'birdman'},
    {src: villainIcons.alien1, alt: 'alien1'},
    {src: heroIcons.flash, alt: 'flash'},
    {src: villainIcons.flyman, alt: 'm'},
    {src: heroIcons.hulk, alt: 'hulk'},
    {src: villainIcons.guason, alt: 'guason'},
  ]

  return (
    <div className='flex h-screen'>
      <div className='absolute flex flex-wrap w-full h-screen bg-stone-100 z-0 p-10'>

        {icons.map( (icon, ndx)=> {
          const highlight:boolean = highlighted.indexOf(ndx) !== -1
          return <SplashIcon src={icon.src} alt={icon.alt} highlight={highlight} key={ndx} />
        })}




      </div>
      <div className='m-auto z-10 text-center'>
        <h1 className='text-white text-[120px] leading-none bg-opacity-90 bg-amber-500 px-40 py-10 rounded-lg shadow-md'>Hero Detective</h1>
        {isReady && <button className="text-2xl mt-10 bg-orange-500 text-white font-bold rounded-lg px-10 py-2 shadow-md" onClick={() => continueHandler()}>start</button>}
      </div>

    </div>
  );
}
