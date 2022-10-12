import React, { useEffect, useState } from "react";
import ItemIcon from "../../components/item-icon";

type CellProps = {
  itemKeys: string[];
  handleClick: (itemKey: string, remove?: boolean) => void;
};

const cellClassnames: { [ndx: string]: string } = {
  w1: "w-full",
  w2: "w-1/2",
  w3: "w-1/3",
  w4: "w-1/4",
  h1: "h-full",
  h2: "h-1/2",
  h3: "h-1/3",
  h4: "h-1/4",
};

const Cell = ({ itemKeys, handleClick }: CellProps) => {
  const [cols, setCols] = useState(2);

  useEffect(() => {
    const cols = Math.ceil(Math.sqrt(itemKeys.length));
    console.log("itemKeys.length", itemKeys.length, cols);

    setCols(cols);
  }, [itemKeys.length]);

  const handleSelect = (e: React.MouseEvent<HTMLElement>, itemKey: string) => {
    e.preventDefault();
    handleClick(itemKey);
  };
  const handleRemove = (e: React.MouseEvent<HTMLElement>, itemKey: string) => {
    e.preventDefault();
    handleClick(itemKey, true);
  };

  const wClassname = cellClassnames["w" + cols];
  const hClassname = cellClassnames["h" + cols];
  const classNames = wClassname + " " + hClassname + "aspect-square p-5";
  return (
    <div className="flex flex-wrap">
      {itemKeys.map((itemKey) => {
        return (
          <button
            className={classNames}
            onClick={(e) => handleSelect(e, itemKey)}
            onContextMenu={(e) => handleRemove(e, itemKey)}
            key={itemKey}
          >
            <ItemIcon itemKey={itemKey} />
          </button>
        );
      })}
    </div>
  );
};

export default Cell;
