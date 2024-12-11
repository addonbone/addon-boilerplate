import React, {ComponentProps, FC, memo} from "react";
import classnames from "classnames";

import styles from "./tag.scss";

export enum TagVariant {
    Contained = "contained",
    Chip = "chip",
    Bold = "bold",
}

export enum TagColor {
    Fog = "fog",
    Accent = "accent",
    Primary = "primary"
}

export enum TagSize {
    Small = "small",
    Medium = "medium"
}

export enum TagMargin {
    Right = "right"
}

export interface TagProps extends ComponentProps<'span'> {
    variant?: TagVariant;
    color?: TagColor;
    size?: TagSize;
    margin?: TagMargin;
}

const Tag: FC<TagProps> = (props) => {
    const {
        variant,
        color,
        size,
        margin,
        className,
        children,
        ...other
    } = props;

    return (
        <span
            {...other}
            className={classnames(styles['tag'], {
                [styles[`tag--${variant}`]]: variant,
                [styles[`tag--${color}-color`]]: color,
                [styles[`tag--${size}-size`]]: size,
                [styles[`tag--${margin}-margin`]]: margin,
            }, className)}
        >{children}</span>
    )
}

export default memo(Tag);
