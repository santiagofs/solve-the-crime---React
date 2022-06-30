import createRoom from './create-room'
import createBoard from './mock/create-board'
import roomItems from './mock/room-items'



describe('engine - create board', () => {
  it('creates a room from board', () => {
    const board = createBoard(2, 2)
    const room = createRoom(createBoard(2, 2), 1, 0)
    expect(room).toEqual({col:1, row: 0, items: roomItems})
    expect(room.items === board[0][1]).toBe(false)
  })

})