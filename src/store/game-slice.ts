import { createSlice, createSelector } from "@reduxjs/toolkit";
import { Level } from "../engine/types";
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

      if (
        isEqual(boardAsCoordinatesMap(state.level.board), state.level.solution)
      ) {
        state.status = "win";
        const level = state.levels.find((l) => (l.id = state.currentLevel))!;
        level.solved = true;
        const nextLevel = state.levels.find((l) => !l.solved)!.id;
        console.log(nextLevel);
        state.nextLevel = nextLevel;
      }

      // isEqual(boardAsCoordinatesMap(tmp), solution)
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
      if (
        isEqual(boardAsCoordinatesMap(state.level.board), state.level.solution)
      ) {
        state.status = "win";
        const level = state.levels.find((l) => (l.id = state.currentLevel))!;
        level.solved = true;
        const nextLevel = state.levels.find((l) => !l.solved)!.id;
        console.log(nextLevel);
        state.nextLevel = nextLevel;
      }
    },
    showMistakeDialog(state, action) {
      if (state.mistakes === 3) return; // already loose
      state.showMistakeDialog = action.payload;
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
export const gameActions = gameSlice.actions;

export default gameSlice;
