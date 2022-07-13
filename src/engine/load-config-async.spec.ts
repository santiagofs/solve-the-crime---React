import loadConfigAsync from "./load-config-async"

describe('engine - load config', () => {
  it.skip('loads the configuration files', () => {
    const config = loadConfigAsync()
    expect(config).toBe(null)
  })
})