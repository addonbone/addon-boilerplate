import {onInstalled, onMessage} from "@api/runtime";

import Listener, {ListenerOptions} from "./Listener";

export {Listener, ListenerOptions};

export const onBackground = (listener: Listener): void => {
    onInstalled((...args) => listener.onInstalled(...args));

    onMessage((...args) => listener.onMessage(...args));
}


