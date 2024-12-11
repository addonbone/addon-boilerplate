import React, {useEffect, useState} from "react";

import Config from "@services/config";

import {getPlatform} from "@api/env";

import {ConfigContext, DefaultConfig} from "./context";

import {Platform} from "@typings/env";
import {ConfigContract} from "@typings/config";
import {FC} from "@typings/react";

const Provider: FC = ({children}) => {
    const [config, setConfig] = useState<ConfigContract>(DefaultConfig);

    useEffect(() => {
        document.querySelector("html")?.setAttribute("platform", getPlatform() || Platform.Chrome);

        Config.makeAndLoad().then(config => {
            setConfig(config);
        }).catch(e => {
            console.log('Config Provider fetch config error', e);
        });
    }, []);

    return (
        <ConfigContext.Provider value={config}>
            {children}
        </ConfigContext.Provider>
    )
}

Provider.displayName = "ConfigProvider";

export default Provider;
