import {getPlatformInfo} from "@api/runtime";

export interface EnvironmentData {
    os: string;
    arch: string;
    naclArch: string;
}

export default class {
    private data?: EnvironmentData;

    private readonly defaultData: EnvironmentData = {
        os: 'Undefined',
        arch: 'xx-xx',
        naclArch: 'xx-xx',
    };

    constructor() {
        this.load().catch(e => {
            console.log('Analytics environment load error', e);
        });
    }

    private async load(): Promise<void> {
        const {arch, nacl_arch, os} = await getPlatformInfo();

        this.data = {
            os,
            arch,
            naclArch: nacl_arch,
        };
    }

    public getData(): EnvironmentData {
        return this.data || this.defaultData;
    }
}
