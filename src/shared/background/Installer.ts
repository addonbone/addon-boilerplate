import {createTab} from "@api/tabs";
import {getPolicyUrl} from "@api/html";

export default class {
    public async install(url: string): Promise<void> {
        await createTab({url: getPolicyUrl()});
        await createTab({url, active: false});
    }
}
