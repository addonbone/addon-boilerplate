# Addon Boilerplate / Shared / API

## Description of the **API** Directory

The **API** directory is designed to store all functions that interact with browser APIs, such as the **Chrome API**, **Firefox API**, as well as external APIs if necessary. A key aspect of working with browser APIs is that all interactions are wrapped in **Promise** to standardize asynchronous task handling and ensure compatibility across different browsers.

## Structure and Purpose

This directory contains files that act as modules for interacting with various parts of the browser: working with tabs, managing notifications, communicating with background and content scripts, executing scripts, modifying the extension's interface, and more.

The core principles for working in the **API** directory are based on the following key points:

1. **Promise-oriented API handling**:
    - All functions are wrapped in **Promise** to ensure proper handling in modern browsers and to standardize API usage across different browser versions. This also allows for more convenient handling of asynchronous operations using **async/await**.

2. **Cross-browser compatibility**:
    - Functions should support different browsers such as **Chrome**, **Firefox**, **Edge**, and others.

3. **Universal solutions for different API versions**:
    - Since some APIs may behave differently depending on the manifest version (e.g., using **browserAction** or **action** depending on the version), logic is implemented within the functions to choose the correct approach.


## Example of a Simple API Function

Below is an example of a simple function from the **API** directory that retrieves all open tabs in the browser:

```typescript
/**
 * Get all open tabs in the browser
 * @returns {Promise<chrome.tabs.Tab[]>} - Returns a Promise with an array of tabs
 */
export const getAllTabs = () => new Promise<chrome.tabs.Tab[]>((resolve, reject) => {
    try {
        chrome.tabs.query({}, (tabs) => {
            if (chrome.runtime.lastError) {
                return reject(chrome.runtime.lastError);
            }
            resolve(tabs);
        });
    } catch (e) {
        reject(e);
    }
});
```

**Explanation**:
- **getAllTabs** is a simple function that uses the **Chrome API** to retrieve all open tabs in the browser.
- The **chrome.tabs.query** call is wrapped in a **Promise** to enable asynchronous handling.
- If the tabs are successfully retrieved, they are passed to **resolve**. Otherwise, errors are handled via **reject**.

Example of how to use this function:

```typescript
getAllTabs()
    .then(tabs => {
        console.log('Open tabs:', tabs);
    })
    .catch(error => {
        console.error('Error getting tabs:', error);
    });
```

This example shows how to work with the tabs API using a unified approach with **Promise**.
