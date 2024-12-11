import {Types} from "./types";
import {ChildReducer} from "../context";

const loadingReducer: ChildReducer<boolean | undefined> = (loading, action) => {
    switch (action.type) {
        case Types.Loading:
            return action.payload;

        case Types.Reset:
            return false;
    }

    return loading;
}

export default loadingReducer;
