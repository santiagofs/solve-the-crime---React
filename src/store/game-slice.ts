import { createSlice } from "@reduxjs/toolkit";
import { Level } from '../engine/types'
import gameConfig from "../config";
import createLevel from "../engine/create-level";
import removeItemFromBoard from "../engine/remove-item-from-board";
import { isEqual } from "lodash";
import boardAsCoordinatesMap from "../engine/board-as-coordinates-map";

export type GameState = {
  levels: {id:number, solved:boolean, elapsedTime: number}[]
  level:Level|null, mistakes:number, startTime:number, endTime:number, elapsedTime:number,
  showMistakeDialog:boolean,
  status: 'progress' | 'win' | 'loose'
}

const initialState:GameState = {
  levels: gameConfig.levels.map((level, ndx) => ({id: ndx + 1, solved:false, elapsedTime: 0})),
  level: null, mistakes: 0, startTime: 0, endTime: 0, elapsedTime: 0,
  showMistakeDialog: false,
  status: 'progress'
}

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    addError(state) {
      state.mistakes ++
      if(state.mistakes === 3) state.status = 'loose'
    },
    createLevel(state, action) {
      const config = gameConfig.levels.filter(level => level.number === action.payload)[0]
      state.level = createLevel(config)
      state.mistakes = 0
      state.status = 'progress'
    },
    removeFromBoard(state, action) {
      const {col, row, itemKey} = action.payload

      if(!state.level?.board) return
      state.level.board = removeItemFromBoard(state.level.board, col, row, itemKey)
      if(isEqual(boardAsCoordinatesMap(state.level.board), state.level.solution)) state.status = 'win'

      // isEqual(boardAsCoordinatesMap(tmp), solution)
    },
    showMistakeDialog(state, action) {
      if(state.mistakes === 3) return // already loose
      state.showMistakeDialog = action.payload
    }
  }
})

export const gameActions = gameSlice.actions

export default gameSlice