import generateLevel from "./generate-level"
import isSolution from "./is-solution"

describe('engine - generate level', () => {
  it('generates a level', () => {
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

  it('generates a level 2', () => {
    const level = generateLevel(3, 2, ['thor', 'walter', 'batman'])
    expect(level).toHaveProperty('board')
    expect(level.board).toEqual([
      [['thor', 'walter', 'batman'], ['thor', 'walter', 'batman'], ['thor', 'walter', 'batman']],
      [['thor', 'walter', 'batman'], ['thor', 'walter', 'batman'], ['thor', 'walter', 'batman']]
    ])
    const check = isSolution(level.board, level.rules, level.solution)
    expect(check).toBe(true)

  })

  it('generates a level 3', () => {
    const level = generateLevel(3, 3, ['thor', 'walter', 'batman'])
    expect(level).toHaveProperty('board')
    expect(level.board).toEqual([
      [['thor', 'walter', 'batman'], ['thor', 'walter', 'batman'], ['thor', 'walter', 'batman']],
      [['thor', 'walter', 'batman'], ['thor', 'walter', 'batman'], ['thor', 'walter', 'batman']],
      [['thor', 'walter', 'batman'], ['thor', 'walter', 'batman'], ['thor', 'walter', 'batman']]
    ])
    const check = isSolution(level.board, level.rules, level.solution)
    expect(check).toBe(true)

  })

  it('generates a level 4', () => {
    const level = generateLevel(3, 3, ['thor', 'walter', 'batman', 'malito'])
    expect(level).toHaveProperty('board')
    expect(level.board).toEqual([
      [['thor', 'walter', 'batman', 'malito'], ['thor', 'walter', 'batman', 'malito'], ['thor', 'walter', 'batman', 'malito']],
      [['thor', 'walter', 'batman', 'malito'], ['thor', 'walter', 'batman', 'malito'], ['thor', 'walter', 'batman', 'malito']],
      [['thor', 'walter', 'batman', 'malito'], ['thor', 'walter', 'batman', 'malito'], ['thor', 'walter', 'batman', 'malito']]
    ])
    const check = isSolution(level.board, level.rules, level.solution)
    expect(check).toBe(true)

  })

})