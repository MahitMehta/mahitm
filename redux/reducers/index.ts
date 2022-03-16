import { combineReducers } from "redux";
import { bootstrapeReducer, IBootstrapeReducer } from "./bootstrap.reducer";

export interface IRootReducer {
    bootstrap: IBootstrapeReducer,
}

const rootReducer = (state:any={}, action:any) => {
    switch(action.type) {
        default: return state;
    }
};

const reducer = combineReducers({
    "root": rootReducer,
    "bootstrap": bootstrapeReducer,
})

export default reducer;