// return the current boundaries of an item on a board
import getBoundaries from "./get-boundaries"
import { board1 as board } from './mock/boards'


describe('engine - get boundaries', () => {
  it('gets the item boundaries on a board', () => {

    const boundaries = getBoundaries(board, ['thor', 'walter'])
    expect(boundaries['thor']).toEqual({left: 0, top: 1, bottom: 1, right: 1}) // thor is not in the first row
    expect(boundaries['walter']).toEqual({left: 0, top: 1, bottom: 1, right: 0})  // walter is only at row 1, col 0

  })

})