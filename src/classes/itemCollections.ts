import {Item } from '.'
import ItemCollection from './itemCollection'

export default class ItemCollections {
  private _collections: ItemCollection[] = []
  private _collectionNames: string[] = []
  private _allItems: {[key:string]: Item} = {}

  static createCollectionKey(collectionName: string, itemName: string) {
    return `${collectionName}.${itemName}`
  }

  add(collection: ItemCollection) {
    this._collections.push(collection)
    this._collectionNames.push(collection.name)
    for(const item of collection.asArray()) {
      const key = ItemCollections.createCollectionKey(collection.name, item.name)
      this._allItems[key] = item
    }
  }

  get allItems() {
    return this._allItems
  }
  get allKeys() {
    return Object.keys(this._allItems)
  }
}