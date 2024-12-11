import React, {FC, memo, useEffect} from "react";

import {useLocale} from "@locale";
import {useAnalytics} from "@analytics";
import {useTheme} from "@theme";

import Notice from "@components/Notice";
import Button, {ButtonColor, ButtonIcon, ButtonVariant} from "@components/Button";
import IconButton, {IconButtonSize, IconButtonVariant} from "@components/IconButton";

import {Theme} from "@typings/theme";


export interface ExampleProps {
    onRequestReload?(): void;
}

const Example: FC<ExampleProps> = (props) => {
    const {onRequestReload} = props;

    const analytics = useAnalytics();
    const {theme, handleToggle} = useTheme();

    const {_} = useLocale();

    useEffect(() => {
        analytics.screenView("popup_example");
    }, []);

    return (
        <Notice
            title={_("app_short_name")}
            description={_("app_description")}
            action={
            <>
                <Button
                    color={ButtonColor.Primary}
                    icon={ButtonIcon.Reload}
                    variant={ButtonVariant.Contained}
                    onClick={onRequestReload}
                >{_("reload_page")}</Button>
                <br/>
                <IconButton
                    style={{
                        marginTop: 97
                }}
                    tooltip={{
                        offset: 12,
                        content: _('change_theme'),
                    }}
                    variant={
                        theme === Theme.Light
                            ? IconButtonVariant.Moon
                            : IconButtonVariant.Sun
                    }
                    size={IconButtonSize.Large}
                    onClick={handleToggle}
                />
            </>
        }
        />
    )
}

export default memo(Example);
