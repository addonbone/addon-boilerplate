# Addon Boilerplate / Shared / Core

---

## Description of the **Core** Directory in **Shared**

The **Core** directory in the **Shared** folder contains fundamental React components and providers that are reused across various parts of the extension, such as **Popup**, **Sidebar**, or other visual components. These are foundational blocks that provide essential functionality for the user interface and offer key services, such as theme management, localization, user agreements, configuration, and analytics.


## Structure and Key Points

1. **Providers**:
    - The **Core** directory includes providers that give access to global data and services through React’s context API. This allows all child components to access these data without the need to pass props down manually.
    - Key providers include:
        - **AgreementProvider** — Manages data related to user agreements (e.g., user consent for data usage or other agreements).
        - **ConfigProvider** — Provides access to the app's configuration, which is loaded from an external source.
        - **AnalyticsProvider** — Sends analytics data to a chosen analytics service (e.g., Google Analytics).
        - **LocaleProvider** — Manages the app’s localization, enabling the interface to be available in different languages.
        - **ThemeProvider** — Handles theme management (light or dark mode).

2. **Core Components**:
    - The **Core** directory contains basic UI components like buttons, modals, panels, notifications, and other interface elements that can be used throughout the application.
    - All components follow a clear structure: each component is placed in its own directory containing the component file (`tsx`), style file (`scss`), and exports through `index.ts`.

3. **Code Reusability**:
    - All elements and providers in **Core** are designed to be as modular and reusable as possible. Any component can be used in any part of the application, minimizing code duplication and making it easier to develop new features.


## React Component Writing Style

In the project, developers should follow a specific style when writing React components to ensure code maintainability and readability. Below are the key principles to follow:

1. **Component Structure**:
    - Each component should be placed in its own directory, containing three main files:
        - **`Component.tsx`** — The main component file.
        - **`Component.scss`** — The style file written using the Sass (SCSS) preprocessor.
        - **`index.ts`** — A file for exporting the component and related objects (e.g., types, interfaces, or enums).

   Example structure:
   ```
   /Button
      /button.scss
      /Button.tsx
      /index.ts
   ```

2. **Import and Export**:
    - All components should be exported through `index.ts`, making it easy to import them in other parts of the project.
    - The `index.ts` file should export both the component and any related types or enums.

   Example:
   ```typescript
   export { default as Button } from './Button';
   export type { ButtonProps } from './Button';
   ```

3. **Component Structure**:
    - Each component should be written as a **functional component** using **React Hooks**. This allows the use of modern React features like **useState**, **useEffect**, and context API.
    - Developers should avoid class components unless there is a strong reason to use them.

   Example of a simple **Button** component:
   ```typescript
   import React, { FC, memo } from 'react';
   import classnames from 'classnames';
   import styles from './button.scss';

   export interface ButtonProps {
       label: string;
       onClick: () => void;
       disabled?: boolean;
   }

   const Button: FC<ButtonProps> = ({ label, onClick, disabled = false }) => {
       return (
           <button
               className={classnames(styles.button, { [styles.disabled]: disabled })}
               onClick={onClick}
               disabled={disabled}
           >
               {label}
           </button>
       );
   };

   export default memo(Button);
   ```

4. **Styling**:
    - Components use SCSS for styling. Each component should have its own style file with modular CSS. This ensures that styles for one component do not interfere with other components.
    - **CSS Modules** are used to isolate styles and prevent conflicts between components.

   Example of styles for the **Button** component:
   ```scss
   .button {
       padding: 10px 20px;
       font-size: 16px;
       background-color: #007bff;
       color: #fff;
       border: none;
       border-radius: 4px;
       cursor: pointer;

       &.disabled {
           background-color: #c0c0c0;
           cursor: not-allowed;
       }
   }
   ```

5. **TypeScript Usage**:
    - **TypeScript** is mandatory for all components. Every component should be strictly typed, including parameters (props) and return values. This provides better IDE support and prevents potential runtime errors.
    - Proper type definitions allow developers to understand the data being passed to components and what they should return.
