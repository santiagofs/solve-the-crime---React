import loadItemCollectionAsync from "./load-item-collection-async"
import { ItemCollection } from "./types"

describe('engine - load item collection', () => {

  it('fails if the file does not exists', async ()=> {
    await expect( loadItemCollectionAsync('dummies')).rejects.toThrow(Error)
  })

  it('loads an item collection', async() => {
    const collection = await loadItemCollectionAsync('heroes') as ItemCollection

    const collectionKeys = Object.keys(collection)
    expect(collectionKeys.indexOf('heroes.thor')).not.toBe(-1)
  })
})