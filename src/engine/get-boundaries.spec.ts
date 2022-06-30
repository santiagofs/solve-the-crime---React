// return the current boundaries of an item on a board
import getBoundaries from "./get-boundaries"
import { board1 as board } from './mock/boards'


describe('engine - get boundaries', () => {
  it('gets the item boundaries on a board', () => {

    const boundaries = getBoundaries(board, ['thor', 'batman', 'walter', 'flash'])
    expect(boundaries['thor']).toEqual({left: 0, top: 1, bottom: 1, right: 1}) // thor is not in the first row
    expect(boundaries['batman']).toEqual({left: 1, top: 0, bottom: 1, right: 1})  // batman not in the first col
    expect(boundaries['walter']).toEqual({left: 0, top: 1, bottom: 1, right: 0})  // walter is only at row 1, col 0
    expect(boundaries['flash']).toEqual({left: 0, top: 0, bottom: 1, right: 1})  // flash is in all rooms
  })

})