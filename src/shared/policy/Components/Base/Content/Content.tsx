import React, {FC, Fragment, memo} from "react";

import _range from "lodash/range";
import _map from "lodash/map";

import {useLocale} from "@locale";

import Article, {ArticleVariant} from "@components/Article";

import styles from "./content.scss";

const Content: FC = () => {
    const {_} = useLocale();

    const sections = {
        1: 13,
        2: 1,
        3: 2,
        4: 1,
        5: 3,
        6: 1,
        7: 1,
        8: 3,
        9: 1,
        10: 1,
        11: 1,
        12: 1,
        13: 1,
        14: 1,
    }

    const name = _('app_name');

    return (
        <Article
            dir="ltr"
            className={styles["content"]}
            variant={ArticleVariant.Big}
        >
            {_map(sections, (paragraphs, section) => (
                <Fragment key={section}>
                    <h2
                        className={styles["content-title"]}
                    >{_(`policy_group_${section}_title`)}</h2>
                    {_map(_range(1, paragraphs + 1), (paragraph) => (
                        <p
                            key={`${section}-${paragraph}`}
                            className={styles["content-paragraph"]}
                        >
                            {_(`policy_group_${section}_text_${paragraph}`, {name})}
                        </p>
                    ))}
                </Fragment>
            ))}
        </Article>
    )
}

export default memo(Content);
