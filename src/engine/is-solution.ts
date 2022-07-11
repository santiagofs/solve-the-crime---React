import { isEqual } from "lodash";
import boardAsCoordinatesMap from "./board-as-coordinates-map";
import solve from "./solve";
import { Board, CoordMap, Rule } from "./types";

const isSolution = (board:Board, rules:Rule[], solution:CoordMap):boolean => {
  const tmp = solve(board, rules)
  return isEqual(boardAsCoordinatesMap(tmp), solution)
}

export default isSolution