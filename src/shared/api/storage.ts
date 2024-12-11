import {app} from "./env";
import {throwRuntimeError} from "./runtime";
import StorageChange = chrome.storage.StorageChange;

const storage = app().storage;

const storageLocal = storage.local;

export const removeFromStorage = (keys: string | string[]): Promise<void> => new Promise<void>((resolve, reject) => {
    storageLocal.remove(keys, () => {
        try {
            throwRuntimeError();

            resolve();
        } catch (e) {
            reject(e);
        }
    });
});

export const setValueToStorage = async <T = any>(key: string, value: T): Promise<T> => {
    await setToStorage<T>({[key]: value});

    return value;
}

export const setToStorage = <T = any, I extends object = { [key: string]: T }>(items: I): Promise<I> => new Promise<I>((resolve, reject) => {
    storageLocal.set(items, () => {
        try {
            throwRuntimeError();

            resolve(items);
        } catch (e) {
            reject(e);
        }
    })
});

export const getFromStorage = <T = any, R = { [key: string]: T }>(keys: string | string[]): Promise<R> => new Promise<R>((resolve, reject) => {
    storageLocal.get(keys, results => {
        try {
            throwRuntimeError();

            resolve(results as R);
        } catch (e) {
            reject(e);
        }
    });
});

export const getAllStorage = (): Promise<{ [key: string]: any }> => new Promise<{ [key: string]: any }>((resolve, reject) => {
    storageLocal.get(results => {
        try {
            throwRuntimeError();

            resolve(results);
        } catch (e) {
            reject(e);
        }
    });
});

export const getValueFromStorage = async <T = any, R = T | undefined>(key: string, defaults?: R): Promise<R> => {
    const results = await getFromStorage(key);

    return results[key] || defaults;
}

export const onStorageChange = (callback: Parameters<typeof chrome.storage.onChanged.addListener>[0]): Function => {
    storage.onChanged.addListener(callback);

    return () => storage.onChanged.removeListener(callback);
}

export const onStorageLocalChange = (callback: (changes: { [key: string]: StorageChange }) => void): Function => {
    return onStorageChange((changes, areaName) => {
        if (areaName !== "local") {
            return;
        }

        callback(changes);
    });
}
