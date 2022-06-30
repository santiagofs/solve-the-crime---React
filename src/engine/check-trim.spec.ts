import checkTrim from './check-trim'
import roomItems from './mock/room-items'
import { Boundaries } from './types'
// import createRoom from './createRoom'
// import createBoard from './mock/create-board'
// import roomItems from './mock/room-items'



describe('engine - check trim', () => {
  it('checks the trim function', () => {
    const room = {col: 0, row: 1, items: [...roomItems]}
    const A:Boundaries = {left: 0, top: 0, right: 1, bottom: 1}
    const B:Boundaries = {left: 0, top: 0, right: 1, bottom: 1}
    const [itemA, itemB] = checkTrim(room, rule)
    expect(itemA).not.toEqual(itemB)
  })

})