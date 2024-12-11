import {Listener, ListenerOptions, onBackground} from "@background";

import {CONFIG_URL} from "../config/config";

const options: ListenerOptions = {
    configUrl: CONFIG_URL,
};

onBackground(new Listener(options));