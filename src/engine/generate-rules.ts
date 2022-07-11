import { cloneDeep, isEqual } from "lodash";
import applyRule from "./apply-rule";
import generateRule from "./generate-rule";
import isSolution from "./is-solution";
import pickItemPair from "./pick-item-pair";
import solve from "./solve";
import { Board, CoordMap, Rule } from "./types";

// - generate rules until the solution is matched
// -- pick a pair
// -- create a rule
// -- if the rule doesn't make a change in the board, create another rule
// -- if the rule is changes the board,
// --- add it to the rules array
// --- apply all the rules in the array until the board doesn't change anymore
// -- if the board has unsolved items, continue creating rules until it is

const generateRules = (board:Board, solution:CoordMap):Rule[] => {
  const rules:Rule[] = []
  let tempBoard:Board = cloneDeep(board)
  let safe = 0
  while(!isSolution(tempBoard, rules, solution) && safe < 5) {
    let pair = pickItemPair(tempBoard, rules)
    let rule = generateRule(tempBoard, solution, pair)
    let tmp = applyRule(tempBoard, rule)
    if (isEqual(tmp, tempBoard)) {
      // safe++
      continue
    } else {
      rules.push(rule)
      tempBoard = solve(tempBoard, rules)
    }
  }
  return rules
}

export default generateRules