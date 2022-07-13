import { createSlice } from "@reduxjs/toolkit";
import loadConfigAsync from "../engine/load-config-async";
import { Game } from "../engine/types"

const initialState: Game = {
  collections: {},
};

export const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    load: (state) => {
      state.collections = (await loadConfigAsync).
    },
  }
  // The `reducers` field lets us define reducers and generate associated actions

})