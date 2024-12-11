import {getValueFromStorage, setValueToStorage} from "./storage";

import {Agreement, AgreementList} from "@typings/agreement";

const keyAgreement = 'agreement';

export const getAgreementList = async (): Promise<AgreementList> => {
    return await getValueFromStorage<AgreementList, AgreementList>(keyAgreement, {});
}

export const setAgreementValue = async (agreement: Agreement, value: boolean): Promise<AgreementList> => {
    const prevList = await getAgreementList();

    return await setValueToStorage<AgreementList>(keyAgreement, {...prevList, [agreement]: value});
};

export const getAgreementValue = async (agreement: Agreement): Promise<boolean> => {
    const list = await getAgreementList();

    return list[agreement] || false;
}
