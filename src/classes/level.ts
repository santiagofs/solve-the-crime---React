import ItemCollection from "./itemCollection"
import { LevelConfig } from "."
import Solution from "./solution"
import ItemCollections from "./itemCollections"

export default class Level {
  private _config: LevelConfig | undefined
  readonly solution: Solution
  

  constructor(config: LevelConfig, readonly collections:ItemCollections) {
    this._config = config
    this.solution = new Solution(config, collections)
    //console.log('the level >> ', this._solution)
  }

}