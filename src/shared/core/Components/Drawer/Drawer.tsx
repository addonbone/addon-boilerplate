import React, {FC, memo} from "react";
import classnames from "classnames";

import Portal, {PortalProps} from "../Portal";

import styles from "./drawer.scss";

export interface DrawerProps extends PortalProps {
    contentClassName?: string;
}

const Drawer: FC<DrawerProps> = (props) => {
    const {
        className,
        speed = 50,
        speedOut = 500,
        visibleClassName,
        contentClassName,
        children,
        ...other
    } = props

    return (
        <Portal
            {...other}
            speed={speed}
            speedOut={speedOut}
            className={classnames(styles["drawer"], className)}
            visibleClassName={classnames(styles["drawer--visible"], visibleClassName)}
        >
            <div
                className={classnames(styles["drawer__content"], contentClassName)}
            >{children}</div>
        </Portal>
    )
}

export default memo(Drawer);
