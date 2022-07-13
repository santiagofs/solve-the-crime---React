import React, {useState} from 'react';
import { Game } from '../../classes';

import { Map } from '../map/Map';
import { Scenario } from '../scenario/Scenario';

// import {FullScreenButton} from '../../components/full-screen-button'

type ViewKey = 'map' | number

export function Main({game}: {game: Game}) {
  const [viewKey, setViewKey] = useState<ViewKey>('map')

  return (
    <div>
      <header className='bg-amber-500 flex justify-between'>
        <h1 className='text-white text-2xl'>Hero Detective</h1>
        <div>
          {/* <FullScreenButton /> */}
        </div>
      </header>

      { viewKey === 'map' ? <Map game={game} levelHandler={(ndx: number) => setViewKey(ndx)} /> : <Scenario levelId={viewKey} game={game} backHandler={() =>  setViewKey('map')} /> }

      {/* {JSON.stringify(game)} */}
    </div>
  );
}
