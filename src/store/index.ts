import { configureStore } from "@reduxjs/toolkit"

import gameSlice from "./game-slice"
import viewsSlice from './views-slice'

const store = configureStore({
  reducer : {
    game: gameSlice.reducer,
    views: viewsSlice.reducer
  }
})


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store