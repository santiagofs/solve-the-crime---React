import checkTrim from './checkTrim'
import createRoom from './createRoom'
import removeItemFromRoom from './removeItemFromRoom'
import { Board, Rule } from './types'

const roomItems =  ['thor', 'batman', 'flash', 'jason', 'hannibal', 'walter']
const createBoard = function(cols:number, rows:Number):Board {
  let ret:Board = []
  for(let y=0; y < rows; y++) {
    ret[y] = []
    for (let x=0; x < cols; x++) {
      ret[y][x] = [... roomItems]
    }
  }
  return ret
}

describe('engine', () => {
  let level1:Board
  let solution1:Board = [
    [['thor', 'hannibal'],['batman']],
    [['flash', 'walter'],['jason',]]
  ]

  beforeEach(() => {
    level1 = createBoard(3, 3)
  })

  it('dummy', () => {
    expect(solution1).toEqual(solution1)
  })

  it('removes an item from a room', () => {
    const room =  {col: 0, row: 1, items: level1[0][1]!}
    let test1 = removeItemFromRoom('thor', room)
    expect(test1).not.toEqual(room)
    expect(test1).toEqual({col: 0, row: 1, items:['batman', 'flash', 'jason', 'hannibal', 'walter']})

    let test2 = removeItemFromRoom('hannibal', test1)
    expect(test2).not.toEqual(test1)
    expect(test2).toEqual({col: 0, row: 1, items:['batman', 'flash', 'jason', 'walter']})

    let test3 = removeItemFromRoom('thor', test2)
    expect(test3).toEqual(test2)

    expect(room.items).toEqual(level1[0][1])
  })

  it('creates a room from board', () => {
    const board = createBoard(2, 2)
    const room = createRoom(createBoard(2, 2), 1, 0)
    expect(room).toEqual({col:1, row: 0, items: roomItems})
    expect(room.items === board[0][1]).toBe(false)
  })

  // it('checks triming a board', () => {
  //   const rule:Rule = {
  //     distance: {cols: 1, rows: 1},
  //     distanceMaks: true,
  //     a: 'thor',
  //     b: 'json'
  //   }
  //   let [A, B] = checkTrim(room, rule)

  // })

})