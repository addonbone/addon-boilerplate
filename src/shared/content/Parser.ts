import $ from "cash-dom";
import {buildAbsoluteURL} from "url-toolkit";

import _isString from "lodash/isString";
import _startsWith from "lodash/startsWith";

export default class Parser {
    public constructor() {

    }

    private static normalizeUrl(url: string | null | undefined): string | undefined {
        if (!_isString(url)) {
            return;
        }

        if (url && _startsWith(url, 'blob:')) {
            return;
        }

        return buildAbsoluteURL(location.href, url);
    }

    public parse() {
        // This is a simple example of how to parse the content of a page.
        // You can use `import $ from "cash-dom";` to use jQuery-like syntax.
    }
}
