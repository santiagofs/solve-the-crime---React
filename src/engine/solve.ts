import { cloneDeep, isEqual } from "lodash"
import applyRule from "./apply-rule"
import { Board, Rule } from "./types"

// Attempts to solve a board, from a set of rules
// Recursively applies the rules until they no make any modification
const solve = (board:Board, rules:Rule[]):Board => {
  let tmp:Board = cloneDeep(board)
  for(let rule of rules) {
    tmp = applyRule(tmp, rule)
  }
  // continue applying the rules until none of them are significant
  if(!isEqual(tmp, board)) return solve(tmp, rules)

  return tmp
}

export default solve