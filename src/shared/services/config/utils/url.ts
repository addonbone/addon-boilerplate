import isUrl from "is-url";

import {ConfigContract} from "@typings/config";

export const getSiteUrl = (config: ConfigContract, campaign?: string, medium?: string, source?: string): string => {
    const {siteUrl} = config.get();

    if (!siteUrl || !isUrl(siteUrl)) {
        throw new Error('Site url not set');
    }

    return modifyUrl(siteUrl, campaign, medium, source);
}

export const getWelcomeUrl = (config: ConfigContract, campaign?: string, medium?: string, source?: string): string => {
    const {welcomeUrl, siteUrl} = config.get();

    const url = welcomeUrl || siteUrl;

    if (!url || !isUrl(url)) {
        throw new Error('Welcome url not set');
    }

    return modifyUrl(url, campaign, medium, source);
}

export const getDonateUrl = (config: ConfigContract, campaign?: string, medium?: string, source?: string): string => {
    const {donateUrl} = config.get();

    if (!donateUrl || !isUrl(donateUrl)) {
        throw new Error('Donate url not set');
    }

    return modifyUrl(donateUrl, campaign, medium, source);
}

export const modifyUrl = (url: string, campaign?: string, medium?: string, source?: string): string => {
    const _url = new URL(url);

    if (source) {
        _url.searchParams.set('utm_source', source);
    }

    if (medium) {
        _url.searchParams.set('utm_medium', medium);
    }

    if (campaign) {
        _url.searchParams.set('utm_campaign', campaign);
    }

    return _url.toString();
}