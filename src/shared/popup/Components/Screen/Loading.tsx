import React, {FC, memo} from "react";

import Notice, {NoticeStamp} from "@components/Notice";

import {useLocale} from "@locale";

const Loading: FC = () => {
    const {_} = useLocale();

    return (
        <Notice
            stamp={NoticeStamp.Loading}
            title={_("loading_title")}
            description={_("loading_description")}
        />
    )
}

export default memo(Loading);
