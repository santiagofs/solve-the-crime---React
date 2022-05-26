import { sample, without } from "lodash"
import { LevelConfig, Grid, StringGrid, Coord, Room, GridIteratorCallback, Rule, Axis } from "."
import Solution from "./solution"
import ItemCollections from "./itemCollections"


export default class Level {
  private _config: LevelConfig | undefined
  // private _itemCoords: {[key: string]: Coord[]}
  private _allItemKeys: string[]
  readonly solution: Solution
  readonly grid: Grid<string[]> = []
  readonly rules: Rule[] = []

  private _itemCoords(grid:StringGrid): {[key: string]: Coord[]} {
    const itemCoords:{[key:string]: Coord[]} =  {}

    this._allItemKeys.reduce((obj, key) => {
      obj[key] = []
      return obj
    }, itemCoords)
    this.iterate(grid, (room => {
      for(const key of this._allItemKeys) {
        const coord:Coord = {row: room.row, col: room.col}
        if(room.items.includes(key)) itemCoords[key].push(coord)
      }
    }))
    return itemCoords
  }
  private _unsolved(grid:StringGrid) {
    const itemCoords = this._itemCoords(grid)
    console.log(itemCoords)
    return Object.keys(itemCoords).reduce((unsolved:string[], itemName: string) => {
      if(itemCoords[itemName].length > 1) unsolved.push(itemName)
      return unsolved
    }, [])
  }


