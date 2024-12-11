import _isObjectLike from "lodash/isObjectLike";
import _isPlainObject from "lodash/isPlainObject";
import _isString from "lodash/isString";
import _reduce from "lodash/reduce";

export const findJsonValue = <T extends Object>(input: any[], initial: T[] = []): T[] => {
    if (!_isObjectLike(input)) {
        return initial;
    }

    return _reduce(input, (collection, value) => {
        if (_isString(value)) {
            try {
                const item = JSON.parse(value);

                if (_isObjectLike(item)) {
                    return [...collection, item];
                }
            } catch (e) {
                return collection;
            }
        }

        if (_isObjectLike(value)) {
            return [...collection, ...findJsonValue(value)];
        }

        return collection;
    }, initial);
}

export const findObjectByCondition = <T extends Object>(condition: (value: Object) => boolean, input: Object, initial: T[] = []): T[] => {
    const output = [...initial];

    if (!_isObjectLike(input)) {
        return output;
    }

    if (_isPlainObject(input) && condition(input)) {
        output.push(input as T);
    }

    return _reduce(input, (collection, value) => {
        if (_isObjectLike(value)) {
            return findObjectByCondition(condition, value, collection);
        }

        return collection;
    }, output);
}

export const findObjectByProperty = <T extends Object>(property: string, input: Object, initial: T[] = []): T[] => {
    return findObjectByCondition((value) => value.hasOwnProperty(property), input, initial);
}
