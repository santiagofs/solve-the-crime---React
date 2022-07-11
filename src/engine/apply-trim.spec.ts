import { Rule } from "../classes";
import applyTrim from "./apply-trim";
import { board_3x3_0 } from './mock/boards'

describe('engine - apply trim', () => {

  it('applies trim', () => {
    const rule:Rule = {
      distance: {cols: 1, rows: 2},
      distanceMask: true,
      a: 'thor',
      b: 'walter'
    }
    let board = applyTrim(board_3x3_0, rule)
    expect(board === board_3x3_0).toBe(false)

    expect(board).toEqual([
      [['thor'], ['thor'], []],
      [['thor'], ['thor', 'walter'], ['walter']],
      [[], ['walter'], ['walter']]
    ])


    rule.distance.rows = -2
    board = applyTrim(board_3x3_0, rule)
    expect(board === board_3x3_0).toBe(false)

    expect(board).toEqual([
      [[], ['walter'], ['walter']],
      [['thor'], ['thor', 'walter'], ['walter']],
      [['thor'], ['thor'], []]
    ])

  })

  it('tests with odd number of items', () => {
    let board = [
      [['thor', 'walter', 'batman'], ['thor', 'walter', 'batman'], ['thor', 'walter', 'batman']],
      [['thor', 'walter', 'batman'], ['thor', 'walter', 'batman'], ['thor', 'walter', 'batman']]
    ]
    let rule:Rule = {a: 'thor', b: 'walter', distance: {cols: 1, rows: 1}, distanceMask:true}
    let test = applyTrim(board, rule)
    expect(test).toEqual([
      [['thor', 'batman'], ['thor', 'batman'], ['batman']],
      [['batman'], ['walter', 'batman'], ['walter', 'batman']]
    ])

  })
})