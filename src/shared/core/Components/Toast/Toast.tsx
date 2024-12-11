import React, {forwardRef, memo, ReactNode, useEffect, useImperativeHandle, useRef, useState} from "react";
import classnames from "classnames";
import {Optional} from "utility-types";

import Portal, {PortalProps} from "../Portal";

import styles from "./toast.scss";

export enum ToastVariant {
    Success = "success",
    Error = "error",
}

export interface ToastActions {
    push(timeout: number, message?: ReactNode, variant?: ToastVariant): void;
}

export interface ToastProps extends Optional<PortalProps, 'children'> {
    variant?: ToastVariant;
}

export interface ToastState {
    message?: ReactNode;
    variant: ToastVariant;
    open: boolean;
}

const Toast = forwardRef<ToastActions, ToastProps>((props, ref) => {
    const {
        className,
        visibleClassName,
        variant: variantProp = ToastVariant.Success,
        open: openProp = false,
        children,
        ...other
    } = props;

    const [state, setState] = useState<ToastState>({
        message: children,
        variant: variantProp,
        open: openProp,
    });

    const {open, message, variant} = state;

    const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

    useImperativeHandle(ref, () => ({
        push(timeout: number, message?: React.ReactNode, variant?: ToastVariant): void {
            if (open) {
                return;
            }

            setState(prevState => {
                let nextState: ToastState = {...prevState, open: true}

                if (message) {
                    nextState = {...nextState, message};
                }

                if (variant) {
                    nextState = {...nextState, variant};
                }

                return nextState;
            });

            timer.current && clearTimeout(timer.current);

            timer.current = setTimeout(() => {
                setState(prevState => ({...prevState, open: false}));
            }, timeout);
        }
    }), [state]);

    useEffect(() => {
        setState(prevState => ({...prevState, open: openProp}));

        return () => {
            timer.current && clearTimeout(timer.current);
        }
    }, [openProp]);

    useEffect(() => {
        setState(prevState => ({...prevState, message: children}));
    }, [children]);

    useEffect(() => {
        setState(prevState => ({...prevState, variant: variantProp}));
    }, [variantProp]);

    if (!message) {
        return null;
    }

    return (
        <Portal
            {...other}
            open={open}
            className={classnames(styles["toast"], styles[`toast--${variant}`], className)}
            visibleClassName={classnames(styles["toast--visible"], visibleClassName)}
        >{message}</Portal>
    )
})

export default memo(Toast);
