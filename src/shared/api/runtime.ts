import {app, isPlatform} from "./env";

import {MessageContract, MessageListener, MessageResponse} from "@typings/message";
import {Platform} from "@typings/env";

import ConnectInfo = chrome.runtime.ConnectInfo;
import Port = chrome.runtime.Port;
import PlatformInfo = chrome.runtime.PlatformInfo;

export interface RuntimePort extends Pick<Port, 'sender' | 'name'> {
    port: Port;

    postMessage(message: MessageContract): void;

    disconnect(): void;

    onMessage(callback: (message: MessageContract, port: RuntimePort) => void): { (): void };

    onDisconnect(callback: (port: RuntimePort) => void): { (): void };
}

const runtime = app().runtime;

export const getUrl = (path: string) => runtime.getURL(path);

export const getManifest = () => runtime.getManifest();

export const getVersion = () => getManifest().version;

export const getId = (): string => {
    return runtime.id;
};

export const getIdStringify = (): string => {
    let id = getId();

    if (isPlatform(Platform.Firefox) && id.includes('@temporary-addon')) {
        id = id.replace('@temporary-addon', '');
    } else if (isPlatform(Platform.Safari) && id.includes('UNSIGNED')) {
        id = 'safari-dev-id';
    }

    id = id.replace(/[^a-z0-9]/gi, '');

    if (id.length === 0) {
        return 'id';
    }

    return id;
}

export const getManifestVersion = () => getManifest().manifest_version;

export const isManifestVersion3 = () => getManifestVersion() === 3;

export const connect = (info: ConnectInfo): RuntimePort => {
    return getRuntimePort(runtime.connect(getId(), info));
}

export const throwRuntimeError = () => {
    const error = runtime.lastError;

    if (error) {
        throw new Error(error.message);
    }
}

export const sendMessage = <M extends MessageContract = MessageContract, R = MessageResponse[M['type']]>(message: M) => new Promise<R>((resolve, reject) => {
    runtime.sendMessage(message, response => {
        try {
            throwRuntimeError();

            resolve(response);
        } catch (e) {
            reject(e);
        }
    });
});

export const getPlatformInfo = (): Promise<PlatformInfo> => new Promise<PlatformInfo>((resolve, reject) => {
    chrome.runtime.getPlatformInfo((platformInfo) => {
        try {
            throwRuntimeError();

            resolve(platformInfo);
        } catch (e) {
            reject(e);
        }
    });
});

export const getRuntimePort = (port: Port): RuntimePort => {
    return {
        port,
        name: port.name,
        sender: port.sender,
        postMessage(message: MessageContract) {
            port.postMessage(message);
        },
        disconnect() {
            port.disconnect();
        },
        onMessage(callback: (message: MessageContract, port: RuntimePort) => void) {
            const handle = (message: MessageContract, _port: Port): void => {
                if (port.name === _port.name) {
                    callback(message, getRuntimePort(_port));
                }
            }

            port.onMessage.addListener(handle);

            return () => port.onMessage.removeListener(handle);
        },
        onDisconnect(callback: (port: RuntimePort) => void) {
            const handle = (_port: Port): void => {
                if (port.name === _port.name) {
                    callback(getRuntimePort(_port))
                }
            }

            port.onDisconnect.addListener(handle);

            return () => port.onDisconnect.removeListener(handle);
        }
    }
}

export const onMessage: MessageListener = (callback): Function => {
    runtime.onMessage.addListener(callback);

    return () => runtime.onMessage.removeListener(callback);
}

export const onInstalled = (callback: Parameters<typeof chrome.runtime.onInstalled.addListener>[0]) => {
    runtime.onInstalled.addListener(callback);
}

export const onConnect = (callback: (port: RuntimePort) => void) => {
    runtime.onConnect.addListener((port) => {
        callback(getRuntimePort(port))
    });
}
