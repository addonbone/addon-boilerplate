import React, {FC} from "react";
import {Optional} from "utility-types";

import {AgreementProvider} from "@agreement";
import {AnalyticsProvider} from "@analytics";
import {ConfigProvider} from "@config";
import {ThemeProvider} from "@theme";

import {LocaleProvider} from "./Locale";

import Main, {MainProps} from "./Components/Container/Main";

import "./policy.scss";

export type PolicyProps = Optional<MainProps>;

const Policy: FC<PolicyProps> = (props) => {
    return (
        <AgreementProvider>
            <ConfigProvider>
                <AnalyticsProvider>
                    <LocaleProvider>
                        <ThemeProvider>
                            <Main {...props}/>
                        </ThemeProvider>
                    </LocaleProvider>
                </AnalyticsProvider>
            </ConfigProvider>
        </AgreementProvider>
    );
};

export default Policy;
