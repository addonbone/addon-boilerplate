import React, {useEffect, useRef} from "react";

import {useConfig} from "@config";

import {AnalyticsContext, AnalyticsContract, DefaultAnalytics} from "./context";

import {FC} from "@typings/react";

const Provider: FC = ({children}) => {
    const analytics = useRef<AnalyticsContract>(DefaultAnalytics).current;

    const config = useConfig();

    useEffect(() => {
        try {
            analytics.setCredentialsFromConfig(config);
        } catch (e) {
            console.log('Analytics Provider set credentials error', e);
        }
    }, [config]);

    return (
        <AnalyticsContext.Provider value={analytics}>
            {children}
        </AnalyticsContext.Provider>
    )
}

Provider.displayName = "AnalyticsProvider";

export default Provider;
