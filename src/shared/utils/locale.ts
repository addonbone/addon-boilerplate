import {LocaleDir, LocaleLang} from "@typings/locale";

export const isLocaleRtl = (lang: LocaleLang): boolean => {
    return ["ar", "he", "fa", "sd", "ur"].includes(lang);
}

export const getLocaleDir = (lang: LocaleLang): LocaleDir => {
    return isLocaleRtl(lang) ? LocaleDir.RightToLeft : LocaleDir.LeftToRight;
}
