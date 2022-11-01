import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ItemIcon from "../../components/item-icon";
import { Rule } from "../../engine/types";
import { RootState } from "../../store";
import { getItemsStatus } from "../../store/game-slice";

type CellProps = {
  itemKeys: string[];
  handleClick: (itemKey: string, remove?: boolean) => void;
};

// const cellClassnames: { [ndx: string]: string } = {
//   w1: "w-full",
//   w2: "w-1/2",
//   w3: "w-1/3",
//   w4: "w-1/4",
//   h1: "h-full",
//   h2: "h-1/2",
//   h3: "h-1/3",
//   h4: "h-1/4",
// };

const gridClasnames: { [ndx: string]: string } = {
  w1: "grid-cols-1",
  w2: "grid-cols-2",
  w3: "grid-cols-3",
  w4: "grid-cols-4",
};

const Cell = ({ itemKeys, handleClick }: CellProps) => {
  const [cols, setCols] = useState(2);
  const itemsStatus: Record<string, boolean> = useSelector(getItemsStatus);
  const selectedRule: Rule | null = useSelector(
    (state: RootState) => state.game.selectedRule
  );
  const selectedItems = selectedRule ? [selectedRule.a, selectedRule.b] : [];

  useEffect(() => {
    const cols = Math.ceil(Math.sqrt(itemKeys.length));
    setCols(cols);
  }, []);

  const handleSelect = (e: React.MouseEvent<HTMLElement>, itemKey: string) => {
    e.preventDefault();
    handleClick(itemKey);
  };
  const handleRemove = (e: React.MouseEvent<HTMLElement>, itemKey: string) => {
    e.preventDefault();
    handleClick(itemKey, true);
  };

  // const wClassname = cellClassnames["w" + cols];
  // const hClassname = cellClassnames["h" + cols];
  const gridClasssName = ["grid", gridClasnames["w" + cols]].join(" ");
  const itemClassNames = [
    "aspect-square p-4 m-2  rounded border-4 border-solid",
  ];
  console.log(selectedItems);
  return (
    <div className={gridClasssName}>
      {itemKeys.map((itemKey) => {
        return (
          <button
            className={[
              ...itemClassNames,
              itemsStatus[itemKey] && "bg-green-200",
              selectedItems.includes(itemKey) && "border-amber-500",
            ].join(" ")}
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
