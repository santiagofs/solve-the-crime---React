import createBoard from "./create-board"
import generateRules from "./generate-rules"
import generateSolution from "./generate-solution"
import isSolution from "./is-solution"

describe('engine - generate rules', () => {
  it('generates the rules needed to solve a board - 1', () => {

    const board = [
      [['thor', 'walter'], ['thor', 'walter']],
      [['thor', 'walter'], ['thor', 'walter']]
    ]
    let solution = {
      thor: [{col:0, row: 0}],
      walter: [{col:1, row: 1}]
    }

    const rules = generateRules(board, solution)
    expect(rules.length).toBe(1)
    const check = isSolution(board, rules, solution)
    expect(check).toBe(true)
  })

  it('generates the rules needed to solve a board - 2', () => {

    const board = [
      [['thor', 'walter', 'batman'], ['thor', 'walter', 'batman'], ['thor', 'walter', 'batman']],
      [['thor', 'walter', 'batman'], ['thor', 'walter', 'batman'], ['thor', 'walter', 'batman']]
    ]
    let solution = {
      thor: [{col:0, row: 0}],
      walter: [{col:2, row: 1}],
      batman: [{col:1, row: 0}]
    }

    const rules = generateRules(board, solution)
    const check = isSolution(board, rules, solution)
    expect(check).toBe(true)
  })

  it('generates the rules needed to solve a board - 3', () => {

    const board = [
      [['thor', 'walter', 'batman', 'malito'], ['thor', 'walter', 'batman', 'malito'], ['thor', 'walter', 'batman', 'malito']],
      [['thor', 'walter', 'batman', 'malito'], ['thor', 'walter', 'batman', 'malito'], ['thor', 'walter', 'batman', 'malito']],
      [['thor', 'walter', 'batman', 'malito'], ['thor', 'walter', 'batman', 'malito'], ['thor', 'walter', 'batman', 'malito']]
    ]
    let solution = {
      thor: [{col:0, row: 0}],
      walter: [{col:2, row: 1}],
      batman: [{col:1, row: 0}],
      malito: [{col:1, row: 2}]
    }

    const rules = generateRules(board, solution)
    const check = isSolution(board, rules, solution)
    expect(check).toBe(true)
  })

  it('generates the rules needed to solve a board - 4', () => {
    const items = ['thor', 'walter', 'batman']
    const board = createBoard(3, 2, items)
    const solution  = generateSolution(3,2, items)
    const rules = generateRules(board, solution)
    const check = isSolution(board, rules, solution)
    expect(check).toBe(true)
  })


})