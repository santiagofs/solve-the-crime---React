import { shuffle, random, isEqual } from "lodash"
import { LevelConfig, Grid, Coord, createGrid } from "."
import ItemCollections from "./itemCollections"

export default class Solution {
  private _collections: ItemCollections
  private _config: LevelConfig | undefined

  private _grid: Grid<string[]> = [] // stores the items key = collection.item
  private _asCoordMap: {[itemKey: string]: Coord} = {}


  constructor(config: LevelConfig, collections: ItemCollections) {
    this._config = config
    this._collections = collections

    /* Solution creation */
    // we need to ensure each row and column has at least one item
    const {cols, rows} = config.boardSize
    const maxBoundary = Math.max(cols, rows)
    this._grid = createGrid(cols, rows)

    // so, a) we need enough items
    if(Object.keys(collections.allItems).length < maxBoundary) {
      throw new Error("Not enough items for this level:" + this._config.number);
    }

    // b) pick a coordinate for each element, ensuring we cover all cols and rows first
    function createAvailable(max:number):number[] {
      return shuffle(Array(cols).fill(0).map((v,i)=>i))
    }
    const availableCols = createAvailable(cols)
    const availableRows = createAvailable(rows)

    function getAxis(available: number[], axis: 'cols' | 'rows'): number {
      if (available.length > 0) return available.shift()!
      return axis === 'cols' ? random(cols-1) : random(rows-1)
    }
    for(const itemKey in collections.allItems) {
      const col = getAxis(availableCols, 'cols')
      const row = getAxis(availableRows, 'rows')
      this._asCoordMap[itemKey] = {col, row}
      this._grid[row][col] === null ? this._grid[row][col] = [itemKey] : this._grid[row][col]?.push(itemKey)
    }
  }

  get grid() {
    return this._grid
  }

  get map() {
    return this._asCoordMap
  }

  check(tentative: Grid<string[]>) {
    return isEqual(tentative, this._grid)
  }
}