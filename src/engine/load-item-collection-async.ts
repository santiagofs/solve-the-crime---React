import loadIcon from "./load-icon-async";
import { ItemCollection } from "./types";

const loadItemCollectionAsync = async (
  collectionName: string
): Promise<ItemCollection> => {
  const path = "../config/collections/" + collectionName + ".ts";
  try {
    const config: [string, string][] = await import(path).then(
      (module) => module.default
    );
    const ret: ItemCollection = {};
    for (const itemConfig of config) {
      const [name, iconPath] = itemConfig;
      const key = `${collectionName}.${name}`;
      const icon = await loadIcon(iconPath);
      ret[key] = {
        name,
        icon,
      };
    }
    return ret;
  } catch (e: unknown) {
    if (typeof e === "string") {
      console.warn(e);
    } else if (e instanceof Error) {
      console.error(e.message);
    } else {
      console.error(e);
    }

    throw new Error("Couldn't load collection: " + path);
  }
};

export default loadItemCollectionAsync;
