import _isNumber from "lodash/isNumber";
import _isUndefined from "lodash/isUndefined";

import {app, getPlatform} from "./env";
import {throwRuntimeError} from "./runtime";

import {Platform} from "@typings/env";

import DownloadOptions = chrome.downloads.DownloadOptions;
import DownloadQuery = chrome.downloads.DownloadQuery;
import DownloadItem = chrome.downloads.DownloadItem;
import DownloadState = chrome.downloads.DownloadState;

const downloads = app().downloads;

export class BlockDownloadError extends Error {
}

export const download = (options: DownloadOptions): Promise<number> => new Promise<number>((resolve, reject) => {
    downloads.download({conflictAction: 'uniquify', ...options}, (downloadId) => {
        try {
            throwRuntimeError();

            if (!_isNumber(downloadId)) {
                throw new Error('Download id not created');
            }

            setTimeout(() => {
                findDownload(downloadId).then(item => {
                    if (!item) {
                        throw new BlockDownloadError('Download item not found after created');
                    }

                    const {error, state} = item;

                    if (state === "interrupted") {
                        if (error === "USER_CANCELED") {
                            throw new BlockDownloadError('Requires user permission to upload');
                        }

                        throw new Error(`Download error: ${error}`);
                    }

                    resolve(downloadId);
                }).catch(reject);
            }, 100);
        } catch (e) {
            reject(e);
        }
    });
});

export const cancelDownload = (downloadId: number): Promise<void> => new Promise<void>((resolve, reject) => {
    downloads.cancel(downloadId, () => {
        try {
            throwRuntimeError();

            resolve();
        } catch (e) {
            reject(e);
        }
    });
});

export const findDownload = async (downloadId: number): Promise<DownloadItem | undefined> => {
    const items = await queryDownloads({id: downloadId});

    return items[0];
}

export const queryDownloads = (query: DownloadQuery): Promise<DownloadItem[]> => new Promise<DownloadItem[]>((resolve, reject) => {
    downloads.search(query, (downloadItems) => {
        try {
            throwRuntimeError();

            resolve(downloadItems);
        } catch (e) {
            reject(e);
        }
    });
});

export const isDownloadExists = async (downloadId: number): Promise<boolean | undefined> => {
    const item = await findDownload(downloadId);

    return item?.exists;
}

export const getDownloadState = async (downloadId?: number): Promise<DownloadState | undefined> => {
    if (_isUndefined(downloadId)) {
        return;
    }

    const item = await findDownload(downloadId);

    return item?.state;
}

export const showDownload = async (downloadId: number): Promise<boolean> => {
    if (!await isDownloadExists(downloadId)) {
        return false;
    }

    downloads.show(downloadId);

    return true;
}

export const showDownloadFolder = (): void => {
    downloads.showDefaultFolder();
}

export const onDownloadsChanged = (callback: Parameters<typeof chrome.downloads.onChanged.addListener>[0]) => {
    downloads.onChanged.addListener(callback);
}

export const getSettingsDownloadsUrl = (): string => {
    switch (getPlatform()) {
        case Platform.Firefox:
            return "about:preferences#general";

        case Platform.Opera:
            return 'opera://settings/downloads';

        case Platform.Edge:
            return 'edge://settings/downloads';

        case Platform.Chrome:
        default:
            return 'chrome://settings/downloads';
    }
}
