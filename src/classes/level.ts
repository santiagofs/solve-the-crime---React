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
    // this will be used to show the items in the Board component
    const {rows, cols} = config.boundaries
    for(let row = 0; row < rows; row++) {
      this.grid[row] = []
      for(let col=0; col < cols; col++) {
        this.grid[row][col] = collections.allKeys
      }
    }

    // we need to create the rules needed to achieve the solution
    /*
      - create a temporary copy o the grid
      - pick a pair of items, at least one unsolved
      - create a rule
      - apply the rule to the temp grid and check if the rule changes the grid state. if not, create another rule (failsafe here)
      - apply all rules to the grid until no changes are detected
      - check if the result is equal to the solution. if not, repeat the process creating a new rule
    */

  }

  removeFromGrid(row:number, col:number, item:string) {
    const ndx = this.grid[row][col]?.indexOf(item)
    console.log(row, col, item, ndx)
    if (ndx === -1 || ndx === undefined) return

    this.grid[row][col]?.splice(ndx, 1)
  }

}