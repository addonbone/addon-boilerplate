import React, {ComponentProps, FC, memo, ReactNode,} from "react";
import classnames from "classnames";

import styles from "./button.scss";

export enum ButtonVariant {
    Contained = "contained",
    Outlined = "outlined",
    Text = "text"
}

export enum ButtonColor {
    Primary = "primary",
    Secondary = "secondary",
    Accent = "accent",
    Fog = "fog",
}

export enum ButtonIcon {
    Reload = "reload",
    Cancel = "cancel",
    Check = "check",
}

export enum ButtonSize {
    Medium = "medium",
    Large = "large"
}

export enum ButtonMargin {
    TopMedium = "top-medium",
    BottomMedium = "bottom-medium",
    RightMedium = "right-medium",
}

export enum ButtonCompact {
    Enable = "compact",
    WithoutIcon = "compact-without-icon",
}

export interface ButtonProps extends ComponentProps<'button'> {
    variant?: ButtonVariant;
    color?: ButtonColor;
    icon?: ButtonIcon;
    size?: ButtonSize;
    margin?: ButtonMargin;
    compact?: ButtonCompact;
    before?: ReactNode;
    after?: ReactNode;
    textClassName?: string;
}

const Button: FC<ButtonProps> = (props) => {
    const {
        textClassName,
        variant = ButtonVariant.Text,
        color,
        size,
        icon,
        margin,
        compact,
        className,
        children,
        before,
        after,
        ...other
    } = props;

    return (
        <button
            {...other}
            className={classnames(
                styles["button"],
                {
                    [styles[`button--${variant}`]]: variant,
                    [styles[`button--${color}-color`]]: color,
                    [styles[`button--${icon}-icon`]]: icon,
                    [styles[`button--${size}-size`]]: size,
                    [styles[`button--${margin}-margin`]]: margin,
                    [styles[`button--${compact}`]]: compact,
                },
                className
            )}
        >
            {before}
            <span
                className={classnames(styles['button__text'], textClassName)}
            >{children}</span>
            {after}
        </button>
    );
};

export default memo(Button);
