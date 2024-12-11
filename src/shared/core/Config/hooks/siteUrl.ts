import {useCallback} from "react";

import {useConfig} from "@config";
import {getSiteUrl} from "@services/config";

export type SiteUrlCallback = (campaign?: string, medium?: string, source?: string) => string;

export const useSiteUrl = (): SiteUrlCallback => {
    const config = useConfig();

    return useCallback((campaign?: string, medium?: string, source?: string) => {
        return getSiteUrl(config, campaign, medium, source);
    }, [config]);
}