import { useEffect, useState } from "react"

let appState= {}
let listeners:Function[] = []
let appActions:{[actionId:string]: Function} = {}

export const useStore = () => {
  const setState = useState(appState)[1]

  const dispatch = (actionId:string) => {
    const newState = appActions[actionId](appState)
    appState = {...appState, ...newState}

    for (const listener of listeners) {
      listener(appState)
    }
  }
  useEffect(() => {
    listeners.push(setState)
    return () => {
      listeners = listeners.filter(listener => listener !== setState)
    }
  }, [setState])

  return {appState, dispatch}
}

export const initStore = (state = {}, actions = {}):void => {
  appState = {...appState, ...state}
  appActions = {...appActions, ...actions}
}