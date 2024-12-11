import {app} from "@api/env";
import {throwRuntimeError} from "@api/runtime";

import UninstallOptions = chrome.management.UninstallOptions;

const management = app().management;

export const uninstallSelf = async (options?: UninstallOptions): Promise<void> => new Promise<void>((resolve, reject) => {
    management.uninstallSelf(options || {}, () => {
        try {
            throwRuntimeError();

            resolve();
        } catch (e) {
            reject(e);
        }
    });
});