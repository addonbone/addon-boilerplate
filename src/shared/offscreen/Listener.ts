import {MessageCallback, MessageTypes} from "@typings/message";

export interface ListenerOptions {

}

export default class {

    constructor(options?: ListenerOptions) {

    }

    public onMessage(...params: Parameters<MessageCallback>): void {
        const [message, sender, sendResponse] = params;

        // For example, to get the sender of the message:
        switch (message.type) {
            case MessageTypes.GetSender:
                sendResponse(sender);

                break;
        }
    }
}