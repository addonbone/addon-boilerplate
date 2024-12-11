import {getUrl} from "@api/runtime";

export const getOffscreenUrl = (): string => getUrl('html/offscreen.html');
export const getPolicyUrl = (): string => getUrl('html/policy.html');