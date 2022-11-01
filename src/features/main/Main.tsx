import React from "react";

import { Map } from "../map/Map";
import { Scenario } from "../scenario/Scenario";

import { FullScreenButton } from "../../components/full-screen-button";
import { ExitButton } from "../../components/exit-button";
import { MapButton } from "../../components/map-button";
import { useDispatch, useSelector } from "react-redux";
import { viewsActions } from "../../store/views-slice";
import { RootState } from "../../store";

export function Main() {
  const dispatch = useDispatch();
  const mainView = useSelector((state: RootState) => state.views.main);

  return (
    <div>
      <header className="bg-amber-500 flex justify-between items-center py-2 px-4">
        <h1 className="text-white text-2xl">Hero Detective</h1>
        <div>
          {mainView !== "map" ? (
            <MapButton
              onClick={() => dispatch(viewsActions.setMainView("map"))}
            />
          ) : null}
          <FullScreenButton />
          <ExitButton
            onClick={() => dispatch(viewsActions.setAppView("splash"))}
          />
        </div>
      </header>
      {mainView === "map" ? <Map /> : <Scenario />}
      {/* { viewKey === 'map' ? <Map levelHandler={(ndx: number) => setViewKey(ndx)} /> : <Scenario levelId={viewKey}  backHandler={() =>  setViewKey('map')} /> } */}

      {/* {JSON.stringify(game)} */}
    </div>
  );
}
