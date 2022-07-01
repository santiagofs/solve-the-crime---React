// import checkTrim from './check-trim'
// import roomItems from './mock/room-items'
import boardHasItemAt from './board-has-item-at'
import {boardFull0} from './mock/boards'





describe('engine - board has item at', () => {
  it('board has item at', () => {
    let hasThor = boardHasItemAt(boardFull0, 1, 1, 'thor')
    expect(hasThor).toBe(true)
    let hasOther = boardHasItemAt(boardFull0, 1, 1, 'other')
    expect(hasOther).toBe(false)
  })

})