# Addon Boilerplate / Shared / Popup

---

## Full Description of the **Popup** Directory

The **Popup** directory in the project is responsible for implementing the user interface of the extension's popup window, which appears when interacting with the extension's icon in the browser. It serves as the main interface through which the user interacts with the extension's functionality. The **Popup** uses React components, state and data management providers, as well as styles specific to this interface.

The **Popup** directory includes several key components and providers that ensure flexibility and reusability. Additionally, the core elements specific to the **Popup** are organized into three main groups: **Components**, **Store**, and the main component **Popup.tsx**.

## Structure of the **Popup** Directory

1. **Components**
    - The **Components** directory stores all components used within the **Popup**. The components are organized into three key subdirectories:

    - **Base**:
        - This folder contains basic components that are specific to the **Popup**. For example, buttons to close the window or navigation elements that are used solely within the popup interface. General components shared across the application are stored in **Core Components**.

    - **Container**:
        - **Container** combines several screens and manages the application's structure. For example, **Main.tsx** is the main container that controls the display of different screens based on the application's state or routing. It is a container component that links the components within **Popup** and handles routing between screens.

    - **Screen**:
        - This directory contains the screens that the user sees. Each file represents a separate screen or page inside the **Popup**. For example, **Example.tsx** may display specific information, **Loading.tsx** shows a loading screen, and **Router.tsx** manages routing between different screens.


## Example Code for **Popup.tsx**

**Popup.tsx** is the main component that renders the popup window's interface. It includes several providers and renders the main container (**Main.tsx**) with the screens.

```typescript
import React, {FC} from "react";
import {Optional} from "utility-types";
import {AnalyticsProvider} from "@analytics";
import {AgreementProvider} from "@agreement";
import {ConfigProvider} from "@config";
import {LocaleProvider} from "@locale";
import {ThemeProvider} from "@theme";
import {StoreProvider} from "./Store";
import Main, {MainProps} from "./Components/Container/Main";

import "./popup.scss";

export type PopupProps = Optional<MainProps>;

const Popup: FC<PopupProps> = (props) => {
    return (
        <AnalyticsProvider>
            <AgreementProvider>
                <ConfigProvider>
                    <LocaleProvider>
                        <ThemeProvider>
                            <StoreProvider>
                                <Main {...props}/>
                            </StoreProvider>
                        </ThemeProvider>
                    </LocaleProvider>
                </ConfigProvider>
            </AgreementProvider>
        </AnalyticsProvider>
    );
}

export default Popup;
```

## Explanation:
1. **Providers**:
    - Inside **Popup.tsx**, various providers are used, such as **AgreementProvider**, **ConfigProvider**, **AnalyticsProvider**, **LocaleProvider**, **ThemeProvider**, and **StoreProvider**. These providers give access to critical data and services like analytics, agreements, configurations, localization, and theme management.

2. **Main Component**:
    - **Main.tsx**, which is imported from **Container**, is the main component rendering all **Popup** screens. This component can switch between different screens and pass state or data through the providers.


## Store — State Management

In **Popup**, a simple state management system is implemented using **useReducer**. This allows for managing the application's state and easily updating it based on user interactions.

1. **Provider.tsx**:
    - **Provider** initializes the state store and provides it to all **Popup** components via context. It uses **useReducer** to manage state and actions, providing a simple and flexible state management system.

2. **reducer**:
    - Inside the **reducer** folder, reducers manage state changes based on different actions. For example, reducers handle data loading (**loading.ts**) and manage browser tabs (**tab.ts**).


### Example of a Reducer for Loading State

```typescript
import {Types} from "./types";
import {ChildReducer} from "../context";

const loadingReducer: ChildReducer<boolean | undefined> = (loading, action) => {
   switch (action.type) {
      case Types.Loading:
         return action.payload;

      case Types.Reset:
         return false;
   }

   return loading;
}

export default loadingReducer;
```

### Structure Explanation:

1. **StoreProvider**:
    - The **StoreProvider** component initializes the store using **useReducer** and provides access to the state and methods to change the state via **StoreContext**. This allows any components within **Popup** to access the current state and trigger actions to update it.

2. **Reducer**:
    - The reducer manages state changes based on actions. For example, depending on the action type **LOADING_START** or **LOADING_END**, the reducer updates the loading state of the application.

3. **Flexibility**:
    - Using **useReducer** provides basic state management. If the project requires a more complex state management system, **useReducer** can easily be replaced with more powerful tools such as **Redux** or **Redux Toolkit**.
