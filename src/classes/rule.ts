import { sample } from "lodash";
import { Axis, Distance } from ".";

export type RuleItem = {
  col: number;
  row: number;
  key: string
}

export default class Rule {
  readonly axis: Axis = 'col'
  readonly sameOtherAxis: boolean
  readonly distance: Distance
  readonly a:string
  readonly b:string

  constructor( a:RuleItem, b:RuleItem) {
    if (a.col === b.col) {
      this.axis = 'row'
      this.sameOtherAxis = true
    } else if (a.row === b.row) {
      this.axis = 'col'
      this.sameOtherAxis = true
    } else {
      this.axis = sample(["row", "col"]) as Axis
      this.sameOtherAxis = false
    }

    const distance = b[this.axis] - a[this.axis];

    [this.a, this.b] = distance >= 0 ? [a.key, b.key] : [b.key, a.key];

    const distanceOptions: Distance[] = [Math.abs(distance)];
    // if (distance !== 0) distanceOptions.push("?");
    this.distance = sample(distanceOptions) as Distance;
  }
}
