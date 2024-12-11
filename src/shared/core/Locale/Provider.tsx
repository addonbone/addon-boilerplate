import React, {forwardRef, ReactNode, useCallback, useEffect, useImperativeHandle, useMemo, useState} from 'react';

import _now from "lodash/now";

import {LocaleContext, LocaleContract} from './context';

import Locale from "@services/locale";

import {getLocaleDir, isLocaleRtl} from "@utils/locale";

import {LocaleMessageParams} from "@typings/locale";

export interface ProviderActions {
    load(url: string, prefix?: string): void;
}

export interface ProviderProps {
    children?: ReactNode | undefined;
}

export type ProviderState = Pick<LocaleContract, 'lang' | 'dir' | 'isRtl'>;

const Provider = forwardRef<ProviderActions, ProviderProps>((props, ref) => {
    const {children} = props;

    const getStateByLocale = useCallback((locale: Locale): ProviderState => {
        const lang = locale.getCurrentLocale();

        return {
            lang,
            dir: getLocaleDir(lang),
            isRtl: isLocaleRtl(lang),
        };
    }, []);

    const locale = useMemo(() => new Locale(), []);

    const [state, setState] = useState<ProviderState>(() => getStateByLocale(locale));

    const [updatedAt, setUpdatedAt] = useState(() => _now());

    const getLocale = useCallback((key: string, params?: LocaleMessageParams): string => {
        return locale.get(key, params);
    }, [locale]);

    const choiceLocale = useCallback((key: string, count: number, params?: LocaleMessageParams): string => {
        return locale.choice(key, count, params);
    }, [locale]);

    useImperativeHandle(ref, () => ({
        load(url: string, prefix?: string): void {
            locale.load(url, prefix)
                .then(() => {
                    setUpdatedAt(_now());
                })
                .catch(e => {
                    console.log('Locale Provider load error', e);
                });
        }
    }), [locale]);

    useEffect(() => {
        locale.init().then(() => {
            setState(getStateByLocale(locale));
        });
    }, []);

    useEffect(() => {
        document.title = locale.get('app_name');

        const html = document.querySelector('html');

        html?.setAttribute('lang', state.lang);
        html?.setAttribute('dir', state.dir);
    }, [locale, state]);

    return (
        <LocaleContext.Provider
            key={updatedAt}
            value={{...state, _: getLocale, choice: choiceLocale}}
        >{children}</LocaleContext.Provider>
    );
});

export default Provider;
