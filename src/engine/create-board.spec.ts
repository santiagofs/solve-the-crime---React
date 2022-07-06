import createBoard from "./create-board"

describe('engine - create board', () => {
  it('creates a board', () => {
    const items = ['thor', 'walter', 'batman']
    const board = createBoard(2, 2, items)
    expect(board).toEqual([
      [['thor', 'walter', 'batman'], ['thor', 'walter', 'batman']],
      [['thor', 'walter', 'batman'], ['thor', 'walter', 'batman']]
    ])

    expect(board[0][0]).toEqual(items)
    expect(board[0][0]).not.toBe(items)
  })
})