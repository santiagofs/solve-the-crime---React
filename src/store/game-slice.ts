import { createSlice, createSelector, current } from "@reduxjs/toolkit";
import { Level, Rule } from "../engine/types";
import gameConfig from "../config";
import createLevel from "../engine/create-level";
import removeItemFromBoard from "../engine/remove-item-from-board";
import { isEqual } from "lodash";
import boardAsCoordinatesMap from "../engine/board-as-coordinates-map";
import { RootState } from ".";

export type GameState = {
  levels: { id: number; solved: boolean; elapsedTime: number }[];
  level: Level | null;
  mistakes: number;
  startTime: number;
  endTime: number;
  elapsedTime: number;
  currentLevel: number;
  nextLevel: number;
  showMistakeDialog: boolean;
  status: "progress" | "win" | "loose";
  selectedRule: Rule | null;
};

const initialState: GameState = {
  levels: gameConfig.levels.map((level, ndx) => ({
    id: ndx + 1,
    solved: false,
    elapsedTime: 0,
  })),
  level: null,
  mistakes: 0,
  startTime: 0,
  endTime: 0,
  elapsedTime: 0,
  currentLevel: -1,
  nextLevel: 1,
  showMistakeDialog: false,
  status: "progress",
  selectedRule: null,
};

const checkLevelStatus = (state: GameState) => {
  console.log(state.levels, JSON.stringify(state.levels));
  if (
    isEqual(boardAsCoordinatesMap(state.level!.board), state.level!.solution)
  ) {
    state.status = "win";
    const level = state.levels.find((l) => l.id === state.currentLevel)!;
    level.solved = true;
    const nextLevel = state.levels.find((l) => !l.solved);
    state.nextLevel = nextLevel ? nextLevel.id : 0;
  }
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    addError(state) {
      state.mistakes++;
      if (state.mistakes === 3) state.status = "loose";
    },
    createLevel(state, { payload }: { payload: number }) {
      state.selectedRule = null;
      state.currentLevel = payload;
      const config = gameConfig.levels.find(
        (level) => level.number === payload
      )!;
      state.level = createLevel(config, gameConfig.collectionKeys);
      state.mistakes = 0;
      state.status = "progress";
    },
    removeFromBoard(state, action) {
      const { col, row, itemKey } = action.payload;

      if (!state.level?.board) return;
      state.level.board = removeItemFromBoard(
        state.level.board,
        col,
        row,
        itemKey
      );
      checkLevelStatus(state);
    },
    selectItem(state, action) {
      const { col, row, itemKey } = action.payload;
      if (!state.level?.board) return;
      for (let y = 0; y < state.level.board.length; y++) {
        for (let x = 0; x < state.level.board[y].length; x++) {
          if (row !== y || col !== x) {
            console.log(x, y, state.level.board, itemKey);
            state.level.board = removeItemFromBoard(
              state.level.board,
              x,
              y,
              itemKey
            );
          }
        }
      }
      checkLevelStatus(state);
    },
    showMistakeDialog(state, action) {
      if (state.mistakes === 3) return; // already loose
      state.showMistakeDialog = action.payload;
    },
    selectRule(state, action) {
      state.selectedRule =
        state.selectedRule && current(state.selectedRule) === action.payload
          ? null
          : action.payload;
    },
  },
});

export const getBoardAsCoordinatesMap: any = createSelector(
  (state: RootState) => state.game.level?.board,
  (board) => {
    if (!board) return undefined;
    return boardAsCoordinatesMap(board);
  }
);

export const getActiveRules = createSelector(
  (state: RootState) => ({
    coordMap: getBoardAsCoordinatesMap(state),
    rules: state.game.level?.rules,
  }),
  ({ coordMap, rules }) => {
    if (!coordMap || !rules) return [];
    return rules.filter((rule) => {
      const solved =
        coordMap[rule.a].length === 1 && coordMap[rule.b].length === 1;
      console.log(solved);
      return !solved;
    });
  }
);
export const getItemsStatus: any = createSelector(
  (state: RootState) => getBoardAsCoordinatesMap(state),
  (coordMap) => {
    if (!coordMap) return {};
    return Object.keys(coordMap).reduce((reducer, key) => {
      reducer[key] = coordMap[key].length === 1;
      return reducer;
    }, {} as Record<string, boolean>);
  }
);
export const gameActions = gameSlice.actions;

export default gameSlice;
