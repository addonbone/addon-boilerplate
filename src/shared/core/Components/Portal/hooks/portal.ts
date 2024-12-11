import {ForwardedRef, useCallback, useImperativeHandle, useState} from "react";

export interface PortalControlActions {
    open(): void;

    close(): void;
}

export const usePortalControl = (ref: ForwardedRef<PortalControlActions>, initialState: boolean = false) => {
    const [open, setOpen] = useState(initialState);

    useImperativeHandle(ref, () => ({
        open() {
            setOpen(true);
        },
        close() {
            setOpen(false);
        }
    }), []);

    const handleOpen = useCallback(() => {
        setOpen(true);
    }, []);

    const handleClose = useCallback(() => {
        setOpen(false);
    }, []);

    return {open, setOpen, handleOpen, handleClose};
}
