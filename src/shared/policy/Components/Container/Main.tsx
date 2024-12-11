import React, {FC, useCallback, useEffect} from "react";
import {Optional} from "utility-types";

import {useLocale} from "@locale";
import {useAgreement} from "@agreement";
import {useAnalytics} from "@analytics";

import {isPlatform} from "@api/env";
import {uninstallSelf} from "@api/management";

import {Agreement} from "@typings/agreement";
import {Platform} from "@typings/env";

import Button, {ButtonColor, ButtonMargin, ButtonProps, ButtonSize, ButtonVariant} from "@components/Button";

import Layout from "../Base/Layout";
import TopHeader, {TopHeaderProps} from "../Base/TopHeader";
import Content from "../Base/Content";
import Toolbar from "../Base/Toolbar";

export interface MainProps {
    topHeader?: TopHeaderProps;
    acceptButton?: Optional<ButtonProps>;
}

const Main: FC<MainProps> = (props) => {
    const {_} = useLocale();
    const {setAgreement} = useAgreement();
    const analytics = useAnalytics();

    const {
        topHeader = {},
        acceptButton = {},
    } = props;

    const closeWindow = useCallback(() => {
        setTimeout(() => {
            window.close();
        }, 10);
    }, []);

    const handleAccept = useCallback(() => {
        analytics.userAction('policy_accept');

        setAgreement(Agreement.Policy, true);

        closeWindow();
    }, []);

    const handleClose = useCallback(() => {
        analytics.userAction('policy_close');

        setAgreement(Agreement.Policy, false);

        closeWindow();
    }, []);

    const handleRemove = useCallback(() => {
        analytics.userAction('policy_remove');

        uninstallSelf({showConfirmDialog: true}).catch(e => {
            console.log('Uninstall self error', e);
        });
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            analytics.pageView('policy', location.href, 'Policy');
        }, 500);

        return () => {
            clearTimeout(timer);
        }
    }, []);

    const rejectButton = isPlatform(Platform.Firefox) ? (
        <Button
            color={ButtonColor.Fog}
            size={ButtonSize.Large}
            onClick={handleRemove}
        >{`${_('remove')} (${_('app_title')})`}</Button>
    ) : (
        <Button
            color={ButtonColor.Secondary}
            onClick={handleClose}
        >{_('cancel')}</Button>
    );

    return (
        <Layout>
            <TopHeader {...topHeader}/>
            <Content/>
            <Toolbar>
                <Button
                    color={ButtonColor.Primary}
                    variant={ButtonVariant.Contained}
                    size={ButtonSize.Large}
                    margin={isPlatform(Platform.Firefox) ? ButtonMargin.RightMedium : undefined}
                    {...acceptButton}
                    onClick={handleAccept}
                >{_('accept')}</Button>
                {rejectButton}
            </Toolbar>
        </Layout>
    )
}

export default Main;
