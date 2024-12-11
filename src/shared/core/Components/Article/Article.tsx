import React, {FC, HTMLProps, memo} from "react";
import classnames from "classnames";

import styles from "./article.scss";

export enum ArticleVariant {
    Classic = 'classic',
    Small = 'small',
    Big = 'big',
}

export interface ArticleProps extends HTMLProps<HTMLElement> {
    variant: ArticleVariant;
}

const Article: FC<ArticleProps> = (props) => {
    const {variant, className, children, ...other} = props;

    return (
        <article
            {...other}
            className={classnames(styles['article'], {
                [styles[`article--${variant}`]]: variant,
            }, className)}
        >{children}</article>
    )
}

export default memo(Article);
