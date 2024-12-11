import Client from "../Client";
import Environment from "../Environment";
import App from "../App";

import {getPlatform} from "@api/env";
import {getId} from "@api/runtime";

import {getHost} from "@utils/url";

import {AnalyticsActions, AnalyticsProvider} from "../types";

import Tab = chrome.tabs.Tab;

export type ProviderParams = { [key in string]: string | number };

export default abstract class Provider implements AnalyticsProvider {
    private events: AnalyticsActions[] = [];

    private tab?: Tab;

    protected readonly app: App = new App();

    protected readonly client: Client = new Client();

    protected readonly environment: Environment = new Environment();

    protected abstract eventToJson(action: AnalyticsActions): Object;

    protected abstract sendEvents(events: Object[]): Promise<void>;

    public ready(): boolean {
        return true;
    }

    public event(action: AnalyticsActions): AnalyticsProvider {
        this.events.push(action);

        return this;
    }

    public async send(): Promise<void> {
        if (!this.ready()) {
            console.warn('Analytics provider not ready');

            return;
        }

        const events = this.events.map(event => this.eventToJson(event));

        await this.sendEvents(events);

        this.events = [];
    }

    public getTab(): Tab | undefined {
        return this.tab;
    }

    public setTab(tab: Tab): this {
        this.tab = tab;

        return this;
    }

    protected getParams(): ProviderParams {
        const {name, version, language} = this.app.getData();
        const {countryCode, regionName, ip, ...clientData} = this.client.getData();
        const {os, arch, naclArch} = this.environment.getData();

        let params: ProviderParams = {
            app_id: getId(),
            app_name: name,
            app_version: version,
            language,
            platform: getPlatform() || 'Unknown',
            country_code: countryCode,
            region_name: regionName,
            os,
            arch,
            nacl_arch: naclArch,
            ...clientData,
        };

        if (this.tab) {
            const {url} = this.tab;

            if (url) {
                params = {
                    ...params,
                    tab_location: url,
                    tab_domain: getHost(url),
                };
            }
        }

        return params;
    }
}
