import React, {useCallback} from "react";
import {Optional} from "utility-types";

import {reloadTab} from "@api/tabs";
import {useConfig} from "@config";
import {useLocale} from "@locale";

import {useAnalytics} from "@analytics";

import {useStore} from "../../Store";

import Router, {RouterProps} from "../Screen/Router";
import {useOpenUrl} from "@hooks/openUrl";

import {FC} from "@typings/react";

export interface MainProps {
    router?: Optional<RouterProps>;
}

const Main: FC<MainProps> = (props) => {
    const {children, router = {}} = props;

    const analytics = useAnalytics();

    const {_} = useLocale();

    const config = useConfig();

    const {donateUrl, rateUrl, blogUrl} = config.get();

    const {handleOpenUrl, openUrl} = useOpenUrl();

    const {state, dispatch} = useStore();

    const {loading, tab} = state;

    const handleReload = useCallback(() => {
        const {id} = tab || {};

        if (!id) {
            return;
        }

        analytics.userAction("popup_reload_tab");

        reloadTab(id).catch(e => {
            console.log('Main container reload tab error', e);
        });
    }, [tab?.id]);

    const handleClickDonate = useCallback(() => {
        analytics.userAction("popup_donate");

        donateUrl && openUrl(donateUrl);
    }, [donateUrl]);

    return (
        <>
            {children}
            <Router
                {...router}
                loading={loading}
                onRequestReload={handleReload}
            />
        </>
    )
}

export default Main;
