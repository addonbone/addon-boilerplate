import {Types} from "./types";
import {ChildReducer} from "../context";

import Tab = chrome.tabs.Tab;

const tabReducer: ChildReducer<Tab | undefined> = (tab, action) => {
    switch (action.type) {
        case Types.Reset:
            return action.payload.tab;

        case Types.UpdateTab:
            return action.payload;
    }

    return tab;
}

export default tabReducer;
