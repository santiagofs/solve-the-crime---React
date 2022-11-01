import React from "react";
import { Grid, ItemCollections } from "../../classes";

type BoardProps = {
  grid: Grid<string[]>;
  collections: ItemCollections;
  clickHandler?: (key: string) => void;
};

export function Board({ grid, collections, clickHandler }: BoardProps) {
  const rows = grid.length;
  const cols = rows > 0 ? grid[0].length : 0;
  const dynamicCols = [
    "",
    "grid-cols-1",
    "grid-cols-2",
    "grid-cols-3",
    "grid-cols-4",
    "grid-cols-5",
    "grid-cols-6",
    "grid-cols-7",
    "grid-cols-8",
    "grid-cols-9",
    "grid-cols-10",
  ];
  const classNames = `grid ${dynamicCols[cols]} border-collapse border-4 border-slate-400 gap-4 max-w-[400px]`;

  return (
    <div className={classNames}>
      {grid.map((cols, rowIndex) => {
        return cols.map((itemKeys, colIndex) => {
          return (
            <div
              className="border-collapse border border-slate-400 grid grid-cols-2"
              key={colIndex}
            >
              {itemKeys?.map((itemKey) => {
                return <span>test</span>;
                // return <span key={itemKey} className={`${clickHandler && 'cursor-pointer' }`} onClick={() => clickHandler && clickHandler(createCellItemKey(rowIndex, colIndex, itemKey))}>
                //   <img src={collections.allItems[itemKey].icon} alt={collections.allItems[itemKey].name} />
                //   {collections.allItems[itemKey].name}
                //   </span>
              })}
            </div>
          );
        });
      })}
    </div>
  );
}
