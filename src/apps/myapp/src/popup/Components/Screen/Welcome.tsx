import React, {FC, memo, useEffect} from "react";

import {useAgreement} from "@agreement";
import {useAnalytics} from "@analytics";

import WelcomeModal from "../Modal/WelcomeModal";

import {Agreement} from "@typings/agreement";

const Welcome: FC = () => {
    const analytics = useAnalytics();

    const {ready, agreements, setAgreement} = useAgreement();

    const open = ready && !agreements.welcome;

    useEffect(() => {
        if (!open) {
            return;
        }

        analytics.screenView("popup_welcome");

        const timeoutId = setTimeout(() => {
            setAgreement(Agreement.Welcome, true);
        }, 2800);

        return () => {
            clearTimeout(timeoutId);
        }
    }, [open]);

    return (
        <WelcomeModal
            open={open}
        />
    );
}

export default memo(Welcome);
