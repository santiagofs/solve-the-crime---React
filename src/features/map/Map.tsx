import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import LevelButton from "./LevelButton";

export function Map() {
  const levels = useSelector((state: RootState) => state.game.levels);

  return (
    <div className="flex flex-wrap p-20 gap-20 h-[calc(100vh-50px)]">
      {levels.map((level, i) => (
        <LevelButton level={level} key={i} />
      ))}
    </div>
  );
}
