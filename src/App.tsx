import React, { useState, useEffect} from 'react';
import { Splash } from './features/splash/Splash';
import { Main } from './features/main/Main'

import './App.css';
import { Game } from './classes'


function App() {
  const [game, setGame] = useState<Game>()
  const [isReady, setIsReady] = useState(false)
  const [showGame, setShowGame] = useState(false)


  useEffect(() => {
    async function getGame() {
      setGame(await Game.get())
      setIsReady(true)
    }
    getGame()
  }, [])

  return (
    <div className="App">
      {game && showGame ? <Main game={game} /> : <Splash  continueHandler={() => setShowGame(true)} isReady={isReady} />}
    </div>
  );
}

export default App;
