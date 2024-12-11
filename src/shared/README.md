# Addon Boilerplate / Shared

---

## Description of the **Shared** Directory

The **Shared** directory in the project is a key architectural element that contains common modules used across all extensions. 

All core functionality, common logic, and reusable code that power the extensions are defined here, while the Apps (`src/apps`) directory only customizes and extends these base capabilities with additional styles, images, or optional screens. 

It is designed to store reusable code to avoid duplication and ensure modularity. This directory holds important elements such as API, background and content scripts, common components, styles, and services. Inside **Shared**, there are several subfolders, each with its own purpose.

If, within the scope of the project, it becomes necessary to create a new page—for example, to implement a “new tab” feature or any other standalone interface component—it is recommended to add a dedicated directory for it directly in Shared. This approach allows you to centrally define all the core logic, infrastructure, primary components, and providers required for the new page’s functionality.

### 1. [**API**](./api)

**Description**:

- The **API** directory contains a set of functions that simplify interaction with browser APIs, such as the **Chrome
  API** or **Firefox API**, as well as any external APIs, if used. These functions are designed to allow developers to
  easily work with various browser features without having to write duplicate code for each API.
- This logic is shared and should not be duplicated in Apps (`src/apps`). 

**Files inside**:

- The API files describe tasks such as working with tabs, interacting with background scripts, managing notifications,
  storage handling, script execution, and theme management.
- Example: In **action.ts**, functions are implemented to manage extension icons, change badge colors, and modify badge
  text in the browser.

### 2. [**Background**](./background)

**Description**:

- **Background** is the directory where files responsible for the extension's background script are stored. The
  background script is typically used for long-running tasks that operate outside of the active tab's context. This
  script generally functions as a service worker in modern browsers.
- https://developer.chrome.com/docs/extensions/reference/manifest/background

**Key Elements**:

- The files in this directory contain logic that manages core processes of the extension, such as installation,
  communication with content scripts via the Chrome API, and the integration of services like analytics and
  localization.
- This logic is shared and should not be duplicated in Apps (`src/apps`). Instead, Apps import and use these modules, adding only their specific customizations.

**Listener Class**:

- Every background script uses a **Listener**, which registers necessary event listeners such as extension installation,
  interaction between tabs, or receiving messages.

### 3. [**Content**](./content)

**Description**:

- The **Content** directory contains content scripts that run directly on web pages. Content scripts allow interaction
  with the DOM elements of pages and facilitate communication with background scripts.
- This logic is shared and should not be duplicated in Apps (`src/apps`). Instead, Apps import and use these modules, adding only their specific customizations.
- https://developer.chrome.com/docs/extensions/reference/manifest/content-scripts

**Key Files**:

- Inside this directory, the **Listener** is also used to set up events for interacting with web pages, such as
  listening for changes in elements on the page, sending data to the background script, or implementing parsers for web
  content.

### 4. [**Core**](./core)

**Description**:

- **Core** is the directory for storing essential React components and providers that can be reused across various
  visual elements (such as Popup or Sidebar). Important elements like user agreements, analytics, configuration, themes,
  and localization are implemented here.

**Key Modules**:

- **Agreement**: A provider for managing user agreements.
- **Analytics**: A provider for integrating with analytics services such as Google Analytics.
- **Config**: A provider for retrieving and working with the application configuration.
- **Locale**: A module for managing the application’s localization.
- **Theme**: Handles theme management, such as dark or light modes.

### 5. [**Offscreen**](./offscreen)

**Description**:

- The **Offscreen** directory contains components needed for working with "offscreen" processes in the browser. These
  are tasks that run outside the visible area of the page, such as processing data in the background or interacting with
  files without direct user involvement.
- https://developer.chrome.com/docs/extensions/reference/api/offscreen

### 6. [**Policy**](./policy)

**Description**:

- **Policy** contains components and files related to usage policies and privacy. They can be displayed to users through
  the extension's interface, providing information on data usage rules, user agreements, and rights.

### 7. [**Popup**](./popup)

**Description**:

- This directory contains components responsible for the **Popup** interface, the extension’s popup window. **Popup** is
  a React component with pre-configured providers that manage agreements, configuration, analytics, localization, and
  themes. Developers can extend or modify this component based on the needs of a specific extension.
- This logic is shared and should not be duplicated in Apps (`src/apps`). Instead, Apps import and use these modules, adding only their specific customizations.
- https://developer.chrome.com/docs/extensions/reference/api/action
- https://developer.chrome.com/docs/extensions/reference/api/sidePanel

### 8. [**Public**](./public)

**Description**:

- **Public** includes static resources such as images and localization files that are used across all extensions. These
  files are copied into the root directory of the extension during the build process and can be shared across different
  applications.

### 9. [**Services**](./services)

**Description**:

- The **Services** directory contains services that handle global tasks in the application. These include services for
  analytics, configuration, and localization. If a developer wants to write custom logic for working with data or APIs,
  it should be done in services. Examples of such services might include a **Parser** for processing web page data or a
  **Finder** for searching and filtering images.
- This logic is shared and should not be duplicated in Apps (`src/apps`).

### 10. [**Types**](./types)

**Description**:

- This directory stores **TypeScript** types and interfaces used throughout the application. They define the structure
  of messages between content scripts and background scripts, as well as interactions with other APIs and objects.
- This logic is shared and should not be duplicated in Apps (`src/apps`).

### 11. [**Utils**](./utils)

**Description**:

- **Utils** contains a set of helper functions that help optimize and simplify development. These can be functions for
  working with promises, strings, arrays, and other general-purpose utilities.
