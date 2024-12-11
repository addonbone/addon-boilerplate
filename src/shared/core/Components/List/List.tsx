import React, {ComponentProps, forwardRef, memo, ReactElement} from "react";
import classnames from "classnames";

import {ListItemProps} from "../ListItem";

import styles from "./list.scss";

export interface ListProps extends Omit<ComponentProps<'ul'>, 'children'> {
    children: ReactElement<ListItemProps> | ReactElement<ListItemProps>[];
}

const List = forwardRef<HTMLUListElement, ListProps>((props, ref) => {
    const {children, className, ...other} = props;

    return (
        <ul
            {...other}
            ref={ref}
            className={classnames(styles['list'], className)}
        >{children}</ul>
    )
})

export default memo(List);
