# Addon Boilerplate / Shared / Policy

## Full Description of the **Policy** Directory in **Shared** (with structure similar to **Popup**)

The **Policy** directory in **Shared** is designed for displaying user agreements, privacy policies, and terms of
service. This layer is implemented using React components and serves as a static page for displaying important user
information. It’s important to note that the folder structure in **Policy** should follow the same organizational
structure as other layers using React components, such as **Popup**.

## Structure of the **Policy** Directory

1. **Components**
    - Similar to **Popup**, there is a **Components** subdirectory that organizes components into the following key
      groups:

    - **Base**:
        - This folder contains base components specific to **Policy**. For example, this could include headers or text
          blocks used to display user agreements or static pages.

    - **Container**:
        - Container components, such as **Main.tsx**, are responsible for managing several screens or sections. For
          instance, in **Policy**, a container might combine different sections of agreements, like general terms and
          conditions or specific privacy policies.

    - **Screen**:
        - This subdirectory contains individual screens or pages displayed to the user. For example, it could include
          pages for privacy policies or terms of service.

## Example of the Component Structure in **Policy**

```plaintext
Policy
 └── Components
     ├── Base
     │   └── Header.tsx
     ├── Container
     │   └── Main.tsx
     └── Screen
         ├── PrivacyPolicy.tsx
         └── TermsOfService.tsx
```

## Example Code for **PrivacyPolicy.tsx**

```typescript
import React, {FC} from 'react';
import './policy.scss';

const PrivacyPolicy: FC = () => {
    return (
        <div className="policy-container">
            <h1>Privacy Policy</h1>
            <p>This Privacy Policy outlines how we collect and use personal information.</p>
            <h2>Information Collection</h2>
            <p>We may collect personal information in various ways...</p>
        </div>
    );
};

export default PrivacyPolicy;
```

## Store

Unlike **Popup**, most cases of **Policy** do not require a **Store** (state management). However, if needed, the
developer can add a **Store** to manage state and context for agreements or policies.

## Example Styles for **policy.scss**

```scss
.policy-container {
  padding: 20px;
  background-color: #ffffff;
  color: #333;

  h1 {
    font-size: 24px;
    margin-bottom: 10px;
  }

  h2 {
    font-size: 18px;
    margin-top: 20px;
    margin-bottom: 10px;
  }

  p {
    font-size: 14px;
    line-height: 1.6;
    margin-bottom: 15px;
  }
}
```

## Unified Structure for React Components

In projects where React components are used, such as in **Popup** and **Policy**, it is important to maintain a unified
folder structure across all layers. This simplifies code maintenance and scalability, making it easier for developers to
navigate the project and ensuring standardization.

- **Components**: Must always be divided into **Base**, **Container**, and **Screen**.
- **Styles**: Styles for each layer should be organized and applied similarly to other layers.
- **Store (if necessary)**: If state management is needed, the developer can implement **useReducer** or **Redux** with
  a structure similar to that of **Popup**.

