import {DefaultState, StateReducer} from "../context";

import {Actions, Payload, Types} from "./types";
import loadingReducer from "./loading";
import tabReducer from "./tab";

const reducer: StateReducer = (state, action) => {
    return {
        ...state,
        loading: loadingReducer(state.loading, action, state),
        tab: tabReducer(state.tab, action, state),
    };
};

export {Actions, Types, Payload, DefaultState};

export default reducer;
