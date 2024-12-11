import React, {FC, HTMLProps, memo} from "react";
import classnames from "classnames";

import styles from "./section.scss";

export interface SectionProps extends HTMLProps<HTMLElement> {
    sideMargin?: boolean;
    bottomMargin?: boolean;
    fullMargin?: boolean;
}

const Section: FC<SectionProps> = (props) => {
    const {children, className, fullMargin = false, sideMargin = false, bottomMargin = false, ...other} = props;

    return (
        <section
            {...other}
            className={classnames(styles['section'], {
                [styles['section--full-margin']]: fullMargin,
                [styles['section--side-margin']]: sideMargin && !fullMargin,
                [styles['section--bottom-margin']]: bottomMargin && !fullMargin,
            }, className)}
        >{children}</section>
    );
}

export default memo(Section);
