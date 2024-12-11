import _range from "lodash/range";
import _isUndefined from "lodash/isUndefined";

export const sleep = (time: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, time));
}

export const awaiter = async <T>(handler: () => Promise<T>, attempts: number = 1, retryTime: number = 100, defaults?: T): Promise<T> => {
    if (attempts < 1) {
        throw new Error("Attempts less then 1");
    }

    const iterator = _range(attempts);

    iterator.reverse();

    for await (const countdown of iterator) {
        try {
            return await handler();
        } catch (e) {
            console.log('Awaiter iteration error', e);

            if (countdown > 0) {
                await sleep(retryTime);
            }
        }
    }

    if (_isUndefined(defaults)) {
        throw new Error("Awaiter error");
    }

    return defaults;
}

export const execute = async <T>(functions: Array<() => Promise<T>>): Promise<T> => {
    if (!functions.length) {
        throw new Error('Promise execute functions is empty');
    }

    const [firstFunction, ...remainingFunctions] = functions;

    try {
        return await firstFunction();
    } catch (error) {
        console.error('Promise execute function error', error);

        return execute(remainingFunctions);
    }
}