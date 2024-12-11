import _reduce from "lodash/reduce";
import _size from "lodash/size";
import _isUndefined from "lodash/isUndefined";
import _forEach from "lodash/forEach";

import {canUseNativeI18nMessage, getI18nAcceptLanguages, getI18nMessage, getI18nUILanguage} from "@api/i18n";
import {getManifest, getUrl} from "@api/runtime";
import {isPlatform} from "@api/env";

import {fetchJson} from "@utils/request";
import {hasSymbols} from "@utils/string";

import {LocaleLang, LocaleMessage, LocaleMessageParams, LocaleMessageResponse} from "@typings/locale";
import {Platform} from "@typings/env";

export default class Locale {
    private messages?: LocaleMessage;

    private customMessages?: LocaleMessage;

    private currentLocale: LocaleLang = 'en';

    private readonly defaultLocale: LocaleLang;

    public static getMessageUrl(locale: string): string {
        return getUrl(`_locales/${locale}/messages.json`);
    }

    private static async fetchMessages(locale: string): Promise<LocaleMessage> {
        const json = await fetchJson<LocaleMessageResponse>(Locale.getMessageUrl(locale));

        return _reduce(json, (messages, {message}, key) => {
            messages[key] = message;

            return messages;
        }, {} as LocaleMessage);
    }

    constructor() {
        this.defaultLocale = getManifest().default_locale || 'en';
    }

    public async init(): Promise<void> {
        if (canUseNativeI18nMessage()) {

            /**
             * The Opera browser does not support RTL languages,
             * and for Opera you need to directly indicate what kind of language it is.
             * interface language is always different
             */
            if (isPlatform(Platform.Opera)) {
                let locale = getI18nMessage('locale');

                if (locale && hasSymbols(locale)) {
                    this.currentLocale = locale;

                    return;
                }
            }

            this.currentLocale = getI18nUILanguage() || this.defaultLocale;
        } else {
            try {
                this.currentLocale = await this.fetchCurrentLocale();

                this.messages = await Locale.fetchMessages(this.currentLocale);
            } catch (e) {
                this.messages = await Locale.fetchMessages(this.currentLocale = this.getDefaultLocale());
            }
        }
    }

    private async fetchCurrentLocale(): Promise<LocaleLang> {
        const locales = await getI18nAcceptLanguages();

        const uiLanguage = getI18nUILanguage();

        if (uiLanguage && !locales.includes(uiLanguage)) {
            locales.unshift(uiLanguage);
        }

        for await (const locale of locales) {
            try {
                const result = await fetch(Locale.getMessageUrl(locale), {method: "HEAD"});

                if (result.status === 200) {
                    return locale;
                }
            } catch (e) {
                console.log(`Fetch locale error: ${locale}`, e);
            }
        }

        return this.getDefaultLocale();
    }

    public getCurrentLocale(): LocaleLang {
        return this.currentLocale;
    }

    public getDefaultLocale(): LocaleLang {
        return this.defaultLocale;
    }

    public getMessage(key: string): string {
        if (this.customMessages && this.customMessages.hasOwnProperty(key)) {
            return this.customMessages[key] || key;
        }

        if (canUseNativeI18nMessage()) {
            const native = getI18nMessage(key);

            if (!_isUndefined(native)) {
                return native;
            }
        }

        return this.messages && this.messages[key] || key;
    }

    public get(key: string, params?: LocaleMessageParams): string {
        let message = this.getMessage(key);

        if (message.length === 0) {
            return key;
        }

        if (_size(params) > 0) {
            message = _reduce(params, (str, value, key) => str.replace(new RegExp(':' + key, "g"), value.toString()), message);
        }

        return message;
    }

    public set(key: string, value: string): this {
        if (!this.customMessages) {
            this.customMessages = {};
        }

        this.customMessages[key] = value;

        return this;
    }

    public choice(key: string, count: number, params?: LocaleMessageParams): string {
        const value = this.get(key, params).split('|');

        const index = this.getPluralIndex(count);

        return value[index] || value[0] || key;
    }

    public async load(url: string, prefix: string = ''): Promise<void> {
        const messages = await fetchJson<LocaleMessage>(url);

        _forEach(messages, (value, key) => {
            this.set(prefix + key, value);
        });
    }

