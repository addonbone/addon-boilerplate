import {app} from "./env";
import {throwRuntimeError} from "./runtime";

import ScriptInjection = chrome.scripting.ScriptInjection;
import InjectionResult = chrome.scripting.InjectionResult;
import Awaited = chrome.scripting.Awaited;

export const scripting = app().scripting;

export const executeScript = <T = any>(injection: ScriptInjection<any, T>) => new Promise<InjectionResult<Awaited<T>>[]>((resolve, reject) => {
    scripting.executeScript(injection, (result) => {
        try {
            throwRuntimeError();

            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
});
