import {app} from "./env";
import {throwRuntimeError} from "./runtime";

const i18n = app().i18n;

export const canUseNativeI18nMessage = (): boolean => typeof i18n.getMessage !== "undefined";

export const getI18nMessage = (key: string): string | undefined => {
    if (!canUseNativeI18nMessage()) {
        return;
    }

    return i18n.getMessage(key);
}

export const getI18nAcceptLanguages = (): Promise<string[]> => new Promise<string[]>((resolve, reject) => {
    i18n.getAcceptLanguages(locales => {
        try {
            throwRuntimeError();

            resolve(locales);
        } catch (e) {
            reject(e);
        }
    });
});

export const getI18nUILanguage = (): string | undefined => {
    if (!i18n['getUILanguage']) {
        return;
    }

    return i18n.getUILanguage();
}

