export type ActionMap<M extends { [index: string]: any }, N extends string> = {
    [Key in keyof M]: M[Key] extends undefined
        ? {
            [key in N]: Key;
        }
        : {
            [key in N]: Key;
        } & {payload: M[Key];}
};

export type ActionPayload<T extends object, N extends string = 'type'> = ActionMap<T, N>[keyof ActionMap<T, N>];
