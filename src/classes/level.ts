import { sample, without } from "lodash"
import { LevelConfig, Grid, Coord, Item, Rule } from "."
import Solution from "./solution"
import ItemCollections from "./itemCollections"
import { ObjectFlags } from "typescript"

export default class Level {
  private _config: LevelConfig | undefined
  private _itemCoords: {[key: string]: Coord[]}
  private _allItemKeys: string[]
  readonly solution: Solution
  readonly grid: Grid<string[]> = []
  
  private get _unsolved() {
    return Object.keys(this._itemCoords).reduce((unsolved:string[], itemName: string) => {
      if(this._itemCoords[itemName].length > 0) unsolved.push(itemName)
      return unsolved
    }, [])
  }


  constructor(config: LevelConfig, readonly collections:ItemCollections) {
    this._config = config
    this.solution = new Solution(config, collections)
    this._itemCoords = {}
    
    this._allItemKeys = [...collections.allKeys]

    // create a grid that holds every possible item on each cell
    // this will be used to show the items in the Board component
    const {rows, cols} = config.boundaries
    for(let row = 0; row < rows; row++) {
      this.grid[row] = []
      for(let col=0; col < cols; col++) {
        this.grid[row][col] = [...collections.allKeys]
        for(const key of collections.allKeys) {
          if(!this._itemCoords[key]) this._itemCoords[key] = []
          this._itemCoords[key].push({row, col})
        }
      }
    }

    
    // we need to create the rules needed to achieve the solution
    /*
      - create a temporary copy o the grid
      - loop creating rules until is solved: 
        - pick a pair of items, at least one unsolved
        - create a rule
        - apply the rule to the temp grid and check if the rule changes the grid state. if not, create another rule (failsafe here)
        - apply all rules to the grid until no changes are detected
        - check if the result is equal to the solution. if not, repeat the process creating a new rule
    */
    /** create a temporary copy o the grid */
    const tmpGrid: Grid<string[]> = this.grid.map(row => row.slice())
    let safe:number = 0

    do {
      safe++
      /** pick a pair of items, at least one unsolved */
      const [a, b] = this.pickPair()
      const aCoords = this.solution.map[a]
      if(!aCoords) throw new Error("Couldn't find room for item a: " + a);
      
      const bCoords = this.solution.map[b]
      if(!bCoords) throw new Error("Couldn't find room for item b: " + b);


      /** create a rule */
      let safeRule: number = 0
      let changed: boolean = false
      do {
        safeRule++
       
        const rule = new Rule({key:a, ...aCoords}, {key: b, ...bCoords})
        /** apply the rule to the temp grid and check if the rule changes the grid state. if not, create another rule */
        changed = this.applyRule(rule, tmpGrid)
      } while(safeRule < 200 && changed === false)

      if(!changed) throw new Error("Unable to find a create a significat rule");
      
      

      

    } while(this._unsolved.length > 0 && safe < 200)
  }

  pickPair() {
    const a = sample(this._unsolved)
    if(!a) throw new Error("Unsolved Item not found");
    const b = sample(without(this._allItemKeys, a))
    if(!b) throw new Error("Could not found a second item")
    return [a, b]
  }

  applyRule(rule:Rule, grid:Grid<string[]>):boolean {
    // we need a grid copy to check if the rule changed something or not
    let changed = false

    

    // if the rule distance is not defined (distance === ?), we just trim the edges
    // - for each [col, row] in the rule axis
    // - we find the min A and the max B
    // - we remove all the B <= than A and all the A >= B 
    
    // if the rule distance is defined,
    // - both A and A+distance should exist
    // - both B and B-distance should exist

    // if the rule is significant, continue applying it until no changes are detected
    if(changed) this.applyRule(rule, grid)

    return changed
  }

  removeFromGrid(row:number, col:number, item:string) {
    const ndx = this.grid[row][col]?.indexOf(item)
    console.log(row, col, item, ndx)
    if (ndx === -1 || ndx === undefined) return

    this.grid[row][col]?.splice(ndx, 1)
  }

}