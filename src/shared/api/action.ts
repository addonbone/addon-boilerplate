import {getManifest, isManifestVersion3, throwRuntimeError} from "./runtime";
import {app, isPlatform} from "./env";

import {Platform} from "@typings/env";

import BadgeBackgroundColorDetails = chrome.browserAction.BadgeBackgroundColorDetails;
import BadgeTextDetails = chrome.action.BadgeTextDetails;

const getAction = () => isManifestVersion3() ? app().action : app().browserAction;

export const setActionBadgeText = (tabId: number, text: string | number) => new Promise<void>((resolve, reject) => {
    const details: BadgeTextDetails = {text: text.toString(), tabId};

    getAction().setBadgeText(details, () => {
        try {
            throwRuntimeError();

            resolve();
        } catch (e) {
            reject(e);
        }
    });

    setActionSidebarBadgeText(details);
});

export const clearActionBadgeText = (tabId: number): Promise<void> => setActionBadgeText(tabId, '');

export const setActionBadgeBgColor = (tabId: number, color: BadgeBackgroundColorDetails['color']) => new Promise<void>((resolve, reject) => {
    const details: BadgeBackgroundColorDetails = {color, tabId};

    getAction().setBadgeBackgroundColor(details, () => {
        try {
            throwRuntimeError();

            setActionSidebarBadgeBgColor(details);

            resolve();
        } catch (e) {
            reject(e);
        }
    });
});

export const setActionBadgeTextColor = (tabId: number, color: BadgeBackgroundColorDetails['color']): Promise<void> => new Promise<void>((resolve, reject) => {
    if (!isPlatform(Platform.Firefox)) {
        resolve();

        return;
    }

    try {
        // @ts-ignore
        getAction().setBadgeTextColor({color, tabId});

        resolve();
    } catch (e) {
        reject(e);
    }
});

export const setActionIcon = (tabId: number, icon: string | {
    [key: string]: string
}): Promise<void> => new Promise<void>((resolve, reject) => {
    getAction().setIcon({tabId, path: icon}, () => {
        try {
            throwRuntimeError();

            resolve();
        } catch (e) {
            reject(e);
        }
    });
});

export const getActionDefaultPopup = (): string => {
    const manifest = getManifest();

    return isManifestVersion3() ? manifest.action.default_popup : manifest.browser_action.default_popup;
}

const isActionSidebarAvailable = (): boolean => {
    return isPlatform(Platform.Opera);
}

const setActionSidebarBadgeText = (details: BadgeTextDetails): void => {
    if (!isActionSidebarAvailable()) {
        return;
    }

    //@ts-ignore
    opr.sidebarAction.setBadgeText(details);
}

const setActionSidebarBadgeBgColor = (details: BadgeBackgroundColorDetails): void => {
    if (!isActionSidebarAvailable()) {
        return;
    }

    //@ts-ignore
    opr.sidebarAction.setBadgeBackgroundColor(details);
}
