export type RuleItem = {
  col: number;
  row: number;
  key: string
}

export type Vector = {
  cols: number,
  rows: number
}

export default class Rule {
  readonly distance: Vector
  readonly distanceMask: boolean
  readonly a:string
  readonly b:string

  constructor( a:RuleItem, b:RuleItem) {
    const [A, B] = a.col < b.col ? [a, b] : (a.col > b.col ? [b, a] : (a.row < b.row ? [a, b]: [b, a]))
    this.distance = {
      cols: B.col - A.col,
      rows: B.row - A.row
    }
    /** TODO: add option for "?" */
    this.a = A.key
    this.b = B.key

    const maskChance = Math.random() * 4; // probably should add a parameter with the expected dificulty
    this.distanceMask = maskChance !== 0

  }
}
