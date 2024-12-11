import {setDonateRequest} from "@api/donate";

export default class {
    public async requestDonate(): Promise<void> {
        await setDonateRequest();
    }
}