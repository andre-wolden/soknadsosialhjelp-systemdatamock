export function settMockData(path: string, payload: object) {
	const url = getApiBaseUrl() + "internal/mock/tjeneste/" + path;
	const OPTIONS: RequestInit = {
		headers: new Headers({
			"accept": "application/json, text/plain, */*",
			"Content-Type": "application/json",
			"X-XSRF-TOKEN": getCookie("XSRF-TOKEN-SOKNAD-API")
		}),
		method: "POST",
		credentials: "same-origin",
		body: JSON.stringify(payload)
	};
	return fetch(url, OPTIONS)
		.then((response: Response) => {
			return ;
		});
}

export function clearMockData(path: string) {
	const url = getApiBaseUrl() + "internal/mock/tjeneste/" + path;
	const OPTIONS: RequestInit = {
		headers: new Headers({
			"accept": "application/json, text/plain, */*",
			"Content-Type": "application/json",
			"X-XSRF-TOKEN": getCookie("XSRF-TOKEN-SOKNAD-API")
		}),
		method: "DELETE",
		credentials: "same-origin",
	};
	return fetch(url, OPTIONS)
		.then((response: Response) => {
			return ;
		});
}

function getCookie(name: string) {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    if (parts.length === 2) {
        return parts
            .pop()
            .split(";")
            .shift();
    } else {
        return "null";
    }
}


function getApiBaseUrl(): string {
    // if (erDev()) {
    //     // Kjør mot lokal soknadsosialhjelp-server:
    //     return "http://localhost:8181/soknadsosialhjelp-server/";
	//
    //     // Kjør mot lokal mock backend:
    //     // return "http://localhost:3001/sendsoknad/";
    // }
    // if (location.href.indexOf("localhost:8080") >= 0) {
    //     return "http://localhost:8181/soknadsosialhjelp-server/";
    // }
    // return kjorerJetty() ? "http://127.0.0.1:8181/soknadsosialhjelp-server/" : "/soknadsosialhjelp-server/";
	return "http://localhost:8181/soknadsosialhjelp-server/";
}