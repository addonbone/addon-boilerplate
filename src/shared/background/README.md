# Addon Boilerplate / Shared / Background

---

## Description of the **Background** Directory

The **Background** directory in the **Shared** folder contains the logic for the background script, which handles
long-running tasks in the browser extension. The background script works independently of active tabs and functions as a
**service worker**. Its main purpose is to handle events such as extension installation, activation, inter-tab
communication, and other tasks that require continuous background operation.

The background script is typically responsible for:

- Registering events related to the extension’s functionality (e.g., installation, activation, message handling).
- Communicating with other components of the extension, such as content scripts.
- Integrating with services such as analytics, configuration, and localization.

## Structure and Key Points

1. **Listener Class** — This is the main class where each function is responsible for handling a specific event (e.g.,
   extension installation or receiving messages). It does not register listeners by itself but provides methods to
   handle the events.

2. **`onBackground` Function** — In this function, all background script events are registered. Here, an instance of the
   **Listener** class is created, and event listeners are registered using the methods of this class.

3. **Service Integration** — Upon starting the **Listener**, additional services such as analytics or localization may
   be initialized. These services are managed at the event level.


## Example of the Listener Class

Here is a simplified example of the **Listener** class, where each function is responsible for a specific event (e.g.,
extension installation or receiving messages).

```typescript
import {MessageCallback} from "@typings/message";
import InstalledDetails = chrome.runtime.InstalledDetails;

export interface ListenerOptions {
    configUrl: string;
}

export default class Listener {
    constructor(private readonly options: ListenerOptions) {
        // Initialize configuration and other services
        console.log(`Config URL: ${this.options.configUrl}`);
    }

    // Handle extension installation event
    public onInstalled(details: InstalledDetails): void {
        console.log('Extension installed:', details);
        // Additional logic to handle the installation event
    }

    // Handle incoming messages
    public onMessage(...params: Parameters<MessageCallback>): void {
        const [message, sender, sendResponse] = params;
        
        console.log('Message received:', message);
        sendResponse({status: 'ok'});
    }
}
```

## Example of Event Registration

The `onBackground` function registers event listeners using the **Listener** methods.

```typescript
import {onInstalled, onMessage} from "@api/runtime";

import Listener, {ListenerOptions} from "./Listener";

export {Listener, ListenerOptions};

export const onBackground = (listener: Listener): void => {
    onInstalled((...args) => listener.onInstalled(...args));

    onMessage((...args) => listener.onMessage(...args));
}
```

Example of initializing the Listener

```typescript
import {Listener, ListenerOptions, onBackground} from "@background";

const options: ListenerOptions = {configUrl: 'https://example.com/config'};

onBackground(new Listener(options));
```

## Explanation:

1. **Listener Class**:
    - Each method in the **Listener** class handles one specific event. For example, the **onInstalled** method handles
      the extension installation event, while the **onMessage** method handles messages.
    - The **constructor** accepts options such as a configuration URL, which can be used to set up the extension’s
      behavior.

2. **onBackground**:
    - This function registers event listeners using the methods of the **Listener** class. Here, actual event
      registration takes place through the browser’s API (e.g., **chrome.runtime.onInstalled**).

3. **Flexibility**:
    - Developers can easily extend or modify event-handling logic by adding new methods to the **Listener** class for
      other events (e.g., tab activity monitoring, notifications, etc.).

## Conclusion

The **Background** directory is responsible for managing background processes in the extension. The key element is the *
*Listener** class, where each event is handled by a separate method. All events are registered in the **onBackground**
function, which creates an instance of **Listener** and registers the necessary listeners. This approach provides
flexibility and ease of modification for each extension, allowing the background script to be adapted for specific
application tasks.