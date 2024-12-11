import Installer from "./Installer";

import Analytics from "@services/analytics";
import Locale from "@services/locale";
import Config from "@services/config";

import {getUrl, getVersion, isManifestVersion3} from "@api/runtime";
import {executeScriptTab, queryTabIds} from "@api/tabs";
import {executeScript} from "@api/scripting";

import {awaiter} from "@utils/promise";

import {MessageCallback, MessageTypes} from "@typings/message";
import {ConfigContract} from "@typings/config";

import {getWelcomeUrl} from "@services/config/utils/url";

import InstalledDetails = chrome.runtime.InstalledDetails;
import OnInstalledReason = chrome.runtime.OnInstalledReason;

export interface ListenerOptions {
    configUrl: string;
}

export default class {
    private config?: ConfigContract;

    private readonly installer: Installer = new Installer();

    private readonly locale: Locale = new Locale();

    private readonly analytics: Analytics = new Analytics();

    constructor(private readonly options: ListenerOptions) {
        this.init();
    }

    private init(): void {
        Promise.all([
            this.locale.init(),
            this.initConfig(),
        ]).finally(() => this.initScript()).catch(e => {
            console.log('Listener constructor error', e);
        });
    }

    private async initScript(): Promise<void> {
        const execute = (tabId: number, path: string): Promise<any[]> => {
            if (isManifestVersion3()) {
                return executeScript({target: {tabId, allFrames: false}, files: [path]});
            } else {
                return executeScriptTab(tabId, {file: path, allFrames: false});
            }
        }

        const tabIds = await queryTabIds({url: ['http://*/*', 'https://*/*']});

        await Promise.all(tabIds.map(tabId => execute(tabId, 'js/content.js')));
    }

    private async initConfig(): Promise<void> {
        this.config = await Config.makeAndLoad(this.options.configUrl);

        // All tasks that depend on the config
        await Promise.all([
            this.initAnalytics(),
        ]);
    }

    private async initAnalytics(): Promise<void> {
        if (!this.config) {
            throw new Error('Config not found');
        }

        this.analytics
            .setCredentialsFromConfig(this.config)
            .pageView('background', getUrl('_generated_background_page.html'), 'Background');
    }

    public onMessage(...params: Parameters<MessageCallback>): void {
        const [message, sender, sendResponse] = params;

        switch (message.type) {
            case MessageTypes.GetConfig:
                sendResponse(this.config?.get());

                break;

            case MessageTypes.GetSender:
                sendResponse(sender);

                break;
        }
    }

    public onInstalled(details: InstalledDetails): void {
        this.analytics.appInstalled(details.reason, getVersion());

        switch (details.reason) {
            case OnInstalledReason.INSTALL:
                awaiter(async (): Promise<void> => {
                    if (!this.config) {
                        throw new Error('Config not found');
                    }

                    await this.installer.install(getWelcomeUrl(this.config, 'install'));
                }, 10, 1000).catch(e => {
                    console.log('Listener onInstalled install error', e);
                });

                break;
        }
    }
}
