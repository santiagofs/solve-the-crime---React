import applyVector from "./apply-vector";
import { Board, Rule } from "./types";

const applyRule = (board:Board, rule:Rule):Board => {
  let ret:Board


  if(rule.distanceMask === false || (rule.distance.cols === 0 && rule.distance.rows === 0)) {
    // if distance is not masked or both distance axis equal 0, we can just apply a vector removing out of board bounds items or items without pair correlation
    ret = applyVector(board, rule.distance, rule.a, rule.b)
  } else {
    // if distance is 0, rows or cols should be the same for A and B
    // if distance is masked, we can only trim the borders
    ret = board
  }
  return ret
}

export default applyRule