import { LevelConfig } from "../../engine/types";

export default {
  number: 3,
  collections: ["heroes", "villains"],
  itemsPerCollection: 4,
  boardSize: { cols: 4, rows: 4 },
} as LevelConfig;
