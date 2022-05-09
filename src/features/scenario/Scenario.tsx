import React, { useEffect, useState } from 'react';
import { Game, Level } from '../../classes';
import collection from '../../config/collections/heroes';
import { Board } from '../board/Board';

export function Scenario({levelId, game, backHandler}: {levelId: number, game:Game, backHandler: () => void}) {
  const [level, setLevel] = useState<Level|null>(null)
  console.log('render')
  useEffect(() => {
    console.log('test 2')
    setLevel(game.createLevel(levelId))
  }, [])
  

  return (
    <div>
      <h1>The Scenario <button onClick={() => backHandler()}>Back</button></h1>
      <div>Level: {JSON.stringify(level)}</div>
      {(level !== null) && <Board grid={level!.solution.grid} collections={level!.collections}></Board> }
      
      {JSON.stringify(game)}
    </div>
  );
}
