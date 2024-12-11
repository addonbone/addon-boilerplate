import {getManifest} from "@api/runtime";

export interface AppData {
    name: string;
    version: string;
    language: string;
}

export default class {
    private data?: AppData;

    private defaultData: AppData = {
        name: 'App',
        version: '0',
        language: 'en',
    };

    constructor() {
        this.load().catch(e => {
            console.log('Analytics app load error', e);
        });
    }

    private async load(): Promise<void> {
        const {current_locale, default_locale, version, short_name, name} = await getManifest();

        this.data = {
            language: current_locale || default_locale || 'en',
            version,
            name: short_name || name,
        }
    }

    public getData(): AppData {
        return this.data || this.defaultData;
    }
}
