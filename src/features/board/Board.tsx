import React from 'react';
import { Game, Grid, ItemCollections } from '../../classes';

export function Board({grid, collections}: {grid: Grid<string[]>, collections: ItemCollections}) {
  const rows = grid.length
  const cols = rows > 0 ? grid[0].length : 0
  const dynamicCols = ['', 'grid-cols-1', 'grid-cols-2', 'grid-cols-3', 'grid-cols-4', 'grid-cols-5', 'grid-cols-6', 'grid-cols-7', 'grid-cols-8', 'grid-cols-9', 'grid-cols-10']
  const classNames = `grid ${dynamicCols[cols]} border-collapse border border-slate-400 gap-4 max-w-[400px]`
  console.log('boarding')
  grid.map(row => {
    console.log(row)
    return row
  })
  return (
    <>
      <h3>The Board</h3>
      <div className={classNames}>
        {grid.map((cols, rowIndex) => {
          return  cols.map(itemKeys => {
            return <div className='border-collapse border border-slate-400 grid grid-cols-2'>{itemKeys?.map(itemKey => {
              return <span>
                <img src={collections.allItems[itemKey].icon} />
                {collections.allItems[itemKey].name}
                </span>
            })}</div>
          })
        })}
      </div>
    </>
  );
}
