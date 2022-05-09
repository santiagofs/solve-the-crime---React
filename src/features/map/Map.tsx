import React from 'react';
import { Game } from '../../classes';

export function Map({game, levelHandler}: {game: Game, levelHandler: (levelId:number) => void}) {

  return (
    <div>
      <h1>The Map</h1>
      { Object.keys(game.levels).map(ndx => <button key={ndx} onClick={() => levelHandler(Number(ndx))}>Level: {ndx}</button>) }
    </div>
  );
}
