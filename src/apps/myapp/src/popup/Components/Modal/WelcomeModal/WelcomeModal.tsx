import React, {FC, memo, useCallback, useState} from "react";
import classnames from "classnames";

import {useLocale} from "@locale";

import Modal, {ModalProps} from "@components/Modal";

import styles from "./welcome-modal.scss";

export type WelcomeModalProps = Omit<ModalProps, 'children'>;

const WelcomeModal: FC<WelcomeModalProps> = (props) => {
    const {className, onVisible, ...other} = props;

    const {_} = useLocale();

    const [visible, setVisible] = useState<boolean>(false);

    const handleVisible = useCallback(() => {
        onVisible && onVisible();

        setVisible(true);
    }, [onVisible]);

    return (
        <Modal
            {...other}
            className={classnames(styles["welcome-modal"], {
                [styles["welcome-modal--visible"]]: visible
            }, className)}
            onVisible={handleVisible}
        >
            <div
                className={styles["welcome-modal__logo"]}
            />
            <div
                className={styles["welcome-modal__name"]}
            >{_("app_short_name")}</div>
        </Modal>
    )
}

export default memo(WelcomeModal);
