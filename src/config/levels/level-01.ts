import type { LevelConfig } from '../../classes'

export default {
  number: 1,
  collections: ['heroes', 'villains'],
  itemsPerCollection: 3,
  boundaries: { cols: 2, rows: 2 },
} as LevelConfig;