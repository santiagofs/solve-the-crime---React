import { sample } from "lodash";
import { Axis, Distance } from ".";

export type RuleItem = {
  col: number;
  row: number;
  key: string
}

export default class Rule {
  readonly axis: Axis = 'col'
  readonly distance: Distance
  readonly a:string
  readonly b:string

  constructor( a:RuleItem, b:RuleItem) {
    this.axis =
      a.col === b.col // in the same column?
          ? "row" // measure the distant in rows
          : (a.row === b.row // in the same row?
              ? "col" // measure the distant in columns
              : sample(["row", "col"]) as Axis); // choose any

    const distance = b[this.axis] - a[this.axis];

    [this.a, this.b] = distance >= 0 ? [a.key, b.key] : [b.key, a.key];

    const distanceOptions: Distance[] = [Math.abs(distance)];
    if (distance !== 0) distanceOptions.push("?");
    this.distance = sample(distanceOptions) as Distance;
  }
}
