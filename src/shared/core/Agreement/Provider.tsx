import React, {useCallback, useEffect, useState} from "react";

import {AgreementContext, AgreementState} from "./context";

import {getAgreementList, setAgreementValue} from "@api/agreement";

import {Agreement, AgreementList} from "@typings/agreement";
import {FC} from "@typings/react";

const Provider: FC = ({children}) => {
    const [ready, setReady] = useState<boolean>(false);

    const [agreements, updateAgreements] = useState<AgreementState>({
        policy: false,
        welcome: false,
    });

    const convertListToState = useCallback((list: AgreementList) => {
        updateAgreements({
            policy: list[Agreement.Policy] || false,
            welcome: list[Agreement.Welcome] || false,
        });
    }, []);

    const handleChange = useCallback((agreement: Agreement, value: boolean) => {
        setAgreementValue(agreement, value).then(list => {
            convertListToState(list);
        }).catch(e => {
            console.log('AgreementProvider setAgreementValue error', e);
        });
    }, []);

    useEffect(() => {
        getAgreementList().then(list => {
            convertListToState(list);
        }).catch(e => {
            console.log('AgreementProvider getAgreementList error', e);
        }).finally(() => {
            setReady(true);
        })
    }, []);

    return (
        <AgreementContext.Provider value={{ready, agreements, setAgreement: handleChange}}>
            {children}
        </AgreementContext.Provider>
    )
}

Provider.displayName = "AgreementProvider";

export default Provider;
