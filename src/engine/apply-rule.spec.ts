import applyRule from "./apply-rule"
import { board0, board2, board3, board4 } from "./mock/boards"
import { ruleExplicit0, ruleExplicit1, ruleExplicit2, ruleExplicit3 } from "./mock/rules"
import { Rule } from "./types"

describe('engine - apply rule', () => {
  it('apply rule', () => {
    let board = applyRule(board0, ruleExplicit0)
    expect(board).toEqual(board0)

    board = applyRule(board0, ruleExplicit1)
    expect(board).toEqual(board2)

    board = applyRule(board0, ruleExplicit2)
    expect(board).toEqual(board3)

    board = applyRule(board0, ruleExplicit3)
    expect(board).toEqual(board4)

  })

  it('applies different rules', () => {
    const solution = [
      [['thor'], [], ['walter']],
      [[], [], []],
      [[], [], ['batman', 'malito']],
    ]
    const full = [
      [['thor', 'batman', 'walter', 'malito'], ['thor', 'batman', 'walter', 'malito'], ['thor', 'batman', 'walter', 'malito']],
      [['thor', 'batman', 'walter', 'malito'], ['thor', 'batman', 'walter', 'malito'], ['thor', 'batman', 'walter', 'malito']],
      [['thor', 'batman', 'walter', 'malito'], ['thor', 'batman', 'walter', 'malito'], ['thor', 'batman', 'walter', 'malito']]
    ]
    const rule1:Rule = {
      a: 'thor',
      b: 'walter',
      distance: {cols: 2, rows: 0},
      distanceMask: true
    }
    let board1 = applyRule(full, rule1)
    expect(board1).toEqual([
      [['thor', 'batman', 'malito'], ['thor', 'batman', 'walter', 'malito'], ['batman', 'walter', 'malito']],
      [['thor', 'batman', 'malito'], ['thor', 'batman', 'walter', 'malito'], ['batman', 'walter', 'malito']],
      [['thor', 'batman', 'malito'], ['thor', 'batman', 'walter', 'malito'], ['batman', 'walter', 'malito']]
    ])

    const rule2:Rule = {
      a: 'batman',
      b: 'malito',
      distance: {cols: 0, rows: 0},
      distanceMask: false
    }
    let board2 = applyRule(board1, rule2)
    expect(board2).toEqual(board1)

    const rule3:Rule = {
      a: 'malito',
      b: 'walter',
      distance: {cols: 0, rows: -2},
      distanceMask: true
    }
    let board3 = applyRule(board2, rule3)
    expect(board3).toEqual([
      [['thor', 'batman'], ['thor', 'batman', 'walter'], ['batman', 'walter']],
      [['thor', 'batman'], ['thor', 'batman', 'walter', 'malito'], ['batman', 'walter', 'malito']],
      [['thor', 'batman'], ['thor', 'batman', 'malito'], ['batman', 'malito']]
    ])

    const rule4:Rule = {
      a: 'thor',
      b: 'batman',
      distance: {cols: 2, rows: 2},
      distanceMask: false
    }
    let board4 = applyRule(board3, rule4)
    expect(board4).toEqual([
      [['thor'], ['walter'], ['walter']],
      [[], ['walter', 'malito'], ['walter', 'malito']],
      [[], ['malito'], ['batman', 'malito']]
    ])

    let board5 = applyRule(board4, rule2)
    expect(board5).toEqual([
      [['thor',], ['walter'], ['walter']],
      [[],  ['walter'], ['walter']],
      [[], [], ['batman', 'malito']]
    ])

    let board6 = applyRule(board5, rule3)
    expect(board6).toEqual([
      [['thor',], [], ['walter']],
      [[],  [], ['walter']],
      [[], [], ['batman', 'malito']]
    ])

    let board7 = applyRule(board6, rule1)
    expect(board7).toEqual(solution)



    // expect(board).toEqual(solution)

  })

  it('failed test?', () => {

    // let rules:Rule[]= [
    //   {a: 'thor', b: 'walter', distance: {cols: 1, rows: 1}, distanceMask:true},
    //   {a: 'thor', b: 'batman', distance: {cols: 2, rows: 0}, distanceMask:true},
    //   {a: 'batman', b: 'walter', distance: {cols: 1, rows: 1}, distanceMask: true}
    // ]

    let board = [
      [['thor', 'walter', 'batman'], ['thor', 'walter', 'batman'], ['thor', 'walter', 'batman']],
      [['thor', 'walter', 'batman'], ['thor', 'walter', 'batman'], ['thor', 'walter', 'batman']]
    ]
    let rule:Rule = {a: 'thor', b: 'walter', distance: {cols: 1, rows: 1}, distanceMask:true}

    let tmp =applyRule(board, rule)
    expect(tmp).toEqual([
      [['thor', 'batman'], ['thor', 'batman'], ['batman']],
      [['batman'], ['walter', 'batman'], ['walter', 'batman']]
    ])
  })
})