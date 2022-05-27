export type ItemConfig = [string, string] // name, icon
export type CollectionConfig = ItemConfig[]

export type Grid<T> = (T|null)[][]
export type StringGrid = Grid<string[]>
export type Room = {row:number, col:number, items: string[]}
export type GridIteratorCallback  = (room:Room) => void

export const createGrid = (cols: number, rows: number) => {
  //return Array(rows).fill(Array(cols).fill(null))
  // the abbreviated method above create references for rows so all items are inserted in the same row
  let ret:null[][]  = []
  for(let row = 0; row < rows; row++) {
    if (!ret[row]) ret[row] = []
    for(let col = 0; col < cols; col++) {
      ret[row][col] = null
    }
  }
  return ret
}

export type Coord = {row: number, col: number}

export type LevelConfig = {
  number: number;
  collections: string[];
  itemsPerCollection: number;
  boundaries: { cols: number; rows: number };
};

export {default as Game } from './game'
export {default as Item } from './item'
export {default as ItemCollection} from './itemCollection'
export {default as ItemCollections} from './itemCollections'
export {default as Level} from './level'
export {default as Solution} from './solution'
export {default as Rule, } from './rule'

export type {RuleItem} from './rule'

export type Distance = number // | "?";
export type Axis = "row" | "col";
