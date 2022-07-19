import generateLevel from "./generate-level";
import { Level, LevelConfig } from "./types";

const createLevel = (config:LevelConfig):Level => {

  return generateLevel(2, 2, ['heroes.thor', 'villains.walter'])
}

export default createLevel