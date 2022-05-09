import { CollectionConfig, LevelConfig } from "."
import heroes from "../config/collections/heroes"
import villains from "../config/collections/villains"

import level01 from "../config/levels/level-01"
import level02 from "../config/levels/level-02"

import Item from "./item"
import ItemCollection from "./itemCollection"
import Level from "./level"

const gameConfig: {collections: {[key: string]: CollectionConfig}, levels: LevelConfig[]} = {
  collections: {
    'heroes': heroes,
    'villains': villains
  },
  levels: [
    level01,
    level02
  ]
}

export default class Game {
  private _collections: {[collectionName: string]: ItemCollection} = {}
  private _levels: {[levelId: number]: LevelConfig} = {}
  static _instance:Game

  private constructor() {}

  get levels() {
    return this._levels
  }
  get collections() {
    return this._collections
  }

  createLevel(levelId: number): Level {
    const config = this._levels[levelId]
    const levelCollections: {[collectionName: string]: ItemCollection} = {}

    for(const collectionName of config.collections) {
      levelCollections[collectionName] = this._collections[collectionName].pick(config.itemsPerCollection)
    }
    return new Level(config, levelCollections)
  }

  static async get() {
    if (!this._instance)  {
      this._instance = new Game()
      for(const colName in gameConfig.collections) {
        this._instance._collections[colName] = await ItemCollection.forge(colName, gameConfig.collections[colName])
      }
      for(const level of gameConfig.levels) {
        this._instance._levels[level.number] = level
      }

    }
    return this._instance
  }

}