# Addon Boilerplate / Shared / Content

---

## Description of the **Content** Directory

The **Content** directory in the **Shared** folder contains the content scripts that run directly on the web pages that
the extension interacts with. **Content scripts** allow the extension to manipulate DOM elements on the webpage and
communicate with the background script for data processing, event handling, and message exchanges.

Content scripts do not run in the context of the browser itself — they operate in the context of the web page, enabling
them to modify and interact with the elements on the page. Similar to the **Background** directory, **Content** uses a *
*Listener**, where each method handles a specific event or action on the page.

## Structure and Key Points

1. **Listener Class** — The main class where each method handles specific events on the page. This could include
   handling DOM changes, sending messages to the background script, or interacting with other tabs.

2. **`onContent` Function** — Similar to the **onBackground** function, this function registers events for content
   scripts. All events are initialized through an instance of the **Listener** class.

3. **Integration with Background Script** — Content scripts often interact with the background script through message
   exchanges using the browser's API. This is necessary for sending data or reacting to actions that occur in the
   background.

## Example of the Listener Class

Here is a simplified example of the **Listener** class, where methods handle specific events on the page, such as
monitoring DOM changes or handling messages from the background script.

```typescript
import Parser from "./Parser";

import {MessageCallback, MessageTypes} from "@typings/message";

export interface ListenerOptions {
    watchElement: string;  // Option to specify the element to watch
}

export default class {
    private readonly parser: Parser = new Parser();

    constructor(private readonly options: ListenerOptions) {
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

```

## Example of the `onContent` Function

This function is used to register content script events, similar to how events are registered for the background script.

```typescript
import onElementChange from "element-change";

import _debounce from "lodash/debounce";

import Listener from "./Listener";

export {Listener};

import {onMessage} from "@api/runtime";

declare global {
    interface Window {
        contentListener?: Listener;
    }
}

export const onContent = (listener: Listener): void => {
    if (!window.contentListener) {
        window.contentListener = listener;

        onMessage((...args) => listener.onMessage(...args));

        onElementChange('body', _debounce(() => listener.onChangeBody(), 400, {maxWait: 5000}));
    }
}
```

Example usage of Listener:

```typescript
import {Listener, ListenerOptions, onContent} from "@content";

const options: ListenerOptions = {watchElement: '#target-element'};
onContent(new Listener(options));
```

## Explanation:

1. **Listener Class**:
    - The constructor accepts parameters that define which elements on the page to monitor or how to interact with the
      content of the page.
    - The **observeElement** method is used to monitor changes in DOM elements using the **MutationObserver** API. This
      is useful for tracking changes on the page and performing actions based on those changes.
    - **onMessage** — this method handles messages from the background script or other parts of the extension.

2. **onContent**:
    - The **onContent** function registers events for the content script using the methods of **Listener**. It
      initializes the element observer and registers a message handler via **chrome.runtime.onMessage**.

3. **Flexibility**:
    - This approach allows for easily extending the functionality of the content script by adding new methods to the *
      *Listener** class to handle other events or interactions with the web page.

## Conclusion

The **Content** directory is responsible for the functioning of content scripts that interact with web pages. Similar to
background scripts, the key element here is the **Listener** class, which provides methods for handling events on the
page and communicating with the background script. All events are registered in the **onContent** function, which
creates an instance of **Listener** and initializes the necessary listeners. This approach ensures modularity and easy
extension of content script functionality for each extension.