import React, {useCallback, useEffect, useReducer, useRef} from "react";

import {isPlatform} from "@api/env";
import {getCurrentTab, onTabActivated, onTabUpdated} from "@api/tabs";

import {StoreContext} from "./context";

import reducer, {DefaultState, Types} from "./reducer";

import {useTheme} from "@theme";
import {useTabView} from "@analytics";

import {Mode} from "@typings/theme";
import {Platform} from "@typings/env";
import {FC} from "@typings/react";

import Tab = chrome.tabs.Tab;

const Provider: FC = ({children}) => {
    const [state, dispatch] = useReducer(reducer, DefaultState);
    const {tab, loading} = state;

    const {mode} = useTheme();

    const currentTab = useRef<Tab | undefined>(tab);

    const fetchData = useCallback(async () => {
        const tab = currentTab.current = await getCurrentTab();

        //

        if (tab.url !== currentTab.current?.url) {
            console.log('Store Provider fetch skip', tab.url, currentTab.current?.url);

            return;
        }

        dispatch({
            type: Types.Reset,
            payload: {tab},
        });
    }, []);


    useEffect(() => {
        fetchData().catch(e => {
            console.log('Store Provider fetch data error', e);
        });

        const callback = (): void => {
            dispatch({type: Types.Loading, payload: true});

            fetchData().catch(e => {
                dispatch({type: Types.Loading, payload: false});

                console.log('Store Provider update tab with fetch data error', e);
            }).finally(() => {

            });
        }

        const unsubscribeTabActivated = onTabActivated(callback);

        const unsubscribeTabUpdated = onTabUpdated((_, changeInfo) => {
            const {status, url} = changeInfo;

            if (status === 'loading' && !!url) {
                callback();
            }
        });

        return () => {
            unsubscribeTabActivated();
            unsubscribeTabUpdated();
        }
    }, []);

    useTabView("popup", tab, "Popup");

    return (
        <StoreContext.Provider value={{state, dispatch}}>
            {children}
        </StoreContext.Provider>
    );
};

Provider.displayName = "StoreProvider";

export default Provider;
