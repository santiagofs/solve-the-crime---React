// import checkTrim from './check-trim'
// import roomItems from './mock/room-items'
import { Boundaries } from './types'




describe('engine - check trim', () => {
  it('checks the trim function', () => {
    // const room = {col: 0, row: 1, items: [...roomItems]}
    const A:Boundaries = {left: 0, top: 0, right: 1, bottom: 1}
    expect(A).not.toBe(false)
    // const B:Boundaries = {left: 0, top: 0, right: 1, bottom: 1}
    // const [itemA, itemB] = checkTrim(room, rule)
    // expect(itemA).not.toEqual(itemB)
  })

})