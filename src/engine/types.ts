export type Grid<T> = (T|null)[][]
export type StringGrid = Grid<string[]>

export type Solution = Grid<string>
export type Room = {row:number, col:number, items: string[]}
export type Board = string[][][]

export type Coord = {col:number, row: number}
export type CoordMap = {[itemName:string]: Coord}


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
