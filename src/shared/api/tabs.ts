import _isNumber from "lodash/isNumber";

import {app} from "./env";
import {getRuntimePort, RuntimePort, throwRuntimeError} from "./runtime";

import {MessageContract, MessageResponse} from "@typings/message";

import Tab = chrome.tabs.Tab;
import QueryInfo = chrome.tabs.QueryInfo;
import UpdateProperties = chrome.tabs.UpdateProperties;
import CreateProperties = chrome.tabs.CreateProperties;
import InjectDetails = chrome.tabs.InjectDetails;

const tabs = app().tabs;

export const queryTabs = (queryInfo?: QueryInfo) => new Promise<Tab[]>((resolve, reject) => {
    tabs.query(queryInfo || {}, (tabs) => {
        try {
            throwRuntimeError();

            resolve(tabs);
        } catch (e) {
            reject(e);
        }
    });
});

export const queryTabIds = async (queryInfo?: QueryInfo): Promise<number[]> => (await queryTabs(queryInfo)).reduce((ids, {id}) => {
    if (_isNumber(id)) {
        return [...ids, id];
    }

    return ids;
}, [] as number[]);


export const findTab = (queryInfo?: QueryInfo) => queryTabs(queryInfo).then(tabs => tabs.length ? tabs[0] : undefined);

export const getTab = (tabId: number) => new Promise<Tab | undefined>(resolve => {
    tabs.get(tabId, (tab) => {
        try {
            throwRuntimeError();

            resolve(tab);
        } catch (e) {
            resolve(undefined);
        }
    });
});

export const getTabUrl = async (tabId: number): Promise<string> => {
    const tab = await getTab(tabId);

    if (!tab) {
        throw new Error(`Tab id "${tabId}" not exist`);
    }

    const {url} = tab;

    if (!url) {
        throw new Error(`URL not exist by tab id ${tabId}`);
    }

    return url;
}

export const updateTab = (tabId: number, updateProperties: UpdateProperties) => new Promise<Tab | undefined>((resolve, reject) => {
    tabs.update(tabId, updateProperties, (tab) => {
        try {
            throwRuntimeError();

            resolve(tab);
        } catch (e) {
            reject(e);
        }
    });
});

export const updateTabAsSelected = (tabId: number) => updateTab(tabId, {highlighted: true});

export const reloadTab = (tabId: number, bypassCache?: boolean | undefined) => new Promise<void>((resolve, reject) => {
    tabs.reload(tabId, {bypassCache}, () => {
        try {
            throwRuntimeError();

            resolve();
        } catch (e) {
            reject(e);
        }
    });
});

export const getCurrentTab = (): Promise<Tab> => queryTabs({
    active: true,
    currentWindow: true
}).then(tabs => {
    if (!tabs || !tabs[0]) {
        throw new Error('Tab not found');
    }

    return tabs[0];
});

export const createTab = (properties: CreateProperties): Promise<Tab> => new Promise<Tab>((resolve, reject) => {
    tabs.create(properties, (tab) => {
        try {
            throwRuntimeError();

            resolve(tab);
        } catch (e) {
            reject(e);
        }
    });
});

export const openOrCreateTab = async (tab: Tab): Promise<void> => {
    const {id, url} = tab;

    if (id && url) {
        const existTab = await findTab({url});

        if (existTab && id && existTab.id === id) {
            await updateTabAsSelected(id);

            return;
        }
    }

    await createTab({url});
}

export const removeTab = (tabId: number): Promise<void> => new Promise<void>((resolve, reject) => {
    tabs.remove(tabId, () => {
        try {
            throwRuntimeError();

            resolve();
        } catch (e) {
            reject(e);
        }
    });
});

export const createTabPort = (tabId: number, frameId?: number, name?: string): RuntimePort => {
    const port = tabs.connect(tabId, {frameId, name});

    return getRuntimePort(port);
}

export const sendMessageTab = <M extends MessageContract = MessageContract, R = MessageResponse[M['type']]>(tabId: number, message: M, frameId: number = 0) => new Promise<R>((resolve, reject) => {
    tabs.sendMessage<M, R>(tabId, message, {frameId}, (response) => {
        try {
            throwRuntimeError();

            resolve(response);
        } catch (e) {
            reject(e);
        }
    });
});

export const executeScriptTab = (tabId: number, details: InjectDetails) => new Promise<any[]>((resolve, reject) => {
    tabs.executeScript(tabId, details, (result) => {
        try {
            throwRuntimeError();

            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
});

export const onTabRemoved = (callback: Parameters<typeof chrome.tabs.onRemoved.addListener>[0]): Function => {
    tabs.onRemoved.addListener(callback);

    return () => tabs.onRemoved.removeListener(callback);
};

export const onTabCreated = (callback: Parameters<typeof chrome.tabs.onCreated.addListener>[0]): Function => {
    tabs.onCreated.addListener(callback);

    return () => tabs.onCreated.removeListener(callback);
}

export const onTabUpdated = (callback: Parameters<typeof chrome.tabs.onUpdated.addListener>[0]): Function => {
    tabs.onUpdated.addListener(callback);

    return () => tabs.onUpdated.removeListener(callback);
}

export const onTabActivated = (callback: Parameters<typeof chrome.tabs.onActivated.addListener>[0]): Function => {
    tabs.onActivated.addListener(callback);

    return () => tabs.onActivated.removeListener(callback);
}
