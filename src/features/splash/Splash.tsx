import React from 'react';

type splashProps = {
  continueHandler: () => void,
  isReady: boolean
}
export function Splash({continueHandler, isReady}: splashProps) {

  return (
    <div>
      <h1>The splash</h1>
      {isReady && <button onClick={() => continueHandler()}>Start</button>}
    </div>
  );
}
