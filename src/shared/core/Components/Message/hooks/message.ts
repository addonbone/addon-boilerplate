import {useCallback, useMemo, useState} from "react";
import {Optional} from "utility-types";

import {useLocale} from "@locale";

import {MessageProps} from "../Message";

export interface MessageState {
    showMessage: boolean;
    userMessageChange: boolean;
}

export const useMessage = (show: boolean = true) => {
    const {_} = useLocale();

    const [messageState, setMessageState] = useState<MessageState>({
        showMessage: show,
        userMessageChange: false,
    });

    const {showMessage, userMessageChange} = messageState;

    const handleCloseMessage = useCallback((): void => {
        setMessageState({
            showMessage: false,
            userMessageChange: true
        });
    }, []);

    const changeShowMessage = useCallback((show: boolean): void => {
        if (userMessageChange) {
            return;
        }

        setMessageState(state => ({...state, showMessage: show}));
    }, [userMessageChange]);

    const messageProps = useMemo<Optional<MessageProps>>(() => ({
        closeButtonProps: {
            title: _("close"),
        }
    }), []);

    return {showMessage, changeShowMessage, handleCloseMessage, messageProps};
};
