import type { LevelConfig } from '../../classes'

export default {
  number: 2,
  collections: ['heroes', 'villains'],
  itemsPerCollection: 3,
  boundaries: { cols: 3, rows: 3 },
} as LevelConfig;