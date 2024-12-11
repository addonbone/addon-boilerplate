export enum Agreement {
    Policy = "policy",
    Welcome = "welcome",
}

export type AgreementList = {
    [key in Agreement]?: boolean;
}
