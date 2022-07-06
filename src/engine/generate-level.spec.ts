import generateLevel from "./generate-level"

describe('engine - generate level', () => {
  it.skip('generates a level', () => {
    const level = generateLevel(2, 2, ['thor', 'walter'])
    expect(level).toHaveProperty('board')
    expect(level.board).toEqual([
      [['thor', 'walter'], ['thor', 'walter']],
      [['thor', 'walter'], ['thor', 'walter']]
    ])
    expect(level.solution).toHaveProperty('thor')
    const a = level.solution['thor'][0]
    const b = level.solution['walter'][0]
    expect(Math.abs(b.row - a.row)).toEqual(1)
    expect(Math.abs(b.col - a.col)).toEqual(1)

    expect(level.rules.length).toEqual(1)
  })
})