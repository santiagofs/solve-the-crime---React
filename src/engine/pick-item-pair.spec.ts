import pickItemPair from "./pick-item-pair"

describe('engine - get item pair', () => {
  it('gets a pair of items', () => {
    let board = [
      [['thor', 'batman'], ['thor']],
      [['thor'], ['thor']]
    ]
    let [a, b] = pickItemPair(board)
    expect(a).toEqual('thor')
    expect(b).toEqual('batman')

    let board2 = [
      [['thor', 'batman'], ['thor', 'walter']],
      [['thor', 'malito'], ['thor', 'walter']]
    ]

    let [c, d] = pickItemPair(board2)
    expect(['thor', 'walter']).toContain(c)
    expect(c).not.toEqual(d)
  })
})