import { sample, without } from "lodash";
import boardAsCoordinatesMap from "./board-as-coordinates-map";
import getUnsolvedItems from "./get-unsolved-items";
import { Board } from "./types";

const pickItemPair = (board:Board):[string, string] => {
  const a:string|undefined = sample(getUnsolvedItems(board))
  if(!a) throw new Error("Unsolved Item not found");
  const b = sample(without(Object.keys(boardAsCoordinatesMap(board)), a))
  if(!b) throw new Error("Could not found a second item")

  return [a, b]
}

export default pickItemPair