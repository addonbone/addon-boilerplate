import React, {ComponentProps, FC, memo} from "react";
import classnames from "classnames";

import IconButton, {IconButtonProps, IconButtonSize, IconButtonVariant} from "../IconButton";

import styles from "./message.scss";
import {Optional} from "utility-types";

export enum MessageVariant {
    Standalone = "standalone",
    Inline = "inline"
}

export interface MessageProps extends ComponentProps<'span'> {
    variant?: MessageVariant;

    closeButtonProps?: Optional<Pick<IconButtonProps, 'className' | 'variant' | 'size' | 'title'>>;

    onRequestClose?(): void;
}

const Message: FC<MessageProps> = (props) => {
    const {
        children,
        className,
        variant = MessageVariant.Standalone,
        closeButtonProps,
        onRequestClose,
        ...other
    } = props;

    const {
        className: buttonClassName,
        ...buttonProps
    } = closeButtonProps || {};

    return (
        <span
            {...other}
            className={classnames(styles["message"], styles[`message--${variant}`], {
                [styles["message--closeable"]]: !!onRequestClose,
            }, className)}
        >
            {children}
            {onRequestClose && (
                <IconButton
                    className={classnames(styles["message__close"], buttonClassName)}
                    variant={IconButtonVariant.CloseAccent}
                    size={IconButtonSize.Small}
                    {...buttonProps}
                    onClick={onRequestClose}
                />
            )}
        </span>
    )
};

export default memo(Message);
