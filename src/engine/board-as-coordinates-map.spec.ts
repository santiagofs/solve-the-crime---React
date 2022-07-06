import { Board } from "./types"
import boardAsCoordinatesMap from './board-as-coordinates-map'

describe('engine - board as coordinates map', () => {
  it('converts a board to coordinates map', () => {
    const board:Board = [
      [['thor', 'batman'], ['thor', 'batman'], ['batman', 'walter']],
      [['thor', 'batman'], ['thor', 'batman'], ['batman']],
      [['thor', 'batman'], ['thor'], ['batman', 'malito']]
    ]
    const map = boardAsCoordinatesMap(board)
    expect(Array.isArray(map.thor)).toBe(true)
    expect(map.thor.length).toBe(6)
    expect(map.thor.sort()).toEqual([{col:0, row: 0}, {col:1, row: 0}, {col:0, row: 1}, {col:1, row: 1}, {col:0, row: 2}, {col:1, row: 2}].sort())

    expect(Array.isArray(map.batman)).toBe(true)
    expect(map.batman.length).toBe(8)
    expect(map.batman.sort()).toEqual([{col:0, row: 0}, {col:1, row: 0}, {col:2, row: 0},
      {col:0, row: 1}, {col:1, row: 1}, {col:2, row: 1},
      {col:0, row: 2},  {col:2, row: 2}].sort())

    expect(Array.isArray(map.walter)).toBe(true)
    expect(map.walter.length).toBe(1)
    expect(map.walter).toEqual([{col:2, row:0}])

    expect(Array.isArray(map.malito)).toBe(true)
    expect(map.malito.length).toBe(1)
    expect(map.malito).toEqual([{col:2, row: 2}])

  })
})