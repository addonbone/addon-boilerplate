import React, {ComponentProps, forwardRef, memo} from "react";
import classnames from "classnames";

import Tooltip, {TooltipProps} from "../Tooltip";

import styles from "./icon-button.scss";

export enum IconButtonVariant {
    Moon = "moon",
    Sun = "sun",
    Help = "help",
    Rate = "rate",
    Close = "close",
    CloseAccent = "close-accent",
}

export enum IconButtonMargin {
    MarginLeft = "left",
    MarginRight = "right",
    MarginRightMedium = "right-medium",
    MarginLeftSmall = "left-small",
}

export enum IconButtonSize {
    Small = "small",
    Large = "large",
    ExtraLarge = "x-large",
}

export interface IconButtonProps extends ComponentProps<'button'> {
    variant: IconButtonVariant;
    margin?: IconButtonMargin;
    size?: IconButtonSize;
    tooltip?: Omit<TooltipProps, 'children'>;
}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>((props, ref) => {
    const {variant, margin, size, tooltip, className, ...other} = props;

    const button = (
        <button
            {...other}
            ref={ref}
            className={classnames(
                styles["icon-button"],
                {
                    [styles[`icon-button--${variant}`]]: variant,
                    [styles[`icon-button--${margin}-margin`]]: margin,
                    [styles[`icon-button--${size}-size`]]: size,
                },
                className
            )}
        />
    )

    if (tooltip) {
        return (
            <Tooltip
                {...tooltip}
            >{button}</Tooltip>
        )
    }

    return button;
});

export default memo(IconButton);
