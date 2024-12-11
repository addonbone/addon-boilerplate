import React, {ComponentProps, FC, memo} from "react";
import classnames from "classnames";

import styles from "./stamp.scss";

export enum StampVariant {
    Logo = "logo",
    Loading = "loading",
}

export enum StampSize {
    Medium = "medium"
}

export interface StampProps extends ComponentProps<'div'> {
    variant: StampVariant;
    size?: StampSize;
}

const Stamp: FC<StampProps> = (props) => {
    const {size = StampSize.Medium, variant, className, ...other} = props;

    return (
        <div
            {...other}
            className={classnames(styles["stamp"], {
                [styles[`stamp--${variant}`]]: variant,
                [styles[`stamp--${size}-size`]]: size,
            }, className)}
        />
    )
}

export default memo(Stamp);
