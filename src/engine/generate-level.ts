// - create a board, having dimensions and list of items to use
// - create a solution for the board
// - generate rules until the solution is matched
// -- pick a pair
// -- create a rule
// -- if the rule doesn't make a change in the board, create another rule
// -- if the rule is changes the board,
// --- add it to the rules array
// --- apply all the rules in the array until the board doesn't change anymore
// -- if the board has unsolved items, continue creating rules until it is
// - it should return a level, wich is:
// -- a board
// -- a set of rules
// -- a solution

import createBoard from "./create-board"
import generateRules from "./generate-rules"
import generateSolution from "./generate-solution"
import { Level } from "./types"

const generateLevel = (cols:number, rows:number, items: string[]):Level => {
  const board = createBoard(cols, rows, items)
  const solution = generateSolution(cols, rows, items)
  const level = {
    board,
    solution,
    rules: generateRules(board, solution)
  }

  return level
}

export default generateLevel