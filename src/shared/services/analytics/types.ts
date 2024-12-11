import {ActionPayload} from "@typings/action";
import {Theme} from "@typings/theme";
import {TabAccessible} from "@typings/tab";

export enum AnalyticsEvent {
    AppInstalled = "app_installed",
    ChangeTheme = "change_theme",
    OpenUrl = "open_url",
    PageView = "page_view",
    ScreenView = "screen_view",
    UserAction = "user_action",
    Exception = "exception",
}

export interface AnalyticsAppInstalledPayload {
    reason: string;
    version: string;
}

export interface AnalyticsChangeThemePayload {
    theme: Theme;
}

export interface AnalyticsPageViewPayload {
    name: string,
    url: string;
    title: string;
}

export interface AnalyticsScreenViewPayload {
    name: string;
    reason?: string;
}

export interface AnalyticsOpenUrlPayload {
    url: string;
}

export interface AnalyticsUserActionPayload {
    name: string;
}

export interface AnalyticsExceptionPayload {
    type: string;
    message: string;
}


export type AnalyticsPayload = {
    [AnalyticsEvent.AppInstalled]: AnalyticsAppInstalledPayload;
    [AnalyticsEvent.ChangeTheme]: AnalyticsChangeThemePayload;
    [AnalyticsEvent.OpenUrl]: AnalyticsOpenUrlPayload;
    [AnalyticsEvent.PageView]: AnalyticsPageViewPayload;
    [AnalyticsEvent.ScreenView]: AnalyticsScreenViewPayload;
    [AnalyticsEvent.UserAction]: AnalyticsUserActionPayload;
    [AnalyticsEvent.Exception]: AnalyticsExceptionPayload;
}

export type AnalyticsActions = ActionPayload<AnalyticsPayload, 'event'>;

export interface AnalyticsProvider extends TabAccessible {
    ready(): boolean;

    event(action: AnalyticsActions): AnalyticsProvider;

    send(): Promise<void>;
}
