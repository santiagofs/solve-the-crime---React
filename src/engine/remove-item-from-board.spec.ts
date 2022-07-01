import removeItemFromBoard from './remove-item-from-board'
import { boardFull0 } from './mock/boards'
import roomItems from './mock/room-items'


describe('engine - remove item from board', () => {
  it('returns a copy of the board with the item removed', () => {
    const test1 = removeItemFromBoard(boardFull0, 0, 1, 'thor')
    expect(test1).not.toEqual(boardFull0)
    expect(test1[1][0]).toEqual(['batman', 'flash', 'jason', 'hannibal', 'walter'])
    expect(boardFull0[1][0]).toEqual(roomItems)

    let test2 = removeItemFromBoard(test1, 0, 1, 'hannibal')
    expect(test2).not.toEqual(test1)
    expect(test2[1][0]).toEqual(['batman', 'flash', 'jason', 'walter'])

    let test3 = removeItemFromBoard(test2, 0, 1, 'thor')
    expect(test3).toEqual(test2)
  })
  it('removes an item from a board - no board copy', () => {
    const test1 = removeItemFromBoard(boardFull0, 0, 1, 'thor', true)
    expect(test1).toEqual(boardFull0)
    expect(test1[1][0]).toEqual(['batman', 'flash', 'jason', 'hannibal', 'walter'])

    let test2 = removeItemFromBoard(test1, 0, 1, 'hannibal')
    expect(test2).not.toEqual(test1)
    expect(test2[1][0]).toEqual(['batman', 'flash', 'jason', 'walter'])

    let test3 = removeItemFromBoard(test2, 0, 1, 'thor')
    expect(test3).toEqual(test2)
  })

})