import {cloneElement, createElement, isValidElement, ReactElement, ReactHTML, ReactNode, useCallback} from "react";
import classnames from "classnames";

export const useBuildElementWithClassName = () => {
    return useCallback((node?: ReactNode, className?: string, type: keyof ReactHTML = 'div'): ReactElement => {
        return isValidElement(node) ?
            // @ts-ignore
            cloneElement(node, {className: classnames(node.props.className, className)}) :
            createElement(type, {className}, node);
    }, []);
}
