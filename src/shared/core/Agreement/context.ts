import {createContext, useContext} from "react";
import {Agreement} from "@typings/agreement";

export interface AgreementState {
    policy: boolean;
    welcome: boolean;
}

export interface AgreementContract {
    ready: boolean;
    agreements: AgreementState;

    setAgreement(agreement: Agreement, value: boolean): void;
}

export const DefaultState: AgreementContract = {
    ready: false,
    agreements: {
        policy: false,
        welcome: false,
    },
    setAgreement(agreement: Agreement, value: boolean) {
    }
}

export const AgreementContext = createContext<AgreementContract>(DefaultState);

AgreementContext.displayName = 'AgreementContext';

export const useAgreement = () => useContext(AgreementContext);
