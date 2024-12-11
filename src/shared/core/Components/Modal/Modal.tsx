import React, {FC, memo} from "react";
import classnames from "classnames";

import Portal, {PortalProps} from "../Portal";

import styles from "./modal.scss";

export type ModalProps = PortalProps;

const Model: FC<PortalProps> = (props) => {
    const {className, visibleClassName, ...other} = props

    return (
        <Portal
            {...other}
            className={classnames(styles['modal'], className)}
            visibleClassName={classnames(styles['modal--visible'], visibleClassName)}
        />
    )
}

export default memo(Model);
