// import checkTrim from './check-trim'
// import roomItems from './mock/room-items'
import {boardFull0} from './mock/boards'
import applyVector from './apply-vector'
import boardHasItemAt from './board-has-item-at'




describe('engine - check trim', () => {
  it('checks the trim function', () => {
    const board = applyVector(boardFull0, {cols: 1, rows: 1}, 'thor', 'walter')
    expect(board === boardFull0).toBe(false)
    console.log(board)
    // expect(boardHasItemAt(board, 0, 0, 'thor')).toBe(true)
    expect(boardHasItemAt(board, 0, 1, 'thor')).toBe(false)
    expect(boardHasItemAt(board, 1, 0, 'thor')).toBe(false)
    // expect(boardHasItemAt(board, 1, 1, 'thor')).toBe(false)

    // expect(boardHasItemAt(board, 0, 0, 'walter')).toBe(false)
    expect(boardHasItemAt(board, 0, 1, 'walter')).toBe(false)
    expect(boardHasItemAt(board, 1, 0, 'walter')).toBe(false)
    expect(boardHasItemAt(board, 1, 1, 'walter')).toBe(true)

  })

})