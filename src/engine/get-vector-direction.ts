import { Direction, Vector } from "./types"

const getVectorDirection = (vector:Vector):[Direction, Direction] => {
  return [Math.sign(vector.cols) as Direction, Math.sign(vector.rows) as Direction]
}

export default getVectorDirection