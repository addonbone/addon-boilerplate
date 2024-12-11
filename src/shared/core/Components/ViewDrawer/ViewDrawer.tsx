import React, {FC, memo} from "react";
import classnames from "classnames";

import Drawer, {DrawerProps} from "../Drawer";
import View, {ViewProps} from "../View";

import styles from "./view-drawer.scss";

export type ViewDrawerProps =
    Pick<DrawerProps, 'open' | 'speed' | 'portal' | 'visibleClassName' | 'contentClassName' | 'onShow' | 'onHide' | 'onVisible' | 'onHidden'>
    & Pick<ViewProps, 'title' | 'subtitle' | 'className' |  'wrapClassName' | 'titleClassName' | 'subtitleClassName' | 'bodyClassName' | 'childrenClassName' | 'onRequestClose' | 'center' | 'closeButtonProps' | 'children'>

const ViewDrawer: FC<ViewDrawerProps> = (props) => {
    const {
        open,
        speed,
        portal,
        visibleClassName,
        contentClassName,
        onShow,
        onHide,
        onVisible,
        onHidden,
        title,
        subtitle,
        className,
        wrapClassName,
        titleClassName,
        subtitleClassName,
        childrenClassName,
        bodyClassName,
        closeButtonProps,
        onRequestClose,
        children,
        center,
    } = props;

    return (
        <Drawer
            open={open}
            speed={speed}
            portal={portal}
            visibleClassName={visibleClassName}
            contentClassName={contentClassName}
            onShow={onShow}
            onHide={onHide}
            onVisible={onVisible}
            onHidden={onHidden}
        >
            <View
                center={center}
                title={title}
                subtitle={subtitle}
                className={className}
                wrapClassName={wrapClassName}
                titleClassName={titleClassName}
                subtitleClassName={subtitleClassName}
                childrenClassName={childrenClassName}
                closeButtonProps={closeButtonProps}
                bodyClassName={classnames(styles["view-drawer__body"], bodyClassName)}
                onRequestClose={onRequestClose}
            >{children}</View>
        </Drawer>
    )
}

export default memo(ViewDrawer);
