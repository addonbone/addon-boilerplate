# Addon Boilerplate

Addon Boilerplate - TypeScript, React, and Sass for Chrome, Firefox, Edge, Opera, Safari, and Brave.

---

## General Overview of Addon Boilerplate

This Boilerplate is designed to streamline the development of browser extensions for multiple browsers using a unified codebase. Its key capability is enabling the creation of multiple, nearly identical extensions (e.g., two, three, or even ten) from the same foundation, with differences confined to styling, icons, logos, or additional UI components.

**Important Architectural Note:**

All core functionality, shared logic, and primary architecture for background scripts, content scripts, Popups, Sidebars, and Offscreen logic are implemented in the Shared directory. The Apps directory, on the other hand, contains individual extensions that reuse these core functionalities while applying their own custom styling, branding, and supplemental UI components or screens.

## Purpose and Usage

With Addon Boilerplate, you can develop extensions for various browsers while maintaining a single codebase. The core logic, architecture, and component implementation reside in Shared, ensuring consistency and reducing redundancy. Meanwhile, the Apps directory allows you to:
* Override or add styles.
* Add platform- or product-specific images, icons, and logos.
* Introduce extra UI components, such as welcome modals or donation prompts, without duplicating the fundamental logic.

This separation streamlines both development and maintenance: if you change core logic, it updates for all extensions, while each app can maintain a unique visual identity and additional features.

## The project provides:
* A single codebase for all extensions, with core logic and structure located in Shared, simplifying development and maintenance.
* The ability for each extension under Apps to customize styling, add unique components, or modify branding.
* Support for multiple browsers, with flexible adaptation of manifests and other platform-specific files.
* A standardized architecture (in Shared) to handle background scripts, content scripts, and UI elements (Popups, Sidebars) so that the Apps directory can focus on customization.

## Supported Platforms

The Boilerplate supports multiple platforms, including:
* Google Chrome (Chromium)
* Firefox
* Edge
* Opera
* Safari

Each platform has a dedicated directory containing platform-specific files (manifests, localization). These files are merged during the build to produce a separate version of the extension for each platform.

## Main Architecture

The project is modular and split into two main directories:
* [**Shared**](./src/shared): Contains all common logic, services, utilities, providers, and the core implementations of background scripts, content scripts, Popups, and more. This is the “framework” layer used by all extensions, ensuring that any updates here benefit every app.
* [**Apps**](./src/apps): Contains individual extensions that inherit the logic from Shared. Here, you customize styling, add unique icons, logos, or supplementary UI screens. Each app resides in its own folder. The idea is that the base functionality comes from Shared, and Apps merely tailor it to specific needs or branding.
* **Dist**: The directory where the final builds of each extension are output.

Webpack is used to build the project, and developers can control which components (e.g., Popups, Sidebars) are included, as well as set production or development modes and other parameters via command-line options.

## Technical Documentation for Builds

Below is the guidance for building extensions using this boilerplate and Webpack. You’ll learn how to perform production or development builds, pass parameters to customize included components, and add commands to package.json for quick builds and debugging.

Types of Builds
* **Production Build**: Generates an optimized, minified version of the extension for distribution.
* **Development Build**: Provides a local version with source maps and file watchers for rapid iteration.

### Complete Webpack Commands for Builds

All build commands are run using Webpack and accept parameters defined in `webpack.config.js`.

Production build for Chrome:

```bash
webpack --config webpack.config.js --env=app=myapp --env=platform=chrome --env=mode=production
```

Development build (watch mode) for Chrome:

```bash
webpack --config webpack.config.js --env=app=myapp --env=platform=chrome --watch
```

Build with bundle analysis for Chrome:

```bash
webpack --config webpack.config.js --env=app=myapp --env=platform=chrome --env=mode=production --env=analyzer
```

### Build Parameters

Several parameters can be passed during the build process to customize what components are included or excluded from the
build.

#### `platform` (Platform):

