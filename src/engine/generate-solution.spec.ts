import generateSolution from "./generate-solution"
import { CoordMap } from "./types"

describe('engine - generate solution', () => {
  it('generates a solution', () => {
    const items = ['thor', 'walter', 'batman']

    const solution:CoordMap = generateSolution(2, 2, items)
    const solutionKeys = Object.keys(solution)
    expect(solutionKeys).toContain('thor')
    expect(solutionKeys).toContain('walter')
    expect(solutionKeys).toContain('batman')

    expect(solution['thor'].length).toEqual(1)
    expect(solution['thor'][0]).toHaveProperty('col')
    expect(solution['thor'][0]).toHaveProperty('row')

    expect(solution['walter'].length).toEqual(1)
    expect(solution['batman'].length).toEqual(1)

    const cols:number[] = [solution['thor'][0].col, solution['walter'][0].col, solution['batman'][0].col]
    const rows:number[] = [solution['thor'][0].row, solution['walter'][0].row, solution['batman'][0].row]
    expect(cols).toContain(0)
    expect(cols).toContain(1)
    expect(rows).toContain(0)
    expect(rows).toContain(1)


  })
})