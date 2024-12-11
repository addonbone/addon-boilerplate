import formatISO from "date-fns/formatISO";
import isPast from "date-fns/isPast";
import addDays from "date-fns/addDays";
import parseISO from "date-fns/parseISO";

import _isString from "lodash/isString";

import {getValueFromStorage, setValueToStorage} from "./storage";

const keyDonate: string = 'donate';
const donateIntervalDays: number = 7;

export const setDonateRequestValue = async (value: string | boolean): Promise<void> => {
    await setValueToStorage(keyDonate, value);
}

export const setDonateRequest = async (): Promise<void> => {
    const lastRequest = await getDonateRequestValue();

    if (_isString(lastRequest)) {
        return;
    }

    await setDonateRequestValue(true);
}

export const setLastDonateRequest = async (): Promise<void> => {
    await setDonateRequestValue(formatISO(new Date()));
}

export const getDonateRequestValue = async (): Promise<string | boolean> => {
    return await getValueFromStorage<string | boolean>(keyDonate) || false;
}

export const canRequestDonate = async (): Promise<boolean> => {
    const lastRequest = await getDonateRequestValue();

    if (!_isString(lastRequest)) {
        return lastRequest;
    }

    return isPast(addDays(parseISO(lastRequest), donateIntervalDays));
}