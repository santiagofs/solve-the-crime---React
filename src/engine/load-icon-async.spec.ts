import loadIcon from "./load-icon-async"

describe('engine - load icon', () => {

  it('fails if the file does not exists', async ()=> {
    await expect( loadIcon('heroes/not-thor.svg')).rejects.toThrow(Error)
  })

  it('loads the icon file', async ()=> {
    const icon = await loadIcon('heroes/thor.svg')
    expect(icon).toBe('thor.svg')
  })

})