import React, {ComponentProps, forwardRef, memo, PropsWithoutRef, ReactNode, useEffect, useRef, useState} from "react";
import {createPortal} from "react-dom";

import classnames from "classnames";

export interface PortalProps extends PropsWithoutRef<ComponentProps<'div'>> {
    open?: boolean;
    speed?: number;
    speedOut?: number;
    portal?: boolean;
    showClassName?: string;
    visibleClassName?: string;
    children: ReactNode;

    onShow?(): void;

    onHide?(): void;

    onVisible?(): void;

    onHidden?(): void;
}

const Portal = forwardRef<HTMLDivElement, PortalProps>((props, ref) => {
    const {
        open = false,
        speed = 150,
        speedOut = speed,
        portal = true,
        className,
        showClassName,
        visibleClassName,
        children,
        style = {},
        onHide,
        onShow,
        onVisible,
        onHidden,
        ...other
    } = props;

    const [options, setOptions] = useState<{ show: boolean, visible: boolean }>({
        show: false,
        visible: false,
    });

    const element = useRef(document.getElementById('root')).current;

    const animation = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        animation.current && clearTimeout(animation.current);

        if (open) {
            setOptions({
                show: true,
                visible: false,
            });

            onShow && onShow();
        } else if (!visible && !show) {
            return;
        }

        animation.current = setTimeout(() => {
            if (open) {
                setOptions({
                    show: true,
                    visible: true,
                });

                onVisible && onVisible();
            } else {
                setOptions({
                    show: true,
                    visible: false,
                });

                onHidden && onHidden();

                animation.current = setTimeout(() => {
                    setOptions({
                        show: false,
                        visible: false,
                    });

                    onHide && onHide();
                }, speedOut);
            }
        }, speed);

        return () => {
            animation.current && clearTimeout(animation.current);
        }
    }, [open]);

    const {show, visible} = options;

    if (!element || !show) {
        return null;
    }

    const content = (
        <div
            {...other}
            ref={ref}
            className={classnames(className, {
                [showClassName!]: showClassName && show,
                [visibleClassName!]: visibleClassName && visible
            })}
            style={{transitionDuration: `${speed}ms`, ...style}}
        >{children}</div>
    );

    if (portal) {
        return createPortal(content, element);
    }

    return content;
});

export default memo(Portal);
