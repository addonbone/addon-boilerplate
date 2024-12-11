import {DependencyList, EffectCallback, useEffect, useRef} from "react";

export const useDidUpdate = (effect: EffectCallback, deps?: DependencyList): void => {
    const hasMount = useRef(false);

    useEffect(() => {
        if (hasMount.current) {
            effect();
        } else {
            hasMount.current = true;
        }
    }, deps);
};
