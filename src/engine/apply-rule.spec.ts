import applyRule from "./apply-rule"
import { board2, board3, board4, boardFull0 } from "./mock/boards"
import { ruleExplicit0, ruleExplicit1, ruleExplicit2, ruleExplicit3 } from "./mock/rules"

describe('engine - apply rule', () => {
  it('apply rule', () => {
    let board = applyRule(boardFull0, ruleExplicit0)
    expect(board).toEqual(boardFull0)

    board = applyRule(boardFull0, ruleExplicit1)
    expect(board).toEqual(board2)

    board = applyRule(boardFull0, ruleExplicit2)
    expect(board).toEqual(board3)

    board = applyRule(boardFull0, ruleExplicit3)
    expect(board).toEqual(board4)

  })

})