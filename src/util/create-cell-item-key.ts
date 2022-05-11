export default function createCellItemKey (row:number, col:number, colletionItemKey:string) {
  return `${row}.${col}.${colletionItemKey}`
}