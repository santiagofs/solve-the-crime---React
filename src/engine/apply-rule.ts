import { cloneDeep } from "lodash";
import applySameAxis from "./apply-same-axis";
import applyTrim from "./apply-trim";
import applyVector from "./apply-vector";
import { Board, Rule } from "./types";

const applyRule = (board:Board, rule:Rule):Board => {
  let ret:Board = cloneDeep(board)


  if(rule.distanceMask === false || (rule.distance.cols === 0 && rule.distance.rows === 0)) {
    // if distance is not masked or both distance axis equal 0, we can just apply a vector removing out of board bounds items or items without pair correlation
    ret = applyVector(ret, rule.distance, rule.a, rule.b)
  } else {
    // if distance is 0, rows or cols should be the same for A and B
    if(rule.distance.cols === 0 || rule.distance.rows === 0) {
      ret = applySameAxis(ret, rule)
    }
    // as distance is masked, we can only trim the borders
    ret = applyTrim(ret, rule)
  }
  return ret
}

export default applyRule