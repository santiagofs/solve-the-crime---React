import gameConfig from "../config"

type ItemIconProps = {
  itemKey:string
}
const ItemIcon = function({itemKey}: ItemIconProps) {
  const collectionKey = itemKey.split('.')[0]
  const item = gameConfig.collections[collectionKey][itemKey]

  return <img src={item.icon} alt={item.name} />
}

export default ItemIcon