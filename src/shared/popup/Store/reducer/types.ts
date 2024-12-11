import {StateContract} from "../context";

import {ActionPayload} from "@typings/action";

import Tab = chrome.tabs.Tab;

export enum Types {
    Reset = "RESET",
    UpdateTab = "UPDATE_TAB",
    Loading = "LOADING",
}

export type Payload = {
    [Types.Reset]: StateContract;
    [Types.UpdateTab]: Tab;
    [Types.Loading]: boolean;
};

export type Actions = ActionPayload<Payload>;
