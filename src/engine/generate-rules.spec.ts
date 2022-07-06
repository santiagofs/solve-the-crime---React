import generateRules from "./generate-rules"

describe('engine - generate rules', () => {
  it('generates the rules needed to solve a board', () => {

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
  })
})