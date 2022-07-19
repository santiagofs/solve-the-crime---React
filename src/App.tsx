import React, { useState } from 'react';
import { Splash } from './features/splash/Splash';
import { Main } from './features/main/Main'


function App() {
  const [showGame, setShowGame] = useState(false)
  console.log('the app')
  return (
    <div className="App">
      { showGame ? <Main backHandler={() => setShowGame(false)} /> : <Splash  continueHandler={() => setShowGame(true)} isReady={true} />}
    </div>
  );
}

export default App;
