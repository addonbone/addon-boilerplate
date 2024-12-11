export const fetchRequest = async (info: RequestInfo, init: RequestInit = {}): Promise<Response> => {
    const response = await fetch(info, {
        credentials: "include",
        ...init,
    });

    const {ok, status, statusText} = response;

    if (!ok) {
        throw new Error(`Response error status: ${status} - ${statusText}`);
    }

    return response;
}

export const fetchText = async (info: RequestInfo, init?: RequestInit): Promise<string> => {
    return await (await fetchRequest(info, init)).text();
}

export const fetchJson = async <T = any>(info: RequestInfo, init?: RequestInit): Promise<T> => {
    return await (await fetchRequest(info, init)).json();
}



