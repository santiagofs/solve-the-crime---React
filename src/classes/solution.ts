import ItemCollection from "./itemCollection"
import { LevelConfig, Board } from "."
import Item from "./item"

export default class Solution {
  private _collections: {[collectionName: string]: ItemCollection} = {}
  private _config: LevelConfig | undefined
  private _allItems: {[key:string]: Item} = {}

  constructor(config: LevelConfig, collections: {[collectionName: string]: ItemCollection}) {
    this._config = config
    this._collections = collections

    // generate a unique list of items
    for(const collectionName in this._collections) {
      const collection = this._collections[collectionName]
      for(const item of collection.asArray()) {
        const key = collectionName + '.' + item.name
        this._allItems[key] = item
      }
    }

    /* Solution creation */
    // we need to ensure each row and column has at least one item
    const {width, height} = config.boundaries
    // so, a) we need enough items
    if(Object.keys(this._allItems).length < Math.max(width, height)) {
      throw new Error("Not enough items for this level:" + this._config.number);

    }

    const cols:boolean[] = Array(config.boundaries.width).map( () => false)
    const rows:boolean[] = Array(config.boundaries.height).map( () => false)
  }

}