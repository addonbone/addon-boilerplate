import React, {useEffect, useRef} from "react";

import {getUrl} from "@api/runtime";

import {LocaleProvider, LocaleProviderActions} from "@locale";

import {FC} from "@typings/react";

const Provider: FC = ({children}) => {
    const providerRef = useRef<LocaleProviderActions>(null);

    useEffect(() => {
        providerRef.current?.load(getUrl('_locales/en/policy.json'), 'policy_');
    }, []);

    return (
        <LocaleProvider ref={providerRef}>
            {children}
        </LocaleProvider>
    )
}

export default Provider;
