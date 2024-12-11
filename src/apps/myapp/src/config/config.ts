import {getPlatform, isTesting} from "@api/env";

export const CONFIG_URL = `https://web-extension-example.s3.us-east-2.amazonaws.com/${getPlatform()}.${isTesting() ? 'test.' : ''}json`;