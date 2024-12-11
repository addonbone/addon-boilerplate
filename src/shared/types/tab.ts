import Tab = chrome.tabs.Tab;

export interface TabAccessible {
    getTab(): Tab | undefined;

    setTab(tab: Tab): TabAccessible;
}
