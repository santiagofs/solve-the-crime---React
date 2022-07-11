import { Board, CoordMap, Rule, Vector } from "./types";

const generateRule = (board:Board, solution:CoordMap, pair: string[]):Rule => {
  let [a, b] = pair

  const aCoords = solution[a][0]
  if(!aCoords) throw new Error("Couldn't find room for item a: " + a);

  const bCoords = solution[b][0]
  if(!bCoords) throw new Error("Couldn't find room for item b: " + b);

  if(aCoords.col > bCoords.col) {
    const tmp = a
    a = b
    b = tmp
  }

  const [A, B] = [solution[a][0], solution[b][0]]
  let distance:Vector = {
    cols: B.col - A.col,
    rows: B.row - A.row
  }

  const maskChance = Math.random() * 4; // probably should add a parameter with the expected dificulty
  let distanceMask = maskChance !== 0

  return {a, b, distance, distanceMask}
}

export default generateRule