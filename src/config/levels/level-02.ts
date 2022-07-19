import { LevelConfig } from "../../engine/types"

export default {
  number: 2,
  collections: ['heroes', 'villains'],
  itemsPerCollection: 3,
  boardSize: { cols: 3, rows: 3 },
} as LevelConfig;