import React, {FC, memo, ReactNode} from "react";
import classnames from "classnames";

import Panel, {PanelVariant} from "../Panel";
import Stamp, {StampVariant as NoticeStamp} from "../Stamp";

import styles from "./notice.scss";

export enum NoticeVariant {
    Regular = "regular",
    Warning = "warning",
}

export interface NoticeProps {
    title: ReactNode;
    description?: ReactNode;
    action?: ReactNode;
    variant?: NoticeVariant;
    stamp?: NoticeStamp;
}

const Notice: FC<NoticeProps> = (props) => {
    const {
        stamp = NoticeStamp.Logo,
        variant = NoticeVariant.Regular,
        title,
        description,
        action
    } = props;

    return (
        <Panel
            variant={PanelVariant.Center}
            className={classnames(styles["notice"], styles[`notice--${variant}`])}
        >
            <Stamp variant={stamp}/>
            <h3 className={styles["notice-title"]}>{title}</h3>
            {description && <article className={styles["notice-description"]}>{description}</article>}
            {action && <div className={styles["notice-action"]}>{action}</div>}
        </Panel>
    )
}

export {NoticeStamp};

export default memo(Notice);
