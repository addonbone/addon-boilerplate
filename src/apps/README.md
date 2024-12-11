# Addon Boilerplate / Apps

---

## Full Description of the **Apps** Directory

The **Apps** directory is the core part of your project, where all the browser extensions you develop are located. Unlike **Shared**, which contains components and modules shared across all extensions, **Apps** holds separate directories for each of your extensions. This structure allows you to create multiple different extensions using the same codebase with minimal changes to configurations, styles, and interfaces.

### Main Concept:
Each extension in the **Apps** directory has its own folder structure and files, which define its settings, resources, platforms, and other components. The strength of this architecture is that you can develop multiple extensions using the same underlying code while customizing styles, logos, icons, and other elements specific to each extension.


## Folder Structure Inside **Apps**

1. **Purpose**:
    - The **Apps** directory contains a separate folder for each extension you develop. For example, if you have two extensions—one for downloading images (ImageDownloader) and another for saving GIF files (GifSaver)—you will create two separate folders for each extension inside **Apps**.
    - This allows each extension to have its own configuration and resources while still leveraging shared components from **Shared**.

2. **Folder Structure for Each Extension**:
    - Inside each extension folder, such as **myapp**, several important subdirectories are present:


### Example of the Folder Structure for an Extension:

```
apps/
└── myapp/
    ├── platform/
    │   ├── chrome/
    │   │   ├── manifest.json
    │   │   └── _locales/
    │   │       └── en/
    │   │           └── messages.json
    │   ├── chromium/
    │   │   ├── manifest.json
    │   ├── edge/
    │   │   ├── manifest.json
    │   ├── firefox/
    │   │   ├── manifest.json
    │   └── opera/
    │       ├── manifest.json
    ├── public/
    │   ├── _locales/
    │   └── img/
    └── src/
        ├── background/
        ├── config/
        ├── content/
        ├── offscreen/
        ├── policy/
        ├── popup/
        └── theme/
```

## Subdirectory Descriptions Inside Each Extension:

1. **platform**:
    - This folder contains settings for different browsers and platforms that your extension can run on. Inside each subdirectory (for example, **chrome**, **edge**, **firefox**), you will find platform-specific files such as **manifest.json** and other configuration files necessary to ensure the extension works correctly in the chosen browser.
    - Each browser can also have custom localizations for specific languages in the **_locales** folder. For instance, if you need a different localization for the **en** language in **chrome**, you can add it under **_locales/en/messages.json**.
    - All files located within the platform directory (e.g., **manifest.json** and localization files) will be automatically copied to the root directory of your extension during the build process.

2. **public**:
    - This folder contains static resources such as images and common localization files for all languages. These files are copied to the root directory of the extension during the build. The **_locales** subdirectory contains translations for different languages, while **img** stores images, icons, and other graphical resources.

3. **src**:
    - This is the main folder where all your extension’s code is located:
        - **background**: code for the background script, responsible for long-running tasks in the extension.
        - **config**: here you can store configuration files for your extension.
        - **content**: code for content scripts that interact with web pages.
        - **offscreen**: scripts for "offscreen" tasks, such as background data processing.
        - **policy**: this layer is used to display terms of service or privacy policies.
        - **popup**: code for the popup window (**Popup**) that the user interacts with when using the extension. These are React components with their own logic and styles.
        - **theme**: stores the styles and themes for your extension, allowing you to manage both light and dark themes.

4. **README.md**:
    - Each extension should have documentation in the form of a **README.md** file. This file contains information about the project, build and debugging instructions, and links to helpful resources.

## Conclusion

The **Apps** directory is the central place in your project where all your extensions reside. Each extension has its own structure and resources, but it uses shared components from the **Shared** directory. This organization makes it easy to maintain and develop several different extensions using one codebase with minimal changes for each platform or product.

Everything located inside the platform directories (such as **manifest.json** and localization files) will be automatically moved to the extension's root directory during the build process, simplifying the process of adapting the extension to different browsers and platforms.