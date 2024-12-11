import {createContext, useContext} from "react";

import {LocaleDir, LocaleLang, LocaleMessageParams} from "@typings/locale";

export interface LocaleContract {
    lang: LocaleLang;

    dir: LocaleDir;

    isRtl: boolean;

    _(key: string, params?: LocaleMessageParams): string;

    choice(key: string, count: number, params?: LocaleMessageParams): string;
}

export const DefaultLocale: LocaleContract = {
    lang: 'en',
    isRtl: false,
    dir: LocaleDir.LeftToRight,
    _(key: string): string {
        return key;
    },
    choice(key: string): string {
        return key;
    },
};

export const LocaleContext = createContext<LocaleContract>(DefaultLocale);

LocaleContext.displayName = "LocaleContext";

export const useLocale = () => useContext(LocaleContext);
