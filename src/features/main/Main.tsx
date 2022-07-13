import React, {useState} from 'react';
import { Game } from '../../classes';

import { Map } from '../map/Map';
import { Scenario } from '../scenario/Scenario';

import { FullScreenButton } from '../../components/full-screen-button'
import { ExitButton } from '../../components/exit-button'
import { MapButton } from '../../components/map-button'

type ViewKey = 'map' | number

export function Main({game, backHandler}: {game: Game, backHandler: React.MouseEventHandler}) {
  const [viewKey, setViewKey] = useState<ViewKey>('map')


  return (
    <div>
      <header className='bg-amber-500 flex justify-between items-center py-2 px-4'>
        <h1 className='text-white text-2xl'>Hero Detective</h1>
        <div>
          { viewKey !== 'map' ? <MapButton onClick={() => setViewKey('map')} /> : null }
          <FullScreenButton />
          <ExitButton onClick={backHandler} />
        </div>
      </header>

      { viewKey === 'map' ? <Map game={game} levelHandler={(ndx: number) => setViewKey(ndx)} /> : <Scenario levelId={viewKey} game={game} backHandler={() =>  setViewKey('map')} /> }

      {/* {JSON.stringify(game)} */}
    </div>
  );
}