    private getPluralIndex(count: number): number {
        switch (this.currentLocale) {
            case 'az':
            case 'az-AZ':
            case 'bo':
            case 'bo-CN':
            case 'bo-IN':
            case 'dz':
            case 'dz-BT':
            case 'id':
            case 'id-ID':
            case 'ja':
            case 'ja-JP':
            case 'jv':
            case 'ka':
            case 'ka-GE':
            case 'km':
            case 'km-KH':
            case 'kn':
            case 'kn-IN':
            case 'ko':
            case 'ko-KR':
            case 'ms':
            case 'ms-MY':
            case 'th':
            case 'th-TH':
            case 'tr':
            case 'tr-CY':
            case 'tr-TR':
            case 'vi':
            case 'vi-VN':
            case 'zh':
            case 'zh-CN':
            case 'zh-HK':
            case 'zh-SG':
            case 'zh-TW':
                return 0;
            case 'af':
            case 'af-ZA':
            case 'bn':
            case 'bn-BD':
            case 'bn-IN':
            case 'bg':
            case 'bg-BG':
            case 'ca':
            case 'ca-AD':
            case 'ca-ES':
            case 'ca-FR':
            case 'ca-IT':
            case 'da':
            case 'da-DK':
            case 'de':
            case 'de-AT':
            case 'de-BE':
            case 'de-CH':
            case 'de-DE':
            case 'de-LI':
            case 'de-LU':
            case 'el':
            case 'el-CY':
            case 'el-GR':
            case 'en':
            case 'en-AG':
            case 'en-AU':
            case 'en-BW':
            case 'en-CA':
            case 'en-DK':
            case 'en-GB':
            case 'en-HK':
            case 'en-IE':
            case 'en-IN':
            case 'en-NG':
            case 'en-NZ':
            case 'en-PH':
            case 'en-SG':
            case 'en-US':
            case 'en-ZA':
            case 'en-ZM':
            case 'en-ZW':
            case 'en-GB-oxendict':
            case 'eo':
            case 'eo-US':
            case 'es':
            case 'es-AR':
            case 'es-BO':
            case 'es-CL':
            case 'es-CO':
            case 'es-CR':
            case 'es-CU':
            case 'es-DO':
            case 'es-EC':
            case 'es-ES':
            case 'es-GT':
            case 'es-HN':
            case 'es-MX':
            case 'es-NI':
            case 'es-PA':
            case 'es-PE':
            case 'es-PR':
            case 'es-PY':
            case 'es-SV':
            case 'es-US':
            case 'es-UY':
            case 'es-VE':
            case 'es-419':
            case 'et':
            case 'et-EE':
            case 'eu':
            case 'eu-ES':
            case 'eu-FR':
            case 'fa':
            case 'fa-IR':
            case 'fi':
            case 'fi-FI':
            case 'fo':
            case 'fo-FO':
            case 'fur':
            case 'fur-IT':
            case 'fy':
            case 'fy-DE':
            case 'fy-NL':
            case 'gl':
            case 'gl-ES':
            case 'gu':
            case 'gu-IN':
            case 'ha':
            case 'ha-NG':
            case 'he':
            case 'he-IL':
            case 'hu':
            case 'hu-HU':
            case 'is':
            case 'is-IS':
            case 'it':
            case 'it-CH':
            case 'it-IT':
            case 'ku':
            case 'ku-TR':
            case 'lb':
            case 'lb-LU':
            case 'ml':
            case 'ml-IN':
            case 'mn':
            case 'mn-MN':
            case 'mr':
            case 'mr-IN':
            case 'nah':
            case 'nb':
            case 'nb-NO':
            case 'ne':
            case 'ne-NP':
            case 'nl':
            case 'nl-AW':
            case 'nl-BE':
            case 'nl-NL':
            case 'nn':
            case 'nn-NO':
            case 'no':
            case 'om':
            case 'om-ET':
            case 'om-KE':
            case 'or':
            case 'or-IN':
            case 'pa':
            case 'pa-IN':
            case 'pa-PK':
            case 'pap':
            case 'pap-AN':
            case 'pap-AW':
            case 'pap-CW':
            case 'ps':
            case 'ps-AF':
            case 'pt':
            case 'pt-BR':
            case 'pt-PT':
            case 'so':
            case 'so-DJ':
            case 'so-ET':
            case 'so-KE':
            case 'so-SO':
            case 'sq':
            case 'sq-AL':
            case 'sq-MK':
            case 'sv':
            case 'sv-FI':
            case 'sv-SE':
            case 'sw':
            case 'sw-KE':
            case 'sw-TZ':
            case 'ta':
            case 'ta-IN':
            case 'ta-LK':
            case 'te':
            case 'te-IN':
            case 'tk':
            case 'tk-TM':
            case 'ur':
            case 'ur-IN':
            case 'ur-PK':
            case 'zu':
            case 'zu-ZA':
                return (count == 1) ? 0 : 1;
            case 'am':
            case 'am-ET':
            case 'bh':
            case 'fil':
            case 'fil-PH':
            case 'fr':
            case 'fr-BE':
            case 'fr-CA':
            case 'fr-CH':
            case 'fr-FR':
            case 'fr-LU':
            case 'gun':
            case 'hi':
            case 'hi-IN':
            case 'hy':
            case 'hy-AM':
            case 'ln':
            case 'ln-CD':
            case 'mg':
            case 'mg-MG':
            case 'nso':
            case 'nso-ZA':
            case 'ti':
            case 'ti-ER':
            case 'ti-ET':
            case 'wa':
            case 'wa-BE':
            case 'xbr':
                return ((count == 0) || (count == 1)) ? 0 : 1;
            case 'be':
            case 'be-BY':
            case 'bs':
            case 'bs-BA':
            case 'hr':
            case 'hr-HR':
            case 'ru':
            case 'ru-RU':
            case 'ru-UA':
            case 'sr':
            case 'sr-ME':
            case 'sr-RS':
            case 'uk':
            case 'uk-UA':
                return ((count % 10 == 1) && (count % 100 != 11)) ? 0 : (((count % 10 >= 2) && (count % 10 <= 4) && ((count % 100 < 10) || (count % 100 >= 20))) ? 1 : 2);
            case 'cs':
            case 'cs-CZ':
            case 'sk':
            case 'sk-SK':
                return (count == 1) ? 0 : (((count >= 2) && (count <= 4)) ? 1 : 2);
            case 'ga':
            case 'ga-IE':
                return (count == 1) ? 0 : ((count == 2) ? 1 : 2);
            case 'lt':
            case 'lt-LT':
                return ((count % 10 == 1) && (count % 100 != 11)) ? 0 : (((count % 10 >= 2) && ((count % 100 < 10) || (count % 100 >= 20))) ? 1 : 2);
            case 'sl':
            case 'sl-SI':
                return (count % 100 == 1) ? 0 : ((count % 100 == 2) ? 1 : (((count % 100 == 3) || (count % 100 == 4)) ? 2 : 3));
            case 'mk':
            case 'mk-MK':
                return (count % 10 == 1) ? 0 : 1;
            case 'mt':
            case 'mt-MT':
                return (count == 1) ? 0 : (((count == 0) || ((count % 100 > 1) && (count % 100 < 11))) ? 1 : (((count % 100 > 10) && (count % 100 < 20)) ? 2 : 3));
            case 'lv':
            case 'lv-LV':
                return (count == 0) ? 0 : (((count % 10 == 1) && (count % 100 != 11)) ? 1 : 2);
            case 'pl':
            case 'pl-PL':
                return (count == 1) ? 0 : (((count % 10 >= 2) && (count % 10 <= 4) && ((count % 100 < 12) || (count % 100 > 14))) ? 1 : 2);
            case 'cy':
            case 'cy-GB':
                return (count == 1) ? 0 : ((count == 2) ? 1 : (((count == 8) || (count == 11)) ? 2 : 3));
            case 'ro':
            case 'ro-RO':
                return (count == 1) ? 0 : (((count == 0) || ((count % 100 > 0) && (count % 100 < 20))) ? 1 : 2);
            case 'ar':
            case 'ar-AE':
            case 'ar-BH':
            case 'ar-DZ':
            case 'ar-EG':
            case 'ar-IN':
            case 'ar-IQ':
            case 'ar-JO':
            case 'ar-KW':
            case 'ar-LB':
            case 'ar-LY':
            case 'ar-MA':
            case 'ar-OM':
            case 'ar-QA':
            case 'ar-SA':
            case 'ar-SD':
            case 'ar-SS':
            case 'ar-SY':
            case 'ar-TN':
            case 'ar-YE':
                return (count == 0) ? 0 : ((count == 1) ? 1 : ((count == 2) ? 2 : (((count % 100 >= 3) && (count % 100 <= 10)) ? 3 : (((count % 100 >= 11) && (count % 100 <= 99)) ? 4 : 5))));
            default:
                return 0;
        }
    }
}
