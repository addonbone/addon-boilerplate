export type PickRename<T, K extends keyof T, R extends PropertyKey> =
    Omit<T, K> & { [P in R]: T[K] }
