import getUnsolvedItems from "./get-unsolved-items"

describe('engine - get unsolved items', () => {

  it('gets the unsolved items from a board', () => {
    const board = [
      [['thor', 'batman'], ['thor', 'batman'], ['batman', 'walter']],
      [['thor', 'batman'], ['thor', 'batman'], ['batman']],
      [['thor', 'batman'], ['thor'], ['batman', 'malito']]
    ]
    const unsolved = getUnsolvedItems(board)
    expect(unsolved).toContain('thor')
    expect(unsolved).toContain('batman')
    expect(unsolved).not.toContain('malito')
    expect(unsolved).not.toContain('walter')
  })
})