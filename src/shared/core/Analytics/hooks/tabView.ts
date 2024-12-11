import {useEffect} from "react";

import {useAnalytics} from "../context";

import Tab = chrome.tabs.Tab;

export const useTabView = (name: string, tab?: Tab, title: string = "Title"): void => {
    const analytics = useAnalytics();

    useEffect(() => {
        if (!tab) {
            return;
        }

        analytics.getProvider().setTab(tab);

        const {url, title: _title = title} = tab;

        if (!url) {
            return;
        }

        analytics.pageView(name, url, _title);
    }, [name, tab?.id]);
}
