import { Board } from "../types";
import createBoard from "./create-board";
export const boardFull0 = createBoard(2,2)
export const boardFull1 = createBoard(3,2)
export const boardFull2 = createBoard(3,3)


export const board0:Board = [
  [['thor', 'batman', 'flash', 'jason', 'hannibal', 'walter'], ['thor', 'batman', 'flash', 'jason', 'hannibal', 'walter']],
  [['thor', 'batman', 'flash', 'jason', 'hannibal', 'walter'], ['thor', 'batman', 'flash', 'jason', 'hannibal', 'walter']]
]
export const board1:Board = [
  [['flash', 'jason', 'hannibal'], ['batman', 'flash', 'jason', 'hannibal']],
  [['thor', 'flash', 'jason', 'hannibal', 'walter'], ['batman', 'thor', 'flash', 'jason', 'hannibal']]
]
export const board2:Board = [
  [['thor', 'batman', 'flash', 'jason', 'hannibal'], ['batman', 'flash', 'jason', 'hannibal']],
  [['batman', 'flash', 'jason', 'hannibal'], ['batman', 'flash', 'jason', 'hannibal', 'walter']]
]
export const board3:Board = [
  [['thor', 'batman', 'flash', 'jason', 'hannibal'], ['thor', 'batman', 'flash', 'jason', 'hannibal']],
  [['batman', 'flash', 'jason', 'hannibal', 'walter'], ['batman', 'flash', 'jason', 'hannibal', 'walter']]
]
export const board4:Board = [
  [['batman', 'flash', 'jason', 'hannibal', 'walter'], ['batman', 'flash', 'jason', 'hannibal', 'walter']],
  [['thor', 'batman', 'flash', 'jason', 'hannibal'], ['thor', 'batman', 'flash', 'jason', 'hannibal']]
]