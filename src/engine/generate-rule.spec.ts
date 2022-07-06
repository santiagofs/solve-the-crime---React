import generateRule from "./generate-rule"
import { CoordMap } from "./types"

describe('engine - generate rule', () => {
  it('generates a rule 2x2', () => {
    const pair = ['thor', 'walter']
    const board = [
      [['thor', 'walter'], ['thor', 'walter']],
      [['thor', 'walter'], ['thor', 'walter']]
    ]
    let solution:CoordMap = {
      thor: [{col:0, row: 0}],
      walter: [{col:1, row: 1}]
    }
    let rule = generateRule(board, solution, pair)
    expect(rule.a).not.toEqual(rule.b)
    expect(rule.distance).toEqual({cols:1, rows: 1})


    solution = {
      thor: [{col:1, row: 1}],
      walter: [{col:0, row: 0}]
    }
    rule = generateRule(board, solution, pair)
    expect(rule.a).not.toEqual(rule.b)
    expect(rule.distance).toEqual({cols:1, rows: 1})


    solution = {
      thor: [{col:0, row: 1}],
      walter: [{col:1, row: 0}]
    }
    rule = generateRule(board, solution, pair)
    expect(rule.a).not.toEqual(rule.b)
    expect(rule.distance).toEqual({cols:1, rows: -1})

  })

  it('generates a rule 3x2', () => {
    const board = [
      [['thor', 'walter', 'batman'], ['thor', 'walter', 'batman'], ['thor', 'walter', 'batman']],
      [['thor', 'walter', 'batman'], ['thor', 'walter', 'batman'], ['thor', 'walter', 'batman']]
    ]
    let solution:CoordMap = {
      thor: [{col:0, row: 0}],
      batman: [{col:1, row: 0}],
      walter: [{col:2, row: 1}]
    }
    let pair = ['thor', 'walter']
    let rule = generateRule(board, solution, pair)
    expect(rule.distance).toEqual({cols:2, rows: 1})

    pair = ['walter', 'batman']
    rule = generateRule(board, solution, pair)
    expect(rule.distance).toEqual({cols:1, rows: 1})

    pair = ['thor', 'batman']
    rule = generateRule(board, solution, pair)
    expect(rule.distance).toEqual({cols:1, rows: 0})
  })
})