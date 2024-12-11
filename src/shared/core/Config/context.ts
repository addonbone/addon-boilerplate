import {createContext, useContext} from "react";

import Config from "@services/config";

import {ConfigContract} from "@typings/config";

export const DefaultConfig: ConfigContract = Config.make();

export const ConfigContext = createContext<ConfigContract>(DefaultConfig);

ConfigContext.displayName = 'ConfigContext';

export const useConfig = () => useContext(ConfigContext);
