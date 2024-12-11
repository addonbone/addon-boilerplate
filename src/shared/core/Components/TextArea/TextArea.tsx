import React, {
    ChangeEventHandler,
    DetailedHTMLProps,
    forwardRef,
    memo,
    TextareaHTMLAttributes,
    useCallback,
    useEffect,
    useImperativeHandle,
    useRef,
    useState
} from "react";

import classnames from "classnames";
import autosize, {destroy} from "autosize";

import styles from "./text-area.scss";

export interface TextAreaActions {
    select(): void;

    focus(): void;

    setValue(value: string): void;
}

export interface TextAreaProps extends DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
    children?: string | ReadonlyArray<string> | number | undefined;
}

const TextArea = forwardRef<TextAreaActions, TextAreaProps>((props, ref) => {
    const {
        id,
        name,
        rows = 4,
        className,
        value: propValue = '',
        children,
        onChange,
        ...other
    } = props;

    const [value, setValue] = useState(propValue || children);

    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    const handleChange = useCallback<ChangeEventHandler<HTMLTextAreaElement>>((event) => {
        setValue(event.currentTarget.value);

        onChange && onChange(event);
    }, [onChange]);

    useImperativeHandle(ref, () => ({
        focus() {
            textareaRef.current?.focus();
        },
        select() {
            textareaRef.current?.select();
        },
        setValue(value: string) {
            setValue(value);
        }
    }), []);

    useEffect(() => {
        textareaRef.current && autosize(textareaRef.current);

        return () => {
            textareaRef.current && destroy(textareaRef.current);
        }
    }, []);

    useEffect(() => {
        setValue(propValue || children);
    }, [propValue, children]);

    return (
        <textarea
            {...other}
            ref={textareaRef}
            id={id}
            name={name || id}
            rows={rows}
            className={classnames(styles['text-area'], className)}
            value={value}
            onChange={handleChange}
        />
    )
});

export default memo(TextArea);
