import _isString from "lodash/isString";
import _now from "lodash/now";

import {app} from "./env";
import {getUrl, throwRuntimeError} from "./runtime";

import NotificationOptions = chrome.notifications.NotificationOptions;

const notifications = app().notifications;

export const isSupportNotifications = () => !!notifications;

export const createNotification = (options: NotificationOptions<false>, notificationId?: string) => new Promise<string>((resolve, reject) => {
    const defaultOptions: NotificationOptions<true> = {
        type: 'basic',
        priority: 1,
        title: 'Empty title',
        message: 'Empty message',
        iconUrl: getUrl('img/icon/128x128.png')
    };

    if (!_isString(notificationId)) {
        notificationId = _now().toString();
    }

    notifications.create(notificationId, {...defaultOptions, ...options}, (notificationId) => {
        try {
            throwRuntimeError();

            resolve(notificationId);
        } catch (e) {
            reject(e);
        }
    });
});

export const clearNotification = (notificationId: string): Promise<boolean> => new Promise<boolean>((resolve, reject) => {
    notifications.clear(notificationId, (wasCleared) => {
        try {
            throwRuntimeError();

            resolve(wasCleared);
        } catch (e) {
            reject(e);
        }
    });
});

export const onNotificationsClicked = (callback: Parameters<typeof chrome.notifications.onClicked.addListener>[0]) => {
    if (!isSupportNotifications()) {
        return;
    }

    notifications.onClicked.addListener(callback);
}

export const onNotificationsButtonClicked = (callback: Parameters<typeof chrome.notifications.onButtonClicked.addListener>[0]) => {
    if (!isSupportNotifications()) {
        return;
    }

    notifications.onButtonClicked.addListener(callback);
}
