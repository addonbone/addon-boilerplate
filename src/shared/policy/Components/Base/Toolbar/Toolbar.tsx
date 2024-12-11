import React, {ButtonHTMLAttributes, DetailedHTMLProps, FC, memo} from "react";

import styles from "./toolbar.scss";

export type ToolbarProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLDivElement>, HTMLDivElement>

const Toolbar: FC<ToolbarProps> = ({children, ...props}) => {
    return <div {...props} className={styles["toolbar"]}>{children}</div>
}

export default memo(Toolbar);
