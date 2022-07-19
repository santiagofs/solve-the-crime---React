import { useEffect, useState } from 'react'
import gameConfig from '../../config'

type CellProps = {
  itemKeys: string[],
  removeItem:(itemKey:string) => void
}

const cellClassnames:{[ndx:string]:string} = {
  'w2': 'w-1/2', 'w3': 'w-1/3', '4': 'w-1/4',
  'h2': 'h-1/2', 'h3': 'h-1/3', 'h4': 'h-1/4'
}

const Cell = ({itemKeys, removeItem}:CellProps) => {
  const [cols, setCols] = useState(2)

  useEffect(() => {
    setCols(Math.ceil(Math.sqrt(itemKeys.length)))
  }, [])

  const wClassname = cellClassnames['w'+cols]
  const hClassname = cellClassnames['h'+cols]
  const classNames = wClassname + ' ' + hClassname + 'aspect-square p-5'
  return <div className="flex flex-wrap">
    {itemKeys.map( itemKey => {
      const collectionKey = itemKey.split('.')[0]
      const item = gameConfig.collections[collectionKey][itemKey]
      return <button className={classNames} onClick={() => removeItem(itemKey)} key={itemKey}>
        <img src={item.icon} alt={item.name} />
      </button>
    })}
  </div>
}

export default Cell