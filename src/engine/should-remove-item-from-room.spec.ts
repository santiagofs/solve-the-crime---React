import roomItems from './mock/room-items'
import removeItemFromRoom from './remove-item-from-room'



describe('engine - should remove item from room', () => {
  it('should remove item from room', () => {
    const room =  {col: 0, row: 1, items: roomItems}
    let test1 = removeItemFromRoom('thor', room)
    expect(test1).not.toEqual(room)
    expect(test1).toEqual({col: 0, row: 1, items:['batman', 'flash', 'jason', 'hannibal', 'walter']})
    expect(roomItems.length).toBe(6)
    expect(room.items).toEqual(roomItems)

    let test2 = removeItemFromRoom('hannibal', test1)
    expect(test2).not.toEqual(test1)
    expect(test2).toEqual({col: 0, row: 1, items:['batman', 'flash', 'jason', 'walter']})

    let test3 = removeItemFromRoom('thor', test2)
    expect(test3).toEqual(test2)


  })

})