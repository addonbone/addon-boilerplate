import React, {
    cloneElement,
    ComponentPropsWithRef,
    DOMAttributes,
    FC,
    FunctionComponentElement,
    memo,
    ReactNode,
    useCallback,
    useRef,
    useState
} from "react";

import classnames from "classnames";

import Portal, {PortalProps} from "../Portal";

import {getScrollableParent} from "@utils/dom";

import styles from "./tooltip.scss";

export interface TooltipProps extends Pick<PortalProps, 'speed'> {
    offset?: number;
    bottom?: boolean;
    content: ReactNode;
    children: FunctionComponentElement<Pick<DOMAttributes<any>, 'onMouseEnter' | 'onMouseLeave'> & ComponentPropsWithRef<any>>
}

const Tooltip: FC<TooltipProps> = (props) => {
    const {children, content, offset = 15, speed = 100, bottom = false} = props;

    const elementRef = useRef<HTMLElement | null>(null);
    const tooltipRef = useRef<HTMLDivElement | null>(null);
    const arrowRef = useRef<HTMLDivElement | null>(null);

    const [open, setOpen] = useState(false);

    const update = useCallback(() => {
        const element = elementRef.current;
        const tooltip = tooltipRef.current;
        const arrow = arrowRef.current;

        if (!element || !tooltip || !arrow) {
            return;
        }

        const elementRect = element.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();
        const arrowRect = arrow.getBoundingClientRect();

        if (!elementRect || !tooltipRect || !arrowRect) {
            return;
        }

        const maxWidth = window.innerWidth;
        const sideMargin = 10;

        const {top: elementTop, left: elementLeft, width: elementWidth} = elementRect;
        const {height: tooltipHeight, width: tooltipWidth} = tooltipRect;
        const {width: arrowWidth} = arrowRect;

        const top: number = bottom ? elementTop + tooltipHeight + offset : elementTop - tooltipHeight - offset;
        const width: number = Math.min(maxWidth - (sideMargin * 2), tooltipWidth);
        const left: number = Math.max(sideMargin, Math.min(elementLeft - (tooltipWidth / 2) + (elementWidth / 2), maxWidth - sideMargin - tooltipWidth));

        tooltip.style.setProperty('top', top + 'px');
        tooltip.style.setProperty('width', width + 'px');
        tooltip.style.setProperty('left', left + 'px');

        arrow.style.setProperty('left', Math.max(10, elementLeft - left + ((elementWidth - arrowWidth) / 2) - 1) + 'px');
    }, [bottom]);

    const handleOpen = useCallback(() => {
        setOpen(true);

        setTimeout(update, 30);
    }, []);

    const handleClose = useCallback(() => {
        setOpen(false);
    }, []);

    const startScroll = useCallback(() => {
        endScroll();

        elementRef.current && getScrollableParent(elementRef.current)?.addEventListener('scroll', update);
    }, []);

    const endScroll = useCallback(() => {
        elementRef.current && getScrollableParent(elementRef.current)?.removeEventListener('scroll', update);
    }, []);

    return (
        <>
            {cloneElement(children, {
                ref: elementRef,
                onMouseEnter: handleOpen,
                onMouseLeave: handleClose,
            })}
            <Portal
                ref={tooltipRef}
                open={open}
                speed={speed}
                className={classnames(styles["tooltip"], {
                    [styles["tooltip--bottom"]]: bottom
                })}
                visibleClassName={styles["tooltip--visible"]}
                onShow={startScroll}
                onHide={endScroll}
                onVisible={update}
            >
                {content}
                <div
                    ref={arrowRef}
                    className={styles["tooltip__arrow"]}
                />
            </Portal>
        </>
    )
}

export default memo(Tooltip);
