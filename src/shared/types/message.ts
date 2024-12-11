import {ActionPayload} from "./action";

import {ReadonlyConfig} from "@typings/config";

import MessageSender = chrome.runtime.MessageSender;

export enum MessageTypes {
    GetSender = "GET_SENDER",
    GetConfig = "GET_CONFIG",
}

export type MessageRequest = {
    [MessageTypes.GetSender]: undefined;
    [MessageTypes.GetConfig]: undefined;
}

export type MessageResponse = {
    [MessageTypes.GetSender]: MessageSender;
    [MessageTypes.GetConfig]: ReadonlyConfig | undefined;
}

export type MessageContract = ActionPayload<MessageRequest>;

export type MessageCallback<T extends MessageTypes = MessageTypes> = (message: MessageContract, sender: MessageSender, sendResponse: (response?: MessageResponse[T]) => void) => void;

export type MessageListener<T extends MessageTypes = MessageTypes> = { (callback: MessageCallback<T>): Function };
