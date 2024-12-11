import React, {StrictMode} from "react";
import {createRoot} from 'react-dom/client';

import Policy from "@policy";

import "../theme";
import "./Components/Base/TopHeader";

createRoot(document.getElementById('root')!).render(<StrictMode><Policy/></StrictMode>);
