import { EBootstrapActions } from "../constants/bootstrap.constant";
import { IAction } from "../interfaces/action.interface";

export interface IBootstrapeReducer {
    modelLoadedPercent: number,
    terminalAnimationComplete: boolean,
}

const initialState:IBootstrapeReducer = {
    modelLoadedPercent: 0,
    terminalAnimationComplete: false,
}

const bootstrapeReducer = (state:IBootstrapeReducer = initialState, action:IAction) : IBootstrapeReducer => {
    switch(action.type) {
        case EBootstrapActions.SET_MODEL_LOADED_PERCENT: {
            return { ...state, modelLoadedPercent: action.payload };
        }
        case EBootstrapActions.SET_TERMINAL_ANIMATION_COMPLETE: {
            return { ...state, terminalAnimationComplete: action.payload };
        }
        default: {
            return state;
        }
    }
}

export { bootstrapeReducer };