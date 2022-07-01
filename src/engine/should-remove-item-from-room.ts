import { Board, Rule } from "./types"

const shouldRemoveItemsFromRoom = (board:Board, rule: Rule):[boolean, boolean]  => {
  // if distance is 0, rows or cols should be the same for A and B

  // if distance is masked, we can only trim the borders

  // if distance is not masked, both A and B should be present. If one is missing remove the other

  return [false, false]
}

export default shouldRemoveItemsFromRoom