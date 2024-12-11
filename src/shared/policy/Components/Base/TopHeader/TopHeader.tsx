import React, {ComponentProps, FC, memo} from "react";
import classnames from "classnames";

import {useLocale} from "@locale";

import styles from "./top-header.scss";

export type TopHeaderProps = ComponentProps<'header'>;

const TopHeader: FC<TopHeaderProps> = ({children, className, ...props}) => {
    const {_} = useLocale();

    return (
        <header
            {...props}
            className={classnames(styles["top-header"], className)}
        >
            <h1
                className={styles["top-header-title"]}
            >{_("app_title")}</h1>
            {children}
        </header>
    )
}

export default memo(TopHeader);
