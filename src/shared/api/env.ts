import _startCase from "lodash/startCase";

import {Platform} from "@typings/env";

export const app = (): typeof chrome => {
    return chrome;
}

export const getPlatform = (): Platform | undefined => {
    return process.env.PLATFORM as Platform | undefined;
}

export const isPlatform = (platform: Platform): boolean => {
    return getPlatform() === platform;
}

export const getPlatformTitle = (): string =>  {
    return _startCase(getPlatform() || Platform.Chrome);
}

export const isTesting = (): boolean => {
    return !!process.env.TESTING;
}