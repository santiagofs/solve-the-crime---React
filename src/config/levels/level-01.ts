import { LevelConfig } from "../../engine/types"

export default {
  number: 1,
  collections: ['heroes', 'villains'],
  itemsPerCollection: 2,
  boardSize: { cols: 2, rows: 2 },
} as LevelConfig;