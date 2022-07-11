import solve from "./solve"
import { Board, Rule } from "./types"

describe('engine - solve', () => {
  it('attemps to solve a board', () => {
    let board:Board = [
      [['thor', 'walter'], ['thor', 'walter']],
      [['thor', 'walter'], ['thor', 'walter']]
    ]
    let rules:Rule[] = [
      {a: 'thor', b: 'walter', distance: {cols: 1, rows: 1}, distanceMask:true}
    ]
    let tmp:Board = solve(board, rules)
    expect(tmp).toEqual([
      [['thor'], []],
      [[], ['walter']]
    ])
  })
  it.only('attemps to solve a board 3x2', () => {
    let board:Board = [
      [['thor', 'walter', 'batman'], ['thor', 'walter', 'batman'], ['thor', 'walter', 'batman']],
      [['thor', 'walter', 'batman'], ['thor', 'walter', 'batman'], ['thor', 'walter', 'batman']]
    ]

    let rules:Rule[]= [
      {a: 'thor', b: 'walter', distance: {cols: 1, rows: 1}, distanceMask:true},
      {a: 'thor', b: 'batman', distance: {cols: 2, rows: 0}, distanceMask:true},
      {a: 'batman', b: 'walter', distance: {cols: 1, rows: 1}, distanceMask: true}
    ]

    //  [['thor', 'batman'], ['thor', 'walter', 'batman'], ['thor', 'walter', 'batman']],
    //   [['thor', 'walter', 'batman'], ['thor', 'walter', 'batman'], ['thor', 'walter', 'batman']]

     let tmp:Board = solve(board, rules)
     expect(tmp).toEqual([
      [['thor', ], ['batman'], []],
      [[], [], ['walter']]
    ])
  })
})