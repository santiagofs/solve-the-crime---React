export type Grid<T> = (T|null)[][]
export type StringGrid = Grid<string[]>

export type Solution = Grid<string>
export type Room = {row:number, col:number, items: string[]}
export type Board = string[][][]

export type Coord = {col:number, row: number}
export type CoordMap = {[itemName:string]: Coord[]}


export type RuleItem = {
  col: number;
  row: number;
  key: string
}

export type Vector = {
  cols: number,
  rows: number
}
export type Direction = -1|0|1

export type Rule = {
  distance: Vector
  distanceMask: boolean
  a:string
  b:string
}

export type Boundaries = {
  left: number, top: number, right: number, bottom: number
}

export type Level = {
  board:Board
  rules:Rule[]
  solution:CoordMap
}
export type LevelConfig = {
  number: number,
  collections: string[],
  itemsPerCollection: number,
  boardSize: {
    cols:number,
    rows: number
  }
}

export type Item = {
  icon: string
  name: string
}

export type ItemCollection = { [itemKey:string]: Item }
export type ItemCollections = { [itemKey:string]: ItemCollection }
export type Game = {
  collections: ItemCollections
}