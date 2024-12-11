import React, {ComponentProps, FC, memo} from "react";

import styles from "./layout.scss";

export type LayoutProps = ComponentProps<'main'>;

const Layout: FC<LayoutProps> = ({children}) => {
    return (
        <main className={styles["layout"]}>
            {children}
        </main>
    )
}

export default memo(Layout);
