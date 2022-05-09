import React, {useState} from 'react';
import { Game } from '../../classes';

import { Map } from '../map/Map';
import { Scenario } from '../scenario/Scenario';

type ViewKey = 'map' | number

export function Main({game}: {game: Game}) {
  const [viewKey, setViewKey] = useState<ViewKey>('map')
  console.log('the main <<<<<')
  return (
    <div>
      <h1>The Main</h1>

      { viewKey === 'map' ? <Map game={game} levelHandler={(ndx: number) => setViewKey(ndx)} /> : <Scenario levelId={viewKey} game={game} backHandler={() =>  setViewKey('map')} /> }

      {JSON.stringify(game)}
    </div>
  );
}
