import { createSlice } from "@reduxjs/toolkit";

type ViewsState = {
  app: 'splash' | 'main',
  main: 'map' | 'scenario'
}

const initialState:ViewsState = {
  app: 'splash',
  main: 'map'
}

const viewsSlice = createSlice({
  name: 'views',
  initialState,
  reducers: {
    setAppView(state, action) {
      state.app = action.payload
    },
    setMainView(state, action) {
      state.main = action.payload
    }
  }
})

export const viewsActions = viewsSlice.actions

export default viewsSlice