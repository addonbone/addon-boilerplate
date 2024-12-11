import {app, isPlatform} from "@api/env";
import {getTabUrl} from "@api/tabs";

import {hasSymbols} from "@utils/string";

import {Platform} from "@typings/env";

import RequestFilter = chrome.webRequest.RequestFilter;
import ResourceRequest = chrome.webRequest.ResourceRequest;

const webRequest = app().webRequest;

export const getInitiatorUrl = async (request: ResourceRequest): Promise<string | undefined> => {
    const {tabId} = request;

    let initiatorUrl: string | undefined;

    try {
        if (tabId >= 0) {
            initiatorUrl = await getTabUrl(tabId);
        } else if (isPlatform(Platform.Firefox)) {
            // Firefox contains other properties in the details object: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/webRequest/onBeforeRequest#details_2

            // @ts-ignore
            const {originUrl, documentUrl} = request;

            initiatorUrl = originUrl || documentUrl;

            if (!hasSymbols(initiatorUrl)) {
                initiatorUrl = undefined;
            }
        }
    } catch (e) {
        console.warn(`Request API, getInitiatorUrl, get tab url id = "${tabId}" warning`, e);
    }

    return initiatorUrl;
}

export const onWebRequestCompleted = (callback: Parameters<typeof chrome.webRequest.onCompleted.addListener>[0], filter?: RequestFilter, extra?: string[]): void => {
    if (!filter) {
        filter = {
            urls: ["http://*/*", "https://*/*"],
            types: ["main_frame"]
        };
    }

    webRequest.onCompleted.addListener(callback, filter, extra);
}

export const onWebRequestBeforeSendHeaders = (callback: Parameters<typeof chrome.webRequest.onBeforeSendHeaders.addListener>[0], filter?: RequestFilter, extra?: string[]): void => {
    if (!filter) {
        filter = {urls: ["http://*/*", "https://*/*"]};
    }

    if (!extra) {
        extra = ["blocking", "requestHeaders"];
    }

    webRequest.onBeforeSendHeaders.addListener(callback, filter, extra);
}

export const onWebRequestHeadersReceived = (callback: Parameters<typeof chrome.webRequest.onHeadersReceived.addListener>[0], filter?: RequestFilter, extra?: string[]): void => {
    if (!filter) {
        filter = {
            urls: ['<all_urls>'],
        }
    }

    if (!extra) {
        extra = ['responseHeaders'];
    }

    webRequest.onHeadersReceived.addListener(callback, filter, extra);
}

export const onWebRequestBeforeRequest = (callback: Parameters<typeof chrome.webRequest.onBeforeRequest.addListener>[0], filter?: RequestFilter, extra?: string[]): void => {
    if (!filter) {
        filter = {
            urls: ['<all_urls>'],
        }
    }

    if (!extra) {
        extra = ['requestBody'];

        if (!isPlatform(Platform.Firefox)) {
            extra.push('extraHeaders');
        }
    }

    webRequest.onBeforeRequest.addListener(callback, filter, extra);
}
