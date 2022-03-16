import { IRootReducer } from "../reducers";

export const getModelLoadedPercent = (state:IRootReducer) => state.bootstrap.modelLoadedPercent;
export const getTerminalAnimationComplete = (state:IRootReducer) => state.bootstrap.terminalAnimationComplete;