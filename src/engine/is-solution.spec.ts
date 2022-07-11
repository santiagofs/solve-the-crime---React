import isSolution from "./is-solution"
import { Board, CoordMap, Rule } from "./types"

describe('engine - is solution', () => {
  it('checks if a set of rules generates a solution', ()=> {
    let board:Board = [
      [['thor', 'walter', 'batman'], ['thor', 'walter', 'batman'], ['thor', 'walter', 'batman']],
      [['thor', 'walter', 'batman'], ['thor', 'walter', 'batman'], ['thor', 'walter', 'batman']]
    ]

    let rules:Rule[]= [
      {a: 'thor', b: 'walter', distance: {cols: 1, rows: 1}, distanceMask:true},
      {a: 'thor', b: 'batman', distance: {cols: 2, rows: 0}, distanceMask:true},
      // {a: 'batman', b: 'walter', distance: {cols: 1, rows: 1}, distanceMask: true}
    ]

    let solution:CoordMap = {
      thor: [{col: 0, row: 0}],
      batman: [{col: 1, row: 0}],
      walter: [{col: 2, row: 1}]
    }
    expect(isSolution(board, rules, solution)).toBe(false)

    rules.push({a: 'batman', b: 'walter', distance: {cols: 1, rows: 1}, distanceMask: true})
    expect(isSolution(board, rules, solution)).toBe(true)

  })
})