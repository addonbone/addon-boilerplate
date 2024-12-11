import React, {FC} from "react";

import Loading from "./Loading";
import Example, {ExampleProps} from "./Example";

export interface RouterProps extends Pick<ExampleProps, 'onRequestReload'> {
    loading?: boolean;
}

const Router: FC<RouterProps> = (props) => {
    const {
        loading = false,
        onRequestReload,
        ...other
    } = props;

    if (loading) {
        return (
            <Loading/>
        )
    }

    return (
        <Example
            onRequestReload={onRequestReload}
        />
    )
}

export default Router;
