import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../store";
import { gameActions } from "../../store/game-slice";
import { viewsActions } from "../../store/views-slice";

import LivesDisplay from "../../components/lives-display";
import TextButton from "../../components/text-button";

import Board from "./Board";
import Rules from "./Rules";

export function Scenario() {
  const dispatch = useDispatch();
  const mistakes = useSelector((state: RootState) => state.game.mistakes);
  const solution = useSelector(
    (state: RootState) => state.game.level?.solution
  );
  const board = useSelector((state: RootState) => state.game.level?.board);
  const currentLevel = useSelector(
    (state: RootState) => state.game.currentLevel
  );
  const nextLevel = useSelector((state: RootState) => state.game.nextLevel);
  const showMistakeDialog = useSelector(
    (state: RootState) => state.game.showMistakeDialog
  );
  const gameStatus = useSelector((state: RootState) => state.game.status);

  useEffect(() => {
    if (mistakes === 0 || mistakes > 2) return;
    let timeout: number;
    dispatch(gameActions.showMistakeDialog(true));
    timeout = window.setTimeout(
      () => dispatch(gameActions.showMistakeDialog(false)),
      1000
    );
    return () => clearTimeout(timeout);
  }, [dispatch, mistakes]);

  return (
    <div>
      <div className="flex h-[calc(100vh-50px)]">
        <div className="flex-grow flex h-full justify-center p-10">
          {board && solution && <Board board={board} solution={solution} />}
        </div>
        <div className="w-[300px] bg-stone-400">
          {<LivesDisplay errors={mistakes} />}
          <Rules />
        </div>

        <dialog
          className="p-10 border-solid border-red-500 border-2 rounded-md text-center font-bold shadow-md"
          open={showMistakeDialog}
        >
          <h1 className="text-red-600 text-2xl">
            Oh No!!!!! <br /> that wasn't right
          </h1>
        </dialog>

        <dialog
          className="p-10 border-solid border-red-500 border-2 rounded-md text-center font-bold shadow-md"
          open={gameStatus === "loose"}
        >
          <h1 className="text-red-600 text-2xl">You Loose!!</h1>
          <div>
            <TextButton
              action={() => dispatch(viewsActions.setMainView("map"))}
            >
              Go To Map
            </TextButton>{" "}
            <TextButton
              className="bg-amber-600 text-white font-bold"
              action={() => dispatch(gameActions.createLevel(currentLevel))}
            >
              Restart
            </TextButton>
          </div>
        </dialog>

        <dialog
          className="p-10 border-solid border-amber-500 border-2 rounded-md text-center font-bold shadow-md"
          open={gameStatus === "win"}
        >
          <h1 className="text-red-600 text-2xl">Congratulations! You Win!!</h1>
          <div>
            <TextButton
              action={() => dispatch(viewsActions.setMainView("map"))}
            >
              Go To Map
            </TextButton>{" "}
            <TextButton
              className="bg-amber-600 text-white font-bold"
              action={() => dispatch(gameActions.createLevel(nextLevel))}
            >
              Next Level
            </TextButton>
          </div>
        </dialog>
      </div>
    </div>
  );
}
