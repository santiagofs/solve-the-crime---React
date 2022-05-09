import { Axis, Distance } from ".";
import Item from "./item";

export type RuleItem = {
  col: number;
  row: number;
  item: Item
}

export default class Rule {
  readonly axis: Axis = 'cols'
  readonly distance: Distance = 0
  constructor(readonly itemA:RuleItem, readonly itemB:RuleItem) {
    
  }

}

// import _ from "lodash";



// export type RuleItem = {
//   x: number;
//   y: number;
//   name: string;
// };

// export default class Rule {
//   a: string;
//   b: string;
//   axis: Axis;
//   distance: Distance = 0;

//   constructor(a: RuleItem, b: RuleItem) {
//     this.axis =
//       a.x === b.x // in the same column?
//         ? "y" // measure the distant in rows
//         : ((a.y === b.y // in the same row?
//             ? "x" // measure the distant in columns
//             : _.sample(["y", "x"])) as Axis); // choose any

//     const distance = b[this.axis] - a[this.axis];

//     [this.a, this.b] = distance >= 0 ? [a.name, b.name] : [b.name, a.name];
//     const options: Distance[] = [Math.abs(distance)];
//     if (distance !== 0) options.push("?");
//     this.distance = _.sample(options) as Distance; //  // _.sample([ Math.abs(distanc

//     // [this.a, this.b] = distance >= 0 ? [a.item, b.item] : [b.item, a.item];
//   }
// }
