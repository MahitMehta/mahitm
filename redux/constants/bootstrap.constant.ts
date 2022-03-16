export enum EBootstrapActions {
    SET_MODEL_LOADED_PERCENT = "SET_MODEL_LOADED_PERCENT",
    SET_TERMINAL_ANIMATION_COMPLETE = "SET_TERMINAL_ANIMATION_COMPLETE",
}

export interface ISetModelLoadedPercent {
    type: EBootstrapActions.SET_MODEL_LOADED_PERCENT,
    payload: number,
}

export interface ISetTerminalAnimationComplete {
    type: EBootstrapActions.SET_TERMINAL_ANIMATION_COMPLETE,
    payload: boolean,
}