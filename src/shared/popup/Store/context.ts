import {createContext, Dispatch, Reducer, useContext} from "react";

import {Actions} from "./reducer";
import Tab = chrome.tabs.Tab;

export type StateContract = {
    loading?: boolean;
    tab?: Tab;
};

export interface StoreContract {
    state: StateContract;
    dispatch: Dispatch<Actions>;
}

export type StateReducer = Reducer<StateContract, Actions>;

export type ChildReducer<S> = (prevState: S, action: Actions, state: StateContract) => S;

export const DefaultState: StateContract = {
    loading: true,
}

export const StoreContext = createContext<StoreContract>({
    state: DefaultState,
    dispatch: () => null,
});

StoreContext.displayName = "StoreContext";

export const useStore = () => useContext(StoreContext);
