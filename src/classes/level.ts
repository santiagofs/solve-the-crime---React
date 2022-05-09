import ItemCollection from "./itemCollection"
import { LevelConfig } from "."

export default class Level {
  private _collections: {[collectionName: string]: ItemCollection} = {}
  private _config: LevelConfig | undefined

  constructor(config: LevelConfig, collections: {[collectionName: string]: ItemCollection}) {
    this._config = config
    this._collections = collections
    console.log('the level >> ', this._collections)

    // una solu
  }
}