  constructor(config: LevelConfig, readonly collections:ItemCollections) {
    this._config = config
    this.solution = new Solution(config, collections)

    this._allItemKeys = [...collections.allKeys]

    // create a grid that holds every possible item on each cell
    // this will be used to show the items in the Board component
    const {rows, cols} = config.boundaries
    for(let row = 0; row < rows; row++) {
      this.grid[row] = []
      for(let col=0; col < cols; col++) {
        this.grid[row][col] = [...collections.allKeys]
        // for(const key of collections.allKeys) {
        //   if(!this._itemCoords[key]) this._itemCoords[key] = []
        //   this._itemCoords[key].push({row, col})
        // }
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
    const tmpGrid: Grid<string[]> = structuredClone(this.grid)
    let safe:number = 0

    do {
      safe++
      /** pick a pair of items, at least one unsolved */

      /** create a rule */
      let safeRule: number = 0
      let changed: boolean = false
      do {
        safeRule++

        const [a, b] = this.pickPair(tmpGrid)
        const aCoords = this.solution.map[a]
        if(!aCoords) throw new Error("Couldn't find room for item a: " + a);

        const bCoords = this.solution.map[b]
        if(!bCoords) throw new Error("Couldn't find room for item b: " + b);

        const rule = new Rule({key:a, ...aCoords}, {key: b, ...bCoords})
        /** apply the rule to the temp grid and check if the rule changes the grid state. if not, create another rule */
        changed = this.applyRule(rule, tmpGrid)
        if(changed) {
          this.rules.push(rule)
        } else {
          console.log(rule, structuredClone(tmpGrid))
        }
        //this.enforceRules(tmpGrid, this.rules)

      } while(safeRule < 10 && changed === false)
      console.log(this._unsolved(tmpGrid))
      if(!changed) throw new Error("Unable to create a significat rule");


    } while(this._unsolved(tmpGrid).length > 0 && safe < 10)

  }

  pickPair(grid:StringGrid) {
    const a = sample(this._unsolved(grid))
    if(!a) throw new Error("Unsolved Item not found");
    const b = sample(without(this._allItemKeys, a))
    if(!b) throw new Error("Could not found a second item")
    return [a, b]
  }
  iterate(grid:Grid<string[]>, callback:GridIteratorCallback) {
    for(let y = 0; y < grid.length; y++) {
      for(let x = 0; x < grid[y].length; x++) {
        callback({row: y, col: x, items: grid[y][x]!} )
      }
    }
  }
  findMinMax(a:string, b:string, grid:Grid<string[]>) {

    const rows = grid.length
    const cols = grid[0]!.length

    const ret = {
      /** rows hold, for each row, the minMax value expressed as a column number */
      a: {cols: Array(cols).fill(Number.MAX_SAFE_INTEGER), rows: Array(rows).fill(Number.MAX_SAFE_INTEGER), col: Number.MAX_SAFE_INTEGER, row: Number.MAX_SAFE_INTEGER},
      b: {cols: Array(cols).fill(0), rows: Array(rows).fill(0), col: 0, row: 0}
    }
    this.iterate(grid, (room) => {
      if(room.items.includes(a)) {
        ret.a.rows[room.row] = Math.min(ret.a.rows[room.row], room.col)
        ret.a.cols[room.col] = Math.min(ret.a.cols[room.col], room.row)
      }
      if(room.items.includes(b)) {
        ret.b.rows[room.row] = Math.max(ret.b.rows[room.row], room.col)
        ret.b.cols[room.col] = Math.max(ret.b.cols[room.col], room.row)
      }
    })
    ret.a.col = Math.min(...ret.a.cols)
    ret.a.row = Math.min(...ret.a.rows)
    ret.b.col = Math.max(...ret.b.cols)
    ret.b.row = Math.max(...ret.b.rows)
    return ret
  }
  getRoom(grid:StringGrid, coord:Coord):Room|null {
    if(!grid[coord.row]?.[coord.col]) return null
    return {
      row:coord.row,
      col: coord.col,
      items: grid[coord.row][coord.col]!
    }
  }
  buildCoord(fCoord: {[ key:string]: number}):Coord {
    const coord = {row: -1, col: -1}
    if(fCoord.col !== null) coord.col = fCoord.col
    if(fCoord.row !== null) coord.row = fCoord.row
    return coord
  }
  removeFromRoom(item:string, room:Room) {
    const ndx = room.items.indexOf(item)
    if(ndx === -1) return false
    room.items.splice(ndx,1)
    return true
  }

  applyRule(rule:Rule, grid:Grid<string[]>):boolean {
    let changed = false
    console.log('<<< Applying rule')
    this.iterate(grid, (room) => {
      if(rule.distance.cols === '?' || rule.distance.rows === '?') {
        // should trim
        console.log('shouldnt be here')
      } else {
        const [cols, rows] = [rule.distance.cols, rule.distance.rows]
        const aRoom = this.getRoom(grid, {col: room.col - cols, row: room.row - rows})
        if(!aRoom || !aRoom.items.includes(rule.a)) {
          this.removeFromRoom(rule.b, room) && (changed = true)
        }
        if(!room.items.includes(rule.b) && aRoom) this.removeFromRoom(rule.a, aRoom) && (changed = true)

        const bRoom = this.getRoom(grid, {col: room.col + cols, row: room.row + rows})
        if(!bRoom || !bRoom.items.includes(rule.b)) this.removeFromRoom(rule.a, room) && (changed = true)
        if(!room.items.includes(rule.a) && bRoom) this.removeFromRoom(rule.b, bRoom) && (changed = true)

      }
      if(!changed) {
        console.log('not changed', grid, rule)
      }
    })


      // if(rule.distance === '?') {
      //   const minMax = this.findMinMax(rule.a, rule.b, grid)
      //   console.log('the minmax > ', minMax)
      //   this.iterate(grid, (room) => {
      //     // check if this room should have "b",
      //     // this room index on rule axis should be grater than the min "a" for the same transversal axis
      //     // if rule is {a, b, col, ?} and the room is {row: 1, x: col}
      //     // b should be present only if minmax.rows[room.row] is less than room.col
      //     const checkIndex = room[rule.axis]
      //     const fixedIndex = room[otherAxis]
      //     //const min = rule.sameOtherAxis ? minMax.a[rule.axis] : minMax.a[minMaxRefAxis][fixedIndex]
      //     //const max = rule.sameOtherAxis ? minMax.b[rule.axis] : minMax.b[minMaxRefAxis][fixedIndex]
      //     const min = minMax.a[rule.axis]
      //     const max = minMax.b[rule.axis]
      //     console.log('rule >', rule.a, rule.b, min, max)
      //     if(checkIndex >= max) {
      //       this.removeFromRoom(rule.a, room) && (changed = true) // nice, but TODO: check it
      //     }
      //     if(checkIndex <= min) {
      //       this.removeFromRoom(rule.b, room) && (changed = true) // nice, but TODO: check it
      //     }
      //   })
      // } else {
      //   this.iterate(grid, room => {
      //     const distance = rule.distance as number
      //     console.log('fixed', room, distance)
      //     const coordB = this.buildCoord({[otherAxis]: room[otherAxis], [rule.axis]: room[rule.axis] + distance})
      //     const roomB = this.getRoom(grid, coordB)

      //     const coordA = this.buildCoord({[otherAxis]: room[otherAxis], [rule.axis]: room[rule.axis] - distance})
      //     const roomA = this.getRoom(grid, coordA)

      //     if(!room.items.includes(rule.a)) {
      //       console.log('a1', roomB, coordB)
      //       if(roomB) this.removeFromRoom(rule.b, roomB) && (changed = true)
      //     } else {
      //       console.log('a2', roomB, coordB)
      //       if(!roomB) this.removeFromRoom(rule.a, room) && (changed = true)
      //     }

      //     if(!room.items.includes(rule.b)) {
      //       console.log('b1', roomA, coordA)
      //       if(roomA) this.removeFromRoom(rule.a, roomA) && (changed = true)
      //     } else {
      //       console.log('b2', roomA, coordA)
      //       if(!roomA) this.removeFromRoom(rule.b, room) && (changed = true)
      //     }
      //   })
      // }

    // if the rule is significant, continue applying it until no changes are detected
    // if(changed) this.applyRule(rule, grid)
    console.log('<<<< Rule applied', changed)
    return changed
  }
  enforceRules(grid:StringGrid, rules:Rule[]) {
      let changed = false
      let safe = 100

      do {
        safe++
        changed = rules.reduce((reduction:boolean, rule) => {
          return reduction || this.applyRule(rule, grid)
        }, false)
      } while (safe<100 && changed === false)
      changed && this.enforceRules(grid, rules)
  }

  removeFromGrid(row:number, col:number, item:string) {
    const ndx = this.grid[row][col]?.indexOf(item)
    if (ndx === -1 || ndx === undefined) return

    this.grid[row][col]?.splice(ndx, 1)
  }

  solve() {
    this.enforceRules(this.grid, this.rules)
  }

}