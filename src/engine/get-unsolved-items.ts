import boardAsCoordinatesMap from "./board-as-coordinates-map";
import { Board } from "./types";

const getUnsolvedItems = (board:Board):string[] => {
  const asMap = boardAsCoordinatesMap(board)
  const ret:string[] =[]

  return Object.keys(asMap).reduce((prev, key) => {
    if(asMap[key].length > 1) prev.push(key)
    return prev
  }, ret)
}

export default getUnsolvedItems