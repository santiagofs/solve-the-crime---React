import React from 'react';
import { Game } from '../../classes';

export function Scenario({levelId, game, backHandler}: {levelId: number, game:Game, backHandler: () => void}) {
  const level = game.createLevel(levelId)

  return (
    <div>
      <h1>The Scenario <button onClick={() => backHandler()}>Back</button></h1>
      {JSON.stringify(game)}
    </div>
  );
}
