// import { sample } from "lodash";
import type { Distance } from ".";
export type RuleItem = {
  col: number;
  row: number;
  key: string
}

export type RuleDistance = {
  cols: Distance,
  rows: Distance
}

export default class Rule {
  readonly distance: RuleDistance
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


    // const distance = b[this.axis] - a[this.axis];

    // [this.a, this.b] = distance >= 0 ? [a.key, b.key] : [b.key, a.key];

    // const distanceOptions: Distance[] = [Math.abs(distance)];
    // // if (distance !== 0) distanceOptions.push("?");
    // this.distance = sample(distanceOptions) as Distance;
  }
}
