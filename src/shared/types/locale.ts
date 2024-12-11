export type LocaleLang = string;

export type LocaleMessageResponse = {
    [key: string]: {
        message: string;
    }
}

export type LocaleMessage = { [key: string]: string };

export type LocaleMessageParams = { [key: string]: string };

export enum LocaleDir {
    RightToLeft = "rtl",
    LeftToRight = "ltr",
}
