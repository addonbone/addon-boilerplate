import {Optional} from "utility-types";

import _merge from "lodash/merge";

import {fetchRequest} from "@utils/request";
import {getHost} from "@utils/url";

import Provider from "./Provider";

import {AnalyticsActions, AnalyticsEvent} from "../types";

export interface MeasurementCredentials {
    readonly measurementId: string;
    readonly apiSecret: string;
}

export interface MeasurementEvent {
    name: string;
    params: Object;
}

export default class Measurement extends Provider {
    private readonly endpoint: string = 'https://www.google-analytics.com/';

    private credentials?: MeasurementCredentials;

    private debug: boolean = false;

    public setCredentials(credentials: MeasurementCredentials): this {
        this.credentials = credentials;

        return this;
    }

    public ready(): boolean {
        return !!this.credentials;
    }

    public setDebug(value: boolean): this {
        this.debug = value;

        return this;
    }

    public getEndpoint(): string {
        if (!this.credentials) {
            throw new Error('Credentials not found');
        }

        const {measurementId, apiSecret} = this.credentials;

        let url = this.endpoint;

        if (this.debug) {
            url += 'debug/';
        }

        return `${url}mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`;
    }

    protected eventToJson(action: AnalyticsActions): MeasurementEvent {
        let event: MeasurementEvent;

        switch (action.event) {
            case AnalyticsEvent.AppInstalled: {
                const {reason, version} = action.payload;

                event = {
                    name: 'installed',
                    params: {
                        reason,
                        current_version: version,
                    }
                };
            }
                break;

            case AnalyticsEvent.ChangeTheme:
                event = {
                    name: "change_theme",
                    params: {
                        theme: action.payload.theme,
                    }
                }

                break;


            case AnalyticsEvent.OpenUrl:
                event = {
                    name: "open_url",
                    params: {
                        location: action.payload.url,
                    }
                };

                break;

            case AnalyticsEvent.PageView: {
                const {name, url, title} = action.payload;

                event = {
                    name: 'page_view',
                    params: {
                        page_name: name,
                        page_domain: getHost(url),
                        page_location: url,
                        page_title: title,
                    }
                };
            }
                break;

            case AnalyticsEvent.ScreenView: {
                const {name, reason = "user_handle"} = action.payload;

                event = {
                    name: 'screen_show',
                    params: {
                        screen_name: name,
                        reason,
                    }
                };
            }
                break;

            case AnalyticsEvent.UserAction:
                event = {
                    name: "user_action",
                    params: {
                        action_name: action.payload.name,
                    }
                }

                break;

            case AnalyticsEvent.Exception: {
                const {type, message} = action.payload;

                event = {
                    name: "exception",
                    params: {
                        exception_type: type,
                        exception_message: message,
                    }
                };
            }
                break;
        }

        return _merge<MeasurementEvent, Optional<MeasurementEvent>>(event, {
            params: this.getParams(),
        });
    }

    protected async sendEvents(events: Object[]): Promise<void> {
        const response = await fetchRequest(this.getEndpoint(), {
            method: "POST",
            body: JSON.stringify({
                client_id: this.client.getId(),
                events,
            })
        });

        if (this.debug) {
            console.info('Measurement event debug', await response.json());
        }
    }
}
