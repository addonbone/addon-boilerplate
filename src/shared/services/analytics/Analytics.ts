import _isString from "lodash/isString";

import {Measurement} from "./providers";

import {AnalyticsActions, AnalyticsEvent, AnalyticsProvider} from "./types";

import {ConfigContract} from "@typings/config";
import {Theme} from "@typings/theme";

export default class {
    private autoSend: boolean = true;

    private readonly provider: AnalyticsProvider = new Measurement();

    public getProvider(): AnalyticsProvider {
        return this.provider;
    }

    public setCredentialsFromConfig(config: ConfigContract): this {
        const data = config.get();

        if (this.provider instanceof Measurement) {
            const {analyticsId, analyticsSecret} = data;

            if (!_isString(analyticsId) || !_isString(analyticsSecret)) {
                throw new Error('Analytics credentials not found');
            }

            this.provider.setCredentials({measurementId: analyticsId, apiSecret: analyticsSecret});
        }

        return this;
    }

    public setAutoSend(value: boolean): this {
        this.autoSend = value;

        if (this.autoSend) {
            this.sendEvents();
        }

        return this;
    }

    public appInstalled(reason: string, version: string): this {
        return this.addEvent({event: AnalyticsEvent.AppInstalled, payload: {reason, version}});
    }

    public changeTheme(theme: Theme): this {
        return this.addEvent({event: AnalyticsEvent.ChangeTheme, payload: {theme}});
    }

    public openUrl(url: string): this {
        return this.addEvent({event: AnalyticsEvent.OpenUrl, payload: {url}});
    }

    public pageView(name: string, url: string, title: string): this {
        return this.addEvent({event: AnalyticsEvent.PageView, payload: {name, url, title}});
    }

    public screenView(name: string, reason?: string): this {
        return this.addEvent({event: AnalyticsEvent.ScreenView, payload: {name, reason}});
    }

    public userAction(name: string): this {
        return this.addEvent({event: AnalyticsEvent.UserAction, payload: {name}});
    }

    public exception(type: string, error: any): this {
        let message: string = "Undefined";

        if (error instanceof Error) {
            message = error.message;
        } else if (_isString(error)) {
            message = error;
        }

        return this.addEvent({event: AnalyticsEvent.Exception, payload: {type, message}});
    }

    public sendEvents(): this {
        this.getProvider().send().catch(e => {
            console.log(`Analytics send events error`, e);
        });

        return this;
    }

    public addEvent(action: AnalyticsActions): this {
        this.getProvider().event(action);

        if (this.autoSend) {
            this.sendEvents();
        }

        return this;
    }
}
