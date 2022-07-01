import { Board } from "../types";
import createBoard from "./create-board";
export const boardFull0 = createBoard(2,2)
export const boardFull1 = createBoard(3,2)
export const boardFull2 = createBoard(3,3)


export const board0:Board = [
[['thor', 'walter'], ['thor', 'walter']],
[['thor', 'walter'], ['thor', 'walter']]
]
export const board1:Board = [
[[], []],
[['thor', 'walter'], ['thor',]]
]
export const board2:Board = [
[['thor'], []],
[[], ['walter']]
]
export const board3:Board = [
[['thor'], ['thor']],
[['walter'], ['walter']]
]
export const board4:Board = [
[['walter'], ['walter']],
[['thor'], ['thor']]
]

export const board5:Board = [
  [[], ['walter', 'thor']],
  [[], ['walter', 'thor']],
]

export const board_3x3_0 = [
  [['thor', 'walter'], ['thor', 'walter'], ['thor', 'walter']],
  [['thor', 'walter'], ['thor', 'walter'], ['thor', 'walter']],
  [['thor', 'walter'], ['thor', 'walter'], ['thor', 'walter']]
]