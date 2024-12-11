# Addon Boilerplate / Shared / Types

---

## Full Description of the **Types** Directory in **Shared**

The **Types** directory in **Shared** is where you will store all the **TypeScript** types and interfaces needed for your extension. **Types** play a crucial role in the architecture by helping you strictly type the data and interactions between different parts of your application. This improves autocomplete, ensures type safety, and helps prevent errors.

>When you're working on your extension, this is the place where you will define all necessary types and interfaces to ensure proper type-checking. This is especially important for message handling between components, interacting with browser APIs, and transferring data between background scripts, content scripts, and other parts of your extension.

## Structure of the **Types** Directory

1. **Purpose**:
    - The **Types** directory holds all the global types and interfaces for the project. These types may be used across different parts of your extension: background scripts, content scripts, **Popup**, **Sidebar**, or other components.
    - You should define the key data structures, messages, and contracts here to simplify communication between the components of your extension. This will help create more predictable and error-free code.

2. **Message Types**:
    - One of the primary tasks of this directory is to define the types for messages used to communicate between background and content scripts via the **Chrome API** or other browser APIs. It's your job to properly type these messages to enable safe data exchange between the components.

3. **Adding Custom Types**:
    - When you develop your own extension, this is where you'll add your custom types and interfaces. For example, if your extension works with specific data or external APIs, you should define all necessary data structures in this directory to maintain strict type safety for your project.


## Code Example Using the **message.ts** File

This example demonstrates how you can define the types for messages sent between content scripts and background scripts, which is a common task in browser extensions.

```typescript
import { ActionPayload } from "./action";
import { ReadonlyConfig } from "@typings/config";
import MessageSender = chrome.runtime.MessageSender;

// Define the message types used for communication between content scripts and background scripts
export enum MessageTypes {
    GetSender = "GET_SENDER",
    GetConfig = "GET_CONFIG"
}

// Define the structure for message requests
export type MessageRequest = {
    [MessageTypes.GetSender]: undefined;
    [MessageTypes.GetConfig]: undefined;
}

// Define the structure for message responses
export type MessageResponse = {
    [MessageTypes.GetSender]: MessageSender;
    [MessageTypes.GetConfig]: ReadonlyConfig | undefined;
}

// Message contract to ensure structured message exchanges
export type MessageContract = ActionPayload<MessageRequest>;

// Define the callback type to handle incoming messages
export type MessageCallback<T extends MessageTypes = MessageTypes> = (
    message: MessageContract[T],
    sender: MessageSender,
    sendResponse: (response?: MessageResponse[T]) => void
) => void;

// Define the interface for registering message listeners
export type MessageListener<T extends MessageTypes = MessageTypes> = {
    (callback: MessageCallback<T>): Function;
};
```

## Explanation of the Example:

1. **MessageTypes**:
    - This enum describes the types of messages that your extension will use to communicate between components. For example, **GetSender** is used to retrieve information about the message sender.

2. **MessageRequest** and **MessageResponse**:
    - These interfaces describe the structure of message requests and responses. When sending a request via an API, you must define what data is sent and what data is expected in return.

3. **MessageContract**:
    - The contract for message types ensures that both requests and responses are well-structured. This helps you manage the message exchange between scripts and prevent data handling errors.

4. **MessageCallback** and **MessageListener**:
    - These interfaces help define functions that handle incoming messages. When your extension receives a message, it will be processed through this callback for further handling.

## Adding Custom Types

As you work on your extension, you will likely need to add your own types. These could be data types for API interactions or custom structures for state management.

Example of adding a custom type:

```typescript
// Define a custom data type for your extension
export type CustomData = {
    id: number;
    name: string;
    description?: string;
};

// Define a response structure for interacting with an external API
export type ApiResponse<T> = {
    status: string;
    data: T;
    error?: string;
};
```

This code shows how you can define custom types to handle data or interact with external services.

## Conclusion

The **Types** directory in **Shared** is your main place for storing all the types and interfaces your extension will need. Your job is to add types here for data structures, messages, contracts, and other elements that help you build a safe and well-typed codebase. This will minimize errors and make your extension more predictable and stable.

When you create your own extension, make sure to use the **Types** directory to define all the necessary data structures and interactions. This will improve the quality of your code and make it easier to maintain in the future.