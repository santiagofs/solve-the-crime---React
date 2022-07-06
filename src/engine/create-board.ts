import { Board } from "./types";

const createBoard = (cols:number, rows:number, items:string[]):Board => {
  let ret:Board = []
  for(let y=0; y < rows; y++) {
    ret[y] = []
    for (let x=0; x < cols; x++) {
      ret[y][x] = [...items]
    }
  }
  return ret
}

export default createBoard