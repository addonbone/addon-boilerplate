import React, {FC, memo} from "react";
import classnames from "classnames";

import Header, {HeaderProps} from "../Header";
import IconButton, {IconButtonProps, IconButtonSize, IconButtonVariant} from "../IconButton";

import styles from "./view.scss";

export interface ViewProps extends HeaderProps {
    center?: boolean;
    headerClassName?: string;
    bodyClassName?: string;
    closeButtonProps?: Pick<IconButtonProps, 'title'>;

    onRequestClose?(): void;
}

const View: FC<ViewProps> = (props) => {
    const {
        title,
        subtitle,
        center = true,
        className,
        headerClassName,
        bodyClassName,
        titleClassName,
        closeButtonProps = {},
        onRequestClose,
        children
    } = props;

    return (
        <div
            className={classnames(styles["view"], {
                [styles["view--center"]]: center,
            }, className)}
        >
            <Header
                title={title}
                subtitle={subtitle}
                className={classnames(styles["view-header"], {
                    [styles[`view-header--title-only`]]: title && !subtitle,
                    [styles[`view-header--separate`]]: title || subtitle
                }, headerClassName)}
                titleClassName={classnames(styles["view-header__title"], titleClassName)}
            >
                {onRequestClose && (
                    <IconButton
                        {...closeButtonProps}
                        size={IconButtonSize.Large}
                        variant={IconButtonVariant.Close}
                        onClick={onRequestClose}
                    />
                )}
            </Header>
            <div className={classnames(styles["view-body"], bodyClassName)}>
                {children}
            </div>
        </div>
    )
}

export default memo(View);
