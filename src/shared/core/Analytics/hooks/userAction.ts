import {useCallback} from "react";

import {useAnalytics} from "../context";

export const useUserAction = () => {
    const analytics = useAnalytics();

    return useCallback((name: string) => () => {
        analytics.userAction(name);
    }, [analytics]);
};
