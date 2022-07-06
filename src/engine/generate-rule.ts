import { Board, CoordMap, Rule, Vector } from "./types";

const generateRule = (board:Board, solution:CoordMap, pair: string[]):Rule => {
  const [a, b] = pair

  const aCoords = solution[a][0]
  if(!aCoords) throw new Error("Couldn't find room for item a: " + a);

  const bCoords = solution[b][0]
  if(!bCoords) throw new Error("Couldn't find room for item b: " + b);

  const [A, B] = aCoords.col < bCoords.col ? [aCoords, bCoords] : (aCoords.col > bCoords.col ? [bCoords, aCoords] : (aCoords.row < bCoords.row ? [aCoords, bCoords]: [bCoords, aCoords]))
  let distance:Vector = {
    cols: B.col - A.col,
    rows: B.row - A.row
  }

  const maskChance = Math.random() * 4; // probably should add a parameter with the expected dificulty
  let distanceMask = maskChance !== 0

  return {a, b, distance, distanceMask}
}

export default generateRule