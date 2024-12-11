import {useCallback} from "react";

import {createTab} from "@api/tabs";

import {useAnalytics} from "@analytics";

export const useOpenUrl = () => {
    const analytics = useAnalytics();

    const openUrl = useCallback((url: string) => {
        analytics.openUrl(url);

        setTimeout(() => {
            createTab({url, active: true}).catch(e => {
                console.log('Basic container handleClickInfo error', e);
            });
        }, 100);
    }, []);

    const handleOpenUrl = useCallback((url: string) => () => openUrl(url), []);

    return {openUrl, handleOpenUrl};
}
