import onElementChange from "element-change";

import _debounce from "lodash/debounce";

import Listener from "./Listener";

export {Listener};

import {onMessage} from "@api/runtime";

declare global {
    interface Window {
        contentListener?: Listener;
    }
}

export const onContent = (listener: Listener): void => {
    if (!window.contentListener) {
        window.contentListener = listener;

        onMessage((...args) => listener.onMessage(...args));

        onElementChange('body', _debounce(() => listener.onChangeBody(), 400, {maxWait: 5000}));
    }
}


