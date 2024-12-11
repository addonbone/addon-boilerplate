import {DeepReadonly} from "utility-types";

export interface Config {
    siteUrl: string | null;
    welcomeUrl: string | null;
    donateUrl: string | null;
    blogUrl: string | null;
    rateUrl: string | null;
    analyticsId: string | null;
    analyticsSecret: string | null;
    updatedAt: string;
    installedIn: string;
}

export type ReadonlyConfig = DeepReadonly<Config>;

export interface ConfigContract {
    get(): ReadonlyConfig;

    getSiteUrl(campaign?: string, medium?: string, source?: string): string;
}
