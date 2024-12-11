import React, {FC} from "react";
import {Optional} from "utility-types";

import {AnalyticsProvider} from "@analytics";
import {AgreementProvider} from "@agreement";
import {ConfigProvider} from "@config";
import {LocaleProvider} from "@locale";
import {ThemeProvider} from "@theme";

import {StoreProvider} from "./Store";

import Main, {MainProps} from "./Components/Container/Main";

import "./popup.scss";

export type PopupProps = Optional<MainProps>;

const Popup: FC<PopupProps> = (props) => {
    return (
        <AgreementProvider>
            <ConfigProvider>
                <AnalyticsProvider>
                    <LocaleProvider>
                        <ThemeProvider>
                            <StoreProvider>
                                <Main {...props}/>
                            </StoreProvider>
                        </ThemeProvider>
                    </LocaleProvider>
                </AnalyticsProvider>
            </ConfigProvider>
        </AgreementProvider>
    );
};

export default Popup;
