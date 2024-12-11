import {createContext, useContext} from "react";

import Analytics from "@services/analytics";

export type AnalyticsContract = Analytics;

export const DefaultAnalytics = new Analytics();

export const AnalyticsContext = createContext<AnalyticsContract>(DefaultAnalytics);

export const useAnalytics = () => useContext(AnalyticsContext);
