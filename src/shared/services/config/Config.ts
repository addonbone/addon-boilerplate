import {Optional} from "utility-types";

import _isObject from "lodash/isObject";
import _reduce from "lodash/reduce";
import _keys from "lodash/keys";
import _isUndefined from "lodash/isUndefined";
import _now from "lodash/now";

import formatISO from "date-fns/formatISO";
import isFuture from "date-fns/isFuture";
import parseISO from "date-fns/parseISO";
import addDays from "date-fns/addDays";

import {getValueFromStorage, setValueToStorage} from "@api/storage";

import {fetchJson} from "@utils/request";

import {Config as ConfigType, ConfigContract, ReadonlyConfig} from "@typings/config";

export default class Config implements ConfigContract {
    private readonly storageKey = 'config';

    private config?: ReadonlyConfig;

    private readonly defaults: ReadonlyConfig = {
        donateUrl: null,
        welcomeUrl: null,
        siteUrl: null,
        blogUrl: null,
        rateUrl: null,
        analyticsId: null,
        analyticsSecret: null,
        updatedAt: formatISO(new Date()),
        installedIn: formatISO(new Date()),
    }

    constructor(private readonly url?: string) {
    }

    public static make(): ConfigContract {
        return new Config();
    }

    public static async makeAndLoad(url?: string): Promise<ConfigContract> {
        const config = new Config(url);

        await config.load();

        return config;
    }

    private validate(obj: ConfigType): ConfigType {
        if (!_isObject(obj)) {
            return this.defaults;
        }

        const validate = _reduce(_keys(this.defaults), (config, key) => {
            if (!obj.hasOwnProperty(key)) {
                return config;
            }

            // @ts-ignore
            const value = obj[key];

            if (_isUndefined(value)) {
                return config;
            }

            // @ts-ignore
            config[key] = value;

            return config;
        }, {} as Optional<ConfigType>);

        return {...this.defaults, ...validate};
    }

    private async getFromStorage(): Promise<ConfigType | undefined> {
        try {
            let config = await getValueFromStorage<ConfigType>(this.storageKey);

            if (!config) {
                throw new Error('Config not set');
            }

            if (config) {
                return this.validate(config);
            }
        } catch (e) {
            return;
        }
    }

    private async getFromApi(): Promise<ConfigType | undefined> {
        const config = await fetchJson<ConfigType | undefined>(this.url + '?t=' + _now());

        if (!config) {
            throw new Error('Config not found');
        }

        return this.validate(config);
    }

    private async load(): Promise<ReadonlyConfig> {
        if (this.config) {
            return this.config;
        }

        let installedIn: string | undefined;

        let config: ConfigType | undefined = await this.getFromStorage();

        try {
            if (config) {
                if (isFuture(addDays(parseISO(config.updatedAt), 1))) {
                    return this.config = config;
                }

                installedIn = config.installedIn;
            }
        } catch (e) {
            console.warn('Config install in calculate warning', e);
        }

        try {
            config = await this.getFromApi();
        } catch (e) {
            console.log('Config get from API error', e);
        }

        if (config) {
            if (installedIn) {
                config = {...config, installedIn};
            }

            this.config = await setValueToStorage(this.storageKey, config);
        }

        return config || this.defaults;
    }

    public get(): ReadonlyConfig {
        return this.config || this.defaults;
    }

    public getSiteUrl(campaign?: string, medium: string = 'extension', source: string = 'web-downloader'): string {
        const {siteUrl} = this.get();

        const url = new URL(siteUrl || '');

        if (source) {
            url.searchParams.set('utm_source', source);
        }

        if (medium) {
            url.searchParams.set('utm_medium', medium);
        }

        if (campaign) {
            url.searchParams.set('utm_campaign', campaign);
        }

        return url.toString();
    }
}
