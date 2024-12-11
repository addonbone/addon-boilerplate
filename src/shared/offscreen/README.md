# Addon Boilerplate / Shared / Offscreen

---

## Description of the **Offscreen** Directory

The **Offscreen** directory in the **Shared** folder is responsible for handling the logic of **offscreen** scripts. **Offscreen** mode is a special feature used in browser extensions to perform tasks outside of the visible area of a web
page. These scripts allow extensions to work with files, data, or perform background tasks without directly interacting
with the user. As with the **Background** and **Content** directories, **Offscreen** also uses a **Listener** to
register events and manage data processing.

## Structure and Key Points

1. **Listener Class** — The main class where each method handles specific events in the **offscreen** script. These
   events can include background tasks, file processing, or interaction with other parts of the extension.

2. **`onOffscreen` Function** — Similar to **onContent** and **onBackground**, this function is responsible for
   registering events for **offscreen** scripts. All events are registered through methods of the **Listener** class.

3. **Integration with Other Parts of the Extension** — Offscreen scripts can interact with background or content
   scripts, as well as browser APIs, to perform background tasks such as data or file processing without requiring a
   visible user interface.

## Example of the Listener Class

Here is a simplified example of the **Listener** class, where each method handles specific tasks related to **offscreen
** processing.

```typescript
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
```

### Example of the `onOffscreen` Function

The **onOffscreen** function registers listeners for the **offscreen** script, similar to how it’s done for content and
background scripts.

```typescript
import {onMessage} from "@api/runtime";

import Listener, {ListenerOptions} from "./Listener";

export const onOffscreen = (listener: Listener): void => {
    onMessage((...args) => listener.onMessage(...args));
}
```

Example usage of Listener

```typescript
import {Listener, ListenerOptions, onOffscreen} from "@offscreen";

const options: ListenerOptions = {processFile: 'data.txt'};
onOffscreen(new Listener(options));
```

## Explanation:

1. **Listener Class**:
    - The constructor accepts parameters that define the tasks to be performed (e.g., which file to process).
    - **processFile** — A method that performs the main task associated with offscreen mode, such as file or data
      processing, which doesn’t require a user interface.
    - **onMessage** — This method handles incoming messages from other parts of the extension or the browser that may
      trigger additional tasks.

2. **onOffscreen**:
    - This function registers events for the **offscreen** script using the **Listener** methods. Here, the main task (
      e.g., file processing) is executed, and the message handler is registered using **chrome.runtime.onMessage**.

3. **Flexibility**:
    - This approach allows for easily adding new tasks to be performed in the background or offscreen by extending the *
      *Listener** class with new methods.