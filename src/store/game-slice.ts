import { createSlice } from "@reduxjs/toolkit";
import { Level } from '../engine/types'
import gameConfig from "../config";

export type GameState = {
  levels: {id:number, solved:boolean, elapsedTime: number}[]
  level:Level|null, errors:number, startTime:number, endTime:number, elapsedTime:number
}

const initialState:GameState = {
  levels: gameConfig.levels.map((level, ndx) => ({id: ndx + 1, solved:false, elapsedTime: 0})),
  level: null, errors: 0, startTime: 0, endTime: 0, elapsedTime: 0}

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {}
})



export default gameSlice