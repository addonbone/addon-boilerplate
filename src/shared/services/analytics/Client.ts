import {v4 as uuid} from '@lukeed/uuid';

import _isUndefined from "lodash/isUndefined";
import _isPlainObject from "lodash/isPlainObject";
import _defaults from "lodash/defaults";

import isPast from "date-fns/isPast";
import addHours from "date-fns/addHours";
import parseISO from "date-fns/parseISO";
import formatISO from "date-fns/formatISO";

import {getValueFromStorage, setValueToStorage} from "@api/storage";

import {fetchJson} from "@utils/request";

export enum ClientApiStatus {
    Success = "success",
    Fail = "fail"
}

export interface ClientApiResponse extends Omit<ClientData, 'ip'> {
    status: ClientApiStatus;
    query: string;
}

export interface ClientData {
    ip: string;
    country: string,
    countryCode: string,
    region: string,
    regionName: string,
    city: string,
    zip: string,
    lat: number,
    lon: number,
    timezone: string,
    isp: string,
    org: string,
    as: string,
}

export interface ClientStorageData {
    id: string;
    data: ClientData;
    updatedAt: string;
}

export default class {
    private readonly storageKey = 'client';

    private readonly api: string = "http://ip-api.com/json/";

    private readonly defaultData: ClientData = {
        ip: '0.0.0.0',
        country: 'Unknown',
        countryCode: 'XX',
        region: 'XX',
        regionName: 'Unknown',
        city: 'Unknown',
        zip: 'xx',
        lat: 0,
        lon: 0,
        timezone: 'Unknown',
        isp: 'Unknown',
        org: 'Unknown',
        as: 'Unknown',
    };

    private id: string = uuid();

    private data?: ClientData;

    constructor() {
        this.load().catch(e => {
            console.log('Analytics client load error', e);
        });
    }

    public getId(): string {
        return this.id;
    }

    public getData(): ClientData {
        return this.data || this.defaultData;
    }

    private async load(): Promise<void> {
        if (!_isUndefined(this.data)) {
            return;
        }

        let data = await this.getDataFromStorage();

        if (_isUndefined(data)) {
            try {
                data = await this.getDataFromApi();
            } finally {
                await this.setDataToStorage(data);
            }
        }
    }

    private async getDataFromStorage(): Promise<ClientData | undefined> {
        const value = await getValueFromStorage<ClientStorageData>(this.storageKey);

        if (_isUndefined(value)) {
            return;
        }

        const {id, data, updatedAt} = value;

        if (isPast(addHours(parseISO(updatedAt), 10))) {
            return;
        }

        this.id = id;

        return this.data = this.validateData(data);
    }

    private async setDataToStorage(data?: ClientData): Promise<void> {
        this.data = data || this.defaultData;

        const value: ClientStorageData = {
            id: this.id,
            data: this.data,
            updatedAt: formatISO(new Date()),
        };

        await setValueToStorage(this.storageKey, value);
    }

    private async getDataFromApi(): Promise<ClientData> {
        const {status, query, ...other} = await fetchJson<ClientApiResponse>(this.api);

        if (status !== ClientApiStatus.Success) {
            throw new Error(`Api bad status "${status}"`);
        }

        return this.validateData({ip: query, ...other});
    }

    private validateData(obj: ClientData): ClientData {
        if (!_isPlainObject(obj)) {
            return this.defaultData;
        }

        return _defaults(obj, this.defaultData);
    }
}
