import React, {StrictMode} from "react";
import {createRoot} from "react-dom/client";

import "../theme";
import "./Components/Modal/WelcomeModal";

import Welcome from "./Components/Screen/Welcome";

import Popup from "@popup";

const element = (
    <StrictMode>
        <Popup>
            <Welcome/>
        </Popup>
    </StrictMode>
);

createRoot(document.getElementById('root')!).render(element);