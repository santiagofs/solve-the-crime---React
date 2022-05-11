import { LevelConfig, Grid } from "."
import Solution from "./solution"
import ItemCollections from "./itemCollections"

export default class Level {
  private _config: LevelConfig | undefined
  readonly solution: Solution
  readonly grid: Grid<string[]> = []


  constructor(config: LevelConfig, readonly collections:ItemCollections) {
    this._config = config
    this.solution = new Solution(config, collections)

    // create a grid that holds every possible item on each cell
    const {rows, cols} = config.boundaries
    for(let row = 0; row < rows; row++) {
      this.grid[row] = []
      for(let col=0; col < cols; col++) {
        this.grid[row][col] = collections.allKeys
      }
    }
  }

  removeFromGrid(row:number, col:number, item:string) {
    const ndx = this.grid[row][col]?.indexOf(item)
    console.log(row, col, item, ndx)
    if (ndx === -1 || ndx === undefined) return

    this.grid[row][col]?.splice(ndx, 1)
  }

}