Defines the platform the extension is being built for (e.g., Chrome, Firefox, Edge, Opera).
Example:

```bash
webpack --config webpack.config.js --env=app=myapp --env=platform=chrome
```

#### `mode` (Build mode):

Specifies whether the build is for production or development.
Example:

```bash
webpack --config webpack.config.js --env=app=myapp --env=mode=production
```

#### `popup` (Create Popup):

Includes the Popup component in the build.
Example:

```bash
webpack --config webpack.config.js --env=app=myapp --env=popup
```

#### `sidebar` (Create Sidebar):

Specifies whether the Sidebar (an extended version of the Popup) should be included in the build.
Example:

```bash
webpack --config webpack.config.js --env=app=myapp --env=sidebar
```

#### `offscreen` (Create Offscreen):

Includes the Offscreen component in the build.
Example:

```bash
webpack --config webpack.config.js --env=app=myapp --env=offscreen
```

#### `analyzer` (Build Analysis):

Enables Webpack Bundle Analyzer for analyzing bundle sizes.
Example:

```bash
webpack --config webpack.config.js --env=app=myapp --env=analyzer
```

#### `sp` (shared public):

Activates copying files from the `src/shared/public` directory into the build’s root directory.
Example:

```bash
webpack --config webpack.config.js --env=app=myapp --env=sp
```

### Adding New Commands to package.json

When a developer creates a new extension in the `src/apps` folder, they need to add corresponding commands for building and debugging to the `package.json` file.

**Important:** The prefix in the command must match the directory name of the extension in the `src/apps` folder. This ensures that the build will be generated for the correct extension.

Example of adding a new command:

```json
{
  "scripts": {
    "webpack:myapp": "npm run webpack:config -- --env=app=myapp --env=popup --env=sidebar",
    "myapp:build": "npm run webpack:myapp -- --env=mode=production --mode=production",
    "myapp:watch": "npm run webpack:myapp -- --watch",
    "myapp:build:chrome": "npm run myapp:build -- --env=platform=chrome",
    "myapp:watch:chrome": "npm run myapp:watch -- --env=platform=chrome",
    "myapp:analyzer:chrome": "npm run myapp:build:chrome -- --env=analyzer",
    "myapp:build:chromium": "npm run myapp:build -- --env=platform=chromium",
    "myapp:watch:chromium": "npm run myapp:watch -- --env=platform=chromium",
    "myapp:analyzer:chromium": "npm run myapp:build:chromium -- --env=analyzer",
    "myapp:build:opera": "npm run myapp:build -- --env=platform=opera",
    "myapp:watch:opera": "npm run myapp:watch -- --env=platform=opera",
    "myapp:analyzer:opera": "npm run myapp:build:opera -- --env=analyzer",
    "myapp:build:firefox": "npm run myapp:build -- --env=platform=firefox",
    "myapp:watch:firefox": "npm run myapp:watch -- --env=platform=firefox",
    "myapp:analyzer:firefox": "npm run myapp:build:firefox -- --env=analyzer",
    "myapp:build:edge": "npm run myapp:build -- --env=platform=edge",
    "myapp:watch:edge": "npm run myapp:watch -- --env=platform=edge",
    "myapp:analyzer:edge": "npm run myapp:build:edge -- --env=analyzer"
  }
}
```

### Modifying Webpack Configuration

The provided Webpack configuration is a base setup designed to be flexible for common use cases. However, developers are free to modify the Webpack configuration to meet their specific project requirements. Custom configurations can be added or adjusted to extend functionality as needed for unique builds or project setups.

### Conclusion

Using these commands and parameters, Webpack allows for easy control over the build process for extensions across different platforms, including selecting the necessary components and analyzing bundle sizes. For each new extension, developers should add corresponding commands to package.json to simplify the build and debugging process.


---

## Setup

```
npm install
```

## Load extension to browser

Load `dist` directory


## API Documentation

- [Chrome](https://developer.chrome.com/docs/extensions/reference/api)