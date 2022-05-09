import { ItemConfig } from ".";

// Items are anything that can be found in a room: a hero, a villain, a weapon, a motive, etc...

export default class Item {
  constructor(readonly name: string, readonly icon: string) {}

  static async forge(config: ItemConfig) {
    const icon: string = await import("../assets/icons/" + config[1]).then(
      (module) => module.default
    );
    return new Item(config[0], icon);
  }

  clone() {
    return new Item(this.name, this.icon);
  }
}

