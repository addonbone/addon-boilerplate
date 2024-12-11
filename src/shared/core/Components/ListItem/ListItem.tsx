import React, {ComponentProps, forwardRef, memo, ReactNode} from "react";
import classnames from "classnames";

import styles from "./list-item.scss";

export type ListItemType = HTMLDivElement;

export interface ListItemProps extends ComponentProps<'div'> {
    primary?: ReactNode;
    secondary?: ReactNode;
    left?: ReactNode;
    right?: ReactNode;
    primaryClassName?: string;
    secondaryClassName?: string;
    centerClassName?: string;
    leftClassName?: string;
    rightClassName?: string;
}

const ListItem = forwardRef<ListItemType, ListItemProps>((props, ref) => {
    const {
        role = "list-item",
        children,
        primary,
        secondary,
        left,
        right,
        className,
        primaryClassName,
        secondaryClassName,
        centerClassName,
        leftClassName,
        rightClassName,
        ...other
    } = props;

    return (
        <div
            {...other}
            ref={ref}
            role={role}
            className={classnames(styles["list-item"], className)}
        >
            {left && (
                <div
                    className={classnames(styles["list-item__left"], leftClassName)}
                >{left}</div>
            )}
            <div className={classnames(styles["list-item__center"], centerClassName)}>
                {primary && (
                    <div
                        className={classnames(styles["list-item__primary"], primaryClassName)}
                    >{primary}</div>
                )}
                {secondary && (
                    <div
                        className={classnames(styles["list-item__secondary"], secondaryClassName)}
                    >{secondary}</div>
                )}
            </div>
            {right && (
                <div
                    className={classnames(styles["list-item__right"], rightClassName)}
                >{right}</div>
            )}
            {children}
        </div>
    )
})

export default memo(ListItem);
