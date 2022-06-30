import getVectorDirection from "./get-vector-direction"


describe('engine - get vector direction', () => {
  it('gets the direction of a vector', () => {

    expect(getVectorDirection({cols: 0, rows: 5})).toEqual([0, 1])

    expect(getVectorDirection({cols: 4, rows: 4})).toEqual([1, 1])

    expect(getVectorDirection({cols: -2, rows: 3})).toEqual([-1, 1])

    expect(getVectorDirection({cols: 0, rows: 0})).toEqual([0, 0])

    expect(getVectorDirection({cols: 3, rows: 0})).toEqual([1, 0])

    expect(getVectorDirection({cols: -3, rows: 0})).toEqual([-1, 0])

    expect(getVectorDirection({cols: 0, rows: -4})).toEqual([0, -1])

    expect(getVectorDirection({cols: 4, rows: -3})).toEqual([1, -1])

    expect(getVectorDirection({cols: -4, rows: -2})).toEqual([-1, -1])

  })

})