import React, {ComponentProps, FC, memo, ReactNode} from "react";
import classnames from "classnames";

import styles from "./header.scss";

export interface HeaderProps extends Omit<ComponentProps<'header'>, 'title'> {
    title?: ReactNode;
    subtitle?: ReactNode;
    wrapClassName?: string;
    titleClassName?: string;
    subtitleClassName?: string;
    childrenClassName?: string;
}

const Header: FC<HeaderProps> = (props) => {
    const {
        title,
        subtitle,
        className,
        wrapClassName,
        titleClassName,
        subtitleClassName,
        childrenClassName,
        children,
        ...other
    } = props;

    return (
        <header
            {...other}
            className={classnames(styles["header"], className)}
        >
            {(title || subtitle) && (
                <div className={classnames(styles["header-wrap"], wrapClassName)}>
                    {title && (
                        <h1 className={classnames(styles["header-title"], titleClassName)}>
                            {title}
                        </h1>
                    )}
                    {subtitle && (
                        <h2 className={classnames(styles["header-subtitle"], subtitleClassName)}>
                            {subtitle}
                        </h2>
                    )}
                </div>
            )}
            {children && (
                <div className={classnames(styles["header-children"], childrenClassName)}>
                    {children}
                </div>
            )}
        </header>
    );
};

export default memo(Header);
