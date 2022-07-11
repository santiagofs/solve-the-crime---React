import { random, shuffle } from "lodash";
import { CoordMap } from "./types";

const generateSolution = (cols:number, rows:number, items:string[]):CoordMap => {
  // we need to ensure each row and column has at least one item
  // because we are not always using explicit distances on the rules, but directions
  const maxBoundary = Math.max(cols, rows)

  // so, a) we need enough items
  if(items.length < maxBoundary) {
    throw new Error(`Not enough items for this level: ${cols}, ${rows}, ${items}`);
  }

  // b) pick a coordinate for each element, ensuring we cover all cols and rows first
  function createAvailable(max:number):number[] {
    return shuffle(Array(max).fill(0).map((v,i)=>i))
  }


  function getSlotForAxis(available: number[], axis: 'cols' | 'rows'): number {
    if (available.length > 0) return available.shift()!
    return axis === 'cols' ? random(cols-1) : random(rows-1)
  }

  const availableCols = createAvailable(cols)
  const availableRows = createAvailable(rows)

  const ret:CoordMap = {}
  for(const item of items) {
    ret[item] = [{
      col: getSlotForAxis(availableCols, 'cols'),
      row: getSlotForAxis(availableRows, 'rows')
    }]
  }

  return ret
}

export default generateSolution

