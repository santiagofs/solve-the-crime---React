import Level01 from '../config/levels/level-01'
import createLevel from '../engine/create-level'

const collections = {
  'heroes': ['heroes.thor'],
  'villains': ['villains.walter']
}
describe('engine - create level', () => {
  it('creates a level - 1', () => {
    const level = createLevel(Level01, collections)
    expect(level).toHaveProperty('board')
    expect(level.board).toEqual([
      [['heroes.thor', 'villains.walter'], ['heroes.thor', 'villains.walter']],
      [['heroes.thor', 'villains.walter'], ['heroes.thor', 'villains.walter']]
    ])

    expect(level.solution.hasOwnProperty('heroes.thor')).toBe(true)
    const a = level.solution['heroes.thor'][0]
    const b = level.solution['villains.walter'][0]
    expect(Math.abs(b.row - a.row)).toEqual(1)
    expect(Math.abs(b.col - a.col)).toEqual(1)

    expect(level.rules.length).toEqual(1)
  })
})