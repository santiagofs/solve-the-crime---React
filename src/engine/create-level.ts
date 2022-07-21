
import { sampleSize } from "lodash";
import generateLevel from "./generate-level";
import { Level, LevelConfig } from "./types";

const createLevel = (levelConfig:LevelConfig, collections:{[collectionName:string]:string[]}):Level => {
  const { collections: collectionNames, itemsPerCollection, boardSize} = levelConfig
  const allItemKeys: string[] = []

  for(const collectionName of collectionNames ) {
    const collection = collections[collectionName]
    const itemKeys = sampleSize(collection,itemsPerCollection)
    allItemKeys.push(...itemKeys)
  }
  return generateLevel(boardSize.cols, boardSize.rows, allItemKeys)
}

export default createLevel

// number: 1,
//   collections: ['heroes', 'villains'],
//   itemsPerCollection: 2,
//   boardSize: { cols: 2, rows: 2 },