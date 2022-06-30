import { Room } from "../classes"
import iterateBoard from "./iterate-board"
import createBoard from "./mock/create-board"
import roomItems from "./mock/room-items"

describe('engine - iterate board', () => {
  it('returns each room in the board', () => {
    const board1 = createBoard(2, 2)
    const check1:Room[] = []
    iterateBoard(board1, (room:Room) => {
      check1.push(room)
    })

    expect(check1.length).toEqual(4)
    expect(check1[2]).toEqual({col: 0, row: 1, items: [...roomItems]})

    const board2 = createBoard(3, 2)
    const check2:Room[] = []
    iterateBoard(board2, (room:Room) => {
      check2.push(room)
    })

    expect(check2.length).toEqual(6)
    expect(check2[2]).toEqual({col: 2, row: 0, items: [...roomItems]})

  })

})