import React from 'react';
import { Splash } from './features/splash/Splash';
import { Main } from './features/main/Main'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';
import { viewsActions } from './store/views-slice';

function App() {
  const dispatch = useDispatch()
  const appView = useSelector((state:RootState) => state.views.app)

  console.log('the app')
  return (
    <div className="App">
      { appView === 'main' ? <Main /> : <Splash  continueHandler={() => dispatch(viewsActions.setAppView('main'))} />}
    </div>
  );
}

export default App;
