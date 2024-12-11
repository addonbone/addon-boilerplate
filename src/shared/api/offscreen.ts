import {app} from "@api/env";
import {throwRuntimeError} from "@api/runtime";
import {getOffscreenUrl} from "@api/html";

import Reason = chrome.offscreen.Reason;

const offscreen = app().offscreen;

export const createOffscreenDocument = (reasons: Reason[]) => new Promise<void>((resolve, reject) => {
    offscreen.createDocument({
        url: getOffscreenUrl(),
        reasons,
        justification: 'Video processing'
    }, () => {
        try {
            throwRuntimeError();

            resolve();
        } catch (e) {
            reject(e);
        }
    });
});

export const hasOffscreenDocument = () => new Promise<boolean>((resolve, reject) => {
    offscreen.hasDocument((hasDocument) => {
        try {
            throwRuntimeError();

            resolve(hasDocument);
        } catch (e) {
            reject(e);
        }
    });
});

export const removeOffscreenDocument = () => new Promise<void>((resolve, reject) => {
    offscreen.closeDocument(() => {
        try {
            throwRuntimeError();

            resolve();
        } catch (e) {
            reject(e);
        }
    });
});