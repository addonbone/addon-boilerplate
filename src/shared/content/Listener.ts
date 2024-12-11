import Parser from "./Parser";

import {MessageCallback, MessageTypes} from "@typings/message";

export default class {
    private readonly parser: Parser = new Parser();

    constructor() {
        this.init();
        this.onChangeBody();
    }

    private init(): void {

    }

    public onChangeBody(): void {

    }

    public onMessage(...params: Parameters<MessageCallback>): void {
        const [message, sender, sendResponse] = params;

        switch (message.type) {
            case MessageTypes.GetSender:
                sendResponse(sender);

                break;
        }
    }
}
