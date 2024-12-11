import React, {
    ChangeEventHandler,
    DetailedHTMLProps,
    forwardRef,
    InputHTMLAttributes,
    memo,
    useCallback,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from "react";

import classnames from "classnames";

import styles from "./text-field.scss";

export enum TextFieldVariant {
    Regular = "regular",
}

export enum TextFieldAccent {
    Success = "success",
    Error = "error",
}

export interface TextFieldActions {
    select(): void;

    focus(): void;

    getValue(): string | undefined;

    setValue(value: string | number | undefined): void;
}

export interface TextFieldProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    variant?: TextFieldVariant;
    accent?: TextFieldAccent;
    value?: string | number | undefined;
    defaultValue?: string | number | undefined;
    label?: string;
    inputClassName?: string;
}

const TextField = forwardRef<TextFieldActions, TextFieldProps>((props, ref) => {
    const {
        variant = TextFieldVariant.Regular,
        accent,
        label,
        id,
        disabled,
        type = 'text',
        value: propValue = '',
        defaultValue,
        className,
        inputClassName,
        onChange,
        ...other
    } = props;

    const [value, setValue] = useState<string | number | undefined>(defaultValue || propValue);

    const inputRef = useRef<HTMLInputElement | null>(null);

    useImperativeHandle(ref, () => ({
        select() {
            inputRef.current?.select();
        },
        focus() {
            inputRef.current?.focus();
        },
        getValue(): string | undefined {
            return inputRef.current?.value;
        },
        setValue(value: string | number | undefined) {
            setValue(value);
        }
    }), []);

    const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>((event) => {
        onChange && onChange(event);

        setValue(event.currentTarget.value);
    }, [onChange]);

    useEffect(() => {
        setValue(propValue);
    }, [propValue]);

    return (
        <div
            aria-label={label}
            className={classnames(
                styles["text-field"],
                {
                    [styles[`text-field--${variant}`]]: variant,
                    [styles[`text-field--${accent}`]]: accent,
                    [styles['text-field--disabled']]: disabled,
                },
                className
            )}
        >
            <input
                {...other}
                id={id}
                ref={inputRef}
                type={type}
                value={value}
                defaultValue={defaultValue}
                disabled={disabled}
                aria-label={label}
                className={classnames(styles["text-field__input"], inputClassName)}
                onChange={handleChange}
            />
        </div>
    )
});

export default memo(TextField);
