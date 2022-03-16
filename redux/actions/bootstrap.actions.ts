import { EBootstrapActions, ISetModelLoadedPercent, ISetTerminalAnimationComplete } from "../constants/bootstrap.constant";

export const setModelLoadedPercent = (payload:number) : ISetModelLoadedPercent => ({
    type: EBootstrapActions.SET_MODEL_LOADED_PERCENT,
    payload, 
});

export const setTerminalAnimationComplete = (payload:boolean) : ISetTerminalAnimationComplete => ({
    type: EBootstrapActions.SET_TERMINAL_ANIMATION_COMPLETE,
    payload, 
});