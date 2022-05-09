export type ItemConfig = [string, string] // name, icon
export type CollectionConfig = ItemConfig[]

export type LevelConfig = {
  number: number;
  collections: string[];
  itemsPerCollection: number;
  boundaries: { width: number; height: number };
};

export type Board<T> = T[][]

export {default as Game } from './game'
export {default as Item } from './item'