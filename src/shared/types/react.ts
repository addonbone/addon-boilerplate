import {ReactNode, FunctionComponent} from "react";

export type FC<P extends object = {}> = FunctionComponent<P & { children?: ReactNode }>;