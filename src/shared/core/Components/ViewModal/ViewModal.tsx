import React, {FC, memo} from "react";

import Modal, {ModalProps} from "../Modal";
import View, {ViewProps} from "../View";

export type ViewModalProps =
    Pick<ModalProps, 'open' | 'speed' | 'portal' | 'className' | 'visibleClassName' | 'onShow' | 'onHide' | 'onVisible' | 'onHidden'>
    & Pick<ViewProps, 'center' | 'title' | 'subtitle' | 'wrapClassName' | 'titleClassName' | 'subtitleClassName' | 'childrenClassName' | 'bodyClassName' | 'onRequestClose' | 'closeButtonProps' | 'children'>

const ViewModal: FC<ViewModalProps> = (props) => {
    const {
        open,
        speed,
        center,
        portal,
        visibleClassName,
        onShow,
        onHide,
        onVisible,
        onHidden,
        title,
        subtitle,
        className,
        bodyClassName,
        wrapClassName,
        titleClassName,
        subtitleClassName,
        childrenClassName,
        closeButtonProps,
        onRequestClose,
        children,
    } = props;

    return (
        <Modal
            open={open}
            speed={speed}
            portal={portal}
            className={className}
            visibleClassName={visibleClassName}
            onShow={onShow}
            onHide={onHide}
            onVisible={onVisible}
            onHidden={onHidden}
        >
            <View
                title={title}
                subtitle={subtitle}
                center={center}
                bodyClassName={bodyClassName}
                wrapClassName={wrapClassName}
                titleClassName={titleClassName}
                subtitleClassName={subtitleClassName}
                childrenClassName={childrenClassName}
                closeButtonProps={closeButtonProps}
                onRequestClose={onRequestClose}
            >{children}</View>
        </Modal>
    )
}

export default memo(ViewModal);
