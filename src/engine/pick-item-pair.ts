import { sample, without } from "lodash";
import boardAsCoordinatesMap from "./board-as-coordinates-map";
import getUnsolvedItems from "./get-unsolved-items";
import { Board, Rule } from "./types";

const pickItemPair = (board:Board, rules:Rule[] = []):[string, string] => {
  // TODO: we should use the rules to weight a better item selection, avoiding the items more used
  const a:string|undefined = sample(getUnsolvedItems(board))
  if(!a) throw new Error("Unsolved Item not found");
  const b = sample(without(Object.keys(boardAsCoordinatesMap(board)), a))
  if(!b) throw new Error("Could not found a second item")

  return [a, b]
}

export default pickItemPair