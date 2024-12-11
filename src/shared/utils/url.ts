import isUrl from "is-url";

import _startCase from "lodash/startCase";
import _isString from "lodash/isString";

export const getExtension = (url: string): string | undefined => {
    try {
        const {pathname} = new URL(url);

        if (!pathname.includes('.')) {
            throw new Error('Without extension');
        }

        const ext = (/[^./\\]*$/.exec(pathname) || [""])[0];

        return ext.toLowerCase();
    } catch (e) {
        return;
    }
}

export const getName = (url: string): string | undefined => {
    try {
        const {pathname} = new URL(url);

        let name = pathname.split('/').pop();

        if (name && name.indexOf('.') >= 0) {
            name = name.split('.').slice(0, -1).join('.');
        }

        return _startCase(name);
    } catch (e) {
        return;
    }
}

export const getHost = <T = any>(url: string | undefined, defaults?: T): string | T => {
    try {
        if (!_isString(url)) {
            throw new Error('URL must be type of string');
        }

        if (!isUrl(url)) {
            throw new Error('Wrong URL string');
        }

        return (new URL(url)).host;
    } catch (e) {
        return defaults as T;
    }
}

export const getOrigin = <T = any>(url: string | undefined, defaults?: T): string | T => {
    try {
        if (!_isString(url)) {
            throw new Error('URL must be type of string');
        }

        return (new URL(url)).origin;
    } catch (e) {
        return defaults as T;
    }
}
