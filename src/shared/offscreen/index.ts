import {onMessage} from "@api/runtime";

import Listener, {ListenerOptions} from "./Listener";

export {Listener, ListenerOptions};

export const onOffscreen = (listener: Listener): void => {
    onMessage((...args) => listener.onMessage(...args));
}