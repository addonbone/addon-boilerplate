import _isString from "lodash/isString";

export const replaceWhitespaces = (str: string, replace: string = ' '): string => {
    return str.replace(/\s+/g, replace).replace(/^\s+|\s+$/, '');
}

export const findMatch = function (text: string, regexp: RegExp): string | undefined {
    const matches = text.match(regexp);

    return matches ? matches[1] : undefined;
};

export const removeAllSpaces = (str: string): string => {
    return str.replace(/\s/g, '');
};

export const hasSymbols = (str?: string | number | null): boolean => {
    if (!_isString(str)) {
        return false;
    }

    return removeAllSpaces(str).length > 0;
};
