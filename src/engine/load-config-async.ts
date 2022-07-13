import loadItemCollectionAsync from "./load-item-collection-async"
import { Game, ItemCollections } from "./types"


const loadConfigAsync = async ():Promise<Game> => {
  const config = await import('../config/game').then(module => module.default)
  const  collections:ItemCollections = {}

  for(const collectionName of config.collections) {
    collections[collectionName] = await loadItemCollectionAsync(collectionName)
  }
  return {
    collections
  }
}

export default loadConfigAsync