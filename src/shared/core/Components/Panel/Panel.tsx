import React, {ComponentProps, FC, memo} from "react";
import classnames from "classnames";

import styles from "./panel.scss";

export enum PanelVariant {
    Center = 'center'
}

export interface PanelProps extends ComponentProps<"div"> {
    variant?: PanelVariant;
}

const Panel: FC<PanelProps> = (props) => {
    const {children, variant, className} = props;

    return (
        <main
            className={classnames(styles["panel"], {
                [styles[`panel--${variant}`]]: variant,
            }, className)}
        >{children}</main>
    );
};

export default memo(Panel);
