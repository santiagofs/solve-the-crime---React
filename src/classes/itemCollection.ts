import { sampleSize } from 'lodash'
import {Item, CollectionConfig} from '.'

export default class ItemCollection {
  private _index: string[] = []
  private _items: { [key: string]: Item } = {}

  constructor(readonly name: string, items: Item[]) {
    for(const item of items) {
      this._index.push(item.name)
      this._items[item.name] = item
    }
  }

  asArray() {
    return Object.keys(this._items).map(key => this._items[key])
  }
  pick(itemsPerCollection: number): ItemCollection {
    const items:Item[] = sampleSize(this.asArray(), itemsPerCollection)
    return new ItemCollection(this.name, items)
  }

  static async forge(name: string, config: CollectionConfig) {
    const items: Item[] = []
    for(const itemConfig of config) {
      items.push(await Item.forge(itemConfig))
    }
    return new ItemCollection(name, items)

  }


  // static async forge(collectionName: string) {
  //   const items: Item[] = [];
  //   const collectionConfig: CollectionConfig = (
  //     await import(`@/config/collections/${collectionName}.ts`)
  //   ).default;

  //   for (const itemConfig of collectionConfig) {
  //     const item = await Item.forge(itemConfig);
  //     items.push(item);
  //   }
  //   return new ItemCollection(collectionName, items);
  // }
}