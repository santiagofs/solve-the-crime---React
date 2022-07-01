import applySameAxis from './apply-same-axis'
import { board0 } from './mock/boards'
import { ruleExplicit0, ruleMasked0, ruleMasked1 } from './mock/rules'
import removeItemFromBoard from './remove-item-from-board'
import { Rule } from './types'

describe('engine - apply same axis', () => {
  it('apply same axis', () => {
    let board = applySameAxis(board0, ruleExplicit0)
    expect(board).toEqual(board0)

    // remove thor from the first column
    board = removeItemFromBoard(board0, 0, 0, 'thor')
    board = removeItemFromBoard(board, 0, 1, 'thor', true)

    board = applySameAxis(board, ruleMasked0)
    expect(board).toEqual([
      [[], ['thor', 'walter']],
      [[], [ 'thor', 'walter']],
    ])


    // remove walter from the first row
    board = removeItemFromBoard(board0, 0, 0, 'walter')
    board = removeItemFromBoard(board, 1, 0, 'walter', true)
    board = applySameAxis(board, ruleMasked1)
    expect(board).toEqual([
      [[], []],
      [['thor', 'walter'], [ 'thor', 'walter']]
    ])

  })

  it('especial case', () => {
    const board = [[['thor',], ['walter'], ['walter']],
      [[],  ['walter'], ['walter']],
      [[], [], ['batman', 'malito']]
    ]
    const rule3:Rule = {
      a: 'malito',
      b: 'walter',
      distance: {cols: 0, rows: -2},
      distanceMask: true
    }
    const test = applySameAxis(board, rule3)
    expect(test).toEqual([
      [['thor',], [], ['walter']],
      [[],  [], ['walter']],
      [[], [], ['batman', 'malito']]
    ])

  })

})