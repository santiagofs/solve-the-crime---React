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
  currentLevel: number,
  nextLevel: number,
  showMistakeDialog:boolean,
  status: 'progress' | 'win' | 'loose'
}

const initialState:GameState = {
  levels: gameConfig.levels.map((level, ndx) => ({id: ndx + 1, solved:false, elapsedTime: 0})),
  level: null, mistakes: 0, startTime: 0, endTime: 0, elapsedTime: 0,
  currentLevel: -1,
  nextLevel: 1,
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
    createLevel(state, {payload}: {payload:number}) {
      state.currentLevel = payload
      const config = gameConfig.levels.find(level => level.number === payload)!
      state.level = createLevel(config, gameConfig.collectionKeys)
      state.mistakes = 0
      state.status = 'progress'
    },
    removeFromBoard(state, action) {
      const {col, row, itemKey} = action.payload

      if(!state.level?.board) return
      state.level.board = removeItemFromBoard(state.level.board, col, row, itemKey)

      if(isEqual(boardAsCoordinatesMap(state.level.board), state.level.solution)) {
        state.status = 'win'
        const level = state.levels.find(l => l.id = state.currentLevel)!
        level.solved = true
        state.nextLevel = state.levels.find(l => !l.solved)!.id
      }

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