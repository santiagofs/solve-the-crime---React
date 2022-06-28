import { sample, without } from "lodash"
import { LevelConfig, Grid, StringGrid, Coord, Room, GridIteratorCallback, Rule } from "."
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
      //if(!changed) throw new Error("Unable to create a significat rule");


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

    type minMax = {
      cols: number[],
      rows: number[],
      top: number,
      bottom: number,
      left: number,
      right: number
    }

    const ret: {a:minMax, b:minMax} = {
      /** rows hold, for each row, the minMax value expressed as a column number */
      a: {cols: [], rows: [], top: Number.MAX_SAFE_INTEGER, left: Number.MAX_SAFE_INTEGER, right: Number.MAX_SAFE_INTEGER, bottom: Number.MAX_SAFE_INTEGER},
      b: {cols: [], rows: [], top: 0, left: 0, right: 0, bottom: 0}
    }

    this.iterate(grid, (room) => {
      console.log(room)
      if(room.items.includes(a)) {
        ret.a.rows.push(room.row)
        ret.a.cols.push(room.col)
      }
      if(room.items.includes(b)) {
        ret.b.rows.push(room.row)
        ret.b.cols.push(room.col)
      }
    })
    ret.a.top = Math.min(...ret.a.rows)
    ret.a.bottom = Math.max(...ret.a.rows)
    ret.a.left = Math.min(...ret.a.cols)
    ret.a.right = Math.max(...ret.a.cols)
    ret.b.top = Math.min(...ret.b.rows)
    ret.b.bottom = Math.max(...ret.b.rows)
    ret.b.left = Math.min(...ret.b.cols)
    ret.b.right = Math.max(...ret.b.cols)
    console.log(ret)
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

  shouldRemove(position: number, minA:number, maxA:number, minB:number, maxB:number, distance:number, direction:number) {
    let a:boolean, b:boolean
    if(direction < 0) {
      a = position > (minB + distance + direction)
      b = position < (maxA + distance + direction)
    } else {
      a = position < (maxB - distance + direction)
      b = position > (minA - distance + direction)
    }
    return [!a, !b]
  }

  applyRule(rule:Rule, grid:Grid<string[]>):boolean {
    let changed = false
    console.log('<<< Applying rule')
    this.iterate(grid, (room) => {
      if(rule.distanceMaks) {
        // should trim

        if(rule.distance.cols === 0 && rule.distance.rows === 0) {
          console.log('>>> same room')
          if(!room.items.includes(rule.a)) this.removeFromRoom(rule.b, room) && (changed = true)
          if(!room.items.includes(rule.b)) this.removeFromRoom(rule.a, room) && (changed = true)
        } else {
          console.log('>>> trimming')
          /**
           * A: 1.0, B:0.1, v: 1.-1, d: 1.1
           * A.row > B.row
           * a.bottom: 1, b.top: 0, direction: -1, distance: 1
           * 0.0, A > B: A > b.top + discance + direction = 0 > 0 + 1 - 1, 0 > 0, false
           * 0.1, A > B: A > b.top + discance + direction = 0 > 0 + 1 - 1, 0 > 0, false
           * 1.0, A > B: A > b.top + discance + direction = 1 > 0 + 1 - 1, 1 > 0, true
           * 1.1, A > B: A > b.top + discance + direction = 1 > 0 + 1 - 1, 1 > 0, true
           * 0.0, B < A: B < a.bottom, + discance + direction = 0 > 1 + 1 - 1, 0 > 1, true
           * 0.1, B < A: B < a.bottom, + discance + direction = 0 > 1 + 1 - 1, 0 > 1, true
           * 1.0, B < A: B < a.bottom, + discance + direction = 1 > 1 + 1 - 1, 1 > 1, false
           * 1.1, B < A: B < a.bottom, + discance + direction = 1 > 1 + 1 - 1, 1 > 1, false
           *
           * A: 0.0, B:1.1, v: 1.1, d: 1.1
           * A.row > B.row
           * a.top: 0, b.bottom: 1, direction: 1, distance: 1
           * 0.0, A < B: A < b.bottom - discance + direction, 0 > 1 - 1 + 1, 0 > 1, true
           * 0.1, A < B: A < b.bottom - discance + direction, 0 > 1 - 1 + 1, 0 > 1, true
           * 1.0, A < B: A < b.bottom - discance + direction, 1 > 1 - 1 + 1, 1 > 1, false
           * 1.1, A < B: A < b.bottom - discance + direction, 1 > 1 - 1 + 1, 1 > 1, false
           * 0.0, B > A: B > a.top, + discance + direction, 0 > 0 + 1 - 1, 0 > 1, false
           * 0.1, B > A: B > a.top, + discance + direction, 0 > 0 + 1 - 1, 0 > 1, false
           * 1.0, B > A: B > a.top, + discance + direction, 1 > 0 + 1 - 1, 1 > 0, true
           * 1.1, B > A: B > a.top, + discance + direction, 1 > 0 + 1 - 1, 1 > 0, true
           */


          const minMax = this.findMinMax(rule.a, rule.b, grid)
          const direction = Math.sign(rule.distance.rows)
          const colOffset = rule.distance.cols === 0 ? 0 : 1
          const rowOffset = (rule.distance.rows === 0 ? 0 : 1)

          const [colA, colB] = this.shouldRemove(room.col, minMax.a.left, minMax.a.right, minMax.b.left, minMax.b.right, colOffset, 1)
          const [rowA, rowB] = this.shouldRemove(room.row, minMax.a.top, minMax.a.bottom, minMax.b.top, minMax.b.bottom, rowOffset, direction)

          if( colA || rowA ) this.removeFromRoom(rule.a, room) && (changed = true)
          if( colB || rowB ) this.removeFromRoom(rule.b, room) && (changed = true)
          console.log(structuredClone(grid))
        }

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