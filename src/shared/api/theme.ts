import {getValueFromStorage, setValueToStorage} from "./storage";

import {Theme} from "@typings/theme";

const keyTheme = 'theme';

export const getTheme = async (): Promise<Theme | undefined> => {
    return await getValueFromStorage(keyTheme);
}

export const setTheme = async (theme: Theme): Promise<Theme> => {
    return await setValueToStorage(keyTheme, theme);
}
